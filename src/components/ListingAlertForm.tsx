"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ListingAlertForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      intent: "buy",
      source: "listings-alert",
      message: "Requested new listing alerts",
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-8 bg-white border border-slate-200 text-center h-full flex flex-col justify-center">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">You're on the list.</h3>
        <p className="text-sm text-slate-600">We'll send new Metro Detroit listings as soon as they hit.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-7 bg-gradient-to-br from-[#0A1429] to-[#111C36] text-white border border-white/10 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.3)] h-full flex flex-col"
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 self-start">
        New listings
      </div>

      <h3 className="text-2xl font-bold tracking-tight mb-2 leading-tight">
        Get New Metro Detroit Listings First.
      </h3>
      <p className="text-sm text-white/65 mb-6 leading-relaxed">
        Hot properties sell in days. Be the first to know when new homes hit the market in Troy, Rochester Hills, Birmingham, and beyond.
      </p>

      <div className="space-y-3 flex-1">
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all"
        />
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full px-6 py-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(249,115,22,0.6)] transition-all disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Me Listings →"}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-300 text-center mt-3">{err}</p>
      )}

      <p className="text-[11px] text-white/40 text-center mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
