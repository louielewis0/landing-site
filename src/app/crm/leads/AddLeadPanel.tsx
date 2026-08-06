"use client";

import { useState } from "react";
import { ShieldCheck, AlertCircle, X } from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import type { Lead } from "@/lib/lead-shape";

/**
 * Manual lead entry form. Lifted from legacy
 * /dashboard/dashboard.tsx, restyled to match the v11 shell —
 * same field set + same submit semantics, no behavior change.
 *
 * Source list mirrors the legacy vocabulary so historical rows
 * (entered before 2D) stay comparable to new ones.
 *
 * On successful POST the new lead is handed up via onCreated so
 * the parent (LeadsTableClient) can prepend it to its local
 * leads array — instant feedback without re-fetching.
 */

const INTENT_OPTIONS = ["Buy", "Sell", "Both", "Just browsing"] as const;
type IntentOption = (typeof INTENT_OPTIONS)[number];

const SOURCE_OPTIONS = [
  "Website",
  "Referral",
  "Phone call",
  "Other",
] as const;
type SourceOption = (typeof SOURCE_OPTIONS)[number];

export default function AddLeadPanel({
  onCreated,
  onClose,
}: {
  onCreated: (lead: Lead) => void;
  onClose: () => void;
}) {
  const passcode = usePasscode();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [intent, setIntent] = useState<IntentOption>("Buy");
  const [source, setSource] = useState<SourceOption | "">("Website");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  function clear() {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setIntent("Buy");
    setNotes("");
    setErr(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    if (!source) {
      setErr(
        "Pick a source so cold leads are distinguishable from inbound ones.",
      );
      return;
    }
    setSaving(true);
    setErr(null);

    try {
      const data = await apiFetch<{ lead: Lead }>(passcode, "/leads", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
          intent,
          source,
          message: notes.trim(),
        }),
      });
      onCreated(data.lead);

      // Sticky source for batch entry (same pattern as legacy);
      // everything else clears.
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setIntent("Buy");
      setNotes("");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2200);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to add lead");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] p-7 mb-8">
      <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      <div className="flex items-start justify-between mb-6 gap-3">
        <div>
          <p className="crm-label text-[var(--gold-soft)] mb-2">Add lead</p>
          <h2 className="text-lg font-semibold text-[#191a1c] tracking-tight">
            Manual entry
          </h2>
          <p className="text-[13px] text-white/55 mt-2 font-light max-w-2xl">
            Enter FSBOs, expireds, circle prospects, or referrals. Source
            defaults to whatever you pick — use it to tell cold leads apart
            from inbound form leads.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/40 hover:text-white/80 transition-colors duration-200"
          aria-label="Close add-lead panel"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name *"
            autoFocus
            className="px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] transition-all"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] transition-all"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] transition-all"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Property address"
            className="px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] transition-all"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] text-white/45 uppercase tracking-[0.22em] mb-2">
              I&rsquo;m looking to
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INTENT_OPTIONS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setIntent(val)}
                  className={`py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full border transition-all duration-400 ${
                    intent === val
                      ? "bg-[var(--gold)] text-[#0A0B0F] border-[var(--gold)]"
                      : "bg-transparent text-white/65 border-white/20 hover:border-white/40 hover:text-white/90"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-white/45 uppercase tracking-[0.22em] mb-2">
              Source *
            </label>
            <select
              required
              value={source}
              onChange={(e) => setSource(e.target.value as SourceOption)}
              className="w-full px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 text-[13.5px] font-medium focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-[#12141A]">
                Choose source…
              </option>
              {SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-[#12141A]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes — listing details, prior contact, motivation, anything worth remembering"
          rows={3}
          className="w-full px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] resize-y transition-all"
        />

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[#0A0B0F] font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save lead"}
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-[12px] text-white/45 hover:text-white/70 transition-colors tracking-wide"
          >
            Clear
          </button>
          {justSaved && (
            <span className="inline-flex items-center gap-2 text-[12.5px] text-[var(--gold-soft)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
              Saved. Ready for the next one.
            </span>
          )}
        </div>

        {err && (
          <div className="text-[13px] text-[#FDA4AF] flex items-center gap-2">
            <AlertCircle className="w-4 h-4" strokeWidth={1.75} />
            {err}
          </div>
        )}
      </form>
    </section>
  );
}
