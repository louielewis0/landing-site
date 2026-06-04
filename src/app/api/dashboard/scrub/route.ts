import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * POST /api/dashboard/scrub
 * Body: { pastedNumbers: string }
 * Returns: {
 *   report: { pasted, checked, blocked, cleared, skipped },
 *   blockedIds: string[],
 *   clearedIds: string[]
 * }
 *
 * Moves DNC matching to the server so the client never needs to read the
 * leads table directly. The client now just hands over the pasted block
 * of text from the federal DNC registry and the route does the rest.
 */

function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D+/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  if (digits.length === 10) return digits;
  return null;
}

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { pastedNumbers?: unknown };
  const pastedText = typeof body.pastedNumbers === "string" ? body.pastedNumbers : "";

  // Parse pasted numbers — accept newline, comma, semicolon, pipe, whitespace.
  const pastedSet = new Set<string>();
  for (const token of pastedText.split(/[\s,;|]+/)) {
    const norm = normalizePhone(token);
    if (norm) pastedSet.add(norm);
  }

  if (pastedSet.size === 0) {
    return NextResponse.json(
      { error: "No valid 10-digit US phone numbers found in the pasted list." },
      { status: 400 }
    );
  }

  const { data: leads, error: selErr } = await getSupabaseAdmin()
    .from("leads")
    .select("id, phone");
  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }

  const blockIds: string[] = [];
  const clearIds: string[] = [];
  let skipped = 0;

  for (const lead of leads ?? []) {
    const norm = normalizePhone(lead.phone);
    if (!norm) {
      skipped++;
      continue;
    }
    if (pastedSet.has(norm)) blockIds.push(lead.id);
    else clearIds.push(lead.id);
  }

  // Two batch UPDATEs — O(2) queries vs O(N).
  if (blockIds.length) {
    const { error } = await getSupabaseAdmin()
      .from("leads")
      .update({ do_not_call: true, dnc_scrubbed: false })
      .in("id", blockIds);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  if (clearIds.length) {
    const { error } = await getSupabaseAdmin()
      .from("leads")
      .update({ do_not_call: false, dnc_scrubbed: true })
      .in("id", clearIds);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    report: {
      pasted: pastedSet.size,
      checked: blockIds.length + clearIds.length,
      blocked: blockIds.length,
      cleared: clearIds.length,
      skipped,
    },
    blockedIds: blockIds,
    clearedIds: clearIds,
  });
}
