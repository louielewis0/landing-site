"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, fmtPct, num } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* 1031 exchange calculator + 45/180-day deadline tracker.
   Deferred tax = depreciation recapture (25%) + capital gains (editable
   combined fed+state rate). Full deferral requires buying equal-or-greater
   value and reinvesting all net equity. */

const RECAPTURE_RATE = 25; // federal depreciation recapture cap

function addDays(iso: string, days: number): Date | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + days);
  return d;
}
const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
function daysFromToday(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

export default function Calculator() {
  const [sale, setSale] = useState("500000");
  const [original, setOriginal] = useState("300000");
  const [improvements, setImprovements] = useState("0");
  const [depreciation, setDepreciation] = useState("60000");
  const [sellingCosts, setSellingCosts] = useState("35000");
  const [mortgage, setMortgage] = useState("180000");
  const [gainsRate, setGainsRate] = useState("20");
  const [closeDate, setCloseDate] = useState("");

  const adjBasis = num(original) + num(improvements) - num(depreciation);
  const realizedGain = Math.max(0, num(sale) - num(sellingCosts) - adjBasis);
  const recaptureTax = num(depreciation) * (RECAPTURE_RATE / 100);
  const capGain = Math.max(0, realizedGain - num(depreciation));
  const capGainTax = (capGain * num(gainsRate)) / 100;
  const totalDeferred = recaptureTax + capGainTax;

  const replacementValue = Math.max(0, num(sale) - num(sellingCosts)); // buy equal-or-greater
  const equityToReinvest = Math.max(0, num(sale) - num(sellingCosts) - num(mortgage));

  const id45 = addDays(closeDate, 45);
  const close180 = addDays(closeDate, 180);

  const context = `1031 exchange: ${fmtUSD(num(sale))} sale, ${fmtUSD(realizedGain)} realized gain → ~${fmtUSD(
    totalDeferred,
  )} tax deferred; must reinvest ${fmtUSD(equityToReinvest)} into ≥${fmtUSD(replacementValue)}.${
    closeDate ? ` Close ${closeDate}.` : ""
  }`;

  const dateInput: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "#fff",
    color: "var(--s-ink)",
    fontSize: 15,
    fontFamily: "inherit",
  };

  function DeadlineCard({ label, rule, date }: { label: string; rule: string; date: Date | null }) {
    const dleft = date ? daysFromToday(date) : null;
    const urgent = dleft !== null && dleft <= 14;
    return (
      <div style={{ flex: 1, borderRadius: 14, border: `1px solid ${urgent ? "rgba(192,57,43,0.4)" : "var(--line)"}`, background: urgent ? "rgba(192,57,43,0.05)" : "#fff", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--s-muted)" }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginTop: 3 }}>{date ? fmtDate(date) : "—"}</div>
        <div style={{ fontSize: 12, color: urgent ? "#c0392b" : "var(--s-muted)", marginTop: 2 }}>
          {dleft === null ? rule : dleft >= 0 ? `${dleft} days left · ${rule}` : `${Math.abs(dleft)} days past · ${rule}`}
        </div>
      </div>
    );
  }

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>The property you're selling</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Field label="Sale price" value={sale} onChange={setSale} prefix="$" />
          <Field label="Original purchase price" value={original} onChange={setOriginal} prefix="$" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Capital improvements" value={improvements} onChange={setImprovements} prefix="$" />
            <Field label="Depreciation taken" value={depreciation} onChange={setDepreciation} prefix="$" hint="Total claimed while owning." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Selling costs" value={sellingCosts} onChange={setSellingCosts} prefix="$" />
            <Field label="Mortgage balance" value={mortgage} onChange={setMortgage} prefix="$" />
          </div>
          <Field label="Capital gains tax rate" value={gainsRate} onChange={setGainsRate} suffix="%" hint="Combined federal + MI (4.25%). Recapture is taxed separately at 25%." />
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>Sale closing date (for deadlines)</span>
            <input type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} style={dateInput} />
          </label>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>Tax you can defer with a 1031</div>
          <div style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--navy)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>
            {fmtUSD(totalDeferred)}
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 6 }}>
            The tax you&rsquo;d owe on this sale — and keep working for you — by exchanging into a like-kind property instead of cashing out.
          </p>
          <div style={{ marginTop: 18 }}>
            <Row label="Realized capital gain" value={fmtUSD(realizedGain)} />
            <Row label={`Depreciation recapture tax (${RECAPTURE_RATE}%)`} value={fmtUSD(recaptureTax)} />
            <Row label={`Capital gains tax (${fmtPct(num(gainsRate))})`} value={fmtUSD(capGainTax)} />
            <Row label="Total tax deferred" value={fmtUSD(totalDeferred)} strong />
          </div>
        </div>

        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 22 }}>
          <div className="s-eyebrow" style={{ marginBottom: 8 }}>To fully defer, you must</div>
          <Row label="Buy a replacement worth at least" value={fmtUSD(replacementValue)} />
          <Row label="Reinvest net equity of" value={fmtUSD(equityToReinvest)} />
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <DeadlineCard label="Identify by (Day 45)" rule="name replacements" date={id45} />
            <DeadlineCard label="Close by (Day 180)" rule="finish purchase" date={close180} />
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only — a 1031 exchange has strict IRS rules and requires a Qualified Intermediary; deadlines are
            calendar days with no extensions. Confirm figures with your CPA. Not tax advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-1031"
          intent="invest"
          heading="Beat your 45-day clock"
          subhead="The identification window is brutal — 45 calendar days, no extensions. We'll line up qualifying Metro Detroit replacement properties now and coordinate with your Qualified Intermediary so you don't lose the deferral."
          cta="Find my replacement properties →"
          context={context}
          successNote="Got it. We'll start sourcing qualifying replacement properties right away — the clock matters, so expect a fast reply."
        />
      </div>
    </div>
  );
}
