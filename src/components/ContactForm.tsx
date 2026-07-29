"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { company } from "@/lib/config";

/**
 * Contact section — prototype #contact treatment: navy section,
 * contact rows + map left, glass form card right. Submission logic
 * unchanged (Supabase leads insert, source "contact-form").
 */
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
    <section id="contact" className="contact-sec">
      <div className="container contact-grid">
        <div className="reveal">
          <div className="sec-head" style={{ marginBottom: 30 }}>
            <div className="s-eyebrow">Contact</div>
            <h2>Ready when you are.</h2>
            <p>
              Send a message, book a call, or just stop by the office. Whatever
              works for you.
            </p>
          </div>
          <ul className="contact-list">
            <li>
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
                </svg>
              </div>
              <div>
                <small>Call</small>
                <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
              </div>
            </li>
            <li>
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" />
                  <path d="m4 6 8 7 8-7" />
                </svg>
              </div>
              <div>
                <small>Email</small>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </li>
            <li>
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="11" r="2.4" />
                </svg>
              </div>
              <div>
                <small>Office</small>
                {company.address}
              </div>
            </li>
          </ul>
          <div className="map-frame">
            <iframe
              src={company.googleMapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${company.name} location`}
            />
          </div>
        </div>

        {status === "ok" ? (
          <div className="contact-form-card reveal" style={{ textAlign: "center", height: "fit-content" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px solid rgba(240,161,92,0.4)",
                background: "rgba(217,118,47,0.15)",
                color: "var(--s-gold-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Message received.</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              We&rsquo;ll be back in your inbox within the hour.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-card reveal" style={{ height: "fit-content" }}>
            <h3>Tell us your move.</h3>
            <div className="form-row">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
              />
            </div>
            <div className="form-row" style={{ gridTemplateColumns: "1fr" }}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={5}
              style={{ marginBottom: 18 }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-gold"
              style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.6 : 1 }}
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <p style={{ color: "#fca5a5", fontSize: 13, textAlign: "center", marginTop: 10 }}>{err}</p>
            )}
            <p className="form-note">Your info stays with us. Never shared, never sold.</p>
          </form>
        )}
      </div>
    </section>
  );
}
