-- ─────────────────────────────────────────────────────────────────────────
--  CRM — Phase 1 (Path C)
--
--  Run in Supabase SQL Editor. Idempotent. Safe to re-run.
--
--  What this does:
--   - Extends public.leads with CRM columns (additive: new columns are
--     nullable or have defaults; no row data is rewritten)
--   - Widens leads.status CHECK to allow old + new vocab side-by-side
--   - Adds public.agents (keyed to auth.users) and public.activities
--   - Adds public.leads_v view that normalizes status for the CRM
--   - Strict RLS on new tables (agents, activities)
--   - **Tightens leads RLS: anon → INSERT-only (no SELECT, no UPDATE).**
--     /dashboard now goes through /api/dashboard/* server routes that use
--     the service role key. Public form inserts continue to work via
--     leads_insert_anon.
--
--  Sequencing recommendation (no temporary breakage):
--   1. Confirm the new code on the feat/crm-phase1 preview deployment
--      reads/writes leads via the /api/dashboard/* routes correctly.
--   2. Merge feat/crm-phase1 to main. Production /dashboard now uses
--      the new routes (still tolerates anon SELECT/UPDATE since that's
--      not yet revoked).
--   3. Run THIS SQL. Anon SELECT/UPDATE on leads is revoked. /dashboard
--      keeps working because routes use service role and bypass RLS.
--      Public form INSERTs keep working via leads_insert_anon.
-- ─────────────────────────────────────────────────────────────────────────

-- 1 ─ Shared trigger function for auto-updated_at columns
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2 ─ Extend public.leads — additive only
alter table public.leads
  add column if not exists updated_at       timestamptz not null default now(),
  add column if not exists lead_type        text,
  add column if not exists property_type    text,
  add column if not exists transaction_type text,
  add column if not exists budget_range     text,
  add column if not exists priority         text not null default 'warm',
  add column if not exists follow_up_date   date,
  add column if not exists assigned_to      uuid,
  add column if not exists lost_reason      text;

-- 3 ─ Widen status CHECK to allow OLD + NEW vocabularies side-by-side.
--     Zero row rewrite — existing 'new'/'attempted'/'contacted'/'dead'
--     rows already satisfy this wider constraint.
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add  constraint leads_status_check
  check (status in (
    'new', 'attempted', 'contacted',                  -- legacy + shared
    'qualified', 'showing', 'negotiating',            -- new
    'closed_won', 'closed_lost',                      -- new terminal
    'dead'                                            -- legacy terminal
  ));

-- 4 ─ priority CHECK (new column, default 'warm' passes)
alter table public.leads drop constraint if exists leads_priority_check;
alter table public.leads add  constraint leads_priority_check
  check (priority in ('hot', 'warm', 'cold'));

-- 5 ─ property_type CHECK (extended: residential + commercial + mixed)
alter table public.leads drop constraint if exists leads_property_type_check;
alter table public.leads add  constraint leads_property_type_check
  check (property_type is null or property_type in (
    'single_family', 'condo', 'townhouse', 'multifamily', 'land',
    'office', 'retail', 'industrial', 'mixed_use', 'other'
  ));

-- 6 ─ transaction_type CHECK
alter table public.leads drop constraint if exists leads_transaction_type_check;
alter table public.leads add  constraint leads_transaction_type_check
  check (transaction_type is null or transaction_type in ('buy','sell','lease'));

-- 7 ─ source stays as free text. No CHECK added; existing values
--     ('hero','leads-page','FSBO','Expired',…) remain valid.
--     New code writes the channel enum (website/meta/google/call/
--     referral/walk-in/other). Convention enforced in app code.

-- 8 ─ updated_at trigger on leads
drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- 9 ─ Mapping view: canonical_status + pipeline_stage grouping.
--     The CRM (Phase 4+) queries leads_v for uniform shape.
--     /dashboard queries public.leads directly via the route handlers.
create or replace view public.leads_v as
select
  l.*,
  case l.status
    when 'attempted' then 'contacted'
    when 'dead'      then 'closed_lost'
    else l.status
  end as canonical_status,
  case
    when l.status = 'new'                          then 'open'
    when l.status in ('attempted','contacted')     then 'engaging'
    when l.status in ('qualified','showing')       then 'active'
    when l.status = 'negotiating'                  then 'negotiating'
    when l.status = 'closed_won'                   then 'won'
    when l.status in ('dead','closed_lost')        then 'lost'
  end as pipeline_stage,
  (l.status not in ('dead','closed_lost','closed_won'))                    as is_active,
  (l.priority = 'hot'
    and l.status not in ('dead','closed_lost','closed_won'))               as is_hot_active,
  (l.follow_up_date is not null
    and l.follow_up_date < current_date
    and l.status not in ('dead','closed_lost','closed_won'))               as is_overdue_followup
from public.leads l;

-- View permissions: only authenticated reads. Anon doesn't need leads_v.
revoke all on public.leads_v from anon;
grant select on public.leads_v to authenticated;

-- 10 ─ agents — keyed to auth.users (rows populated in Phase 3 by signups)
create table if not exists public.agents (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  email       text not null unique,
  role        text not null default 'agent' check (role in ('admin','agent')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_agents_updated_at on public.agents;
create trigger trg_agents_updated_at
  before update on public.agents
  for each row execute function public.set_updated_at();

-- Now that agents exists, attach the FK from leads.assigned_to.
alter table public.leads drop constraint if exists leads_assigned_to_fkey;
alter table public.leads add  constraint leads_assigned_to_fkey
  foreign key (assigned_to) references public.agents(id) on delete set null;

-- 11 ─ activities — per-lead touch timeline
create table if not exists public.activities (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  type        text not null check (type in ('call','email','text','meeting','note')),
  body        text,
  created_by  uuid references public.agents(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- 12 ─ Indexes
create index if not exists leads_assigned_to_idx     on public.leads (assigned_to);
create index if not exists leads_follow_up_date_idx  on public.leads (follow_up_date)
  where follow_up_date is not null;
create index if not exists leads_priority_idx        on public.leads (priority);
create index if not exists leads_status_priority_idx on public.leads (status, priority);
create index if not exists leads_source_idx          on public.leads (source);
create index if not exists leads_lead_type_idx       on public.leads (lead_type);
create index if not exists activities_lead_id_idx    on public.activities (lead_id, created_at desc);
create index if not exists activities_type_idx       on public.activities (type);

-- 13 ─ RLS on NEW tables — strict from day one
alter table public.agents     enable row level security;
alter table public.activities enable row level security;

drop policy if exists "agents_select_auth" on public.agents;
create policy "agents_select_auth" on public.agents
  for select to authenticated using (true);

drop policy if exists "activities_select_auth" on public.activities;
create policy "activities_select_auth" on public.activities
  for select to authenticated using (true);

drop policy if exists "activities_insert_auth" on public.activities;
create policy "activities_insert_auth" on public.activities
  for insert to authenticated with check (true);

drop policy if exists "activities_update_auth" on public.activities;
create policy "activities_update_auth" on public.activities
  for update to authenticated using (true) with check (true);

drop policy if exists "activities_delete_auth" on public.activities;
create policy "activities_delete_auth" on public.activities
  for delete to authenticated using (true);

grant select on public.agents to authenticated;
grant select, insert, update, delete on public.activities to authenticated;

-- 14 ─ Tighten leads RLS — Path C.
--     Anon retains INSERT only (public forms still work via
--     leads_insert_anon). SELECT and UPDATE are removed.
--     /dashboard's /api/dashboard/* routes use the service role key
--     server-side, which bypasses RLS, so they keep working.

drop policy if exists "leads_select_anon" on public.leads;
drop policy if exists "leads_update_anon" on public.leads;

revoke select, update on public.leads from anon;

-- Sanity: confirm the only remaining anon access to leads is INSERT.
-- Run after migration to verify:
--   select policyname, cmd, roles from pg_policies
--     where schemaname='public' and tablename='leads';
-- Expected: a single policy "leads_insert_anon" with cmd='INSERT'.
