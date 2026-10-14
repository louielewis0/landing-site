import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "birmingham-condos",
  crumbLabel: "Birmingham Condos",
  eyebrow: "Condo market guide · Birmingham, MI",
  h1: (
    <>
      Birmingham <span style={{ color: "var(--s-gold)" }}>condos</span>: downtown buildings &amp; prices
    </>
  ),
  h1Text: "Birmingham Condos: Downtown Buildings, Prices & the Market (2026)",
  sub: (
    <>
      For walkable, lock-and-leave living steps from Old Woodward, Birmingham&rsquo;s condo market is one of
      the most desirable in Metro Detroit &mdash; and one of the tightest. Here are the real downtown
      buildings, what they cost, and what to know before you buy.
    </>
  ),
  bullets: [
    "Condos range ~$135K to $3.1M citywide",
    "Four true downtown buildings: Willits, Balmoral, Brookside, Birmingham Place",
    "Walkable, maintenance-free — but inventory is thin",
  ],
  publishedISO: "2026-10-14",
  publishedLabel: "October 14, 2026",
  sections: [
    {
      heading: "The Birmingham condo market at a glance",
      body: (
        <>
          <p>
            Birmingham condos span a wide range &mdash; roughly <strong>$135,000 to $3.1 million</strong>{" "}
            citywide, with a downtown median list price around <strong>$464,000</strong> and a 48009
            condo median value near <strong>$321,000</strong> (up ~3.9% year over year). The defining
            feature isn&rsquo;t price, though &mdash; it&rsquo;s <strong>scarcity</strong>: only a couple dozen
            downtown condos tend to be listed at any time, and very little new for-sale product is being
            built.
          </p>
        </>
      ),
    },
    {
      heading: "The downtown condo buildings worth knowing",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>The Willits (111 Willits St):</strong> a Beaux-Arts luxury building beside Shain
              Park, completed 2001, ~100 units, with 24/7 concierge/valet and deeded garage parking &mdash;
              established downtown luxury (brokerage-quoted ~$450K&ndash;$1.5M).
            </li>
            <li>
              <strong>The Balmoral (34901 Woodward):</strong> a contemporary 2015 mid-rise with ground-
              floor retail, interior parking, and private roof terraces (~$550K&ndash;$2M+). Its rooftop
              penthouse listed at <strong>$4.1M</strong> &mdash; reported as Michigan&rsquo;s most expensive
              existing penthouse.
            </li>
            <li>
              <strong>Brookside Residences (387 N Old Woodward):</strong> the newest of the group (~2018&ndash;19),
              a boutique building of roughly 28 large units (~2,200&ndash;5,000 sq ft) with full-time
              concierge, fitness, and a house driver &mdash; high-end lock-and-leave.
            </li>
            <li>
              <strong>Birmingham Place:</strong> a 10-story, ~186-unit building from 1983 &mdash; the
              longest-established large condo building downtown, and often a more attainable entry into
              in-town living.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Heads-up: a few &ldquo;condo-looking&rdquo; downtown towers &mdash; notably The 555 and The Pearl &mdash; are
            actually <strong>rental</strong> buildings, not for-sale condos. Don&rsquo;t assume every downtown
            high-rise can be bought.
          </p>
        </>
      ),
    },
    {
      heading: "What Birmingham condos cost",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Entry / older attached (~$135K&ndash;$300K):</strong> smaller or older units, often outside the immediate downtown core.</li>
            <li><strong>Mainstream downtown (~$350K&ndash;$700K):</strong> the heart of the market &mdash; walkable, updated units.</li>
            <li><strong>Luxury new-build (~$1M&ndash;$2M+):</strong> the Willits/Balmoral/Brookside tier, with full amenities.</li>
            <li><strong>Ultra-luxury (up to ~$4.1M):</strong> the top penthouses.</li>
          </ul>
        </>
      ),
    },
    {
      heading: "Who buys Birmingham condos — and why",
      body: (
        <>
          <p>Three buyers dominate this market:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>Downsizers &amp; empty-nesters</strong> trading a large Birmingham/Bloomfield house for maintenance-free living &mdash; often to stay in the Birmingham Schools catchment and the lifestyle.</li>
            <li><strong>Lock-and-leave luxury buyers</strong> who want concierge, secure parking, and zero exterior upkeep.</li>
            <li><strong>Affluent professionals</strong> who want to walk out the door to Old Woodward dining and shopping.</li>
          </ul>
          <p>
            The through-line is <strong>walkability + maintenance-free living</strong> in the one
            genuinely walkable downtown in the area.
          </p>
        </>
      ),
    },
    {
      heading: "What to know before you buy",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>HOA dues are significant</strong> &mdash; roughly $600&ndash;$1,400/month in the luxury buildings for concierge, valet, parking, and amenities. Always review the dues and reserves for a specific unit.</li>
            <li><strong>Inventory is thin</strong> &mdash; the right unit may not be listed when you&rsquo;re ready, so it pays to have an agent watching the market (and off-market) for you.</li>
            <li><strong>Confirm condo vs. rental</strong> before you fall for a building &mdash; some downtown towers only rent.</li>
          </ul>
          <p>
            <a href="/what-is-my-home-worth-birmingham">See Birmingham home values</a> &middot;{" "}
            <a href="/luxury-homes-in-birmingham">Birmingham luxury market</a>
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Sources: Redfin condo listings (2026), building/brokerage pages, and local reporting
            (Balmoral penthouse, Mar 2025). Building ranges and HOA figures are indicative and move with
            the market.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Birmingham condos — common questions",
  faqs: [
    {
      question: "How much do condos cost in Birmingham, MI?",
      answer:
        "Birmingham condos range from about $135,000 to $3.1 million citywide, with a downtown median list price around $464,000. Entry/older units run roughly $135K–$300K, mainstream downtown condos $350K–$700K, luxury new-build units $1M–$2M+, and the top penthouses up to about $4.1 million.",
    },
    {
      question: "What are the best luxury condo buildings in downtown Birmingham?",
      answer:
        "The main for-sale luxury buildings are The Willits (2001, beside Shain Park), The Balmoral (2015, home to a $4.1M penthouse), and Brookside Residences (~2018–19, the newest). Birmingham Place (1983) is the longest-established and often a more attainable entry. Note that The 555 and The Pearl are rental buildings, not for-sale condos.",
    },
    {
      question: "Who buys condos in Birmingham?",
      answer:
        "Mainly downsizers and empty-nesters wanting maintenance-free living in the Birmingham lifestyle, lock-and-leave luxury buyers wanting concierge and secure parking, and affluent professionals who want to walk to Old Woodward. The common draw is walkability plus no exterior upkeep.",
    },
    {
      question: "Are HOA fees high for Birmingham condos?",
      answer:
        "In the luxury downtown buildings, HOA dues typically run about $600 to $1,400 per month, covering concierge, valet, parking, and amenities. Always review the specific unit's dues and the association's reserves before buying.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/best-neighborhoods-in-birmingham", label: "Best neighborhoods in Birmingham" },
    { href: "/what-is-my-home-worth-birmingham", label: "What's my Birmingham home worth?" },
    { href: "/living-in-birmingham", label: "Living in Birmingham" },
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate & neighborhoods" },
  ],
  ctaHeading: "Looking for a Birmingham condo?",
  ctaBody: (
    <>
      In a market this thin, the right unit often moves before it&rsquo;s widely seen &mdash; and some trade
      off-market. Let a local expert watch the buildings for you. No pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a Birmingham condo expert" },
  metaTitle: "Birmingham Condos (2026): Downtown Buildings, Prices & Market",
  metaDescription:
    "Birmingham, MI condos: the real downtown buildings (The Willits, The Balmoral, Brookside, Birmingham Place), prices (~$135K–$3.1M), who buys, HOA dues, and what to know. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
