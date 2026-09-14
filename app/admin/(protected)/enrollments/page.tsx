import { listEnrollments } from "@/db/queries";
import { deleteEnrollmentAction } from "./actions";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function EnrollmentsPage() {
  const enrollments = await listEnrollments().catch(() => []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Enrollments</h1>
        <p className="text-sm text-neutral-400">
          Course enrollment requests (&quot;RESERVE YOUR PLACE&quot;) from the public site.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">School / Country</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Goals</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                  No enrollments yet.
                </td>
              </tr>
            )}
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="border-b border-neutral-900 align-top">
                <td className="px-4 py-3 font-semibold text-[#C9A65A]">
                  {enrollment.programInterest || "—"}
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  <div className="font-semibold text-neutral-100">{enrollment.studentName}</div>
                  <div>
                    <a className="hover:underline" href={`mailto:${enrollment.studentEmail}`}>
                      {enrollment.studentEmail}
                    </a>
                  </div>
                  {enrollment.studentPhone && <div>{enrollment.studentPhone}</div>}
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  <div>{enrollment.school || "—"}</div>
                  <div>{enrollment.country}</div>
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  <div className="font-semibold text-neutral-100">{enrollment.parentName}</div>
                  <div>{enrollment.parentEmail}</div>
                  {enrollment.parentPhone && <div>{enrollment.parentPhone}</div>}
                </td>
                <td className="max-w-xs px-4 py-3 text-neutral-400">
                  <p className="line-clamp-3">{enrollment.goals || "—"}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect id={enrollment.id} status={enrollment.status} />
                </td>
                <td className="px-4 py-3">
                  <form action={deleteEnrollmentAction}>
                    <input type="hidden" name="id" value={enrollment.id} />
                    <button type="submit" className="text-xs font-semibold text-red-400 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
