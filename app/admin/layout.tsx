import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import SignOutButton from "./components/SignOutButton";

export const metadata: Metadata = {
  title: "Admin | The Marouf Method",
};

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/content/hero", label: "Hero" },
  { href: "/admin/content/about", label: "About" },
  { href: "/admin/content/programs", label: "Programs" },
  { href: "/admin/content/books", label: "Books" },
  { href: "/admin/content/achievements", label: "Achievements" },
  { href: "/admin/content/testimonials", label: "Testimonials" },
  { href: "/admin/content/method", label: "Method" },
  { href: "/admin/content/featured", label: "Featured Guide" },
  { href: "/admin/content/contact", label: "Contact & Social" },
  { href: "/admin/content/navigation", label: "Navigation" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings/password", label: "Change Password" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-neutral-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#C9A65A]/20 bg-[#111111] p-5 md:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#C9A65A] font-serif text-lg font-bold text-[#C9A65A]">
            M
          </div>
          <div>
            <p className="font-serif text-sm font-bold leading-tight text-[#FCFAF6]">The Marouf Method</p>
            <p className="text-[10px] font-bold tracking-widest text-[#C9A65A]">ADMIN PANEL</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded px-3 py-2 font-medium text-neutral-300 transition hover:bg-[#C9A65A]/10 hover:text-[#C9A65A]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <SignOutButton />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#C9A65A]/20 bg-[#111111] px-6 py-4">
          <p className="text-sm text-neutral-400">
            Signed in as <span className="font-semibold text-[#FCFAF6]">{session.email}</span>
          </p>
          <Link
            href="/"
            target="_blank"
            className="rounded border border-[#C9A65A]/40 px-3 py-1.5 text-xs font-bold tracking-wide text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
          >
            View site ↗
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
