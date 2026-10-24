import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const SRC = { target: "_blank", rel: "noopener noreferrer" } as const;

const data: GuidePageData = {
  slug: "should-i-buy-or-sell-now-metro-detroit",
  crumbLabel: "Buy or Sell Now?",
  eyebrow: "Market stance · Metro Detroit",
  h1: (
    <>
      Should you <span style={{ color: "var(--s-gold)" }}>buy or sell now</span> in Metro Detroit?
    </>
  ),
  h1Text: "Should You Buy or Sell a Home Now in Metro Detroit? (2026)",
  sub: (
    <>
      Our honest take &mdash; no hype, no &ldquo;now is always the time to buy.&rdquo; Here&rsquo;s where the
      Metro Detroit market actually stands right now, and a simple framework to decide what&rsquo;s right for
      <em> your</em> situation.
    </>
  ),
  bullets: [
    "30-year rates are ~7.3% — elevated, and forecast to stay there into 2027",
    "Metro Detroit prices are still rising, with more choice than a year ago",
    "The right answer depends on your timeline — not on timing the market",
  ],
  publishedISO: "2026-10-24",
  publishedLabel: "October 24, 2026",
  sections: [
    {
      heading: "The honest answer",
      body: (
        <>
          <p>
            There is no universal &ldquo;yes&rdquo; or &ldquo;no.&rdquo; Anyone who tells you now is always
            the time to buy (or sell) is selling, not advising. The right move depends on <strong>your
            timeline, your finances, and why you&rsquo;re moving</strong> &mdash; not on guessing the exact
            bottom for rates or prices, which almost nobody does well.
          </p>
          <p>
            So this page does two things: gives you a clear, sourced read on where the Metro Detroit
            market is <em>right now</em>, and then a short framework to decide. Figures below are current
            as of <strong>late October 2026</strong>; we review this page as the market moves.
          </p>
        </>
      ),
    },
    {
      heading: "Where the market actually is (late October 2026)",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Mortgage rates: ~7.3%.</strong> The 30-year fixed averaged about{" "}
              <strong>7.32%</strong> in late October 2026, easing slightly from the prior week (
              <a href="https://www.freddiemac.com/pmms" {...SRC}>Freddie Mac</a>). Elevated &mdash; but
              roughly flat, not spiking.
            </li>
            <li>
              <strong>Prices are still rising here.</strong> Metro Detroit was among the strongest U.S.
              metros for year-over-year price growth in Redfin&rsquo;s October 2026 data, with the local
              median in the low-$300,000s (
              <a href="https://www.redfin.com/city/5665/MI/Detroit/housing-market" {...SRC}>Redfin</a>).
              Detroit has stayed affordable relative to the national median, which keeps demand steady.
            </li>
            <li>
              <strong>More choice than a year ago.</strong> Inventory has climbed well off its lows, and
              homes are taking around <strong>46 days</strong> to sell &mdash; so buyers have more room to
              breathe and negotiate than during the 2021&ndash;22 frenzy (Redfin, Oct 2026).
            </li>
            <li>
              <strong>Rates aren&rsquo;t expected to fall off a cliff.</strong> Forecasts disagree &mdash;
              Fannie Mae expects the 30-year to stay in the mid-7s through 2027, while the Mortgage Bankers
              Association is more optimistic (
              <a href="https://www.cnbc.com/2026/10/14/fannie-mae-sharply-raises-mortgage-rate-forecast-for-2027-.html" {...SRC}>
                CNBC
              </a>
              ) &mdash; but almost no one expects a return to sub-6% before 2028.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "If you're buying",
      body: (
        <>
          <p>
            <strong>The case for now:</strong> national price growth has cooled to near flat, so you&rsquo;re
            not racing appreciation the way buyers were a few years ago. There&rsquo;s more inventory, less
            competition, and real negotiating room &mdash; including asking the seller for concessions. And
            if rates do drop later, you can refinance; you can&rsquo;t go back and buy the house someone else
            got.
          </p>
          <p>
            <strong>The honest caution:</strong> at ~7.3%, the monthly payment is the real hurdle, not the
            price. And since forecasters don&rsquo;t expect big rate relief before 2028, &ldquo;waiting for
            rates&rdquo; could mean renting for years while prices keep ticking up here. The move is to
            focus on the two numbers that actually matter &mdash; your <strong>cash to close</strong> and
            your <strong>monthly payment</strong> &mdash; and only buy if the payment is comfortable at
            today&rsquo;s rate. Run it with the{" "}
            <a href="/home-affordability-calculator">affordability calculator</a> and the{" "}
            <a href="/rent-vs-buy-calculator">rent vs. buy calculator</a> before you decide.
          </p>
        </>
      ),
    },
    {
      heading: "If you're selling",
      body: (
        <>
          <p>
            It&rsquo;s a reasonably strong time to sell in Metro Detroit: prices are still near their highs
            and demand is steady because the area remains affordable. But higher rates make buyers{" "}
            <strong>pickier and more price-sensitive</strong> &mdash; homes take around 46 days, not 4 &mdash;
            so <strong>pricing right and showing well</strong> matter far more than they did in the frenzy.
            Overpricing in this market just means sitting, then cutting.
          </p>
          <p>
            One thing people forget: if you&rsquo;re selling <em>and</em> buying, you&rsquo;ll face the same
            rates and prices on your next home &mdash; so plan the two as a single move, not two separate
            decisions. Start with{" "}
            <a href="/home-value">your home&rsquo;s current value</a> and your{" "}
            <a href="/home-sale-proceeds-calculator">net proceeds</a>, and see{" "}
            <a href="/sell-your-home-metro-detroit">how to sell for more</a>.
          </p>
        </>
      ),
    },
    {
      heading: "How to actually decide",
      body: (
        <>
          <p>Skip the market-timing guessing game. Answer these instead:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>How long will you stay?</strong> Planning to be there 5+ years makes short-term price
              and rate wiggles mostly irrelevant. Two years? Renting may win.
            </li>
            <li>
              <strong>Is the monthly payment comfortable at today&rsquo;s rate</strong> &mdash; not at some
              hoped-for future rate? If yes, timing matters much less.
            </li>
            <li>
              <strong>Do you actually need to move?</strong> A job, a growing family, or needing space is a
              better reason to act than a forecast.
            </li>
            <li>
              <strong>Are you buying and selling at once?</strong> Then high rates and prices largely cancel
              out &mdash; you&rsquo;re trading in the same market on both ends.
            </li>
            <li>
              <strong>Don&rsquo;t try to nail the bottom.</strong> The people who &ldquo;waited for the
              perfect time&rdquo; in 2020&ndash;23 mostly paid more later. Decide on your life, not the
              headlines.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqHeading: "Buying or selling now — common questions",
  faqs: [
    {
      question: "Will mortgage rates go down in 2026 or 2027?",
      answer:
        "Probably not dramatically. As of late October 2026 the 30-year fixed is around 7.3% (Freddie Mac). Fannie Mae forecasts rates staying in the mid-7s through 2027, while the Mortgage Bankers Association is more optimistic — but almost no forecaster expects a return to sub-6% before 2028. Waiting for a big drop is a gamble.",
    },
    {
      question: "Are Metro Detroit home prices going up or down?",
      answer:
        "Still rising. In Redfin's October 2026 data, Metro Detroit was among the strongest U.S. metros for year-over-year price growth, with the local median in the low-$300,000s. The area stays affordable relative to the national median, which keeps demand steady.",
    },
    {
      question: "Should I wait for rates to drop before buying?",
      answer:
        "Maybe not. Forecasters don't expect major rate relief before 2028, and Metro Detroit prices are still climbing — so waiting can mean renting for years and paying more later. A common approach: buy when the monthly payment is comfortable at today's rate, then refinance if rates fall. Focus on the payment, not the headline rate.",
    },
    {
      question: "Is now a good time to sell a house in Metro Detroit?",
      answer:
        "It's a reasonably strong time — prices are near highs and demand is steady. But higher rates make buyers pricier-sensitive and homes take around 46 days to sell, so pricing correctly and presenting the home well matter more than they did during the 2021–22 boom.",
    },
  ],
  related: [
    { href: "/home-value", label: "What's my home worth?" },
    { href: "/home-affordability-calculator", label: "Affordability calculator (buyers)" },
    { href: "/rent-vs-buy-calculator", label: "Rent vs. buy calculator" },
    { href: "/metro-detroit-housing-market-update", label: "Metro Detroit market update" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/who-pays-realtor-commission-michigan", label: "Who pays realtor commission now?" },
  ],
  ctaHeading: "Want a straight answer for your situation?",
  ctaBody: (
    <>
      We&rsquo;ll give you an honest read &mdash; whether that&rsquo;s &ldquo;go for it&rdquo; or &ldquo;wait
      six months&rdquo; &mdash; based on your numbers and your timeline, not a sales pitch.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local expert" },
  metaTitle: "Should You Buy or Sell Now in Metro Detroit? (2026 Honest Take)",
  metaDescription:
    "An honest, sourced take on whether to buy or sell a home now in Metro Detroit: rates ~7.3%, prices still rising, more inventory. Plus a simple framework to decide what's right for your timeline — no hype.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
