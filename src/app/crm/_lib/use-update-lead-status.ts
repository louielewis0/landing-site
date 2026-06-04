"use client";

import { useState } from "react";
import { usePasscode } from "../gate";
import type { Lead, LeadStatus } from "@/lib/lead-shape";

/**
 * PATCH a lead's status via /api/dashboard/leads/[id]. Service-
 * role bypasses RLS server-side; the passcode is forwarded as
 * x-dashboard-auth on every request.
 *
 * Returns { mutate, pending } — call mutate(id, status), it
 * returns a promise that resolves with the updated lead row
 * (from the base `leads` table, no view flags) or rejects with
 * an Error whose message is the server's `error` payload or an
 * HTTP-status fallback.
 *
 * The Kanban (2C) and the lead-detail drawer (2E) both consume
 * this hook. Future per-field PATCHes (priority, follow_up_date,
 * etc. in 2E) get their own hooks alongside, mirroring this
 * shape.
 */
export function useUpdateLeadStatus() {
  const passcode = usePasscode();
  const [pending, setPending] = useState(false);

  async function mutate(leadId: string, status: LeadStatus): Promise<Lead> {
    setPending(true);
    try {
      const res = await fetch(`/api/dashboard/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "x-dashboard-auth": passcode,
          "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const body = (await res
          .json()
          .catch(() => ({}) as Record<string, unknown>)) as Record<
          string,
          unknown
        >;
        const msg =
          typeof body.error === "string" ? body.error : `HTTP ${res.status}`;
        throw new Error(msg);
      }
      const data = (await res.json()) as { lead: Lead };
      return data.lead;
    } finally {
      setPending(false);
    }
  }

  return { mutate, pending };
}
