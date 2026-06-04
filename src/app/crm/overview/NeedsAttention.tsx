import Link from "next/link";
import { ChevronRight, Flame, Clock, Phone } from "lucide-react";
import StatusPill from "@/components/crm/StatusPill";
import PriorityDot from "@/components/crm/PriorityDot";
import EmptyState from "@/components/crm/EmptyState";
import type { Lead } from "@/lib/lead-shape";

/**
 * "Needs Attention" panel — the hot + overdue leads, sorted so
 * the highest-friction items rise to the top: hot first (active
 * and high-priority), then overdue follow-ups (active leads
 * whose follow_up_date has passed). Both flags are computed by
 * leads_v in supabase/crm_phase1a.sql; we just filter and sort.
 *
 * Each row is clickable as a future affordance for the
 * lead-detail drawer in 2E. Until then, clicking routes to
 * /crm/leads with a query hash that 2D / 2E will use to open
 * the drawer for that lead. Inert today is honest about scope.
 */
export default function NeedsAttention({ leads }: { leads: Lead[] }) {
  const hot = leads.filter((l) => l.is_hot_active === true);
  const overdue = leads.filter(
    (l) => l.is_overdue_followup === true && l.is_hot_active !== true
  );
  const rows = [...hot, ...overdue].slice(0, 8);

  return (
    <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] backdrop-blur-xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bone/10">
        <div>
          <p className="eyebrow mb-1">Needs Attention</p>
          <p className="text-bone/55 text-[13px] font-light">
            {hot.length} hot · {overdue.length} overdue
          </p>
        </div>
        <Link
          href="/crm/leads"
          className="text-[12px] text-bone/55 hover:text-bone tracking-wide inline-flex items-center gap-1 transition-colors duration-300"
        >
          View all <ChevronRight className="w-3 h-3" strokeWidth={1.75} />
        </Link>
      </header>

      {rows.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<Flame className="w-5 h-5" strokeWidth={1.5} />}
            title="All clear."
            description="No hot or overdue leads right now. Nice."
          />
        </div>
      ) : (
        <ul className="divide-y divide-bone/[0.06]">
          {rows.map((lead) => (
            <li key={lead.id}>
              <Link
                href={`/crm/leads?lead=${lead.id}`}
                className="group flex items-center gap-3 px-6 py-3.5 hover:bg-bone/[0.03] transition-colors duration-200"
              >
                <PriorityDot priority={lead.priority} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] text-bone truncate">
                      {lead.name}
                    </p>
                    {lead.is_hot_active && (
                      <Flame
                        className="w-3 h-3 text-[var(--gold-soft)] shrink-0"
                        strokeWidth={2}
                      />
                    )}
                    {lead.is_overdue_followup && (
                      <Clock
                        className="w-3 h-3 text-[var(--gold-deep)] shrink-0"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <p className="text-[12px] text-bone/45 truncate">
                    {lead.source ?? "—"} · {lead.intent ?? "no intent"}
                  </p>
                </div>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 p-1.5 rounded-full text-bone/55 hover:text-[var(--gold-soft)] hover:bg-[var(--gold)]/10 transition-colors duration-200"
                    aria-label={`Call ${lead.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                )}
                <StatusPill status={lead.status} />
                <ChevronRight
                  className="w-4 h-4 text-bone/25 group-hover:text-bone/55 shrink-0 transition-colors duration-200"
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
