"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, fmtPct, num } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* Michigan home-sale net-proceeds calculator.
   Verified MI figures: transfer tax 0.86% (seller-paid, statewide),
   owner's title policy customarily seller-paid (~0.75% default),
   commission 5-6% typical and negotiable (user-editable). */

const TRANSFER_TAX_RATE = 0.0086; // 0.75% state + 0.11% county, seller-paid

export default function Calculator() {
  const [price, setPrice] = useState("400000");
  const [payoff, setPayoff] = useState("220000");
  const [commission, setCommission] = useState("6.0");
  const [titlePct, setTitlePct] = useState("0.75");
  const [other, setOther] = useState("700");
  const [repairs, setRepairs] = useState("0");
  const [concessions, setConcessions] = useState("0");

  const salePrice = num(price);
  const commissionAmt = (salePrice * num(commission)) / 100;
  const transferTax = salePrice * TRANSFER_TAX_RATE;
  const titleAmt = (salePrice * num(titlePct)) / 100;
  const otherAmt = num(other);
  const repairsAmt = num(repairs);
  const concessionsAmt = num(concessions);
  const payoffAmt = num(payoff);

  const totalCosts = commissionAmt + transferTax + titleAmt + otherAmt + repairsAmt + concessionsAmt;
  const net = salePrice - totalCosts - payoffAmt;
  const costPct = salePrice > 0 ? (totalCosts / salePrice) * 100 : 0;

  const context = `Home sale net proceeds: sale price ${fmtUSD(salePrice)}, payoff ${fmtUSD(
    payoffAmt,
  )}, est. net ${fmtUSD(net)} (${fmtPct(costPct)} total selling cost).`;

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>Your numbers</div>
        <div style={{ display: "grid", gap: 16 }}>
          <Field label="Estimated sale price" value={price} onChange={setPrice} prefix="$" hint="Not sure? Get a free broker valuation first." />
          <Field label="Remaining mortgage balance" value={payoff} onChange={setPayoff} prefix="$" hint="What you still owe (the payoff)." />
          <Field
            label="Agent commission"
            value={commission}
            onChange={setCommission}
            suffix="%"
            hint="Typical MI range 5–6%. Fully negotiable — and post-2024, buyer-agent pay is separately negotiated."
          />
          <Field label="Owner's title insurance" value={titlePct} onChange={setTitlePct} suffix="%" hint="Customarily seller-paid in Michigan (~0.5–1%)." />
          <Field label="Other closing costs" value={other} onChange={setOther} prefix="$" hint="Settlement/closing fee, deed prep, recording (~$400–$800)." />
          <Field label="Repairs & prep" value={repairs} onChange={setRepairs} prefix="$" hint="Pre-listing repairs, staging, cleaning." />
          <Field label="Buyer concessions" value={concessions} onChange={setConcessions} prefix="$" hint="Credits you expect to offer the buyer, if any." />
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>Estimated net proceeds</div>
          <div style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--navy)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>
            {fmtUSD(net)}
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 6 }}>
            What you&rsquo;d walk away with — about {fmtPct(costPct)} of the sale price goes to selling costs (before your mortgage payoff).
          </p>

          <div style={{ marginTop: 18 }}>
            <Row label="Sale price" value={fmtUSD(salePrice)} />
            <Row label={`Agent commission (${fmtPct(num(commission))})`} value={fmtUSD(commissionAmt)} negative />
            <Row label="MI transfer tax (0.86%)" value={fmtUSD(transferTax)} negative />
            <Row label={`Owner's title insurance (${fmtPct(num(titlePct))})`} value={fmtUSD(titleAmt)} negative />
            <Row label="Other closing costs" value={fmtUSD(otherAmt)} negative />
            {repairsAmt > 0 && <Row label="Repairs & prep" value={fmtUSD(repairsAmt)} negative />}
            {concessionsAmt > 0 && <Row label="Buyer concessions" value={fmtUSD(concessionsAmt)} negative />}
            <Row label="Mortgage payoff" value={fmtUSD(payoffAmt)} negative />
            <Row label="Estimated net proceeds" value={fmtUSD(net)} strong />
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only — figures vary by contract and closing date. Transfer tax is fixed by Michigan statute; other
            costs are typical ranges. Not financial or tax advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-net-proceeds"
          intent="sell"
          heading="Get your exact net sheet — free"
          subhead="A local broker pressure-tests these numbers against live comps and sends an itemized net sheet for your actual home. No cost, no obligation to list."
          cta="Send me my net sheet →"
          context={context}
          successNote="We've got your numbers. A broker will send your itemized net sheet — usually within a few hours."
        />
      </div>
    </div>
  );
}
