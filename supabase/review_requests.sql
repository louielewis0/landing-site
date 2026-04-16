-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.review_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  service_type text default 'other'
    check (service_type in ('buy', 'sell', 'invest', 'first-time', 'relocation', 'other')),
  service_area text default 'Troy',
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'completed', 'feedback')),
  rating int check (rating >= 1 and rating <= 5),
  ai_review text,
  feedback text,
  created_at timestamptz not null default now()
);

alter table public.review_requests enable row level security;

-- Anon can insert (admin adds clients from pipeline dashboard)
create policy "rr_insert" on public.review_requests
  for insert to anon, authenticated with check (true);

-- Anon can select (pipeline reads all, client page reads by id)
create policy "rr_select" on public.review_requests
  for select to anon, authenticated using (true);

-- Anon can update (client submits rating/feedback)
create policy "rr_update" on public.review_requests
  for update to anon, authenticated using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.review_requests to anon, authenticated;
