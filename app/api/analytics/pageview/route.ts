import { NextResponse } from "next/server";
import { recordPageView } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body: { path?: string; referrer?: string } = await request.json();
    const path = body.path?.slice(0, 500) || "/";
    const referrer = body.referrer?.slice(0, 500) || "";
    await recordPageView(path, referrer);
  } catch (error) {
    // Never let analytics failures affect the visitor's experience.
    console.error("Failed to record page view", error);
  }
  return NextResponse.json({ ok: true });
}
