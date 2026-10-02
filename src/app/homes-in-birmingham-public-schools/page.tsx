import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "homes-in-birmingham-public-schools",
  crumbLabel: "Homes in Birmingham Public Schools",
  eyebrow: "School district guide · Oakland County",
  h1: (
    <>
      Homes in the <span style={{ color: "var(--s-gold)" }}>Birmingham Public Schools</span> district
    </>
  ),
  h1Text: "Homes in Birmingham Public Schools — Groves vs Seaholm, Boundaries & Prices",
  sub: "One of Michigan's top-10 districts — but its boundaries sprawl across six cities and the Groves/Seaholm line runs right through Birmingham. Here's who it serves, the schools, prices, and how to know which high school a home feeds.",
  publishedISO: "2026-10-02",
  publishedLabel: "October 2, 2026",
  bullets: ["Top-10 district in Michigan", "Groves vs Seaholm split", "Verified on every listing"],
  sections: [
    {
      heading: "What Birmingham Public Schools actually covers",
      body: (
        <>
          <p>
            Birmingham Public Schools is headquartered in Beverly Hills (not Birmingham) and reaches across far more than
            one city. It serves the City of Birmingham, Beverly Hills, Bingham Farms, and Franklin in full, plus portions
            of Bloomfield Township, Bloomfield Hills, Southfield, Troy, and West Bloomfield. The irregular lines trace back
            to 1940s consolidations and do <em>not</em> follow today's city boundaries.
          </p>
          <p>
            <strong>The confusion that costs buyers:</strong> Birmingham schools are not the same as Bloomfield Hills
            schools. A home with a &ldquo;Bloomfield Hills&rdquo; or &ldquo;Bloomfield Township&rdquo; mailing address may
            actually be zoned to <em>Birmingham</em> Public Schools — and parts of Troy, Southfield, and West Bloomfield
            feed Birmingham too. Bloomfield Township alone is split among four districts. The mailing city tells you
            nothing reliable about the school.
          </p>
        </>
      ),
    },
    {
      heading: "The schools — and Groves vs. Seaholm",
      body: (
        <>
          <p>
            Birmingham Public Schools is one of Michigan's top-ranked districts — Niche 2026 gives it an overall{" "}
            <strong>A+</strong> and ranks it <strong>#9 in the state</strong> (not #1, despite common claims). Enrollment
            is around 7,400 across roughly 15 schools.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>Wylie E. Groves High School</strong> (Beverly Hills) — GreatSchools 8/10; Niche A+, ranked ~#12 public high school in Michigan.</li>
            <li><strong>Ernest W. Seaholm High School</strong> (Birmingham) — GreatSchools 8/10; Niche A, ranked ~#19 in Michigan. Both are excellent.</li>
            <li><strong>Middle schools:</strong> Berkshire and Derby. <strong>Elementaries (8):</strong> Beverly, Bingham Farms, Greenfield, Harlan, Pembroke, Pierce, Quarton, and West Maple, plus the district-wide Birmingham Covington School (grades 3–8).</li>
          </ul>
          <p>
            Crucially, <strong>the Groves/Seaholm boundary runs right through the City of Birmingham</strong> — two listings
            a few blocks apart can feed different high schools. Attendance lines can literally run down the middle of a
            street, so the high school is never a given from the address alone.
          </p>
        </>
      ),
    },
    {
      heading: "Home prices across the district",
      body: (
        <>
          <p>Because the district spans several communities, prices range widely — all within the same schools:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>City of Birmingham</strong> — Metro Detroit's priciest city; median sale price around <strong>$1.0M–$1.1M</strong> (2026), with luxury into the millions.</li>
            <li><strong>Beverly Hills</strong> — median home value roughly <strong>$600K</strong>.</li>
            <li><strong>Bingham Farms</strong> — around <strong>$620K</strong>; <strong>Franklin</strong> — around <strong>$650K</strong>, with larger, semi-rural lots.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Practical range: roughly $600K on the lower end (Beverly Hills / Bingham Farms / Franklin) up to $1M–$2M+ in
            the City of Birmingham. Figures vary by source and month.
          </p>
        </>
      ),
    },
    {
      heading: "Which neighborhoods feed Groves vs. Seaholm",
      body: (
        <>
          <p>
            As a general pattern (always confirm the specific parcel): <strong>Seaholm</strong> draws from northern and
            central Birmingham — the walkable downtown-adjacent neighborhoods, Quarton Lake / Quarton Lake Estates, and
            Poppleton Park. <strong>Groves</strong> draws from southern Birmingham plus Beverly Hills, Bingham Farms, and
            Franklin (the larger-lot, more semi-rural communities), along with variable-by-street parts of Bloomfield
            Township.
          </p>
          <p>Both are strong schools, so for most buyers this is about fit and feeder certainty, not quality.</p>
        </>
      ),
    },
    {
      heading: "How to confirm a home's school — and high school",
      body: (
        <>
          <p>
            With the district spanning six cities and the Groves/Seaholm line cutting through Birmingham itself, the only
            reliable answer is the <strong>official Birmingham Public Schools boundary/address lookup</strong>, checked
            against the exact parcel — never the mailing city or neighborhood name.
          </p>
          <p>
            We verify the district <em>and</em> the assigned high school on every listing before our clients offer, so a
            &ldquo;Bloomfield&rdquo; address that's actually Birmingham — or a Birmingham home that feeds the other high
            school than you assumed — never surprises you at closing.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Is Birmingham Public Schools the #1 district in Michigan?",
      answer:
        "It's one of the top-10 districts in Michigan — Niche 2026 gives it an overall A+ and ranks it #9 in the state (Novi is #1). Both of its high schools, Groves and Seaholm, rank among Michigan's top-20 public high schools. So while 'top-ranked' is accurate, a flat '#1 in Michigan' claim is not — it's #9.",
    },
    {
      question: "What's the difference between Groves and Seaholm?",
      answer:
        "Both are excellent, top-20 Michigan public high schools in the same district. Seaholm generally serves northern and central Birmingham (downtown-adjacent, Quarton Lake, Poppleton Park), while Groves serves southern Birmingham plus Beverly Hills, Bingham Farms, and Franklin. The boundary runs through the City of Birmingham, so two nearby homes can feed different high schools — confirm the specific address.",
    },
    {
      question: "Does a Bloomfield Hills address mean Bloomfield Hills schools, not Birmingham?",
      answer:
        "Not necessarily. Birmingham Public Schools serves portions of Bloomfield Township and Bloomfield Hills, so a 'Bloomfield' mailing address can actually be zoned to Birmingham — and vice versa. Bloomfield Township is split among four districts. The only way to know is to verify the specific parcel against the district boundary maps.",
    },
    {
      question: "How much do homes in the Birmingham Public Schools district cost?",
      answer:
        "It depends on the community: roughly $600K in Beverly Hills, Bingham Farms, and Franklin, up to $1M–$2M+ in the City of Birmingham itself — all feeding the same top-ranked district. That range is part of the appeal: you can access Birmingham schools at a lower price point in the surrounding communities. Figures vary by source and month.",
    },
    {
      question: "How do I confirm which Birmingham high school a home feeds?",
      answer:
        "Use the official Birmingham Public Schools boundary/address lookup against the exact parcel — not the mailing city or neighborhood name, since the Groves/Seaholm line runs through Birmingham. We verify the district and assigned high school on every listing for our clients before they offer.",
    },
  ],
  faqHeading: "Birmingham Public Schools questions",
  related: [
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate guide" },
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/homes-in-the-bloomfield-hills-school-district", label: "Bloomfield Hills School District (vs Birmingham)" },
  ],
  ctaHeading: "Find a home in the Birmingham district — and the right high school",
  ctaBody: "Tell us your budget and whether you want Groves or Seaholm, and we'll send homes with the district and high-school feeder confirmed on each one — including the lower-priced communities that feed the same top-10 schools.",
  ctaPrimary: { href: "/home-value", label: "Start with a free valuation" },
  metaTitle: "Homes in Birmingham Public Schools | Groves vs Seaholm, Boundaries & Prices",
  metaDescription:
    "Birmingham Public Schools spans six cities and the Groves/Seaholm line runs through Birmingham. See the schools and ratings, who the district really serves, home prices by community, and how to verify a home's high school.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
