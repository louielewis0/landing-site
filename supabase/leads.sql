-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  intent text check (intent in ('buy', 'sell', 'invest', 'other')),
  message text,
  source text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "leads_insert_anon" on public.leads;

create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon, authenticated;
