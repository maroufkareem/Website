import Link from "next/link";
import {
  countNewEnquiries,
  countPageViewsSince,
  countPublishedBooks,
  countPublishedPrograms,
  getRecentEnquiries,
} from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [newEnquiries, publishedPrograms, publishedBooks, pageViews30, recentEnquiries] = await Promise.all([
    countNewEnquiries().catch(() => 0),
    countPublishedPrograms().catch(() => 0),
    countPublishedBooks().catch(() => 0),
    countPageViewsSince(30).catch(() => 0),
    getRecentEnquiries(5).catch(() => []),
  ]);

  const stats = [
    { label: "New Enquiries", value: newEnquiries },
    { label: "Published Programs", value: publishedPrograms },
    { label: "Published Books", value: publishedBooks },
    { label: "Page Views (30d)", value: pageViews30 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Dashboard</h1>
        <p className="text-sm text-neutral-400">Overview of site activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-5">
            <p className="text-3xl font-bold text-[#C9A65A]">{stat.value}</p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#FCFAF6]">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold text-[#C9A65A] hover:underline">
              View all
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-sm text-neutral-500">No enquiries yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentEnquiries.map((enquiry) => (
                <li key={enquiry.id} className="border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-neutral-100">{enquiry.name}</p>
                  <p className="text-xs text-neutral-400">{enquiry.email}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{enquiry.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-5">
          <h2 className="mb-4 font-serif text-lg font-bold text-[#FCFAF6]">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/admin/content/programs/new"
              className="rounded border border-[#C9A65A]/30 px-3 py-2 text-center text-sm font-semibold text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
            >
              + Add Program
            </Link>
            <Link
              href="/admin/content/books/new"
              className="rounded border border-[#C9A65A]/30 px-3 py-2 text-center text-sm font-semibold text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
            >
              + Add Book
            </Link>
            <Link
              href="/admin/content/testimonials/new"
              className="rounded border border-[#C9A65A]/30 px-3 py-2 text-center text-sm font-semibold text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
            >
              + Add Testimonial
            </Link>
            <Link
              href="/admin/enquiries"
              className="rounded border border-[#C9A65A]/30 px-3 py-2 text-center text-sm font-semibold text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
            >
              View Enquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
