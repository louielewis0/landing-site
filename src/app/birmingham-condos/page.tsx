import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const link = { color: "var(--s-gold-ink)", fontWeight: 600 } as const;
const list = { margin: 0, paddingLeft: 18, display: "grid", gap: 10 } as const;
const note = { fontSize: 13, color: "var(--s-muted)" } as const;

const data: GuidePageData = {
  slug: "birmingham-condos",
  crumbLabel: "Birmingham Condos",
  eyebrow: "Condo market guide · Birmingham, MI · Updated November 2026",
  h1: (
    <>
      Birmingham condos for sale: <span style={{ color: "var(--s-gold)" }}>downtown luxury buildings</span>{" "}&amp; prices
    </>
  ),
  h1Text: "Birmingham, MI Condos for Sale (2026): Downtown Luxury Buildings, Prices & HOA",
  sub: (
    <>
      Birmingham is the one truly walkable downtown in Oakland County, and its condos are how most people buy into
      it. Here is every major for-sale building, what units cost right now, which towers are rentals in disguise, and
      what to check before you write an offer.
    </>
  ),
  bullets: [
    "57 condos & townhomes listed · $899K median (Nov 2026)",
    "The Willits, The Balmoral, Brookside, Birmingham Place",
    "Birmingham Public Schools: #9 in Michigan (Niche 2026)",
  ],
  publishedISO: "2026-10-14",
  publishedLabel: "October 14, 2026",
  sections: [
    {
      heading: "The Birmingham condo market at a glance (November 2026)",
      body: (
        <>
          <p>
            <strong>Short answer:</strong>{" "}as of November 2026, Birmingham, Michigan has about{" "}
            <strong>57 condos and townhomes for sale</strong>, with a <strong>median list price of $899,000</strong>,
            a median of <strong>$365 per square foot</strong>, and asking prices from{" "}
            <strong>$129,900 to $6,000,000</strong>. The median listing has been on the market{" "}
            <strong>36 days</strong>{" "}(Movoto, November 2026).
          </p>
          <p>
            That median is pulled up by the downtown luxury buildings. The city&rsquo;s attached market is really two
            markets: a walkable, full-service luxury tier along Old Woodward, and a deeper pool of older,
            more attainable condos and townhomes a few blocks out where many units still list in the $185,000 to
            $500,000 range.
          </p>
          <p>
            For context on the whole city, Zillow puts Birmingham&rsquo;s typical home value (all home types) at about{" "}
            <strong>$757,616</strong>{" "}as of June 2026, up 6.4% in a year, and our own Realcomp MLS feed showed{" "}
            <strong>158 active Birmingham listings</strong>{" "}of every type on November 27, 2026, averaging about $1.66
            million in asking price. A condo is the lowest-cost way into a Birmingham address and its schools.
          </p>
          <p style={note}>
            Listing counts and medians move week to week.{" "}
            <a href="/homes?location=Birmingham" style={link}>See today&rsquo;s Birmingham listings</a>.
          </p>
        </>
      ),
    },
    {
      heading: "The downtown luxury condo buildings",
      body: (
        <>
          <p>
            Four buildings define for-sale luxury condo living in downtown Birmingham. Each sits within a short walk of
            Old Woodward&rsquo;s restaurants, boutiques, and parks.
          </p>
          <ul style={list}>
            <li>
              <strong>Brookside Residences (369 N Old Woodward):</strong>{" "}the newest of the group, completed around
              2020. Five stories and about 29 large residences overlooking the wooded Rouge River, with a 24-hour
              lifestyle concierge, valet, a heated private garage, a fitness and wellness center, and a private
              riverside lounge. Recent listings have asked $2.3 million to $2.76 million. This is Birmingham&rsquo;s
              hotel-style, lock-and-leave option.
            </li>
            <li>
              <strong>The Balmoral (34901 Woodward):</strong>{" "}a contemporary building that opened in 2015 with
              interior parking and terraces. Its rooftop penthouse has been listed between{" "}
              <strong>$4.1 million and $4.3 million</strong>, and DBusiness reported it as Michigan&rsquo;s priciest
              penthouse condominium listing.
            </li>
            <li>
              <strong>The Willits (111 Willits St):</strong>{" "}built in 2001, about 100 units over five stories, with
              floor-to-ceiling windows and private balconies in many residences. Homes.com estimates unit values from
              roughly $1.1 million to $2.9 million. It is the established address for downtown luxury.
            </li>
            <li>
              <strong>Birmingham Place (411 S Old Woodward):</strong>{" "}a 10-story, 186-unit building completed in the
              early 1980s, the largest for-sale condo building downtown. Units listed in November 2026 asked about
              $475,000 to $499,900, so it is often the most attainable way to live right on Old Woodward.
            </li>
          </ul>
          <p style={note}>
            Sources: building and listing data (Highrises.com, Homes.com, brokerage listings via Realcomp); DBusiness
            (Balmoral penthouse). Value ranges are indicative and depend on floor, view, and finishes.
          </p>
        </>
      ),
    },
    {
      heading: "Beyond the core: where the attainable condos are",
      body: (
        <>
          <p>
            A few blocks from Old Woodward, Birmingham&rsquo;s smaller condo associations and townhome communities
            carry most of the inventory under $700,000. Representative asking prices from November 2026 listings:
          </p>
          <ul style={list}>
            <li><strong>750 Forest Ave:</strong>{" "}about $594,000 to $699,000</li>
            <li><strong>1113 N Old Woodward Ave:</strong>{" "}about $375,000 to $475,000</li>
            <li><strong>444 Chester St:</strong>{" "}about $289,000 to $340,000</li>
            <li><strong>327 Southfield Rd:</strong>{" "}about $279,000 to $314,900</li>
            <li><strong>Graefield-area condos:</strong>{" "}about $215,000 to $279,000</li>
            <li><strong>1225 Derby Rd:</strong>{" "}about $185,000 to $205,000</li>
          </ul>
          <p>
            These buildings trade amenities for value. Expect fewer services than the full-concierge towers, older
            construction, and more variation unit to unit. The upside is real: a Birmingham address, walkability to
            downtown from many of them, and much lower dues.
          </p>
          <p style={note}>Source: Movoto active listings, November 2026. Asking prices, not sold prices.</p>
        </>
      ),
    },
    {
      heading: "What Birmingham condos cost, by tier",
      body: (
        <>
          <ul style={list}>
            <li>
              <strong>Entry ($130K to $300K):</strong>{" "}older and smaller units, mostly outside the immediate downtown
              core.
            </li>
            <li>
              <strong>Mainstream ($300K to $700K):</strong>{" "}updated units in mid-size associations and Birmingham
              Place, the heart of the market by count.
            </li>
            <li>
              <strong>Luxury ($1M to $3M):</strong>{" "}The Willits, Brookside, and The Balmoral, with full amenities,
              secure parking, and large floor plans.
            </li>
            <li>
              <strong>Trophy ($3M to $6M):</strong>{" "}penthouses and the very top residences. The highest Birmingham
              condo asking price in November 2026 was $6,000,000.
            </li>
          </ul>
          <p>
            <strong>Price per square foot</strong>{" "}is the fastest way to compare across buildings. The citywide
            condo median was $365 per square foot in November 2026, but the full-service buildings run well above
            that, and units with river, park, or downtown views carry their own premium.
          </p>
        </>
      ),
    },
    {
      heading: "Condo or rental tower? Check before you fall in love",
      body: (
        <>
          <p>
            Several of downtown Birmingham&rsquo;s best-looking residential buildings, notably{" "}
            <strong>The 555</strong>{" "}and <strong>The Pearl</strong>, are <strong>rental</strong>{" "}buildings, not
            for-sale condominiums. You can lease there, but you can&rsquo;t buy. Confirm a building is a condominium
            association before you plan around it.
          </p>
          <p>
            <strong>Looking for lofts?</strong>{" "}Birmingham has very little true industrial loft inventory. Buyers who
            search for &ldquo;Birmingham lofts&rdquo; usually end up in a downtown mid-rise condo with high ceilings or
            in a townhome, so it is worth widening the search to those.
          </p>
        </>
      ),
    },
    {
      heading: "Who buys Birmingham condos, and why",
      body: (
        <>
          <ul style={list}>
            <li>
              <strong>Downsizers from Birmingham and Bloomfield</strong>{" "}trading a large house for single-floor,
              maintenance-free living without leaving the community, the friends, or the restaurants they know.
            </li>
            <li>
              <strong>Lock-and-leave luxury buyers</strong>, including snowbirds, who want concierge, valet, and
              secure garage parking so they can travel for months at a time.
            </li>
            <li>
              <strong>Professionals and empty-nest couples</strong>{" "}who want to walk to dinner, Shain Park events,
              and the shops on Old Woodward and Maple.
            </li>
            <li>
              <strong>Families buying into the schools.</strong>{" "}Birmingham Public Schools ranks #9 of 538 districts
              in Michigan (Niche 2026), and a condo is the lowest-cost entry point into the district. Confirm the
              attendance boundary for the specific unit.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "What to check before you buy a Birmingham condo",
      body: (
        <>
          <ul style={list}>
            <li>
              <strong>Monthly dues and what they cover.</strong>{" "}Full-service buildings with concierge, valet, and
              heated parking carry much higher dues than smaller associations. Compare dues per square foot, not just
              the total.
            </li>
            <li>
              <strong>Reserve fund and special assessments.</strong>{" "}Ask for the association&rsquo;s budget, the
              latest reserve study, and minutes from recent board meetings. Older buildings may have large projects
              coming, such as roofs, elevators, garages, or facades.
            </li>
            <li>
              <strong>Parking.</strong>{" "}Is the space deeded, assigned, or leased? How many come with the unit, and are
              extras available? In downtown Birmingham, parking can matter as much as the floor plan.
            </li>
            <li>
              <strong>Rental and pet rules.</strong>{" "}Many associations limit leasing or set pet restrictions. If you
              may rent the unit out later, confirm what the bylaws allow.
            </li>
            <li>
              <strong>Your real property taxes.</strong>{" "}The seller&rsquo;s bill isn&rsquo;t yours. Michigan
              resets the taxable value the year after a sale, and a second-home condo pays the higher non-homestead
              rate. Run any price through our{" "}
              <a href="/michigan-property-tax-uncapping-calculator" style={link}>property tax uncapping calculator</a>.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "How to win the right unit in a thin market",
      body: (
        <>
          <p>
            The best downtown units are scarce, and the ones with river or park views often sell to buyers who were
            already waiting. A few practical moves help:
          </p>
          <ul style={list}>
            <li>
              <strong>Pick two or three buildings, not one.</strong>{" "}Watching several gives you a real shot when the
              right floor plan comes up.
            </li>
            <li>
              <strong>Get pre-approved for a condo loan.</strong>{" "}Lenders review the association too, and some
              buildings have rules that affect financing.
            </li>
            <li>
              <strong>Use a broker who knows the buildings.</strong>{" "}Some units trade quietly before they reach the
              public sites.
            </li>
          </ul>
          <p>
            Real Estate Market Center has sold homes across Oakland County since 2003, with more than $100 million
            closed and a 5.0-star rating across 110+ Google reviews. Broker-owner Sundus Lewis works the
            Birmingham&ndash;Bloomfield market every day. Already own a Birmingham condo?{" "}
            <a href="/what-is-my-home-worth-birmingham" style={link}>See what it&rsquo;s worth</a>, or compare with{" "}
            <a href="/rochester-hills-condos" style={link}>Rochester Hills condos</a>{" "}and the wider{" "}
            <a href="/luxury-homes-in-birmingham" style={link}>Birmingham luxury market</a>.
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Sources: Movoto Birmingham condo market data and listings (November 2026); Zillow Home Value Index (June
            2026); Realcomp II Ltd. active listings via marketcenterrealty.com/api/market-stats (November 27, 2026);
            Niche 2026 Best School Districts in Michigan; Highrises.com and Homes.com building data; DBusiness. All
            figures approximate and subject to change.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Birmingham condos: common questions",
  faqs: [
    {
      question: "How much do condos cost in Birmingham, MI?",
      answer:
        "As of November 2026, Birmingham condos and townhomes have a median list price of about $899,000 and a median of $365 per square foot, with asking prices from $129,900 to $6,000,000 (Movoto). Older units a few blocks from downtown often list between $185,000 and $500,000, while the full-service downtown buildings run from about $1 million to $3 million and penthouses go higher.",
    },
    {
      question: "What are the best luxury condo buildings in downtown Birmingham?",
      answer:
        "The four main for-sale luxury buildings are Brookside Residences (369 N Old Woodward, about 2020, 24-hour concierge and valet), The Balmoral (34901 Woodward, 2015, home to a penthouse listed at $4.1 to $4.3 million), The Willits (111 Willits St, 2001, about 100 units), and Birmingham Place (411 S Old Woodward, 10 stories and 186 units, often the most attainable downtown option).",
    },
    {
      question: "How many condos are for sale in Birmingham right now?",
      answer:
        "About 57 condos and townhomes were listed for sale in Birmingham in November 2026, with a median of 36 days on market (Movoto). Inventory is thin and changes weekly, so the right unit in a specific building may not be available when you are ready to buy.",
    },
    {
      question: "Are The 555 and The Pearl condos?",
      answer:
        "No. The 555 and The Pearl are rental buildings, so you can lease there but not buy a unit. For-sale luxury condos downtown are concentrated in Brookside Residences, The Balmoral, The Willits, and Birmingham Place.",
    },
    {
      question: "Are there lofts for sale in Birmingham, Michigan?",
      answer:
        "Very few. Birmingham has little true industrial loft inventory. Buyers searching for lofts usually find what they want in a downtown mid-rise condo with high ceilings or in a townhome, so widen the search to those property types.",
    },
    {
      question: "Do Birmingham condos have good schools?",
      answer:
        "Birmingham Public Schools ranks #9 out of 538 districts in Michigan (Niche 2026), and a condo is the lowest-cost way into the district. District boundaries don't always follow city lines, so confirm the attendance area for the specific unit before you buy.",
    },
    {
      question: "What should I check before buying a Birmingham condo?",
      answer:
        "Review the monthly dues and what they cover, the association's reserve fund and any planned special assessments, whether parking is deeded or assigned, rental and pet rules, and your real property taxes after uncapping. In Michigan the taxable value resets the year after you buy, and a second-home condo pays the higher non-homestead rate.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-birmingham", label: "Luxury homes in Birmingham" },
    { href: "/best-neighborhoods-in-birmingham", label: "Best neighborhoods in Birmingham" },
    { href: "/what-is-my-home-worth-birmingham", label: "What's my Birmingham home worth?" },
    { href: "/living-in-birmingham", label: "Living in Birmingham" },
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate & neighborhoods" },
    { href: "/quarton-lake-estates-birmingham", label: "Quarton Lake Estates" },
    { href: "/homes-in-birmingham-public-schools", label: "Homes in Birmingham Public Schools" },
    { href: "/michigan-property-tax-uncapping-calculator", label: "Property tax uncapping calculator" },
  ],
  ctaHeading: "Looking for a Birmingham condo?",
  ctaBody: (
    <>
      Tell us the buildings you like and your must-haves. We&rsquo;ll watch them for you, flag units before they
      are widely seen, and pull the dues, reserves, and real tax numbers on anything you love. No pressure.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a Birmingham condo expert" },
  metaTitle: "Birmingham MI Condos for Sale (2026): Downtown Luxury Buildings & Prices",
  metaDescription:
    "Birmingham, MI condos for sale: 57 listed, $899K median, $365/sq ft (Nov 2026). Every downtown luxury building (Brookside, The Balmoral, The Willits, Birmingham Place), attainable options, lofts, HOA and tax tips.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
