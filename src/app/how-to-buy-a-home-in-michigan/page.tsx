import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "how-to-buy-a-home-in-michigan",
  crumbLabel: "How to Buy a Home in Michigan",
  eyebrow: "Buyer guide · Michigan",
  h1: (
    <>
      How to buy a home in <span style={{ color: "var(--s-gold)" }}>Michigan</span>
    </>
  ),
  h1Text: "How to Buy a Home in Michigan: Step-by-Step Guide (2026)",
  sub: (
    <>
      From pre-approval to closing, here&rsquo;s the real step-by-step for buying a home in Michigan &mdash;
      including the state-specific things that trip people up: down-payment help, how fast Metro
      Detroit moves, and the property-tax surprise most first-time buyers never see coming.
    </>
  ),
  bullets: [
    "8 clear steps from budget to keys",
    "Michigan-specific: MSHDA help, fast market, tax uncapping",
    "Get pre-approved first — homes here sell in 2–4 weeks",
  ],
  publishedISO: "2026-10-11",
  publishedLabel: "October 11, 2026",
  sections: [
    {
      heading: "The 8 steps, start to finish",
      body: (
        <>
          <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 12 }}>
            <li>
              <strong>Get your finances ready.</strong> Check your credit, set a realistic budget, and
              save for both a down payment and closing costs. Start with the{" "}
              <a href="/home-affordability-calculator">affordability calculator</a> to see what your
              income and today&rsquo;s rates actually buy.
            </li>
            <li>
              <strong>Get pre-approved (not just pre-qualified).</strong> A real pre-approval from a
              lender tells you your true budget and makes your offers competitive. In Michigan&rsquo;s
              fast markets this is non-negotiable &mdash; sellers won&rsquo;t take an un-approved buyer
              seriously.
            </li>
            <li>
              <strong>Check down-payment assistance.</strong> You may not need as much cash as you
              think. Michigan&rsquo;s MSHDA program offers down-payment help to eligible buyers &mdash; see{" "}
              <a href="/michigan-down-payment-assistance">Michigan down-payment assistance</a> and{" "}
              <a href="/first-time-home-buyer-programs-michigan">first-time buyer programs</a>.
            </li>
            <li>
              <strong>Hire a buyer&rsquo;s agent.</strong> As of August 2024, buyers sign a written
              buyer-agency agreement before touring homes. A good local agent guides pricing,
              negotiation, and the fine print &mdash; and knows the neighborhoods and school boundaries
              that affect value.
            </li>
            <li>
              <strong>Search &amp; tour.</strong> Focus your search, and verify the details that matter
              in Michigan &mdash; especially the exact school district (boundaries don&rsquo;t always match
              the mailing address) and the home&rsquo;s condition.
            </li>
            <li>
              <strong>Make an offer.</strong> Your agent helps you structure price, earnest-money
              deposit, and contingencies (financing, inspection, appraisal). In a two-to-four-week
              market, be ready to move decisively.
            </li>
            <li>
              <strong>Inspection &amp; appraisal.</strong> A home inspection protects you from costly
              surprises; the lender&rsquo;s appraisal confirms the home is worth the price. Negotiate
              repairs or credits as needed.
            </li>
            <li>
              <strong>Finalize the mortgage &amp; close.</strong> Underwriting, title work, and a final
              walkthrough lead to closing, where you&rsquo;ll sign, pay your closing costs, and get the
              keys.
            </li>
          </ol>
        </>
      ),
    },
    {
      heading: "What buying in Michigan costs up front",
      body: (
        <>
          <p>
            Plan for two separate cash needs: the <strong>down payment</strong> and{" "}
            <strong>closing costs</strong> (lender fees, title, prepaids, and recording &mdash; typically a
            few percent of the price). Down payments aren&rsquo;t always 20%: many loans allow far less,
            and assistance programs can reduce the cash you need further.
          </p>
          <p>
            Run your real numbers with the{" "}
            <a href="/home-affordability-calculator">affordability calculator</a>, and if you&rsquo;re
            weighing it against renting, the{" "}
            <a href="/rent-vs-buy-calculator">rent-vs-buy calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "The Michigan property-tax surprise to plan for",
      body: (
        <>
          <p>
            Here&rsquo;s the one most first-time buyers miss: in Michigan, a home&rsquo;s{" "}
            <strong>taxable value &ldquo;uncaps&rdquo; the year after you buy it</strong>. That means your
            property-tax bill can be <strong>meaningfully higher than what the current owner pays</strong>{" "}
            &mdash; because their taxable value was capped during their ownership, and it resets when the
            home transfers. Always budget based on the <em>uncapped</em> estimate, not the seller&rsquo;s
            current tax bill. (A good agent and lender will help you estimate this.)
          </p>
        </>
      ),
    },
    {
      heading: "Why speed matters in Metro Detroit",
      body: (
        <>
          <p>
            Across the Metro Detroit suburbs, well-priced homes are selling in roughly{" "}
            <strong>two to four weeks</strong> &mdash; and some markets, like Rochester Hills, in about
            two. That&rsquo;s why steps 1&ndash;3 (budget, pre-approval, assistance) matter so much: the
            buyers who win are the ones who are ready to tour and write a strong offer the day the right
            home hits the market.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Buying a home in Michigan — common questions",
  faqs: [
    {
      question: "How much do you need to buy a house in Michigan?",
      answer:
        "You'll need a down payment plus closing costs (lender fees, title, prepaids, and recording — typically a few percent of the price). Down payments aren't always 20%; many loan programs allow much less, and Michigan's MSHDA program offers down-payment assistance to eligible buyers, so the cash required can be lower than people expect. Use the affordability calculator on marketcenterrealty.com to estimate your numbers.",
    },
    {
      question: "Do first-time home buyers get help in Michigan?",
      answer:
        "Yes. Michigan's MSHDA offers down-payment assistance and first-time buyer loan programs for eligible buyers. See the Michigan down-payment assistance and first-time buyer program guides on marketcenterrealty.com for current details and eligibility.",
    },
    {
      question: "Do I need a buyer's agent to buy a home in Michigan?",
      answer:
        "You're not legally required to, but it's strongly recommended — a buyer's agent guides pricing, negotiation, inspections, and contracts, and knows local school boundaries and neighborhoods. As of August 2024, buyers sign a written buyer-agency agreement before touring homes.",
    },
    {
      question: "Why are my property taxes higher than the previous owner's?",
      answer:
        "In Michigan, a home's taxable value 'uncaps' the year after a sale. The prior owner's taxable value was capped during their ownership (under Proposal A), and it resets when the home transfers — so a new buyer's tax bill can be meaningfully higher. Always budget using the uncapped estimate, not the seller's current bill.",
    },
    {
      question: "How long does it take to buy a home in Michigan?",
      answer:
        "Once you're pre-approved and find a home, closing typically takes about 30–45 days. Finding the right home varies, but in Metro Detroit's fast market, well-priced homes sell in roughly two to four weeks, so being pre-approved and ready to act is key.",
    },
  ],
  related: [
    { href: "/home-affordability-calculator", label: "Affordability calculator" },
    { href: "/michigan-down-payment-assistance", label: "Michigan down-payment assistance" },
    { href: "/first-time-home-buyer-programs-michigan", label: "First-time buyer programs" },
    { href: "/rent-vs-buy-calculator", label: "Rent vs. buy calculator" },
    { href: "/relocating-to-metro-detroit", label: "Relocating to Metro Detroit" },
  ],
  ctaHeading: "Ready to start your Michigan home search?",
  ctaBody: (
    <>
      Talk to a local expert about getting pre-approved, down-payment help, and winning in a fast
      market &mdash; no pressure, just straight answers.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local buyer's expert" },
  metaTitle: "How to Buy a Home in Michigan: Step-by-Step Guide (2026)",
  metaDescription:
    "How to buy a home in Michigan, step by step: budgeting, pre-approval, MSHDA down-payment help, making an offer, inspection, and closing — plus the property-tax uncapping surprise most buyers miss. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
