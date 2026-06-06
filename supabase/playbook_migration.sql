-- ─────────────────────────────────────────────────────────────────────────
--  /crm Playbook tracker — two tables (completions + conversations).
--
--  Run in Supabase SQL Editor. Idempotent.
--
--  Schema:
--   - playbook_completions: one row per checked task. Static task content
--     lives in TypeScript (src/app/crm/playbook/_tasks.ts); only the
--     completed task_id + timestamp persist here.
--   - playbook_conversations: one row per "conversation started this
--     week with someone who could buy / sell / refer" (the headline KPI).
--
--  RLS: enabled with NO policies. anon and authenticated have no path in.
--  Service-role server routes (/api/dashboard/playbook/*) bypass RLS and
--  are the only way data goes in or out — same pattern as the rest of
--  /crm post crm_phase1b.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.playbook_completions (
  id           uuid        primary key default gen_random_uuid(),
  task_id      text        not null unique,
  completed_at timestamptz not null default now()
);

create table if not exists public.playbook_conversations (
  id         uuid        primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  note       text
);

create index if not exists playbook_completions_completed_at_idx
  on public.playbook_completions (completed_at desc);
create index if not exists playbook_conversations_started_at_idx
  on public.playbook_conversations (started_at desc);

-- RLS: enabled, zero policies. Only the service role (via the
-- /api/dashboard/playbook/* route handlers) can read or write.
alter table public.playbook_completions   enable row level security;
alter table public.playbook_conversations enable row level security;

-- Explicit revokes so anon / authenticated / PUBLIC have nothing.
revoke all on public.playbook_completions   from anon, authenticated, public;
revoke all on public.playbook_conversations from anon, authenticated, public;
