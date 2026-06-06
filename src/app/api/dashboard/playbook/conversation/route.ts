import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * POST   /api/dashboard/playbook/conversation
 *   → records one conversation started (toward the weekly 15-target).
 *   Body: { note?: string }
 *
 * DELETE /api/dashboard/playbook/conversation?id=<uuid>
 *   → removes a specific conversation row. Lets the UI offer an
 *     undo on the last entry.
 *
 * Why a separate table from leads: conversations counted here are the
 * UPSTREAM number — every chat, text, BNI handshake, bagel-route stop
 * — not just the ones that became leads. The whole point of the KPI
 * (segments 5, 7, 9) is to track the activity that produces leads,
 * before any lead exists.
 */

type Body = { note?: unknown };

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  const note =
    typeof body.note === "string" && body.note.trim().length
      ? body.note.trim()
      : null;

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("playbook_conversations")
    .insert({ note })
    .select("id, started_at, note")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ conversation: data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "id query parameter required" },
      { status: 400 },
    );
  }

  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from("playbook_conversations")
    .delete()
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
