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
    <div className="min-h-screen crm-mesh flex items-center justify-center px-6 relative overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm text-center crm-glass rounded-3xl px-8 py-10"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-soft)]/20 to-[var(--crm-violet,#A78BFA)]/10 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <svg
            className="w-6 h-6 text-[var(--gold-soft)]"
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
        <p className="crm-label mb-2">Internal · Private</p>
        <h1 className="text-2xl font-semibold text-[#191a1c] tracking-tight mb-2">
          CRM
        </h1>
        <p className="text-[14px] text-white/50 mb-8">
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
          className={`crm-input text-center !text-2xl tracking-[0.5em] !py-4 placeholder:!text-base placeholder:tracking-normal ${
            error ? "!border-[var(--color-crm-rose,#FB7185)]" : ""
          }`}
        />
        {error && (
          <p className="text-[13px] text-[#FB7185] mt-3">Incorrect passcode.</p>
        )}
        <button
          type="submit"
          disabled={submitting || !code.trim()}
          className="crm-btn crm-btn-primary mt-6 w-full !py-3.5 text-[14px]"
        >
          {submitting ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
