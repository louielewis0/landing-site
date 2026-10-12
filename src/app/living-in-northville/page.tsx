import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "living-in-northville",
  crumbLabel: "Living in Northville",
  eyebrow: "Relocation guide · Northville, MI",
  h1: (
    <>
      Living in <span style={{ color: "var(--s-gold)" }}>Northville, Michigan</span>
    </>
  ),
  h1Text: "Living in Northville, MI: Schools, Downtown, Cost & What It's Like (2026)",
  sub: (
    <>
      Northville is that rare combination: a storybook walkable downtown, one of Michigan&rsquo;s very
      best school districts, and a once-in-a-generation new neighborhood rising on the old racetrack.
      Here&rsquo;s who it suits, what it costs, and the honest trade-offs.
    </>
  ),
  bullets: [
    "Historic, walkable downtown",
    "Northville Public Schools — among Michigan's best",
    "Typical home ~$607K; a true luxury tier above",
  ],
  publishedISO: "2026-10-12",
  publishedLabel: "October 12, 2026",
  sections: [
    {
      heading: "Who Northville is for",
      body: (
        <>
          <p>
            Northville attracts <strong>families and move-up buyers</strong> who want top schools and
            genuine small-town character &mdash; plus professionals drawn to the walkable downtown and
            golf-community living. It leans upscale: this is a place people put down roots for the
            long haul, not a starter market.
          </p>
        </>
      ),
    },
    {
      heading: "Lifestyle: a downtown people fall in love with",
      body: (
        <>
          <p>
            Northville&rsquo;s <strong>historic downtown</strong> is the heart of it &mdash; tree-lined
            streets, independent restaurants and shops, the 1925 Marquis Theater, and year-round
            community events. Add <strong>Maybury State Park</strong> at the edge of town, golf at
            Northville Hills, and now <strong>&ldquo;The Downs&rdquo;</strong> &mdash; the ~48-acre
            redevelopment of the former Northville Downs racetrack into a new walkable neighborhood
            with homes, shops, parks, and daylighted riverfront &mdash; and the lifestyle appeal is hard
            to match.
          </p>
        </>
      ),
    },
    {
      heading: "Schools",
      body: (
        <>
          <p>
            <strong>Northville Public Schools</strong> ranks among the very best in Michigan (Niche
            2026: A+, around #2 statewide), with Northville High near the top of the state. It&rsquo;s a
            core reason homes here hold their value and families compete to get in.
          </p>
        </>
      ),
    },
    {
      heading: "Housing & the market",
      body: (
        <>
          <p>
            Northville&rsquo;s typical home value is roughly <strong>$607,000</strong> (up about 5% year
            over year), with a recent median sale price around <strong>$517,000</strong> &mdash; and a
            deep luxury tier above, from golf-course estates to new construction at The Downs. Entry
            homes sell quickly; the high end moves more slowly, so pricing precision matters.
          </p>
          <p>
            <a href="/luxury-homes-in-northville">See Northville&rsquo;s luxury market</a> &middot;{" "}
            <a href="/home-affordability-calculator">affordability calculator</a>
          </p>
        </>
      ),
    },
    {
      heading: "Location, commute & the honest trade-offs",
      body: (
        <>
          <p>
            Northville sits near I-275 and M-14, with quick access to Novi, Plymouth, Ann Arbor, and
            roughly 35&ndash;40 minutes to downtown Detroit.
          </p>
          <p>The honest cons to weigh:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>It&rsquo;s expensive &mdash; among the pricier suburbs on the west side.</li>
            <li>Inventory is tight, especially in-town near downtown.</li>
            <li>
              The city straddles the Wayne/Oakland county line (neighboring Northville Township is
              entirely Wayne) &mdash; worth confirming for a specific address.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqHeading: "Living in Northville — common questions",
  faqs: [
    {
      question: "Is Northville, MI a good place to live?",
      answer:
        "Yes — Northville is consistently one of the most desirable suburbs in Metro Detroit, known for a charming walkable downtown, a top-ranked school district (around #2 in Michigan), and strong home values. The trade-offs are higher prices and tight inventory.",
    },
    {
      question: "Is Northville expensive?",
      answer:
        "Yes, relatively. The typical home value is around $607,000, with a deep luxury tier above that from golf-course estates to new construction at The Downs. Recent median sale prices run around $517,000.",
    },
    {
      question: "What is 'The Downs' in Northville?",
      answer:
        "The Downs is the redevelopment of the former Northville Downs racetrack (which operated 1944–2024) into a roughly 48-acre walkable neighborhood with new homes, shops, parks, and riverfront — adding significant new housing, including luxury homes, right near downtown.",
    },
    {
      question: "Is Northville in Wayne or Oakland County?",
      answer:
        "Both. The City of Northville straddles the Wayne/Oakland county line (roughly half in each), while the separate Northville Township to the south is entirely in Wayne County. Confirm the county and school details for a specific address.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-northville", label: "Luxury homes in Northville" },
    { href: "/what-is-my-home-worth-northville", label: "What's my Northville home worth?" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/relocating-to-metro-detroit", label: "Relocating to Metro Detroit" },
    { href: "/living-in-novi", label: "Living in Novi" },
  ],
  ctaHeading: "Thinking about moving to Northville?",
  ctaBody: (
    <>
      Talk to a local expert about downtown vs. the golf communities, new construction at The Downs,
      and what your budget buys &mdash; no pressure, just straight answers.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local Northville expert" },
  metaTitle: "Living in Northville, MI: Schools, Downtown & Cost (2026)",
  metaDescription:
    "Moving to Northville, MI? An honest local guide to the walkable historic downtown, top-ranked schools, The Downs redevelopment, housing (~$607K typical), commute, and the real trade-offs. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
