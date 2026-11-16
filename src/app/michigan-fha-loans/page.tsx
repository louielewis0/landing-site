import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "michigan-fha-loans",
  crumbLabel: "Michigan FHA Loans",
  eyebrow: "Buyer financing guide · Michigan",
  h1: (
    <>
      <span style={{ color: "var(--s-gold)" }}>FHA loans</span> in Michigan, explained
    </>
  ),
  h1Text: "Michigan FHA Loans (2026): Requirements, Limits, Down Payment & MIP",
  sub: "FHA is how a huge share of Michigan first-time buyers actually get into a home — just 3.5% down and flexible credit. Here are the real 2026 requirements, the statewide loan limit, how the mortgage insurance works, and how to stack FHA with $10,000 in down-payment help.",
  publishedISO: "2026-11-16",
  publishedLabel: "November 16, 2026",
  bullets: [
    "3.5% down with a 580 credit score",
    "2026 MI limit: $541,287 (all counties)",
    "Stack with MSHDA $10K down-payment help",
  ],
  sections: [
    {
      heading: "FHA loans in Michigan at a glance",
      body: (
        <>
          <p>
            An <strong>FHA loan</strong> is a mortgage insured by the Federal Housing Administration. Because the
            government backs it, lenders can offer <strong>lower down payments and more forgiving credit</strong>{" "}
            than a conventional loan &mdash; which is exactly why it&rsquo;s the go-to for first-time and
            budget-conscious buyers across Metro Detroit.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>3.5% down</strong> with a credit score of <strong>580 or higher</strong> (10% down for scores of 500&ndash;579).</li>
            <li><strong>2026 Michigan loan limit: $541,287</strong> for a single-family home &mdash; the same in <em>every</em> county (Oakland, Macomb, Wayne, Washtenaw, Kent and the rest), since Michigan has no high-cost counties.</li>
            <li><strong>Must be your primary residence</strong> &mdash; FHA isn&rsquo;t for investment properties (though you can buy a 2&ndash;4 unit and live in one).</li>
            <li><strong>Mortgage insurance</strong> applies (details below) &mdash; the main trade-off for the low down payment.</li>
          </ul>
        </>
      ),
    },
    {
      heading: "FHA requirements in Michigan (2026)",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Credit score:</strong> 580+ for 3.5% down; 500&ndash;579 for 10% down. Note that many lenders
              add their own <strong>overlay of ~620&ndash;640</strong> in practice, so a higher score opens more doors
              and better pricing.
            </li>
            <li>
              <strong>Down payment:</strong> 3.5% of the purchase price &mdash; and it can come from a{" "}
              <strong>gift</strong> or down-payment-assistance program (see MSHDA below).
            </li>
            <li>
              <strong>Debt-to-income (DTI):</strong> typically up to about <strong>43%</strong>, and higher &mdash; into
              the <strong>50% range</strong> &mdash; with strong compensating factors like reserves or a bigger down
              payment. Automated underwriting can allow more.
            </li>
            <li>
              <strong>Steady income &amp; employment</strong>, a property that meets FHA condition standards, and an
              FHA appraisal.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Want to see what you can afford on an FHA payment? Run the{" "}
            <a href="/home-affordability-calculator" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>affordability calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "2026 FHA loan limits in Michigan",
      body: (
        <>
          <p>
            For loans with case numbers assigned on or after January 1, 2026, the FHA limits are the same across
            all 83 Michigan counties:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>1 unit (single-family): $541,287</strong></li>
            <li><strong>2 units: $693,050</strong></li>
            <li><strong>3 units: $837,700</strong></li>
            <li><strong>4 units: $1,041,125</strong></li>
          </ul>
          <p>
            The multi-unit limits are worth knowing: you can buy a <strong>2&ndash;4 unit property with an FHA loan,
            live in one unit, and rent the others</strong> &mdash; a &ldquo;house hack&rdquo; that lets your tenants
            help cover your mortgage, all on 3.5% down.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>Source: HUD Mortgagee Letter 2025-23 (2026 forward limits).</p>
        </>
      ),
    },
    {
      heading: "FHA mortgage insurance (MIP) — the real trade-off",
      body: (
        <>
          <p>FHA&rsquo;s low down payment comes with mortgage insurance, in two parts:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Upfront MIP: 1.75%</strong> of the loan amount, usually rolled into the loan.</li>
            <li><strong>Annual MIP: about 0.55% per year</strong> (on a typical 30-year loan with less than 5% down), paid monthly.</li>
          </ul>
          <p>
            The catch most buyers miss: if you put down <strong>less than 10%</strong>, FHA mortgage insurance lasts
            the <strong>life of the loan</strong>. Put down <strong>10% or more</strong> and it drops off after{" "}
            <strong>11 years</strong>. By contrast, a conventional loan&rsquo;s PMI can be <strong>cancelled at ~20%
            equity</strong>. That&rsquo;s the key FHA-vs-conventional decision &mdash; and a reason many FHA buyers
            refinance to conventional once they have equity.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Ignore any claim that FHA annual MIP was cut to 0.30% in 2026 &mdash; that&rsquo;s a misreading of a HUD
            multifamily letter. The current rate is 0.55%.
          </p>
        </>
      ),
    },
    {
      heading: "Stack FHA with $10,000 in down-payment help (MSHDA)",
      body: (
        <>
          <p>
            Here&rsquo;s the move most Michigan first-time buyers don&rsquo;t realize they can make: pair an FHA loan
            with <strong>MSHDA&rsquo;s MI 10K DPA</strong> &mdash; up to <strong>$10,000</strong> toward your down
            payment and closing costs. It&rsquo;s a <strong>0% interest, no-monthly-payment</strong> loan you repay
            only when you sell, refinance, or pay off the home. Combine it with FHA&rsquo;s 3.5% down and your
            out-of-pocket can be remarkably small.
          </p>
          <p>
            MSHDA requires a <strong>640 credit score</strong>, a short <strong>homebuyer-education course</strong>,
            income within the program limits (roughly $104,800 for a 1&ndash;2 person household in non-targeted
            Oakland, Macomb, or Wayne County, higher in targeted areas &mdash; confirm the current limit), and a
            purchase price under <strong>$566,355</strong>. Full details on our{" "}
            <a href="/michigan-down-payment-assistance" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>down-payment assistance page</a>{" "}
            and the{" "}
            <a href="/first-time-home-buyer-programs-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>first-time buyer programs guide</a>.
          </p>
        </>
      ),
    },
    {
      heading: "FHA vs. conventional, VA & USDA",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>FHA:</strong> 3.5% down, credit from 580, flexible &mdash; but mortgage insurance usually for the life of the loan. Best for lower credit or thin savings.</li>
            <li><strong>Conventional 97 / HomeReady / Home Possible:</strong> as little as 3% down; PMI is <strong>cancellable</strong> at ~20% equity. Better if your credit is strong (usually 620+) &mdash; income limits apply to the HomeReady/Home Possible versions.</li>
            <li><strong>VA loans:</strong> 0% down and no monthly mortgage insurance for eligible veterans, active duty, and surviving spouses. If you qualify, this usually beats FHA.</li>
            <li><strong>USDA Rural Development:</strong> 0% down in USDA-eligible rural areas (much of outstate Michigan), with household-income limits. Not for the dense Detroit metro core.</li>
          </ul>
          <p>
            There&rsquo;s no single &ldquo;best&rdquo; loan &mdash; it depends on your credit, savings, and the home.
            We&rsquo;ll connect you with a trusted local lender who runs the numbers both ways, free.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Michigan FHA loan questions",
  faqs: [
    {
      question: "What credit score do you need for an FHA loan in Michigan?",
      answer:
        "Officially, 580 or higher qualifies you for FHA's 3.5% down payment, and 500–579 qualifies with 10% down. In practice, many Michigan lenders apply their own overlay and prefer a score around 620–640. A higher score generally means an easier approval and better pricing.",
    },
    {
      question: "How much down payment do you need for an FHA loan in Michigan?",
      answer:
        "3.5% of the purchase price with a 580+ credit score (10% if your score is 500–579). On a $250,000 home that's $8,750. The down payment can come from a gift or a down-payment-assistance program like MSHDA's MI 10K DPA, which provides up to $10,000.",
    },
    {
      question: "What is the FHA loan limit in Michigan for 2026?",
      answer:
        "$541,287 for a single-family home — and it's the same in every Michigan county, because the state has no high-cost areas. Multi-unit limits are higher: $693,050 (2-unit), $837,700 (3-unit), and $1,041,125 (4-unit). These apply to loans with case numbers assigned on or after January 1, 2026.",
    },
    {
      question: "Can I use an FHA loan with Michigan down-payment assistance?",
      answer:
        "Yes. A very common combination is an FHA loan paired with MSHDA's MI 10K DPA, which provides up to $10,000 toward your down payment and closing costs as a 0% interest, deferred loan. Between FHA's low 3.5% down and the assistance, many first-time buyers get in with very little out of pocket.",
    },
    {
      question: "Does FHA mortgage insurance ever go away?",
      answer:
        "It depends on your down payment. If you put down less than 10%, FHA mortgage insurance (MIP) lasts the life of the loan. If you put down 10% or more, it drops off after 11 years. Many FHA buyers refinance into a conventional loan once they reach about 20% equity, because conventional PMI can be cancelled.",
    },
    {
      question: "Is an FHA loan or a conventional loan better in Michigan?",
      answer:
        "FHA is usually better if your credit is lower (from 580) or your savings are thin, thanks to the 3.5% down and flexible underwriting. A conventional loan (as little as 3% down) is often better with stronger credit because its PMI can be cancelled at ~20% equity, while FHA mortgage insurance typically stays for the life of the loan. A good lender will price both for you.",
    },
  ],
  related: [
    { href: "/first-time-home-buyer-programs-michigan", label: "Michigan first-time buyer programs" },
    { href: "/michigan-down-payment-assistance", label: "$10K down-payment assistance (MSHDA)" },
    { href: "/home-affordability-calculator", label: "Home affordability calculator" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs, explained" },
  ],
  ctaHeading: "See what you qualify for — free",
  ctaBody: (
    <>
      We&rsquo;ll connect you with a trusted Michigan lender to check your FHA, MSHDA, and conventional options,
      then show you homes in your range. No pressure, no cost &mdash; just a clear plan to get you into a home.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to us about getting pre-approved" },
  metaTitle: "Michigan FHA Loans (2026): Requirements, Limits, Down Payment & MIP",
  metaDescription:
    "Michigan FHA loans explained for 2026: 3.5% down with a 580 credit score, the $541,287 statewide loan limit, how MIP works (1.75% upfront + 0.55% annual), stacking FHA with MSHDA's $10K down-payment assistance, and FHA vs. conventional, VA & USDA.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
