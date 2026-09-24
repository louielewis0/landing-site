"use client";

import { useState } from "react";
import { Field, Row, Stat, fmtUSD, fmtPct, num, monthlyPI } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* Rental property ROI / cap-rate calculator.
   Verified standard definitions:
   NOI = effective gross rent − operating expenses (EXCLUDING mortgage).
   Cap rate = NOI / purchase price.
   Cash-on-cash = annual pre-tax cash flow / total cash invested. */

export default function Calculator() {
  const [price, setPrice] = useState("250000");
  const [downPct, setDownPct] = useState("25");
  const [ratePct, setRatePct] = useState("7.0");
  const [term, setTerm] = useState("30");
  const [rent, setRent] = useState("2200");
  const [taxes, setTaxes] = useState("4200");
  const [insurance, setInsurance] = useState("1600");
  const [vacancy, setVacancy] = useState("6");
  const [maintenance, setMaintenance] = useState("8");
  const [mgmt, setMgmt] = useState("9");
  const [capex, setCapex] = useState("5");
  const [otherMo, setOtherMo] = useState("0");
  const [closing, setClosing] = useState("6000");
  const [rehab, setRehab] = useState("0");

  const purchase = num(price);
  const annualRent = num(rent) * 12;
  const vacancyLoss = (annualRent * num(vacancy)) / 100;
  const egi = annualRent - vacancyLoss; // effective gross income
  const mgmtFee = (egi * num(mgmt)) / 100;
  const maint = (annualRent * num(maintenance)) / 100;
  const capexAmt = (annualRent * num(capex)) / 100;
  const otherAnnual = num(otherMo) * 12;
  const opex = num(taxes) + num(insurance) + mgmtFee + maint + capexAmt + otherAnnual;
  const noi = egi - opex;
  const capRate = purchase > 0 ? (noi / purchase) * 100 : 0;

  const down = (purchase * num(downPct)) / 100;
  const loan = purchase - down;
  const debtService = monthlyPI(loan, num(ratePct), num(term)) * 12;
  const annualCashFlow = noi - debtService;
  const monthlyCashFlow = annualCashFlow / 12;
  const cashInvested = down + num(closing) + num(rehab);
  const coc = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
  const onePct = purchase > 0 ? (num(rent) / purchase) * 100 : 0;

  const capTone = capRate >= 6 ? "good" : capRate < 4 ? "bad" : "neutral";
  const cocTone = coc >= 8 ? "good" : coc < 0 ? "bad" : "neutral";
  const cfTone = monthlyCashFlow > 0 ? "good" : "bad";

  const context = `Rental analysis: ${fmtUSD(purchase)} price, ${fmtUSD(num(rent))}/mo rent → cap ${fmtPct(
    capRate,
  )}, cash-on-cash ${fmtPct(coc)}, ${fmtUSD(monthlyCashFlow)}/mo cash flow.`;

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>The deal</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Field label="Purchase price" value={price} onChange={setPrice} prefix="$" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Down payment" value={downPct} onChange={setDownPct} suffix="%" />
            <Field label="Loan rate" value={ratePct} onChange={setRatePct} suffix="%" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Loan term" value={term} onChange={setTerm} suffix="yrs" />
            <Field label="Gross monthly rent" value={rent} onChange={setRent} prefix="$" />
          </div>
          <div className="s-eyebrow" style={{ margin: "6px 0 0" }}>Operating expenses</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Property taxes / yr" value={taxes} onChange={setTaxes} prefix="$" hint="Non-homestead rate; often higher for rentals." />
            <Field label="Insurance / yr" value={insurance} onChange={setInsurance} prefix="$" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Vacancy" value={vacancy} onChange={setVacancy} suffix="%" hint="Typical 5–8%." />
            <Field label="Maintenance" value={maintenance} onChange={setMaintenance} suffix="%" hint="% of rent." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Property mgmt" value={mgmt} onChange={setMgmt} suffix="%" hint="Typical 8–10% of rent." />
            <Field label="CapEx reserve" value={capex} onChange={setCapex} suffix="%" hint="% of rent." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Other / mo" value={otherMo} onChange={setOtherMo} prefix="$" />
            <Field label="Closing costs" value={closing} onChange={setClosing} prefix="$" />
            <Field label="Rehab" value={rehab} onChange={setRehab} prefix="$" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Stat label="Cap rate" value={fmtPct(capRate)} tone={capTone} />
          <Stat label="Cash-on-cash" value={fmtPct(coc)} tone={cocTone} />
          <Stat label="Monthly cash flow" value={fmtUSD(monthlyCashFlow)} tone={cfTone} />
          <Stat label="Annual NOI" value={fmtUSD(noi)} tone="neutral" />
        </div>

        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 22 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>The math</div>
          <Row label="Gross annual rent" value={fmtUSD(annualRent)} />
          <Row label={`Vacancy (${fmtPct(num(vacancy))})`} value={fmtUSD(vacancyLoss)} negative />
          <Row label="Operating expenses" value={fmtUSD(opex)} negative />
          <Row label="Net operating income (NOI)" value={fmtUSD(noi)} strong />
          <Row label="Debt service (mortgage)" value={fmtUSD(debtService)} negative />
          <Row label="Annual cash flow" value={fmtUSD(annualCashFlow)} strong />
          <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 12, background: onePct >= 1 ? "rgba(28,124,74,0.08)" : "rgba(192,57,43,0.06)", border: `1px solid ${onePct >= 1 ? "rgba(28,124,74,0.3)" : "rgba(192,57,43,0.25)"}`, fontSize: 13, color: "var(--s-ink)" }}>
            <strong>1% rule:</strong> monthly rent is {fmtPct(onePct, 2)} of purchase price.{" "}
            {onePct >= 1 ? "Meets the 1% screening rule." : "Below the 1% rule — common in appreciating metros; look at total return, not just cash flow."}
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only. Cap rate and cash-on-cash use standard definitions (NOI excludes the mortgage). Assumptions like
            vacancy, maintenance, and management are industry rules of thumb — verify locally. Not investment advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-rental-roi"
          intent="invest"
          heading="Get Metro Detroit deals that hit these numbers"
          subhead="Tell us your target returns and we'll send cash-flowing properties that match — plus have a broker underwrite your next deal. We also manage rentals if you'd rather stay hands-off."
          cta="Send me matching deals →"
          context={context}
          successNote="Got it. We'll send investment properties that fit your criteria — and can underwrite any specific deal you're weighing."
        />
      </div>
    </div>
  );
}
