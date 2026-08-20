import { listEnquiries } from "@/db/queries";
import { deleteEnquiryAction } from "./actions";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const enquiries = await listEnquiries().catch(() => []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Enquiries</h1>
        <p className="text-sm text-neutral-400">Contact form submissions from the public site.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border-b border-neutral-900 align-top">
                <td className="px-4 py-3 font-semibold text-neutral-100">{enquiry.name}</td>
                <td className="px-4 py-3 text-neutral-400">
                  <div>{enquiry.email}</div>
                  {enquiry.phone && <div>{enquiry.phone}</div>}
                </td>
                <td className="max-w-xs px-4 py-3 text-neutral-400">
                  <p className="line-clamp-3">{enquiry.message || "—"}</p>
                  {enquiry.programInterest && (
                    <p className="mt-1 text-xs text-[#C9A65A]">Interested in: {enquiry.programInterest}</p>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect id={enquiry.id} status={enquiry.status} />
                </td>
                <td className="px-4 py-3">
                  <form action={deleteEnquiryAction}>
                    <input type="hidden" name="id" value={enquiry.id} />
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
