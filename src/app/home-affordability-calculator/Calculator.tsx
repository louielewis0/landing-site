"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, fmtPct, num, monthlyPI } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* "How much house can I afford" — Metro Detroit.
   Uses the standard 28/36 DTI rule. Property tax pre-filled by county
   (verified effective rates). PMI applied when down payment < 20%. */

const COUNTIES: [string, string][] = [
  ["Oakland County", "1.23"],
  ["Macomb County", "1.28"],
  ["Wayne County", "1.51"],
  ["Other / statewide", "1.18"],
];

export default function Calculator() {
  const [income, setIncome] = useState("90000");
  const [debts, setDebts] = useState("500");
  const [down, setDown] = useState("40000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [county, setCounty] = useState("1.23");
  const [insurance, setInsurance] = useState("2300");
  const [hoa, setHoa] = useState("0");

  const monthlyIncome = num(income) / 12;
  const downAmt = num(down);
  const taxRate = num(county);
  const insMo = num(insurance) / 12;
  const hoaMo = num(hoa);

  // 28/36 rule: housing budget is the tighter of front-end and back-end caps.
  const frontCap = monthlyIncome * 0.28;
  const backCap = monthlyIncome * 0.36 - num(debts);
  const budget = Math.max(0, Math.min(frontCap, backCap));

  function pitiAt(price: number) {
    const loan = Math.max(0, price - downAmt);
    const pi = monthlyPI(loan, num(rate), num(term));
    const tax = (price * taxRate) / 100 / 12;
    const pmi = price > 0 && downAmt / price < 0.2 ? (loan * 0.005) / 12 : 0;
    return pi + tax + insMo + pmi + hoaMo;
  }

  // Binary search the max price whose PITI fits the budget.
  let lo = 0;
  let hi = 5_000_000;
  if (budget > 0) {
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (pitiAt(mid) <= budget) lo = mid;
      else hi = mid;
    }
  }
  const maxPrice = budget > 0 ? Math.round(lo / 1000) * 1000 : 0;

  const loan = Math.max(0, maxPrice - downAmt);
  const pi = monthlyPI(loan, num(rate), num(term));
  const taxMo = (maxPrice * taxRate) / 100 / 12;
  const pmiMo = maxPrice > 0 && downAmt / maxPrice < 0.2 ? (loan * 0.005) / 12 : 0;
  const totalMo = pi + taxMo + insMo + pmiMo + hoaMo;
  const housingDti = monthlyIncome > 0 ? (totalMo / monthlyIncome) * 100 : 0;
  const totalDti = monthlyIncome > 0 ? ((totalMo + num(debts)) / monthlyIncome) * 100 : 0;

  const context = `Affordability: ${fmtUSD(num(income))}/yr income, ${fmtUSD(downAmt)} down → max home ~${fmtUSD(
    maxPrice,
  )}, ~${fmtUSD(totalMo)}/mo.`;

  const selStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "#fff",
    color: "var(--s-ink)",
    fontSize: 15,
    fontFamily: "inherit",
  };

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>About you</div>
        <div style={{ display: "grid", gap: 16 }}>
          <Field label="Annual household income" value={income} onChange={setIncome} prefix="$" />
          <Field label="Monthly debt payments" value={debts} onChange={setDebts} prefix="$" hint="Car, student loans, credit cards, child support — not rent." />
          <Field label="Down payment" value={down} onChange={setDown} prefix="$" hint="Under 20% adds PMI (estimated at 0.5%/yr)." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Interest rate" value={rate} onChange={setRate} suffix="%" />
            <Field label="Loan term" value={term} onChange={setTerm} suffix="yrs" />
          </div>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>County (property tax)</span>
            <select value={county} onChange={(e) => setCounty(e.target.value)} style={selStyle}>
              {COUNTIES.map(([name, r]) => (
                <option key={name} value={r}>
                  {name} — {r}%
                </option>
              ))}
            </select>
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Home insurance / yr" value={insurance} onChange={setInsurance} prefix="$" />
            <Field label="HOA / mo" value={hoa} onChange={setHoa} prefix="$" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>You can afford up to</div>
          <div style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--navy)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>
            {fmtUSD(maxPrice)}
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 6 }}>
            {budget > 0
              ? <>at about <strong>{fmtUSD(totalMo)}/mo</strong>, using the standard 28/36 debt-to-income rule.</>
              : "Your monthly debts use up the 36% debt-to-income limit. Lowering debt or income changes this."}
          </p>

          <div style={{ marginTop: 18 }}>
            <Row label="Principal & interest" value={fmtUSD(pi)} />
            <Row label="Property tax" value={fmtUSD(taxMo)} />
            <Row label="Home insurance" value={fmtUSD(insMo)} />
            {pmiMo > 0 && <Row label="PMI (under 20% down)" value={fmtUSD(pmiMo)} />}
            {hoaMo > 0 && <Row label="HOA" value={fmtUSD(hoaMo)} />}
            <Row label="Total monthly payment" value={fmtUSD(totalMo)} strong />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", borderRadius: 12, background: "var(--cream-2)" }}>
              <div style={{ fontSize: 11, color: "var(--s-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Housing DTI</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: housingDti <= 28 ? "#1c7c4a" : "#c0392b", fontVariantNumeric: "tabular-nums" }}>{fmtPct(housingDti)}</div>
              <div style={{ fontSize: 10.5, color: "var(--s-muted)" }}>target ≤ 28%</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", borderRadius: 12, background: "var(--cream-2)" }}>
              <div style={{ fontSize: 11, color: "var(--s-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total DTI</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: totalDti <= 36 ? "#1c7c4a" : "#c0392b", fontVariantNumeric: "tabular-nums" }}>{fmtPct(totalDti)}</div>
              <div style={{ fontSize: 10.5, color: "var(--s-muted)" }}>target ≤ 36%</div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only, using the 28/36 guideline. Your real limit depends on credit, loan program, and lender — some
            approve higher DTI. Michigan property tax on a purchase can rise after closing (taxable value uncaps). Not a
            loan approval.
          </p>
        </div>

        <ToolLeadForm
          source="tool-affordability"
          intent="buy"
          heading="See homes in your budget"
          subhead="Get a curated list of Metro Detroit homes in your price range, plus an intro to a trusted lender to lock in your real number with a pre-approval. First-time buyer? We'll walk you through every step."
          cta="Send me homes in my range →"
          context={context}
          successNote="Got it. We'll send homes in your budget and can connect you with a lender to confirm your exact number."
        />
      </div>
    </div>
  );
}
