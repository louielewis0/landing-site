import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "rent-vs-buy-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Rent vs. Buy Calculator (Metro Detroit) — When Does Buying Win?",
  description:
    "Free rent vs. buy calculator for Metro Detroit. Find the break-even year when buying a home beats renting, based on your rent, home price, down payment, and how long you'll stay. Built by a local brokerage.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Rent vs. Buy Calculator"
      eyebrow="Buyer tool · Metro Detroit"
      h1={
        <>
          Should you keep renting, or <span style={{ color: "var(--s-gold)" }}>buy</span>?
        </>
      }
      h1Text="Rent vs. Buy Calculator (Metro Detroit)"
      sub="There's a year when buying stops costing more than renting and starts paying you back. This calculator finds that break-even point for your numbers — so the decision is math, not a gut feeling."
      bullets={["Finds your break-even year", "Counts equity + appreciation", "Instant — no email required"]}
      appDescription="A free rent vs. buy calculator that finds the break-even year when buying a home becomes cheaper than renting in Metro Detroit, based on rent, home price, financing, and length of stay."
      sections={[
        {
          heading: "Why 'throwing money away on rent' is only half true",
          body: (
            <>
              <p>
                Renting isn&rsquo;t automatically a waste, and buying isn&rsquo;t automatically smart — it depends almost
                entirely on <strong>how long you&rsquo;ll stay</strong>. In the early years, a big chunk of every mortgage
                payment is interest, and you&rsquo;ve paid real closing and selling costs. The longer you own, the more of
                each payment builds equity, and the more appreciation works in your favor.
              </p>
              <p>
                This calculator finds the crossover: the year when the net cost of buying — after you recover your equity
                and any appreciation at sale — drops below what you&rsquo;d have spent renting. Before that year, renting
                is cheaper. After it, buying wins, often by a lot.
              </p>
            </>
          ),
        },
        {
          heading: "The short-stay rule of thumb",
          body: (
            <>
              <p>
                A widely used guideline: if you&rsquo;ll be in the home <strong>less than about 3–5 years</strong>, renting
                often wins because you won&rsquo;t own long enough to overcome the transaction costs. Beyond 5–7 years,
                buying usually pulls clearly ahead. The exact number depends on your local price-to-rent ratio, your rate,
                and appreciation — which is why a calculator beats a rule of thumb.
              </p>
              <p>
                Metro Detroit&rsquo;s relatively affordable prices and steady appreciation tend to produce earlier
                break-even points than expensive coastal markets. Run your own numbers above to see yours.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Rent vs. buy questions"
      faqs={[
        {
          question: "Is it better to rent or buy in Metro Detroit?",
          answer:
            "It comes down to how long you'll stay. If you'll be in the home more than about 5 years, buying usually beats renting once you count equity and appreciation. For a shorter stay, renting is often cheaper because you won't own long enough to recover closing and selling costs. Metro Detroit's affordable prices tend to produce earlier break-even points — enter your numbers above to find yours.",
        },
        {
          question: "How does the calculator decide when buying wins?",
          answer:
            "It compares the cumulative cost of renting against the net cost of buying year by year. The net cost of buying is everything you pay in (down payment, mortgage, taxes, insurance, maintenance) minus what you get back when you sell — your home's value plus appreciation, minus the remaining loan and about 8% in selling costs. The first year buying's net cost drops below renting is your break-even year.",
        },
        {
          question: "How much do I need to buy instead of rent?",
          answer:
            "Less than most renters think. Conventional loans can require as little as 3–5% down, FHA 3.5%, and VA/USDA 0% if you qualify. Michigan first-time buyer programs (like MSHDA) offer down-payment assistance on top of that. The bigger barrier is usually knowing your options — which is exactly what our first-time buyer roadmap covers.",
        },
        {
          question: "Does buying build wealth faster than renting?",
          answer:
            "Over a long enough hold, usually yes — through two forces: you pay down your loan (forced savings that becomes equity) and the home appreciates. Renters can build comparable wealth only if they consistently invest the difference. For most people, the discipline of a mortgage plus appreciation makes homeownership the more reliable path once they're past the break-even year.",
        },
      ]}
      ctaHeading="If buying wins, we'll make it simple"
      ctaBody="Get a step-by-step first-time buyer roadmap, the Michigan assistance programs you may qualify for, and homes in your range — from a local team that does this every day."
      ctaPrimary={{ href: "/first-time-home-buyer-programs-michigan", label: "See Michigan buyer programs" }}
    >
      <Calculator />
    </CalcPage>
  );
}
