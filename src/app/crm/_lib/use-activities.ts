"use client";

import { useCallback, useEffect, useState } from "react";
import { usePasscode } from "../gate";
import { apiFetch } from "./api-client";
import type { Activity, ActivityType } from "@/lib/activity-shape";

/**
 * Activity fetch + mutation hooks for the lead-detail drawer.
 *
 * useActivities(leadId) — paged-newest-first list. Re-fetches
 * when leadId changes. `prepend(activity)` mutates the local
 * list without a refetch — used by the composer for instant
 * feedback after a successful POST.
 *
 * useCreateActivity() — returns { create, pending }. `create`
 * resolves with the newly inserted row.
 */

export type UseActivitiesResult =
  | { status: "loading"; activities: null; error: null; prepend: (a: Activity) => void }
  | { status: "error"; activities: null; error: string; prepend: (a: Activity) => void }
  | { status: "ready"; activities: Activity[]; error: null; prepend: (a: Activity) => void };

export function useActivities(leadId: string | null): UseActivitiesResult {
  const passcode = usePasscode();
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!leadId) {
      setActivities(null);
      setError(null);
      return;
    }
    let cancelled = false;
    setActivities(null);
    setError(null);

    apiFetch<{ activities: Activity[] }>(
      passcode,
      `/leads/${leadId}/activities`,
    )
      .then((data) => {
        if (!cancelled) setActivities(data.activities ?? []);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [leadId, passcode]);

  const prepend = useCallback((a: Activity) => {
    setActivities((cur) => (cur === null ? [a] : [a, ...cur]));
  }, []);

  if (error !== null) {
    return { status: "error", activities: null, error, prepend };
  }
  if (activities === null) {
    return { status: "loading", activities: null, error: null, prepend };
  }
  return { status: "ready", activities, error: null, prepend };
}

export function useCreateActivity() {
  const passcode = usePasscode();
  const [pending, setPending] = useState(false);

  async function create(
    leadId: string,
    payload: { type: ActivityType; body: string | null },
  ): Promise<Activity> {
    setPending(true);
    try {
      const data = await apiFetch<{ activity: Activity }>(
        passcode,
        `/leads/${leadId}/activities`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );
      return data.activity;
    } finally {
      setPending(false);
    }
  }

  return { create, pending };
}
