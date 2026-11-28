import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const link = { color: "var(--s-gold-ink)", fontWeight: 600 } as const;
const list = { margin: 0, paddingLeft: 18, display: "grid", gap: 10 } as const;
const note = { fontSize: 13, color: "var(--s-muted)" } as const;
const th = { padding: "10px 12px", borderBottom: "2px solid var(--line)", fontWeight: 700, whiteSpace: "nowrap" } as const;
const td = { padding: "10px 12px", borderBottom: "1px solid var(--line)", verticalAlign: "top" } as const;

const rows: [string, string, string, string][] = [
  ["1", "Palmer Woods", "$148,533", "Not reported"],
  ["2", "Sherwood Forest", "$113,750", "$297,900"],
  ["3", "Indian Village", "$103,506", "$389,300"],
  ["4", "Woodbridge", "$93,380", "$241,850"],
  ["5", "Marina District", "$92,700", "$238,100"],
  ["5", "Conner Creek Industrial", "$92,700", "$134,800"],
  ["7", "University District", "$83,828", "$251,600"],
  ["8", "West Side Industrial", "$76,604", "$250,800"],
  ["9", "North Rosedale Park", "$75,824", "$118,700"],
  ["10", "Detroit Golf", "$71,984", "$300,550"],
];

const data: GuidePageData = {
  slug: "richest-neighborhoods-in-detroit",
  crumbLabel: "Richest Neighborhoods in Detroit",
  eyebrow: "Luxury neighborhood guide · Detroit, MI · 2026",
  h1: (
    <>
      The richest neighborhoods <span style={{ color: "var(--s-gold)" }}>in Detroit</span>
    </>
  ),
  h1Text: "Richest Neighborhoods in Detroit (2026): Ranked by Income & Home Values",
  sub: (
    <>
      Detroit&rsquo;s wealthiest neighborhoods are historic districts of brick Tudors, Georgian Revivals, and
      early-1900s mansions, often a fraction of the price of comparable homes in the suburbs. Here is the ranking by
      household income, what homes actually sell for, and what to know before you buy.
    </>
  ),
  bullets: [
    "Palmer Woods: $148,533 median household income",
    "Boston-Edison East: $630K median sale price",
    "Every figure sourced and dated",
  ],
  publishedISO: "2026-11-28",
  publishedLabel: "November 28, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            Ranked by median household income (U.S. Census American Community Survey, 2020&ndash;2024), the richest
            neighborhoods in Detroit are <strong>Palmer Woods</strong>{" "}($148,533), <strong>Sherwood Forest</strong>{" "}
            ($113,750), and <strong>Indian Village</strong>{" "}($103,506), followed by Woodbridge, the Marina District,
            and the University District.
          </p>
          <p>
            By home prices, NeighborhoodScout puts the median home value in the combined{" "}
            <strong>Sherwood Forest / Palmer Woods</strong>{" "}area at <strong>$538,339</strong>, higher than 90.7% of
            neighborhoods in Michigan. By recent sales, Redfin found <strong>Boston-Edison East</strong>{" "}had the
            highest median sale price in the city at about <strong>$630,000</strong>{" "}(October 2025).
          </p>
          <p>
            If you are really looking for the wealthiest communities in the wider metro area, those are suburbs such as
            Bloomfield Hills, Franklin, Birmingham, and Grosse Pointe, covered in our{" "}
            <a href="/most-expensive-neighborhoods-metro-detroit" style={link}>
              richest and most expensive communities in Metro Detroit
            </a>
            .
          </p>
        </>
      ),
    },
    {
      heading: "Detroit's 10 richest neighborhoods by income",
      body: (
        <>
          <div style={{ overflowX: "auto", border: "1px solid var(--line)", borderRadius: 12, background: "#fff" }}>
            <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
              <caption style={{ position: "absolute", left: -9999 }}>
                Detroit neighborhoods ranked by median household income, with Census median home values
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={th}>Rank</th>
                  <th scope="col" style={th}>Neighborhood</th>
                  <th scope="col" style={th}>Median household income</th>
                  <th scope="col" style={th}>Census median home value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[1]}>
                    <td style={td}>{r[0]}</td>
                    <th scope="row" style={{ ...td, fontWeight: 700 }}>{r[1]}</th>
                    <td style={td}>{r[2]}</td>
                    <td style={td}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={note}>
            Source: U.S. Census Bureau American Community Survey 2020&ndash;2024 estimates for 90 Detroit neighborhoods,
            as compiled by HomeSnacks. Census home values are owner estimates averaged over five years, so they run
            well below today&rsquo;s sale prices in the most sought-after districts (see below).
          </p>
        </>
      ),
    },
    {
      heading: "Palmer Woods and Sherwood Forest",
      body: (
        <>
          <p>
            Side by side along the Seven Mile Road and Woodward Avenue corridor, these two historic districts are the
            closest thing Detroit has to an estate neighborhood: curving streets, mature trees, and large brick homes,
            most built before 1940. NeighborhoodScout describes the area as mostly large single-family homes with four
            or more bedrooms, overwhelmingly owner-occupied, where 47.1% of adults hold an advanced degree.
          </p>
          <ul style={list}>
            <li>
              <strong>Palmer Woods</strong>{" "}has the city&rsquo;s highest median household income ($148,533) and is
              known for Tudor Revival and other period estates, including the Frank Lloyd Wright-designed Dorothy
              Turkel House.
            </li>
            <li>
              <strong>Sherwood Forest</strong>{" "}($113,750 median household income) is next door, with a similar mix of
              Tudor, Colonial, and Georgian homes on slightly smaller lots.
            </li>
          </ul>
          <p>
            The combined area&rsquo;s median home value is about <strong>$538,339</strong>{" "}(NeighborhoodScout), more
            expensive than 90.7% of Michigan neighborhoods. The Detroit Golf Club and University District neighborhoods,
            two more of the city&rsquo;s top-income areas, are nearby.
          </p>
        </>
      ),
    },
    {
      heading: "Indian Village",
      body: (
        <>
          <p>
            On the east side near the Detroit River, Indian Village ranks third by income ($103,506) and is one of the
            city&rsquo;s best-known historic districts, a few blocks of large early-20th-century homes on Burns,
            Iroquois, and Seminole streets. Edsel Ford once lived on Iroquois. The Census places its median home value
            at $389,300, though the grandest homes on these streets trade well above that.
          </p>
        </>
      ),
    },
    {
      heading: "Boston-Edison: the priciest sales",
      body: (
        <>
          <p>
            Boston-Edison, north of downtown between Woodward and Linwood, is a historic district of more than 900
            homes where Henry Ford lived before moving to Dearborn. In Redfin&rsquo;s October 2025 analysis, its eastern
            section, Boston-Edison East, posted Detroit&rsquo;s highest median sale price at roughly{" "}
            <strong>$630,000</strong>.
          </p>
          <p style={note}>
            Neighborhood sale medians swing with just a handful of transactions, so treat any single month&rsquo;s figure
            as a snapshot rather than a value for a specific home.
          </p>
        </>
      ),
    },
    {
      heading: "Why Census values and sale prices don't match",
      body: (
        <>
          <p>
            The Census asks owners to estimate their home&rsquo;s value and averages the answers over five years. In
            neighborhoods where prices have climbed quickly, those numbers lag the market. That is why Sherwood
            Forest&rsquo;s Census median ($297,900) sits far below NeighborhoodScout&rsquo;s current estimate for the
            combined Sherwood Forest / Palmer Woods area ($538,339). For pricing a specific home, recent comparable
            sales are the only reliable guide.
          </p>
        </>
      ),
    },
    {
      heading: "Buying a historic luxury home in Detroit",
      body: (
        <>
          <ul style={list}>
            <li>
              <strong>Historic district rules.</strong>{" "}Palmer Woods, Sherwood Forest, Indian Village, and Boston-Edison
              are locally designated historic districts, so exterior changes such as windows, roofs, and additions
              generally need approval from the Detroit Historic District Commission.
            </li>
            <li>
              <strong>Inspect like it&rsquo;s a century old, because it is.</strong>{" "}Budget for specialists to check
              slate or tile roofs, boilers, plaster, wiring, and sewer lines.
            </li>
            <li>
              <strong>Run the real tax number.</strong>{" "}Michigan resets a home&rsquo;s taxable value the year after it
              sells, and Detroit&rsquo;s millage is high. Our{" "}
              <a href="/michigan-property-tax-uncapping-calculator" style={link}>property tax uncapping calculator</a>{" "}
              lets you plug in the city&rsquo;s rate.
            </li>
            <li>
              <strong>Compare with the suburbs.</strong>{" "}Similar square footage often costs far more in{" "}
              <a href="/luxury-homes-in-grosse-pointe" style={link}>Grosse Pointe</a>{" "}or{" "}
              <a href="/luxury-homes-in-bloomfield-hills" style={link}>Bloomfield Hills</a>, which is part of the appeal
              of these Detroit districts.
            </li>
          </ul>
          <p>
            We share public data so you can decide for yourself; we don&rsquo;t steer buyers toward or away from any
            neighborhood. Real Estate Market Center has helped Metro Detroit buyers and sellers since 2003, with more
            than $100 million closed and a 5.0-star rating across 110+ Google reviews.{" "}
            <a href="/homes?location=Detroit" style={link}>Browse Detroit homes for sale</a>{" "}or{" "}
            <a href="/home-value" style={link}>get a free valuation</a>.
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Sources: U.S. Census Bureau ACS 2020&ndash;2024 via HomeSnacks (income ranking, Census home values);
            NeighborhoodScout (Sherwood Forest / Palmer Woods home value and resident profile); Redfin via Stacker
            (Boston-Edison East median sale price, October 2025). Figures are approximate.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Richest neighborhoods in Detroit: common questions",
  faqs: [
    {
      question: "What is the richest neighborhood in Detroit?",
      answer:
        "Palmer Woods, with a median household income of $148,533 (U.S. Census ACS 2020–2024, compiled by HomeSnacks). It is a historic district of large Tudor Revival and period estates near Seven Mile Road and Woodward Avenue, and home to Frank Lloyd Wright's Dorothy Turkel House. Neighboring Sherwood Forest ranks second at $113,750.",
    },
    {
      question: "What are the richest neighborhoods in Detroit?",
      answer:
        "By median household income, the top ten are Palmer Woods ($148,533), Sherwood Forest ($113,750), Indian Village ($103,506), Woodbridge ($93,380), the Marina District and Conner Creek Industrial (both $92,700), the University District ($83,828), West Side Industrial ($76,604), North Rosedale Park ($75,824), and Detroit Golf ($71,984), per Census ACS 2020–2024 data.",
    },
    {
      question: "What is the most expensive neighborhood in Detroit?",
      answer:
        "By recent sales, Boston-Edison East had Detroit's highest median sale price at about $630,000 in Redfin's October 2025 analysis. By estimated home value, the combined Sherwood Forest / Palmer Woods area has a median of about $538,339 (NeighborhoodScout), higher than 90.7% of Michigan neighborhoods.",
    },
    {
      question: "How much does a home cost in Palmer Woods?",
      answer:
        "NeighborhoodScout estimates the median home value in the combined Sherwood Forest / Palmer Woods area at about $538,339. Individual estates vary widely with size, condition, and lot, and sales are infrequent, so recent comparable sales are the best guide for any specific home.",
    },
    {
      question: "What are the richest suburbs of Detroit?",
      answer:
        "Outside the city, the wealthiest communities include Bloomfield Hills, Franklin, Birmingham, Orchard Lake, and the Grosse Pointes. Our guide to the richest and most expensive communities in Metro Detroit ranks them with sourced home values.",
    },
    {
      question: "Do historic district rules apply to these Detroit neighborhoods?",
      answer:
        "Yes. Palmer Woods, Sherwood Forest, Indian Village, and Boston-Edison are locally designated historic districts, so exterior work such as windows, roofing, and additions generally requires approval from the Detroit Historic District Commission. Ask about past approvals and any open violations before you buy.",
    },
  ],
  related: [
    { href: "/most-expensive-neighborhoods-metro-detroit", label: "Richest & most expensive communities in Metro Detroit" },
    { href: "/most-exclusive-neighborhoods-oakland-county", label: "Most exclusive neighborhoods in Oakland County" },
    { href: "/luxury-homes-in-grosse-pointe", label: "Luxury homes in Grosse Pointe" },
    { href: "/luxury-homes-in-bloomfield-hills", label: "Luxury homes in Bloomfield Hills" },
    { href: "/metro-detroit-housing-market-update", label: "Metro Detroit housing market update" },
  ],
  ctaHeading: "Buying or selling a historic Detroit home?",
  ctaBody: (
    <>
      Tell us which districts you&rsquo;re weighing. We&rsquo;ll pull the recent sales, the historic-district history,
      and the real tax number for any home you&rsquo;re considering. No pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local expert" },
  metaTitle: "Richest Neighborhoods in Detroit (2026): Ranked by Income & Home Values",
  metaDescription:
    "The richest neighborhoods in Detroit ranked by Census income: Palmer Woods ($148,533), Sherwood Forest, Indian Village and more, plus home values (Sherwood Forest / Palmer Woods ~$538K) and Boston-Edison East's $630K median sale.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
