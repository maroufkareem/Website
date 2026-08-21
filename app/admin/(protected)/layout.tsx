import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/app/admin/components/AdminShell";

export const metadata: Metadata = {
  title: "Admin | The Marouf Method",
};

const NAV_GROUPS: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Overview",
    links: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/enquiries", label: "Enquiries" },
      { href: "/admin/analytics", label: "Analytics" },
    ],
  },
  {
    label: "Content",
    links: [
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
    ],
  },
  {
    label: "Account",
    links: [{ href: "/admin/settings/password", label: "Change Password" }],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell groups={NAV_GROUPS} email={session.email}>
      {children}
    </AdminShell>
  );
}
