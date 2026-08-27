import { listBookReservations } from "@/db/queries";
import { isEmailConfigured } from "@/app/lib/email";
import { deleteReservationAction } from "./actions";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function ReservationsPage() {
  const reservations = await listBookReservations().catch(() => []);
  const emailReady = isEmailConfigured();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Reservations</h1>
        <p className="text-sm text-neutral-400">
          Book reservations from the public site. No payment is taken — contact the reader to
          arrange collection.
        </p>
      </div>

      {!emailReady && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <strong className="font-semibold">Confirmation emails are off.</strong> Reservations are
          still being saved here, but no email is sent until <code>RESEND_API_KEY</code> and{" "}
          <code>EMAIL_FROM</code> are set in the environment.
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                  No reservations yet.
                </td>
              </tr>
            )}
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-neutral-900 align-top">
                <td className="px-4 py-3 font-semibold text-[#C9A65A]">{reservation.bookTitle}</td>
                <td className="px-4 py-3 font-semibold text-neutral-100">{reservation.name}</td>
                <td className="px-4 py-3 text-neutral-400">
                  <div>
                    <a className="hover:underline" href={`mailto:${reservation.email}`}>
                      {reservation.email}
                    </a>
                  </div>
                  {reservation.phone && <div>{reservation.phone}</div>}
                </td>
                <td className="max-w-xs px-4 py-3 text-neutral-400">
                  <p className="line-clamp-3">{reservation.note || "—"}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                  {new Date(reservation.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect id={reservation.id} status={reservation.status} />
                </td>
                <td className="px-4 py-3">
                  <form action={deleteReservationAction}>
                    <input type="hidden" name="id" value={reservation.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-red-400 hover:underline"
                    >
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
