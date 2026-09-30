import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "luxury-homes-in-birmingham",
  crumbLabel: "Luxury Homes in Birmingham",
  eyebrow: "Luxury market guide · Birmingham, MI",
  h1: (
    <>
      Luxury homes in <span style={{ color: "var(--s-gold)" }}>Birmingham, Michigan</span>
    </>
  ),
  h1Text: "Luxury Homes in Birmingham, MI — Neighborhoods, Prices & the Off-Market Reality",
  sub: "Birmingham is Metro Detroit's walkable luxury capital — Quarton Lake estates, Old Woodward in-town living, and a top-ranked school district. Here's what each price tier buys, where the best addresses are, and why so much of it never hits the MLS.",
  publishedISO: "2026-09-30",
  publishedLabel: "September 30, 2026",
  bullets: ["Luxury tier starts ~$1.5M", "Quarton Lake to Old Woodward", "Much of it sells off-market"],
  sections: [
    {
      heading: "The Birmingham luxury market at a glance",
      body: (
        <>
          <p>
            Birmingham packs downtown condos, historic homes, and multimillion-dollar estates into under five square
            miles, so the &ldquo;median&rdquo; swings widely by source — roughly the <strong>$700Ks to just over
            $1M</strong> depending on the portal. The number that matters for luxury buyers is where the tier begins: true
            luxury inventory in Birmingham is generally marketed at <strong>$1.5M and up</strong>, with trophy estates
            reaching into the $7M+ range.
          </p>
          <p>
            It's a seller's market at the high end — luxury supply has recently run around a month and a half — though
            days on market have lengthened somewhat year over year, so pricing precision still matters even here.
          </p>
        </>
      ),
    },
    {
      heading: "What each price tier buys in Birmingham",
      body: (
        <>
          <p>These tiers are indicative — a working map of the market, not a guarantee for any specific home:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>~$1.5M–$2.5M (entry luxury):</strong> roughly 2,800–4,500 sq ft on a 0.15–0.35 acre lot — quality new construction with premium, smart-home finishes, or a fully renovated historic home. Often in Poppleton Park or in-town.</li>
            <li><strong>~$2.5M–$4M (estate tier):</strong> roughly 4,000–7,000 sq ft on up to ~0.6 acre — concentrated around Quarton Lake and central in-town. A meaningful share sells off-market.</li>
            <li><strong>~$4M–$7M+ (trophy):</strong> 6,000–12,000+ sq ft on half-acre-plus lots along the Quarton Lake and Quarton Road corridor. The top sale in early 2026 was around $7.2M, and the majority of this tier never reaches the MLS.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>Luxury-segment pricing runs around $550+ per square foot. Figures are directional and move with the market.</p>
        </>
      ),
    },
    {
      heading: "Birmingham's top luxury neighborhoods",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Quarton Lake Estates</strong> — Birmingham's most prestigious address: larger lots, lake views, winding streets, significant historic architecture, and walkable to downtown. Roughly $1.5M to $5M+.</li>
            <li><strong>Poppleton Park</strong> — classic tree-lined streets, quieter than the downtown core, within the Birmingham school district; a strong entry-luxury and move-up tier (roughly $700K–$1.4M and up).</li>
            <li><strong>Holy Name</strong> — just east of Old Woodward near Maple; a wide mix of large new builds and renovated older homes, with the top end reaching into luxury.</li>
            <li><strong>Downtown / Old Woodward &ldquo;In-Town&rdquo;</strong> — a 96 Walk Score walkable core of luxury condos and in-town homes; the walkability itself is the differentiator versus neighboring estate suburbs.</li>
          </ul>
        </>
      ),
    },
    {
      heading: "What defines Birmingham luxury",
      body: (
        <>
          <p>
            Two things set Birmingham apart from the surrounding estate suburbs. First, <strong>walkability</strong> — the
            Old Woodward downtown (96 Walk Score) means you can live on foot among dining and retail, which is genuinely
            rare in Michigan and holds its premium. Second, the <strong>top-ranked Birmingham school district</strong>, a
            consistent luxury draw.
          </p>
          <p>
            The luxury product splits into two types: renovated or historic estate homes (especially around Quarton Lake)
            and new-construction luxury with premium, smart-home finishes. Lot sizes scale with the tier, from about 0.15
            acre in-town up to an acre-plus for trophy properties. The market also pulls out-of-state buyers from Los
            Angeles, Chicago, and New York looking for value against coastal prices.
          </p>
        </>
      ),
    },
    {
      heading: "The off-market reality — and why it matters",
      body: (
        <>
          <p>
            Here's what most public search sites won't tell you: <strong>a large share of Birmingham's luxury market
            never hits the MLS.</strong> Roughly 30% of transactions above $2M are off-market, and that rises to more than
            half in the $4M+ trophy tier. At the top, sellers prioritize privacy and discretion, and the best homes move
            through private networks and pocket listings.
          </p>
          <p>
            That's exactly why agent-network access matters here more than in an ordinary market. As an independent luxury
            broker focused on the Birmingham–Bloomfield corridor, Sundus Lewis reaches these off-market opportunities for
            buyers and markets luxury listings discreetly for sellers — so you see the homes a public search would never
            surface, and sell without putting your home (and your privacy) on public display.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Where does 'luxury' start in Birmingham, MI?",
      answer:
        "True luxury inventory in Birmingham is generally marketed at about $1.5 million and up, with estate and trophy properties reaching into the $7M+ range. That's well above the overall market, where the median runs roughly in the $700,000s to just over $1M depending on the source, because Birmingham blends downtown condos, historic homes, and estates in a very small footprint.",
    },
    {
      question: "What is the most expensive neighborhood in Birmingham?",
      answer:
        "Quarton Lake Estates is Birmingham's most prestigious address — larger lots, lake views, historic architecture, and walkable to downtown, with homes running roughly $1.5M to $5M and above. The trophy tier concentrates along the Quarton Lake and Quarton Road corridor, where the top early-2026 sale was around $7.2M.",
    },
    {
      question: "What does $2 million buy in Birmingham?",
      answer:
        "Around $2M typically buys entry-to-mid luxury — roughly 2,800–4,500 square feet, either quality new construction with premium finishes or a fully renovated historic home, often in Poppleton Park or in-town. Moving toward $2.5M–$4M shifts you into the estate tier around Quarton Lake with larger square footage and lots. These are indicative ranges, not guarantees.",
    },
    {
      question: "Are luxury homes in Birmingham sold off-market?",
      answer:
        "Often, yes. About 30% of Birmingham transactions above $2M are off-market, rising to more than half in the $4M+ trophy tier, because high-end sellers prioritize privacy. This means the best luxury homes frequently move through private networks and pocket listings rather than public MLS sites — so working with an agent who has that network access is a real advantage.",
    },
    {
      question: "Who is the best luxury real estate agent in Birmingham?",
      answer:
        "For a luxury purchase or sale, you want an agent with genuine high-end experience, discretion, and network access to off-market inventory. Sundus Lewis, broker and owner of Real Estate Market Center, specializes in luxury across the Birmingham–Bloomfield corridor, has closed $100M+ in Oakland County, and holds a 5.0 rating across 70+ Google reviews.",
    },
  ],
  faqHeading: "Birmingham luxury home questions",
  related: [
    { href: "/best-real-estate-agent-birmingham", label: "Meet Birmingham's luxury broker" },
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate guide" },
    { href: "/luxury-homes-in-bloomfield-hills", label: "Luxury homes in Bloomfield Hills" },
  ],
  ctaHeading: "See Birmingham luxury homes — including off-market",
  ctaBody: "Tell us what you're looking for and we'll show you Birmingham's luxury inventory, including the off-market and pocket listings a public search never surfaces. Selling? We'll market your home discreetly to the right buyers.",
  ctaPrimary: { href: "/contact", label: "Talk to a luxury specialist" },
  metaTitle: "Luxury Homes in Birmingham, MI | Neighborhoods, Prices & Off-Market Guide",
  metaDescription:
    "A guide to luxury homes in Birmingham, MI: where the luxury tier starts (~$1.5M), what each price tier buys, top neighborhoods like Quarton Lake Estates, and why ~30%+ of high-end sales are off-market.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
