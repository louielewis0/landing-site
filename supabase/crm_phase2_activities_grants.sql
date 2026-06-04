-- ─────────────────────────────────────────────────────────────────────────
--  CRM — Phase 2E activities grants (service_role privileges)
--
--  Run in Supabase SQL Editor. Idempotent. Safe to re-run.
--
--  Why this file exists:
--    The Phase 2E lead-detail drawer surfaces an activity
--    timeline backed by public.activities. The
--    /api/dashboard/leads/[id]/activities routes run with the
--    service_role key. Supabase's default_privileges usually
--    auto-grant new tables to service_role, but the Phase 2A
--    leads_v case proved that not always — better to make the
--    grants explicit so a 500 doesn't ambush us in preview.
--
--  Also grants SELECT on public.agents so a future Phase 3
--  assign-to dropdown can list available agents through the
--  same service-role pipeline without another migration.
--
--  When to run:
--    BEFORE testing the Phase 2E preview's activity timeline.
--    If service_role default_privileges already cover these
--    tables, this file is a no-op + audit trail.
-- ─────────────────────────────────────────────────────────────────────────

grant select, insert, update, delete on public.activities to service_role;
grant select on public.agents to service_role;

-- ─────────────────────────────────────────────────────────────────────────
-- Verification queries
-- ─────────────────────────────────────────────────────────────────────────

-- Should return at least the four expected rows for service_role on
-- activities (SELECT, INSERT, UPDATE, DELETE).
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'activities'
  and grantee = 'service_role'
order by privilege_type;

-- Should return at least one row for service_role on agents (SELECT).
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'agents'
  and grantee = 'service_role'
order by privilege_type;
