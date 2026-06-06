"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "./api-client";
import { usePasscode } from "../gate";

export type CompletionRow = {
  id: string;
  task_id: string;
  completed_at: string;
};

export type ConversationRow = {
  id: string;
  started_at: string;
  note: string | null;
};

type State = {
  completions: CompletionRow[];
  conversations: ConversationRow[];
};

/**
 * /crm/playbook data hook. Keeps a single source-of-truth slice of
 * playbook state (completions + conversations) in memory and exposes
 * mutators that optimistic-update + reconcile against the route
 * response.
 *
 * Errors are surfaced via the `error` field for the page to render
 * inline rather than thrown — playbook is a self-tracking surface, a
 * failed checkbox toggle shouldn't crash the whole page. The hook
 * holds the previous state, so the next successful mutation heals.
 */
export function usePlaybook() {
  const passcode = usePasscode();
  const [state, setState] = useState<State>({
    completions: [],
    conversations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<State>(passcode, "/playbook");
      setState(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load playbook");
    } finally {
      setLoading(false);
    }
  }, [passcode]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /* ── Mutations ───────────────────────────────────────────────────── */

  const completeTask = useCallback(
    async (taskId: string) => {
      // Optimistic
      const optimistic: CompletionRow = {
        id: `tmp-${taskId}`,
        task_id: taskId,
        completed_at: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        completions: [
          ...s.completions.filter((c) => c.task_id !== taskId),
          optimistic,
        ],
      }));
      try {
        const { completion } = await apiFetch<{ completion: CompletionRow }>(
          passcode,
          "/playbook/completion",
          { method: "POST", body: JSON.stringify({ task_id: taskId }) },
        );
        // Reconcile with server's row (real id, real timestamp)
        setState((s) => ({
          ...s,
          completions: [
            ...s.completions.filter((c) => c.task_id !== taskId),
            completion,
          ],
        }));
      } catch (e) {
        // Roll back
        setState((s) => ({
          ...s,
          completions: s.completions.filter((c) => c.task_id !== taskId),
        }));
        setError(e instanceof Error ? e.message : "Failed to save task");
      }
    },
    [passcode],
  );

  const uncompleteTask = useCallback(
    async (taskId: string) => {
      const prev = state.completions.find((c) => c.task_id === taskId);
      setState((s) => ({
        ...s,
        completions: s.completions.filter((c) => c.task_id !== taskId),
      }));
      try {
        await apiFetch(passcode, "/playbook/completion", {
          method: "DELETE",
          body: JSON.stringify({ task_id: taskId }),
        });
      } catch (e) {
        // Roll back
        if (prev) {
          setState((s) => ({ ...s, completions: [...s.completions, prev] }));
        }
        setError(e instanceof Error ? e.message : "Failed to uncheck task");
      }
    },
    [passcode, state.completions],
  );

  const addConversation = useCallback(
    async (note?: string) => {
      try {
        const { conversation } = await apiFetch<{
          conversation: ConversationRow;
        }>(passcode, "/playbook/conversation", {
          method: "POST",
          body: JSON.stringify({ note: note ?? null }),
        });
        setState((s) => ({
          ...s,
          conversations: [conversation, ...s.conversations],
        }));
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to record conversation",
        );
      }
    },
    [passcode],
  );

  const undoConversation = useCallback(
    async (id: string) => {
      const prev = state.conversations.find((c) => c.id === id);
      setState((s) => ({
        ...s,
        conversations: s.conversations.filter((c) => c.id !== id),
      }));
      try {
        await apiFetch(
          passcode,
          `/playbook/conversation?id=${encodeURIComponent(id)}`,
          { method: "DELETE" },
        );
      } catch (e) {
        if (prev) {
          setState((s) => ({
            ...s,
            conversations: [...s.conversations, prev],
          }));
        }
        setError(
          e instanceof Error ? e.message : "Failed to undo conversation",
        );
      }
    },
    [passcode, state.conversations],
  );

  return {
    ...state,
    loading,
    error,
    refresh,
    completeTask,
    uncompleteTask,
    addConversation,
    undoConversation,
  };
}
