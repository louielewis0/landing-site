"use client";

import type { ReactNode } from "react";

/* Shared UI + helpers for the interactive calculator tools.
   Kept deliberately small: labeled number field, currency/percent
   formatters, a safe numeric parser, and a couple of result primitives. */

export const fmtUSD = (n: number) =>
  isFinite(n) ? "$" + Math.round(n).toLocaleString("en-US") : "—";

export const fmtPct = (n: number, dp = 1) => (isFinite(n) ? n.toFixed(dp) + "%" : "—");

/** Parse a user-typed string ("$450,000", "6.0%") to a number; 0 if blank/invalid. */
export const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.\-]/g, ""));
  return isFinite(n) ? n : 0;
};

/** Standard fixed-rate monthly payment (P&I). loan, annualRate %, years. */
export function monthlyPI(loan: number, annualRatePct: number, years: number) {
  if (loan <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return loan / n;
  return (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: ReactNode;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>
        {label}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid var(--line)",
          borderRadius: 12,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {prefix && <span style={{ padding: "0 0 0 14px", color: "var(--s-muted)", fontSize: 15 }}>{prefix}</span>}
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px 14px",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--s-ink)",
            fontSize: 15,
            fontFamily: "inherit",
          }}
        />
        {suffix && <span style={{ padding: "0 14px 0 0", color: "var(--s-muted)", fontSize: 15 }}>{suffix}</span>}
      </div>
      {hint && <span style={{ display: "block", fontSize: 11.5, color: "var(--s-muted)", marginTop: 5, lineHeight: 1.5 }}>{hint}</span>}
    </label>
  );
}

/** A line in an itemized breakdown (label left, amount right). */
export function Row({
  label,
  value,
  negative,
  strong,
}: {
  label: ReactNode;
  value: string;
  negative?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        padding: "10px 0",
        borderTop: "1px solid var(--line)",
        fontSize: strong ? 15.5 : 14,
        fontWeight: strong ? 700 : 400,
        color: strong ? "var(--s-ink)" : "var(--s-muted)",
      }}
    >
      <span>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", color: negative ? "#c0392b" : undefined }}>
        {negative ? "− " : ""}
        {value}
      </span>
    </div>
  );
}

/** A single headline metric card (e.g. Cap rate 6.4%). */
export function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" | "neutral" }) {
  const color = tone === "good" ? "#1c7c4a" : tone === "bad" ? "#c0392b" : "var(--navy)";
  return (
    <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "#fff", padding: "16px 18px", textAlign: "center" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--s-muted)", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: "clamp(22px, 3.4vw, 28px)", fontWeight: 700, color, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
        {value}
      </div>
    </div>
  );
}
