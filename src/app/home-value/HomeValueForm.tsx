"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Multi-step seller-lead capture for /home-value.
 *
 * Architecture notes:
 * - Single client component, three steps held in `step` state.
 * - Submits via the existing anon Supabase client. Anon RLS on
 *   public.leads allows INSERT only (post crm_phase1b.sql); reads/edits
 *   happen in /crm under the service-role route handlers, so this
 *   stays a pure write path.
 * - Source convention (kebab-case, stable forever): "home-valuation-tool".
 *   lead_type = "Inbound" (prospecting strategy axis).
 *   intent = "sell" (this tool is seller-only).
 *   status/dnc_scrubbed/priority/do_not_call fall through to column
 *   defaults — don't fight the DB defaults from the client.
 * - No fake AVM. The success state is honest: confirms a human broker
 *   will follow up within 24 hours. We do not fabricate a dollar figure.
 */

type Step = 1 | 2 | 3;

type FormState = {
  // Step 1 — address (all required)
  street: string;
  city: string;
  state: string;
  zip: string;
  // Step 2 — home details (all optional)
  beds: string;
  baths: string;
  sqft: string;
  yearBuilt: string;
  // Step 3 — contact (all required, this is the gate)
  name: string;
  email: string;
  phone: string;
};

const INITIAL: FormState = {
  street: "",
  city: "",
  state: "MI",
  zip: "",
  beds: "",
  baths: "",
  sqft: "",
  yearBuilt: "",
  name: "",
  email: "",
  phone: "",
};

export default function HomeValueForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function canAdvanceStep1() {
    return (
      form.street.trim().length > 0 &&
      form.city.trim().length > 0 &&
      form.state.trim().length > 0 &&
      /^\d{5}$/.test(form.zip.trim())
    );
  }

  function canSubmit() {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.phone.trim().length > 0
    );
  }

  function buildAddress() {
    return `${form.street.trim()}, ${form.city.trim()}, ${form.state.trim()} ${form.zip.trim()}`;
  }

  /**
   * Builds the agent-readable notes payload that lands in leads.message.
   * Optional fields are omitted entirely so the agent's view stays clean.
   */
  function buildMessage() {
    const lines: string[] = [];
    lines.push("Home valuation request");
    lines.push("");
    lines.push(`Property: ${buildAddress()}`);

    const details: string[] = [];
    if (form.beds.trim()) details.push(`Beds: ${form.beds.trim()}`);
    if (form.baths.trim()) details.push(`Baths: ${form.baths.trim()}`);
    if (form.sqft.trim()) details.push(`Square footage: ${form.sqft.trim()}`);
    if (form.yearBuilt.trim()) details.push(`Year built: ${form.yearBuilt.trim()}`);
    if (details.length) {
      lines.push("");
      lines.push("Home details:");
      details.forEach((d) => lines.push(`  • ${d}`));
    }
    lines.push("");
    lines.push("Submitted via /home-value");
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit()) return;
    setStatus("loading");
    setErr("");

    const { error } = await supabase.from("leads").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      intent: "sell",
      source: "home-valuation-tool",
      lead_type: "Inbound",
      address: buildAddress(),
      message: buildMessage(),
      // status, dnc_scrubbed, priority, do_not_call → column defaults
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  /* ── Success state ────────────────────────────────────────────────── */
  if (status === "ok") {
    return (
      <div className="relative rounded-2xl p-10 sm:p-12 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] text-center">
        <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
        <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-soft)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="eyebrow mb-3">Request received</p>
        <h3 className="font-display text-3xl sm:text-4xl font-light text-bone mb-4 tracking-tight">
          Thanks, {form.name.split(" ")[0] || "there"}.
        </h3>
        <p className="text-bone/70 text-[15px] sm:text-base font-light leading-relaxed max-w-md mx-auto">
          Based on current <span className="text-bone">{form.city}</span> market activity,
          one of our local agents will send your personalized home valuation within{" "}
          <span className="text-[var(--gold-soft)]">24 hours</span>.
        </p>
        <p className="text-[12.5px] text-bone/45 mt-6 font-light">
          No algorithm guesswork — a real broker will review your property and reach out.
        </p>
      </div>
    );
  }

  /* ── Form (steps 1–3) ─────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl p-7 sm:p-9 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] space-y-6"
    >
      <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      {/* Header + progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow">Step {step} of 3</p>
          <p className="text-[11px] text-bone/45 tracking-[0.18em] uppercase">
            {step === 1 && "Property"}
            {step === 2 && "Home details"}
            {step === 3 && "Your info"}
          </p>
        </div>
        <div className="flex gap-1.5">
          {([1, 2, 3] as const).map((n) => (
            <span
              key={n}
              className={`block h-[3px] flex-1 rounded-full transition-all duration-500 ${
                n <= step ? "bg-[var(--gold)]" : "bg-bone/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1 — Address */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-bone tracking-tight">
              Where&rsquo;s the property?
            </h3>
            <p className="text-[13.5px] text-bone/55 mt-2 font-light">
              We&rsquo;ll pull comps from the last 90 days on your street.
            </p>
          </div>

          <input
            type="text"
            required
            value={form.street}
            onChange={(e) => update("street", e.target.value)}
            placeholder="Street address"
            autoComplete="street-address"
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3">
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="City"
              autoComplete="address-level2"
              className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
            <input
              type="text"
              required
              maxLength={2}
              value={form.state}
              onChange={(e) => update("state", e.target.value.toUpperCase())}
              placeholder="State"
              autoComplete="address-level1"
              className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all w-full sm:w-20 text-center uppercase"
            />
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              value={form.zip}
              onChange={(e) => update("zip", e.target.value.replace(/\D/g, ""))}
              placeholder="ZIP"
              autoComplete="postal-code"
              className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all w-full sm:w-28 text-center"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canAdvanceStep1()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500 disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Home details (optional) */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-bone tracking-tight">
              A few quick details.
            </h3>
            <p className="text-[13.5px] text-bone/55 mt-2 font-light">
              All optional — helps the broker give you a more accurate number. Skip
              anything you&rsquo;d rather not say.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-1.5">
                Beds
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={20}
                value={form.beds}
                onChange={(e) => update("beds", e.target.value)}
                placeholder="3"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-1.5">
                Baths
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                min={0}
                max={20}
                value={form.baths}
                onChange={(e) => update("baths", e.target.value)}
                placeholder="2"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-1.5">
                Square footage
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={form.sqft}
                onChange={(e) => update("sqft", e.target.value)}
                placeholder="2,000"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] text-bone/45 uppercase tracking-[0.22em] mb-1.5">
                Year built
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={1800}
                max={new Date().getFullYear() + 1}
                value={form.yearBuilt}
                onChange={(e) => update("yearBuilt", e.target.value)}
                placeholder="1995"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[13px] text-bone/55 hover:text-bone transition-colors tracking-wide"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Contact */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-bone tracking-tight">
              Where should we send it?
            </h3>
            <p className="text-[13.5px] text-bone/55 mt-2 font-light">
              A real broker reaches out — usually within the hour.
            </p>
          </div>

          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
          />
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone"
            autoComplete="tel"
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
          />

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={status === "loading"}
              className="text-[13px] text-bone/55 hover:text-bone transition-colors tracking-wide disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={status === "loading" || !canSubmit()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Get my valuation →"}
            </button>
          </div>

          {status === "error" && (
            <p className="text-sm text-rust text-center">{err}</p>
          )}

          <p className="text-[11px] text-bone/40 text-center pt-1 tracking-wide">
            Your info stays with us. Never shared, never sold.
          </p>
        </div>
      )}
    </form>
  );
}
