/**
 * Pure helpers for /crm/playbook stats. No React, no Supabase — just
 * deterministic computation against the typed rows so they're easy to
 * unit-test later without standing up a fixture component.
 *
 * All week boundaries are ISO weeks (Monday→Sunday), evaluated in the
 * browser's local timezone — same window the agent will be planning
 * inside.
 */
import type { CompletionRow, ConversationRow } from "../_lib/use-playbook";
import { TASKS, TOTAL_DAYS, type PlaybookTask } from "./_tasks";

/** Find the Monday (00:00 local) of the ISO week that contains `d`. */
export function startOfWeek(d: Date): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  // getDay() = 0..6 (Sun..Sat). Convert to ISO (Mon..Sun = 1..7).
  const isoDay = ((out.getDay() + 6) % 7) + 1; // 1..7
  out.setDate(out.getDate() - (isoDay - 1));
  return out;
}

/** Local-time YYYY-MM-DD key, used for the streak grouping. */
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * "Current day" = the lowest day number with at least one not-yet-
 * completed task. Falls through to TOTAL_DAYS if everything is checked.
 * Defaults to 1 if nothing is checked yet.
 */
export function computeCurrentDay(completions: CompletionRow[]): number {
  const checkedIds = new Set(completions.map((c) => c.task_id));
  // Iterate days 1..N; the first day with an uncompleted task is "today".
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const dayTasks = TASKS.filter((t: PlaybookTask) => t.day === day);
    if (dayTasks.length === 0) continue;
    const allDone = dayTasks.every((t) => checkedIds.has(t.id));
    if (!allDone) return day;
  }
  return TOTAL_DAYS;
}

/**
 * Streak = the number of consecutive most-recent calendar days that
 * have at least one completion, anchored on today OR yesterday.
 *
 * Anchoring on yesterday too means an agent who hasn't checked off
 * today's task yet (still morning, hasn't started) doesn't lose their
 * streak. The streak only breaks if there's a full day with zero
 * activity AND today is also empty.
 */
export function computeStreak(completions: CompletionRow[]): number {
  if (completions.length === 0) return 0;

  const daysWithWork = new Set(
    completions.map((c) => dayKey(new Date(c.completed_at))),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Anchor: today if there's activity today, else yesterday if there's
  // activity yesterday, else streak = 0 (the chain is already broken).
  let cursor: Date;
  if (daysWithWork.has(dayKey(today))) {
    cursor = new Date(today);
  } else if (daysWithWork.has(dayKey(yesterday))) {
    cursor = new Date(yesterday);
  } else {
    return 0;
  }

  let streak = 0;
  while (daysWithWork.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Total tasks across all 90 days. */
export const TOTAL_TASKS = TASKS.length;

/** How many of all 90-day tasks have been completed. */
export function completedTaskCount(completions: CompletionRow[]): number {
  const validIds = new Set(TASKS.map((t) => t.id));
  // Filter against the static task set so any orphan rows (e.g. a renamed
  // task) don't inflate the count.
  return completions.filter((c) => validIds.has(c.task_id)).length;
}

/** Conversations recorded inside the current ISO week. */
export function conversationsThisWeek(
  conversations: ConversationRow[],
  now: Date = new Date(),
): ConversationRow[] {
  const weekStart = startOfWeek(now);
  return conversations.filter((c) => new Date(c.started_at) >= weekStart);
}
