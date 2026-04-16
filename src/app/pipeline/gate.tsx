"use client";

import { useState } from "react";
import PipelineDashboard from "./dashboard";

export default function PipelineGate() {
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

  if (unlocked) return <PipelineDashboard />;

  return (
    <div className="min-h-screen bg-[#0A1429] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Pipeline Access</h1>
        <p className="text-sm text-white/50 mb-8">Enter passcode to manage the review pipeline.</p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false); }}
          placeholder="Enter passcode"
          className={`w-full px-5 py-4 rounded-xl bg-white/5 border text-center text-white text-2xl tracking-[0.5em] placeholder-white/30 placeholder:text-base placeholder:tracking-normal focus:outline-none transition-all ${error ? "border-red-500" : "border-white/15 focus:border-orange-400"}`}
          autoFocus
        />
        {error && <p className="text-sm text-red-400 mt-3">Incorrect passcode.</p>}
        <button type="submit" className="mt-6 w-full px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_12px_40px_-12px_rgba(249,115,22,0.6)] transition-all">
          Unlock
        </button>
      </form>
    </div>
  );
}
