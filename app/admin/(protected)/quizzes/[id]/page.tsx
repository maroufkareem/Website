import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuizById, listQuizQuestions, listQuizAttempts } from "@/db/queries";
import { deleteQuizAction, saveQuizAction } from "../actions";
import QuestionBuilder, { type BuilderQuestion } from "../QuestionBuilder";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]";
const label = "mb-1 block text-xs font-semibold text-neutral-300";

export default async function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quizId = Number(id);
  if (!Number.isInteger(quizId)) notFound();

  const quiz = await getQuizById(quizId).catch(() => null);
  if (!quiz) notFound();

  const [questions, attempts] = await Promise.all([
    listQuizQuestions(quiz.id).catch(() => []),
    listQuizAttempts(quiz.id).catch(() => []),
  ]);

  const initial: BuilderQuestion[] = questions.map((q) => ({
    prompt: q.prompt,
    type: q.type === "true_false" ? "true_false" : "multiple_choice",
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/quizzes" className="text-xs text-neutral-500 hover:underline">
            ← All quizzes
          </Link>
          <h1 className="mt-1 font-serif text-2xl font-bold text-[#FCFAF6]">{quiz.title}</h1>
          <p className="text-sm text-neutral-400">
            Public link:{" "}
            <code className="text-[#C9A65A]">/quizzes/{quiz.slug}</code>
            {!quiz.published && " — not live until you publish"}
          </p>
        </div>
        <form action={deleteQuizAction}>
          <input type="hidden" name="id" value={quiz.id} />
          <button
            type="submit"
            className="rounded border border-red-500/40 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
          >
            Delete quiz
          </button>
        </form>
      </div>

      <form action={saveQuizAction} className="space-y-6">
        <input type="hidden" name="id" value={quiz.id} />
        <input type="hidden" name="slug" value={quiz.slug} />

        <div className="space-y-4 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Title</span>
              <input name="title" defaultValue={quiz.title} required className={input} />
            </label>
            <label className="block">
              <span className={label}>Subject</span>
              <input
                name="subject"
                defaultValue={quiz.subject}
                placeholder="e.g. Biology"
                className={input}
              />
            </label>
          </div>

          <label className="block">
            <span className={label}>Description</span>
            <textarea
              name="description"
              rows={2}
              defaultValue={quiz.description}
              className={input}
              placeholder="Shown on the quiz card and above the questions"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Pass mark (%)</span>
              <input
                name="passMark"
                type="number"
                min={0}
                max={100}
                defaultValue={quiz.passMark}
                className={input}
              />
            </label>
            <label className="flex items-end gap-2 pb-2 text-sm text-neutral-200">
              <input
                type="checkbox"
                name="published"
                defaultChecked={quiz.published}
                className="h-4 w-4 accent-[#C9A65A]"
              />
              Published (visible to students)
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-4">
          <QuestionBuilder initial={initial} />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded bg-[#C9A65A] px-5 py-2.5 text-sm font-semibold text-[#080808]"
          >
            Save quiz
          </button>
          <span className="text-xs text-neutral-500">
            Saving replaces all questions with what is shown above.
          </span>
        </div>
      </form>

      <div className="rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-4">
        <h2 className="mb-3 font-serif text-lg font-bold text-[#FCFAF6]">
          Results{" "}
          <span className="text-sm font-normal text-neutral-500">({attempts.length})</span>
        </h2>
        {attempts.length === 0 ? (
          <p className="text-sm text-neutral-500">No student has taken this quiz yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
                <th className="py-2">Student</th>
                <th className="py-2">Score</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {attempts.slice(0, 10).map((attempt) => {
                const percent = attempt.total
                  ? Math.round((attempt.score / attempt.total) * 100)
                  : 0;
                return (
                  <tr key={attempt.id} className="border-b border-neutral-900">
                    <td className="py-2 text-neutral-200">
                      {attempt.studentName}
                      <span className="block text-xs text-neutral-500">
                        {attempt.studentEmail}
                      </span>
                    </td>
                    <td
                      className={`py-2 font-semibold ${
                        percent >= quiz.passMark ? "text-green-300" : "text-amber-300"
                      }`}
                    >
                      {attempt.score}/{attempt.total} ({percent}%)
                    </td>
                    <td className="py-2 text-neutral-500">
                      {new Date(attempt.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
