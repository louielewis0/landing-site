"use client";

import Link from "next/link";
import { useLeads } from "../_lib/use-leads";
import { PIPELINE_STAGES } from "@/lib/pipeline-stages";
import type { Lead } from "@/lib/lead-shape";

/**
 * Dashboard — 1:1 from the user's "Market Center CRM.html" template:
 * "Good morning, Louie." Grotesk greeting + date line, 4 KPI cards,
 * Active pipeline stage columns, dark Follow-ups card, Showings card.
 * All numbers are live from the leads API.
 */

const card: React.CSSProperties = {
  padding: 24,
  borderRadius: 22,
  background: "rgba(255,255,255,0.72)",
  border: "1px solid rgba(25,26,28,0.07)",
  boxShadow: "0 4px 18px rgba(25,26,28,0.05)",
};

const cardTitle: React.CSSProperties = {
  fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: 19,
  letterSpacing: "-0.01em",
  color: "#191a1c",
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function parseMoney(s: string | null): number {
  if (!s) return 0;
  const m = s.replace(/,/g, "").match(/\$?\s*(\d+(?:\.\d+)?)\s*([kKmM])?/);
  if (!m) return 0;
  let n = parseFloat(m[1]);
  if (m[2]?.toLowerCase() === "k") n *= 1e3;
  if (m[2]?.toLowerCase() === "m") n *= 1e6;
  if (!m[2] && n < 10000) n *= 1000; // "450" likely means $450k
  return n;
}

function fmtMoney(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${n}`;
}

const DAY = 86400000;

/** "3 days ago" / "yesterday" from an ISO timestamp. */
function relativeContact(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  return `${Math.floor(days / 7)} weeks ago`;
}

const ACTIVE = new Set(["new", "attempted", "contacted", "qualified", "showing", "negotiating"]);

export default function TemplateDashboard() {
  const state = useLeads();
  const leads = state.status === "ready" ? state.leads : [];

  const now = new Date();
  const dateLine = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const active = leads.filter((l) => ACTIVE.has(l.status));
  const newLeads = leads.filter((l) => l.status === "new");
  const hot = active.filter((l) => l.priority === "hot");
  const won = leads.filter((l) => l.status === "closed_won");
  const weekAgo = Date.now() - 7 * DAY;
  const newThisWeek = leads.filter((l) => new Date(l.created_at).getTime() > weekAgo);

  // Follow-up = contact recency, not a manual date. A lead needs a
  // nudge when it's active and either never contacted, or last
  // texted/called more than STALE_DAYS ago. Logging a text/call
  // updates last_contact_at, so it drops off here immediately and
  // only resurfaces if it goes quiet again.
  const STALE_DAYS = 3;
  const staleCut = Date.now() - STALE_DAYS * DAY;
  const dueList = active
    .filter((l) => !l.last_contact_at || new Date(l.last_contact_at).getTime() < staleCut)
    .sort((a, b) => {
      // never-contacted first, then stalest contact first
      const ta = a.last_contact_at ? new Date(a.last_contact_at).getTime() : 0;
      const tb = b.last_contact_at ? new Date(b.last_contact_at).getTime() : 0;
      return ta - tb;
    });

  const inPlay = active.reduce((sum, l) => sum + parseMoney(l.budget_range), 0);

  const kpis = [
    {
      label: "New leads",
      value: newLeads.length,
      delta: `+${newThisWeek.length} this week`,
      deltaColor: "#1d7a4f",
    },
    {
      label: "Active pipeline",
      value: active.length,
      delta: `${fmtMoney(inPlay)} in play`,
      deltaColor: "#2E5A9C",
    },
    {
      label: "Hot right now",
      value: hot.length,
      delta: "call these first",
      deltaColor: "#E4501E",
    },
    {
      label: "Closed won",
      value: won.length,
      delta: "all time",
      deltaColor: "rgba(25,26,28,0.45)",
    },
  ];

  const stages = PIPELINE_STAGES.slice(0, 4).map((s) => ({
    name: s.label,
    leads: active.filter((l) => (l.pipeline_stage ?? "") === s.stage).slice(0, 3),
    count: active.filter((l) => (l.pipeline_stage ?? "") === s.stage).length,
  }));

  const showings = active
    .filter((l) => l.status === "showing")
    .slice(0, 4);

  return (
    <>
      {/* Greeting */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: 40,
            letterSpacing: "-0.025em",
            color: "#191a1c",
          }}
        >
          {greeting()}, <span style={{ fontWeight: 500 }}>Louie.</span>
        </h1>
        <div style={{ fontSize: 13, color: "rgba(25,26,28,0.5)" }}>
          {dateLine} &middot; {dueList.length} lead{dueList.length === 1 ? "" : "s"} to follow up with
        </div>
      </div>

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 18,
          marginBottom: 26,
        }}
      >
        {kpis.map((k) => (
          <div key={k.label} style={{ ...card, padding: "22px 22px 20px", borderRadius: 20, backdropFilter: "blur(12px)" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(25,26,28,0.45)",
              }}
            >
              {k.label}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 40,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#191a1c",
              }}
            >
              {state.status === "ready" ? k.value : "–"}
            </div>
            <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 600, color: k.deltaColor }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Pipeline + right column */}
      <div className="crm-dash-cols" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 18 }}>
        {/* Active pipeline */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <div style={cardTitle}>Active pipeline</div>
            <Link href="/crm/pipeline" style={{ fontSize: 12.5, fontWeight: 600, color: "#2E5A9C" }}>
              {fmtMoney(inPlay)} in play
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {stages.map((s) => (
              <div
                key={s.name}
                style={{
                  borderRadius: 14,
                  background: "#f2efe9",
                  border: "1px solid rgba(25,26,28,0.06)",
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(25,26,28,0.45)",
                    marginBottom: 10,
                  }}
                >
                  {s.name} &middot; {s.count}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.leads.length === 0 && (
                    <div style={{ fontSize: 12, color: "rgba(25,26,28,0.35)", padding: "6px 2px" }}>Empty</div>
                  )}
                  {s.leads.map((d) => (
                    <Link
                      key={d.id}
                      href="/crm/leads"
                      style={{
                        display: "block",
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "#fff",
                        border: "1px solid rgba(25,26,28,0.07)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: "#191a1c",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {d.name}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11.5, gap: 8 }}>
                        <span style={{ color: "rgba(25,26,28,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {d.address || d.phone || "—"}
                        </span>
                        <span
                          style={{
                            fontWeight: 700,
                            color: d.transaction_type === "sell" ? "#E4501E" : "#2E5A9C",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {d.budget_range || "—"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Follow-ups due — dark card */}
          <div
            style={{
              padding: 24,
              borderRadius: 22,
              background: "#141821",
              color: "#fff",
              boxShadow: "0 14px 34px rgba(20,24,33,0.25)",
            }}
          >
            <div style={{ ...cardTitle, color: "#fff", marginBottom: 4 }}>Follow up with these</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
              Not texted or called in {STALE_DAYS}+ days. Log a text and they drop off.
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dueList.length === 0 && (
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", padding: "6px 0" }}>
                  All caught up — everyone active has been contacted recently. Nice.
                </div>
              )}
              {dueList.slice(0, 6).map((f) => {
                const never = !f.last_contact_at;
                const note = never
                  ? "Never contacted"
                  : `Last texted ${relativeContact(f.last_contact_at!)}`;
                return (
                  <Link
                    key={f.id}
                    href="/crm/leads"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        flex: "none",
                        borderRadius: "50%",
                        background: never ? "#E4501E" : "#f0a15c",
                      }}
                    />
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>{f.name}</span>
                      <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                        {note}
                      </span>
                    </span>
                    {f.phone && (
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#f0a15c", whiteSpace: "nowrap" }}>
                        Text
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Showings */}
          <div style={card}>
            <div style={{ ...cardTitle, marginBottom: 14 }}>Showings this week</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {showings.length === 0 && (
                <div style={{ fontSize: 13, color: "rgba(25,26,28,0.5)", padding: "4px 0" }}>
                  No leads in the showing stage yet.
                </div>
              )}
              {showings.map((sh) => {
                const d = new Date(
                  sh.follow_up_date ? sh.follow_up_date + "T00:00:00" : sh.updated_at ?? sh.created_at,
                );
                return (
                  <Link
                    key={sh.id}
                    href="/crm/leads"
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(25,26,28,0.07)",
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        width: 44,
                        textAlign: "center",
                        fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#E4501E",
                          fontWeight: 600,
                        }}
                      >
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span style={{ display: "block", fontSize: 17, fontWeight: 500, color: "#191a1c" }}>
                        {d.getDate()}
                      </span>
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#191a1c" }}>
                        {sh.address || sh.name}
                      </span>
                      <span style={{ display: "block", fontSize: 12, color: "rgba(25,26,28,0.5)" }}>
                        {sh.name}
                        {sh.phone ? ` · ${sh.phone}` : ""}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {state.status === "error" && (
        <p style={{ marginTop: 18, fontSize: 13, color: "#c0392b" }}>Couldn&rsquo;t load leads: {state.error}</p>
      )}
    </>
  );
}
