import { NextResponse } from "next/server";
import { createEnquiry } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    programInterest?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  try {
    await createEnquiry({
      name,
      email,
      phone: body.phone?.trim() ?? "",
      message: body.message?.trim() ?? "",
      programInterest: body.programInterest?.trim() || null,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
