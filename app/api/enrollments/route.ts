import { NextResponse } from "next/server";
import { createEnrollment } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    school?: string;
    country?: string;
    programInterest?: string;
    parentName?: string;
    parentPhone?: string;
    parentEmail?: string;
    goals?: string;
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
    await createEnrollment({
      studentName: name,
      studentEmail: email,
      studentPhone: body.phone?.trim() ?? "",
      school: body.school?.trim() ?? "",
      country: body.country?.trim() ?? "",
      programInterest: body.programInterest?.trim() ?? "",
      parentName: body.parentName?.trim() ?? "",
      parentPhone: body.parentPhone?.trim() ?? "",
      parentEmail: body.parentEmail?.trim() ?? "",
      goals: body.goals?.trim() ?? "",
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save enrollment", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
