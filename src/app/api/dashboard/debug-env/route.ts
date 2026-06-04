/**
 * TEMPORARY DIAGNOSTIC — delete after the Phase 2 leads_v
 * permission-denied issue is resolved.
 *
 * Reports the SHAPE of SUPABASE_SERVICE_ROLE_KEY in the running
 * preview environment, never the secret itself. Tells us:
 *   • is the env var reaching this deployment?
 *   • if it's a JWT, what role does it claim?
 *   • does that match the Supabase project we expect?
 *
 * Gated by the same passcode as every other /api/dashboard/* route
 * so an anonymous attacker can't probe the deploy.
 *
 * Reverted in a follow-up commit on feat/crm-phase2 BEFORE the
 * branch merges to main.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const has = key.length > 0;

  let jwt_role: string | null = null;
  let jwt_ref: string | null = null;
  let jwt_decode_error: string | null = null;

  if (has) {
    const parts = key.split(".");
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(
          Buffer.from(parts[1], "base64").toString("utf-8")
        );
        jwt_role = typeof payload.role === "string" ? payload.role : null;
        jwt_ref = typeof payload.ref === "string" ? payload.ref : null;
      } catch (e) {
        jwt_decode_error = e instanceof Error ? e.message : "decode failed";
      }
    } else {
      jwt_decode_error = `value is not a 3-segment JWT (segments=${parts.length})`;
    }
  }

  return NextResponse.json({
    has_service_key: has,
    key_length: key.length,
    jwt_role,
    jwt_ref,
    jwt_decode_error,
    vercel_env: process.env.VERCEL_ENV ?? null,
    vercel_url: process.env.VERCEL_URL ?? null,
  });
}
