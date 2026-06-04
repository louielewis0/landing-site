import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/dashboard/auth
 * Body: { passcode: string }
 * Returns: 200 { ok: true } on match, 401 on mismatch.
 *
 * The dashboard gate calls this to validate the user's typed passcode
 * against DASHBOARD_PASSCODE (server-only env var). After a successful
 * response, the gate stores the passcode in component state and sends
 * it as the x-dashboard-auth header on every subsequent /api/dashboard/*
 * call, where each route revalidates it before doing anything.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.DASHBOARD_PASSCODE;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured: DASHBOARD_PASSCODE not set" },
      { status: 500 }
    );
  }
  const body = await req.json().catch(() => ({}));
  const provided = body?.passcode;
  if (typeof provided !== "string" || provided.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (provided !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
