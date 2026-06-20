-- ─────────────────────────────────────────────────────────────────────────
--  Make leads.email + leads.name nullable.
--
--  Why: manual /crm entry, the home-value tool, and Realcomp imports
--  all routinely have either no email OR an address-only first contact
--  (FSBO, expired, circle prospect). The original leads.sql forced
--  name + email NOT NULL because the v1 public form required both, but
--  every internal write path since then has wanted them optional.
--
--  Bug surfaced today: manual entry where the agent leaves email empty
--  was failing with
--    null value in column "email" of relation "leads" violates not-null
--  This migration is the actual fix. Adding `placeholder@…` strings or
--  silent defaults would muddle the data.
--
--  Safe: making a column nullable never invalidates existing rows.
--  Idempotent: no-op if already nullable.
-- ─────────────────────────────────────────────────────────────────────────

alter table public.leads alter column email drop not null;
alter table public.leads alter column name  drop not null;
