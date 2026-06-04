"use client";

import { createContext, useContext, useState } from "react";

/**
 * Passcode context — populated by <CrmGate> after a successful
 * unlock so pages under /crm/* can read the in-memory passcode and
 * forward it as the `x-dashboard-auth` header on every API call.
 *
 * `usePasscode()` throws if used outside the gate. Throwing is
 * intentional: every /crm consumer is inside the gate by
 * construction (the layout wraps the entire subtree), and we want
 * misuse to fail loudly during development rather than silently
 * sending empty auth headers to the service-role routes.
 */
const PasscodeContext = createContext<string | null>(null);

export function usePasscode(): string {
  const code = useContext(PasscodeContext);
  if (code === null) {
    throw new Error("usePasscode() must be called inside <CrmGate>");
  }
  return code;
}

/**
 * Passcode gate for the /crm subtree. Hoisted to
 * src/app/crm/layout.tsx so sidebar navigation between /crm,
 * /crm/pipeline, /crm/leads, and /crm/activity preserves the
 * unlocked state — layouts don't unmount on nested route changes.
 *
 * UI is intentionally identical to the legacy DashboardGate so
 * the unlock experience is unchanged. Passcode lives in component
 * state only; never written to localStorage. Closing the tab or
 * navigating away from /crm resets it.
 */
export default function CrmGate({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/dashboard/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      if (res.ok) {
        setUnlocked(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <PasscodeContext.Provider value={code}>
        {children}
      </PasscodeContext.Provider>
    );
  }

  return (
    <div className="min-h-screen atmosphere grain vignette flex items-center justify-center px-6 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-7 h-7 text-[var(--gold-soft)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <p className="eyebrow mb-3">Internal · Private</p>
        <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
          CRM
        </h1>
        <p className="text-[14px] text-bone/45 mb-10 font-light">
          Enter passcode to continue.
        </p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={8}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          placeholder="Enter passcode"
          autoFocus
          className={`w-full px-5 py-4 rounded-xl bg-bone/[0.04] backdrop-blur-xl border text-center text-bone text-2xl tracking-[0.5em] placeholder-bone/30 placeholder:text-base placeholder:tracking-normal focus:outline-none transition-all duration-500 ${
            error
              ? "border-rust"
              : "border-bone/15 focus:border-[var(--gold)]/60 focus:bg-bone/[0.07]"
          }`}
        />
        {error && (
          <p className="text-[13px] text-rust mt-3">Incorrect passcode.</p>
        )}
        <button
          type="submit"
          disabled={submitting || !code.trim()}
          className="mt-6 w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500 disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
