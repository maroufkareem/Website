"use client";

import { useState, type FormEvent } from "react";

type Props = {
  bookTitles: string[];
  /** Pre-selected book, from the ?book= query on the reserve page. */
  initialBook?: string;
  /** Panel heading, rendered above the fields and replaced by the confirmation. */
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  /** Shown as a direct-contact fallback if the submission fails. */
  whatsappHref?: string;
  contactPhone?: string;
  contactEmail?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ReservationForm({
  bookTitles,
  initialBook,
  eyebrow,
  title,
  titleAccent,
  lede,
  whatsappHref,
  contactPhone,
  contactEmail,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reservedTitle, setReservedTitle] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Only honour the query string if it names a book we actually sell.
  const preselected = initialBook && bookTitles.includes(initialBook) ? initialBook : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const bookTitle = String(data.get("bookTitle") ?? "");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          note: data.get("note"),
          bookTitle,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      const result = (await response.json().catch(() => ({}))) as { emailed?: boolean };
      setEmailSent(Boolean(result.emailed));
      setReservedTitle(bookTitle);
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-done" role="status">
        <p className="eyebrow">RESERVATION CONFIRMED</p>
        <h2>
          Your copy is reserved.<br />
          <span>No payment needed.</span>
        </h2>
        <p className="form-lede">
          We&apos;ve reserved <strong>{reservedTitle}</strong>{" "}
          {emailSent ? "for you and sent a confirmation email." : "for you."} We&apos;ll be in touch
          to arrange collection.
        </p>
        <button type="button" className="btn secondary" onClick={() => setStatus("idle")}>
          RESERVE ANOTHER BOOK
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2>
        {title}
        <span>{titleAccent}</span>
      </h2>
      <p className="form-lede">{lede}</p>

      <form className="panel-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Book</span>
          <select id="bookTitle" name="bookTitle" defaultValue={preselected} required>
            <option value="" disabled>
              Choose a book
            </option>
            {bookTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>

        <div className="form-grid">
          <label className="form-field">
            <span>Student name</span>
            <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Parent or student email"
              required
              autoComplete="email"
            />
          </label>
        </div>

        <label className="form-field">
          <span>Phone number</span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone / WhatsApp (optional)"
            autoComplete="tel"
          />
        </label>

        <label className="form-field">
          <span>Note</span>
          <textarea name="note" rows={3} placeholder="Anything we should know? (optional)" />
        </label>

        {status === "error" && (
          <>
            <p className="form-alert" role="alert">
              {errorMessage}
            </p>
            {(whatsappHref || contactPhone || contactEmail) && (
              <p className="form-alert-fallback">
                Trouble sending this? Reach us directly —{" "}
                {whatsappHref && <a href={whatsappHref}>WhatsApp</a>}
                {whatsappHref && (contactPhone || contactEmail) && ", "}
                {contactPhone && <a href={`tel:${contactPhone}`}>{contactPhone}</a>}
                {contactPhone && contactEmail && ", or "}
                {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}.
              </p>
            )}
          </>
        )}

        <button type="submit" className="form-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "RESERVING…" : "CONFIRM MY RESERVATION"}
        </button>

        <p className="form-fine">
          Reservation only — no payment is taken online. We&apos;ll contact you to arrange collection.
        </p>
      </form>
    </>
  );
}
