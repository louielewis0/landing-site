import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "luxury-homes-cass-lake",
  crumbLabel: "Cass Lake Homes",
  eyebrow: "Lakefront market guide · Cass Lake, MI",
  h1: (
    <>
      Luxury homes on <span style={{ color: "var(--s-gold)" }}>Cass Lake</span>
    </>
  ),
  h1Text: "Cass Lake Waterfront Homes — Oakland County's Biggest All-Sports Lake",
  sub: "Cass Lake is Oakland County's largest and deepest lake — a public, all-sports playground spanning Waterford, West Bloomfield, Orchard Lake Village, and Keego Harbor. It's also the county's most liquid luxury-lake market, running from accessible waterfront into near-$10M estates. Here's what drives value and where the luxury tier begins.",
  publishedISO: "2026-11-25",
  publishedLabel: "November 25, 2026",
  bullets: ["Oakland County's largest & deepest lake", "Public, all-sports boating", "Waterfront from ~$400K to ~$10M"],
  sections: [
    {
      heading: "Why Cass Lake is Oakland County's marquee big-water address",
      body: (
        <>
          <p>
            At roughly <strong>1,280 acres and about 123 feet deep</strong>, Cass Lake is the{" "}
            <strong>largest and deepest lake in Oakland County</strong>. It&rsquo;s a <strong>public, all-sports
            lake</strong> on the main branch of the Clinton River chain, bordered by <strong>Waterford Township, West
            Bloomfield, Orchard Lake Village, Keego Harbor,</strong> and the city of Cass Lake, and home to the Pontiac
            Yacht Club and Dodge No. 4 State Park.
          </p>
          <p>
            That combination &mdash; big water, real depth, and all-sports boating &mdash; is rare in the county and is
            exactly what supports a genuine recreational-luxury market: room for wakeboats and cruisers, deep-water
            dockage, and a yacht-club culture that the smaller private lakes can&rsquo;t match.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Lake stats per Michigan DNR / Sail Michigan via public records (2026). Figures below are directional and move with the market.
          </p>
        </>
      ),
    },
    {
      heading: "Where the Cass Lake luxury tier begins",
      body: (
        <>
          <p>
            Cass Lake is unusually <strong>liquid for a luxury-lake market</strong> &mdash; a true estate tier stacked on
            an accessible base. Recent active inventory has spanned roughly <strong>$400,000 at the entry</strong> to a{" "}
            <strong>~$10 million lakefront estate</strong> at the top, with a broad mid-range from about{" "}
            <strong>$415K into the $1M&ndash;$1.4M</strong> band, plus lake lots for buyers who want to build. Because the
            lake is public and all-sports, <strong>direct frontage with permanent deep-water dockage commands the
            premium</strong> over canal, lagoon, or lake-access homes.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Active-listing ranges are approximate and from a single aggregator, current late 2026 &mdash; we&rsquo;ll pull live, address-level comps and closed sales on request.
          </p>
        </>
      ),
    },
    {
      heading: "What drives value on Cass Lake",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Frontage type &amp; dockage.</strong> Direct lakefront with usable deep-water dockage is the top tier; lake-access, lagoon, and canal homes trade well below it. On a lake this deep, dockability for larger boats is a real premium.</li>
            <li><strong>All-sports, big-water recreation.</strong> Size and depth mean genuine boating, watersports, and a yacht-club scene &mdash; the reason Cass Lake draws lifestyle buyers, not just view buyers.</li>
            <li><strong>The chain.</strong> Cass sits on the Clinton River chain (connected toward Loon Lake above and Elizabeth/Sylvan below), expanding the usable water.</li>
            <li><strong>Which shore.</strong> Orchard Lake Village and West Bloomfield addresses, schools, and lot privacy shift value meaningfully from one side of the lake to another.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            For the surrounding market, see our{" "}
            <a href="/luxury-homes-in-orchard-lake" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Orchard Lake luxury guide</a>,{" "}
            <a href="/west-bloomfield-lakefront-homes" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>West Bloomfield lakefront homes</a>, and the broader{" "}
            <a href="/oakland-county-lakefront-homes" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Oakland County lakefront market</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Buying or selling on Cass Lake",
      body: (
        <>
          <p>
            On a lake with this much spread, the details decide everything: <strong>frontage vs. lake-access, dock depth
            and permits, seawall condition, and which shore you&rsquo;re on</strong>. Even here, the premier deep-water
            estate parcels often change hands privately before they&rsquo;d ever hit a public search, so network access
            matters at the top.
          </p>
          <p>
            <strong>Sundus Lewis</strong> and <strong>Real Estate Market Center</strong> help buyers and sellers across
            Cass Lake and the Orchard Lake / West Bloomfield chain. We&rsquo;ve closed <strong>$100M+</strong> across the
            metro, hold a <strong>5.0 rating across 110+ Google reviews</strong>, and will tell you honestly what a given
            dock, frontage, and shore are really worth.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Cass Lake homes — common questions",
  faqs: [
    {
      question: "Is Cass Lake an all-sports lake?",
      answer:
        "Yes. Cass Lake is a public, all-sports lake — Oakland County's largest (about 1,280 acres) and deepest (about 123 feet). It supports full boating and watersports, has a yacht club (Pontiac Yacht Club) and a state park (Dodge No. 4), and sits on the Clinton River chain, which makes deep-water dockage a real premium feature.",
    },
    {
      question: "How much do Cass Lake waterfront homes cost?",
      answer:
        "Cass Lake is an unusually liquid luxury-lake market. Recent active inventory has run from roughly $400,000 at the entry to about $10 million for a top lakefront estate, with a broad mid-range from about $415K into the $1M–$1.4M band, plus buildable lake lots. Direct frontage with deep-water dockage commands the premium over lake-access and canal homes (approximate, late 2026; we'll pull live comps on request).",
    },
    {
      question: "What towns surround Cass Lake?",
      answer:
        "Cass Lake is bordered by Waterford Township, West Bloomfield, Orchard Lake Village, Keego Harbor, and the city of Cass Lake. Which shore you're on — and its address and school district — shifts value meaningfully, so it's worth matching the right side of the lake to your priorities.",
    },
    {
      question: "What's the difference between lakefront and lake-access on Cass Lake?",
      answer:
        "Direct lakefront means your lot touches the open water with (ideally) permanent deep-water dockage — the top tier. Lake-access, lagoon, and canal homes give you use of the lake at a lower price but trade well below true frontage. On a lake this deep, usable dock depth for larger boats is a key value driver, so confirm frontage type and dock permits before you buy.",
    },
    {
      question: "Who is the best agent for Cass Lake waterfront?",
      answer:
        "For a Cass Lake purchase or sale, you want someone who reads frontage, dockage, seawalls, and shore-by-shore value correctly. Sundus Lewis and Real Estate Market Center work the Cass Lake and Orchard Lake / West Bloomfield chain, have closed $100M+ across the metro, and hold a 5.0 rating across 110+ Google reviews.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-orchard-lake", label: "Luxury homes in Orchard Lake" },
    { href: "/west-bloomfield-lakefront-homes", label: "West Bloomfield lakefront homes" },
    { href: "/oakland-county-lakefront-homes", label: "Oakland County lakefront market" },
    { href: "/luxury-homes-pine-lake", label: "Luxury homes on Pine Lake" },
    { href: "/contact", label: "Talk to a waterfront specialist" },
  ],
  ctaHeading: "See Cass Lake waterfront — including off-market frontage",
  ctaBody: (
    <>
      Tell us whether you want big-water boating frontage or an accessible lake-access home, and Real Estate Market
      Center will show you Cass Lake&rsquo;s real inventory &mdash; including the deep-water estates that trade privately
      &mdash; and tell you honestly what the dock and frontage are worth.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a waterfront specialist" },
  metaTitle: "Cass Lake Waterfront Homes, MI | Oakland County's All-Sports Lake",
  metaDescription:
    "Cass Lake is Oakland County's largest (~1,280 acres) and deepest (~123 ft) lake — public, all-sports, spanning Waterford, West Bloomfield, Orchard Lake Village & Keego Harbor. Waterfront runs from ~$400K to ~$10M. What drives value and where luxury begins. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
