"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Flame,
  MessageSquare,
  PlusCircle,
  Undo2,
} from "lucide-react";
import { usePlaybook } from "../_lib/use-playbook";
import {
  PHASES,
  TASKS,
  TOTAL_DAYS,
  WEEKLY_CONVERSATIONS_TARGET,
  phaseForDay,
  type PhaseInfo,
  type PlaybookTask,
} from "./_tasks";
import {
  TOTAL_TASKS,
  completedTaskCount,
  computeCurrentDay,
  computeStreak,
  conversationsThisWeek,
} from "./_stats";

/**
 * /crm/playbook orchestrator.
 *
 * Layout:
 *   1. Stats row (4 cards): Tasks / Day & Phase / Streak / Week's
 *      conversations toward the 15-target.
 *   2. Conversation logger (single textarea + +1 button).
 *   3. Three phase sections — each one a vertical stack of DayCards.
 *      The card for `currentDay` is auto-expanded; everything else
 *      collapses to a one-line summary so the page scans.
 *
 * Cinematic styling pulled from existing /crm primitives only —
 * `eyebrow`, `font-display`, `bg-bone/[0.04]` glass surfaces, gold
 * accents, atmosphere/grain inherited from the layout.
 */
export default function PlaybookClient() {
  const {
    completions,
    conversations,
    loading,
    error,
    completeTask,
    uncompleteTask,
    addConversation,
    undoConversation,
  } = usePlaybook();

  const completedIds = useMemo(
    () => new Set(completions.map((c) => c.task_id)),
    [completions],
  );

  const currentDay = useMemo(
    () => computeCurrentDay(completions),
    [completions],
  );
  const streak = useMemo(() => computeStreak(completions), [completions]);
  const tasksDone = completedTaskCount(completions);
  const tasksDonePct =
    TOTAL_TASKS === 0 ? 0 : Math.round((tasksDone / TOTAL_TASKS) * 100);

  const weekConversations = useMemo(
    () => conversationsThisWeek(conversations),
    [conversations],
  );

  const currentPhase = phaseForDay(currentDay);

  return (
    <div className="space-y-10">
      {error && (
        <div className="rounded-xl bg-rust/10 border border-rust/30 px-5 py-4 text-[14px] text-rust flex items-start gap-3">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Playbook hiccup.</div>
            <div className="text-rust/80 text-[13px] mt-1">{error}</div>
            <div className="text-bone/45 text-[12px] mt-2">
              Confirm the migration in{" "}
              <code>supabase/playbook_migration.sql</code> has been run.
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Tasks done"
          value={`${tasksDone}/${TOTAL_TASKS}`}
          sub={`${tasksDonePct}% of 90-day plan`}
        />
        <StatCard
          label="Day & phase"
          value={`Day ${currentDay}`}
          sub={`Phase ${currentPhase.id} · ${currentPhase.title}`}
          accent
        />
        <StatCard
          label="Streak"
          value={streak === 0 ? "—" : `${streak}d`}
          sub={streak === 0 ? "start one today" : "consecutive days worked"}
          icon={
            streak > 0 ? (
              <Flame className="w-4 h-4 text-[var(--gold-soft)]" strokeWidth={1.5} />
            ) : null
          }
        />
        <StatCard
          label="Conversations this week"
          value={`${weekConversations.length} / ${WEEKLY_CONVERSATIONS_TARGET}`}
          sub={
            weekConversations.length >= WEEKLY_CONVERSATIONS_TARGET
              ? "target hit — keep going"
              : "with someone who could buy / sell / refer"
          }
          accent={weekConversations.length >= WEEKLY_CONVERSATIONS_TARGET}
        />
      </div>

      {/* Conversation logger */}
      <ConversationLogger
        weekCount={weekConversations.length}
        target={WEEKLY_CONVERSATIONS_TARGET}
        recent={conversations.slice(0, 5)}
        onAdd={addConversation}
        onUndo={undoConversation}
      />

      {/* Phase sections */}
      <div className="space-y-12">
        {PHASES.map((phase) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            currentDay={currentDay}
            completedIds={completedIds}
            onToggle={(taskId, isComplete) =>
              isComplete ? uncompleteTask(taskId) : completeTask(taskId)
            }
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  icon?: React.ReactNode;
}) {
  const valueColor = accent ? "text-[var(--gold-soft)]" : "text-bone";
  return (
    <div className="rounded-2xl bg-bone/[0.03] border border-bone/10 px-5 py-5">
      <div className="text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-2">
        {label}
      </div>
      <div
        className={`font-display text-2xl sm:text-3xl font-light tracking-tight flex items-center gap-2 ${valueColor}`}
      >
        {value}
        {icon}
      </div>
      {sub && (
        <div className="text-[11.5px] text-bone/45 mt-2 font-light">{sub}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function ConversationLogger({
  weekCount,
  target,
  recent,
  onAdd,
  onUndo,
}: {
  weekCount: number;
  target: number;
  recent: { id: string; started_at: string; note: string | null }[];
  onAdd: (note?: string) => void | Promise<void>;
  onUndo: (id: string) => void | Promise<void>;
}) {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      await onAdd(note.trim() || undefined);
      setNote("");
    } finally {
      setSubmitting(false);
    }
  }

  const pct = Math.min(100, Math.round((weekCount / target) * 100));

  return (
    <section className="relative rounded-2xl bg-bone/[0.04] border border-bone/15 p-7 overflow-hidden">
      <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <p className="eyebrow mb-2">Headline KPI</p>
          <h2 className="font-display text-2xl font-light text-bone tracking-tight">
            Conversations started this week
          </h2>
          <p className="text-[13px] text-bone/55 mt-1.5 font-light max-w-lg">
            With someone who could buy, sell, or refer. Target {target}/week.
            Log each one as it happens — bagel route, BNI, sphere message,
            anywhere.
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-light text-[var(--gold-soft)] tracking-tight">
            {weekCount} <span className="text-bone/40 text-2xl">/ {target}</span>
          </div>
          <div className="text-[11px] text-bone/45 uppercase tracking-[0.18em] mt-1">
            this week
          </div>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-bone/[0.08] overflow-hidden mb-6">
        <div
          className="h-full bg-[var(--gold)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note (who, where) — e.g. 'James at BNI Troy'"
          className="flex-1 px-4 py-3 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
        >
          <PlusCircle className="w-4 h-4" strokeWidth={2} />
          {submitting ? "Logging…" : "Log conversation"}
        </button>
      </div>

      {recent.length > 0 && (
        <div className="mt-6">
          <p className="text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-3">
            Recent
          </p>
          <ul className="space-y-2">
            {recent.map((c) => (
              <li
                key={c.id}
                className="flex items-start gap-3 text-[13px] text-bone/70 group"
              >
                <MessageSquare
                  className="w-3.5 h-3.5 text-[var(--gold-soft)] mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="flex-1">
                  <span className="text-bone/45">
                    {new Date(c.started_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                    {" · "}
                  </span>
                  {c.note ?? <em className="text-bone/40">no note</em>}
                </span>
                <button
                  type="button"
                  onClick={() => onUndo(c.id)}
                  className="text-[11px] text-bone/35 hover:text-bone/70 transition-colors opacity-0 group-hover:opacity-100 inline-flex items-center gap-1"
                  title="Undo"
                >
                  <Undo2 className="w-3 h-3" />
                  undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function PhaseSection({
  phase,
  currentDay,
  completedIds,
  onToggle,
  loading,
}: {
  phase: PhaseInfo;
  currentDay: number;
  completedIds: Set<string>;
  onToggle: (taskId: string, isComplete: boolean) => void;
  loading: boolean;
}) {
  const days = Array.from(
    { length: phase.dayEnd - phase.dayStart + 1 },
    (_, i) => i + phase.dayStart,
  );
  const phaseTasks = TASKS.filter((t) => t.phase === phase.id);
  const phaseDone = phaseTasks.filter((t) => completedIds.has(t.id)).length;
  const phasePct =
    phaseTasks.length === 0
      ? 0
      : Math.round((phaseDone / phaseTasks.length) * 100);

  const isCurrent =
    currentDay >= phase.dayStart && currentDay <= phase.dayEnd;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <p
            className={`eyebrow mb-2 ${isCurrent ? "" : "opacity-70"}`}
          >
            Phase {phase.id} · Days {phase.dayStart}–{phase.dayEnd}
          </p>
          <h2 className="font-display text-3xl font-light text-bone tracking-tight">
            {phase.title}
          </h2>
          <p className="text-[13.5px] text-bone/55 mt-1.5 font-light max-w-2xl">
            {phase.subtitle}
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-light text-bone">
            {phaseDone}{" "}
            <span className="text-bone/40">/ {phaseTasks.length}</span>
          </div>
          <div className="text-[10px] text-bone/45 uppercase tracking-[0.22em] mt-1">
            {phasePct}% done
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {days.map((day) => (
          <DayCard
            key={day}
            day={day}
            currentDay={currentDay}
            completedIds={completedIds}
            onToggle={onToggle}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function DayCard({
  day,
  currentDay,
  completedIds,
  onToggle,
  loading,
}: {
  day: number;
  currentDay: number;
  completedIds: Set<string>;
  onToggle: (taskId: string, isComplete: boolean) => void;
  loading: boolean;
}) {
  const dayTasks = TASKS.filter((t) => t.day === day);
  if (dayTasks.length === 0) return null;

  const isToday = day === currentDay;
  const isPast = day < currentDay;
  const allDone = dayTasks.every((t) => completedIds.has(t.id));
  const someDone = dayTasks.some((t) => completedIds.has(t.id));

  const [expanded, setExpanded] = useState(isToday);

  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        isToday
          ? "border-[var(--gold)]/40 bg-bone/[0.04]"
          : allDone
            ? "border-bone/10 bg-bone/[0.015] opacity-80"
            : "border-bone/10 bg-bone/[0.02]"
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <span
            className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-[11px] tracking-[0.18em] font-medium ${
              isToday
                ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold-soft)]"
                : allDone
                  ? "border-[var(--gold)]/40 bg-[var(--gold)]/5 text-[var(--gold-soft)]"
                  : "border-bone/15 text-bone/55"
            }`}
          >
            {String(day).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[10px] uppercase tracking-[0.22em] ${
                  isToday
                    ? "text-[var(--gold-soft)]"
                    : "text-bone/45"
                }`}
              >
                Day {day}
                {isToday && " · today"}
                {isPast && allDone && " · done"}
              </span>
            </div>
            <div className="text-[13.5px] text-bone/75 truncate font-light">
              {dayTasks[0].title}
              {dayTasks.length > 1 && (
                <span className="text-bone/45 ml-2">
                  +{dayTasks.length - 1} more
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-[11px] text-bone/45 flex-shrink-0">
          {dayTasks.filter((t) => completedIds.has(t.id)).length}/
          {dayTasks.length}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-1 border-t border-bone/10">
          <ul className="space-y-3 mt-3">
            {dayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isComplete={completedIds.has(task.id)}
                onToggle={onToggle}
                disabled={loading}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Keep these signals in scope for the lint rule
  // (already used above) — guard against unused warnings.
  void someDone;
}

function TaskItem({
  task,
  isComplete,
  onToggle,
  disabled,
}: {
  task: PlaybookTask;
  isComplete: boolean;
  onToggle: (taskId: string, isComplete: boolean) => void;
  disabled: boolean;
}) {
  return (
    <li className="flex gap-3 items-start">
      <button
        type="button"
        onClick={() => onToggle(task.id, isComplete)}
        disabled={disabled}
        className="flex-shrink-0 mt-0.5 disabled:opacity-50"
        aria-label={isComplete ? "Uncheck task" : "Check task"}
      >
        {isComplete ? (
          <CheckCircle2
            className="w-5 h-5 text-[var(--gold-soft)]"
            strokeWidth={2}
          />
        ) : (
          <Circle
            className="w-5 h-5 text-bone/40 hover:text-bone/70 transition-colors"
            strokeWidth={2}
          />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[14px] leading-relaxed transition-colors ${
            isComplete
              ? "text-bone/45 line-through decoration-bone/30"
              : "text-bone/85"
          }`}
        >
          {task.title}
        </div>
        {task.note && (
          <div className="text-[12px] text-bone/45 mt-1.5 leading-relaxed italic font-light">
            {task.note}
          </div>
        )}
      </div>
    </li>
  );
}
