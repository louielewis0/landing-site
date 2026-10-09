import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "living-in-troy",
  crumbLabel: "Living in Troy",
  eyebrow: "Relocation guide · Troy, MI",
  h1: (
    <>
      Living in <span style={{ color: "var(--s-gold)" }}>Troy, Michigan</span>
    </>
  ),
  h1Text: "Living in Troy, MI: Schools, Housing, Cost & What It's Really Like (2026)",
  sub: (
    <>
      Troy is the suburb people move to for two things above all: top-ranked schools and homes that
      hold their value. Here&rsquo;s an honest look at who thrives here, what it costs, the schools, the
      commute &mdash; and the trade-offs &mdash; from a local brokerage.
    </>
  ),
  bullets: [
    "Top-tier schools & strong resale value",
    "Typical home ~$459K · median ~19 days to sell",
    "Corporate job hub, very safe, amenity-rich",
  ],
  publishedISO: "2026-10-09",
  publishedLabel: "October 9, 2026",
  sections: [
    {
      heading: "Who Troy is for",
      body: (
        <>
          <p>
            Troy consistently draws families who put schools and long-term value first, plus
            professionals who want a short commute to Oakland County&rsquo;s corporate corridor. It&rsquo;s
            one of Metro Detroit&rsquo;s most diverse suburbs, with large, well-established communities
            and a reputation for safety and stability. If you want a polished, amenity-rich suburb
            with excellent schools and homes that resell well, Troy is usually at the top of the list.
          </p>
        </>
      ),
    },
    {
      heading: "Lifestyle: what there is to do",
      body: (
        <>
          <p>
            Troy&rsquo;s center of gravity is the <strong>Somerset Collection</strong> &mdash; one of the
            region&rsquo;s premier shopping and dining destinations &mdash; along the Big Beaver corridor.
            You&rsquo;ll find excellent, genuinely international dining, the Troy Community Center, parks,
            and the Stage Nature Center. It&rsquo;s more of a refined, convenient suburb than a nightlife
            town: the trade-off for all that polish is that Troy doesn&rsquo;t have a walkable downtown
            core the way Birmingham or Rochester do.
          </p>
        </>
      ),
    },
    {
      heading: "Schools",
      body: (
        <>
          <p>
            Schools are the headline. <strong>Troy School District</strong> &mdash; anchored by Troy
            High and Athens High, plus access to the International Academy &mdash; is among the
            strongest in Michigan and a primary reason homes here hold value. Buyers pay a premium for
            the strongest zones, so verify the exact school boundary for any home you&rsquo;re
            considering. See{" "}
            <a href="/homes-in-the-troy-school-district">homes in the Troy School District</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Housing & the market",
      body: (
        <>
          <p>
            Troy&rsquo;s housing is largely 1960s&ndash;80s ranches and colonials alongside newer builds,
            so condition and updates swing price significantly. As of the latest sourced data the
            typical home value is about <strong>$458,678</strong> (up ~2.2% year over year), with a
            median of roughly <strong>19 days on market</strong> &mdash; a liquid, in-demand market.
          </p>
          <p>
            Curious what a specific home is worth, or what your current one would sell for?{" "}
            <a href="/what-is-my-home-worth-troy">See Troy home values</a> or run the{" "}
            <a href="/home-affordability-calculator">affordability calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Location, commute & the honest trade-offs",
      body: (
        <>
          <p>
            Troy sits at the I-75 / Big Beaver crossroads with quick access to Auburn Hills,
            Birmingham, Rochester, and downtown Detroit (~30&ndash;40 minutes). Major employers are
            close or in-city.
          </p>
          <p>The honest cons to weigh:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>No single walkable downtown &mdash; Troy is car-oriented and spread out.</li>
            <li>Premium pricing versus the Macomb County suburbs just east.</li>
            <li>Big Beaver and Rochester Road traffic can be heavy at peak times.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            For most families, the schools, safety, and resale value outweigh these &mdash; but it&rsquo;s
            worth knowing going in.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Living in Troy — common questions",
  faqs: [
    {
      question: "Is Troy, MI a good place to live?",
      answer:
        "Yes, especially for families. Troy is known for top-ranked schools (Troy School District), low crime, strong home resale value, diverse communities, and convenient access to Oakland County's job centers. The main trade-off is that it lacks a single walkable downtown and is fairly car-oriented.",
    },
    {
      question: "Is Troy, MI expensive to live in?",
      answer:
        "Troy is one of the more expensive Metro Detroit suburbs, with a typical home value around $459,000 as of the latest data, though still well below Birmingham or Bloomfield Hills. Homes hold value well, which many buyers see as worth the premium.",
    },
    {
      question: "What are the schools like in Troy?",
      answer:
        "Troy School District is among the strongest in Michigan, anchored by Troy High and Athens High and with access to the International Academy. Strong schools are a major reason Troy homes retain value. Verify the specific school boundary for any home before buying.",
    },
    {
      question: "How is the commute from Troy?",
      answer:
        "Troy sits at the I-75 and Big Beaver crossroads, with quick access to Auburn Hills, Birmingham, and Rochester, and roughly a 30–40 minute drive to downtown Detroit. Many major employers are in or near the city.",
    },
  ],
  related: [
    { href: "/troy-real-estate-agent", label: "Troy real estate & neighborhoods" },
    { href: "/what-is-my-home-worth-troy", label: "What's my Troy home worth?" },
    { href: "/homes-in-the-troy-school-district", label: "Homes in the Troy School District" },
    { href: "/relocating-to-metro-detroit", label: "Relocating to Metro Detroit" },
    { href: "/best-real-estate-agent-troy", label: "Best real estate agent in Troy" },
  ],
  ctaHeading: "Thinking about moving to Troy?",
  ctaBody: (
    <>
      Talk to a local Troy expert about neighborhoods, schools, and what your budget buys right now
      &mdash; no pressure, just straight answers.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local Troy expert" },
  metaTitle: "Living in Troy, MI: Schools, Housing & What It's Really Like (2026)",
  metaDescription:
    "Thinking of moving to Troy, MI? An honest local guide to Troy's top schools, housing (~$459K typical), cost of living, commute, lifestyle, and the real trade-offs. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
