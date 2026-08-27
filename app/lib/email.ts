/**
 * Transactional email.
 *
 * Calls Resend's REST API directly rather than pulling in their SDK — one
 * fetch, no dependency to keep in step with the framework.
 *
 * Sending is best-effort by design: `sendEmail` never throws. A reservation
 * that is safely in the database must not be reported as failed just because
 * the mail provider is down or unconfigured, so callers save first and send
 * second, and a failure here is logged rather than surfaced to the visitor.
 *
 * Required env:
 *   RESEND_API_KEY   – from https://resend.com/api-keys
 *   EMAIL_FROM       – e.g. "The Marouf Method <hello@drkareemmarouf.com>"
 *                      The domain must be verified in Resend.
 */

export type EmailResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "not-configured" | "failed"; detail?: string };

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendArgs): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(
      `[email] Skipped "${subject}" to ${to}: RESEND_API_KEY and EMAIL_FROM are not both set.`
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[email] Resend rejected "${subject}" to ${to}: ${response.status} ${detail}`);
      return { ok: false, reason: "failed", detail };
    }

    const body = (await response.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: body.id };
  } catch (error) {
    console.error(`[email] Failed sending "${subject}" to ${to}`, error);
    return { ok: false, reason: "failed", detail: String(error) };
  }
}

/* ---------- templates ---------- */

const GOLD = "#C9A65A";
const INK = "#1a1712";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(heading: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f0e6;font-family:Helvetica,Arial,sans-serif;color:${INK}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid rgba(201,166,90,0.35)">
<tr><td style="padding:28px 32px;border-bottom:1px solid rgba(201,166,90,0.35)">
<div style="font-size:11px;letter-spacing:2px;color:${GOLD};text-transform:uppercase">The Marouf Method</div>
<h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:${INK}">${escapeHtml(heading)}</h1>
</td></tr>
<tr><td style="padding:28px 32px;font-size:15px;line-height:1.6">${bodyHtml}</td></tr>
</table></body></html>`;
}

function detailRows(rows: [string, string][]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:18px 0;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#77736d;width:120px">${escapeHtml(k)}</td><td style="padding:6px 0;color:${INK};font-weight:600">${escapeHtml(v)}</td></tr>`
    )
    .join("")}</table>`;
}

export type ReservationEmailData = {
  name: string;
  email: string;
  phone: string;
  note: string;
  bookTitle: string;
  contactEmail?: string;
  contactPhone?: string;
};

export function reservationConfirmation(data: ReservationEmailData) {
  const { name, bookTitle, contactEmail, contactPhone } = data;

  const contactLine = [contactPhone, contactEmail].filter(Boolean).join(" · ");

  const html = shell(
    "Your reservation is confirmed",
    `<p style="margin:0 0 14px">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 14px">Thank you — we have reserved a copy of <strong>${escapeHtml(bookTitle)}</strong> for you.</p>
${detailRows([["Book", bookTitle], ["Name", name], ["Phone", data.phone]])}
<p style="margin:0 0 14px">No payment is needed now. We will contact you to arrange collection and settle payment then.</p>
${contactLine ? `<p style="margin:0;color:#77736d;font-size:13px">Questions? Reach us at ${escapeHtml(contactLine)}.</p>` : ""}`
  );

  const text = [
    `Hi ${name},`,
    ``,
    `Thank you — we have reserved a copy of "${bookTitle}" for you.`,
    ``,
    `Book: ${bookTitle}`,
    data.phone ? `Phone: ${data.phone}` : "",
    ``,
    `No payment is needed now. We will contact you to arrange collection and settle payment then.`,
    contactLine ? `` : "",
    contactLine ? `Questions? Reach us at ${contactLine}.` : "",
    ``,
    `The Marouf Method`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return { subject: `Your reservation: ${bookTitle}`, html, text };
}

export function reservationNotification(data: ReservationEmailData) {
  const html = shell(
    "New book reservation",
    `<p style="margin:0 0 14px">${escapeHtml(data.name)} reserved a copy of <strong>${escapeHtml(data.bookTitle)}</strong>.</p>
${detailRows([
      ["Book", data.bookTitle],
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Note", data.note],
    ])}
<p style="margin:0;font-size:13px;color:#77736d">Manage this in the admin dashboard under Reservations.</p>`
  );

  const text = [
    `${data.name} reserved a copy of "${data.bookTitle}".`,
    ``,
    `Book: ${data.bookTitle}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.note ? `Note: ${data.note}` : "",
    ``,
    `Manage this in the admin dashboard under Reservations.`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return { subject: `New reservation: ${data.bookTitle}`, html, text };
}
