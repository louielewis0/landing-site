"use client";

import { useEffect, useState } from "react";
import { X, UserPlus, AlertCircle } from "lucide-react";
import { usePatchLead } from "../_lib/use-patch-lead";
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

export default function LeadDrawer({
  lead,
  onClose,
  onLocalUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onLocalUpdate: (patch: Partial<Lead>) => void;
}) {
  const { patch } = usePatchLead();

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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/65 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "drawerFade 220ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      />

      {/* Drawer panel */}
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-ink-2/95 backdrop-blur-2xl border-l border-bone/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] flex flex-col"
        style={{
          animation: "drawerSlide 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inline keyframes — co-located so this drawer is the only
            owner. Slide + fade enter together. */}
        <style>{`
          @keyframes drawerSlide {
            from { transform: translateX(40px); opacity: 0; }
            to   { transform: translateX(0); opacity: 1; }
          }
          @keyframes drawerFade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-bone/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <PriorityDot priority={draft.priority} />
            <div className="min-w-0">
              <p className="font-display text-[20px] font-light text-bone tracking-tight truncate leading-none">
                {draft.name}
              </p>
              <p className="text-[11px] text-bone/45 mt-1 tracking-wide">
                {draft.source ?? "—"} · created{" "}
                {relativeTime(draft.created_at)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-bone/45 hover:text-bone hover:bg-bone/[0.06] rounded-full p-1.5 transition-colors duration-200"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mx-6 mt-4 px-3 py-2 rounded-lg border border-rust/40 bg-rust/[0.05] flex items-center gap-2 text-[12.5px] text-rust">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            <span className="flex-1">{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
              className="text-rust/70 hover:text-rust"
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Pipeline controls */}
          <section>
            <p className="eyebrow mb-3">Pipeline</p>
            <div className="space-y-3">
              <div className="grid grid-cols-[110px_1fr] gap-3 items-center">
                <label className="text-[11px] text-bone/45 uppercase tracking-[0.18em]">
                  Status
                </label>
                <StatusSelect
                  value={draft.status}
                  onChange={(s) => saveField("status", s)}
                />
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3 items-center">
                <label className="text-[11px] text-bone/45 uppercase tracking-[0.18em]">
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
              <div className="grid grid-cols-[110px_1fr] gap-3 items-center">
                <label className="text-[11px] text-bone/45 uppercase tracking-[0.18em]">
                  Assigned
                </label>
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-bone/[0.02] border border-bone/10 text-bone/45 text-[13px]"
                  title="Agent assignment lands in Phase 3 (Supabase Auth)"
                >
                  <UserPlus
                    className="w-3.5 h-3.5 text-bone/35"
                    strokeWidth={1.5}
                  />
                  <span>Unassigned</span>
                  <span className="text-[9.5px] uppercase tracking-[0.18em] text-[var(--gold-soft)]/65 ml-auto">
                    Phase 3
                  </span>
                </div>
              </div>
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
            <p className="eyebrow mb-3">Contact</p>
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
            <p className="eyebrow mb-3">Property</p>
            <div className="space-y-1">
              <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 items-center">
                <label className="text-[11px] text-bone/45 uppercase tracking-[0.18em]">
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
                  className="w-full px-3 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-ink">
                    —
                  </option>
                  {PROPERTY_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-ink">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 items-center">
                <label className="text-[11px] text-bone/45 uppercase tracking-[0.18em]">
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
                  className="w-full px-3 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-ink">
                    —
                  </option>
                  {TRANSACTION_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-ink">
                      {t}
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
            <p className="eyebrow mb-3">Details</p>
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
                label="Lead type"
                value={draft.lead_type ?? ""}
                placeholder="—"
                onSave={(v) => saveField("lead_type", v as string | null)}
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
            <p className="eyebrow mb-3">Activity</p>
            <ActivityTimeline leadId={draft.id} />
          </section>

          {/* Meta footer */}
          <footer className="pt-4 border-t border-bone/[0.06] flex items-center justify-between gap-2 text-[10.5px] text-bone/35 tracking-wide">
            <span>
              Created{" "}
              <time dateTime={draft.created_at} className="text-bone/55">
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
                <span className="text-bone/55">
                  {relativeTime(draft.updated_at)}
                </span>
              </span>
            )}
          </footer>
        </div>
      </aside>
    </>
  );
}
