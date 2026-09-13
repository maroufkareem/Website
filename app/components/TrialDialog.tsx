"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContactForm from "@/app/components/ContactForm";
import { DEFAULT_SITE_SETTINGS } from "@/app/lib/defaults";

/* Mounted once in the root layout. Any element carrying data-open-trial opens
   it — the triggers stay plain server-rendered links (they still navigate to
   /contact with JS off), so no page has to become a client component. */
export default function TrialDialog() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement | null)?.closest("[data-open-trial]");
      if (!trigger) return;
      event.preventDefault();
      lastFocused.current = trigger as HTMLElement;
      setOpen(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus();
      return;
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    dialogRef.current?.querySelector<HTMLInputElement>("input, select")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="form-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="form-split form-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book your free trial"
        ref={dialogRef}
      >
        <div className="form-aside">
          <p className="eyebrow">COMPLIMENTARY SESSION</p>
          <span className="eyebrow-rule" />
          <h2>
            Experience
            <span>The Marouf Method</span>
          </h2>
          <p>
            Discover how Biology and Psychology can become clearer, easier, and more enjoyable
            through understanding — not memorization.
          </p>
          <span className="form-aside-rule" />
          <ul className="form-aside-list">
            <li>Personalized learning guidance</li>
            <li>Clear explanation of difficult concepts</li>
            <li>Exam-focused academic strategy</li>
          </ul>
          <p className="form-aside-badge">100% FREE &middot; NO COMMITMENT</p>
        </div>

        <div className="form-main">
          <ContactForm
            onClose={close}
            eyebrow="BOOK YOUR FREE TRIAL"
            title="Start With One Session."
            titleAccent="See The Difference."
            lede="Reserve a complimentary trial session with Dr. Kareem and experience a learning approach built around understanding, confidence, and exam success."
            whatsappHref={DEFAULT_SITE_SETTINGS.contactWhatsapp}
            contactPhone={DEFAULT_SITE_SETTINGS.contactPhone}
            contactEmail={DEFAULT_SITE_SETTINGS.contactEmail}
          />
        </div>
      </div>
    </div>
  );
}
