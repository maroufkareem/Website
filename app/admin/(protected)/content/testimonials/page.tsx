import Link from "next/link";
import { getAllTestimonials } from "@/db/queries";
import { deleteTestimonialAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function TestimonialsListPage() {
  const testimonials = await getAllTestimonials().catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Testimonials</h1>
          <p className="text-sm text-neutral-400">Manage student/parent testimonials.</p>
        </div>
        <Link
          href="/admin/content/testimonials/new"
          className="rounded bg-[#C9A65A] px-4 py-2 text-sm font-bold text-black hover:opacity-90"
        >
          + Add Testimonial
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Body</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  No testimonials yet.
                </td>
              </tr>
            )}
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b border-neutral-900">
                <td className="px-4 py-3 text-neutral-400">{t.sortOrder}</td>
                <td className="px-4 py-3 font-semibold text-neutral-100">{t.author}</td>
                <td className="max-w-sm px-4 py-3 text-neutral-400">
                  <p className="line-clamp-2">{t.body}</p>
                </td>
                <td className="px-4 py-3 text-neutral-400">{t.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/content/testimonials/${t.id}/edit`}
                      className="text-xs font-semibold text-[#C9A65A] hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteTestimonialAction}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="text-xs font-semibold text-red-400 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
