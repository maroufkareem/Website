import { NextResponse } from "next/server";
import { createQuizAttempt, getQuizBySlug, listQuizQuestions } from "@/db/queries";

export const dynamic = "force-dynamic";

/**
 * Grades a quiz submission.
 *
 * Marking happens here, never in the browser: the public quiz payload omits
 * `correctIndex` entirely, so a student cannot read the answers out of the
 * page source or tamper with their own score.
 */
export async function POST(request: Request) {
  let body: { slug?: string; name?: string; email?: string; answers?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const slug = body.slug?.trim();
  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!slug || !name || !email) {
    return NextResponse.json(
      { error: "Name, email and quiz are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!Array.isArray(body.answers)) {
    return NextResponse.json({ error: "Answers are missing." }, { status: 400 });
  }

  const quiz = await getQuizBySlug(slug).catch(() => null);
  if (!quiz || !quiz.published) {
    return NextResponse.json({ error: "That quiz is not available." }, { status: 404 });
  }

  const questions = await listQuizQuestions(quiz.id).catch(() => []);
  if (!questions.length) {
    return NextResponse.json({ error: "That quiz has no questions yet." }, { status: 400 });
  }

  // Normalise to one answer per question, in question order. Anything not a
  // valid option index counts as unanswered rather than failing the request.
  const submitted = body.answers as unknown[];
  const answers = questions.map((question, index) => {
    const raw = submitted[index];
    const choice = typeof raw === "number" ? raw : Number.NaN;
    return Number.isInteger(choice) && choice >= 0 && choice < question.options.length
      ? choice
      : -1;
  });

  const results = questions.map((question, index) => ({
    id: question.id,
    correctIndex: question.correctIndex,
    chosenIndex: answers[index],
    correct: answers[index] === question.correctIndex,
    explanation: question.explanation,
  }));

  const score = results.filter((r) => r.correct).length;
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  try {
    await createQuizAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentName: name,
      studentEmail: email,
      score,
      total,
      answers,
    });
  } catch (error) {
    // The student still deserves their score even if we failed to record it.
    console.error("Failed to save quiz attempt", error);
  }

  return NextResponse.json({
    ok: true,
    score,
    total,
    percent,
    passed: percent >= quiz.passMark,
    passMark: quiz.passMark,
    results,
  });
}
