import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS, type Lead } from "@/lib/lead-shape";

/**
 * POST /api/dashboard/trace
 * Body: { leadId: string }
 *
 * Skip-traces one lead through EnformionGO (Endato) Contact Enrich:
 * lead name + address in, phone numbers out. Best number is written
 * to the lead's phone field (only if currently blank) and every
 * trace is logged as a 'note' activity — which doubles as the usage
 * meter: traces are counted by those notes and refused past
 * ENFORMION_TRACE_CAP (default 100, the free-trial allowance) so a
 * stray click can never silently run up the bill. Raise the cap via
 * env once billing is intentional.
 *
 * Env (server-only, set in Vercel):
 *   ENFORMION_AP_NAME      — galaxy-ap-name header
 *   ENFORMION_AP_PASSWORD  — galaxy-ap-password header
 *   ENFORMION_TRACE_CAP    — optional, integer, default 100
 *
 * The response phone location isn't publicly documented, so
 * findPhones() hunts recursively for the first array of objects
 * carrying a phone-ish field. On a shape miss we return the top-level
 * keys we saw so the parser can be adjusted without guessing.
 */

const TRACE_MARKER = "Skip trace (Enformion):";

type FoundPhone = { number: string; type?: string; isConnected?: boolean };

function findPhones(node: unknown, depth = 0): FoundPhone[] {
  if (!node || typeof node !== "object" || depth > 6) return [];
  if (Array.isArray(node)) {
    const phones: FoundPhone[] = [];
    for (const item of node) {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const o = item as Record<string, unknown>;
        const raw =
          (typeof o.number === "string" && o.number) ||
          (typeof o.phoneNumber === "string" && o.phoneNumber) ||
          (typeof o.phone === "string" && o.phone) ||
          null;
        if (raw) {
          phones.push({
            number: raw,
            type:
              (typeof o.type === "string" && o.type) ||
              (typeof o.phoneType === "string" && o.phoneType) ||
              undefined,
            isConnected:
              typeof o.isConnected === "boolean" ? o.isConnected : undefined,
          });
        }
      }
    }
    if (phones.length) return phones;
    for (const item of node) {
      const nested = findPhones(item, depth + 1);
      if (nested.length) return nested;
    }
    return [];
  }
  const obj = node as Record<string, unknown>;
  // Prefer keys literally named phones/phoneNumbers
  for (const key of Object.keys(obj)) {
    if (/phone/i.test(key) && Array.isArray(obj[key])) {
      const found = findPhones(obj[key], depth + 1);
      if (found.length) return found;
    }
  }
  for (const key of Object.keys(obj)) {
    const found = findPhones(obj[key], depth + 1);
    if (found.length) return found;
  }
  return [];
}

function normalizeTen(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return null;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apName = process.env.ENFORMION_AP_NAME;
  const apPassword = process.env.ENFORMION_AP_PASSWORD;
  if (!apName || !apPassword) {
    return NextResponse.json(
      { error: "Enformion API keys not configured (ENFORMION_AP_NAME / ENFORMION_AP_PASSWORD)." },
      { status: 500 }
    );
  }
  const cap = Math.max(0, parseInt(process.env.ENFORMION_TRACE_CAP ?? "100", 10) || 100);

  const body = (await req.json().catch(() => ({}))) as { leadId?: unknown };
  const leadId = typeof body.leadId === "string" ? body.leadId : "";
  if (!leadId) {
    return NextResponse.json({ error: "leadId is required" }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data: lead, error: leadErr } = await admin
    .from("leads")
    .select("id, name, address, phone")
    .eq("id", leadId)
    .single();
  if (leadErr || !lead) {
    return NextResponse.json({ error: leadErr?.message ?? "Lead not found" }, { status: 404 });
  }
  if (lead.phone) {
    return NextResponse.json(
      { error: "Lead already has a phone number — clear it first if you want a re-trace." },
      { status: 400 }
    );
  }
  if (!lead.name || lead.name.startsWith("Owner —")) {
    return NextResponse.json(
      { error: "Add the owner's real name first (Realist lookup) — tracing matches on name + address." },
      { status: 400 }
    );
  }
  if (!lead.address) {
    return NextResponse.json({ error: "Lead has no address to match on." }, { status: 400 });
  }

  // Usage meter: count prior trace notes across all leads.
  const { count, error: cntErr } = await admin
    .from("activities")
    .select("id", { count: "exact", head: true })
    .like("body", `${TRACE_MARKER}%`);
  if (cntErr) {
    return NextResponse.json({ error: cntErr.message }, { status: 500 });
  }
  const used = count ?? 0;
  if (used >= cap) {
    return NextResponse.json(
      {
        error: `Trace cap reached (${used}/${cap}). Raise ENFORMION_TRACE_CAP in Vercel env once you've decided to pay per search.`,
      },
      { status: 429 }
    );
  }

  // Name: assume "First Last"; take first + last token.
  const tokens = lead.name.trim().split(/\s+/);
  const firstName = tokens[0];
  const lastName = tokens.length > 1 ? tokens[tokens.length - 1] : "";
  // Address: street on line 1, "City, ST ZIP" on line 2.
  const [line1, ...rest] = lead.address.split(",");
  const line2 = rest.join(",").trim();

  let apiJson: unknown;
  try {
    const res = await fetch("https://devapi.endato.com/Contact/Enrich", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "galaxy-ap-name": apName,
        "galaxy-ap-password": apPassword,
        "galaxy-search-type": "DevAPIContactEnrich",
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Address: { addressLine1: line1.trim(), addressLine2: line2 },
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Enformion returned ${res.status}: ${text.slice(0, 300)}` },
        { status: 502 }
      );
    }
    apiJson = await res.json();
  } catch (e) {
    return NextResponse.json(
      { error: `Enformion request failed: ${e instanceof Error ? e.message : String(e)}` },
      { status: 502 }
    );
  }

  const rawPhones = findPhones(apiJson);
  const phones = rawPhones
    .map((p) => ({ ...p, number: normalizeTen(p.number) }))
    .filter((p): p is FoundPhone & { number: string } => !!p.number);

  if (!phones.length) {
    const keys =
      apiJson && typeof apiJson === "object"
        ? Object.keys(apiJson as object).join(", ")
        : typeof apiJson;
    // Still log the attempt — it consumed a search.
    await admin.from("activities").insert({
      lead_id: lead.id,
      type: "note",
      body: `${TRACE_MARKER} no phone found for ${lead.name}`,
    });
    return NextResponse.json(
      {
        error: `No phone in the response (search used). Top-level keys seen: ${keys}`,
        used: used + 1,
        cap,
      },
      { status: 404 }
    );
  }

  // Best number: connected + wireless first, then connected, then first.
  const score = (p: FoundPhone) =>
    (p.isConnected === false ? -2 : p.isConnected ? 2 : 0) +
    (p.type && /mobile|wireless|cell/i.test(p.type) ? 1 : 0);
  phones.sort((a, b) => score(b) - score(a));
  const best = phones[0];

  const { data: updated, error: updErr } = await admin
    .from("leads")
    .update({ phone: best.number })
    .eq("id", lead.id)
    .select(LEAD_COLUMNS)
    .single();
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  const others = phones
    .slice(1, 4)
    .map((p) => `${p.number}${p.type ? ` (${p.type})` : ""}`)
    .join(", ");
  await admin.from("activities").insert({
    lead_id: lead.id,
    type: "note",
    body: `${TRACE_MARKER} best ${best.number}${best.type ? ` (${best.type})` : ""}${
      others ? ` · also: ${others}` : ""
    }`,
  });

  return NextResponse.json({
    lead: updated as unknown as Lead,
    phones,
    used: used + 1,
    cap,
  });
}
