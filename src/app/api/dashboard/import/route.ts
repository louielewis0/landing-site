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
  if (!rows.length) {
    return NextResponse.json(
      { error: "Couldn't find any rows in that paste." },
      { status: 400 }
    );
  }

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  let cAddr = findCol(headers, "address");
  let cMls = findCol(headers, "mls #", "mls#", "mls number", "mls");
  let cStat = findCol(headers, "stat", "status");
  let cTy = findCol(headers, "ty", "type", "prop type");
  let cCity = findCol(headers, "city");
  let cZip = findCol(headers, "zip", "postal");
  let cCounty = findCol(headers, "county");
  let cPrice = findCol(headers, "current price", "list price", "price");
  let cDom = findCol(headers, "dom", "days on market", "cdom");
  // Skip-trace enrichment columns (BatchSkipTracing/REISkip result files):
  // phone + owner name. When a row matches an existing lead, these fill
  // in the blanks instead of the row counting as a plain duplicate.
  let cPhone = findCol(headers, "phone", "mobile", "cell");
  const cFirst = findCol(headers, "first name", "firstname");
  const cLast = findCol(headers, "last name", "lastname");
  const cName = findCol(headers, "owner name", "full name", "contact name", "name");
  let dataRows = rows.slice(1);

  if (cAddr === -1) {
    // No header row — infer columns from the shape of the data itself.
    // Handles headerless pastes and copy/paste straight off the Matrix
    // results grid. Every row is treated as data.
    const width = Math.max(...rows.map((r) => r.length));
    const frac = (test: (v: string) => boolean, exclude: number[] = []) => {
      let best = -1;
      let bestScore = 0;
      for (let i = 0; i < width; i++) {
        if (exclude.includes(i)) continue;
        let hits = 0;
        for (const r of rows) if (test((r[i] ?? "").trim())) hits++;
        const score = hits / rows.length;
        if (score > bestScore) {
          bestScore = score;
          best = i;
        }
      }
      return bestScore >= 0.5 ? best : -1;
    };

    cAddr = frac((v) => /^\d+\s+[A-Za-z]/.test(v));
    if (cAddr === -1) {
      return NextResponse.json(
        {
          error: `Couldn't find an Address column (no header row, and no column looks like street addresses). First row seen: ${rows[0].join(" | ")}`,
        },
        { status: 400 }
      );
    }
    cMls = frac((v) => /^\d{8,}$/.test(v), [cAddr]);
    cStat = frac((v) => /^[A-Z]{3,6}$/.test(v), [cAddr, cMls]);
    cTy = frac((v) => /^[A-Z]{2}$/.test(v), [cAddr, cMls, cStat]);
    cPrice = frac((v) => /\$\s?\d/.test(v), [cAddr, cMls, cStat, cTy]);
    cDom = frac((v) => /\d+\/\d+/.test(v) && !/\$/.test(v), [cAddr, cMls, cStat, cTy, cPrice]);
    const MI_COUNTIES = new Set([
      "oakland", "macomb", "wayne", "livingston", "washtenaw",
      "genesee", "lapeer", "st. clair", "st clair", "monroe", "shiawassee",
    ]);
    cCounty = frac((v) => MI_COUNTIES.has(v.toLowerCase()), [cAddr, cMls, cStat, cTy, cPrice, cDom]);
    // City: first remaining column that's mostly letters/spaces
    cCity = frac(
      (v) => v.length > 2 && /^[A-Za-z][A-Za-z .'-]+$/.test(v),
      [cAddr, cMls, cStat, cTy, cPrice, cDom, cCounty]
    );
    cZip = frac((v) => /^\d{5}(-\d{4})?$/.test(v), [cAddr, cMls, cStat, cTy, cPrice, cDom, cCounty, cCity]);
    cPhone = frac(
      (v) => {
        const d = v.replace(/\D/g, "");
        const tenDigit = d.length === 10 || (d.length === 11 && d.startsWith("1"));
        // require formatting punctuation so bare MLS-style digit runs don't false-match
        return tenDigit && /[-() .]/.test(v.trim());
      },
      [cAddr, cMls, cStat, cTy, cPrice, cDom, cCounty, cCity, cZip]
    );
    dataRows = rows;
  }

  if (!dataRows.length) {
    return NextResponse.json(
      { error: "Found a header row but no listing rows under it." },
      { status: 400 }
    );
  }

  // Existing leads for dedupe + enrichment. Address and MLS # (carried
  // in message) both key back to the lead so a matched row can fill in
  // a missing phone / placeholder name instead of just counting as dupe.
  const admin = getSupabaseAdmin();
  const { data: existing, error: selErr } = await admin
    .from("leads")
    .select("id, address, message, phone, name");
  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }
  type ExistingLead = { id: string; address: string | null; message: string | null; phone: string | null; name: string };
  const byAddr = new Map<string, ExistingLead>();
  const byMls = new Map<string, ExistingLead>();
  for (const l of (existing ?? []) as ExistingLead[]) {
    const na = normAddr(l.address);
    if (na && !byAddr.has(na)) byAddr.set(na, l);
    const mlsMatches = (l.message ?? "").match(/MLS #(\w+)/g) ?? [];
    for (const m of mlsMatches) byMls.set(m.replace("MLS #", ""), l);
  }

  const formatPhone = (raw: string): string | null => {
    let d = raw.replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
    if (d.length !== 10) return null;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  const rowName = (r: string[]): string | null => {
    if (cFirst !== -1 && cLast !== -1) {
      const n = `${(r[cFirst] ?? "").trim()} ${(r[cLast] ?? "").trim()}`.trim();
      return n.length > 1 ? n : null;
    }
    if (cName !== -1) {
      const n = (r[cName] ?? "").trim();
      return n.length > 1 ? n : null;
    }
    return null;
  };

  const today = new Date().toISOString().slice(0, 10);
  const inserts: Record<string, string | null>[] = [];
  const enrichments = new Map<string, { phone?: string; name?: string }>();
  let duplicates = 0;
  let invalid = 0;

  for (const r of dataRows) {
    const rawAddr = (r[cAddr] ?? "").trim();
    if (!rawAddr) {
      invalid++;
      continue;
    }
    const mls = cMls !== -1 ? (r[cMls] ?? "").trim() : "";
    const na = normAddr(rawAddr);
    const matched = (mls && byMls.get(mls)) || (na && byAddr.get(na)) || null;
    if (matched && !matched.id) {
      // matched a row inserted earlier in this same file — plain dupe
      duplicates++;
      continue;
    }
    if (matched) {
      // Enrichment pass: fill blanks on the existing lead from this row.
      const patch: { phone?: string; name?: string } = enrichments.get(matched.id) ?? {};
      const phone = cPhone !== -1 ? formatPhone(r[cPhone] ?? "") : null;
      if (phone && !matched.phone && !patch.phone) patch.phone = phone;
      const nm = rowName(r);
      if (nm && matched.name.startsWith("Owner —") && !patch.name) patch.name = nm;
      if (patch.phone || patch.name) {
        enrichments.set(matched.id, patch);
      } else {
        duplicates++;
      }
      continue;
    }
    if (mls) byMls.set(mls, { id: "", address: rawAddr, message: null, phone: null, name: "" });
    if (na) byAddr.set(na, { id: "", address: rawAddr, message: null, phone: null, name: "" });

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

  // Apply enrichments (phone / name fill-ins on existing leads)
  const updatedLeads: Lead[] = [];
  for (const [id, patch] of enrichments) {
    const { data, error } = await admin
      .from("leads")
      .update(patch)
      .eq("id", id)
      .select(LEAD_COLUMNS)
      .single();
    if (error) {
      return NextResponse.json(
        {
          error: `Imported ${insertedLeads.length}, but enrichment failed after ${updatedLeads.length} updates: ${error.message}`,
        },
        { status: 500 }
      );
    }
    updatedLeads.push(data as unknown as Lead);
  }

  return NextResponse.json({
    report: {
      rows: dataRows.length,
      imported: insertedLeads.length,
      updated: updatedLeads.length,
      duplicates,
      invalid,
    },
    leads: insertedLeads,
    updatedLeads,
  });
}
