-- ─────────────────────────────────────────────────────────────────────────
--  Public walk-up feedback for /reviews — sub-5-star path.
--
--  Run in Supabase SQL Editor. Idempotent. Safe to re-run.
--
--  RLS pattern matches the rest of the CRM hardening (post-Phase 1b):
--   - anon: INSERT only. The /reviews page submits anonymous walk-up
--     ratings + comments directly through the server route, which is
--     wired to write with the anon Supabase client. The route lives
--     server-side, but RLS still gates the table — defense in depth.
--   - authenticated / PUBLIC: explicit revoke. Nothing. Reads will
--     happen later through a service-role route once the /crm/feedback
--     surface lands (fast-follow, intentionally not in this change).
--
--  Why a separate table from review_requests: review_requests is
--  admin-initiated (mom adds a row in /pipeline, sends a unique
--  /r/[id] link). public_feedback is anonymous walk-up traffic from
--  the public /reviews page. Mixing them would muddle the data model
--  and force us to either loosen review_requests' newer RLS or hand
--  back permissive anon SELECT/UPDATE. Separate table = clean lanes.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.public_feedback (
  id         uuid        primary key default gen_random_uuid(),
  rating     int         not null check (rating >= 1 and rating <= 5),
  comment    text,
  name       text,
  email      text,
  source     text        not null default 'reviews-page',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.public_feedback enable row level security;

drop policy if exists "public_feedback_insert_anon" on public.public_feedback;
create policy "public_feedback_insert_anon"
  on public.public_feedback
  for insert
  to anon, authenticated
  with check (true);

-- Strip everything else from anon / authenticated / PUBLIC, then
-- re-grant only INSERT. Same shape as crm_phase1b's leads hardening.
revoke all on public.public_feedback from public;
revoke all on public.public_feedback from authenticated;
revoke all on public.public_feedback from anon;
grant insert on public.public_feedback to anon, authenticated;

create index if not exists public_feedback_created_at_idx
  on public.public_feedback (created_at desc);
create index if not exists public_feedback_rating_idx
  on public.public_feedback (rating);

-- ─────────────────────────────────────────────────────────────────────────
-- Verification — should return a single row with cmd='INSERT'.
--   select policyname, cmd, roles from pg_policies
--     where schemaname='public' and tablename='public_feedback';
-- ─────────────────────────────────────────────────────────────────────────
