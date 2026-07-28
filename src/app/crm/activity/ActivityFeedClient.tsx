"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Users,
  StickyNote,
  RefreshCw,
} from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import { relativeTime } from "../_lib/relative-time";
import EmptyState from "@/components/crm/EmptyState";
import type { ActivityType } from "@/lib/activity-shape";

/**
 * Global activity feed — every call, email, text, meeting, and
 * note across every lead, newest first, grouped by day. Rows
 * deep-link to the lead drawer (/crm/leads?lead=<id>).
 *
 * Type filter chips are client-side over the fetched 200-row
 * window; at current volume that's the whole history.
 */

type FeedRow = {
  id: string;
  lead_id: string;
  type: ActivityType;
  body: string | null;
  created_at: string;
  leads: { name: string; status: string } | null;
};

const TYPE_META: Record<
  ActivityType,
  { label: string; icon: typeof Phone }
> = {
  call: { label: "Calls", icon: Phone },
  email: { label: "Emails", icon: Mail },
  text: { label: "Texts", icon: MessageSquare },
  meeting: { label: "Meetings", icon: Users },
  note: { label: "Notes", icon: StickyNote },
};

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export default function ActivityFeedClient() {
  const passcode = usePasscode();
  const [rows, setRows] = useState<FeedRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ActivityType | "all">("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setError(null);
    apiFetch<{ activities: FeedRow[] }>(passcode, "/activities")
      .then((d) => {
        if (!cancelled) setRows(d.activities ?? []);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [passcode, reloadKey]);

  const filtered = useMemo(
    () =>
      (rows ?? []).filter((r) => typeFilter === "all" || r.type === typeFilter),
    [rows, typeFilter],
  );

  const groups = useMemo(() => {
    const out: { day: string; items: FeedRow[] }[] = [];
    for (const r of filtered) {
      const day = dayLabel(r.created_at);
      const last = out[out.length - 1];
      if (last && last.day === day) last.items.push(r);
      else out.push({ day, items: [r] });
    }
    return out;
  }, [filtered]);

  if (error) {
    return (
      <div className="rounded-2xl border border-[#FB7185]/40 bg-[#FB7185]/[0.05] p-8 text-center">
        <AlertCircle className="w-5 h-5 text-[#FDA4AF] mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-white/70 text-[14px] mb-4 font-light">{error}</p>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[#0A0B0F] text-[13px] font-semibold tracking-wide transition-all"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Retry
        </button>
      </div>
    );
  }

  if (rows === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.02] h-[64px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Type filter chips */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          type="button"
          onClick={() => setTypeFilter("all")}
          className={`px-4 py-2 rounded-full text-[12.5px] tracking-wide transition-all border ${
            typeFilter === "all"
              ? "bg-[var(--gold)] text-[#0A0B0F] font-semibold border-transparent"
              : "text-white/60 hover:text-white/90 border-white/15"
          }`}
        >
          All
        </button>
        {(Object.keys(TYPE_META) as ActivityType[]).map((t) => {
          const Icon = TYPE_META[t].icon;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] tracking-wide transition-all border ${
                typeFilter === t
                  ? "bg-[var(--gold)] text-[#0A0B0F] font-semibold border-transparent"
                  : "text-white/60 hover:text-white/90 border-white/15"
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
              {TYPE_META[t].label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
          <EmptyState
            icon={<StickyNote className="w-5 h-5" strokeWidth={1.5} />}
            title="No activity yet."
            description="Calls, texts, emails, meetings, and notes you log on any lead show up here — newest first."
          />
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.day}>
              <p className="crm-label text-[var(--gold-soft)] mb-3">{g.day}</p>
              <ul className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/[0.06] overflow-hidden">
                {g.items.map((r) => {
                  const Icon = TYPE_META[r.type]?.icon ?? StickyNote;
                  return (
                    <li key={r.id}>
                      <Link
                        href={`/crm/leads?lead=${r.lead_id}`}
                        className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors duration-200"
                      >
                        <span className="w-8 h-8 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5 text-white/60">
                          <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-[13.5px] text-white/90 font-medium capitalize">
                              {r.type}
                            </span>
                            <span className="text-[13px] text-[var(--gold-soft)] truncate">
                              {r.leads?.name ?? "Unknown lead"}
                            </span>
                          </span>
                          {r.body && (
                            <span className="block text-[12.5px] text-white/55 font-light mt-0.5 line-clamp-2">
                              {r.body}
                            </span>
                          )}
                        </span>
                        <span className="text-[11.5px] text-white/40 shrink-0 mt-1">
                          {relativeTime(r.created_at)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
