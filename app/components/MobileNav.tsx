"use client";

import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

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
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <button
        type="button"
        className={`mobile-nav-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />

      <nav
        id="mobile-nav-panel"
        className={`mobile-nav-panel${open ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.label} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          className="btn primary mobile-nav-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          REGISTER NOW
        </a>
      </nav>
    </>
  );
}
