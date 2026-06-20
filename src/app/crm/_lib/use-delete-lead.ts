"use client";

import { useState } from "react";
import { usePasscode } from "../gate";
import { apiFetch } from "./api-client";

/**
 * Hook for permanent lead deletion. Pattern mirrors use-patch-lead:
 * passcode forwarded via apiFetch, pending-flag for the UI to disable
 * the trigger, and the caller decides how to optimistic-update / roll
 * back since "which list to remove from" varies per surface (Kanban
 * column, leads table row, etc.).
 *
 * The route returns { ok: true }; we don't surface that, just resolve
 * void so callers don't have to thread a dummy return through their
 * success path.
 */
export function useDeleteLead() {
  const passcode = usePasscode();
  const [pending, setPending] = useState(false);

  async function mutate(leadId: string): Promise<void> {
    setPending(true);
    try {
      await apiFetch<{ ok: true }>(passcode, `/leads/${leadId}`, {
        method: "DELETE",
      });
    } finally {
      setPending(false);
    }
  }

  return { mutate, pending };
}
