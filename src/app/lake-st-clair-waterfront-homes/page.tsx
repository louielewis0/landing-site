import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "lake-st-clair-waterfront-homes",
  crumbLabel: "Lake St. Clair Waterfront",
  eyebrow: "Waterfront market guide · Lake St. Clair, MI",
  h1: (
    <>
      Lake St. Clair <span style={{ color: "var(--s-gold)" }}>waterfront homes</span>
    </>
  ),
  h1Text: "Lake St. Clair Waterfront Homes — Lakefront vs. Canal Guide (2026)",
  sub: "Lake St. Clair is Metro Detroit's boating capital — but 'waterfront' here means two very different things. True lakefront estates on the Grosse Pointe shore trade at a steep premium to the canal homes of St. Clair Shores and Harrison Township. Here's the distinction that decides every deal, what each market runs, and what actually drives value on the water.",
  publishedISO: "2026-11-25",
  publishedLabel: "November 25, 2026",
  bullets: ["Lakefront vs. canal — the real divide", "Grosse Pointe shore to the Nautical Mile", "Deep-water docks drive value"],
  sections: [
    {
      heading: "The one distinction that decides every Lake St. Clair deal: lakefront vs. canal",
      body: (
        <>
          <p>
            More than any other waterfront market in Michigan, Lake St. Clair rewards buyers who understand a single line:{" "}
            <strong>direct lakefront versus canal frontage</strong>. They are priced in completely different worlds, and
            the listings rarely spell out which you&rsquo;re looking at.
          </p>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>True lakefront</strong> &mdash; open water on Lake St. Clair itself &mdash; is concentrated on the <strong>Grosse Pointe shore</strong> (Grosse Pointe Shores, Farms, and Park on the Wayne/south side). This is old-money estate territory: the Edsel &amp; Eleanor Ford House and the Grosse Pointe Yacht Club sit here.</li>
            <li><strong>Canal frontage</strong> &mdash; a boat well on a man-made canal that connects out to the lake &mdash; is how most of the Macomb side gets on the water. <strong>St. Clair Shores</strong> has roughly <strong>14 miles of canals</strong>; <strong>Harrison Township</strong> is about <strong>40% water</strong> with extensive canal systems. Canal homes are a far more affordable entry to Lake St. Clair boating.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Both let you keep a boat steps from the door. But a direct-lakefront Grosse Pointe estate and a canal home in
            St. Clair Shores can differ by a factor of several times in price &mdash; so knowing which you&rsquo;re buying
            is the whole game.
          </p>
        </>
      ),
    },
    {
      heading: "What each market runs (2026)",
      body: (
        <>
          <p>Whole-city median sale prices rank the market cleanly (approximate, 2026):</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Grosse Pointe Shores &mdash; ~$900K median</strong> (Movoto, Nov 2026). The priciest Grosse Pointe and the heart of the true-lakefront estate market; direct-lakefront trophy homes trade well into the millions, above the city-wide median.</li>
            <li><strong>Grosse Pointe Park &mdash; ~$510K median</strong> (up ~14% YoY) and <strong>Grosse Pointe Farms &mdash; ~$485K median</strong> &mdash; affluent lakeshore communities in the Grosse Pointe Public Schools district.</li>
            <li><strong>Harrison Township &mdash; ~$355K median</strong> &mdash; a boating township (Lake St. Clair Metropark, Clinton River mouth) with a mix of lakefront and canal homes.</li>
            <li><strong>St. Clair Shores &mdash; ~$259K median</strong> (NeighborhoodScout, 2026) &mdash; the most affordable way onto the lake, mostly via canals, anchored by the Nautical Mile.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 12 }}>
            These are whole-city medians that blend inland and waterfront stock &mdash; direct-lakefront and premium
            canal parcels trade above them. Figures are directional and move with the market (Movoto, NeighborhoodScout,
            2026). We&rsquo;ll pull live, address-level comps on request.
          </p>
        </>
      ),
    },
    {
      heading: "What actually drives value on the water",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Deep-water access.</strong> Lake St. Clair is naturally shallow; a maintained 30-foot shipping channel is the exception. So a <strong>dock with usable depth for a real boat</strong> is the premium feature &mdash; and the entire economic reason canal neighborhoods exist.</li>
            <li><strong>Boating &amp; yacht culture.</strong> The lake connects Lake Huron to Lake Erie on the Great Lakes Waterway and supports a dozen-plus yacht clubs (including the Grosse Pointe Yacht Club). It&rsquo;s one of the premier boating destinations in the Great Lakes.</li>
            <li><strong>The Nautical Mile.</strong> A mile of Jefferson Avenue in St. Clair Shores (9&ndash;10 Mile) packed with marinas, boat dealers, and waterfront dining &mdash; the amenity engine behind Macomb-side canal demand.</li>
            <li><strong>Historic estates &amp; schools.</strong> The Grosse Pointe lakeshore carries old-money estate prestige and the Grosse Pointe Public Schools reputation; the Macomb boating cities split among Lake Shore, Lakeview, South Lake, and L&rsquo;Anse Creuse &mdash; a real factor in the price gap.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            For the estate side specifically, see our{" "}
            <a href="/luxury-homes-in-grosse-pointe" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Grosse Pointe luxury guide</a>, and for the inland lake market our{" "}
            <a href="/metro-detroit-lake-living-guide" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Metro Detroit lake-living guide</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Buying or selling on Lake St. Clair",
      body: (
        <>
          <p>
            The right pick depends on what you want: a <strong>trophy Grosse Pointe lakefront estate</strong>, a{" "}
            <strong>canal home with easy lake access</strong> at a fraction of the price, or a boating-family house in
            Harrison Township. The traps are specific &mdash; canal depth and dockability, seawall condition, flood
            insurance, and whether &ldquo;waterfront&rdquo; in a listing actually means open lake &mdash; and they decide
            resale.
          </p>
          <p>
            <strong>Sundus Lewis</strong> and <strong>Real Estate Market Center</strong> help buyers and sellers across
            both sides of Lake St. Clair, from the Grosse Pointe lakeshore to the St. Clair Shores and Harrison Township
            canals. We&rsquo;ve closed <strong>$100M+</strong> across the metro and hold a <strong>5.0 rating across 110+
            Google reviews</strong> &mdash; and we&rsquo;ll tell you honestly what a given dock, canal, or seawall is
            really worth.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Lake St. Clair waterfront — common questions",
  faqs: [
    {
      question: "What's the difference between lakefront and canal homes on Lake St. Clair?",
      answer:
        "Direct lakefront means open water on Lake St. Clair itself — concentrated on the Grosse Pointe shore (Shores, Farms, Park) and the most expensive product. Canal frontage means a boat well on a man-made canal that connects out to the lake, which is how most of the Macomb side (St. Clair Shores has ~14 miles of canals; Harrison Township is ~40% water) gets on the water at a much lower price. Both let you dock a boat, but they're priced in completely different worlds, so it's the first thing to confirm on any 'waterfront' listing.",
    },
    {
      question: "How much do Lake St. Clair waterfront homes cost?",
      answer:
        "By whole-city median (2026, approximate): Grosse Pointe Shores ~$900K (the true-lakefront estate market, with trophy lakefront well into the millions), Grosse Pointe Park ~$510K, Grosse Pointe Farms ~$485K, Harrison Township ~$355K, and St. Clair Shores ~$259K — the cheapest entry to lake boating, mostly via canals. These medians blend inland and waterfront stock; direct-lakefront and premium canal parcels trade above them (Movoto, NeighborhoodScout, 2026).",
    },
    {
      question: "Where is the most prestigious Lake St. Clair waterfront?",
      answer:
        "The Grosse Pointe lakeshore — especially Grosse Pointe Shores, home to the Edsel & Eleanor Ford House and the Grosse Pointe Yacht Club. It carries the highest median price of the Grosse Pointes (~$900K, 2026), old-money estate prestige, and the Grosse Pointe Public Schools reputation.",
    },
    {
      question: "What should I check before buying a canal home for boating?",
      answer:
        "Usable water depth at your dock (Lake St. Clair is naturally shallow, so depth is the premium feature), seawall condition, how direct the run is from the canal out to open water, flood insurance, and whether the listing's 'waterfront' means open lake or a canal. These details decide both your boating and your resale, so get them verified before you write an offer.",
    },
    {
      question: "Can Real Estate Market Center help on both the Grosse Pointe and Macomb sides?",
      answer:
        "Yes. We work the full Lake St. Clair waterfront — the Grosse Pointe lakeshore estates and the St. Clair Shores and Harrison Township canals. Sundus Lewis and Real Estate Market Center have closed $100M+ across the metro and hold a 5.0 rating across 110+ Google reviews, and we'll tell you honestly what a given dock, canal, or seawall is really worth.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-grosse-pointe", label: "Luxury homes in Grosse Pointe" },
    { href: "/metro-detroit-lake-living-guide", label: "Metro Detroit lake-living guide" },
    { href: "/oakland-county-lakefront-homes", label: "Oakland County lakefront market" },
    { href: "/luxury-homes-washington-township", label: "Luxury homes in Washington Township" },
    { href: "/contact", label: "Talk to a waterfront specialist" },
  ],
  ctaHeading: "See Lake St. Clair waterfront — lakefront and canal",
  ctaBody: (
    <>
      Tell us whether you&rsquo;re after a Grosse Pointe lakefront estate or a canal home with easy lake access, and Real
      Estate Market Center will show you the right side of the water &mdash; and tell you honestly what the dock, canal,
      and seawall are really worth.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a waterfront specialist" },
  metaTitle: "Lake St. Clair Waterfront Homes | Lakefront vs. Canal Guide (2026)",
  metaDescription:
    "Lake St. Clair waterfront, explained: true lakefront on the Grosse Pointe shore (median ~$900K) vs. the far cheaper canal homes of St. Clair Shores (~$259K) and Harrison Township (~$355K). What drives value, deep-water docks, and the distinction that decides every deal. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
