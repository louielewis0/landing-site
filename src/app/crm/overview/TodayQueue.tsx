import Link from "next/link";
import {
  Zap,
  Clock,
  CalendarCheck,
  CircleDashed,
  TrendingDown,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import PriorityDot from "@/components/crm/PriorityDot";
import EmptyState from "@/components/crm/EmptyState";
import { relativeTime } from "../_lib/relative-time";
import type { Lead } from "@/lib/lead-shape";

/**
 * Today's Work — the queue-first home module. Pattern synthesized
 * from Real Geeks' Lead Feed, CINC's Launchpad, and Pipedrive's
 * next-activity discipline: the dashboard is a prioritized work
 * list, not a stats page. Five queues in strict priority order:
 *
 *   1. Respond now  — uncontacted inbound (non-Expired source,
 *      status new). Speed-to-lead decays ~10x after the first
 *      hour, so rows carry an age timer and go rust-red past 1h.
 *   2. Overdue      — follow_up_date in the past (leads_v flag).
 *   3. Due today    — follow_up_date = today.
 *   4. No next step — active pipeline with no follow_up_date at
 *      all: the silent killer state (Pipedrive's hollow chip).
 *   5. Slipping away — active, untouched 14+ days.
 *
 * Every row deep-links to the lead drawer. Capped at 5 rows per
 * queue with a "view all" affordance into /crm/leads.
 */

const HOUR = 3600 * 1000;

function ageLabel(iso: string): { text: string; urgent: boolean } {
  const ms = Date.now() - new Date(iso).getTime();
  const urgent = ms > HOUR;
  if (ms < HOUR) return { text: `${Math.max(1, Math.round(ms / 60000))}m waiting`, urgent };
  if (ms < 24 * HOUR) return { text: `${Math.round(ms / HOUR)}h waiting`, urgent };
  return { text: `${Math.round(ms / (24 * HOUR))}d waiting`, urgent };
}

type QueueDef = {
  key: string;
  title: string;
  hint: string;
  icon: typeof Zap;
  rows: Lead[];
  right: (l: Lead) => { text: string; urgent?: boolean };
};

export default function TodayQueue({ leads }: { leads: Lead[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const isExpiredSrc = (l: Lead) =>
    (l.source ?? "").trim().toLowerCase() === "expired";
  const fourteenDaysAgo = Date.now() - 14 * 24 * HOUR;

  const respondNow = leads
    .filter((l) => l.status === "new" && !isExpiredSrc(l))
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  const overdue = leads
    .filter((l) => l.is_overdue_followup === true)
    .sort((a, b) =>
      (a.follow_up_date ?? "").localeCompare(b.follow_up_date ?? ""),
    );

  const dueToday = leads.filter(
    (l) => l.follow_up_date === today && l.is_overdue_followup !== true,
  );

  const noNextStep = leads.filter(
    (l) =>
      l.is_active === true &&
      !l.follow_up_date &&
      l.status !== "new",
  );

  // "Last touch" = real personal contact when we have it (call/text/
  // email activity), falling back to record update for legacy rows.
  const lastTouch = (l: Lead) =>
    l.last_contact_at ?? l.updated_at ?? l.created_at;

  const slipping = leads.filter(
    (l) =>
      l.is_active === true &&
      l.follow_up_date !== today &&
      l.is_overdue_followup !== true &&
      new Date(lastTouch(l)).getTime() < fourteenDaysAgo,
  );

  const queues: QueueDef[] = [
    {
      key: "respond",
      title: "Respond now",
      hint: "new inbound — contact rate drops 10x after the first hour",
      icon: Zap,
      rows: respondNow,
      right: (l) => ageLabel(l.created_at),
    },
    {
      key: "overdue",
      title: "Overdue follow-ups",
      hint: "promised touches that slipped",
      icon: Clock,
      rows: overdue,
      right: (l) => ({
        text: l.follow_up_date
          ? `was due ${new Date(l.follow_up_date + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
          : "overdue",
        urgent: true,
      }),
    },
    {
      key: "today",
      title: "Due today",
      hint: "scheduled for today",
      icon: CalendarCheck,
      rows: dueToday,
      right: () => ({ text: "today" }),
    },
    {
      key: "nonext",
      title: "No next step",
      hint: "active leads with nothing scheduled — the silent pipeline killer",
      icon: CircleDashed,
      rows: noNextStep,
      right: (l) =>
        l.last_contact_at
          ? { text: `contacted ${relativeTime(l.last_contact_at)}` }
          : { text: "never contacted", urgent: true },
    },
    {
      key: "slipping",
      title: "Slipping away",
      hint: "active but not contacted in 14+ days",
      icon: TrendingDown,
      rows: slipping,
      right: (l) => ({ text: `idle ${relativeTime(lastTouch(l))}` }),
    },
  ];

  const totalWork = queues.reduce((n, q) => n + q.rows.length, 0);

  return (
    <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] backdrop-blur-xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bone/10">
        <div>
          <p className="eyebrow mb-1">Today&apos;s Work</p>
          <p className="text-bone/55 text-[13px] font-light">
            {totalWork === 0
              ? "Queue clear — go find more leads"
              : `${totalWork} action${totalWork === 1 ? "" : "s"} in priority order — work top to bottom`}
          </p>
        </div>
        <Link
          href="/crm/leads"
          className="text-[12px] text-bone/55 hover:text-bone tracking-wide inline-flex items-center gap-1 transition-colors duration-300"
        >
          All leads <ChevronRight className="w-3 h-3" strokeWidth={1.75} />
        </Link>
      </header>

      {totalWork === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<CheckCircle className="w-5 h-5" strokeWidth={1.5} />}
            title="Nothing waiting."
            description="No uncontacted inbound, nothing overdue, everything scheduled. Import expireds or work the aged list."
          />
        </div>
      ) : (
        <div className="divide-y divide-bone/[0.06]">
          {queues
            .filter((q) => q.rows.length > 0)
            .map((q) => {
              const Icon = q.icon;
              return (
                <div key={q.key} className="px-6 py-4">
                  <div className="flex items-baseline gap-2 mb-2.5">
                    <Icon
                      className="w-3.5 h-3.5 text-[var(--gold-soft)] self-center"
                      strokeWidth={1.75}
                    />
                    <span className="text-[12.5px] text-bone font-medium tracking-wide">
                      {q.title}
                    </span>
                    <span className="text-[11.5px] text-bone/45 tabular-nums">
                      {q.rows.length}
                    </span>
                    <span className="text-[11px] text-bone/35 font-light truncate">
                      — {q.hint}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {q.rows.slice(0, 5).map((l) => {
                      const r = q.right(l);
                      return (
                        <li key={l.id}>
                          <Link
                            href={`/crm/leads?lead=${l.id}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 -mx-3 hover:bg-bone/[0.04] transition-colors duration-150"
                          >
                            <PriorityDot priority={l.priority} />
                            <span className="text-[13px] text-bone truncate">
                              {l.name}
                            </span>
                            <span className="text-[11.5px] text-bone/40 font-light truncate">
                              {[l.source, l.intent].filter(Boolean).join(" · ")}
                            </span>
                            <span
                              className={`ml-auto text-[11px] tabular-nums shrink-0 ${
                                r.urgent ? "text-rust" : "text-bone/45"
                              }`}
                            >
                              {r.text}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {q.rows.length > 5 && (
                    <p className="text-[11px] text-bone/35 mt-1.5 pl-3">
                      +{q.rows.length - 5} more in Leads
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
}
