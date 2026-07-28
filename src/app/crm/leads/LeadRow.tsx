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

/* Mirrors StatusPill's semantic hues (CRM design system) so the
   row pill and the shared pill render statuses identically. */
const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-[#38BDF8]/12 text-[#7DD3FC] border-[#38BDF8]/35",
  attempted: "bg-[#FBBF24]/12 text-[#FCD34D] border-[#FBBF24]/35",
  contacted: "bg-[var(--gold)]/15 text-[var(--gold-soft)] border-[var(--gold)]/40",
  qualified: "bg-[#A78BFA]/14 text-[#C4B5FD] border-[#A78BFA]/40",
  showing: "bg-[#2DD4BF]/12 text-[#5EEAD4] border-[#2DD4BF]/40",
  negotiating: "bg-[#FB923C]/14 text-[#FDBA74] border-[#FB923C]/40",
  closed_won: "bg-[#4ADE80]/14 text-[#86EFAC] border-[#4ADE80]/40",
  closed_lost: "bg-white/[0.07] text-white/50 border-white/20",
  dead: "bg-[#FB7185]/12 text-[#FDA4AF] border-[#FB7185]/40",
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
    ? "!bg-[var(--gold)]/[0.09] hover:!bg-[var(--gold)]/[0.11]"
    : dnc
      ? "!bg-[#FB7185]/[0.05] hover:!bg-[#FB7185]/[0.08]"
      : striped
        ? "bg-white/[0.015]"
        : "";

  return (
    <tr
      onClick={onSelect}
      className={`align-top cursor-pointer ${rowBg} ${
        selected ? "ring-1 ring-inset ring-[var(--gold)]/35" : ""
      }`}
    >
      <td className="px-5 py-4 text-white/55 text-[12.5px] whitespace-nowrap crm-num">
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
          <span className="font-medium text-white/90">{lead.name}</span>
        </div>
        {lead.address && (
          <div className="flex items-center gap-1.5 text-[12px] text-white/55 mt-1">
            <MapPin
              className="w-3 h-3 text-[var(--gold-soft)] flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="truncate">{lead.address}</span>
          </div>
        )}
        <div className="text-[10px] text-white/40 uppercase tracking-[0.14em] mt-1.5 flex flex-wrap gap-x-3">
          {lead.source && <span>{lead.source}</span>}
          {lead.property_type && <span>{lead.property_type}</span>}
          {lead.transaction_type && <span>{lead.transaction_type}</span>}
        </div>
      </td>
      <td className="px-5 py-4 text-white/75">
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:text-white transition-colors duration-150"
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
            className="flex items-center gap-2 hover:text-white transition-colors duration-150 mt-1.5 text-[12.5px] break-all"
          >
            <Mail
              className="w-3 h-3 text-[var(--gold-soft)]"
              strokeWidth={1.5}
            />
            {lead.email}
          </a>
        )}
      </td>
      <td className="px-5 py-4 text-white/70 text-[12.5px]">
        {lead.intent ?? "—"}
      </td>
      <td className="px-5 py-4 text-white/65 text-[12.5px] max-w-[260px]">
        {lead.message ? (
          <span title={lead.message} className="line-clamp-2">
            {lead.message}
          </span>
        ) : (
          <span className="text-white/35">—</span>
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
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-150 ${
            STATUS_STYLES[lead.status]
          } ${cyclable ? "hover:scale-[1.03] hover:brightness-110" : "cursor-not-allowed opacity-90"}`}
        >
          {STATUS_LABELS[lead.status]}
        </button>
      </td>
      <td className="px-5 py-4">
        {dnc ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FB7185]/40 bg-[#FB7185]/12 text-[#FDA4AF] text-[10.5px] font-semibold uppercase tracking-[0.14em]">
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
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-150 hover:scale-[1.03] ${
              lead.dnc_scrubbed
                ? "border-[#2DD4BF]/40 bg-[#2DD4BF]/10 text-[#5EEAD4]"
                : "border-white/20 bg-white/[0.04] text-white/55"
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
