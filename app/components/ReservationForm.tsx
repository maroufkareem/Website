"use client";

import { useState, type FormEvent } from "react";

type Props = {
  bookTitles: string[];
  /** Pre-selected book, from the ?book= query on the reserve page. */
  initialBook?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ReservationForm({ bookTitles, initialBook }: Props) {
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
      <div className="reserve-success" role="status">
        <p className="eyebrow gold">Reservation confirmed</p>
        <h2>Your copy is reserved.</h2>
        <p>
          We&apos;ve reserved <strong>{reservedTitle}</strong>{" "}
          {emailSent
            ? "for you and sent a confirmation email."
            : "for you."}{" "}
          No payment is needed now — we&apos;ll be in touch to arrange collection.
        </p>
        <button type="button" className="btn secondary" onClick={() => setStatus("idle")}>
          RESERVE ANOTHER BOOK
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <label className="enquiry-label" htmlFor="bookTitle">
        Book
      </label>
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

      <div className="enquiry-form-row">
        <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
        <input type="email" name="email" placeholder="Email address" required autoComplete="email" />
      </div>

      <input type="tel" name="phone" placeholder="Phone / WhatsApp (optional)" autoComplete="tel" />
      <textarea name="note" rows={3} placeholder="Anything we should know? (optional)" />

      {status === "error" && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="btn primary" disabled={status === "submitting"}>
        {status === "submitting" ? "RESERVING…" : "CONFIRM RESERVATION"}
      </button>

      <p className="form-note">
        Reservation only — no payment is taken online. We&apos;ll contact you to arrange
        collection.
      </p>
    </form>
  );
}
