import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "oakhurst-clarkston",
  crumbLabel: "Oakhurst (Clarkston)",
  eyebrow: "Gated golf community · Clarkston, MI",
  h1: (
    <>
      Oakhurst &mdash; Clarkston&rsquo;s gated <span style={{ color: "var(--s-gold)" }}>golf community</span>
    </>
  ),
  h1Text: "Oakhurst Golf & Country Club Homes — Gated Community in Clarkston, MI",
  sub: "Oakhurst is north Oakland County's premier private, gated golf community — an 18-hole Arthur Hills championship course wrapped by custom estate homes, behind a staffed gate off Clarkston Road. Here's what living in Oakhurst actually means, what homes run, and why so much of it trades off-market.",
  publishedISO: "2026-11-25",
  publishedLabel: "November 25, 2026",
  bullets: ["Private, staffed-gate community", "18-hole Arthur Hills course (1998)", "Custom estates on wooded lots"],
  sections: [
    {
      heading: "What Oakhurst is",
      body: (
        <>
          <p>
            <strong>Oakhurst</strong> is a private, <strong>gated golf community</strong> in the Clarkston /
            Independence Township area of north Oakland County, built around <strong>Oakhurst Golf &amp; Country
            Club</strong> &mdash; an 18-hole championship course designed by acclaimed architect <strong>Arthur
            Hills</strong> that opened in <strong>1998</strong> and is consistently recognized among Michigan&rsquo;s top
            private courses. The residential community is a collection of <strong>custom estate homes</strong> set on
            wooded, rolling lots, many fronting the fairways, ponds, and wetlands that thread through the property.
          </p>
          <p>
            The draw is a specific lifestyle: <strong>staffed-gate privacy</strong>, country-club amenities a golf cart
            from the door, and genuine seclusion &mdash; all within a short drive of the historic Village of Clarkston,
            Pine Knob, and the I-75 corridor to Birmingham, Troy, and downtown Detroit.
          </p>
        </>
      ),
    },
    {
      heading: "What homes in Oakhurst run",
      body: (
        <>
          <p>
            Oakhurst is one of the addresses that defines the top of the <strong>Clarkston luxury market</strong>. Homes
            here are predominantly <strong>custom-built estates</strong>, and values generally run from roughly{" "}
            <strong>$700K into the $2M+ range</strong> depending on size, lot, golf frontage, and finish &mdash; with the
            largest estates on premium fairway or water lots at the top of that band. Inventory inside the gate is{" "}
            <strong>thin and tightly held</strong>; at any given time only a handful of homes are actively listed, which
            is part of why so many Oakhurst sales happen quietly.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Figures are directional and move with the market (public listing data, 2026). We&rsquo;ll pull live, address-level comps on request.
          </p>
        </>
      ),
    },
    {
      heading: "What makes Oakhurst different",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>The course</strong> &mdash; an 18-hole Arthur Hills championship layout (opened 1998), carved through wooded, rolling terrain with water and wetland features; a serious private club, not a subdivision amenity.</li>
            <li><strong>Gated privacy</strong> &mdash; a staffed/controlled entrance and a single community spine keep Oakhurst genuinely private, which is rare in north Oakland County.</li>
            <li><strong>Custom estates</strong> &mdash; homes are individually built on larger wooded lots, so the streetscape reads as estates in a forest rather than tract repetition.</li>
            <li><strong>Clarkston schools &amp; location</strong> &mdash; Clarkston Community Schools is an A-rated district, and the community sits minutes from Deer Lake, Pine Knob skiing/golf/music, and I-75.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Oakhurst is one of several marquee addresses in the area &mdash; see the full{" "}
            <a href="/luxury-homes-in-clarkston" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Clarkston luxury market guide</a>{" "}
            and our roundup of{" "}
            <a href="/gated-communities-oakland-county" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>gated communities in Oakland County</a>.
          </p>
        </>
      ),
    },
    {
      heading: "The off-market reality inside the gate",
      body: (
        <>
          <p>
            In a community this small and private, a meaningful share of Oakhurst sales never reach a public search &mdash;
            owners value discretion, and homes often trade through agent networks before (or instead of) hitting the MLS.
            For buyers, that means <strong>who your agent knows inside the gate</strong> decides how much you actually get
            to see. For sellers, it means a quiet, targeted process can outperform a splashy public listing.
          </p>
          <p>
            <strong>Sundus Lewis</strong>, broker and owner of <strong>Real Estate Market Center</strong>, specializes in
            north Oakland County luxury, has closed <strong>$100M+</strong> in the county, and holds a <strong>5.0 rating
            across 110+ Google reviews</strong>. We reach off-market Oakhurst opportunities for buyers and market estates
            here discreetly for sellers.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Oakhurst (Clarkston) — common questions",
  faqs: [
    {
      question: "Is Oakhurst in Clarkston a gated community?",
      answer:
        "Yes. Oakhurst is a private, gated golf community in the Clarkston / Independence Township area of north Oakland County, built around Oakhurst Golf & Country Club. It has a controlled/staffed entrance and is made up of custom estate homes set on wooded lots, many along the course.",
    },
    {
      question: "How much do homes in Oakhurst cost?",
      answer:
        "Oakhurst homes are predominantly custom estates and generally run from roughly $700K into the $2M+ range depending on size, lot, golf frontage, and finish, with the largest fairway and water-lot estates at the top. Inventory inside the gate is thin and tightly held, so only a handful of homes are usually listed at once (public listing data, 2026; we'll pull live comps on request).",
    },
    {
      question: "What golf course is Oakhurst built around?",
      answer:
        "Oakhurst is built around Oakhurst Golf & Country Club, an 18-hole championship course designed by architect Arthur Hills that opened in 1998. It's carved through wooded, rolling terrain with water and wetland features and is consistently recognized among Michigan's top private courses.",
    },
    {
      question: "What school district is Oakhurst in?",
      answer:
        "Oakhurst is in the Clarkston Community Schools district, an A-rated district in north Oakland County. The community also sits minutes from Deer Lake, Pine Knob (skiing, golf, and the outdoor music theatre), the historic Village of Clarkston, and I-75.",
    },
    {
      question: "Who is the best agent for buying or selling in Oakhurst?",
      answer:
        "For a gated-community purchase or sale, you want high-end experience, discretion, and off-market access inside the gate. Sundus Lewis, broker and owner of Real Estate Market Center, specializes in north Oakland County luxury, has closed $100M+ in the county, and holds a 5.0 rating across 110+ Google reviews.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-clarkston", label: "Luxury homes in Clarkston" },
    { href: "/gated-communities-oakland-county", label: "Gated communities in Oakland County" },
    { href: "/gated-communities-michigan", label: "Gated communities in Michigan" },
    { href: "/oakland-county-lakefront-homes", label: "Oakland County lakefront market" },
    { href: "/contact", label: "Talk to a luxury specialist" },
  ],
  ctaHeading: "See Oakhurst — including homes that never hit a public search",
  ctaBody: (
    <>
      Whether you want a fairway estate inside Oakhurst or you&rsquo;re thinking about selling one quietly, Real Estate
      Market Center will show you the community&rsquo;s real inventory &mdash; including the off-market estates a public
      search never surfaces &mdash; and run live, address-level numbers.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a luxury specialist" },
  metaTitle: "Oakhurst Clarkston, MI | Gated Golf Community Homes & Estates",
  metaDescription:
    "Oakhurst is Clarkston's private, gated golf community — an 18-hole Arthur Hills course (1998) wrapped by custom estates, generally $700K–$2M+. What living in Oakhurst means, what homes run, and why so much of it sells off-market. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
