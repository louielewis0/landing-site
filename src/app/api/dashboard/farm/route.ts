import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { geocodeAddress } from "@/lib/geocode";

/**
 * Farm targets — the expired-listing door-knock map.
 *
 * GET  /api/dashboard/farm         → all targets, newest first
 * POST /api/dashboard/farm         → { addresses: string[] }: geocode
 *   each, insert (dedupe on normalized address), return the batch.
 *
 * Backed by public.farm_targets (see the SQL the user runs once).
 * Same service-role + x-dashboard-auth pattern as the rest of
 * /api/dashboard/*.
 */

// Geocoding a big paste can take a while — give the function room.
export const maxDuration = 60;

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await getSupabaseAdmin()
    .from("farm_targets")
    .select("id, address, lat, lng, carded, carded_at, notes, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ targets: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { addresses?: unknown };
  const raw = Array.isArray(body.addresses) ? body.addresses : [];

  // Clean + dedupe within the paste.
  const seen = new Set<string>();
  const addresses: string[] = [];
  for (const a of raw) {
    if (typeof a !== "string") continue;
    const t = a.trim();
    if (!t) continue;
    const k = norm(t);
    if (seen.has(k)) continue;
    seen.add(k);
    addresses.push(t);
  }
  if (addresses.length === 0) {
    return NextResponse.json({ error: "No addresses provided." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();

  // Skip addresses already in the table (dedupe against existing farm).
  const { data: existing } = await admin.from("farm_targets").select("address");
  const have = new Set((existing ?? []).map((r) => norm((r as { address: string }).address)));

  const toAdd = addresses.filter((a) => !have.has(norm(a)));
  const skippedDup = addresses.length - toAdd.length;

  let added = 0;
  let failed = 0;

  // Geocode + insert one at a time so partial progress always persists
  // (a slow fallback on one address never loses the earlier ones).
  for (const address of toAdd) {
    const geo = await geocodeAddress(
      // Nudge the geocoder toward Metro Detroit if the paste omits state.
      /\bmi\b|michigan/i.test(address) ? address : `${address}, MI`,
    );
    if (!geo) {
      failed++;
      continue;
    }
    const { error } = await admin
      .from("farm_targets")
      .insert({ address, lat: geo.lat, lng: geo.lng });
    if (error) {
      failed++;
      continue;
    }
    added++;
    await new Promise((r) => setTimeout(r, 120));
  }

  return NextResponse.json({ added, failed, skippedDup });
}
