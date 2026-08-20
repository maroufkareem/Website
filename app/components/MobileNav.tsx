"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type NavItem = { label: string; href: string };

function subscribeNoop() {
  return () => {};
}

// The overlay/panel use position:fixed against the viewport, portaled to
// <body> because .site-header has backdrop-filter, and a
// backdrop-filter/transform/filter on an ancestor turns that ancestor into
// the containing block for fixed-position descendants — nesting the panel
// inside the header collapses it to the header's own height instead of
// filling the screen. document.body only exists client-side, so the portal
// target is resolved via useSyncExternalStore (true after hydration, false
// during SSR) rather than setting state in an effect.
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

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

      {mounted &&
        createPortal(
          <>
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
          </>,
          document.body
        )}
    </>
  );
}
