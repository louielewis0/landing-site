"use client";

import { Phone, Mail, MapPin, Lock, ShieldCheck, ShieldQuestion } from "lucide-react";
import { STATUS_CYCLE, type Lead, type LeadStatus } from "@/lib/lead-shape";
import PriorityDot from "@/components/crm/PriorityDot";

/**
 * One row of the leads table. Renders all the same columns the
 * legacy /dashboard table did — created date, lead identity
 * block, contact, intent, message, status pill, DNC chip — plus
 * priority dot before the name and property/transaction info on
 * the lead block.
 *
 * The whole row is clickable: clicking anywhere (except the
 * status pill, DNC toggle, or one of the contact links) selects
 * the lead via ?lead=<id> URL state. The 2E drawer will
 * subscribe to that param to pop in. Until then, the URL
 * updates + the row visually highlights in gold so the user can
 * see the wiring works.
 *
 * Status-pill click cycle is preserved from the legacy: legacy
 * vocab (new → attempted → contacted → dead → new) can still
 * cycle here, but CRM-set statuses (qualified, showing,
 * negotiating, closed_*) display read-only — drag in the Kanban
 * to move those.
 *
 * stopPropagation on every interactive child so clicking a
 * phone link, email link, status pill, or DNC button does that
 * action and does NOT also trigger the row-select.
 */

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-bone/10 text-bone border-bone/20",
  attempted: "bg-[var(--gold-soft)]/15 text-[var(--gold-soft)] border-[var(--gold-soft)]/35",
  contacted: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/40",
  qualified: "bg-[var(--gold)]/20 text-[var(--gold-soft)] border-[var(--gold)]/45",
  showing: "bg-[var(--gold)]/25 text-[var(--gold-soft)] border-[var(--gold)]/50",
  negotiating: "bg-[var(--gold)]/30 text-bone border-[var(--gold)]/55",
  closed_won: "bg-green-500/15 text-green-400 border-green-500/40",
  closed_lost: "bg-rust/15 text-rust/80 border-rust/35",
  dead: "bg-rust/20 text-rust border-rust/40",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "new",
  attempted: "attempted",
  contacted: "contacted",
  qualified: "qualified",
  showing: "showing",
  negotiating: "negotiating",
  closed_won: "closed · won",
  closed_lost: "closed · lost",
  dead: "dead",
};

export default function LeadRow({
  lead,
  striped,
  selected,
  onSelect,
  onCycleStatus,
  onToggleScrubbed,
}: {
  lead: Lead;
  striped: boolean;
  selected: boolean;
  onSelect: () => void;
  onCycleStatus: () => void;
  onToggleScrubbed: () => void;
}) {
  const dnc = lead.do_not_call;
  const cyclable = STATUS_CYCLE.includes(lead.status);

  const rowBg = selected
    ? "bg-[var(--gold)]/[0.08] hover:bg-[var(--gold)]/[0.10]"
    : dnc
      ? "bg-rust/[0.06] hover:bg-rust/[0.09]"
      : striped
        ? "bg-bone/[0.015] hover:bg-bone/[0.04]"
        : "hover:bg-bone/[0.03]";

  return (
    <tr
      onClick={onSelect}
      className={`border-t border-bone/10 align-top cursor-pointer transition-colors duration-150 ${rowBg} ${
        selected ? "ring-1 ring-inset ring-[var(--gold)]/35" : ""
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
        <div className="flex items-center gap-2">
          <PriorityDot priority={lead.priority} />
          <span className="font-medium text-bone">{lead.name}</span>
        </div>
        {lead.address && (
          <div className="flex items-center gap-1.5 text-[12px] text-bone/55 mt-1">
            <MapPin
              className="w-3 h-3 text-[var(--gold-soft)] flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="truncate">{lead.address}</span>
          </div>
        )}
        <div className="text-[10px] text-bone/40 uppercase tracking-[0.18em] mt-1.5 flex flex-wrap gap-x-3">
          {lead.source && <span>{lead.source}</span>}
          {lead.property_type && <span>{lead.property_type}</span>}
          {lead.transaction_type && <span>{lead.transaction_type}</span>}
        </div>
      </td>
      <td className="px-5 py-4 text-bone/75">
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:text-bone transition-colors"
          >
            <Phone
              className="w-3 h-3 text-[var(--gold-soft)]"
              strokeWidth={1.5}
            />
            {lead.phone}
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:text-bone transition-colors mt-1.5 text-[12.5px] break-all"
          >
            <Mail
              className="w-3 h-3 text-[var(--gold-soft)]"
              strokeWidth={1.5}
            />
            {lead.email}
          </a>
        )}
      </td>
      <td className="px-5 py-4 text-bone/70 text-[12.5px]">
        {lead.intent ?? "—"}
      </td>
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
          onClick={(e) => {
            e.stopPropagation();
            onCycleStatus();
          }}
          disabled={!cyclable}
          title={
            cyclable
              ? "Click to advance status"
              : "Managed in Kanban — drag the card to move"
          }
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-all ${
            STATUS_STYLES[lead.status]
          } ${cyclable ? "hover:scale-[1.02]" : "cursor-not-allowed opacity-90"}`}
        >
          {STATUS_LABELS[lead.status]}
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
            onClick={(e) => {
              e.stopPropagation();
              onToggleScrubbed();
            }}
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
