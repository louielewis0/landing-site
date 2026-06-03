-- ─────────────────────────────────────────────────────────────────────────
--  Migration: add address column for manual leads (FSBO / Expired / Circle
--             Prospect / Geographic Farm) where the address is the lead
--             identifier.
--
--  Run in Supabase SQL Editor. Idempotent.
-- ─────────────────────────────────────────────────────────────────────────

alter table public.leads
  add column if not exists address text;
