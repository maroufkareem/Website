import Link from "next/link";
import { listQuizAttempts, listQuizzes } from "@/db/queries";
import { deleteAttemptAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function QuizResultsPage() {
  const [attempts, quizzes] = await Promise.all([
    listQuizAttempts().catch(() => []),
    listQuizzes().catch(() => []),
  ]);
  const passMarks = new Map(quizzes.map((q) => [q.id, q.passMark]));

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/quizzes" className="text-xs text-neutral-500 hover:underline">
          ← All quizzes
        </Link>
        <h1 className="mt-1 font-serif text-2xl font-bold text-[#FCFAF6]">Student results</h1>
        <p className="text-sm text-neutral-400">Every quiz attempt, newest first.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Quiz</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {attempts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  No quiz attempts yet.
                </td>
              </tr>
            )}
            {attempts.map((attempt) => {
              const percent = attempt.total
                ? Math.round((attempt.score / attempt.total) * 100)
                : 0;
              const passMark = passMarks.get(attempt.quizId) ?? 50;
              return (
                <tr key={attempt.id} className="border-b border-neutral-900">
                  <td className="px-4 py-3 text-neutral-100">
                    <span className="font-semibold">{attempt.studentName}</span>
                    <span className="block text-xs text-neutral-500">
                      <a className="hover:underline" href={`mailto:${attempt.studentEmail}`}>
                        {attempt.studentEmail}
                      </a>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#C9A65A]">{attempt.quizTitle}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      percent >= passMark ? "text-green-300" : "text-amber-300"
                    }`}
                  >
                    {attempt.score}/{attempt.total} ({percent}%)
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <form action={deleteAttemptAction}>
                      <input type="hidden" name="id" value={attempt.id} />
                      <button
                        type="submit"
                        className="text-xs font-semibold text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
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
