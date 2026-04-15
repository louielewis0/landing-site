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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        <div>
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
            Ready when you are.
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Send a message, book a call, or just stop by the office. Whatever
            works for you.
          </p>

          <div className="space-y-3 mb-10">
            <a
              href={`tel:${company.phoneTel}`}
              className="group flex items-center gap-4 p-5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Call</div>
                <div className="text-slate-900 font-bold text-lg">{company.phone}</div>
              </div>
            </a>

            <a
              href={`mailto:${company.email}`}
              className="group flex items-center gap-4 p-5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Email</div>
                <div className="text-slate-900 font-semibold">{company.email}</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Office</div>
                <div className="text-slate-900 font-semibold">{company.address}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video shadow-sm">
            <iframe
              src={company.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${company.name} location`}
            />
          </div>
        </div>

        {status === "ok" ? (
          <div className="bg-slate-50 rounded-2xl p-12 flex flex-col items-center justify-center text-center h-fit">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Message received.</h3>
            <p className="text-slate-600">We'll be back in your inbox within the hour.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 rounded-2xl p-8 space-y-4 h-fit border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Send a message</h3>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
            />
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={5}
              className="w-full px-4 py-3.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 resize-none transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600 text-center">{err}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
