import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const LAKES: { lake: string; where: string; acres: string; depth: string; type: string }[] = [
  { lake: "Cass Lake", where: "Waterford / West Bloomfield / Keego Harbor", acres: "1,280", depth: "123 ft", type: "Public · all-sports" },
  { lake: "Orchard Lake", where: "Orchard Lake Village", acres: "795", depth: "110 ft", type: "All-sports" },
  { lake: "Walled Lake", where: "Walled Lake / Novi", acres: "670", depth: "53 ft", type: "All-sports" },
  { lake: "Pontiac Lake", where: "White Lake Twp", acres: "640", depth: "34 ft", type: "Public · all-sports" },
  { lake: "White Lake", where: "White Lake Twp", acres: "540", depth: "—", type: "All-sports" },
  { lake: "Lake Angelus", where: "Lake Angelus / Waterford", acres: "477", depth: "88 ft", type: "Private · all-sports" },
  { lake: "Lake Orion", where: "Orion Twp", acres: "470", depth: "58 ft", type: "All-sports" },
  { lake: "Union Lake", where: "Commerce Twp", acres: "465", depth: "110 ft", type: "All-sports" },
  { lake: "Lakeville Lake", where: "Addison Twp", acres: "460", depth: "68 ft", type: "All-sports" },
  { lake: "Sylvan Lake", where: "Sylvan Lake / Keego Harbor", acres: "458", depth: "71 ft", type: "All-sports" },
  { lake: "Pine Lake", where: "West Bloomfield Twp", acres: "395", depth: "90 ft", type: "Private · all-sports" },
  { lake: "Maceday Lake", where: "Waterford Twp", acres: "234", depth: "117 ft", type: "All-sports" },
  { lake: "Walnut Lake", where: "West Bloomfield Twp", acres: "232", depth: "101 ft", type: "Private · all-sports" },
  { lake: "Woodhull Lake", where: "Waterford / Independence Twp", acres: "135", depth: "56 ft", type: "All-sports" },
];

const data: GuidePageData = {
  slug: "oakland-county-lakefront-homes",
  crumbLabel: "Oakland County Lakes: Lakefront Guide",
  eyebrow: "Lakefront guide · Oakland County",
  h1: (
    <>
      Oakland County Lakes: a <span style={{ color: "var(--s-gold)" }}>lakefront buyer's guide</span>
    </>
  ),
  h1Text: "Oakland County Lakes — A Lakefront Home Buyer's Guide",
  sub: "Oakland County has 400+ lakes — and which one you buy on changes everything. Here's the guide to the county's most desirable lakes, the all-sports vs. no-wake difference that sets prices, and what actually drives lakefront value.",
  publishedISO: "2026-10-05",
  publishedLabel: "October 5, 2026",
  bullets: ["400+ lakes, ranked by desirability", "All-sports vs no-wake explained", "What drives waterfront value"],
  sections: [
    {
      heading: "The one thing every lakefront buyer must understand: all-sports vs. no-wake",
      body: (
        <>
          <p>Before you look at a single home, understand what kind of lake you're buying on — it drives price more than almost anything:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>All-sports lakes</strong> — no horsepower restriction. Powerboats, waterskiing, jet skis, wakeboarding all allowed. These command the biggest premium and the most demand. Examples: Cass, Union, Sylvan, Lake Orion, Lakeville, Pontiac, Maceday.</li>
            <li><strong>No-wake / electric-only lakes</strong> — gas engines restricted or banned, for a quieter experience. They price below all-sports lakes but still above non-waterfront.</li>
            <li><strong>Private lakes</strong> — no public boat launch; access is restricted, often through a lake association. The exclusivity commands a premium. Examples: Pine Lake, Walnut Lake, Lake Angelus.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Boating rules are set lake-by-lake through Michigan DNR &ldquo;Local Watercraft Controls.&rdquo; Always confirm
            a specific lake's current rules with the DNR before you buy — don't rely on a listing's description.
          </p>
        </>
      ),
    },
    {
      heading: "Oakland County's most notable lakes",
      body: (
        <>
          <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--line)", background: "#fff" }}>
            <table style={{ width: "100%", textAlign: "left", fontSize: 13, minWidth: 620, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--s-muted)" }}>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Lake</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Where</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Size</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Max depth</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {LAKES.map((l) => (
                  <tr key={l.lake} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: "var(--s-ink)", whiteSpace: "nowrap" }}>{l.lake}</td>
                    <td style={{ padding: "11px 14px", color: "var(--s-muted)" }}>{l.where}</td>
                    <td style={{ padding: "11px 14px", color: "var(--s-muted)", whiteSpace: "nowrap" }}>{l.acres} ac</td>
                    <td style={{ padding: "11px 14px", color: "var(--s-muted)", whiteSpace: "nowrap" }}>{l.depth}</td>
                    <td style={{ padding: "11px 14px", color: "var(--s-muted)" }}>{l.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 10 }}>
            Lake sizes and depths from public records; <strong>Cass Lake is the county's largest (1,280 acres) and deepest
            (123 ft).</strong> Confirm current boating rules per lake with the Michigan DNR.
          </p>
        </>
      ),
    },
    {
      heading: "The most prestigious lakes for real estate",
      body: (
        <>
          <p>
            For luxury lakefront, the top of the market concentrates on a handful of lakes: <strong>Pine Lake</strong>
            (private, all-sports, West Bloomfield), <strong>Orchard Lake</strong> (Orchard Lake Village's most prestigious
            address, next to Orchard Lake Country Club), <strong>Cass Lake</strong> (the largest, with the widest range of
            high-end homes), and the private Bloomfield-area lakes — <strong>Walnut Lake</strong> (prized for water
            clarity) and <strong>Lake Angelus</strong> (its own tiny city, the highest typical home value in Oakland
            County). Estates on these lakes reach well into the multi-millions, and inventory is scarce.
          </p>
        </>
      ),
    },
    {
      heading: "What drives lakefront value in Oakland County",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>Lake type</strong> — all-sports {">"} electric-only/no-wake {">"} non-motorized. The single biggest lever.</li>
            <li><strong>Frontage</strong> — linear feet of shoreline; more frontage, more value.</li>
            <li><strong>Lake size and whether it's part of a chain</strong> — bigger, connected water is more desirable.</li>
            <li><strong>Water depth and clarity</strong> — deeper, cleaner lakes (Walnut Lake is often cited for clarity) carry a premium.</li>
            <li><strong>Seawall condition</strong> and <strong>dock / riparian rights</strong> — maintained shoreline and legal water access reduce buyer risk and add value.</li>
            <li><strong>Lakefront vs. lake access</strong> — true frontage commands a large premium over deeded or shared access.</li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What is the largest lake in Oakland County?",
      answer:
        "Cass Lake is Oakland County's largest lake at 1,280 acres, and also its deepest at 123 feet. It's a public, all-sports lake spanning Waterford Township, West Bloomfield, Orchard Lake Village, and Keego Harbor, with a wide range of homes from accessible to multi-million-dollar estates.",
    },
    {
      question: "What's the difference between an all-sports and a no-wake lake?",
      answer:
        "An all-sports lake has no horsepower restriction — powerboats, waterskiing, jet skis, and wakeboarding are all allowed — and commands the biggest price premium. A no-wake or electric-only lake restricts or bans gas engines for a quieter experience, and prices below all-sports (though still above non-waterfront). Rules are set per lake by the Michigan DNR, so always confirm a specific lake before buying.",
    },
    {
      question: "Which Oakland County lakes are the most expensive for real estate?",
      answer:
        "The most prestigious are Pine Lake (private, all-sports, West Bloomfield), Orchard Lake (Orchard Lake Village), Cass Lake (the largest), and the private Bloomfield-area lakes — Walnut Lake and Lake Angelus. Estates on these reach into the multi-millions, with limited inventory. Lake Angelus, its own small city, has the highest typical home value in the county.",
    },
    {
      question: "How much more does a lakefront home cost?",
      answer:
        "True lakefront typically carries a premium of roughly 40–200% over a comparable off-lake home, depending on the lake, the frontage, and whether it's all-sports. Deeded or shared lake access (not true frontage) costs well below that. The specific lake and amount of shoreline matter more than square footage at the waterfront.",
    },
    {
      question: "What should I check before buying a lakefront home in Oakland County?",
      answer:
        "Confirm four things per property: the lake's boating status (all-sports vs no-wake — via the Michigan DNR), the exact frontage and riparian/dock rights, the seawall condition, and the school district (which can change shoreline to shoreline, especially in West Bloomfield). We verify all of these on every lakefront listing before our clients offer.",
    },
  ],
  faqHeading: "Oakland County lakefront questions",
  related: [
    { href: "/west-bloomfield-lakefront-homes", label: "West Bloomfield lakefront homes" },
    { href: "/most-exclusive-neighborhoods-oakland-county", label: "Most exclusive neighborhoods in Oakland County" },
    { href: "/luxury-homes-in-bloomfield-hills", label: "Luxury homes in Bloomfield Hills" },
  ],
  ctaHeading: "Find your lakefront home — on the right lake",
  ctaBody: "Tell us whether you want all-sports boating, a private lake, or a specific body of water, and we'll send Oakland County lakefront homes with the lake type, frontage, dock rights, and school district confirmed on each one.",
  ctaPrimary: { href: "/home-value", label: "Start with a free valuation" },
  metaTitle: "Oakland County Lakes: Lakefront Home Buyer's Guide (2026)",
  metaDescription:
    "A buyer's guide to Oakland County, MI lakes and lakefront homes: the most desirable lakes (Cass, Pine, Orchard, Walnut, Lake Angelus), all-sports vs no-wake explained, and what drives lakefront value.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
