import "server-only";

/**
 * Server-side passcode validation for /api/dashboard/* routes.
 *
 * Each route MUST call this before any service-role query executes.
 * The expected passcode lives in the DASHBOARD_PASSCODE env var (server-only).
 * Clients send the passcode via the `x-dashboard-auth` header.
 *
 * This is still passcode-grade gating, not full auth — but combined with
 * the service-role-on-server architecture, lead PII is no longer reachable
 * via the anon key. Phase 3 will replace this with Supabase Auth.
 */
export function checkDashboardAuth(req: Request): boolean {
  const expected = process.env.DASHBOARD_PASSCODE;
  if (!expected) {
    // Refuse silently if misconfigured — prevents accidentally open access.
    return false;
  }
  const provided = req.headers.get("x-dashboard-auth");
  if (!provided) return false;
  return provided === expected;
}

export const UNAUTHORIZED = { status: 401, json: { error: "Unauthorized" } } as const;
