import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification, type LeadRecord } from "@/lib/notify";

/**
 * POST /api/notify-lead — the Supabase Database Webhook entry point.
 *
 * NOTE: as of 2026-10-29 this is a REDUNDANT backstop, not the primary path.
 * Alerts now fire directly in code from the insert sites (see src/lib/notify.ts
 * + /api/lead), because the dashboard webhook silently stopped firing and a
 * $931K valuation lead went un-alerted. If the webhook is re-enabled it will
 * double-send; keep it disabled unless the in-code path is removed.
 *
 * Payload (Supabase webhook shape): { type, table, record: {<lead row>}, ... }
 * Auth: header `x-webhook-secret: <LEAD_WEBHOOK_SECRET>`.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { record?: LeadRecord };
  const results = await sendLeadNotification(body.record ?? {});
  return NextResponse.json(results);
}
