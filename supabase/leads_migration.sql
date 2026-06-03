-- ─────────────────────────────────────────────────────────────────────────
--  Migration: add lead-pipeline columns + DNC tracking, open up RLS for the
--             passcode-gated /dashboard to read and update.
--
--  Run this in Supabase SQL Editor (Dashboard → SQL → New query).
--  Idempotent — safe to re-run.
--
--  After this runs, the leads table will have:
--    id, name, email, phone, intent (free text), message, source, created_at,
--    status ('new' default), dnc_scrubbed (false default), do_not_call (false default)
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Drop the existing intent CHECK so we can store any string
--    (Buy/Sell/Both/Just browsing today, anything else tomorrow without a migration).
--    The constraint name follows Postgres' auto-generated pattern from leads.sql.
alter table public.leads
  drop constraint if exists leads_intent_check;

-- 2. New pipeline columns. NOT NULL with defaults so existing rows backfill cleanly.
alter table public.leads
  add column if not exists status text not null default 'new';

alter table public.leads
  add column if not exists dnc_scrubbed boolean not null default false;

alter table public.leads
  add column if not exists do_not_call boolean not null default false;

-- 3. Sanity check on status values (kept loose — easy to extend later).
alter table public.leads
  drop constraint if exists leads_status_check;
alter table public.leads
  add constraint leads_status_check
  check (status in ('new', 'attempted', 'contacted', 'dead'));

-- 4. Helpful indexes for the dashboard's filter + sort.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- 5. RLS — /dashboard uses the anon key (passcode is client-side only),
--    so anon needs SELECT and UPDATE. Threat model: anyone with the anon
--    key + table name can read/modify leads. Acceptable for this use case
--    (low-PII, small brokerage). Upgrade to Supabase Auth later if needed.
drop policy if exists "leads_select_anon" on public.leads;
create policy "leads_select_anon"
  on public.leads
  for select
  to anon, authenticated
  using (true);

drop policy if exists "leads_update_anon" on public.leads;
create policy "leads_update_anon"
  on public.leads
  for update
  to anon, authenticated
  using (true)
  with check (true);

grant select, update on public.leads to anon, authenticated;
