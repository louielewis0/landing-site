import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "homes-in-the-troy-school-district",
  crumbLabel: "Homes in the Troy School District",
  eyebrow: "School district guide · Oakland County",
  h1: (
    <>
      Homes in the <span style={{ color: "var(--s-gold)" }}>Troy School District</span>
    </>
  ),
  h1Text: "Homes in the Troy School District — Boundaries, Troy High vs Athens & Prices",
  sub: "Troy schools are a top-3 district in Michigan — but the City of Troy is split among six districts, and which high school a home feeds depends on the exact address. Here's the map, the schools, and the prices.",
  publishedISO: "2026-09-30",
  publishedLabel: "September 30, 2026",
  bullets: ["Top-3 district in Michigan", "6 districts serve the city", "Verified on every listing"],
  sections: [
    {
      heading: "The City of Troy is served by six school districts",
      body: (
        <>
          <p>
            This surprises almost every buyer: the City of Troy is <strong>not</strong> served by Troy School District
            alone. Per the city's own records, six districts serve Troy addresses — Troy, Avondale, Birmingham Public
            Schools, Bloomfield Hills, Royal Oak, and Warren Consolidated. Troy School District serves most, but not all,
            of the city.
          </p>
          <p>
            <strong>And even inside Troy School District, the high school isn't a given.</strong> Troy High and Athens
            High anchor two separate feeder patterns with distinct boundaries — so two similar houses a mile apart can be
            assigned to different high schools. Buying on the wrong side of a boundary can change your child's school and
            the home's resale appeal. The mailing address won't tell you; only the parcel's assignment does.
          </p>
        </>
      ),
    },
    {
      heading: "The schools — and Troy High vs. Athens High",
      body: (
        <>
          <p>
            Troy School District is ranked <strong>#3 in Michigan</strong> (Niche 2026, grade A+), with roughly 12,000
            students across about 20 schools. Schools are routinely cited as the number-one reason buyers target Troy.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>Troy High School</strong> — the higher-rated of the two on the standardized metrics (GreatSchools ~9–10/10; frequently ranked a top-5 public high school in Michigan), with strong SAT averages and near-perfect graduation rates.</li>
            <li><strong>Athens High School</strong> — also strong (GreatSchools ~8/10), ranked well within the state's top tier. Both are excellent; Troy High simply rates higher on test scores.</li>
            <li>Plus the application-based International Academy East and the Troy College &amp; Career High School.</li>
            <li><strong>Middle schools (4):</strong> Baker, Boulan Park, Larson, Smith. <strong>Elementaries (12):</strong> including Bemis, Hamilton, Hill, Wass, and Wattles.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Which high school a home feeds depends entirely on its address — confirm it before you offer.
          </p>
        </>
      ),
    },
    {
      heading: "Home prices in the district",
      body: (
        <>
          <p>
            Troy's median sits in the <strong>low-to-mid $400,000s</strong> (2025–2026 snapshots ranged roughly
            $420K–$475K depending on the month and source), with the typical middle-50% of sales spanning about
            $310,000 to $590,000. Premium subdivisions run well above that.
          </p>
          <p>
            Homes inside the Troy School District boundary — and especially in the Troy High feeder — tend to command a
            measurable premium over otherwise-identical homes just across a district or feeder line. That premium is real
            and worth understanding before you buy or sell.
          </p>
        </>
      ),
    },
    {
      heading: "Notable neighborhoods",
      body: (
        <>
          <p>
            <strong>Beach Forest</strong> is Troy's premier subdivision — it has held some of the highest average home
            values in the city for decades, with a private pool and tennis, and it feeds Hamilton Elementary, Boulan Park
            Middle, and Troy High. Other established family neighborhoods include the Hills of Charnwood and the Somerset
            Pines / Forest Creek areas.
          </p>
          <p>
            As always, don't assume a neighborhood's school assignment from its reputation — confirm the specific home's
            feeder pattern against the district map.
          </p>
        </>
      ),
    },
    {
      heading: "How to confirm a home's district and high school",
      body: (
        <>
          <p>
            With six districts carving up the city and two high-school feeder patterns inside Troy School District, the
            only reliable answer comes from the <strong>district boundary map and the City of Troy's GIS</strong>, checked
            against the exact parcel — never the mailing address or ZIP.
          </p>
          <p>
            We verify the district <em>and</em> the assigned high school on every Troy listing before our clients offer.
            In a market where schools drive value this heavily, that one check protects both your family and your
            investment.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Is all of Troy in the Troy School District?",
      answer:
        "No. The City of Troy is served by six districts — Troy, Avondale, Birmingham, Bloomfield Hills, Royal Oak, and Warren Consolidated. Troy School District serves most of the city, but not all of it. A Troy address alone doesn't guarantee Troy schools, so the specific parcel must be verified.",
    },
    {
      question: "What's the difference between Troy High and Athens High?",
      answer:
        "Both are strong schools in the same top-ranked district, but they anchor separate feeder patterns with distinct boundaries, and Troy High rates higher on standardized metrics (roughly 9–10/10 on GreatSchools and often a top-5 Michigan public high school, versus about 8/10 for Athens). Which one a home feeds depends entirely on the address — two nearby homes can be assigned to different high schools.",
    },
    {
      question: "How good is the Troy School District?",
      answer:
        "It's ranked #3 in Michigan (Niche 2026, grade A+), with about 12,000 students. Troy High is frequently ranked a top-5 public high school in the state. Schools are consistently cited as the number-one reason buyers choose Troy, which supports strong, stable home values.",
    },
    {
      question: "How much do homes in the Troy School District cost?",
      answer:
        "Troy's median runs in the low-to-mid $400,000s (2025–2026), with the typical middle-50% of sales between roughly $310,000 and $590,000, and premium subdivisions above that. Homes confirmed inside the Troy School District — especially the Troy High feeder — tend to carry a measurable premium.",
    },
    {
      question: "How do I confirm which school a Troy home feeds?",
      answer:
        "Check the district boundary map and the City of Troy's GIS against the exact parcel, not the mailing address. Because the city is split six ways and Troy School District has two high-school feeders, this is essential. We verify the district and assigned high school on every listing for our clients before they offer.",
    },
  ],
  faqHeading: "Troy School District questions",
  related: [
    { href: "/troy-real-estate-agent", label: "Troy real estate guide" },
    { href: "/best-real-estate-agent-troy", label: "Meet Troy's top broker" },
    { href: "/best-real-estate-brokerages-troy", label: "Compare Troy brokerages" },
  ],
  ctaHeading: "Find a home in the Troy High feeder you want",
  ctaBody: "Tell us which schools matter and your budget, and we'll send Troy homes with the district and high-school feeder confirmed on each one — so the home you love is the school you expected.",
  ctaPrimary: { href: "/home-value", label: "Start with a free valuation" },
  metaTitle: "Homes in the Troy School District | Troy High vs Athens, Boundaries & Prices",
  metaDescription:
    "The City of Troy is split among six school districts, and Troy High vs Athens depends on the address. See the schools, ratings, home prices, and how to verify a home's Troy School District feeder before you buy.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
