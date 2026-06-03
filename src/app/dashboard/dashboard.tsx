"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Phone,
  Mail,
  Search,
  Download,
  RefreshCw,
  ShieldCheck,
  ShieldQuestion,
  Lock,
  AlertCircle,
  FileText,
  TriangleAlert,
  Plus,
  X,
  MapPin,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   Types + constants
   ───────────────────────────────────────────────────────────────────────── */

type LeadStatus = "new" | "attempted" | "contacted" | "dead";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  intent: string | null;
  message: string | null;
  source: string | null;
  address: string | null;
  status: LeadStatus;
  dnc_scrubbed: boolean;
  do_not_call: boolean;
};

const STATUS_CYCLE: LeadStatus[] = ["new", "attempted", "contacted", "dead"];

/* Intent + source vocabularies for the manual-entry form.
   Keep these in sync with the public /leads page intent values so the
   dashboard can filter / report consistently. */
const INTENT_OPTIONS = ["Buy", "Sell", "Both", "Just browsing"] as const;
type IntentOption = (typeof INTENT_OPTIONS)[number];

const SOURCE_OPTIONS = [
  "Expired",
  "FSBO",
  "Circle Prospect",
  "Geographic Farm",
  "Referral",
  "Inbound",
  "Other",
] as const;
type SourceOption = (typeof SOURCE_OPTIONS)[number];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-bone/10 text-bone border-bone/20",
  attempted: "bg-[var(--gold-soft)]/15 text-[var(--gold-soft)] border-[var(--gold-soft)]/35",
  contacted: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/40",
  dead: "bg-rust/20 text-rust border-rust/40",
};

/* ─────────────────────────────────────────────────────────────────────────
   Phone normalization
   - Strips all non-digits
   - If 11 digits with leading 1 (US country code), drop the 1
   - Returns null for anything that isn't a clean 10-digit number
   ───────────────────────────────────────────────────────────────────────── */
function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D+/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  if (digits.length === 10) return digits;
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState("");

  // Search + filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");

  // Manual add-lead panel state
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [addIntent, setAddIntent] = useState<IntentOption>("Buy");
  const [addSource, setAddSource] = useState<SourceOption | "">("");
  const [addNotes, setAddNotes] = useState("");
  const [adding, setAdding] = useState(false);
  const [addErr, setAddErr] = useState("");
  const [addJustSaved, setAddJustSaved] = useState(false);

  // DNC scrubber UI state
  const [dncInput, setDncInput] = useState("");
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubReport, setScrubReport] = useState<{
    checked: number;
    pasted: number;
    blocked: number;
    cleared: number;
    skipped: number;
  } | null>(null);
  const [scrubErr, setScrubErr] = useState("");

  /* ── Fetch all leads, newest first ────────────────────────────────────── */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setFetchErr("");
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, created_at, name, email, phone, intent, message, source, address, status, dnc_scrubbed, do_not_call"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setFetchErr(error.message);
      setLeads([]);
    } else {
      setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /* ── Stats ────────────────────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const callable = leads.filter(
      (l) => l.dnc_scrubbed && !l.do_not_call && l.status !== "dead"
    ).length;
    const blocked = leads.filter((l) => l.do_not_call).length;
    return { total, newCount, callable, blocked };
  }, [leads]);

  /* ── Filtered view (search + status filter) ───────────────────────────── */
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      const hay = `${l.name} ${l.phone ?? ""} ${l.email ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [leads, search, statusFilter]);

  /* ── Mutations ────────────────────────────────────────────────────────── */

  // Status pill click — advance to next status in cycle
  async function cycleStatus(lead: Lead) {
    const idx = STATUS_CYCLE.indexOf(lead.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    setLeads((cur) => cur.map((l) => (l.id === lead.id ? { ...l, status: next } : l)));
    const { error } = await supabase.from("leads").update({ status: next }).eq("id", lead.id);
    if (error) {
      // Revert on failure
      setLeads((cur) => cur.map((l) => (l.id === lead.id ? { ...l, status: lead.status } : l)));
      alert(`Failed to update status: ${error.message}`);
    }
  }

  /* ── Manual add lead ──────────────────────────────────────────────────── */
  // Inserts a single row into the leads table from the manual-entry panel.
  // RLS: leads_insert_anon (defined in supabase/leads.sql) already allows
  // anon INSERT, which is how the public /leads form works. No policy
  // change needed for this entry point.
  // After insert, we .select().single() to get the row back and prepend it
  // to local state instead of refetching everything.
  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    if (!addName.trim()) return;
    if (!addSource) {
      setAddErr("Pick a source so cold leads are distinguishable from inbound ones.");
      return;
    }
    setAdding(true);
    setAddErr("");

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: addName.trim(),
        phone: addPhone.trim() || null,
        email: addEmail.trim() || null,
        address: addAddress.trim() || null,
        intent: addIntent,
        source: addSource,
        message: addNotes.trim() || null,
        // status, dnc_scrubbed, do_not_call all use column defaults
      })
      .select(
        "id, created_at, name, email, phone, intent, message, source, address, status, dnc_scrubbed, do_not_call"
      )
      .single();

    if (error) {
      setAddErr(error.message);
      setAdding(false);
      return;
    }

    if (data) {
      setLeads((cur) => [data as Lead, ...cur]);
    }

    // Clear fields, leave the panel open for batch entry (FSBO / Expired
    // workflows usually mean entering 5-20 leads in a row).
    setAddName("");
    setAddPhone("");
    setAddEmail("");
    setAddAddress("");
    setAddIntent("Buy");
    // Keep source selection sticky — same source on consecutive batch entries.
    setAddNotes("");
    setAdding(false);

    setAddJustSaved(true);
    setTimeout(() => setAddJustSaved(false), 2200);
  }

  // Manual DNC scrubbed toggle. Locked when do_not_call is true.
  async function toggleScrubbed(lead: Lead) {
    if (lead.do_not_call) return; // visual lock
    const next = !lead.dnc_scrubbed;
    setLeads((cur) => cur.map((l) => (l.id === lead.id ? { ...l, dnc_scrubbed: next } : l)));
    const { error } = await supabase
      .from("leads")
      .update({ dnc_scrubbed: next })
      .eq("id", lead.id);
    if (error) {
      setLeads((cur) =>
        cur.map((l) => (l.id === lead.id ? { ...l, dnc_scrubbed: lead.dnc_scrubbed } : l))
      );
      alert(`Failed to update: ${error.message}`);
    }
  }

  /* ── DNC scrub — the legal-compliance core ────────────────────────────── */
  // Workflow:
  //  1. Parse pasted text into 10-digit numbers (handle pipes/commas/lines/etc).
  //  2. For each lead with a valid 10-digit phone, check membership in the set.
  //  3. Matches → do_not_call=true, dnc_scrubbed=false (visually locked, red).
  //  4. Non-matches → dnc_scrubbed=true, do_not_call=false (clear to call manually).
  //  5. Leads with invalid/empty phones are skipped and counted separately.
  //  6. Two batch UPDATEs (one per outcome) keep this O(2) queries instead of O(N).
  async function runDncScrub() {
    setScrubbing(true);
    setScrubErr("");
    setScrubReport(null);

    try {
      // Parse pasted numbers — accept newline, comma, semicolon, pipe, whitespace separators.
      const pastedSet = new Set<string>();
      for (const token of dncInput.split(/[\s,;|]+/)) {
        const norm = normalizePhone(token);
        if (norm) pastedSet.add(norm);
      }

      if (pastedSet.size === 0) {
        setScrubErr(
          "No valid phone numbers found in the pasted list. Expecting 10-digit US numbers."
        );
        setScrubbing(false);
        return;
      }

      const blockIds: string[] = [];
      const clearIds: string[] = [];
      let skipped = 0;

      for (const lead of leads) {
        const norm = normalizePhone(lead.phone);
        if (!norm) {
          skipped++;
          continue;
        }
        if (pastedSet.has(norm)) blockIds.push(lead.id);
        else clearIds.push(lead.id);
      }

      if (blockIds.length) {
        const { error } = await supabase
          .from("leads")
          .update({ do_not_call: true, dnc_scrubbed: false })
          .in("id", blockIds);
        if (error) throw error;
      }
      if (clearIds.length) {
        const { error } = await supabase
          .from("leads")
          .update({ dnc_scrubbed: true, do_not_call: false })
          .in("id", clearIds);
        if (error) throw error;
      }

      // Optimistic local sync
      setLeads((cur) =>
        cur.map((l) => {
          if (blockIds.includes(l.id)) return { ...l, do_not_call: true, dnc_scrubbed: false };
          if (clearIds.includes(l.id)) return { ...l, do_not_call: false, dnc_scrubbed: true };
          return l;
        })
      );

      setScrubReport({
        checked: blockIds.length + clearIds.length,
        pasted: pastedSet.size,
        blocked: blockIds.length,
        cleared: clearIds.length,
        skipped,
      });
    } catch (e) {
      setScrubErr(e instanceof Error ? e.message : "Scrub failed.");
    } finally {
      setScrubbing(false);
    }
  }

  /* ── CSV export of currently filtered rows ────────────────────────────── */
  function exportCsv() {
    const header = [
      "id",
      "created_at",
      "name",
      "phone",
      "email",
      "address",
      "intent",
      "message",
      "source",
      "status",
      "dnc_scrubbed",
      "do_not_call",
    ];
    const escape = (v: string | null | boolean) => {
      const s = v == null ? "" : String(v);
      // Wrap in quotes if contains comma/quote/newline; escape quotes
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const rows = visible.map((l) => [
      l.id,
      l.created_at,
      l.name,
      l.phone,
      l.email,
      l.address,
      l.intent,
      l.message,
      l.source,
      l.status,
      l.dnc_scrubbed,
      l.do_not_call,
    ]);
    const csv = [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-ink text-bone relative">
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Top bar */}
      <div className="border-b border-bone/10 bg-ink/80 backdrop-blur-2xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-light tracking-tight flex items-center gap-3 text-bone">
              <FileText className="w-4 h-4 text-[var(--gold-soft)]" strokeWidth={1.5} />
              Leads Dashboard
            </h1>
            <p className="text-[10px] text-bone/40 uppercase tracking-[0.22em] mt-1">
              Internal · Private
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdd((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-400 ${
                showAdd
                  ? "border border-bone/25 text-bone/80 hover:text-bone hover:border-bone/50"
                  : "bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink"
              }`}
            >
              {showAdd ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  Close
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add Lead
                </>
              )}
            </button>
            <button
              onClick={fetchAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-bone/20 text-bone/80 text-[12px] tracking-wide hover:border-[var(--gold)]/40 hover:text-bone transition-all duration-400"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {fetchErr && (
          <div className="mb-6 rounded-xl bg-rust/10 border border-rust/30 px-5 py-4 text-[14px] text-rust flex items-start gap-3">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Couldn&rsquo;t load leads.</div>
              <div className="text-rust/80 text-[13px] mt-1">{fetchErr}</div>
              <div className="text-bone/45 text-[12px] mt-2">
                Make sure the migration in <code>supabase/leads_migration.sql</code> has been run.
              </div>
            </div>
          </div>
        )}

        {/* Manual add-lead panel */}
        {showAdd && (
          <section className="rounded-2xl bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] p-7 mb-8 relative">
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="eyebrow mb-2">Add lead</p>
                <h2 className="font-display text-2xl font-light text-bone tracking-tight">
                  Manual entry
                </h2>
                <p className="text-[13px] text-bone/55 mt-2 font-light max-w-2xl">
                  Enter FSBOs, expireds, circle prospects, or referrals.
                  Source defaults to whatever you pick — use it to tell cold
                  leads apart from inbound form leads.
                </p>
              </div>
            </div>

            <form onSubmit={addLead} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Full name *"
                  autoFocus
                  className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
                />
                <input
                  type="tel"
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                  placeholder="Phone"
                  className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
                />
                <input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
                />
                <input
                  type="text"
                  value={addAddress}
                  onChange={(e) => setAddAddress(e.target.value)}
                  placeholder="Property address"
                  className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-2">
                    I&rsquo;m looking to
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {INTENT_OPTIONS.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAddIntent(val)}
                        className={`py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full border transition-all duration-400 ${
                          addIntent === val
                            ? "bg-[var(--gold)] text-ink border-[var(--gold)]"
                            : "bg-transparent text-bone/65 border-bone/20 hover:border-bone/40 hover:text-bone"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-2">
                    Source *
                  </label>
                  <select
                    required
                    value={addSource}
                    onChange={(e) => setAddSource(e.target.value as SourceOption)}
                    className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone text-[13.5px] font-medium focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-ink">
                      Choose source…
                    </option>
                    {SOURCE_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-ink">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                value={addNotes}
                onChange={(e) => setAddNotes(e.target.value)}
                placeholder="Notes — listing details, prior contact, motivation, anything worth remembering"
                rows={3}
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-y transition-all"
              />

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={adding || !addName.trim()}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
                >
                  {adding ? "Saving…" : "Save lead"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddName("");
                    setAddPhone("");
                    setAddEmail("");
                    setAddAddress("");
                    setAddIntent("Buy");
                    setAddNotes("");
                    setAddErr("");
                  }}
                  className="text-[12px] text-bone/45 hover:text-bone/70 transition-colors tracking-wide"
                >
                  Clear
                </button>
                {addJustSaved && (
                  <span className="inline-flex items-center gap-2 text-[12.5px] text-[var(--gold-soft)] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Saved. Ready for the next one.
                  </span>
                )}
              </div>

              {addErr && (
                <div className="text-[13px] text-rust flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {addErr}
                </div>
              )}
            </form>
          </section>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Stat label="Total" value={stats.total} />
          <Stat label="New" value={stats.newCount} />
          <Stat label="Callable" value={stats.callable} accent />
          <Stat label="Do Not Call" value={stats.blocked} danger />
        </div>

        {/* Compliance note — always visible */}
        <div className="rounded-2xl bg-bone/[0.03] border border-[var(--gold)]/25 p-6 mb-8 relative overflow-hidden">
          <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
          <div className="flex gap-4">
            <TriangleAlert className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="text-[13.5px] text-bone/75 font-light leading-relaxed">
              <span className="text-bone font-medium">Compliance reminder.</span>{" "}
              Federal DNC scrub alone is not enough. Cell phones cannot be
              autodialed under TCPA even when DNC-clear &mdash;{" "}
              <span className="text-[var(--gold-soft)]">manual dial only</span>.
              Maintain consent records for any lead you contact.
            </div>
          </div>
        </div>

        {/* DNC scrubber */}
        <section className="rounded-2xl bg-bone/[0.03] border border-bone/10 p-7 mb-10">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="eyebrow mb-2">DNC scrubber</p>
              <h2 className="font-display text-2xl font-light text-bone tracking-tight">
                Paste DNC list (248 / 586 / 313)
              </h2>
              <p className="text-[13px] text-bone/55 mt-2 font-light max-w-2xl">
                Paste numbers from the federal DNC registry download. We strip
                formatting and match by 10-digit number. Matches get flagged{" "}
                <span className="text-rust">DO NOT CALL</span>; everything else
                is marked <span className="text-[var(--gold-soft)]">clear to call</span>.
              </p>
            </div>
          </div>

          <textarea
            value={dncInput}
            onChange={(e) => setDncInput(e.target.value)}
            placeholder={`Paste numbers, one per line or comma-separated. Any format works:\n2485551234\n(586) 555-9876\n+1 313 555 4242`}
            rows={6}
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/30 font-mono text-[13px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-y transition-all"
          />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={runDncScrub}
              disabled={scrubbing || !dncInput.trim() || loading}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
            >
              {scrubbing ? "Scrubbing…" : "Run DNC scrub"}
            </button>
            <button
              onClick={() => {
                setDncInput("");
                setScrubReport(null);
                setScrubErr("");
              }}
              className="text-[12px] text-bone/45 hover:text-bone/70 transition-colors tracking-wide"
            >
              Clear
            </button>
          </div>

          {scrubErr && (
            <div className="mt-4 text-[13px] text-rust flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {scrubErr}
            </div>
          )}

          {scrubReport && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <ReportTile label="Pasted #s" value={scrubReport.pasted} />
              <ReportTile label="Checked" value={scrubReport.checked} />
              <ReportTile label="Blocked (DNC)" value={scrubReport.blocked} danger />
              <ReportTile label="Cleared" value={scrubReport.cleared} accent />
              <ReportTile label="Skipped (no phone)" value={scrubReport.skipped} />
            </div>
          )}
        </section>

        {/* Controls — search, filter, export */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bone/40" strokeWidth={1.5} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, or email"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/40 text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | LeadStatus)}
            className="px-4 py-3 rounded-full bg-bone/[0.04] border border-bone/15 text-bone text-[13px] font-medium focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
          >
            <option value="all" className="bg-ink">All statuses</option>
            <option value="new" className="bg-ink">New</option>
            <option value="attempted" className="bg-ink">Attempted</option>
            <option value="contacted" className="bg-ink">Contacted</option>
            <option value="dead" className="bg-ink">Dead</option>
          </select>

          <button
            onClick={exportCsv}
            disabled={visible.length === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-bone/20 text-bone/80 text-[12.5px] tracking-wide hover:border-[var(--gold)]/40 hover:text-bone transition-all duration-400 disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV ({visible.length})
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-bone/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="bg-bone/[0.03] text-[10px] text-bone/45 uppercase tracking-[0.22em]">
                  <th className="text-left px-5 py-3.5 font-medium">Created</th>
                  <th className="text-left px-5 py-3.5 font-medium">Lead</th>
                  <th className="text-left px-5 py-3.5 font-medium">Contact</th>
                  <th className="text-left px-5 py-3.5 font-medium">Intent</th>
                  <th className="text-left px-5 py-3.5 font-medium">Message</th>
                  <th className="text-left px-5 py-3.5 font-medium">Status</th>
                  <th className="text-left px-5 py-3.5 font-medium">DNC</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-bone/45 text-[14px]">
                      Loading leads…
                    </td>
                  </tr>
                )}
                {!loading && visible.length === 0 && !fetchErr && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-bone/45 text-[14px]">
                      {leads.length === 0
                        ? "No leads yet. They&rsquo;ll appear here as people submit forms."
                        : "No leads match your search/filter."}
                    </td>
                  </tr>
                )}
                {!loading &&
                  visible.map((l, i) => (
                    <LeadRow
                      key={l.id}
                      lead={l}
                      striped={i % 2 === 1}
                      onCycleStatus={() => cycleStatus(l)}
                      onToggleScrubbed={() => toggleScrubbed(l)}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Subcomponents
   ───────────────────────────────────────────────────────────────────────── */

function Stat({
  label,
  value,
  accent,
  danger,
}: {
  label: string;
  value: number;
  accent?: boolean;
  danger?: boolean;
}) {
  const valueColor = danger
    ? "text-rust"
    : accent
    ? "text-[var(--gold-soft)]"
    : "text-bone";
  return (
    <div className="rounded-2xl bg-bone/[0.03] border border-bone/10 px-6 py-5">
      <div className="text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-2">{label}</div>
      <div className={`font-display text-3xl font-light tracking-tight ${valueColor}`}>{value}</div>
    </div>
  );
}

function ReportTile({
  label,
  value,
  accent,
  danger,
}: {
  label: string;
  value: number;
  accent?: boolean;
  danger?: boolean;
}) {
  const valueColor = danger
    ? "text-rust"
    : accent
    ? "text-[var(--gold-soft)]"
    : "text-bone";
  return (
    <div className="rounded-xl bg-bone/[0.04] border border-bone/10 px-4 py-3">
      <div className="text-[9.5px] text-bone/45 uppercase tracking-[0.22em] mb-1">{label}</div>
      <div className={`font-display text-xl font-light ${valueColor}`}>{value}</div>
    </div>
  );
}

function LeadRow({
  lead,
  striped,
  onCycleStatus,
  onToggleScrubbed,
}: {
  lead: Lead;
  striped: boolean;
  onCycleStatus: () => void;
  onToggleScrubbed: () => void;
}) {
  const dnc = lead.do_not_call;
  return (
    <tr
      className={`border-t border-bone/10 align-top ${striped ? "bg-bone/[0.015]" : ""} ${
        dnc ? "bg-rust/[0.06]" : ""
      }`}
    >
      <td className="px-5 py-4 text-bone/60 text-[12.5px] whitespace-nowrap">
        {new Date(lead.created_at).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "2-digit",
        })}
      </td>
      <td className="px-5 py-4">
        <div className="font-medium text-bone">{lead.name}</div>
        {lead.address && (
          <div className="flex items-center gap-1.5 text-[12px] text-bone/55 mt-1">
            <MapPin className="w-3 h-3 text-[var(--gold-soft)] flex-shrink-0" strokeWidth={1.5} />
            <span className="truncate">{lead.address}</span>
          </div>
        )}
        {lead.source && (
          <div className="text-[10px] text-bone/40 uppercase tracking-[0.18em] mt-1.5">
            {lead.source}
          </div>
        )}
      </td>
      <td className="px-5 py-4 text-bone/75">
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center gap-2 hover:text-bone transition-colors"
          >
            <Phone className="w-3 h-3 text-[var(--gold-soft)]" strokeWidth={1.5} />
            {lead.phone}
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center gap-2 hover:text-bone transition-colors mt-1.5 text-[12.5px] break-all"
          >
            <Mail className="w-3 h-3 text-[var(--gold-soft)]" strokeWidth={1.5} />
            {lead.email}
          </a>
        )}
      </td>
      <td className="px-5 py-4 text-bone/70 text-[12.5px]">{lead.intent ?? "—"}</td>
      <td className="px-5 py-4 text-bone/65 text-[12.5px] max-w-[260px]">
        {lead.message ? (
          <span title={lead.message} className="line-clamp-2">
            {lead.message}
          </span>
        ) : (
          <span className="text-bone/35">—</span>
        )}
      </td>
      <td className="px-5 py-4">
        <button
          onClick={onCycleStatus}
          title="Click to advance status"
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-all hover:scale-[1.02] ${STATUS_STYLES[lead.status]}`}
        >
          {lead.status}
        </button>
      </td>
      <td className="px-5 py-4">
        {dnc ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rust/40 bg-rust/15 text-rust text-[10.5px] font-semibold uppercase tracking-[0.18em]">
            <Lock className="w-3 h-3" strokeWidth={2} />
            Do Not Call
          </div>
        ) : (
          <button
            onClick={onToggleScrubbed}
            title="Toggle DNC-scrubbed state"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-all hover:scale-[1.02] ${
              lead.dnc_scrubbed
                ? "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-soft)]"
                : "border-bone/20 bg-bone/[0.04] text-bone/55"
            }`}
          >
            {lead.dnc_scrubbed ? (
              <>
                <ShieldCheck className="w-3 h-3" strokeWidth={2} />
                Clear
              </>
            ) : (
              <>
                <ShieldQuestion className="w-3 h-3" strokeWidth={2} />
                Not scrubbed
              </>
            )}
          </button>
        )}
      </td>
    </tr>
  );
}
