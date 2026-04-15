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
    setMessage("Thanks! We'll be in touch within 24 hours.");
    setName("");
    setEmail("");
    setPhone("");
  }

  if (status === "ok") {
    return (
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">You're all set.</h3>
        <p className="text-slate-600 text-center">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-xl space-y-4"
    >
      <div>
        <h3 className="text-xl font-bold text-slate-900">Get Started — It's Free</h3>
        <p className="text-sm text-slate-600 mt-1">
          Tell us a bit about your goals. No spam, ever.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {([
          ["buy", "Buying"],
          ["sell", "Selling"],
          ["invest", "Investing"],
          ["other", "Other"],
        ] as [Intent, string][]).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setIntent(val)}
            className={`py-2 text-sm font-medium rounded-lg border-2 transition-all ${
              intent === val
                ? "bg-slate-900 text-white border-slate-900"
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
        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Get My Free Consultation →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 text-center">{message}</p>
      )}

      <p className="text-xs text-slate-500 text-center">
        🔒 Your info is private. We respond within 24 hours.
      </p>
    </form>
  );
}
