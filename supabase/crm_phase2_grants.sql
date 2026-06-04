-- ─────────────────────────────────────────────────────────────────────────
--  CRM — Phase 2 grants (service_role privileges on leads_v)
--
--  Run in Supabase SQL Editor. Idempotent. Safe to re-run.
--
--  Why this file exists:
--    The Phase 2A GET /api/dashboard/leads route reads from
--    public.leads_v (the computed-flags view from Phase 1A). That
--    route runs with the service_role key. Supabase's
--    default_privileges typically auto-grant service_role on
--    objects created in the public schema, so this grant may
--    already be in place. We make it explicit here so there's an
--    authoritative repo-tracked record that the dashboard's
--    service-role API route has the privilege it needs, and so
--    future migrations that accidentally revoke broadly can be
--    caught and fixed without breaking the dashboard.
--
--  When to run:
--    EITHER on the first curl-against-preview that surfaces a
--    "permission denied for view leads_v" error from the
--    /api/dashboard/leads route. OR proactively before Phase 2B
--    if you want explicit-grant documentation in place from the
--    start. Both are safe.
-- ─────────────────────────────────────────────────────────────────────────

grant select on public.leads_v to service_role;

-- ─────────────────────────────────────────────────────────────────────────
-- Verification queries
-- ─────────────────────────────────────────────────────────────────────────

-- 1) Confirms service_role has SELECT on leads_v. Should return
--    exactly one row: { service_role, SELECT }. If empty, the
--    grant above didn't apply (very unlikely — would suggest a
--    Postgres role configuration issue).
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'leads_v'
  and grantee = 'service_role';

-- 2) Audit the full grant set on leads_v. Expected end state:
--      authenticated  | SELECT
--      service_role   | SELECT
--    NOTHING for anon or PUBLIC. If anything else appears,
--    investigate before treating the view as Apple-defensible.
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'leads_v'
order by grantee, privilege_type;
