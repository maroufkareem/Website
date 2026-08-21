"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; links: NavLink[] };

export default function AdminShell({
  groups,
  email,
  children,
}: {
  groups: NavGroup[];
  email: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-neutral-100">
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[#C9A65A]/20 bg-[#111111] px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <span className="brand-mark" style={{ width: 36, height: 36 }}>
            <span className="brand-mark-script" style={{ fontSize: 13 }}>Kareem</span>
            <span className="brand-mark-caption" style={{ fontSize: 5 }}>MAROUF</span>
          </span>
          <p className="font-serif text-sm font-bold text-[#FCFAF6]">Admin Panel</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A65A]/40"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col items-center gap-1">
            <span className="block h-0.5 w-5 bg-[#C9A65A]" />
            <span className="block h-0.5 w-5 bg-[#C9A65A]" />
            <span className="block h-0.5 w-5 bg-[#C9A65A]" />
          </div>
        </button>
      </div>

      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 border-none bg-black/60 transition-opacity md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[84vw] transform flex-col overflow-y-auto border-r border-[#C9A65A]/20 bg-[#111111] p-5 transition-transform duration-300 ease-out md:static md:z-auto md:w-64 md:shrink-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="brand-mark">
            <span className="brand-mark-script">Kareem</span>
            <span className="brand-mark-caption">MAROUF</span>
          </span>
          <div>
            <p className="font-serif text-sm font-bold leading-tight text-[#FCFAF6]">The Marouf Method</p>
            <p className="text-[10px] font-bold tracking-widest text-[#C9A65A]">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="flex-1 space-y-5 text-sm">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const isActive =
                    link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded px-3 py-2 font-medium transition ${
                        isActive
                          ? "bg-[#C9A65A]/15 text-[#C9A65A]"
                          : "text-neutral-300 hover:bg-[#C9A65A]/10 hover:text-[#C9A65A]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-6 space-y-3 border-t border-[#C9A65A]/15 pt-4">
          <p className="truncate text-xs text-neutral-500">
            Signed in as <span className="font-semibold text-neutral-300">{email}</span>
          </p>
          <Link
            href="/"
            target="_blank"
            className="block rounded border border-[#C9A65A]/40 px-3 py-1.5 text-center text-xs font-bold tracking-wide text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
          >
            View site ↗
          </Link>
          <SignOutButton />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pt-14 md:pt-0">
        <header className="hidden items-center justify-between border-b border-[#C9A65A]/20 bg-[#111111] px-6 py-4 md:flex">
          <p className="text-sm text-neutral-400">
            Signed in as <span className="font-semibold text-[#FCFAF6]">{email}</span>
          </p>
          <Link
            href="/"
            target="_blank"
            className="rounded border border-[#C9A65A]/40 px-3 py-1.5 text-xs font-bold tracking-wide text-[#C9A65A] transition hover:bg-[#C9A65A]/10"
          >
            View site ↗
          </Link>
        </header>
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
