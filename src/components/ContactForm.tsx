"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { company } from "@/lib/config";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
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
      message,
      intent: "other",
      source: "contact-form",
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  return (
    <section id="contact" className="relative py-32 bg-ink-2 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,162,76,0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-[4rem] font-light text-bone leading-[1.04] mb-6">
            <span className="block">Ready</span>
            <span className="block italic gold-text">when you are.</span>
          </h2>
          <p className="text-[17px] text-bone/55 mb-12 max-w-md leading-relaxed font-light">
            Send a message, book a call, or just stop by the office.
            Whatever works for you.
          </p>

          <div className="space-y-3 mb-12">
            <ContactRow
              href={`tel:${company.phoneTel}`}
              label="Call"
              value={company.phone}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              }
            />
            <ContactRow
              href={`mailto:${company.email}`}
              label="Email"
              value={company.email}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />
            <ContactRow
              label="Office"
              value={company.address}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-bone/10 aspect-video shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <iframe
              src={company.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${company.name} location`}
            />
          </div>
        </div>

        {status === "ok" ? (
          <div className="rounded-2xl p-12 flex flex-col items-center justify-center text-center h-fit bg-bone/[0.04] border border-bone/15">
            <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-soft)] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-3xl font-light text-bone mb-2">Message received.</h3>
            <p className="text-bone/55 text-[15px]">We'll be back in your inbox within the hour.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl p-9 bg-bone/[0.04] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] space-y-4 h-fit"
          >
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
            <div className="mb-2">
              <p className="eyebrow mb-3">Send a message</p>
              <h3 className="font-display text-3xl font-light text-bone">
                We'll be in touch.
              </h3>
            </div>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={5}
              className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-none transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-400 disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-rust text-center">{err}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function ContactRow({
  href,
  label,
  value,
  icon,
}: {
  href?: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  const className =
    "group flex items-center gap-4 p-5 rounded-xl bg-bone/[0.03] hover:bg-bone/[0.06] border border-bone/10 hover:border-[var(--gold)]/30 transition-all duration-500";
  const inner = (
    <>
      <div className="w-11 h-11 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 text-[var(--gold-soft)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-bone/40 uppercase font-medium tracking-[0.22em]">{label}</div>
        <div className="text-bone font-medium text-[15px] mt-0.5">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} className={className}>{inner}</a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
