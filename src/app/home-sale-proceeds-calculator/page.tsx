import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "home-sale-proceeds-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Home Sale Proceeds Calculator (Michigan) — What Will You Walk Away With?",
  description:
    "Free Michigan home-sale net-proceeds calculator. Enter your sale price, mortgage payoff, and commission to see exactly what you'll net after transfer tax, title, and closing costs. Built by a local Metro Detroit brokerage.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Home Sale Proceeds Calculator"
      eyebrow="Seller tool · Michigan"
      h1={
        <>
          What will you actually <span style={{ color: "var(--s-gold)" }}>walk away with</span> when you sell?
        </>
      }
      h1Text="Home Sale Net Proceeds Calculator (Michigan)"
      sub="Your home's value is only half the story. This calculator shows your real net proceeds after Michigan's transfer tax, title insurance, agent commission, and payoff — the number that actually lands in your account."
      bullets={["Accurate MI transfer tax (0.86%)", "Editable, negotiable commission", "Instant — no email required"]}
      appDescription="A free calculator that estimates a home seller's net proceeds in Michigan after commission, transfer tax, title insurance, closing costs, and mortgage payoff."
      sections={[
        {
          heading: "What it costs to sell a house in Michigan",
          body: (
            <>
              <p>
                Selling a home in Michigan typically costs somewhere between <strong>6% and 10% of the sale price</strong>{" "}
                once everything is added up. The largest piece is the real estate commission; the rest is a mix of
                state-set taxes and customary seller costs. Here&rsquo;s where the money goes:
              </p>
              <p>
                <strong>Real estate commission (≈5–6%).</strong> This is negotiable and not set by law. Since the 2024 NAR
                settlement, the seller is no longer required to pay the buyer&rsquo;s agent — that compensation is now
                negotiated separately and can be paid by the buyer, the seller as a concession, or split. The calculator
                lets you edit the rate so you can model any scenario.
              </p>
              <p>
                <strong>Michigan transfer tax (0.86%).</strong> This one is fixed by statute: $7.50 per $1,000 to the state
                plus $1.10 per $1,000 to the county, for a combined $8.60 per $1,000 (0.86%). In Michigan the{" "}
                <strong>seller</strong> pays it by default.
              </p>
              <p>
                <strong>Owner&rsquo;s title insurance (≈0.5–1%).</strong> Unlike many states, Michigan custom is for the{" "}
                <strong>seller</strong> to buy the owner&rsquo;s title policy for the buyer. It&rsquo;s negotiable in the
                contract, but budget for it.
              </p>
              <p>
                <strong>Other closing costs.</strong> A settlement/closing fee, deed preparation, recording, and prorated
                property taxes up to the closing date — usually a few hundred dollars plus your tax share.
              </p>
            </>
          ),
        },
        {
          heading: "How this calculator works",
          body: (
            <>
              <p>
                Start with your estimated sale price, then subtract each selling cost and your remaining mortgage balance.
                What&rsquo;s left is your estimated net proceeds — the cash you keep. The transfer-tax rate is Michigan&rsquo;s
                statutory 0.86%; commission and title are editable because they vary and are negotiable.
              </p>
              <p>
                It&rsquo;s an estimate, not a closing statement — your actual numbers depend on your contract, closing date,
                and any concessions. For an exact figure, a local broker can run your home against live comps and prepare a
                real net sheet, free.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Home sale proceeds questions"
      faqs={[
        {
          question: "How much do I keep when I sell my house in Michigan?",
          answer:
            "After paying off your mortgage, expect to net your sale price minus roughly 6–10% in selling costs (commission, Michigan's 0.86% transfer tax, owner's title insurance, and closing costs). On a $400,000 sale with a $220,000 payoff and a 6% commission, a typical seller nets around $150,000 — but your exact figure depends on your payoff, commission, and concessions. Use the calculator above to model your own numbers.",
        },
        {
          question: "Who pays the transfer tax in Michigan, the buyer or the seller?",
          answer:
            "The seller. Michigan's real estate transfer tax is set by statute at $8.60 per $1,000 of sale price (0.86% — $7.50 state + $1.10 county), and the law places it on the seller/grantor. It's calculated on the sale price rounded up to the nearest $500.",
        },
        {
          question: "Is the 6% real estate commission required?",
          answer:
            "No. Commissions are fully negotiable and are not set by law. The often-cited '6%' is just a common range (5–6% in Michigan). Since the August 2024 NAR settlement, the seller is no longer obligated to pay the buyer's-agent commission — that's now negotiated separately. Edit the commission field in the calculator to see how different rates change your net.",
        },
        {
          question: "Does the seller pay for title insurance in Michigan?",
          answer:
            "Customarily, yes — Michigan tradition is for the seller to pay for the owner's title insurance policy that protects the buyer, typically 0.5–1% of the sale price. The buyer usually pays for the separate lender's policy. Like most costs, it can be shifted by the purchase agreement, so defer to your contract.",
        },
        {
          question: "How accurate is this net proceeds estimate?",
          answer:
            "The transfer tax is exact (it's fixed by statute). Commission, title, and other closing costs are typical ranges you can edit, so the estimate is only as accurate as your inputs. It doesn't yet know your exact prorated taxes or any negotiated concessions. For a precise, itemized net sheet based on your real home and current comps, request the free broker net sheet on this page.",
        },
      ]}
      ctaHeading="Get your exact net sheet, free"
      ctaBody="Numbers in hand? A local Metro Detroit broker will verify them against live comps and prepare an itemized net sheet for your actual home — no cost, no obligation to list."
      ctaPrimary={{ href: "/home-value", label: "Start with a free home valuation" }}
    >
      <Calculator />
    </CalcPage>
  );
}
