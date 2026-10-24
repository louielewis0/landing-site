"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  PhoneOff,
  Voicemail,
  CheckCircle,
  CalendarCheck,
  Ban,
  SkipForward,
  ExternalLink,
  Flame,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import { useLeads } from "../_lib/use-leads";
import { usePatchLead } from "../_lib/use-patch-lead";
import { useCreateActivity } from "../_lib/use-activities";
import PriorityDot from "@/components/crm/PriorityDot";
import StatusPill from "@/components/crm/StatusPill";
import { TERMINAL_STATUSES, type Lead } from "@/lib/lead-shape";

const GROTESK = "var(--font-grotesk), 'Space Grotesk', sans-serif";
const DAY = 86400000;

/** One-tap phrases to drop into the note — the common things people say. */
const QUICK_NOTES = [
  "Still wants to sell",
  "Relisting soon",
  "Call back later",
  "Just testing the market",
  "Going FSBO",
  "Already sold",
  "Not the owner",
];

/** tel:/sms: links from a free-text phone, or null if unusable. */
function phoneLinks(phone: string | null): { tel: string; sms: string; pretty: string } | null {
  const d = (phone ?? "").replace(/[^\d]/g, "");
  if (d.length < 10) return null;
  const e164 = d.length === 10 ? `+1${d}` : d.startsWith("1") ? `+${d}` : `+${d}`;
  const ten = d.length === 11 && d.startsWith("1") ? d.slice(1) : d.slice(0, 10);
  const pretty =
    ten.length === 10 ? `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}` : phone || "";
  return { tel: `tel:${e164}`, sms: `sms:${e164}`, pretty };
}

function addDaysISO(days: number): string {
  const d = new Date(Date.now() + days * DAY);
  return d.toISOString().slice(0, 10);
}
const todayISO = () => new Date().toISOString().slice(0, 10);

function relAdded(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  if (days <= 0) return "added today";
  if (days === 1) return "added yesterday";
  if (days < 14) return `added ${days} days ago`;
  return `added ${Math.floor(days / 7)} weeks ago`;
}

type Scope = "all" | "expired" | "fsbo";

export default function CallBlockClient() {
  const result = useLeads();
  const { patch } = usePatchLead();
  const { create } = useCreateActivity();

  const [scope, setScope] = useState<Scope>("all");
  const [handled, setHandled] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [stats, setStats] = useState({ dials: 0, convos: 0, appts: 0 });
  const [justAppt, setJustAppt] = useState(false);

  const leads = result.status === "ready" ? result.leads : [];

  const queue = useMemo(() => {
    const srcMatch = (l: Lead) => {
      const s = (l.source ?? "").trim().toLowerCase();
      return scope === "expired" ? s === "expired" : scope === "fsbo" ? s === "fsbo" : true;
    };
    const base = leads.filter(
      (l) =>
        !handled.has(l.id) &&
        !l.do_not_call &&
        !TERMINAL_STATUSES.has(l.status) &&
        phoneLinks(l.phone) !== null &&
        srcMatch(l) &&
        // "to call": never personally contacted, OR a follow-up is due/overdue
        (!l.last_contact_at ||
          (l.follow_up_date !== null && l.follow_up_date <= todayISO())),
    );
    base.sort((a, b) => {
      const an = a.last_contact_at ? 1 : 0;
      const bn = b.last_contact_at ? 1 : 0;
      if (an !== bn) return an - bn; // never-contacted first
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
    // Skipped go to the back of the line.
    const notSkipped = base.filter((l) => !skipped.includes(l.id));
    const back = base.filter((l) => skipped.includes(l.id));
    return [...notSkipped, ...back];
  }, [leads, handled, skipped, scope]);

  const current = queue[0] ?? null;
  const links = current ? phoneLinks(current.phone) : null;
  const worked = handled.size;

  function bump(k: keyof typeof stats) {
    setStats((s) => ({ ...s, [k]: s[k] + 1 }));
  }

  async function handle(
    outcome: "noanswer" | "vm" | "text" | "spoke" | "appt" | "notinterested" | "badnumber",
  ) {
    if (!current || busy) return;
    const id = current.id;
    const n = note.trim();
    setBusy(true);
    setErr(null);
    try {
      switch (outcome) {
        case "noanswer":
          await create(id, { type: "call", body: n || "No answer" });
          bump("dials");
          break;
        case "vm":
          await create(id, { type: "call", body: n || "Left voicemail" });
          bump("dials");
          break;
        case "text":
          await create(id, { type: "text", body: n || "Sent intro text" });
          bump("dials");
          break;
        case "spoke":
          await create(id, { type: "call", body: n || "Spoke — following up" });
          await patch(id, { status: "contacted", follow_up_date: addDaysISO(3) });
          bump("dials");
          bump("convos");
          break;
        case "appt":
          await create(id, { type: "call", body: n || "Appointment set" });
          await patch(id, { status: "qualified", priority: "hot", follow_up_date: addDaysISO(2) });
          bump("dials");
          bump("convos");
          bump("appts");
          setJustAppt(true);
          setTimeout(() => setJustAppt(false), 2200);
          break;
        case "notinterested":
          await create(id, { type: "call", body: n || "Not interested" });
          await patch(id, { status: "closed_lost", lost_reason: "Not interested" });
          bump("dials");
          break;
        case "badnumber":
          await patch(id, { do_not_call: true });
          break;
      }
      setHandled((h) => new Set(h).add(id));
      setNote("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function skip() {
    if (!current) return;
    setSkipped((s) => [...s.filter((x) => x !== current.id), current.id]);
    setNote("");
  }

  // ── Scoreboard (shared across states) ──────────────────────────
  const scoreboard = (
    <div
      className="crm-glass-gold"
      style={{
        borderRadius: 18,
        padding: "4px 8px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        marginBottom: 22,
      }}
    >
      {[
        { label: "Dials", value: stats.dials },
        { label: "Conversations", value: stats.convos, accent: stats.convos > 0 },
        { label: "Appointments", value: stats.appts, accent: stats.appts > 0 },
        { label: "Worked", value: worked },
      ].map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: "16px 20px",
            borderLeft: i === 0 ? "none" : "1px solid rgba(200,162,76,0.14)",
          }}
        >
          <div
            style={{
              fontFamily: GROTESK,
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--crm-ink-faint)",
              marginBottom: 6,
            }}
          >
            {s.label}
          </div>
          <div
            className={s.accent ? "crm-figure crm-figure-gold" : "crm-figure"}
            style={{ fontSize: 34 }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );

  const scopeChips = (
    <div style={{ display: "inline-flex", gap: 2, padding: 4, borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid var(--crm-line)" }}>
      {(
        [
          ["all", "All"],
          ["expired", "Expired"],
          ["fsbo", "FSBO"],
        ] as const
      ).map(([v, label]) => {
        const on = scope === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => setScope(v)}
            style={{
              padding: "7px 15px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontFamily: GROTESK,
              fontSize: 12.5,
              fontWeight: 600,
              background: on ? "var(--crm-gold-dim)" : "transparent",
              color: on ? "var(--crm-ink)" : "var(--crm-ink-faint)",
              boxShadow: on ? "inset 0 0 0 1px rgba(200,162,76,0.3)" : "none",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );

  // ── Loading / error ────────────────────────────────────────────
  if (result.status === "loading") {
    return <div className="crm-glass rounded-2xl h-[460px] animate-pulse" />;
  }
  if (result.status === "error") {
    return (
      <div className="crm-glass rounded-2xl p-8 text-center !border-[#FB7185]/30">
        <p className="text-lg font-semibold mb-2" style={{ color: "var(--crm-ink)" }}>
          Couldn&apos;t load your leads.
        </p>
        <p className="text-[14px] mb-5" style={{ color: "var(--crm-ink-dim)" }}>
          {result.error}
        </p>
        <button type="button" onClick={result.reload} className="crm-btn crm-btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
        {scopeChips}
        <div style={{ fontSize: 13, color: "var(--crm-ink-dim)" }}>
          {queue.length} {queue.length === 1 ? "lead" : "leads"} left to call
        </div>
      </div>

      {scoreboard}

      {current ? (
        <div className="crm-glass" style={{ borderRadius: 22, padding: 0, overflow: "hidden" }}>
          {/* Lead header */}
          <div style={{ padding: "26px 28px 20px", borderBottom: "1px solid var(--crm-line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <PriorityDot priority={current.priority} />
              {current.priority === "hot" && <Flame className="w-3.5 h-3.5 text-[#FB7185]" strokeWidth={2} />}
              <StatusPill status={current.status} />
              {current.source && (
                <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--crm-ink-faint)" }}>
                  {current.source}
                </span>
              )}
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--crm-ink-faint)" }}>
                {relAdded(current.created_at)}
              </span>
            </div>
            <div className="crm-display" style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.05 }}>
              {current.name || "Unknown owner"}
            </div>
            {current.address && (
              <div style={{ fontSize: 15, color: "var(--crm-ink-dim)", marginTop: 6 }}>{current.address}</div>
            )}
            {current.message && (
              <div style={{ fontSize: 13.5, color: "var(--crm-ink-faint)", marginTop: 10, fontStyle: "italic" }}>
                &ldquo;{current.message}&rdquo;
              </div>
            )}
            <div
              className="crm-num"
              style={{ fontFamily: GROTESK, fontSize: 30, fontWeight: 500, color: "var(--crm-gold-soft)", marginTop: 16, letterSpacing: "0.01em" }}
            >
              {links?.pretty ?? current.phone}
            </div>
          </div>

          {/* Big call / text */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "20px 28px 8px" }}>
            <a
              href={links?.tel}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "18px", borderRadius: 14, textDecoration: "none",
                fontFamily: GROTESK, fontSize: 17, fontWeight: 700, color: "#0A0908",
                background: "linear-gradient(135deg, var(--crm-gold-soft), var(--crm-gold))",
                boxShadow: "0 8px 24px rgba(200,162,76,0.28)",
              }}
            >
              <Phone className="w-5 h-5" strokeWidth={2.25} /> Call
            </a>
            <a
              href={links?.sms}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "18px", borderRadius: 14, textDecoration: "none",
                fontFamily: GROTESK, fontSize: 17, fontWeight: 700, color: "var(--crm-ink)",
                background: "rgba(255,255,255,0.05)", border: "1px solid var(--crm-line)",
              }}
            >
              <MessageSquare className="w-5 h-5" strokeWidth={2.25} /> Text
            </a>
          </div>

          {/* What was said */}
          <div style={{ padding: "18px 28px 0" }}>
            <label
              htmlFor="cb-note"
              style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--crm-ink)", marginBottom: 8 }}
            >
              What did they say?{" "}
              <span style={{ color: "var(--crm-ink-faint)", fontWeight: 400, fontSize: 12.5 }}>
                — saved with the outcome below
              </span>
            </label>
            <textarea
              id="cb-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Type what they told you…  e.g. still wants to sell, relisting in spring, call back after the holidays."
              className="crm-input"
              style={{ fontSize: 15, lineHeight: 1.5, resize: "vertical", minHeight: 86 }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
              {QUICK_NOTES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setNote((cur) => (cur.trim() ? cur.trim() + "; " + q : q))}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontFamily: GROTESK,
                    fontSize: 12.5,
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--crm-line)",
                    color: "var(--crm-ink-dim)",
                  }}
                >
                  + {q}
                </button>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div style={{ padding: "18px 28px 8px" }}>
            <div style={{ fontSize: 13, color: "var(--crm-ink-dim)", marginBottom: 12 }}>
              Then tap what happened &mdash; your note saves and the next lead loads.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
              <OutcomeBtn onClick={() => handle("spoke")} disabled={busy} icon={<CheckCircle className="w-4 h-4" strokeWidth={2} />} label="Had a conversation" tone="good" />
              <OutcomeBtn onClick={() => handle("appt")} disabled={busy} icon={<CalendarCheck className="w-4 h-4" strokeWidth={2} />} label="Appointment set!" tone="gold" />
              <OutcomeBtn onClick={() => handle("noanswer")} disabled={busy} icon={<PhoneOff className="w-4 h-4" strokeWidth={2} />} label="No answer" />
              <OutcomeBtn onClick={() => handle("vm")} disabled={busy} icon={<Voicemail className="w-4 h-4" strokeWidth={2} />} label="Left voicemail" />
              <OutcomeBtn onClick={() => handle("text")} disabled={busy} icon={<MessageSquare className="w-4 h-4" strokeWidth={2} />} label="Texted them" />
              <OutcomeBtn onClick={() => handle("notinterested")} disabled={busy} icon={<Ban className="w-4 h-4" strokeWidth={2} />} label="Not interested" tone="bad" />
            </div>
          </div>

          {err && (
            <div style={{ padding: "10px 28px 0", display: "flex", alignItems: "center", gap: 8, color: "#FB7185", fontSize: 13 }}>
              <AlertCircle className="w-4 h-4" strokeWidth={1.75} /> {err}
            </div>
          )}

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 28px 22px", marginTop: 8, borderTop: "1px solid var(--crm-line)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16 }}>
              <button type="button" onClick={skip} disabled={busy} style={footLinkStyle}>
                <SkipForward className="w-3.5 h-3.5" strokeWidth={2} /> Skip for now
              </button>
              <button type="button" onClick={() => handle("badnumber")} disabled={busy} style={footLinkStyle}>
                <Ban className="w-3.5 h-3.5" strokeWidth={2} /> Bad number (DNC)
              </button>
            </div>
            <Link href={`/crm/leads?lead=${current.id}`} style={{ ...footLinkStyle, textDecoration: "none" }}>
              Open full record <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>

          {justAppt && (
            <div style={{ padding: "0 28px 20px", display: "flex", alignItems: "center", gap: 8, color: "var(--crm-gold-soft)", fontSize: 13.5, fontWeight: 600 }}>
              <PartyPopper className="w-4 h-4" strokeWidth={2} /> Appointment logged — that&rsquo;s the whole game. Next!
            </div>
          )}
        </div>
      ) : (
        // ── Queue empty ──────────────────────────────────────────
        <div className="crm-glass rounded-2xl" style={{ padding: "48px 32px", textAlign: "center" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", margin: "0 auto 18px", display: "grid", placeItems: "center", background: "rgba(200,162,76,0.12)", border: "1px solid rgba(200,162,76,0.3)", color: "var(--crm-gold-soft)" }}>
            <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="crm-display" style={{ fontSize: 30, fontWeight: 500 }}>
            {worked > 0 ? "That's the block — nice work." : "No one to call right now."}
          </div>
          <p style={{ color: "var(--crm-ink-dim)", fontSize: 14, maxWidth: 440, margin: "12px auto 0", lineHeight: 1.6 }}>
            {worked > 0
              ? `You worked ${worked} ${worked === 1 ? "lead" : "leads"} — ${stats.dials} dials, ${stats.convos} conversation${stats.convos === 1 ? "" : "s"}, ${stats.appts} appointment${stats.appts === 1 ? "" : "s"}. Show up again tomorrow.`
              : "Load today's expireds in the Leads → Expired tab (import, skip-trace for phone numbers, scrub DNC), and they'll queue up here to call."}
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/crm/leads" className="crm-btn crm-btn-secondary">Go to Leads</Link>
            {worked > 0 && (
              <button type="button" onClick={() => { setHandled(new Set()); setSkipped([]); setStats({ dials: 0, convos: 0, appts: 0 }); }} className="crm-btn crm-btn-primary">
                Start a fresh block
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const footLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 12.5,
  fontWeight: 600,
  color: "var(--crm-ink-faint)",
  fontFamily: GROTESK,
};

function OutcomeBtn({
  onClick,
  disabled,
  icon,
  label,
  tone,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  tone?: "good" | "gold" | "bad";
}) {
  const palette =
    tone === "gold"
      ? { bg: "var(--crm-gold-dim)", border: "rgba(200,162,76,0.4)", color: "var(--crm-gold-soft)" }
      : tone === "good"
        ? { bg: "rgba(52,199,144,0.1)", border: "rgba(52,199,144,0.35)", color: "#5EEAD4" }
        : tone === "bad"
          ? { bg: "rgba(251,113,133,0.08)", border: "rgba(251,113,133,0.3)", color: "#FB7185" }
          : { bg: "rgba(255,255,255,0.04)", border: "var(--crm-line)", color: "var(--crm-ink-dim)" };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 14px",
        borderRadius: 12,
        cursor: disabled ? "default" : "pointer",
        fontFamily: GROTESK,
        fontSize: 13.5,
        fontWeight: 600,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.color,
        opacity: disabled ? 0.55 : 1,
        transition: "opacity 120ms ease",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
