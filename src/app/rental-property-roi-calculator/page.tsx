import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "rental-property-roi-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Rental Property ROI & Cap Rate Calculator (Metro Detroit)",
  description:
    "Free rental property calculator for Metro Detroit investors. Instantly get cap rate, cash-on-cash return, monthly cash flow, and NOI on any deal. Built by a local brokerage that finds cash-flowing rentals and manages them.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Rental Property ROI Calculator"
      eyebrow="Investor tool · Metro Detroit"
      h1={
        <>
          Is this rental a <span style={{ color: "var(--s-gold)" }}>good deal</span>?
        </>
      }
      h1Text="Rental Property ROI & Cap Rate Calculator (Metro Detroit)"
      sub="Underwrite any Metro Detroit rental in seconds. Enter the price, rent, and expenses to get cap rate, cash-on-cash return, monthly cash flow, and NOI — using the same standard formulas serious investors use."
      bullets={["Cap rate + cash-on-cash + cash flow", "Standard NOI math", "Instant — no email required"]}
      appDescription="A free rental property calculator that computes cap rate, cash-on-cash return, monthly cash flow, and net operating income for real estate investors in Metro Detroit."
      sections={[
        {
          heading: "The numbers that actually matter on a rental",
          body: (
            <>
              <p>
                A rental either works on paper or it doesn&rsquo;t. Four figures tell you almost everything, and this
                calculator gives you all four instantly:
              </p>
              <p>
                <strong>Cap rate = NOI ÷ purchase price.</strong> Net operating income is your rent minus operating
                expenses, <em>not</em> counting the mortgage. Cap rate lets you compare deals independent of how they&rsquo;re
                financed. In Metro Detroit, cap rates commonly land in the mid-single digits to low double digits depending
                on the neighborhood and condition.
              </p>
              <p>
                <strong>Cash-on-cash = annual cash flow ÷ cash invested.</strong> This one <em>does</em> count the
                mortgage. It&rsquo;s the return on the actual money you put in (down payment + closing + rehab) — the number
                that tells you how hard your cash is working.
              </p>
              <p>
                <strong>Monthly cash flow.</strong> What&rsquo;s left every month after every expense and the mortgage. Positive
                is the goal; a small negative can still make sense in an appreciating area, but go in with your eyes open.
              </p>
              <p>
                <strong>The 1% rule.</strong> A quick screen: monthly rent ÷ price ≥ 1%. It&rsquo;s a filter, not a verdict —
                many good Metro Detroit deals sit just under it and win on appreciation and equity paydown.
              </p>
            </>
          ),
        },
        {
          heading: "Realistic expense assumptions",
          body: (
            <>
              <p>
                New investors almost always underestimate expenses and overstate returns. The defaults here reflect
                industry rules of thumb you should keep unless you have better local data: <strong>vacancy 5–8%</strong>,{" "}
                <strong>property management 8–10%</strong> of collected rent, plus separate maintenance and CapEx reserves.
                A common shorthand — the <strong>50% rule</strong> — assumes operating expenses eat roughly half of gross
                rent before the mortgage.
              </p>
              <p>
                One Michigan-specific trap: property taxes on a rental are usually <strong>higher</strong> than the previous
                owner paid. Michigan caps a home&rsquo;s taxable value while it&rsquo;s owned, then it &ldquo;uncaps&rdquo; to
                roughly half of market value when the property sells — and rentals don&rsquo;t get the owner-occupant
                Principal Residence Exemption (about 18 mills of school tax). Budget for the higher, non-homestead bill.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Rental property ROI questions"
      faqs={[
        {
          question: "What is a good cap rate for a rental property in Metro Detroit?",
          answer:
            "It depends on the neighborhood and risk. As a rough guide, cap rates in the mid-single digits (5–7%) are common for stable, lower-risk areas, while higher cap rates (8%+) usually come with older properties, more management, or higher-risk areas. Cap rate alone isn't the whole picture — pair it with cash-on-cash return and your appreciation outlook. Enter a real deal above to see where it lands.",
        },
        {
          question: "How is cap rate different from cash-on-cash return?",
          answer:
            "Cap rate = NOI ÷ purchase price and ignores financing, so it compares properties on equal footing. Cash-on-cash = annual pre-tax cash flow ÷ total cash invested and includes your mortgage, so it measures the return on the money you actually put in. A property can have a modest cap rate but a strong cash-on-cash return once leverage is applied — the calculator shows both.",
        },
        {
          question: "What expenses should I include when analyzing a rental?",
          answer:
            "Everything except the mortgage goes into NOI: property taxes, insurance, property management, maintenance, CapEx reserves, vacancy loss, and any utilities or HOA you cover. The mortgage (debt service) is subtracted afterward to get cash flow. Skipping vacancy, maintenance, and CapEx is the most common way new investors overestimate a deal — the calculator includes them by default.",
        },
        {
          question: "Why are property taxes higher on a rental in Michigan?",
          answer:
            "Two reasons. First, Michigan caps a property's taxable value while it's owned and 'uncaps' it to about 50% of market value when it sells, so a new owner often pays more than the seller did. Second, rentals don't qualify for the Principal Residence Exemption (the ~18-mill homestead exemption for owner-occupants), so the millage rate is higher. Always underwrite with the non-homestead tax figure.",
        },
        {
          question: "Do you help investors find and manage rentals?",
          answer:
            "Yes. Real Estate Market Center works with Metro Detroit investors on acquisition (finding cash-flowing properties, underwriting deals, 1031 exchanges) and offers property management if you'd rather be hands-off. Run your numbers above, then send us your target returns and we'll surface properties that fit.",
        },
      ]}
      ctaHeading="Want deals that actually cash flow?"
      ctaBody="Send us your target returns and we'll surface Metro Detroit rentals that hit them — and underwrite any specific property you're weighing. Prefer hands-off? We manage rentals too."
      ctaPrimary={{ href: "/contact", label: "Talk to an investment specialist" }}
    >
      <Calculator />
    </CalcPage>
  );
}
