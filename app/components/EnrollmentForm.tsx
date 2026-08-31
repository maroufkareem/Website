"use client";

import { useState, type FormEvent } from "react";

type Props = {
  programOptions: string[];
  /** Pre-selected program, from the ?program= query on the enroll page. */
  initialProgram?: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function EnrollmentForm({
  programOptions,
  initialProgram,
  eyebrow,
  title,
  titleAccent,
  lede,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Only honour the query string if it names a program we actually run.
  const preselected =
    initialProgram && programOptions.includes(initialProgram) ? initialProgram : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    /* The enquiries table has columns for the student's name, email, phone and
       program only, so the parent, country and school details are composed
       into `message`, which the admin enquiry view already displays. */
    const details = [
      ["Parent name", value("parentName")],
      ["Parent phone", value("parentPhone")],
      ["Parent email", value("parentEmail")],
      ["Country", value("country")],
      ["School", value("school")],
    ]
      .filter(([, entry]) => entry)
      .map(([label, entry]) => `${label}: ${entry}`);

    const goals = value("goals");
    if (goals) details.push(`Goals: ${goals}`);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          programInterest: value("programInterest"),
          message: details.join("\n"),
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
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-done" role="status">
        <p className="eyebrow">ENROLLMENT RECEIVED</p>
        <h2>
          Your place is requested.
          <span>We&apos;ll confirm shortly.</span>
        </h2>
        <p className="form-lede">
          Dr. Kareem&apos;s team has your enrollment details and will contact you and your parent to
          confirm the schedule and complete the registration.
        </p>
        <button type="button" className="btn secondary" onClick={() => setStatus("idle")}>
          ENROLL ANOTHER STUDENT
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
        <p className="form-group-label">Student details</p>
        <div className="form-grid">
          <label className="form-field">
            <span>Student name</span>
            <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
          </label>
          <label className="form-field">
            <span>Student email</span>
            <input
              type="email"
              name="email"
              placeholder="Student email"
              required
              autoComplete="email"
            />
          </label>
          <label className="form-field">
            <span>Student phone</span>
            <input type="tel" name="phone" placeholder="+20 …" autoComplete="tel" />
          </label>
          <label className="form-field">
            <span>School</span>
            <input type="text" name="school" placeholder="Current school" required />
          </label>
          <label className="form-field">
            <span>Country</span>
            <input
              type="text"
              name="country"
              placeholder="Country of residence"
              required
              autoComplete="country-name"
            />
          </label>
          <label className="form-field">
            <span>Program</span>
            <select name="programInterest" defaultValue={preselected} required>
              <option value="" disabled>
                Select a program
              </option>
              {programOptions.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="form-group-label">Parent details</p>
        <div className="form-grid">
          <label className="form-field">
            <span>Parent name</span>
            <input type="text" name="parentName" placeholder="Full name" required />
          </label>
          <label className="form-field">
            <span>Parent phone number</span>
            <input type="tel" name="parentPhone" placeholder="+20 …" required />
          </label>
          <label className="form-field wide">
            <span>Parent email</span>
            <input type="email" name="parentEmail" placeholder="Parent email" required />
          </label>
        </div>

        <label className="form-field">
          <span>Goals</span>
          <textarea name="goals" rows={3} placeholder="Tell us a little about your goals…" />
        </label>

        {status === "error" && (
          <p className="form-alert" role="alert">
            {errorMessage}
          </p>
        )}

        <button className="form-submit" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "RESERVING…" : "RESERVE MY PLACE"}
        </button>

        <p className="form-fine">
          No payment required online. We&apos;ll contact you to confirm the schedule and complete
          registration.
        </p>
      </form>
    </>
  );
}
