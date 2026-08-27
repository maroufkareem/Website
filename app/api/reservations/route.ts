import { NextResponse } from "next/server";
import { createBookReservation, getBooks, getSiteSettings } from "@/db/queries";
import { reservationConfirmation, reservationNotification, sendEmail } from "@/app/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    note?: string;
    bookTitle?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const bookTitle = body.bookTitle?.trim();

  if (!name || !email || !bookTitle) {
    return NextResponse.json(
      { error: "Name, email and book are required." },
      { status: 400 }
    );
  }

  // Cheap sanity check — the real validation is the confirmation email
  // arriving, but this catches obvious typos before we store them.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const phone = body.phone?.trim() ?? "";
  const note = body.note?.trim() ?? "";

  // Resolve the title against the catalogue so a tampered or stale request
  // cannot store an arbitrary book name, and so we can keep the id.
  let bookId: number | null = null;
  let resolvedTitle = bookTitle;
  try {
    const books = await getBooks();
    const match = books.find((b) => b.title === bookTitle);
    if (!match) {
      return NextResponse.json({ error: "That book is not available." }, { status: 400 });
    }
    bookId = match.id;
    resolvedTitle = match.title;
  } catch (error) {
    console.error("Failed to load books while reserving", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  try {
    await createBookReservation({
      bookId,
      bookTitle: resolvedTitle,
      name,
      email,
      phone,
      note,
    });
  } catch (error) {
    console.error("Failed to save reservation", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  /* The reservation is stored at this point, so email problems must not fail
     the request — the visitor's reservation is genuinely made either way. */
  const settings = await getSiteSettings().catch(() => null);
  const data = {
    name,
    email,
    phone,
    note,
    bookTitle: resolvedTitle,
    contactEmail: settings?.contactEmail || undefined,
    contactPhone: settings?.contactPhone || undefined,
  };

  const confirmation = reservationConfirmation(data);
  const confirmationResult = await sendEmail({
    to: email,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
    replyTo: settings?.contactEmail || undefined,
  });

  const ownerAddress = settings?.contactEmail?.trim();
  if (ownerAddress) {
    const notification = reservationNotification(data);
    await sendEmail({
      to: ownerAddress,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: email,
    });
  }

  return NextResponse.json({ ok: true, emailed: confirmationResult.ok });
}
