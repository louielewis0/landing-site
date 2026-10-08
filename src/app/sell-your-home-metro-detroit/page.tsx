import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";
import { company, googleReviews } from "@/lib/config";

const data: GuidePageData = {
  slug: "sell-your-home-metro-detroit",
  crumbLabel: "Sell Your Home",
  eyebrow: "Sell with Real Estate Market Center · Metro Detroit",
  h1: (
    <>
      Sell your Metro Detroit home for{" "}
      <span style={{ color: "var(--s-gold)" }}>more</span> — with less stress
    </>
  ),
  h1Text:
    "Sell Your Home in Metro Detroit — Pricing, Marketing & What It Costs | Real Estate Market Center",
  sub: (
    <>
      An independent luxury brokerage led by broker-owner Sundus Lewis — 20+ years, $100M+
      sold, and a 5.0★ rating across 70+ Google reviews. Real local comps, full-service
      marketing, and a pricing strategy built to get you the strongest net result the market
      will bear.
    </>
  ),
  bullets: [
    "Priced on real local comps — not a guess",
    "Full-service marketing, start to finish",
    "20+ years · $100M+ sold · 5.0★ / 70+ reviews",
  ],
  publishedISO: "2026-10-08",
  publishedLabel: "October 8, 2026",
  sections: [
    {
      heading: "Start with the one number that matters: what your home is worth today",
      body: (
        <>
          <p>
            Every good sale starts with an honest price. Overprice and the home sits, goes stale,
            and ultimately sells for less; underprice and you leave money on the table. We price
            on <strong>recorded comparable sales from the last 90 days on your street and in your
            neighborhood</strong> — then adjust for condition, updates, and what buyers are
            actually paying right now.
          </p>
          <p>
            Start with a free, no-obligation valuation: an instant estimate from recorded-sale
            data, followed by a broker-verified range within 24 hours.{" "}
            <a href="/home-value">Get your home&rsquo;s value &rarr;</a>
          </p>
        </>
      ),
    },
    {
      heading: "How we sell homes for more: the Real Estate Market Center system",
      body: (
        <>
          <p>
            Getting the most for your home isn&rsquo;t luck — it&rsquo;s a repeatable process.
            Here&rsquo;s exactly how we run it:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 12 }}>
            <li>
              <strong>Strategic pricing.</strong> A comparable-sales analysis sets a price that
              drives competition and showings in the critical first two weeks — when buyer
              attention and offer strength peak.
            </li>
            <li>
              <strong>Prep &amp; presentation.</strong> A walkthrough with a punch list of the
              high-ROI fixes and staging moves that actually move the needle — we tell you what&rsquo;s
              worth doing and, just as importantly, what isn&rsquo;t.
            </li>
            <li>
              <strong>Professional marketing.</strong> High-quality photography, a compelling
              listing, and full MLS syndication to Zillow, Realtor.com, Redfin and the portals
              where buyers actually search — plus targeted social and our own channels.
            </li>
            <li>
              <strong>Proactive buyer outreach.</strong> We don&rsquo;t just list and wait. We work
              our buyer network and the agent community directly to put your home in front of the
              right people fast.
            </li>
            <li>
              <strong>Hard negotiation.</strong> 20+ years of deal experience on your side of the
              table — on price, contingencies, inspection items, and timing — to protect your net.
            </li>
            <li>
              <strong>Managed to the closing table.</strong> Appraisal, title, and inspection
              coordination handled, with clear communication the whole way so there are no
              surprises.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "What it actually costs to sell a home in Michigan",
      body: (
        <>
          <p>
            Straight answer, no surprises. In Michigan the typical seller costs are:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>State &amp; county transfer tax</strong> — about <strong>$8.60 per $1,000</strong> of
              sale price (0.86%), customarily paid by the seller in Michigan.
            </li>
            <li>
              <strong>Owner&rsquo;s title insurance</strong> — customarily a seller cost in Michigan,
              scaled to sale price.
            </li>
            <li>
              <strong>Real estate commission</strong> — negotiable, and (post-2024 rule changes)
              increasingly negotiated separately for each side. We&rsquo;ll walk you through your
              options transparently before you sign anything.
            </li>
            <li>
              <strong>Prorated property taxes, any seller concessions, and payoff of your
              mortgage</strong> — netted out at closing.
            </li>
          </ul>
          <p>
            Want your real bottom line? Run your numbers on the{" "}
            <a href="/home-sale-proceeds-calculator">net proceeds calculator</a> — or if you&rsquo;re
            weighing keeping it as a rental, the{" "}
            <a href="/sell-or-rent-calculator">sell-or-rent calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "How long it takes — and the step-by-step timeline",
      body: (
        <>
          <p>
            In today&rsquo;s Metro Detroit market, well-priced, well-prepped homes are still selling
            in roughly <strong>two to four weeks</strong> of market time, then another ~30–45 days to
            close. The path:
          </p>
          <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>Valuation &amp; pricing strategy (days 1–3)</li>
            <li>Prep, photography &amp; listing launch (week 1)</li>
            <li>Showings &amp; offers (weeks 1–3)</li>
            <li>Negotiate &amp; accept the strongest offer</li>
            <li>Inspection, appraisal &amp; title (weeks 4–7)</li>
            <li>Close &amp; get your proceeds</li>
          </ol>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Timelines vary with price point, condition, and season — the luxury tier and unique
            properties can take longer. We&rsquo;ll give you an honest estimate for your specific home.
          </p>
        </>
      ),
    },
    {
      heading: "Why sell with an independent luxury brokerage",
      body: (
        <>
          <p>
            At a big franchise, your listing is one of hundreds on a desk. With{" "}
            {company.name}, you work directly with broker-owner <strong>Sundus Lewis</strong> — the
            person whose name is on the door and whose reputation rides on every sale. That means
            senior-level attention, faster decisions, and marketing tailored to your home rather
            than run through a corporate template.
          </p>
          <p>
            It&rsquo;s a track record of <strong>20+ years, $100M+ in closed sales, and 500+ homes</strong>{" "}
            — paired with a <strong>5.0★ rating across 70+ Google reviews</strong>. For luxury and
            move-up sellers especially, that combination of discretion, local expertise, and
            hands-on representation is the difference.
          </p>
        </>
      ),
    },
    {
      heading: "What sellers say",
      body: (
        <>
          <div style={{ display: "grid", gap: 14 }}>
            {googleReviews.slice(0, 3).map((r) => (
              <blockquote
                key={r.name}
                style={{
                  margin: 0,
                  padding: "16px 18px",
                  background: "var(--cream-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--s-radius)",
                }}
              >
                <div style={{ color: "var(--s-gold)", fontSize: 14, letterSpacing: 2, marginBottom: 6 }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>&ldquo;{r.text}&rdquo;</p>
                <cite style={{ display: "block", marginTop: 8, fontStyle: "normal", fontSize: 13, color: "var(--s-muted)" }}>
                  — {r.name}, via Google
                </cite>
              </blockquote>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 12 }}>
            Real, verbatim 5-star Google reviews for {company.name}.{" "}
            <a href="/reviews">Read more &rarr;</a>
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Selling in Metro Detroit — common questions",
  faqs: [
    {
      question: "How do I sell my house in Michigan?",
      answer:
        "Start with an accurate valuation based on recent comparable sales, prepare and professionally market the home, price it to drive competition in the first two weeks, negotiate the strongest offer, then manage inspection, appraisal, and title through to closing. Working with an experienced local broker handles each step and typically protects your net. Real Estate Market Center offers a free, no-obligation home valuation to begin.",
    },
    {
      question: "How much does it cost to sell a home in Michigan?",
      answer:
        "Typical Michigan seller costs include state and county transfer tax of about $8.60 per $1,000 of sale price (0.86%), owner's title insurance, a negotiable real estate commission, prorated property taxes, any agreed concessions, and payoff of your existing mortgage. Use the net proceeds calculator on marketcenterrealty.com to estimate your actual bottom line.",
    },
    {
      question: "How long does it take to sell a home in Metro Detroit?",
      answer:
        "In the current market, well-priced and well-prepared homes are generally selling within about two to four weeks of market time, followed by roughly 30 to 45 days to close. Luxury and unique properties can take longer. Pricing and presentation are the biggest levers on speed.",
    },
    {
      question: "Should I sell my home now or rent it out?",
      answer:
        "It depends on your equity, the rent your home would command, your tax situation, and your goals. The sell-or-rent calculator on marketcenterrealty.com compares the two side by side, and we're happy to talk through the trade-offs for your specific property.",
    },
    {
      question: "What is my home worth?",
      answer:
        "The most accurate answer comes from recent comparable sales adjusted for your home's condition and updates. Get a free instant estimate plus a broker-verified range within 24 hours at marketcenterrealty.com/home-value.",
    },
  ],
  related: [
    { href: "/home-value", label: "What's my home worth? (free valuation)" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator" },
    { href: "/sell-or-rent-calculator", label: "Sell or rent calculator" },
    { href: "/metro-detroit-housing-market-update", label: "Metro Detroit market update" },
    { href: "/best-real-estate-agent-metro-detroit", label: "Best real estate agent in Metro Detroit" },
  ],
  ctaHeading: "Find out what your home is worth — free",
  ctaBody: (
    <>
      An instant estimate from recorded sales, then a broker-verified number from a local team
      that knows your street. No obligation, ever.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free home valuation" },
  metaTitle:
    "Sell Your Home in Metro Detroit — Pricing, Marketing & Costs | Real Estate Market Center",
  metaDescription:
    "Sell your Metro Detroit home for more with Real Estate Market Center — independent luxury brokerage, 20+ years, $100M+ sold, 5.0★/70+ reviews. Real comps, full-service marketing, honest costs. Free home valuation.",
};

export const metadata: Metadata = guideMetadata(data);

export default function SellYourHomePage() {
  return <GuidePage data={data} />;
}
