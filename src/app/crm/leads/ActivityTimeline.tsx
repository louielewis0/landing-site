"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  CalendarDays,
  FileText,
  Send,
  AlertCircle,
} from "lucide-react";
import { useActivities, useCreateActivity } from "../_lib/use-activities";
import { relativeTime } from "../_lib/relative-time";
import {
  ACTIVITY_TYPES,
  type Activity,
  type ActivityType,
} from "@/lib/activity-shape";

/**
 * Per-lead activity timeline. Top: type chips + body textarea +
 * submit ("Log activity"). Below: scrollable list of past
 * activities, newest first.
 *
 * Type icons follow obvious mappings (Phone for call, Mail for
 * email, etc.). Note items get the FileText icon to match the
 * marketing-site visual vocabulary.
 *
 * created_by is null in Phase 2 (no agents until Phase 3); the
 * timeline renders "you" for null authors. When Phase 3 ships
 * Supabase Auth + populates agents, this can join against the
 * agents table to surface real names.
 */

const TYPE_LABELS: Record<ActivityType, string> = {
  call: "Call",
  email: "Email",
  text: "Text",
  meeting: "Meeting",
  note: "Note",
};

function typeIcon(type: ActivityType, className: string) {
  switch (type) {
    case "call":
      return <Phone className={className} strokeWidth={1.5} />;
    case "email":
      return <Mail className={className} strokeWidth={1.5} />;
    case "text":
      return <MessageSquare className={className} strokeWidth={1.5} />;
    case "meeting":
      return <CalendarDays className={className} strokeWidth={1.5} />;
    case "note":
      return <FileText className={className} strokeWidth={1.5} />;
  }
}

export default function ActivityTimeline({ leadId }: { leadId: string }) {
  const result = useActivities(leadId);
  const creator = useCreateActivity();

  const [type, setType] = useState<ActivityType>("note");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const trimmed = body.trim();
    if (!trimmed) return;
    setError(null);
    try {
      const activity = await creator.create(leadId, {
        type,
        body: trimmed,
      });
      // Hand to the activities list — useActivities exposes
      // prepend so the new row appears at top instantly.
      if (result.status === "ready") {
        result.prepend(activity);
      }
      setBody("");
      // type stays sticky for batch logging — same pattern as
      // AddLeadPanel's source.
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div>
      {/* Composer */}
      <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3 mb-3">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {ACTIVITY_TYPES.map((t) => {
            const isActive = type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10.5px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 ${
                  isActive
                    ? "border-[var(--gold)]/50 bg-[var(--gold)]/12 text-[var(--gold-soft)]"
                    : "border-bone/10 bg-transparent text-bone/45 hover:border-bone/25 hover:text-bone/75"
                }`}
              >
                {typeIcon(t, "w-3 h-3")}
                {TYPE_LABELS[t]}
              </button>
            );
          })}
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`Log a ${TYPE_LABELS[type].toLowerCase()}…`}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone text-[13.5px] placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all resize-y"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-bone/35">
            ⌘ + Enter to log
          </span>
          <button
            type="button"
            onClick={submit}
            disabled={creator.pending || !body.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[11.5px] font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3 h-3" strokeWidth={2.25} />
            {creator.pending ? "Logging…" : "Log activity"}
          </button>
        </div>
        {error && (
          <div className="mt-2 text-[12px] text-rust flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            {error}
          </div>
        )}
      </div>

      {/* Timeline */}
      {result.status === "loading" && (
        <p className="text-bone/45 text-[13px] py-4 text-center">
          Loading activity…
        </p>
      )}
      {result.status === "error" && (
        <p className="text-rust text-[13px] py-4 text-center">
          Couldn&apos;t load activity: {result.error}
        </p>
      )}
      {result.status === "ready" && result.activities.length === 0 && (
        <p className="text-bone/35 text-[12.5px] py-4 text-center font-light">
          No activity logged yet.
        </p>
      )}
      {result.status === "ready" && result.activities.length > 0 && (
        <ul className="space-y-2.5">
          {result.activities.map((a) => (
            <ActivityRow key={a.id} activity={a} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <li className="flex gap-3 p-3 rounded-lg border border-bone/[0.06] bg-bone/[0.015]">
      <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center text-[var(--gold-soft)] shrink-0">
        {typeIcon(activity.type, "w-3.5 h-3.5")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
            {TYPE_LABELS[activity.type]}
          </span>
          <span className="text-[10.5px] text-bone/45 tabular-nums">
            {relativeTime(activity.created_at)}
          </span>
        </div>
        {activity.body && (
          <p className="text-[13px] text-bone/80 whitespace-pre-wrap break-words">
            {activity.body}
          </p>
        )}
        <p className="text-[10.5px] text-bone/35 mt-1.5">
          by you
        </p>
      </div>
    </li>
  );
}
