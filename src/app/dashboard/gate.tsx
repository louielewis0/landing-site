"use client";

import { useState } from "react";
import LeadsDashboard from "./dashboard";

/**
 * Passcode gate — matches the cinematic /scripts/gate.tsx pattern.
 *
 * Note: passcode is client-side only. Anyone who reads this JS bundle can see
 * "2003". This is UX gating, not security. The real boundary is RLS — which is
 * currently permissive (anon can SELECT/UPDATE leads). Acceptable for the
 * low-PII profile here; upgrade to Supabase Auth if that changes.
 */
export default function DashboardGate() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === "2003") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) return <LeadsDashboard />;

  return (
    <div className="min-h-screen atmosphere grain vignette flex items-center justify-center px-6 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center mx-auto mb-8">
          <svg className="w-7 h-7 text-[var(--gold-soft)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <p className="eyebrow mb-3">Internal · Private</p>
        <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">Leads Dashboard</h1>
        <p className="text-[14px] text-bone/45 mb-10 font-light">Enter passcode to continue.</p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false); }}
          placeholder="Enter passcode"
          className={`w-full px-5 py-4 rounded-xl bg-bone/[0.04] backdrop-blur-xl border text-center text-bone text-2xl tracking-[0.5em] placeholder-bone/30 placeholder:text-base placeholder:tracking-normal focus:outline-none transition-all duration-500 ${
            error ? "border-rust" : "border-bone/15 focus:border-[var(--gold)]/60 focus:bg-bone/[0.07]"
          }`}
          autoFocus
        />
        {error && <p className="text-[13px] text-rust mt-3">Incorrect passcode.</p>}
        <button
          type="submit"
          className="mt-6 w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
