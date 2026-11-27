"use client";

import { useState } from "react";
import { Field, Row, fmtUSD, fmtPct, num } from "@/components/site/calc-ui";
import ToolLeadForm from "@/components/site/ToolLeadForm";

/* Michigan property-tax uncapping calculator.
   Verified figures: SEV = 50% of true cash value (MI Const. art. 9 §3);
   the year after a transfer, Taxable Value uncaps to SEV (MCL 211.27a);
   2026 inflation rate multiplier 1.027 (Treasury STC Bulletin 14 of 2025);
   PRE exempts up to 18 school-operating mills. Default millage = City of
   Bloomfield Hills 2025 totals (city rate sheet): 35.9981 PRE / 49.3775 non-PRE. */

const IRM_2026 = 0.027;
const BH_PRE = 35.9981;
const BH_NON_PRE = 49.3775;

export default function Calculator() {
  const [price, setPrice] = useState("1250000");
  const [sellerTax, setSellerTax] = useState("");
  const [mills, setMills] = useState(String(BH_PRE));
  const [primary, setPrimary] = useState(true);

  const p = num(price);
  const sev = p * 0.5;
  const m = num(mills);
  const annual = (sev * m) / 1000;
  const monthly = annual / 12;
  const effective = p > 0 ? (annual / p) * 100 : 0;
  const seller = num(sellerTax);
  const jump = seller > 0 ? annual - seller : 0;
  const jumpPct = seller > 0 ? (jump / seller) * 100 : 0;
  const year5 = annual * Math.pow(1 + IRM_2026, 4);

  const setResidence = (isPrimary: boolean) => {
    setPrimary(isPrimary);
    // Keep the PRE/non-PRE gap in sync: a non-homestead parcel pays up to 18 more school-operating mills.
    if (num(mills) === BH_PRE && !isPrimary) setMills(String(BH_NON_PRE));
    else if (num(mills) === BH_NON_PRE && isPrimary) setMills(String(BH_PRE));
    else setMills(String(+(num(mills) + (isPrimary ? -18 : 18)).toFixed(4)));
  };

  const context = `Uncapping estimate: price ${fmtUSD(p)}, ${m} mills (${primary ? "primary residence" : "non-homestead"}), est. uncapped tax ${fmtUSD(
    annual,
  )}/yr${seller > 0 ? `, seller paid ${fmtUSD(seller)}` : ""}.`;

  const pill = (active: boolean) => ({
    flex: 1,
    padding: "11px 12px",
    borderRadius: 12,
    border: active ? "1.5px solid var(--navy)" : "1px solid var(--line)",
    background: active ? "var(--navy)" : "#fff",
    color: active ? "#fff" : "var(--s-ink)",
    fontSize: 13.5,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  });

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "var(--cream-2)", padding: 24 }}>
        <div className="s-eyebrow" style={{ marginBottom: 16 }}>The home you&rsquo;re buying</div>
        <div style={{ display: "grid", gap: 16 }}>
          <Field label="Purchase price" value={price} onChange={setPrice} prefix="$" hint="The assessor starts from market value, so price is a fair proxy for your first full year." />
          <Field
            label="Seller's current annual tax (optional)"
            value={sellerTax}
            onChange={setSellerTax}
            prefix="$"
            placeholder="From the listing or tax records"
            hint="Add it to see how much your bill jumps versus what the seller pays today."
          />
          <div>
            <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>
              Will this be your primary residence?
            </span>
            <div style={{ display: "flex", gap: 8 }} role="group" aria-label="Residence type">
              <button type="button" aria-pressed={primary} onClick={() => !primary && setResidence(true)} style={pill(primary)}>
                Yes, primary home
              </button>
              <button type="button" aria-pressed={!primary} onClick={() => primary && setResidence(false)} style={pill(!primary)}>
                Second home / rental
              </button>
            </div>
            <span style={{ display: "block", fontSize: 11.5, color: "var(--s-muted)", marginTop: 5, lineHeight: 1.5 }}>
              A primary home with the Principal Residence Exemption skips up to 18 school-operating mills.
            </span>
          </div>
          <Field
            label="Total millage (summer + winter)"
            value={mills}
            onChange={setMills}
            suffix="mills"
            hint={
              <>
                {`Defaults to the City of Bloomfield Hills 2025 total (${BH_PRE} PRE / ${BH_NON_PRE} non-PRE). `}Rates differ by city and
                school district, so use your community&rsquo;s tax-rate sheet for an exact figure.
              </>
            }
          />
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
        <div style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.35)", background: "#fff", padding: 24 }}>
          <div className="s-eyebrow" style={{ marginBottom: 6 }}>Your estimated tax once it uncaps</div>
          <div style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--navy)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>
            {fmtUSD(annual)}
            <span style={{ fontSize: 18, fontWeight: 600, color: "var(--s-muted)", letterSpacing: 0 }}> / year</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 6 }}>
            About {fmtUSD(monthly)} a month in escrow, or an effective {fmtPct(effective, 2)} of the price.
          </p>

          {seller > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                borderRadius: 12,
                background: jump > 0 ? "rgba(178,56,16,0.07)" : "rgba(16,20,27,0.05)",
                border: jump > 0 ? "1px solid rgba(178,56,16,0.3)" : "1px solid var(--line)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: jump > 0 ? "var(--s-gold-ink)" : "var(--navy)" }}>
                {jump > 0
                  ? `Your bill jumps about ${fmtUSD(jump)} a year (+${fmtPct(jumpPct, 0)}) versus the seller's.`
                  : "Your estimate is at or below the seller's current bill."}
              </div>
              <div style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 4 }}>
                The seller&rsquo;s bill reflects years of capped increases. Yours starts from the full SEV.
              </div>
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <Row label="Purchase price" value={fmtUSD(p)} />
            <Row label="State Equalized Value (50%)" value={fmtUSD(sev)} />
            <Row label="Taxable Value after uncapping" value={fmtUSD(sev)} />
            <Row label={`Millage (${primary ? "primary home" : "non-homestead"})`} value={`${m.toFixed(2)} mills`} />
            <Row label="Estimated annual tax" value={fmtUSD(annual)} strong />
            <Row label="Year 5, if the cap stays at 2026's 2.7%" value={fmtUSD(year5)} />
          </div>
          <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>
            Estimate only. The assessor sets true cash value from market data, which can differ from your price, and the
            uncapped value takes effect the year after the sale. Millage changes yearly. Not tax or legal advice.
          </p>
        </div>

        <ToolLeadForm
          source="tool-tax-uncapping"
          intent="buy"
          heading="Get the real tax number before you offer"
          subhead="Send us the address. A local broker pulls the parcel's assessment, the exact millage for its school district, and the uncapped estimate, free."
          cta="Check my home's taxes →"
          context={context}
          successNote="Got it. A broker will send the parcel's uncapped tax estimate, usually within a few hours."
        />
      </div>
    </div>
  );
}
