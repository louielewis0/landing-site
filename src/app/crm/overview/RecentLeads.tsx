import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import StatusPill from "@/components/crm/StatusPill";
import PriorityDot from "@/components/crm/PriorityDot";
import EmptyState from "@/components/crm/EmptyState";
import { relativeTime } from "../_lib/relative-time";
import type { Lead } from "@/lib/lead-shape";

/**
 * "Recent Leads" panel — the most recent N leads by created_at.
 *
 * This is the 2B stand-in for the "activity feed" — the
 * activities table (calls/emails/meetings/notes) doesn't have
 * routes until 2E, so 2B surfaces newest lead arrivals instead.
 * Real activity timeline lives at /crm/activity once 2E ships.
 */
export default function RecentLeads({ leads }: { leads: Lead[] }) {
  const rows = leads
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 6);

  return (
    <section className="crm-glass rounded-2xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
        <div>
          <p className="crm-label text-[var(--gold-soft)] mb-1">Recent Leads</p>
          <p className="text-white/50 text-[13px]">newest arrivals</p>
        </div>
        <Link
          href="/crm/leads"
          className="text-[12px] font-medium text-white/55 hover:text-white tracking-wide inline-flex items-center gap-1 transition-colors duration-150"
        >
          View all <ChevronRight className="w-3 h-3" strokeWidth={1.75} />
        </Link>
      </header>

      {rows.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<Sparkles className="w-5 h-5" strokeWidth={1.5} />}
            title="No leads yet."
            description="When new leads come in from the capture forms, they'll show here."
          />
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.055]">
          {rows.map((lead) => (
            <li key={lead.id}>
              <Link
                href={`/crm/leads?lead=${lead.id}`}
                className="group flex items-center gap-3 px-6 py-3.5 hover:bg-white/[0.035] transition-colors duration-150"
              >
                <PriorityDot priority={lead.priority} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-white/90 truncate">{lead.name}</p>
                  <p className="text-[12px] text-white/45 truncate">
                    {lead.source ?? "—"} ·{" "}
                    <span className="text-white/35">
                      {relativeTime(lead.created_at)}
                    </span>
                  </p>
                </div>
                <StatusPill status={lead.status} />
                <ChevronRight
                  className="w-4 h-4 text-white/25 group-hover:text-white/60 shrink-0 transition-colors duration-150"
                  strokeWidth={1.5}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
