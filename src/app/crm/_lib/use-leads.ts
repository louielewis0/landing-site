"use client";

import { useEffect, useState } from "react";
import { usePasscode } from "../gate";
import type { Lead } from "@/lib/lead-shape";

/**
 * Client-side leads fetch hook. Reads the passcode from
 * <CrmGate> context and forwards it as the x-dashboard-auth
 * header to GET /api/dashboard/leads — which reads from
 * leads_v (Phase 2A commit 3) so each Lead arrives with the
 * five computed flags populated.
 *
 * No SWR / React Query in 2B — the legacy dashboard.tsx uses the
 * same plain useEffect pattern and we want consistency until we
 * have a real reason to add a data layer. Re-fetch on demand via
 * the returned `reload()` callback (e.g. after a Kanban drop in
 * 2C, or after editing in the drawer in 2E).
 */
export type UseLeadsResult =
  | { status: "loading"; leads: null; error: null; reload: () => void }
  | { status: "error"; leads: null; error: string; reload: () => void }
  | { status: "ready"; leads: Lead[]; error: null; reload: () => void };

export function useLeads(): UseLeadsResult {
  const passcode = usePasscode();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setLeads(null);

    fetch("/api/dashboard/leads", {
      headers: { "x-dashboard-auth": passcode },
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res
            .json()
            .catch(() => ({}) as Record<string, unknown>);
          const msg =
            typeof body.error === "string"
              ? body.error
              : `HTTP ${res.status}`;
          throw new Error(msg);
        }
        return res.json() as Promise<{ leads: Lead[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setLeads(data.leads ?? []);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      });

    return () => {
      cancelled = true;
    };
  }, [passcode, nonce]);

  const reload = () => setNonce((n) => n + 1);

  if (error !== null) {
    return { status: "error", leads: null, error, reload };
  }
  if (leads === null) {
    return { status: "loading", leads: null, error: null, reload };
  }
  return { status: "ready", leads, error: null, reload };
}
