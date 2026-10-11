import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "luxury-homes-in-northville",
  crumbLabel: "Luxury Homes in Northville",
  eyebrow: "Luxury market guide · Northville, MI",
  h1: (
    <>
      Luxury homes in <span style={{ color: "var(--s-gold)" }}>Northville, Michigan</span>
    </>
  ),
  h1Text: "Luxury Homes in Northville, MI — Neighborhoods, Prices & the Market (2026)",
  sub: (
    <>
      Northville pairs a storied walkable downtown with golf-course estates, a top-ranked school
      district, and a once-in-a-generation redevelopment of the old racetrack. Here&rsquo;s where the
      luxury market begins, the most prestigious neighborhoods, and what to know before you buy or
      sell.
    </>
  ),
  bullets: [
    "Typical home ~$607K; luxury tier generally starts ~$750K",
    "Northville Public Schools — among Michigan's very best",
    "Golf-course estates, historic downtown & “The Downs” redevelopment",
  ],
  publishedISO: "2026-10-11",
  publishedLabel: "October 11, 2026",
  sections: [
    {
      heading: "The Northville luxury market at a glance",
      body: (
        <>
          <p>
            Northville&rsquo;s typical home value is roughly <strong>$607,000</strong> &mdash; up about{" "}
            <strong>5% year over year</strong> (Zillow home-value index, mid-2026) &mdash; with a recent
            median sale price around <strong>$517,000</strong>. The city consistently ranks among the
            most desirable in Metro Detroit, and its upper end is deep: recent luxury inventory has
            carried a median around <strong>$1.19M</strong>.
          </p>
          <p>
            One thing to know: Northville&rsquo;s <strong>luxury tier moves more slowly</strong> than its
            everyday market. Entry-level homes sell fast, but high-end listings can sit for months, so
            pricing precision matters even more at the top.
          </p>
        </>
      ),
    },
    {
      heading: "Where luxury begins — and what it buys",
      body: (
        <>
          <p>
            In Northville, the luxury tier generally begins around <strong>$750,000</strong>, with
            estates commonly running from roughly <strong>$800K into the $2M+ range</strong>. These
            figures are indicative &mdash; a working map of the market, not a guarantee for any specific
            home:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>~$750K&ndash;$1M (entry luxury):</strong> newer or fully updated homes in
              established subdivisions, often with 3,500&ndash;4,500 sq ft.
            </li>
            <li>
              <strong>~$1M&ndash;$1.8M (estate tier):</strong> golf-course frontage, larger custom
              homes, and the most exclusive enclaves.
            </li>
            <li>
              <strong>$1.8M+ (trophy):</strong> the top of the market, including new construction at
              The Downs and custom estates.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Northville's most prestigious neighborhoods",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Northville Hills Golf Club:</strong> the marquee golf community &mdash; hundreds
              of homes (largely Toll Brothers) around an <strong>Arnold Palmer&ndash;designed 18-hole
              course</strong>, with a private clubhouse, pool, and tennis.
            </li>
            <li>
              <strong>Bella Vista:</strong> the most exclusive enclave &mdash; only about{" "}
              <strong>13 custom Tudor/Cape estates</strong> (roughly 4,500&ndash;6,500 sq ft), typically
              in the mid-$1M&rsquo;s.
            </li>
            <li>
              <strong>Stonewater &amp; Steeplechase of Northville:</strong> established, in-demand
              luxury subdivisions of brick colonials on generous lots.
            </li>
            <li>
              <strong>Maybury Park Estates:</strong> executive homes beside Maybury State Park &mdash;
              nature at your back door.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Neighborhood price ranges are directional (agent-sourced), not official MLS statistics.
          </p>
        </>
      ),
    },
    {
      heading: "“The Downs” — Northville's defining new development",
      body: (
        <>
          <p>
            The former <strong>Northville Downs</strong> harness track (which ran from 1944 until
            2024) is being transformed into <strong>&ldquo;The Downs&rdquo;</strong> &mdash; a roughly
            48-acre, ~$300M mixed-use neighborhood in the heart of town, with hundreds of new homes,
            commercial space, parks, and daylighted riverfront. <strong>Toll Brothers at The
            Downs</strong> has been launching new luxury home collections, with early homes listed from
            roughly <strong>$989,000 to $1.7M</strong>. For luxury buyers who want new construction
            steps from a historic downtown, it&rsquo;s one of the most significant opportunities in the
            region.
          </p>
        </>
      ),
    },
    {
      heading: "Schools, lifestyle & location",
      body: (
        <>
          <p>
            <strong>Northville Public Schools</strong> is a major draw &mdash; rated among the very best
            in Michigan (Niche 2026: A+, around #2 statewide), with Northville High itself ranked near
            the top of the state. Add a genuinely <strong>walkable historic downtown</strong> (anchored
            by the 1925 Marquis Theater), adjacency to <strong>Maybury State Park</strong>, and golf,
            and you have a rare blend of small-town character and amenity.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Note: the City of Northville straddles the Wayne/Oakland county line (roughly half in each),
            while neighboring Northville Township is entirely in Wayne County &mdash; worth confirming for
            a specific address. Data: Zillow (mid-2026), Niche (2026), and public reporting on The
            Downs; luxury-segment and neighborhood figures are directional.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Northville luxury homes — common questions",
  faqs: [
    {
      question: "How much do luxury homes cost in Northville, MI?",
      answer:
        "Northville's luxury tier generally begins around $750,000, with estates commonly running from about $800,000 into the $2 million-plus range. Recent luxury inventory carried a median around $1.19 million. The typical (all-homes) value is roughly $607,000 as of mid-2026.",
    },
    {
      question: "What are the best luxury neighborhoods in Northville?",
      answer:
        "The most prestigious include Northville Hills Golf Club (around an Arnold Palmer–designed course), the exclusive Bella Vista enclave of custom estates, Stonewater, Steeplechase of Northville, and Maybury Park Estates near Maybury State Park. New luxury construction is also underway at The Downs downtown.",
    },
    {
      question: "Are Northville schools good?",
      answer:
        "Yes — Northville Public Schools ranks among the very best in Michigan (Niche 2026: A+, around #2 statewide), and Northville High School is ranked near the top of the state. Strong schools are a core driver of home demand and value.",
    },
    {
      question: "What is 'The Downs' in Northville?",
      answer:
        "The Downs is the redevelopment of the former Northville Downs harness racetrack (which operated 1944–2024) into a roughly 48-acre mixed-use neighborhood with new homes, retail, parks, and riverfront. Toll Brothers at The Downs has launched luxury home collections with early homes from roughly $989,000 to $1.7 million.",
    },
  ],
  related: [
    { href: "/home-value", label: "What's my home worth? (free valuation)" },
    { href: "/luxury-homes-in-novi", label: "Luxury homes in Novi" },
    { href: "/luxury-homes-in-bloomfield-hills", label: "Luxury homes in Bloomfield Hills" },
    { href: "/most-exclusive-neighborhoods-oakland-county", label: "Most exclusive neighborhoods in Oakland County" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
  ],
  ctaHeading: "Buying or selling a luxury home in Northville?",
  ctaBody: (
    <>
      Talk to a local luxury expert about golf-course estates, new construction at The Downs, and
      homes that never reach the public market. Discreet, no pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a Northville luxury expert" },
  metaTitle: "Luxury Homes in Northville, MI — Neighborhoods & Prices (2026)",
  metaDescription:
    "Luxury homes in Northville, MI: where the luxury tier begins (~$750K), the top neighborhoods (Northville Hills golf, Bella Vista), top-ranked schools, and The Downs redevelopment. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
