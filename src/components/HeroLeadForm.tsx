"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Intent = "buy" | "sell" | "invest" | "other";

export default function HeroLeadForm({ source = "hero" }: { source?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState<Intent>("buy");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase
      .from("leads")
      .insert({ name, email, phone, intent, source });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ok");
    setMessage("We've got your info. Expect a call within the hour.");
    setName("");
    setEmail("");
    setPhone("");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-10 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] border border-white/40">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center tracking-tight">
          Request received.
        </h3>
        <p className="text-slate-600 text-center">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-7 sm:p-8 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] border border-white/40 space-y-4"
    >
      <div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Let's talk.
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          No pressure, no spam. A real person will reach out.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {([
          ["buy", "Buy"],
          ["sell", "Sell"],
          ["invest", "Invest"],
          ["other", "Other"],
        ] as [Intent, string][]).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setIntent(val)}
            className={`py-2.5 text-sm font-semibold rounded-lg border transition-all ${
              intent === val
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="w-full px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base shadow-[0_10px_30px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_10px_30px_-5px_rgba(249,115,22,0.8)] transition-all disabled:opacity-60 disabled:shadow-none"
      >
        {status === "loading" ? "Sending…" : "Request a callback →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 text-center">{message}</p>
      )}

      <p className="text-xs text-slate-500 text-center pt-1">
        Your info stays with us. Never shared, never sold.
      </p>
    </form>
  );
}
