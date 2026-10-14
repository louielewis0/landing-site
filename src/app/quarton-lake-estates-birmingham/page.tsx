import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "quarton-lake-estates-birmingham",
  crumbLabel: "Quarton Lake Estates",
  eyebrow: "Neighborhood guide · Birmingham, MI",
  h1: (
    <>
      Quarton Lake Estates: Birmingham&rsquo;s{" "}
      <span style={{ color: "var(--s-gold)" }}>trophy neighborhood</span>
    </>
  ),
  h1Text: "Quarton Lake Estates, Birmingham MI: Homes, Prices & the Market (2026)",
  sub: (
    <>
      Wrapped around Quarton Lake and the Rouge River park corridor &mdash; yet still walkable to downtown
      Birmingham &mdash; Quarton Lake Estates is the most prestigious address in the city. Here&rsquo;s what makes
      it special, what homes cost, and how this market really works.
    </>
  ),
  bullets: [
    "Birmingham's most prestigious neighborhood",
    "Median around $1.9M; homes range into the millions",
    "Much of it trades off-market",
  ],
  publishedISO: "2026-10-14",
  publishedLabel: "October 14, 2026",
  sections: [
    {
      heading: "What Quarton Lake Estates is",
      body: (
        <>
          <p>
            Quarton Lake Estates is the crown jewel of Birmingham &mdash; a pocket of <strong>historic
            estates on large lots</strong> wrapped around <strong>Quarton Lake</strong> and the Rouge
            River park corridor, with resident access to the lake and its walking paths. What sets it
            apart from other luxury enclaves in the region is rare: you get genuine estate character{" "}
            <em>and</em> the ability to walk to Old Woodward&rsquo;s dining and shops. That combination is
            unusual anywhere in Metro Detroit.
          </p>
        </>
      ),
    },
    {
      heading: "What makes it the top address",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>The lake &amp; the setting:</strong> Quarton Lake and the surrounding park corridor
              give the neighborhood a green, private, resort-like feel in the heart of the city.
            </li>
            <li>
              <strong>Historic, architecturally significant homes</strong> on large lots &mdash; many
              preserved, many rebuilt to estate standard.
            </li>
            <li>
              <strong>Walkable prestige:</strong> estate living that&rsquo;s still steps from downtown &mdash; the
              single biggest reason buyers pay a premium here.
            </li>
            <li>
              <strong>Birmingham Public Schools</strong> (Seaholm and Groves) adds to long-term demand.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "What homes cost in Quarton Lake Estates",
      body: (
        <>
          <p>
            This is the top of Birmingham&rsquo;s market. The neighborhood&rsquo;s median sits around{" "}
            <strong>$1.9 million</strong>, with homes commonly listed from roughly <strong>$1.2M into
            the multi-millions</strong> for the largest lakefront and estate properties. Values turn on
            lot size, lake proximity, architecture, and finish level &mdash; each home is effectively comped
            on its own.
          </p>
          <p>
            A key market reality: as with Birmingham&rsquo;s high end generally,{" "}
            <strong>a meaningful share of Quarton Lake activity happens off-market</strong> &mdash; the best
            homes are often sold quietly, agent to agent, and never hit Zillow.
          </p>
        </>
      ),
    },
    {
      heading: "Buying or selling in Quarton Lake Estates",
      body: (
        <>
          <p>
            Because inventory is scarce, pricing is bespoke, and much of it trades privately, this is a
            market where a <strong>connected local broker matters most</strong> &mdash; to see off-market
            homes as a buyer, and to reach the right buyers discreetly as a seller.
          </p>
          <p>
            <a href="/luxury-homes-in-birmingham">See the full Birmingham luxury market</a> &middot;{" "}
            <a href="/what-is-my-home-worth-birmingham">What&rsquo;s your Birmingham home worth?</a>
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Sources: neighborhood and brokerage market data (2026); figures are directional and move with
            the market. Quarton Lake Estates is in Birmingham proper (not Bloomfield).
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Quarton Lake Estates — common questions",
  faqs: [
    {
      question: "How much do homes cost in Quarton Lake Estates, Birmingham?",
      answer:
        "Quarton Lake Estates is the top of Birmingham's market, with a median around $1.9 million and homes commonly listed from roughly $1.2 million into the multi-millions for the largest lakefront and estate properties. Each home is effectively comped individually based on lot, lake proximity, architecture, and finish.",
    },
    {
      question: "Where is Quarton Lake?",
      answer:
        "Quarton Lake is in the City of Birmingham, Michigan, within the Rouge River park corridor just west of the downtown Old Woodward district. The Quarton Lake Estates neighborhood wraps around the lake, with resident access to the lake and its walking paths.",
    },
    {
      question: "Is Quarton Lake Estates the best neighborhood in Birmingham?",
      answer:
        "It's widely considered the most prestigious — its combination of historic estates on large lots, a lake-and-park setting, and walkability to downtown is unusual for Metro Detroit. Poppleton Park and Holy Name are the next upper tier.",
    },
    {
      question: "Do Quarton Lake homes sell off-market?",
      answer:
        "Often, yes. As with Birmingham's luxury market generally, a meaningful share of Quarton Lake homes trade privately — agent to agent — and never appear on public portals. Seeing them typically requires a connected local broker.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/best-neighborhoods-in-birmingham", label: "Best neighborhoods in Birmingham" },
    { href: "/what-is-my-home-worth-birmingham", label: "What's my Birmingham home worth?" },
    { href: "/living-in-birmingham", label: "Living in Birmingham" },
    { href: "/most-exclusive-neighborhoods-oakland-county", label: "Most exclusive neighborhoods in Oakland County" },
  ],
  ctaHeading: "Buying or selling in Quarton Lake Estates?",
  ctaBody: (
    <>
      This market runs on relationships and discretion. Talk to a local luxury expert with access to the
      off-market homes that never reach Zillow. No pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a Birmingham luxury expert" },
  metaTitle: "Quarton Lake Estates, Birmingham MI: Homes & Prices (2026)",
  metaDescription:
    "Quarton Lake Estates is Birmingham, MI's most prestigious neighborhood — historic estates around Quarton Lake, walkable to downtown, median ~$1.9M, much of it off-market. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
