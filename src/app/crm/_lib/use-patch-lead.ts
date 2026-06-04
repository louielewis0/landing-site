"use client";

import { useState } from "react";
import { usePasscode } from "../gate";
import { apiFetch } from "./api-client";
import type { Lead } from "@/lib/lead-shape";

/**
 * Generic PATCH hook for /api/dashboard/leads/[id]. Accepts any
 * partial Lead and sends it through — the server-side whitelist
 * (Phase 2E expansion in /api/dashboard/leads/[id]/route.ts) is
 * the authority on what's actually mutable.
 *
 * The Kanban's use-update-lead-status hook is the
 * single-field variant; this one is the multi-field general
 * version used by the lead-detail drawer. Both could collapse
 * into one in a future polish pass — keeping them separate for
 * 2E since the Kanban's hook predates this and migrating it
 * isn't required.
 *
 * Returns { patch, pending }. `patch` resolves with the updated
 * row from the base leads table (no view flags — POST/PATCH go
 * against `leads`, GET goes against leads_v).
 */
export function usePatchLead() {
  const passcode = usePasscode();
  const [pending, setPending] = useState(false);

  async function patch(
    leadId: string,
    fields: Partial<Lead>,
  ): Promise<Lead> {
    setPending(true);
    try {
      const data = await apiFetch<{ lead: Lead }>(
        passcode,
        `/leads/${leadId}`,
        {
          method: "PATCH",
          body: JSON.stringify(fields),
        },
      );
      return data.lead;
    } finally {
      setPending(false);
    }
  }

  return { patch, pending };
}
