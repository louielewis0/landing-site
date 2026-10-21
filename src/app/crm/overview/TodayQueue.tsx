import Link from "next/link";
import {
  Zap,
  Clock,
  CalendarCheck,
  CircleDashed,
  TrendingDown,
  ChevronRight,
  CheckCircle,
  Flame,
  Phone,
  MessageSquare,
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

/** Build tel:/sms: links from a free-text phone, or null if none. */
function phoneLinks(phone: string | null): { tel: string; sms: string } | null {
  const d = (phone ?? "").replace(/[^\d]/g, "");
  if (d.length < 10) return null;
  const e164 = d.length === 10 ? `+1${d}` : d.startsWith("1") ? `+${d}` : `+${d}`;
  return { tel: `tel:${e164}`, sms: `sms:${e164}` };
}

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
      title: "Call right now",
      hint: "brand-new leads — reach out fast while they're paying attention",
      icon: Zap,
      rows: respondNow,
      right: (l) => ageLabel(l.created_at),
    },
    {
      key: "overdue",
      title: "Overdue follow-ups",
      hint: "you set a date to follow up and it's already passed",
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
      title: "Follow up today",
      hint: "you planned to reach out to these today",
      icon: CalendarCheck,
      rows: dueToday,
      right: () => ({ text: "today" }),
    },
    {
      key: "nonext",
      title: "No follow-up planned",
      hint: "active leads with no next step set — easy to forget",
      icon: CircleDashed,
      rows: noNextStep,
      right: (l) =>
        l.last_contact_at
          ? { text: `last contact ${relativeTime(l.last_contact_at)}` }
          : { text: "never contacted", urgent: true },
    },
    {
      key: "slipping",
      title: "Going quiet",
      hint: "still active, but no contact in 14+ days",
      icon: TrendingDown,
      rows: slipping,
      right: (l) => ({ text: `quiet ${relativeTime(lastTouch(l))}` }),
    },
  ];

  const totalWork = queues.reduce((n, q) => n + q.rows.length, 0);

  return (
    <section className="crm-glass rounded-2xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-gradient-to-r from-[var(--gold)]/[0.06] to-transparent">
        <div>
          <p className="crm-label text-[var(--gold-soft)] mb-1">What to do next</p>
          <p className="text-white/50 text-[13px]">
            {totalWork === 0
              ? "All caught up — go find new leads"
              : `${totalWork} thing${totalWork === 1 ? "" : "s"} to do, most important first — just work down the list`}
          </p>
        </div>
        <Link
          href="/crm/leads"
          className="text-[12px] font-medium text-white/55 hover:text-white tracking-wide inline-flex items-center gap-1 transition-colors duration-150"
        >
          All leads <ChevronRight className="w-3 h-3" strokeWidth={1.75} />
        </Link>
      </header>

      {totalWork === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<CheckCircle className="w-5 h-5" strokeWidth={1.5} />}
            title="You're all caught up."
            description="No new leads to call, nothing overdue, and every active lead has a next step. Nice work."
          />
        </div>
      ) : (
        <div className="divide-y divide-white/[0.055]">
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
                    <span className="text-[12.5px] text-white/90 font-semibold tracking-wide">
                      {q.title}
                    </span>
                    <span className="text-[11.5px] text-white/45 crm-num">
                      {q.rows.length}
                    </span>
                    <span className="text-[11px] text-white/35 truncate">
                      — {q.hint}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {q.rows.slice(0, 5).map((l) => {
                      const r = q.right(l);
                      const links = phoneLinks(l.phone);
                      const mail = l.email ? `mailto:${l.email}` : null;
                      return (
                        <li
                          key={l.id}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2 -mx-3 hover:bg-white/[0.045] transition-colors duration-150"
                        >
                          <Link
                            href={`/crm/leads?lead=${l.id}`}
                            className="flex items-center gap-2.5 min-w-0 flex-1"
                          >
                            <PriorityDot priority={l.priority} />
                            {l.priority === "hot" && (
                              <Flame
                                className="w-3 h-3 text-[#FB7185] shrink-0"
                                strokeWidth={2}
                                aria-label="Hot lead"
                              />
                            )}
                            <span className="min-w-0">
                              <span className="flex items-center gap-2">
                                <span className="text-[13px] font-medium text-white/85 truncate">
                                  {l.name}
                                </span>
                                <span className="text-[11.5px] text-white/40 truncate">
                                  {[l.source, l.intent].filter(Boolean).join(" · ")}
                                </span>
                              </span>
                              {l.message && (
                                <span className="block text-[11.5px] text-white/35 truncate italic">
                                  &ldquo;{l.message}&rdquo;
                                </span>
                              )}
                            </span>
                          </Link>

                          <span
                            className={`text-[11px] crm-num shrink-0 ${
                              r.urgent ? "text-[#FB7185]" : "text-white/45"
                            }`}
                          >
                            {r.text}
                          </span>

                          {/* Act from the feed — no record open needed. */}
                          <span className="flex items-center gap-1 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
                            {links ? (
                              <>
                                <a
                                  href={links.tel}
                                  title={`Call ${l.name}`}
                                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#0A0908] bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)] hover:brightness-110 transition"
                                >
                                  <Phone className="w-3 h-3" strokeWidth={2} />
                                  Call
                                </a>
                                <a
                                  href={links.sms}
                                  title={`Text ${l.name}`}
                                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition"
                                >
                                  <MessageSquare className="w-3 h-3" strokeWidth={2} />
                                  Text
                                </a>
                              </>
                            ) : mail ? (
                              <a
                                href={mail}
                                title={`Email ${l.name}`}
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition"
                              >
                                Email
                              </a>
                            ) : (
                              <span className="text-[10.5px] text-white/25 px-2">
                                no contact
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {q.rows.length > 5 && (
                    <p className="text-[11px] text-white/35 mt-1.5 pl-3">
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
