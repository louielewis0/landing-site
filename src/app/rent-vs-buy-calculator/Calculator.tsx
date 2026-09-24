"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, num, monthlyPI } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* Rent vs. buy — finds the break-even year where buying's net cost
   (after recovering equity + appreciation at sale) drops below the
   cumulative cost of renting. */

export default function Calculator() {
  const [rent, setRent] = useState("1800");
  const [rentGrowth, setRentGrowth] = useState("3");
  const [price, setPrice] = useState("300000");
  const [downPct, setDownPct] = useState("10");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [taxRate, setTaxRate] = useState("1.3");
  const [insurance, setInsurance] = useState("2300");
  const [maintPct, setMaintPct] = useState("1");
  const [appreciation, setAppreciation] = useState("3");
  const [years, setYears] = useState("7");

  const purchase = num(price);
  const down = (purchase * num(downPct)) / 100;
  const loan = purchase - down;
  const rMo = num(rate) / 100 / 12;
  const nMo = num(term) * 12;
  const pi = monthlyPI(loan, num(rate), num(term));
  const annualPI = pi * 12;
  const annualTax = (purchase * num(taxRate)) / 100;
  const annualMaint = (purchase * num(maintPct)) / 100;
  const annualIns = num(insurance);
  const SELL_COST = 0.08; // commission + transfer + title on exit

  function balanceAfter(monthsElapsed: number) {
    if (loan <= 0) return 0;
    if (rMo === 0) return Math.max(0, loan - (loan / nMo) * monthsElapsed);
    const bal = loan * ((Math.pow(1 + rMo, nMo) - Math.pow(1 + rMo, monthsElapsed)) / (Math.pow(1 + rMo, nMo) - 1));
    return Math.max(0, bal);
  }

  // Walk year by year to find the crossover.
  let cumRent = 0;
  let cumOwnOut = down;
  let crossover = 0;
  const horizon = Math.min(30, Math.max(1, Math.round(num(term))));
  for (let y = 1; y <= horizon; y++) {
    cumRent += num(rent) * 12 * Math.pow(1 + num(rentGrowth) / 100, y - 1);
    cumOwnOut += annualPI + annualTax + annualIns + annualMaint;
    const homeValue = purchase * Math.pow(1 + num(appreciation) / 100, y);
    const netSale = homeValue * (1 - SELL_COST) - balanceAfter(y * 12);
    const ownNetCost = cumOwnOut - netSale;
    if (crossover === 0 && ownNetCost <= cumRent) crossover = y;
  }

  // Totals at the user's chosen horizon.
  const hz = Math.min(horizon, Math.max(1, Math.round(num(years))));
  let rentTotal = 0;
  let ownOut = down;
  for (let y = 1; y <= hz; y++) {
    rentTotal += num(rent) * 12 * Math.pow(1 + num(rentGrowth) / 100, y - 1);
    ownOut += annualPI + annualTax + annualIns + annualMaint;
  }
  const homeValueHz = purchase * Math.pow(1 + num(appreciation) / 100, hz);
  const netSaleHz = homeValueHz * (1 - SELL_COST) - balanceAfter(hz * 12);
  const ownNetHz = ownOut - netSaleHz;
  const buyingSaves = rentTotal - ownNetHz; // positive → buying cheaper

  const context = `Rent vs buy: ${fmtUSD(num(rent))}/mo rent vs ${fmtUSD(purchase)} home. Break-even year ${
    crossover || ">" + horizon
  }; over ${hz} yrs buying ${buyingSaves >= 0 ? "saves" : "costs"} ${fmtUSD(Math.abs(buyingSaves))}.`;

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>Your situation</div>
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Current rent / mo" value={rent} onChange={setRent} prefix="$" />
            <Field label="Rent growth / yr" value={rentGrowth} onChange={setRentGrowth} suffix="%" />
          </div>
          <Field label="Home price you'd buy" value={price} onChange={setPrice} prefix="$" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Down payment" value={downPct} onChange={setDownPct} suffix="%" />
            <Field label="Interest rate" value={rate} onChange={setRate} suffix="%" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Loan term" value={term} onChange={setTerm} suffix="yrs" />
            <Field label="Property tax / yr" value={taxRate} onChange={setTaxRate} suffix="%" hint="~1.2–1.5% in Metro Detroit." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Insurance / yr" value={insurance} onChange={setInsurance} prefix="$" />
            <Field label="Maintenance / yr" value={maintPct} onChange={setMaintPct} suffix="%" hint="% of home value." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Home appreciation / yr" value={appreciation} onChange={setAppreciation} suffix="%" />
            <Field label="Years you'll stay" value={years} onChange={setYears} suffix="yrs" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>Break-even</div>
          {crossover > 0 ? (
            <>
              <div style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--navy)", lineHeight: 1.1 }}>
                Buying wins after {crossover} {crossover === 1 ? "year" : "years"}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginTop: 8 }}>
                Stay longer than {crossover} {crossover === 1 ? "year" : "years"} and buying beats renting once you count the
                equity and appreciation you recover when you sell.
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.15 }}>
                Renting stays cheaper within {horizon} years
              </div>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginTop: 8 }}>
                With these inputs, buying doesn&rsquo;t pull ahead over the horizon shown — usually a sign of a short stay,
                high price-to-rent ratio, or low appreciation. Adjust the numbers to test other scenarios.
              </p>
            </>
          )}

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 4 }}>
              Over your {hz}-year stay:
            </div>
            <Row label="Total cost of renting" value={fmtUSD(rentTotal)} />
            <Row label="Net cost of buying (after sale)" value={fmtUSD(ownNetHz)} />
            <Row
              label={buyingSaves >= 0 ? "Buying saves you" : "Buying costs you more"}
              value={fmtUSD(Math.abs(buyingSaves))}
              strong
            />
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only. &ldquo;Net cost of buying&rdquo; assumes you sell at the end and recover equity plus appreciation,
            less ~8% selling costs. It doesn&rsquo;t model tax deductions or investing your down payment elsewhere. Not
            financial advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-rent-vs-buy"
          intent="buy"
          heading="Get your first-time buyer roadmap"
          subhead="If buying wins for you, we'll send a step-by-step first-time buyer roadmap, Michigan down-payment-assistance options you may qualify for, and homes in your range. No pressure, no obligation."
          cta="Send me the roadmap →"
          context={context}
          successNote="Got it. We'll send your first-time buyer roadmap and assistance options you may qualify for."
        />
      </div>
    </div>
  );
}
