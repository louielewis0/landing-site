import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS, type Lead } from "@/lib/lead-shape";

/**
 * POST /api/dashboard/import
 * Body: { csv: string } — raw contents of a Realcomp Matrix export
 * (CSV or tab-separated; the daily EXPIREDS auto-email results or
 * the 0-365 backlog pull).
 *
 * Returns: {
 *   report: { rows, imported, duplicates, invalid },
 *   leads: Lead[]   // the inserted rows, for optimistic prepend
 * }
 *
 * Column mapping is fuzzy on purpose — Matrix export templates vary
 * (MLS #, Stat, Address, City, Zip, County, Price/Current Price,
 * DOM). Only an address column is mandatory; everything else
 * degrades to null.
 *
 * Dedupe: a row is a duplicate if its MLS number appears in an
 * existing lead's message, or its normalized street address matches
 * an existing lead's normalized address. Re-importing the same
 * export is therefore safe.
 *
 * Every import lands as: status 'new', source 'Expired',
 * intent/transaction 'sell', follow_up_date today — so the playbook
 * queue picks it up immediately. Priority: 'hot' at ≥ $400k list.
 */

function parseDelimited(text: string): string[][] {
  const firstLine = text.slice(0, text.indexOf("\n") + 1 || text.length);
  const delim = (firstLine.match(/\t/g)?.length ?? 0) >
    (firstLine.match(/,/g)?.length ?? 0)
    ? "\t"
    : ",";

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === delim) {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f.trim().length)) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  row.push(field);
  if (row.some((f) => f.trim().length)) rows.push(row);
  return rows;
}

function findCol(headers: string[], ...needles: string[]): number {
  // exact match first, then substring — so "City" wins over "Mailing City"
  for (const n of needles) {
    const exact = headers.findIndex((h) => h === n);
    if (exact !== -1) return exact;
  }
  for (const n of needles) {
    const idx = headers.findIndex((h) => h.includes(n) && !h.includes("mailing"));
    if (idx !== -1) return idx;
  }
  return -1;
}

function normAddr(a: string | null | undefined): string {
  if (!a) return "";
  // street portion only (before first comma), lowercased, alphanumeric
  return a.split(",")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Matrix DOM cells can look like "N/48/48" (list/DOM/CDOM). Take the last number. */
function parseDom(v: string): number | null {
  const nums = v.match(/\d+/g);
  if (!nums || !nums.length) return null;
  return parseInt(nums[nums.length - 1], 10);
}

function parsePrice(v: string): number | null {
  const digits = v.replace(/[^0-9.]/g, "");
  if (!digits) return null;
  const n = Math.round(parseFloat(digits));
  return Number.isFinite(n) ? n : null;
}

const PROPERTY_TYPE_MAP: Record<string, string> = {
  RS: "single_family",
  CO: "condo",
  RESIDENTIAL: "single_family",
  CONDOMINIUM: "condo",
};

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { csv?: unknown };
  const csv = typeof body.csv === "string" ? body.csv : "";
  if (!csv.trim()) {
    return NextResponse.json({ error: "Paste a Matrix CSV export first." }, { status: 400 });
  }

  const rows = parseDelimited(csv);
  if (rows.length < 2) {
    return NextResponse.json(
      { error: "Couldn't find a header row plus data rows in that paste." },
      { status: 400 }
    );
  }

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const cAddr = findCol(headers, "address");
  if (cAddr === -1) {
    return NextResponse.json(
      { error: `No Address column found. Headers seen: ${rows[0].join(" | ")}` },
      { status: 400 }
    );
  }
  const cMls = findCol(headers, "mls #", "mls#", "mls number", "mls");
  const cStat = findCol(headers, "stat", "status");
  const cTy = findCol(headers, "ty", "type", "prop type");
  const cCity = findCol(headers, "city");
  const cZip = findCol(headers, "zip", "postal");
  const cCounty = findCol(headers, "county");
  const cPrice = findCol(headers, "current price", "list price", "price");
  const cDom = findCol(headers, "dom", "days on market", "cdom");

  // Existing leads for dedupe — address + message (message carries MLS #)
  const admin = getSupabaseAdmin();
  const { data: existing, error: selErr } = await admin
    .from("leads")
    .select("id, address, message");
  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }
  const seenAddr = new Set<string>();
  const seenMls = new Set<string>();
  for (const l of existing ?? []) {
    const na = normAddr(l.address);
    if (na) seenAddr.add(na);
    const mlsMatches = (l.message ?? "").match(/MLS #(\w+)/g) ?? [];
    for (const m of mlsMatches) seenMls.add(m.replace("MLS #", ""));
  }

  const today = new Date().toISOString().slice(0, 10);
  const inserts: Record<string, string | null>[] = [];
  let duplicates = 0;
  let invalid = 0;

  for (const r of rows.slice(1)) {
    const rawAddr = (r[cAddr] ?? "").trim();
    if (!rawAddr) {
      invalid++;
      continue;
    }
    const mls = cMls !== -1 ? (r[cMls] ?? "").trim() : "";
    const na = normAddr(rawAddr);
    if ((mls && seenMls.has(mls)) || (na && seenAddr.has(na))) {
      duplicates++;
      continue;
    }
    if (mls) seenMls.add(mls);
    if (na) seenAddr.add(na);

    const city = cCity !== -1 ? (r[cCity] ?? "").trim() : "";
    const zip = cZip !== -1 ? (r[cZip] ?? "").trim() : "";
    const county = cCounty !== -1 ? (r[cCounty] ?? "").trim() : "";
    const stat = cStat !== -1 ? (r[cStat] ?? "").trim() : "";
    const ty = cTy !== -1 ? (r[cTy] ?? "").trim().toUpperCase() : "";
    const priceRaw = cPrice !== -1 ? (r[cPrice] ?? "").trim() : "";
    const price = priceRaw ? parsePrice(priceRaw) : null;
    const dom = cDom !== -1 ? parseDom(r[cDom] ?? "") : null;

    const messageParts = ["Matrix import"];
    if (mls) messageParts.push(`MLS #${mls}`);
    if (stat) messageParts.push(stat);
    if (dom !== null) messageParts.push(`${dom} DOM`);
    if (county) messageParts.push(`${county} County`);
    if (price !== null) messageParts.push(`listed $${price.toLocaleString("en-US")}`);

    inserts.push({
      name: `Owner — ${rawAddr}`,
      email: null,
      phone: null,
      intent: "sell",
      message: messageParts.join(" · "),
      source: "Expired",
      address: [rawAddr, city, zip ? `MI ${zip}` : "MI"].filter(Boolean).join(", "),
      lead_type: "seller",
      property_type: PROPERTY_TYPE_MAP[ty] ?? null,
      transaction_type: "sell",
      budget_range: price !== null ? `$${price.toLocaleString("en-US")}` : null,
      priority: price !== null && price >= 400000 ? "hot" : "warm",
      follow_up_date: today,
      status: "new",
    });
  }

  const insertedLeads: Lead[] = [];
  for (let i = 0; i < inserts.length; i += 200) {
    const chunk = inserts.slice(i, i + 200);
    const { data, error } = await admin
      .from("leads")
      .insert(chunk)
      .select(LEAD_COLUMNS);
    if (error) {
      return NextResponse.json(
        {
          error: `Insert failed after ${insertedLeads.length} rows: ${error.message}`,
        },
        { status: 500 }
      );
    }
    insertedLeads.push(...((data ?? []) as unknown as Lead[]));
  }

  return NextResponse.json({
    report: {
      rows: rows.length - 1,
      imported: insertedLeads.length,
      duplicates,
      invalid,
    },
    leads: insertedLeads,
  });
}
