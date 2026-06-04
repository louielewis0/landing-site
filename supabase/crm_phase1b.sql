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
--   - Revokes EVERY table privilege on public.leads from anon AND
--     PUBLIC (broader than just SELECT/UPDATE — strips DELETE,
--     TRUNCATE, REFERENCES, TRIGGER too)
--   - Re-grants ONLY INSERT to anon so the public lead-capture
--     forms (HeroLeadForm, ContactForm, LeadMagnet, /leads page)
--     continue to write leads
--   - Leaves leads_insert_anon RLS policy intact (untouched)
--
--  After this, lead PII (names, phones, emails, addresses) is no
--  longer reachable via the anon Supabase key, even in the browser,
--  and anon cannot DELETE or TRUNCATE the leads table either.
--
--  Why revoke from PUBLIC too: the initial 1B run found anon had
--  DELETE / TRUNCATE / REFERENCES / TRIGGER as DIRECT grants
--  (information_schema.role_table_grants records the direct
--  grantee, not role-membership inheritance — a GRANT TO PUBLIC
--  shows with grantee='PUBLIC', not duplicated onto each role).
--  Revoking from PUBLIC alongside anon is defense-in-depth — it
--  forecloses any future migration that accidentally GRANTs to
--  PUBLIC from leaking through to anon via role inheritance.
-- ─────────────────────────────────────────────────────────────────────────

drop policy if exists "leads_select_anon" on public.leads;
drop policy if exists "leads_update_anon" on public.leads;

-- Strip every table privilege on public.leads from anon AND PUBLIC.
revoke all on public.leads from anon;
revoke all on public.leads from public;

-- Restore INSERT only. RLS policy leads_insert_anon continues to
-- gate the actual INSERT rows — RLS is consulted only AFTER the
-- table-level privilege passes, so both the table grant here AND
-- the policy are needed for capture forms to work.
grant insert on public.leads to anon;

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

-- Should return ZERO rows. If anything comes back, a previous
-- migration (or a future one) granted to PUBLIC on public.leads —
-- investigate before considering this migration complete, since
-- PUBLIC grants would leak to anon through role membership.
select privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'leads'
  and grantee = 'PUBLIC';
