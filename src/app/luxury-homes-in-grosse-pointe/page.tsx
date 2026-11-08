import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "luxury-homes-in-grosse-pointe",
  crumbLabel: "Luxury Homes in Grosse Pointe",
  eyebrow: "Luxury market guide · Grosse Pointe, MI",
  h1: (
    <>
      Luxury homes in <span style={{ color: "var(--s-gold)" }}>Grosse Pointe, Michigan</span>
    </>
  ),
  h1Text: "Luxury Homes in Grosse Pointe, MI — Lake St. Clair Estates, Prices & the Five Pointes",
  sub: "Grosse Pointe is Metro Detroit's historic old-money luxury market — auto-era estates along Lake St. Clair, Albert Kahn architecture, and a top-ranked school system. Here's how the five Pointes differ, what each price tier buys, and why the waterfront still offers value against Oakland County.",
  publishedISO: "2026-11-08",
  publishedLabel: "November 8, 2026",
  bullets: ["Historic Lake St. Clair estates", "Five distinct Pointes", "Trophy waterfront $2.5M–$8M+"],
  sections: [
    {
      heading: "The Grosse Pointe luxury market at a glance",
      body: (
        <>
          <p>
            Grosse Pointe is where Detroit&rsquo;s automotive fortunes built their lakefront estates a century ago, and
            that legacy still defines the market: grand historic architecture, mature canopy streets, and the trophy
            <strong> Lake St. Clair</strong> frontage along Lakeshore Road. Across the five communities, entry luxury
            generally begins in the <strong>$700Ks</strong> for large renovated historic homes, with premier estates and
            waterfront reaching <strong>$2.5M to $8M and beyond</strong>.
          </p>
          <p>
            For buyers coming from Birmingham or Bloomfield, the headline is <strong>value</strong>: Grosse Pointe
            frequently delivers more historic square footage, larger lots, and genuine lake frontage per dollar than
            comparable Oakland County luxury — with a walkable village lifestyle the estate suburbs can&rsquo;t match.
          </p>
        </>
      ),
    },
    {
      heading: "The five Pointes — how they differ",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Grosse Pointe Shores</strong> — the smallest and wealthiest, a lakefront enclave of estates along Lakeshore Road, home to the Edsel &amp; Eleanor Ford House. Trophy waterfront territory.</li>
            <li><strong>Grosse Pointe Farms</strong> — historic estates, &ldquo;The Hill&rdquo; village shopping, the Country Club of Detroit, and a private lakefront park. The classic old-money address.</li>
            <li><strong>Grosse Pointe Park</strong> — architecturally rich and walkable, with Windmill Pointe waterfront; a magnet for younger luxury buyers who want character and a Detroit-adjacent lifestyle.</li>
            <li><strong>Grosse Pointe (City)</strong> — the most walkable, built around &ldquo;the Village&rdquo; shopping and dining, with in-town luxury homes and condos.</li>
            <li><strong>Grosse Pointe Woods</strong> — the largest and most family-oriented, offering the strongest value and a deep inventory of substantial brick colonials.</li>
          </ul>
        </>
      ),
    },
    {
      heading: "What each price tier buys in Grosse Pointe",
      body: (
        <>
          <p>Indicative tiers — a working map of the market, not a guarantee for any specific home:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>~$700K–$1.2M (entry luxury):</strong> large renovated historic homes, 3,000–5,000 sq ft, in the Farms, Woods, or Park — often with the original millwork, leaded glass, and craftsmanship these homes are known for.</li>
            <li><strong>~$1.2M–$2.5M (estate tier):</strong> premier historic estates near the lake, larger lots, and architect-pedigreed homes (Albert Kahn and his contemporaries).</li>
            <li><strong>~$2.5M–$8M+ (trophy waterfront):</strong> direct Lake St. Clair frontage along Lakeshore Road in the Shores and Farms — 5,000–15,000+ sq ft, private harbors, and the region&rsquo;s most storied addresses.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>Figures are directional and move with the market; direct lake frontage commands a large premium.</p>
        </>
      ),
    },
    {
      heading: "What defines Grosse Pointe luxury",
      body: (
        <>
          <p>
            Three things. First, <strong>Lake St. Clair</strong> — real, boatable waterfront with harbors and yacht clubs
            (the Grosse Pointe Yacht Club among the finest in the Midwest). Second, <strong>history and architecture</strong>
            — this is one of America&rsquo;s great concentrations of early-20th-century estate homes, and that pedigree is
            irreplaceable. Third, the <strong>Grosse Pointe Public School System</strong>, consistently among the
            top-rated in Michigan, which anchors family demand at every price point.
          </p>
          <p>
            The luxury product skews toward restored and updated historic estates rather than new construction, which is
            exactly what draws buyers who want character over a builder-grade box. It&rsquo;s a different flavor of luxury
            from Oakland County&rsquo;s newer estates — and for many buyers, the more compelling one.
          </p>
        </>
      ),
    },
    {
      heading: "The off-market reality",
      body: (
        <>
          <p>
            Grosse Pointe&rsquo;s finest estates are often held for decades and change hands quietly. At the top of the
            market — the Lakeshore Road waterfront and the Farms&rsquo; premier blocks — a meaningful share of sales happen
            <strong> off-market</strong>, through private networks and pocket listings, because these owners value
            discretion and don&rsquo;t want a storied home turned into a public open house.
          </p>
          <p>
            That makes network access decisive. <strong>Sundus Lewis of Real Estate Market Center</strong> is an
            independent luxury broker representing buyers and sellers across Metro Detroit, including the Grosse Pointes —
            reaching off-market estates for buyers and marketing landmark homes discreetly for sellers, with $100M+ closed
            and a 5.0 rating across 105+ Google reviews.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Which Grosse Pointe is the most expensive?",
      answer:
        "Grosse Pointe Shores is the smallest and wealthiest, with trophy Lake St. Clair estates along Lakeshore Road and homes reaching well past $2.5 million to $8 million and beyond. Grosse Pointe Farms is the classic old-money address with historic estates and a private lakefront park. Grosse Pointe Woods offers the strongest value of the five.",
    },
    {
      question: "Where does 'luxury' start in Grosse Pointe, MI?",
      answer:
        "Entry luxury in Grosse Pointe generally begins in the $700,000s for a large renovated historic home, moving into the $1.2M–$2.5M estate tier near the lake, and $2.5M to $8M+ for direct Lake St. Clair waterfront in the Shores and Farms. The area is known for delivering more historic square footage and genuine frontage per dollar than comparable Oakland County luxury.",
    },
    {
      question: "Is Grosse Pointe a good value compared to Birmingham or Bloomfield Hills?",
      answer:
        "Often, yes — for a certain buyer. Grosse Pointe frequently offers more historic square footage, larger lots, real Lake St. Clair frontage, and a walkable village lifestyle for the dollar than newer Oakland County estates. The trade-off is architecture and history over new construction, which many luxury buyers actively prefer. We can compare specific homes across both markets for you.",
    },
    {
      question: "Are Grosse Pointe waterfront estates sold off-market?",
      answer:
        "Frequently at the top of the market. Along the Lakeshore Road waterfront and the Farms' premier blocks, a meaningful share of estate sales happen off-market through private networks and pocket listings, because these owners prize discretion. An agent with that network sees — and can place — homes a public portal never shows.",
    },
    {
      question: "Who is the best luxury real estate agent in Grosse Pointe?",
      answer:
        "You want genuine high-end experience, discretion, and access to off-market inventory. Sundus Lewis, broker and owner of Real Estate Market Center, is an independent luxury broker serving buyers and sellers across Metro Detroit including the Grosse Pointes, with $100M+ closed and a 5.0 rating across 105+ Google reviews.",
    },
  ],
  faqHeading: "Grosse Pointe luxury home questions",
  related: [
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/luxury-homes-in-bloomfield-hills", label: "Luxury homes in Bloomfield Hills" },
    { href: "/luxury-homes-in-west-bloomfield", label: "Luxury homes in West Bloomfield" },
    { href: "/contact", label: "Talk to a luxury specialist" },
  ],
  ctaHeading: "See Grosse Pointe luxury & waterfront — including off-market",
  ctaBody: "Tell us which Pointe and price tier you're after and we'll show you the market, including the off-market estates and waterfront a public search never surfaces. Selling a landmark home? We'll market it discreetly to the right buyers.",
  ctaPrimary: { href: "/contact", label: "Talk to a luxury specialist" },
  metaTitle: "Luxury Homes in Grosse Pointe, MI | Lake St. Clair Estates, Prices & the Five Pointes",
  metaDescription:
    "A guide to luxury homes in Grosse Pointe, MI: how the five Pointes differ, what each price tier buys, trophy Lake St. Clair waterfront ($2.5M–$8M+), and why the historic estates offer value against Oakland County.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
