"use client";

import { useState, type FormEvent } from "react";

type Props = {
  programOptions?: string[];
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ programOptions = [] }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          programInterest: data.get("programInterest"),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="contact-line" role="status">
        Thank you — your enquiry has been received. We&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-form-row">
        <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
        <input type="email" name="email" placeholder="Email address" required autoComplete="email" />
      </div>
      <div className="enquiry-form-row">
        <input type="tel" name="phone" placeholder="Phone / WhatsApp" autoComplete="tel" />
        {programOptions.length > 0 ? (
          <select name="programInterest" defaultValue="">
            <option value="">Program of interest (optional)</option>
            {programOptions.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        ) : (
          <input type="text" name="programInterest" placeholder="Program of interest (optional)" />
        )}
      </div>
      <textarea name="message" placeholder="Tell us a little about your goals..." rows={4} />
      {status === "error" && (
        <p className="enquiry-form-error" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="actions">
        <button className="btn primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "SENDING..." : "SEND ENQUIRY"}
        </button>
      </div>
    </form>
  );
}
