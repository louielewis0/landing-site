"use client";

import { useEffect, useRef, useState } from "react";
import { X, AlertCircle, Trash2, PhoneOutgoing } from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import { usePatchLead } from "../_lib/use-patch-lead";
import { useDeleteLead } from "../_lib/use-delete-lead";
import { relativeTime } from "../_lib/relative-time";
import EditableField from "./EditableField";
import StatusSelect from "./StatusSelect";
import PrioritySelect from "./PrioritySelect";
import ActivityTimeline from "./ActivityTimeline";
import PriorityDot from "@/components/crm/PriorityDot";
import type { Lead } from "@/lib/lead-shape";

/**
 * Lead-detail drawer. Slides in from the right when /crm/leads
 * has ?lead=<id>. Closes on:
 *   • X button
 *   • backdrop click
 *   • ESC key (global listener)
 *   • navigating away
 *
 * Body is scrollable; the page underneath has its scroll locked
 * while the drawer is open so cursor wheel doesn't lake the
 * backdrop while the user reads/edits.
 *
 * Edit model: every field is always editable (Notion-style). The
 * value IS the input. Blur saves; ESC reverts. Each save is
 * optimistic — local draft updates instantly, server PATCH is
 * fired in the background, error rolls back + surfaces inline.
 *
 * Status / priority / follow-up date are dedicated controls
 * (select / 3-button toggle / date input). Property type and
 * transaction type are dropdowns gated to the CHECK constraint
 * vocabularies in supabase/crm_phase1a.sql. Everything else is
 * plain text input via EditableField.
 *
 * Lost-reason field surfaces only when status is one of the
 * lost-class values (closed_lost, dead) so the form stays tight
 * for active leads.
 *
 * Assignee field is read-only "Unassigned" — Phase 3 ships
 * Supabase Auth + populates public.agents; until then the
 * dropdown has nothing to show. The assigned_to column IS in
 * the PATCH whitelist on the server so Phase 3 can flip the UI
 * on without another route change.
 */

const PROPERTY_TYPES = [
  "single_family",
  "condo",
  "townhouse",
  "multifamily",
  "land",
  "office",
  "retail",
  "industrial",
  "mixed_use",
  "other",
] as const;

const TRANSACTION_TYPES = ["buy", "sell", "lease"] as const;

/** snake_case / lowercase → readable Title Case for display. */
function humanize(s: string): string {
  return s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function LeadDrawer({
  lead,
  onClose,
  onLocalUpdate,
  onDeleted,
}: {
  lead: Lead;
  onClose: () => void;
  onLocalUpdate: (patch: Partial<Lead>) => void;
  onDeleted: () => void;
}) {
  const { patch } = usePatchLead();
  const del = useDeleteLead();
  const passcode = usePasscode();

  // Skip-trace state. Reset when the drawer moves to another lead.
  const [tracing, setTracing] = useState(false);
  const [traceMsg, setTraceMsg] = useState<string | null>(null);
  useEffect(() => {
    setTracing(false);
    setTraceMsg(null);
  }, [lead.id]);

  async function handleTrace() {
    setTracing(true);
    setTraceMsg(null);
    setError(null);
    try {
      const data = await apiFetch<{
        lead: Lead;
        phones: { number: string; type?: string }[];
        used: number;
        cap: number;
      }>(passcode, "/trace", {
        method: "POST",
        body: JSON.stringify({ leadId: draft.id }),
      });
      setDraft((d) => ({ ...d, phone: data.lead.phone, updated_at: data.lead.updated_at }));
      onLocalUpdate({ phone: data.lead.phone, updated_at: data.lead.updated_at });
      setTraceMsg(
        `Found ${data.phones.length} number${data.phones.length === 1 ? "" : "s"} · search ${data.used}/${data.cap} used`,
      );
    } catch (e) {
      setTraceMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setTracing(false);
    }
  }
  // Two-tap delete, same pattern as the Kanban card: first tap arms
  // the confirm row, second tap fires the DELETE. Re-seeded closed
  // when the drawer switches to a different lead.
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  useEffect(() => {
    setConfirmingDelete(false);
  }, [lead.id]);

  async function handleDelete() {
    setError(null);
    try {
      await del.mutate(draft.id);
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setConfirmingDelete(false);
    }
  }

  // Internal mirror so optimistic edits feel instant. Re-seeded
  // whenever the lead's id changes (i.e. user clicked a
  // different row in the table while the drawer was open).
  const [draft, setDraft] = useState<Lead>(lead);
  useEffect(() => {
    setDraft(lead);
  }, [lead.id]);

  const [error, setError] = useState<string | null>(null);

  // Global ESC + body scroll lock.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function saveField<K extends keyof Lead>(
    field: K,
    value: Lead[K],
  ): Promise<void> {
    const previous = draft[field];
    if (previous === value) return;
    setDraft((d) => ({ ...d, [field]: value }));
    setError(null);
    try {
      const updated = await patch(draft.id, { [field]: value } as Partial<Lead>);
      // Merge server-side updated_at + any normalization back into
      // our draft so subsequent edits work from the canonical row.
      setDraft((d) => ({
        ...d,
        [field]: updated[field],
        updated_at: updated.updated_at,
      }));
      onLocalUpdate({
        [field]: updated[field],
        updated_at: updated.updated_at,
      } as Partial<Lead>);
    } catch (e) {
      setDraft((d) => ({ ...d, [field]: previous }));
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  const lostClass = draft.status === "closed_lost" || draft.status === "dead";

  // Scroll parallax: --shrink (0→1 over the first 90px of body
  // scroll) condenses the serif name and dims the key-light. Direct
  // DOM mutation — no re-render per scroll frame, transforms only.
  const headerRef = useRef<HTMLElement>(null);
  function onBodyScroll(e: React.UIEvent<HTMLDivElement>) {
    const s = Math.min(1, e.currentTarget.scrollTop / 90);
    headerRef.current?.style.setProperty("--shrink", s.toFixed(3));
  }

  return (
    <>
      {/* Backdrop — cinematic vignette: darker at the edges so the
          panel reads as the lit object in a dim room. */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{
          animation: "drawerFade 260ms cubic-bezier(0.16, 1, 0.3, 1)",
          background:
            "radial-gradient(120% 120% at 70% 50%, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.82) 100%)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Perspective stage — gives the panel a real z-axis to arrive
          through. One-time entrance; conveys "opening", then inert. */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] pointer-events-none"
        style={{ perspective: "1400px" }}
      >
        <aside
          className="drawer-panel pointer-events-auto relative h-full w-full bg-[#12141A]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(245,241,234,0.03)] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Edge light — a 1px hairline that catches gold near the
              top, like light falling on the panel's spine. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(217,185,104,0.55) 0%, rgba(217,185,104,0.12) 22%, rgba(245,241,234,0.06) 60%, transparent 100%)",
            }}
          />

          <style>{`
            .drawer-panel {
              animation: drawerCine 420ms cubic-bezier(0.16, 1, 0.3, 1);
              transform-origin: right center;
            }
            @keyframes drawerCine {
              0%   { transform: translateX(56px) rotateY(-5deg); opacity: 0; }
              60%  { opacity: 1; }
              100% { transform: translateX(0) rotateY(0deg); opacity: 1; }
            }
            @keyframes drawerFade {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes sectionRise {
              from { transform: translateY(14px); opacity: 0; }
              to   { transform: translateY(0); opacity: 1; }
            }
            .drawer-body > * {
              animation: sectionRise 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .drawer-body > *:nth-child(1) { animation-delay: 40ms; }
            .drawer-body > *:nth-child(2) { animation-delay: 90ms; }
            .drawer-body > *:nth-child(3) { animation-delay: 140ms; }
            .drawer-body > *:nth-child(4) { animation-delay: 190ms; }
            .drawer-body > *:nth-child(5) { animation-delay: 240ms; }
            .drawer-body > *:nth-child(6) { animation-delay: 280ms; }
            .drawer-glow {
              background: radial-gradient(80% 130% at 20% 0%, rgba(200,162,76,0.10) 0%, rgba(200,162,76,0.03) 45%, transparent 75%);
            }
            @media (prefers-reduced-motion: reduce) {
              .drawer-panel, .drawer-body > * { animation: none !important; }
            }
          `}</style>

          {/* Header — serif name under a soft gold key-light; the
              hairline below fades like the panels elsewhere in the CRM. */}
          <header ref={headerRef} className="relative shrink-0 px-6 pt-5 pb-4">
            <span
              aria-hidden
              className="drawer-glow absolute inset-0 pointer-events-none"
              style={{ opacity: "calc(1 - 0.8 * var(--shrink, 0))" }}
            />
            <span className="absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="mt-2.5">
                  <PriorityDot priority={draft.priority} />
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[22px] font-semibold text-white/90 tracking-tight truncate leading-[1.1]"
                    style={{
                      transform:
                        "scale(calc(1 - 0.15 * var(--shrink, 0)))",
                      transformOrigin: "left center",
                    }}
                  >
                    {draft.name}
                  </p>
                  <p className="text-[11px] text-white/45 mt-1.5 tracking-wide">
                    {draft.source ?? "—"} · created{" "}
                    {relativeTime(draft.created_at)} ·{" "}
                    {draft.last_contact_at ? (
                      <span className="text-white/60">
                        last contacted {relativeTime(draft.last_contact_at)}
                      </span>
                    ) : (
                      <span className="text-[#FDA4AF]/90">never contacted</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="text-white/45 hover:text-white/90 hover:bg-white/[0.06] rounded-full p-1.5 transition-colors duration-200 shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </header>

          {/* Error banner */}
          {error && (
            <div className="mx-6 mt-4 px-3 py-2 rounded-lg border border-[#FB7185]/40 bg-[#FB7185]/[0.05] flex items-center gap-2 text-[12.5px] text-[#FDA4AF]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
                className="text-[#FDA4AF]/70 hover:text-[#FDA4AF]"
              >
                ×
              </button>
            </div>
          )}

          {/* Body */}
          <div
            className="drawer-body flex-1 overflow-y-auto px-6 py-5 space-y-6"
            onScroll={onBodyScroll}
          >
          {/* Status + follow-up */}
          <section>
            <p className="crm-drawer-sec">Status</p>
            <div className="space-y-3">
              <div className="grid grid-cols-[110px_1fr] gap-3 items-center">
                <label className="text-[11px] text-white/45 uppercase tracking-[0.18em]">
                  Status
                </label>
                <StatusSelect
                  value={draft.status}
                  onChange={(s) => saveField("status", s)}
                />
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3 items-center">
                <label className="text-[11px] text-white/45 uppercase tracking-[0.18em]">
                  Priority
                </label>
                <PrioritySelect
                  value={draft.priority}
                  onChange={(p) => saveField("priority", p)}
                />
              </div>
              <EditableField
                label="Follow-up"
                value={draft.follow_up_date ?? ""}
                type="date"
                onSave={(v) =>
                  saveField("follow_up_date", v as string | null)
                }
              />
              {lostClass && (
                <EditableField
                  label="Lost reason"
                  value={draft.lost_reason ?? ""}
                  placeholder="Why did this fall through?"
                  multiline
                  onSave={(v) =>
                    saveField("lost_reason", v as string | null)
                  }
                />
              )}
            </div>
          </section>

          {/* Contact */}
          <section>
            <p className="crm-drawer-sec">Contact</p>
            <div className="space-y-1">
              <EditableField
                label="Name"
                value={draft.name}
                placeholder="Full name"
                saveOnEmptyAs={undefined as unknown as null}
                onSave={(v) => saveField("name", (v ?? "") as string)}
              />
              <EditableField
                label="Phone"
                value={draft.phone ?? ""}
                type="tel"
                placeholder="No phone"
                onSave={(v) => saveField("phone", v as string | null)}
              />
              {!draft.phone && (
                <div className="pl-1 pb-1">
                  <button
                    type="button"
                    onClick={handleTrace}
                    disabled={tracing}
                    className="inline-flex items-center gap-2 text-[12px] text-[var(--gold-soft)] hover:text-[var(--gold)] tracking-wide transition-colors disabled:opacity-50"
                  >
                    <PhoneOutgoing className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {tracing ? "Tracing…" : "Find phone (skip trace)"}
                  </button>
                </div>
              )}
              {traceMsg && (
                <p className="pl-1 pb-1 text-[11.5px] text-white/55 font-light">
                  {traceMsg}
                </p>
              )}
              <EditableField
                label="Email"
                value={draft.email ?? ""}
                type="email"
                placeholder="No email"
                onSave={(v) => saveField("email", v as string | null)}
              />
              <EditableField
                label="Address"
                value={draft.address ?? ""}
                placeholder="Property address"
                onSave={(v) => saveField("address", v as string | null)}
              />
            </div>
          </section>

          {/* Property */}
          <section>
            <p className="crm-drawer-sec">Property</p>
            <div className="space-y-1">
              <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 items-center">
                <label className="text-[11px] text-white/45 uppercase tracking-[0.18em]">
                  Type
                </label>
                <select
                  value={draft.property_type ?? ""}
                  onChange={(e) =>
                    saveField(
                      "property_type",
                      e.target.value || (null as unknown as string),
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#12141A]">
                    —
                  </option>
                  {PROPERTY_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-[#12141A]">
                      {humanize(p)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 items-center">
                <label className="text-[11px] text-white/45 uppercase tracking-[0.18em]">
                  Transaction
                </label>
                <select
                  value={draft.transaction_type ?? ""}
                  onChange={(e) =>
                    saveField(
                      "transaction_type",
                      e.target.value || (null as unknown as string),
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#12141A]">
                    —
                  </option>
                  {TRANSACTION_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#12141A]">
                      {humanize(t)}
                    </option>
                  ))}
                </select>
              </div>
              <EditableField
                label="Budget"
                value={draft.budget_range ?? ""}
                placeholder="$400-500k"
                onSave={(v) => saveField("budget_range", v as string | null)}
              />
            </div>
          </section>

          {/* Intent + classification */}
          <section>
            <p className="crm-drawer-sec">Details</p>
            <div className="space-y-1">
              <EditableField
                label="Intent"
                value={draft.intent ?? ""}
                placeholder="Buy / Sell / Both / Just browsing"
                onSave={(v) => saveField("intent", v as string | null)}
              />
              <EditableField
                label="Source"
                value={draft.source ?? ""}
                placeholder="Where the lead came from"
                onSave={(v) => saveField("source", v as string | null)}
              />
              <EditableField
                label="Message"
                value={draft.message ?? ""}
                placeholder="Notes, intent details, motivation…"
                multiline
                onSave={(v) => saveField("message", v as string | null)}
              />
            </div>
          </section>

          {/* Activity timeline */}
          <section>
            <p className="crm-drawer-sec">Activity</p>
            <ActivityTimeline leadId={draft.id} />
          </section>

          {/* Danger zone — two-tap delete */}
          <section className="pt-4 border-t border-white/[0.06]">
            {!confirmingDelete ? (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="inline-flex items-center gap-2 text-[12.5px] text-white/40 hover:text-[#FDA4AF] tracking-wide transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                Delete lead
              </button>
            ) : (
              <div className="rounded-xl border border-[#FB7185]/40 bg-[#FB7185]/[0.05] p-4 flex flex-wrap items-center gap-3">
                <span className="text-[13px] text-white/80 font-light flex-1 min-w-[180px]">
                  Permanently delete{" "}
                  <span className="text-white/90 font-medium">{draft.name}</span>?
                  Activity history goes with it. If this address is still in a
                  future Matrix export, it will re-import as a fresh lead.
                </span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={del.pending}
                  className="px-4 py-2 rounded-full bg-[#FB7185] text-white/90 text-[12.5px] font-semibold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {del.pending ? "Deleting…" : "Yes, delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  disabled={del.pending}
                  className="text-[12px] text-white/50 hover:text-white/80 transition-colors tracking-wide"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>

          {/* Meta footer */}
          <footer className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 text-[10.5px] text-white/35 tracking-wide">
            <span>
              Created{" "}
              <time dateTime={draft.created_at} className="text-white/55">
                {new Date(draft.created_at).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </time>
            </span>
            {draft.updated_at && (
              <span>
                Updated{" "}
                <span className="text-white/55">
                  {relativeTime(draft.updated_at)}
                </span>
              </span>
            )}
          </footer>
          </div>
        </aside>
      </div>
    </>
  );
}
