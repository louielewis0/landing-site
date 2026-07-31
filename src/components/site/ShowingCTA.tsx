"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Book-a-showing buttons + modal request form for a listing detail
 * page. Submits straight to the CRM (Supabase leads, source
 * "showing-request") with the property referenced in the message, so
 * it lands in /crm like every other lead. No dashes in copy.
 */
export default function ShowingCTA({
  property,
  variant = "solid",
  label = "Book a Showing",
}: {
  property: string;
  variant?: "solid" | "ghost";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [when, setWhen] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      setErr("Please add your name and an email or phone.");
      return;
    }
    setStatus("loading");
    setErr("");
    const parts = [`Showing request for ${property}.`];
    if (when.trim()) parts.push(`Preferred time: ${when.trim()}.`);
    const { error } = await supabase.from("leads").insert({
      name,
      email: email || null,
      phone: phone || null,
      message: parts.join(" "),
      intent: "buy",
      lead_type: "buyer",
      transaction_type: "buy",
      priority: "hot",
      status: "new",
      source: "showing-request",
    });
    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  return (
    <>
      <button
        type="button"
        className={variant === "solid" ? "t-pill t-pill-solid t-pill-dark" : "t-pill-ghost"}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {open && (
        <div className="t-lb sf-overlay" role="dialog" aria-label="Book a showing" onClick={() => setOpen(false)}>
          <div className="sf-card" onClick={(e) => e.stopPropagation()}>
            <button className="sf-close" aria-label="Close" onClick={() => setOpen(false)}>
              &times;
            </button>
            {status === "ok" ? (
              <div className="sf-done">
                <div className="sf-check" aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>You&rsquo;re on the calendar list.</h3>
                <p>
                  A licensed broker will reach out shortly to lock in a time for{" "}
                  {property}. Talk soon.
                </p>
              </div>
            ) : (
              <>
                <div className="t-eyebrow" style={{ marginBottom: 10 }}>
                  Book a showing
                </div>
                <h3 className="sf-title">{property}</h3>
                <p className="sf-sub">
                  Tell us who you are and when works. A licensed broker confirms
                  your time personally.
                </p>
                <form onSubmit={submit} className="sf-form">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="email" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" type="tel" autoComplete="tel" />
                  <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Preferred day / time (e.g. Sat afternoon)" />
                  {err && <p className="sf-err">{err}</p>}
                  <button type="submit" className="t-pill t-pill-solid t-pill-dark" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Request my showing"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
