import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "sell-or-rent-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Should I Sell or Rent My House? Calculator (Michigan)",
  description:
    "Free sell-vs-rent calculator for Michigan homeowners. Compare what you'd net selling now against renting your home out for a few years — cash flow, equity, and appreciation. Built by a local Metro Detroit brokerage.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Sell or Rent Calculator"
      eyebrow="Homeowner tool · Michigan"
      h1={
        <>
          Should you sell your house, or <span style={{ color: "var(--s-gold)" }}>rent it out</span>?
        </>
      }
      h1Text="Sell or Rent Calculator (Michigan)"
      sub="Moving but not sure whether to sell or become a landlord? This calculator compares the cash you'd pocket by selling now against what renting it out for a few years could earn you — cash flow, equity paydown, and appreciation combined."
      bullets={["Sell-now vs rent-then-sell", "Real cash-flow math", "Instant — no email required"]}
      appDescription="A free calculator that compares selling a home now against renting it out for a period of years, weighing net sale proceeds versus rental cash flow, mortgage paydown, and appreciation."
      sections={[
        {
          heading: "The 'accidental landlord' question",
          body: (
            <>
              <p>
                Plenty of Michigan homeowners end up here: you&rsquo;re relocating, upgrading, or inherited a house, and
                you&rsquo;re torn between cashing out and keeping it as a rental. There&rsquo;s real money on both sides, and
                the right answer isn&rsquo;t obvious — it depends on your equity, what the home would rent for, and how long
                you&rsquo;d hold it.
              </p>
              <p>
                <strong>Selling now</strong> gives you a clean lump sum today (your equity minus selling costs) with no
                tenants, no repairs, and no management. <strong>Renting it out</strong> trades that simplicity for monthly
                cash flow, continued mortgage paydown, and years of appreciation — plus the tax advantages and headaches of
                being a landlord. This tool puts real numbers on both paths.
              </p>
            </>
          ),
        },
        {
          heading: "What the calculator does and doesn't include",
          body: (
            <>
              <p>
                It models the <strong>sell-now net proceeds</strong> (value minus ~8% selling costs minus your mortgage
                payoff) against the <strong>rent-then-sell total</strong> (your cumulative rental cash flow over the years
                you&rsquo;d hold, plus the net proceeds when you eventually sell — capturing both mortgage paydown and
                appreciation).
              </p>
              <p>
                What it deliberately leaves out — because they&rsquo;re personal — is income tax on your rent, depreciation
                benefits, capital-gains treatment (including the primary-residence exclusion you may lose by renting too
                long), and what you&rsquo;d earn investing your sale proceeds elsewhere. Those can tip the decision, which is
                why the honest next step is a personalized analysis. Use this to get in the right ballpark first.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Sell or rent questions"
      faqs={[
        {
          question: "Is it better to sell my house or rent it out?",
          answer:
            "It depends on your equity, the rent your home would command, and how long you'd hold it as a rental. Selling gives you a clean lump sum now; renting builds cash flow, equity, and appreciation over time but comes with tenants, maintenance, and taxes. As a rough guide, renting tends to win when the home cash-flows well and you'd hold it for several years; selling wins when you have strong equity and want simplicity. Run your numbers above for a specific comparison.",
        },
        {
          question: "Will my house cash flow as a rental?",
          answer:
            "It cash-flows if the rent exceeds all the costs — mortgage payment, property taxes, insurance, maintenance, vacancy, and management. Many homes with low mortgage balances or below-market rates cash-flow easily; homes with large payments may run negative even at market rent. The calculator shows your estimated first-year monthly cash flow so you can see immediately.",
        },
        {
          question: "What are the tax implications of renting instead of selling?",
          answer:
            "Two big ones. First, rental income is taxable, but you can deduct expenses and depreciation, which often shelters much of it. Second — and this catches people — if you rent out a former primary residence for too long, you can lose the capital-gains exclusion (up to $250k single / $500k married) you'd have gotten by selling while it still qualified as your home. This is exactly the kind of thing to check with a CPA and factor into your decision; the calculator doesn't model it.",
        },
        {
          question: "Do you manage rental properties if I decide to keep it?",
          answer:
            "Yes. If the numbers point toward renting, Real Estate Market Center offers property management so it stays hands-off — tenant placement, rent collection, maintenance coordination, and compliance. And if selling wins, we'll list it. That's the advantage of asking a brokerage that does both: our advice isn't tied to one outcome.",
        },
      ]}
      ctaHeading="Not sure which way to go?"
      ctaBody="Get a personalized sell-vs-rent analysis from a local broker who does both — so the recommendation fits your goals, not a sales pitch. If renting wins, we can manage it; if selling wins, we'll list it."
      ctaPrimary={{ href: "/home-value", label: "Start with a free home valuation" }}
    >
      <Calculator />
    </CalcPage>
  );
}
