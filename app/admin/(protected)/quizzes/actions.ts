"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createQuiz,
  deleteQuiz,
  deleteQuizAttempt,
  replaceQuizQuestions,
  updateQuiz,
} from "@/db/queries";

export type QuestionInput = {
  prompt: string;
  type: "multiple_choice" | "true_false";
  options: string[];
  correctIndex: number;
  explanation: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function revalidateQuizPaths(slug?: string) {
  revalidatePath("/admin/quizzes");
  revalidatePath("/quizzes");
  if (slug) revalidatePath(`/quizzes/${slug}`);
}

export async function createQuizAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  // Keep slugs unique without a round-trip per attempt: suffix on collision.
  const base = slugify(title) || "quiz";
  let slug = base;
  for (let attempt = 2; ; attempt++) {
    try {
      const quiz = await createQuiz({
        slug,
        title,
        subject: String(formData.get("subject") ?? "").trim(),
        description: String(formData.get("description") ?? "").trim(),
        passMark: Number(formData.get("passMark")) || 50,
        published: false,
      });
      revalidateQuizPaths(quiz.slug);
      redirect(`/admin/quizzes/${quiz.id}`);
    } catch (error) {
      // redirect() throws by design — let it through.
      if (error && typeof error === "object" && "digest" in error) throw error;
      if (attempt > 20) throw error;
      slug = `${base}-${attempt}`;
    }
  }
}

export async function saveQuizAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  const passMarkRaw = Number(formData.get("passMark"));
  const passMark = Number.isFinite(passMarkRaw)
    ? Math.min(100, Math.max(0, Math.round(passMarkRaw)))
    : 50;

  await updateQuiz(id, {
    title: String(formData.get("title") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    passMark,
    published: formData.get("published") === "on",
  });

  const raw = String(formData.get("questions") ?? "[]");
  let parsed: QuestionInput[] = [];
  try {
    parsed = JSON.parse(raw) as QuestionInput[];
  } catch {
    parsed = [];
  }

  // Drop anything unusable rather than storing a broken question that would
  // be impossible to answer correctly.
  const clean = parsed
    .map((q) => ({
      prompt: String(q.prompt ?? "").trim(),
      type: q.type === "true_false" ? ("true_false" as const) : ("multiple_choice" as const),
      options: (Array.isArray(q.options) ? q.options : []).map((o) => String(o ?? "").trim()),
      correctIndex: Number(q.correctIndex),
      explanation: String(q.explanation ?? "").trim(),
    }))
    .filter(
      (q) =>
        q.prompt &&
        q.options.length >= 2 &&
        q.options.every(Boolean) &&
        Number.isInteger(q.correctIndex) &&
        q.correctIndex >= 0 &&
        q.correctIndex < q.options.length
    );

  await replaceQuizQuestions(id, clean);

  const slug = String(formData.get("slug") ?? "");
  revalidateQuizPaths(slug);
  revalidatePath(`/admin/quizzes/${id}`);
}

export async function deleteQuizAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteQuiz(id);
  revalidateQuizPaths();
  redirect("/admin/quizzes");
}

export async function deleteAttemptAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteQuizAttempt(id);
  revalidatePath("/admin/quizzes/results");
}
