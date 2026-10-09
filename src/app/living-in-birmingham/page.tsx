import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "living-in-birmingham",
  crumbLabel: "Living in Birmingham",
  eyebrow: "Relocation guide · Birmingham, MI",
  h1: (
    <>
      Living in <span style={{ color: "var(--s-gold)" }}>Birmingham, Michigan</span>
    </>
  ),
  h1Text: "Living in Birmingham, MI: Lifestyle, Schools, Cost & What It's Really Like (2026)",
  sub: (
    <>
      Birmingham is the rare Metro Detroit suburb where you can walk out your door to dinner, a
      gallery, and a bar &mdash; then be home in five minutes. It&rsquo;s the region&rsquo;s walkable luxury
      capital. Here&rsquo;s who it suits, what it costs, and the honest trade-offs.
    </>
  ),
  bullets: [
    "Walkable downtown — dining, shopping, nightlife",
    "Typical home ~$749K · fastest-appreciating suburb",
    "Top schools (Groves & Seaholm)",
  ],
  publishedISO: "2026-10-09",
  publishedLabel: "October 9, 2026",
  sections: [
    {
      heading: "Who Birmingham is for",
      body: (
        <>
          <p>
            Birmingham attracts people who want an <strong>urban lifestyle without leaving the
            suburbs</strong> &mdash; professionals, empty-nesters, and families who value walkability,
            dining, and a polished downtown over a big lot. It spans in-town condos and lofts,
            historic homes, and multimillion-dollar Quarton Lake estates, so it works across a wide
            range &mdash; as long as walkable, upscale living is the priority.
          </p>
        </>
      ),
    },
    {
      heading: "Lifestyle: the walkable downtown",
      body: (
        <>
          <p>
            This is Birmingham&rsquo;s whole identity. <strong>Old Woodward and the surrounding
            downtown</strong> pack chef-driven restaurants, boutiques, galleries, the Booth Park and
            Shain Park greens, a landmark movie theater, and genuine nightlife into a compact,
            strollable core. Few Metro Detroit suburbs offer this; it&rsquo;s the premium people pay for,
            and the reason in-town and near-town addresses hold their value.
          </p>
        </>
      ),
    },
    {
      heading: "Schools",
      body: (
        <>
          <p>
            <strong>Birmingham Public Schools</strong> &mdash; split between Groves and Seaholm high
            schools &mdash; is a strong, top-tier district that supports steady family demand. Which
            high school a home feeds can matter to buyers, so confirm the boundary. See{" "}
            <a href="/homes-in-birmingham-public-schools">Birmingham Public Schools: Groves vs Seaholm</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Housing & the market",
      body: (
        <>
          <p>
            The typical Birmingham home value is about <strong>$749,411</strong> &mdash; up a
            market-leading <strong>~6.5% year over year</strong>, the fastest appreciation of the
            suburbs we track. True luxury inventory generally begins around <strong>$1.5M</strong> and
            climbs into the multimillions along the Quarton Lake corridor. One local reality worth
            knowing: a large share of the high end sells <strong>off-market</strong> and never reaches
            Zillow.
          </p>
          <p>
            <a href="/what-is-my-home-worth-birmingham">See Birmingham home values</a> &middot;{" "}
            <a href="/luxury-homes-in-birmingham">Birmingham luxury market guide</a>
          </p>
        </>
      ),
    },
    {
      heading: "Location, commute & the honest trade-offs",
      body: (
        <>
          <p>
            Birmingham sits along Woodward with fast access to Royal Oak, Bloomfield, Troy, and about
            a 25&ndash;30 minute drive to downtown Detroit.
          </p>
          <p>The honest cons to weigh:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>It&rsquo;s expensive &mdash; the highest typical prices of the suburbs we track.</li>
            <li>In-town lots are small; if you want acreage, look to Bloomfield.</li>
            <li>Downtown parking and summer-weekend crowds come with the walkable-lifestyle territory.</li>
          </ul>
        </>
      ),
    },
  ],
  faqHeading: "Living in Birmingham — common questions",
  faqs: [
    {
      question: "Is Birmingham, MI a good place to live?",
      answer:
        "Yes, particularly if you want a walkable, upscale lifestyle. Birmingham offers a vibrant downtown with dining, shopping, and nightlife, a top-tier school district, and strong home values. The main trade-offs are high prices and small in-town lots.",
    },
    {
      question: "Why is Birmingham, MI so expensive?",
      answer:
        "Birmingham combines a highly walkable downtown, a top-tier school district, and limited luxury supply around Quarton Lake. That scarcity plus lifestyle premium has made it the fastest-appreciating suburb we track, with a typical home value around $749,000.",
    },
    {
      question: "Is Birmingham good for families or more for young professionals?",
      answer:
        "Both. Young professionals and empty-nesters love the walkable downtown and in-town condos, while families are drawn to Birmingham Public Schools (Groves and Seaholm) and the historic neighborhoods. The city spans condos to large estates.",
    },
    {
      question: "How far is Birmingham from downtown Detroit?",
      answer:
        "Birmingham is roughly a 25–30 minute drive down Woodward to downtown Detroit, with quick access to Royal Oak, Bloomfield, and Troy.",
    },
  ],
  related: [
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate & neighborhoods" },
    { href: "/what-is-my-home-worth-birmingham", label: "What's my Birmingham home worth?" },
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/homes-in-birmingham-public-schools", label: "Birmingham Public Schools guide" },
    { href: "/best-real-estate-agent-birmingham", label: "Best real estate agent in Birmingham" },
  ],
  ctaHeading: "Thinking about moving to Birmingham?",
  ctaBody: (
    <>
      Talk to a local Birmingham expert &mdash; including access to homes that never hit the public
      market. No pressure, just straight answers.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local Birmingham expert" },
  metaTitle: "Living in Birmingham, MI: Lifestyle, Schools & Cost (2026)",
  metaDescription:
    "Moving to Birmingham, MI? An honest local guide to Birmingham's walkable downtown, top schools, housing (~$749K typical), cost, commute, and the real trade-offs. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
