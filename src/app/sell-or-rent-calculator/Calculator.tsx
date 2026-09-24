"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, num } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* "Should I sell or rent my house?" — compares selling now (net proceeds
   today) against renting for N years then selling (cumulative cash flow +
   equity paydown + appreciation, net of ~8% selling costs at exit). */

const SELL_COST = 0.08; // commission + transfer + title on a sale

export default function Calculator() {
  const [value, setValue] = useState("320000");
  const [balance, setBalance] = useState("160000");
  const [rate, setRate] = useState("5.0");
  const [payment, setPayment] = useState("1300");
  const [rent, setRent] = useState("2100");
  const [rentGrowth, setRentGrowth] = useState("3");
  const [taxes, setTaxes] = useState("4000");
  const [insurance, setInsurance] = useState("1800");
  const [maintPct, setMaintPct] = useState("1");
  const [vacancy, setVacancy] = useState("6");
  const [mgmt, setMgmt] = useState("9");
  const [appreciation, setAppreciation] = useState("3");
  const [years, setYears] = useState("5");

  const value0 = num(value);
  const N = Math.max(1, Math.round(num(years)));

  // Path A — sell now.
  const sellNowNet = value0 * (1 - SELL_COST) - num(balance);

  // Path B — rent N years, then sell.
  let bal = num(balance);
  const rMo = num(rate) / 100 / 12;
  let cumCash = 0;
  let firstYearCash = 0;
  for (let m = 1; m <= N * 12; m++) {
    const yr = Math.floor((m - 1) / 12);
    const rentM = num(rent) * Math.pow(1 + num(rentGrowth) / 100, yr);
    const effRent = rentM * (1 - num(vacancy) / 100);
    const mgmtFee = (effRent * num(mgmt)) / 100;
    const maint = (value0 * (num(maintPct) / 100)) / 12;
    const tax = num(taxes) / 12;
    const ins = num(insurance) / 12;
    let mort = 0;
    if (bal > 0) {
      const interest = bal * rMo;
      const principal = Math.max(0, num(payment) - interest);
      bal = Math.max(0, bal - principal);
      mort = num(payment);
    }
    const cash = effRent - mgmtFee - maint - tax - ins - mort;
    cumCash += cash;
    if (m <= 12) firstYearCash += cash;
  }
  const homeValueN = value0 * Math.pow(1 + num(appreciation) / 100, N);
  const netSaleN = homeValueN * (1 - SELL_COST) - bal;
  const rentPathTotal = cumCash + netSaleN;
  const monthlyCashFlow = firstYearCash / 12;

  const diff = rentPathTotal - sellNowNet;
  const rentWins = diff > 0;

  const context = `Sell vs rent: home ${fmtUSD(value0)}. Sell now nets ${fmtUSD(sellNowNet)}; rent ${N} yrs then sell totals ${fmtUSD(
    rentPathTotal,
  )} (${fmtUSD(monthlyCashFlow)}/mo cash flow). ${rentWins ? "Renting" : "Selling"} ahead by ${fmtUSD(Math.abs(diff))}.`;

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>Your home</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Field label="Current home value" value={value} onChange={setValue} prefix="$" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Mortgage balance" value={balance} onChange={setBalance} prefix="$" hint="0 if paid off." />
            <Field label="Mortgage rate" value={rate} onChange={setRate} suffix="%" />
          </div>
          <Field label="Monthly payment (P&I)" value={payment} onChange={setPayment} prefix="$" hint="Principal & interest only — not taxes/insurance." />
          <div className="s-eyebrow" style={{ margin: "6px 0 0" }}>If you rented it out</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Market rent / mo" value={rent} onChange={setRent} prefix="$" />
            <Field label="Rent growth / yr" value={rentGrowth} onChange={setRentGrowth} suffix="%" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Property tax / yr" value={taxes} onChange={setTaxes} prefix="$" />
            <Field label="Insurance / yr" value={insurance} onChange={setInsurance} prefix="$" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Maint / yr" value={maintPct} onChange={setMaintPct} suffix="%" hint="of value" />
            <Field label="Vacancy" value={vacancy} onChange={setVacancy} suffix="%" />
            <Field label="Mgmt" value={mgmt} onChange={setMgmt} suffix="%" hint="of rent" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Appreciation / yr" value={appreciation} onChange={setAppreciation} suffix="%" />
            <Field label="Years you'd rent" value={years} onChange={setYears} suffix="yrs" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 10 }}>The verdict</div>
          <div style={{ fontSize: "clamp(22px, 3.6vw, 30px)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.2 }}>
            {rentWins ? "Renting" : "Selling now"} comes out ahead by {fmtUSD(Math.abs(diff))}
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 8 }}>
            over your {N}-year horizon — before income taxes and the time value of money.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
            <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "var(--cream-2)", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--s-muted)" }}>Sell now</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>{fmtUSD(sellNowNet)}</div>
              <div style={{ fontSize: 11.5, color: "var(--s-muted)" }}>net in your pocket today</div>
            </div>
            <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "var(--cream-2)", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--s-muted)" }}>Rent {N} yrs, then sell</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>{fmtUSD(rentPathTotal)}</div>
              <div style={{ fontSize: 11.5, color: "var(--s-muted)" }}>cash flow + sale proceeds</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Row label={`Rental cash flow over ${N} yrs`} value={fmtUSD(cumCash)} />
            <Row label={`First-year cash flow (monthly)`} value={fmtUSD(monthlyCashFlow)} />
            <Row label={`Home value in ${N} yrs`} value={fmtUSD(homeValueN)} />
            <Row label="Net proceeds if sold then" value={fmtUSD(netSaleN)} strong />
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only. Doesn&rsquo;t model income tax on rent, depreciation, capital-gains rules, or investing your
            sale proceeds elsewhere — all of which a real analysis should weigh. Not financial advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-sell-or-rent"
          intent="sell"
          heading="Get a real sell-vs-rent analysis"
          subhead="These are estimates — the real decision depends on taxes, your goals, and today's market. A broker will build you a personalized analysis, free. And if renting wins, we can manage the property so it stays hands-off."
          cta="Get my free analysis →"
          context={context}
          successNote="Got it. A broker will build your personalized sell-vs-rent analysis — and can handle management if you decide to rent."
        />
      </div>
    </div>
  );
}
