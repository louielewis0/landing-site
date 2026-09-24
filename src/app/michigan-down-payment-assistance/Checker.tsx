"use client";

import { useState } from "react";
import { fmtUSD, num } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* MSHDA down-payment-assistance eligibility checker.
   Guided questionnaire → instant likely-eligibility verdict.

   PROGRAM CONSTANTS — verified from official michigan.gov/mshda and the
   MSHDA Income & Sales Price Limits PDF (rev. 6.1.2026), accessed 2026-09-24.
   Re-check periodically; MSHDA revises the limits PDF. */
const MAX_DPA = 10000; // MI 10K DPA (0% deferred second loan; statewide)
const MIN_CREDIT = 640; // official minimum
const SALES_PRICE_LIMIT = 566355; // statewide, effective 6/1/2026

// Income limits vary by county, targeted vs non-targeted area, and household
// size (1–2 persons vs 3+). Oakland, Macomb, and Wayne share these figures.
const METRO_LIMITS = {
  nonTargeted: { small: 104800, large: 120520 },
  targeted: { small: 125760, large: 146720 },
};

type Check = { label: string; status: "pass" | "flag" | "note"; detail: string };

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

function Select({ label, value, onChange, options, hint }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][]; hint?: string }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selStyle}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      {hint && <span style={{ display: "block", fontSize: 11.5, color: "var(--s-muted)", marginTop: 5, lineHeight: 1.5 }}>{hint}</span>}
    </label>
  );
}

function NumField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
        <span style={{ padding: "0 0 0 14px", color: "var(--s-muted)", fontSize: 15 }}>$</span>
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: "none", outline: "none", background: "transparent", color: "var(--s-ink)", fontSize: 15, fontFamily: "inherit" }} />
      </div>
    </label>
  );
}

export default function Checker() {
  const [owned3, setOwned3] = useState("no");
  const [residence, setResidence] = useState("yes");
  const [credit, setCredit] = useState("660");
  const [county, setCounty] = useState("Oakland");
  const [targeted, setTargeted] = useState("no");
  const [household, setHousehold] = useState("2");
  const [income, setIncome] = useState("85000");
  const [price, setPrice] = useState("300000");
  const [education, setEducation] = useState("yes");

  const isTargeted = targeted === "yes";
  const bracket = num(household) >= 3 ? "large" : "small";
  const incomeLimit = (isTargeted ? METRO_LIMITS.targeted : METRO_LIMITS.nonTargeted)[bracket];

  const checks: Check[] = [];

  // First-time buyer (no ownership in last 3 years). Targeted areas allow repeat buyers.
  if (owned3 === "no") {
    checks.push({ label: "First-time buyer", status: "pass", detail: "No home owned in the last 3 years — meets the rule." });
  } else if (isTargeted) {
    checks.push({ label: "First-time buyer", status: "pass", detail: "You've owned recently, but in a MSHDA targeted area repeat buyers also qualify." });
  } else {
    checks.push({ label: "First-time buyer", status: "flag", detail: "In non-targeted areas you must be a first-time buyer (no home owned in 3 years). Targeted areas allow repeat buyers." });
  }

  // Primary residence in Michigan.
  if (residence === "yes") checks.push({ label: "Michigan primary residence", status: "pass", detail: "Buying a primary home in Michigan — required." });
  else checks.push({ label: "Michigan primary residence", status: "flag", detail: "MSHDA only covers a primary residence in Michigan. Investment/second homes don't qualify." });

  // Credit score.
  if (credit === "below") checks.push({ label: "Credit score", status: "flag", detail: `Below the ${MIN_CREDIT} minimum. Some lenders can help you build a plan to get there.` });
  else checks.push({ label: "Credit score", status: "pass", detail: `Meets the ${MIN_CREDIT}+ minimum.` });

  // Purchase price limit.
  if (num(price) > SALES_PRICE_LIMIT) checks.push({ label: "Purchase price", status: "flag", detail: `Above the ${fmtUSD(SALES_PRICE_LIMIT)} statewide sales-price limit.` });
  else checks.push({ label: "Purchase price", status: "pass", detail: `Within the ${fmtUSD(SALES_PRICE_LIMIT)} statewide sales-price limit.` });

  // Income limit — county + targeted + household bracket.
  const otherCounty = county === "Other";
  if (num(income) > incomeLimit) {
    checks.push({ label: "Household income", status: "flag", detail: `Above the ~${fmtUSD(incomeLimit)} MSHDA limit for ${isTargeted ? "targeted" : "non-targeted"} ${county === "Other" ? "Metro Detroit-area" : county} / ${bracket === "large" ? "3+" : "1–2"} person households.${otherCounty ? " (Your county may differ — limits vary statewide.)" : ""}` });
  } else {
    checks.push({ label: "Household income", status: "pass", detail: `Within the ~${fmtUSD(incomeLimit)} limit for ${isTargeted ? "targeted" : "non-targeted"} ${county === "Other" ? "Metro Detroit-area" : county} / ${bracket === "large" ? "3+" : "1–2"} person households.${otherCounty ? " Your county's exact limit may differ." : ""}` });
  }

  // Homebuyer education.
  if (education === "yes") checks.push({ label: "Homebuyer education", status: "pass", detail: "Willing to complete it — required, and it's a short online course." });
  else checks.push({ label: "Homebuyer education", status: "note", detail: "MSHDA requires a homebuyer education course. It's short and usually online." });

  const blockers = checks.filter((c) => c.status === "flag").length;
  const eligible = blockers === 0;

  const context = `MSHDA check: ${county}${isTargeted ? " (targeted)" : ""}, ${household}-person, income ${fmtUSD(
    num(income),
  )} vs limit ${fmtUSD(incomeLimit)}, price ${fmtUSD(num(price))}, credit ${credit}, first-time ${owned3 === "no" ? "yes" : "no"} → ${
    eligible ? "likely eligible" : blockers + " potential blocker(s)"
  }.`;

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>A few quick questions</div>
        <div style={{ display: "grid", gap: 14 }}>
          <Select label="Owned a home in the last 3 years?" value={owned3} onChange={setOwned3} options={[["no", "No"], ["yes", "Yes"]]} />
          <Select label="Buying a primary residence in Michigan?" value={residence} onChange={setResidence} options={[["yes", "Yes"], ["no", "No"]]} />
          <Select label="Credit score" value={credit} onChange={setCredit} options={[["below", "Below 640"], ["640", "640–659"], ["660", "660 or higher"]]} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="County" value={county} onChange={setCounty} options={[["Oakland", "Oakland"], ["Macomb", "Macomb"], ["Wayne", "Wayne"], ["Other", "Other MI"]]} />
            <Select label="Household size" value={household} onChange={setHousehold} options={[["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5+"]]} />
          </div>
          <Select
            label="Is the home in a MSHDA 'targeted area'?"
            value={targeted}
            onChange={setTargeted}
            options={[["no", "No / not sure"], ["yes", "Yes"]]}
            hint="Targeted areas include Detroit, Pontiac, Southfield, Royal Oak Twp., Harrison Twp., Mt. Clemens and others. They raise the income limit and let repeat buyers qualify."
          />
          <NumField label="Annual household income" value={income} onChange={setIncome} />
          <NumField label="Target purchase price" value={price} onChange={setPrice} />
          <Select label="Willing to take a homebuyer education course?" value={education} onChange={setEducation} options={[["yes", "Yes"], ["no", "Not sure"]]} />
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: `1px solid ${eligible ? "rgba(28,124,74,0.4)" : "rgba(217,118,47,0.4)"}`, background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 8 }}>Your result</div>
          <div style={{ fontSize: "clamp(22px, 3.6vw, 30px)", fontWeight: 700, color: eligible ? "#1c7c4a" : "var(--navy)", lineHeight: 1.2 }}>
            {eligible ? "You look eligible for MSHDA assistance" : `${blockers} thing${blockers === 1 ? "" : "s"} to sort out first`}
          </div>
          <p style={{ fontSize: 14, color: "var(--s-muted)", marginTop: 8 }}>
            {eligible
              ? <>Based on your answers, you likely qualify for the <strong>MI Home Loan</strong> plus up to <strong>{fmtUSD(MAX_DPA)}</strong> in down-payment assistance — a 0% second loan with no monthly payment, repaid only when you sell, refinance, or pay off the mortgage.</>
              : <>You may still qualify — the flagged items below aren&rsquo;t always dealbreakers (a targeted-area purchase, another loan program, or a quick credit plan can change the answer). Let&rsquo;s look at your options.</>}
          </p>

          <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
            {checks.map((c) => (
              <div key={c.label} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5 }}>
                <span style={{ flexShrink: 0, marginTop: 1, color: c.status === "pass" ? "#1c7c4a" : c.status === "flag" ? "#c0392b" : "var(--s-gold)", fontWeight: 700 }}>
                  {c.status === "pass" ? "✓" : c.status === "flag" ? "!" : "•"}
                </span>
                <span><strong style={{ color: "var(--s-ink)" }}>{c.label}:</strong> <span style={{ color: "var(--s-muted)" }}>{c.detail}</span></span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
            Guidance only — not a determination of eligibility or a loan approval. MSHDA sets exact income and sales-price
            limits by county, area, and household size and updates them periodically; a MSHDA-participating lender confirms
            your actual eligibility. Figures from MSHDA, current as of the 6/1/2026 limits.
          </p>
        </div>

        <ToolLeadForm
          source="tool-mshda"
          intent="buy"
          heading="See exactly what you qualify for"
          subhead="We'll connect you with a MSHDA-participating lender to confirm your real numbers, and walk you through the whole first-time-buyer process — programs, homes, and next steps. Free, no obligation."
          cta="Check my eligibility →"
          context={context}
          successNote="Got it. We'll connect you with a MSHDA lender to confirm your eligibility and map out your next steps."
        />
      </div>
    </div>
  );
}
