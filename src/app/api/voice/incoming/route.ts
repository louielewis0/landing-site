import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/voice/incoming — Twilio "A Call Comes In" webhook for the dedicated
 * BUSINESS number (used for Local Services Ads, Google profile, cards, signs).
 *
 * Routing ("ring me first, Maya on miss"):
 *   1. Ring the broker's cell for RING_TIMEOUT seconds (shows the real caller's
 *      number via callerId), so a live human answers when available.
 *   2. If the cell doesn't answer, the <Dial> ends and we fall through to Maya
 *      (the Vapi AI receptionist number), who catches the lead.
 *
 * The broker's PERSONAL cell has NO carrier forwarding — friends calling the
 * cell directly go to normal voicemail and never reach Maya. Only calls that
 * arrive through this business number can ever fall back to the AI.
 *
 * Config (env overrides, with safe public-number fallbacks):
 *   BUSINESS_CELL   — where to ring first (broker cell). Default: public office cell.
 *   VAPI_NUMBER     — Maya's number to hand off to on no-answer. Until set, the
 *                     call simply rings the cell (no AI fallback yet).
 *   RING_TIMEOUT    — seconds to ring the cell before Maya (default 16; keep it
 *                     below the cell's voicemail pickup so VM doesn't grab it).
 */

const CELL = process.env.BUSINESS_CELL || "+12485686081";
const MAYA = process.env.VAPI_NUMBER || "+12488349166"; // Maya (Vapi AI receptionist)
const RING_TIMEOUT = Number(process.env.RING_TIMEOUT || 13);

const xml = (body: string) =>
  new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<Response>${body}</Response>`, {
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function handle(req: NextRequest) {
  // Twilio posts form-encoded; `From` is the real caller we want to show on the cell.
  let from = "";
  try {
    const form = await req.formData();
    from = String(form.get("From") || "");
  } catch {
    /* no body (e.g. a GET health check) — fine */
  }

  const callerId = /^\+?\d{10,15}$/.test(from) ? ` callerId="${esc(from)}"` : "";

  // Leg 1: ring the cell. answerOnBridge => caller hears ringing, not silence.
  let body = `<Dial timeout="${RING_TIMEOUT}" answerOnBridge="true"${callerId}><Number>${esc(CELL)}</Number></Dial>`;

  // Leg 2 (only reached if the cell didn't answer): hand off to Maya.
  if (MAYA) {
    body += `<Dial answerOnBridge="true"><Number>${esc(MAYA)}</Number></Dial>`;
  }

  return xml(body);
}

export async function POST(req: NextRequest) {
  return handle(req);
}

// Allow a plain browser GET to see the TwiML for sanity-checking.
export async function GET(req: NextRequest) {
  return handle(req);
}
