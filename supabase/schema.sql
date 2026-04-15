-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow anonymous visitors to INSERT their email, but not read/update/delete.
create policy "anyone can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
