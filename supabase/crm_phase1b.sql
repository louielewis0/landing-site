-- ─────────────────────────────────────────────────────────────────────────
--  CRM — Phase 1B (RLS tightening, run AFTER merging feat/crm-phase1)
--
--  Run in Supabase SQL Editor. Idempotent. Safe to re-run.
--
--  Prereqs:
--   - crm_phase1a.sql has been run
--   - feat/crm-phase1 has been merged to main and Vercel has deployed it
--   - Production /dashboard is confirmed loading leads via the new
--     /api/dashboard/* routes (which use the service role key on the
--     server and bypass RLS, so they keep working after this revoke)
--
--  What this does:
--   - Drops the anon SELECT and UPDATE policies on public.leads
--   - Revokes SELECT and UPDATE on public.leads from anon
--   - Leaves leads_insert_anon and the INSERT grant intact, so the
--     public lead-capture forms (HeroLeadForm, ContactForm, LeadMagnet,
--     /leads page) continue to write leads
--
--  After this, lead PII (names, phones, emails, addresses) is no longer
--  reachable via the anon Supabase key, even in the browser.
-- ─────────────────────────────────────────────────────────────────────────

drop policy if exists "leads_select_anon" on public.leads;
drop policy if exists "leads_update_anon" on public.leads;

revoke select, update on public.leads from anon;

-- ─────────────────────────────────────────────────────────────────────────
-- Verification queries — run after the migration to confirm the end state
-- ─────────────────────────────────────────────────────────────────────────

-- Should return exactly 1 row:
--   policyname    | cmd    | roles
--   --------------+--------+------------------------
--   leads_insert_anon | INSERT | {anon, authenticated}
select policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename = 'leads'
  and 'anon' = any(roles);

-- Should return exactly 1 row:
--   privilege_type
--   --------------
--   INSERT
select privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'leads'
  and grantee = 'anon';
