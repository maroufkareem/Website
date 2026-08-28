import Link from "next/link";
import { listQuizzes, countQuestionsByQuiz, countAttemptsByQuiz } from "@/db/queries";
import { createQuizAction } from "./actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]";

export default async function AdminQuizzesPage() {
  const [quizzes, questionCounts, attemptCounts] = await Promise.all([
    listQuizzes().catch(() => []),
    countQuestionsByQuiz().catch(() => ({} as Record<number, number>)),
    countAttemptsByQuiz().catch(() => ({} as Record<number, number>)),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Quizzes</h1>
          <p className="text-sm text-neutral-400">
            Build practice quizzes for students. Publish one to make it live on the quizzes site.
          </p>
        </div>
        <Link
          href="/admin/quizzes/results"
          className="rounded border border-[#C9A65A]/50 px-3 py-2 text-xs font-semibold text-[#C9A65A] hover:bg-[#C9A65A]/10"
        >
          View student results →
        </Link>
      </div>

      <form
        action={createQuizAction}
        className="grid gap-3 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-4 sm:grid-cols-[2fr_1fr_auto]"
      >
        <input name="title" required placeholder="New quiz title" className={input} />
        <input name="subject" placeholder="Subject (e.g. Biology)" className={input} />
        <button
          type="submit"
          className="rounded bg-[#C9A65A] px-4 py-2 text-sm font-semibold text-[#080808]"
        >
          Create quiz
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Questions</th>
              <th className="px-4 py-3">Attempts</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  No quizzes yet. Create one above.
                </td>
              </tr>
            )}
            {quizzes.map((quiz) => {
              const questions = questionCounts[quiz.id] ?? 0;
              return (
                <tr key={quiz.id} className="border-b border-neutral-900">
                  <td className="px-4 py-3 font-semibold text-neutral-100">{quiz.title}</td>
                  <td className="px-4 py-3 text-neutral-400">{quiz.subject || "—"}</td>
                  <td className="px-4 py-3 text-neutral-400">{questions}</td>
                  <td className="px-4 py-3 text-neutral-400">{attemptCounts[quiz.id] ?? 0}</td>
                  <td className="px-4 py-3">
                    {quiz.published && questions > 0 ? (
                      <span className="rounded bg-green-500/15 px-2 py-1 text-xs font-semibold text-green-300">
                        Live
                      </span>
                    ) : quiz.published ? (
                      <span className="rounded bg-amber-500/15 px-2 py-1 text-xs font-semibold text-amber-300">
                        Needs questions
                      </span>
                    ) : (
                      <span className="rounded bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/quizzes/${quiz.id}`}
                      className="text-xs font-semibold text-[#C9A65A] hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
