import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "best-neighborhoods-in-birmingham",
  crumbLabel: "Best Neighborhoods in Birmingham",
  eyebrow: "Neighborhood guide · Birmingham, MI",
  h1: (
    <>
      The best neighborhoods in <span style={{ color: "var(--s-gold)" }}>Birmingham, Michigan</span>
    </>
  ),
  h1Text: "Best Neighborhoods in Birmingham, MI: Quarton Lake to Downtown (2026)",
  sub: (
    <>
      Birmingham packs estate enclaves, walkable in-town pockets, and a revitalized loft district into
      under five square miles &mdash; and they price very differently. Here&rsquo;s an honest, pocket-by-pocket
      guide to where to live, from the trophy streets to the most attainable walkable entry points.
    </>
  ),
  bullets: [
    "Quarton Lake Estates = the trophy pocket",
    "Downtown & Rail District = walkable, more attainable",
    "Overall median ~$800K–$1.2M; luxury tier $1.5M+",
  ],
  publishedISO: "2026-10-14",
  publishedLabel: "October 14, 2026",
  sections: [
    {
      heading: "Birmingham at a glance",
      body: (
        <>
          <p>
            Birmingham&rsquo;s whole identity is <strong>walkable, upscale living</strong> around the Old
            Woodward downtown. Depending on the source and the mix of what sold, the overall median
            runs roughly <strong>$800,000 to $1.2 million</strong> (Redfin has shown ~$818K; other
            trackers ~$1.19M), with the <strong>luxury/estate tier generally beginning around $1.5M</strong>.
            Birmingham Public Schools &mdash; Seaholm and Groves &mdash; anchors family demand.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            One honest note: Birmingham has no official neighborhood list &mdash; these are the
            resident-association and locally-recognized pockets, not a government map.
          </p>
        </>
      ),
    },
    {
      heading: "The neighborhoods, from trophy to attainable",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Quarton Lake Estates (the crown jewel):</strong> historic estates on large lots
              wrapped around Quarton Lake and the Rouge River park corridor &mdash; and still walkable to
              downtown. The top of the market (median around $1.9M; listings run into the millions).
            </li>
            <li>
              <strong>Poppleton Park:</strong> stately, architecturally varied homes on tree-lined
              streets north of Maple between Woodward and Adams, with active teardown/rebuild. Upper tier.
            </li>
            <li>
              <strong>Holy Name / Mill Pond:</strong> family-friendly, a mix of newer large homes and
              renovated older ones near Maple just east of Old Woodward. Upper-mid.
            </li>
            <li>
              <strong>Torry &amp; Barnum Park:</strong> well-kept, close-knit residential pockets with
              green space &mdash; solid mid-to-upper value.
            </li>
            <li>
              <strong>Pembroke (Manor &amp; Park):</strong> quiet, tree-lined, a mix of condos and
              single-family, and walkable &mdash; the relatively attainable &ldquo;transition zone&rdquo; between
              downtown and estate pricing.
            </li>
            <li>
              <strong>Downtown / In-Town:</strong> maximum walkability (Walk Score ~96), steps from Old
              Woodward, Shain Park, and the Townsend Hotel &mdash; condos up to luxury single-family.
            </li>
            <li>
              <strong>Rail / Triangle District:</strong> the revitalized, mixed-use loft corridor toward
              Eton (breweries, studios) &mdash; the most attainable walkable entry point, popular with
              younger buyers.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Most prestigious vs. most attainable",
      body: (
        <>
          <p>
            <strong>Most prestigious:</strong> Quarton Lake Estates is the consensus top &mdash; its rare
            mix of estate character <em>and</em> walkable downtown proximity is genuinely unusual for
            Metro Detroit. Poppleton Park and Holy Name are the next tier.
          </p>
          <p>
            <strong>Most attainable (while staying in Birmingham):</strong> downtown condos and the
            Rail/Triangle District are the accessible entry points; Pembroke is the walkable
            middle ground. Entry single-family further from the core generally runs about $600K&ndash;$900K.
          </p>
        </>
      ),
    },
    {
      heading: "What drives value — and the schools",
      body: (
        <>
          <p>
            <strong>Walkability is the premium.</strong> Proximity to Old Woodward&rsquo;s dining and retail
            and to Shain Park is the single biggest value driver; the closer and more walkable, the
            higher the price per foot.
          </p>
          <p>
            <strong>Schools:</strong> Birmingham Public Schools runs two high schools &mdash; Seaholm (in
            Birmingham proper) and Groves (physically in Beverly Hills, but part of the district).
            Attendance boundaries split the city, so confirm which school a specific home feeds. See{" "}
            <a href="/homes-in-birmingham-public-schools">Birmingham Public Schools: Groves vs Seaholm</a>.
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Sources: Redfin/Movoto (2026, price ranges vary by methodology), resident associations, and
            local brokerage guides. Figures are directional and move with the market.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Birmingham neighborhoods — common questions",
  faqs: [
    {
      question: "What is the best neighborhood in Birmingham, MI?",
      answer:
        "Quarton Lake Estates is widely considered the most prestigious — historic estates on large lots around Quarton Lake, still walkable to downtown, with a median around $1.9 million. Poppleton Park and Holy Name are the next upper tier. The 'best' for you depends on budget and whether you prioritize estate living or walkable in-town life.",
    },
    {
      question: "What is the most affordable way to live in Birmingham?",
      answer:
        "The most attainable entry points within Birmingham are downtown condos and the Rail/Triangle District (a revitalized loft corridor toward Eton), with Pembroke as a walkable middle ground. Entry single-family homes further from the core generally run about $600,000–$900,000.",
    },
    {
      question: "Which Birmingham neighborhood is the most walkable?",
      answer:
        "The Downtown / In-Town area, with a Walk Score around 96 — steps from Old Woodward's dining and shopping, Shain Park, and the Townsend Hotel. Quarton Lake Estates is notable for combining estate character with walkable downtown proximity.",
    },
    {
      question: "How much do homes cost in Birmingham, MI?",
      answer:
        "Birmingham's overall median runs roughly $800,000 to $1.2 million depending on the source and mix of sales, with the luxury/estate tier generally beginning around $1.5 million and Quarton Lake Estates well above that.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/birmingham-condos", label: "Birmingham condos" },
    { href: "/what-is-my-home-worth-birmingham", label: "What's my Birmingham home worth?" },
    { href: "/living-in-birmingham", label: "Living in Birmingham" },
    { href: "/homes-in-birmingham-public-schools", label: "Birmingham Public Schools guide" },
  ],
  ctaHeading: "Want help choosing the right Birmingham pocket?",
  ctaBody: (
    <>
      Talk to a local Birmingham expert &mdash; including access to homes that never hit the public market
      in Quarton Lake and the in-town estates. Discreet, no pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a Birmingham expert" },
  metaTitle: "Best Neighborhoods in Birmingham, MI: Quarton Lake to Downtown",
  metaDescription:
    "A pocket-by-pocket guide to the best neighborhoods in Birmingham, MI — Quarton Lake Estates, Poppleton Park, Holy Name, Pembroke, Downtown, and the Rail District — with honest price positioning. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
