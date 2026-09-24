import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "home-affordability-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "How Much House Can I Afford in Metro Detroit? | Affordability Calculator",
  description:
    "Free home affordability calculator for Metro Detroit. See how much house you can afford based on your income, debts, and down payment — with real Oakland, Macomb, and Wayne County property tax rates built in.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Home Affordability Calculator"
      eyebrow="Buyer tool · Metro Detroit"
      h1={
        <>
          How much house can you <span style={{ color: "var(--s-gold)" }}>actually afford</span>?
        </>
      }
      h1Text="Home Affordability Calculator (Metro Detroit)"
      sub="Enter your income, debts, and down payment to see your realistic price range — with real Oakland, Macomb, and Wayne County property-tax rates built in, using the same 28/36 rule lenders start from."
      bullets={["Real MI county tax rates", "28/36 DTI rule + PMI", "Instant — no email required"]}
      appDescription="A free home affordability calculator that estimates the maximum home price a buyer can afford in Metro Detroit based on income, debts, down payment, and local property taxes using the 28/36 debt-to-income rule."
      sections={[
        {
          heading: "How lenders decide what you can afford",
          body: (
            <>
              <p>
                Most lenders start with the <strong>28/36 rule</strong>. Your total monthly housing payment (principal,
                interest, taxes, and insurance — &ldquo;PITI&rdquo;) should stay at or below <strong>28% of your gross
                monthly income</strong>, and all your debt combined — housing plus car, student loans, and credit cards —
                should stay at or below <strong>36%</strong>. This calculator finds the highest home price that keeps you
                inside both limits.
              </p>
              <p>
                It&rsquo;s a starting guideline, not a hard ceiling. Depending on your credit and loan program, some
                lenders approve back-end DTI as high as ~50%. But borrowing to your absolute max is rarely comfortable —
                the 28/36 number is a sane place to anchor.
              </p>
            </>
          ),
        },
        {
          heading: "Why Metro Detroit property taxes matter to your budget",
          body: (
            <>
              <p>
                Property taxes are a bigger swing factor here than buyers expect, and they vary by county — roughly{" "}
                <strong>1.23% in Oakland, 1.28% in Macomb, and 1.51% in Wayne</strong> as effective rates. On a $350,000
                home that&rsquo;s a difference of nearly $1,000 a year between Oakland and Wayne, which directly changes how
                much home fits your monthly budget. The calculator pre-fills the rate by county so your number is realistic.
              </p>
              <p>
                One thing to plan for: Michigan caps a home&rsquo;s taxable value while it&rsquo;s owned, then the value
                &ldquo;uncaps&rdquo; when it sells. That means your tax bill as the new owner is often <strong>higher</strong>{" "}
                than what the seller was paying — don&rsquo;t budget off the listing&rsquo;s current tax line. If you&rsquo;ll
                live there, the Principal Residence Exemption lowers the rate versus a rental.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Home affordability questions"
      faqs={[
        {
          question: "How much house can I afford on my salary?",
          answer:
            "A common rule of thumb is 3–4× your gross annual income, but the accurate answer depends on your monthly debts, down payment, interest rate, and local property taxes. This calculator applies the 28/36 debt-to-income rule with real Metro Detroit tax rates to give you a specific number rather than a rough multiple. Enter your details above to see it.",
        },
        {
          question: "What is the 28/36 rule?",
          answer:
            "It's the debt-to-income guideline most lenders start with. Your monthly housing payment should be no more than 28% of your gross monthly income (the 'front-end' ratio), and your total monthly debt including housing should be no more than 36% (the 'back-end' ratio). Staying within both keeps your mortgage comfortable and improves your approval odds.",
        },
        {
          question: "Does the calculator include property taxes and insurance?",
          answer:
            "Yes. It includes principal, interest, property taxes (pre-filled by Metro Detroit county), and homeowners insurance — the full PITI payment — plus PMI if your down payment is under 20% and optional HOA dues. That's what makes the affordability number realistic rather than just a principal-and-interest estimate.",
        },
        {
          question: "How much down payment do I need in Michigan?",
          answer:
            "You don't need 20%. Many buyers use conventional loans with as little as 3–5% down, FHA loans at 3.5%, or VA/USDA loans at 0% down if eligible. Michigan also has first-time buyer programs (like MSHDA) offering down-payment assistance. Putting less than 20% down adds PMI, which this calculator estimates. Ask us about assistance programs — they can change what you can afford.",
        },
        {
          question: "Is this the same as getting pre-approved?",
          answer:
            "No — this is an estimate, not a loan approval. A pre-approval involves a lender verifying your income, credit, and assets and issuing a letter you can shop with. This calculator gets you a realistic target first; when you're ready, we'll connect you with a trusted local lender to confirm your exact number.",
        },
      ]}
      ctaHeading="Ready to see homes in your range?"
      ctaBody="Get a curated list of Metro Detroit homes in your budget and an intro to a trusted lender to lock in your real number. First-time buyer? We'll walk you through every step."
      ctaPrimary={{ href: "/contact", label: "Talk to a buyer's agent" }}
    >
      <Calculator />
    </CalcPage>
  );
}
