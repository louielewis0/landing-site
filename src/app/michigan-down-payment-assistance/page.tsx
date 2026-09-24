import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Checker from "./Checker";

const SLUG = "michigan-down-payment-assistance";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Michigan Down Payment Assistance — Do You Qualify? (MSHDA Checker)",
  description:
    "Free MSHDA eligibility checker. Answer a few questions to see if you qualify for Michigan's MI Home Loan and up to $10,000 in down-payment assistance — with current 2026 income and sales-price limits built in.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Michigan Down Payment Assistance"
      eyebrow="First-time buyer tool · Michigan"
      h1={
        <>
          Do you qualify for <span style={{ color: "var(--s-gold)" }}>$10,000</span> in down-payment help?
        </>
      }
      h1Text="Michigan MSHDA Down Payment Assistance Eligibility Checker"
      sub="Michigan's MSHDA program offers first-time buyers up to $10,000 toward a down payment and closing costs — as a 0% loan you don't repay until you sell or refinance. Answer a few questions to see if you likely qualify."
      bullets={["Up to $10,000 assistance", "Current 2026 MSHDA limits", "Instant — no email required"]}
      appDescription="A free eligibility checker for Michigan's MSHDA MI Home Loan and MI 10K DPA down-payment-assistance program, using current income, credit, and sales-price limits."
      sections={[
        {
          heading: "What MSHDA down-payment assistance actually gives you",
          body: (
            <>
              <p>
                MSHDA — the Michigan State Housing Development Authority — pairs a first mortgage (the{" "}
                <strong>MI Home Loan</strong>) with the <strong>MI 10K DPA</strong>: up to <strong>$10,000</strong> toward
                your down payment, closing costs, and prepaid expenses. The best part is how it&rsquo;s structured — it&rsquo;s
                a <strong>0% interest second loan with no monthly payment</strong>. You don&rsquo;t pay it back until you sell
                the home, refinance, or pay off the first mortgage. For many first-time buyers, this is the difference
                between buying now and waiting years to save.
              </p>
              <p>
                It&rsquo;s available <strong>statewide</strong> (it replaced the old $7,500 program), and it has to be paired
                with a MI Home Loan first mortgage through a MSHDA-participating lender.
              </p>
            </>
          ),
        },
        {
          heading: "Who qualifies in 2026",
          body: (
            <>
              <p>The core requirements, current as of the June 2026 limits:</p>
              <p>
                <strong>First-time buyer</strong> — you haven&rsquo;t owned a home in the last 3 years. Exception: in MSHDA{" "}
                <strong>&ldquo;targeted areas&rdquo;</strong> (including Detroit, Pontiac, Southfield, and others), repeat
                buyers also qualify.
              </p>
              <p>
                <strong>Credit score of at least 640.</strong> <strong>Household income</strong> under MSHDA&rsquo;s limit —
                which varies by county, household size, and whether the area is targeted (roughly $104,800 for a 1–2 person
                household in non-targeted Oakland, Macomb, or Wayne County, and higher in targeted areas). <strong>Purchase
                price</strong> under the statewide limit of <strong>$566,355</strong>. And a short{" "}
                <strong>homebuyer education course</strong>, usually completed online.
              </p>
              <p>
                The checker above applies all of these so you get an instant read — then a participating lender confirms
                your exact numbers.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Michigan down-payment-assistance questions"
      faqs={[
        {
          question: "How much down payment assistance can I get in Michigan?",
          answer:
            "Through MSHDA's MI 10K DPA program, eligible first-time buyers can receive up to $10,000 toward their down payment, closing costs, and prepaid expenses. It's a 0% interest loan with no monthly payment — you repay it only when you sell, refinance, or pay off your mortgage. It must be paired with a MSHDA MI Home Loan.",
        },
        {
          question: "What are the income limits for MSHDA in 2026?",
          answer:
            "Income limits vary by county, household size, and whether the home is in a MSHDA 'targeted area.' For non-targeted Oakland, Macomb, and Wayne counties, the 2026 limit is about $104,800 for a 1–2 person household and $120,520 for 3 or more. Targeted areas allow higher incomes (about $125,760 and $146,720). The checker above applies the right limit based on your answers; a lender confirms the exact figure.",
        },
        {
          question: "Do I have to be a first-time buyer?",
          answer:
            "In most of Michigan, yes — 'first-time' means you haven't owned a home in the past 3 years. But in MSHDA 'targeted areas' (such as Detroit, Pontiac, and Southfield), repeat buyers can also qualify. If you've owned recently, it's worth checking whether the home you want is in a targeted area.",
        },
        {
          question: "What's the maximum home price for MSHDA?",
          answer:
            "As of June 1, 2026, the statewide sales-price limit is $566,355 — a large increase from prior years, which means far more homes now qualify. As long as your purchase price is under that and you meet the income, credit, and first-time requirements, the home's price won't disqualify you.",
        },
        {
          question: "Is this the same as getting approved?",
          answer:
            "No — this checker is guidance, not a loan approval or an official eligibility determination. MSHDA sets the exact limits and a MSHDA-participating lender verifies your income, credit, and the property. Use this to see where you likely stand, then let us connect you with a lender to confirm and get pre-approved.",
        },
      ]}
      ctaHeading="Let's confirm what you qualify for"
      ctaBody="We'll connect you with a MSHDA-participating lender to verify your real numbers and walk you through every step — the programs, the paperwork, and homes in your range. Free, no pressure."
      ctaPrimary={{ href: "/first-time-home-buyer-programs-michigan", label: "Read the full first-time buyer guide" }}
    >
      <Checker />
    </CalcPage>
  );
}
