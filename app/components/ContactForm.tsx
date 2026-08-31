"use client";

import { useState, type FormEvent } from "react";

type Props = {
  /** Panel heading, rendered above the fields and replaced by the confirmation. */
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  /** Rendered in the modal, which needs a dismiss control the inline form does not. */
  onClose?: () => void;
};

const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const SUBJECTS = ["Biology", "Psychology"];
const FORMATS = ["Online", "In person"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ eyebrow, title, titleAccent, lede, onClose }: Props) {
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
          message: [
            data.get("gradeLevel") && `Grade level: ${data.get("gradeLevel")}`,
            data.get("format") && `Preferred format: ${data.get("format")}`,
          ]
            .filter(Boolean)
            .join(" · "),
          programInterest: data.get("subject"),
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
      <div className="form-done" role="status">
        {onClose && (
          <button type="button" className="form-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        )}
        <p className="eyebrow">ENQUIRY RECEIVED</p>
        <h2>
          Thank you.<br />
          <span>We&apos;ll be in touch.</span>
        </h2>
        <p className="form-lede">
          Your trial request has reached Dr. Kareem&apos;s team. We&apos;ll reply shortly to confirm
          your session time.
        </p>
        <button type="button" className="btn secondary" onClick={() => setStatus("idle")}>
          BOOK ANOTHER SESSION
        </button>
      </div>
    );
  }

  return (
    <>
      {onClose && (
        <button type="button" className="form-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h2>
        {title}
        <span>{titleAccent}</span>
      </h2>
      <p className="form-lede">{lede}</p>

      <form className="panel-form" onSubmit={handleSubmit}>
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
          <label className="form-field">
            <span>Phone number</span>
            <input type="tel" name="phone" placeholder="+20 …" autoComplete="tel" />
          </label>
          <label className="form-field">
            <span>Grade level</span>
            <select name="gradeLevel" defaultValue="">
              <option value="">Select grade</option>
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Subject</span>
            <select name="subject" defaultValue="">
              <option value="">Select subject</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Preferred format</span>
            <select name="format" defaultValue={FORMATS[0]}>
              {FORMATS.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>
        </div>

        {status === "error" && (
          <p className="form-alert" role="alert">
            {errorMessage}
          </p>
        )}

        <button className="form-submit" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "BOOKING…" : "BOOK MY FREE TRIAL"}
        </button>

        <p className="form-fine">
          No payment required. We&apos;ll contact you to confirm your session.
        </p>
      </form>
    </>
  );
}
