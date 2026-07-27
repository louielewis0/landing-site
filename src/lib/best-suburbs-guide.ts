/**
 * Data for /best-metro-detroit-suburbs — the ranked 2026 guide.
 *
 * Sourcing contract (see docs/aeo/VERIFICATION-REPORT.md):
 * every number on this page traces to a numbered citation below, with the
 * data vintage stated. No stat may be added without a citation. The hardcoded
 * figures in city-pages.ts are NOT a valid source for this page.
 *
 * Where the two market sources disagree (they measure different things),
 * both are shown and labeled — never averaged, never silently reconciled.
 */

export type Citation = {
  id: number;
  label: string;
  url: string;
  accessed: string; // YYYY-MM-DD
  note?: string;
};

export type CityStats = {
  /** Zillow Home Value Index, June 30 2026 — Zillow Research public CSV [1] */
  zhvi: string;
  /** ZHVI change, Jun 2025 → Jun 2026, computed from the same Zillow series [1] */
  zhviYoY: string;
  /** Redfin median sale price, all home types, rolling 3 months ending May 2026 [4] */
  medianSale: string;
  medianSaleYoY: string;
  /** Redfin median days on market, same window [4] */
  dom: string;
  /** Population + which estimate it is — U.S. Census Bureau [2] */
  population: string;
  populationVintage: string;
  /** Primary public school district(s) */
  district: string;
  /** Niche statewide rank, exactly as Niche labels it, or honest absence [3] */
  nicheRank: string;
};

export type RankedCity = {
  rank: number;
  city: string;
  county: string;
  /** slug of the existing deep-dive city page */
  citySlug: string;
  bestFor: string;
  /** Direct answer paragraph — first thing under the H2, written to be quotable on its own */
  answer: string;
  paragraphs: string[];
  stats: CityStats;
};

export const guideMeta = {
  title: "The 7 Best Metro Detroit Suburbs to Buy a Home in 2026, Ranked",
  metaTitle: "7 Best Metro Detroit Suburbs to Buy a Home in 2026 | Ranked with Data",
  metaDescription:
    "Troy, Rochester Hills, Birmingham, Sterling Heights, West Bloomfield, Bloomfield Hills, and Warren — ranked for 2026 with sourced home values, sale prices, days on market, and school district facts. By a Troy, MI brokerage.",
  slug: "best-metro-detroit-suburbs",
  datePublished: "2026-07-27",
  dateModified: "2026-07-27",
  dataThrough: "spring 2026 (each figure's vintage stated where it appears)",
  shortAnswer:
    "For most families buying in Metro Detroit in 2026, Troy is the best overall suburb — Michigan's #3-ranked school district per Niche, a June 2026 typical home value of $472,471, and a deep corporate employment base. Birmingham leads on walkability and posted the fastest one-year growth in Zillow's home-value index (+6.4%). Sterling Heights is the strongest value for first-time buyers, and Warren is the most affordable entry point.",
} as const;

export const citations: Citation[] = [
  {
    id: 1,
    label:
      "Zillow Home Value Index (ZHVI), all homes, smoothed & seasonally adjusted — Zillow Research public dataset, monthly series through June 30, 2026",
    url: "https://www.zillow.com/research/data/",
    accessed: "2026-07-27",
    note: "One-year changes computed from the same Zillow series (June 2025 vs June 2026). ZHVI is a typical home value, not a median sale price.",
  },
  {
    id: 2,
    label:
      "U.S. Census Bureau, 2020 Decennial Census total population — data.census.gov city and township profiles",
    url: "https://data.census.gov/",
    accessed: "2026-07-27",
    note: "2020 Census counts are the most recent figures we could verify from a primary source; we do not quote newer estimates we could not confirm.",
  },
  {
    id: 3,
    label: "Niche, 2026 Best School Districts in Michigan (538 districts ranked)",
    url: "https://www.niche.com/k12/search/best-school-districts/s/michigan/",
    accessed: "2026-07-27",
    note: "Ranks are Niche's, quoted as published; they are one rating methodology, not an official state assessment.",
  },
  {
    id: 4,
    label:
      "Redfin city housing-market pages, all home types, rolling three months ending May 2026 (median sale price, year-over-year change, median days on market)",
    url: "https://www.redfin.com/",
    accessed: "2026-07-27",
    note: "Per-city page URLs are listed in our verification report. West Bloomfield Township has no standalone Redfin city page; Redfin's own township listings link to its 'West Bloomfield, Orchard Lake Village' market page, which is what we quote.",
  },
  {
    id: 5,
    label: "City of Sterling Heights, official Schools page (districts serving the city)",
    url: "https://www.sterlingheights.gov/1004/Schools",
    accessed: "2026-07-27",
  },
  {
    id: 6,
    label: "City of Warren, official Schools page (six public districts serve the city)",
    url: "https://www.miwarren.org/welcome-to-warren/schools/",
    accessed: "2026-07-27",
  },
  {
    id: 7,
    label: "West Bloomfield School District, About Us (district boundary statement)",
    url: "https://www.wbsd.org/about-us",
    accessed: "2026-07-27",
  },
];

export const rankedCities: RankedCity[] = [
  {
    rank: 1,
    city: "Troy",
    county: "Oakland County",
    citySlug: "troy-real-estate-agent",
    bestFor: "Best overall for families",
    answer:
      "Troy is our #1 pick for 2026 because it combines Michigan's #3-ranked school district (Niche, 2026) with a typical home value of $472,471 (Zillow, June 2026) — well below Birmingham and Bloomfield Hills — plus one of the region's largest suburban employment bases along the Big Beaver corridor.",
    paragraphs: [
      "Troy's case is balance. Birmingham costs more, Sterling Heights costs less, but no other city on this list pairs top-five schools with a price point a dual-income family can realistically reach. The Troy School District is ranked #3 of 538 districts in Michigan in Niche's 2026 list, and school boundaries — not city limits — drive value street by street, since small pockets of Troy feed other districts.",
      "The two market gauges tell slightly different stories, and we show both: Zillow's smoothed value index rose 2.6% in the year through June 2026, while Redfin's median sale price for the three months ending May 2026 was $435,739, down 5.9% from a year earlier. A spread like that usually means the mix of homes that happened to sell shifted toward cheaper ones — not that values dropped 6% — but it does say Troy is steady right now, not frothy.",
      "Full disclosure: our office is in Troy, at 2032 E Square Lake Rd. We ranked our home city first, so judge the data rather than our word.",
    ],
    stats: {
      zhvi: "$472,471",
      zhviYoY: "+2.6%",
      medianSale: "$435,739",
      medianSaleYoY: "−5.9%",
      dom: "20 days",
      population: "87,294",
      populationVintage: "2020 Census",
      district: "Troy School District (small border pockets feed neighboring districts)",
      nicheRank: "#3 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 2,
    city: "Rochester Hills",
    county: "Oakland County",
    citySlug: "rochester-hills-real-estate-agent",
    bestFor: "Best schools-plus-outdoors balance",
    answer:
      "Rochester Hills is the strongest alternative to Troy: Rochester Community Schools ranks #5 in Michigan (Niche, 2026), the typical home value is $480,334 (Zillow, June 2026, up 3.6% in a year), and homes sold in a median of 15 days over the three months ending May 2026 — tied for the fastest on this list.",
    paragraphs: [
      "If your family's weekends are bikes, trails, and parks, Rochester Hills beats every other city on this list — daily life is organized around the Paint Creek Trail, Stony Creek Metropark, and walkable downtown Rochester next door. Both market gauges agree here: Zillow's index up 3.6%, Redfin's median sale price up 2.3% to $434,740 — and its 15-day median time to sell says buyer demand is real.",
      "One verification habit that matters: Rochester Community Schools serves Rochester, Rochester Hills, and Oakland Township, but district lines don't follow city limits — confirm the exact attendance area on any specific address before you offer.",
    ],
    stats: {
      zhvi: "$480,334",
      zhviYoY: "+3.6%",
      medianSale: "$434,740",
      medianSaleYoY: "+2.3%",
      dom: "15 days",
      population: "76,300",
      populationVintage: "2020 Census",
      district: "Rochester Community Schools",
      nicheRank: "#5 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 3,
    city: "Birmingham",
    county: "Oakland County",
    citySlug: "birmingham-real-estate-agent",
    bestFor: "Best walkable downtown; hottest market",
    answer:
      "Birmingham is Metro Detroit's premier walkable suburb and the hottest market on this list by both gauges: Zillow's typical home value hit $757,616 in June 2026 (+6.4% in a year, the fastest of the seven on that index), and Redfin's median sale price was $817,511 for the three months ending May 2026, up 12.8% year-over-year. Birmingham Public Schools ranks #9 in Michigan (Niche, 2026).",
    paragraphs: [
      "You are paying for something real: a downtown you can live on foot — restaurants, shops, and offices along Old Woodward — which is rare in Michigan, plus a top-ten school district. Both data sources say buyers still agree, and in Zillow's June 2026 series Birmingham's typical value now exceeds Bloomfield Hills' — the walkable downtown out-pricing the gated acreage next door.",
      "The honest counterpoint: at roughly $285,000 above Troy's typical value for a #9 district versus Troy's #3 (Niche, 2026), Birmingham is a lifestyle purchase more than a schools arbitrage. If the walkable core isn't what you're buying, your money goes further one exit north.",
    ],
    stats: {
      zhvi: "$757,616",
      zhviYoY: "+6.4%",
      medianSale: "$817,511",
      medianSaleYoY: "+12.8%",
      dom: "20 days",
      population: "21,813",
      populationVintage: "2020 Census",
      district: "Birmingham Public Schools",
      nicheRank: "#9 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 4,
    city: "Sterling Heights",
    county: "Macomb County",
    citySlug: "sterling-heights-real-estate-agent",
    bestFor: "Best value for first-time buyers",
    answer:
      "Sterling Heights is the best first-home math on this list: a typical home value of $315,750 (Zillow, June 2026) — roughly $157,000 below Troy — with homes selling in a median of 15 days (Redfin, three months ending May 2026), tied for the fastest of the seven. Its north side is served by Utica Community Schools, ranked #72 of 538 Michigan districts (Niche, 2026).",
    paragraphs: [
      "This is where the monthly payment works. At about two-thirds of Troy's price level, Sterling Heights lets buyers priced out of Oakland County stop renting without settling for a weak market: both gauges show moderate, consistent growth (Zillow +2.4%, Redfin median sale price +2.8% to $319,759), and the 15-day median time to sell means well-priced homes do not sit.",
      "The single most important due-diligence item: the city is served by both Utica Community Schools and Warren Consolidated Schools, per the city's official schools page, and the district a specific address feeds is a real driver of resale value. Verify it before you offer, not after.",
    ],
    stats: {
      zhvi: "$315,750",
      zhviYoY: "+2.4%",
      medianSale: "$319,759",
      medianSaleYoY: "+2.8%",
      dom: "15 days",
      population: "134,346",
      populationVintage: "2020 Census",
      district: "Utica Community Schools + Warren Consolidated Schools",
      nicheRank: "Utica CS: #72 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 5,
    city: "West Bloomfield",
    county: "Oakland County",
    citySlug: "west-bloomfield-real-estate-agent",
    bestFor: "Best for lake living",
    answer:
      "West Bloomfield is the lakes township: Cass, Pine, Orchard, and Walnut Lake living inside a suburb, with a typical home value of $466,635 (Zillow, June 2026, up 3.0% in a year) — Troy-level pricing where the premium buys water access instead of a corporate corridor. The West Bloomfield School District ranks #30 in Michigan (Niche, 2026).",
    paragraphs: [
      "No other city on this list makes waterfront a normal housing option rather than a trophy. The distinctions that decide price here — lakefront versus lake-access versus lake-view — matter more than square footage on otherwise similar homes, so understand them before you shop. Redfin's market page for the township area shows a median sale price of $444,850 for the three months ending May 2026, roughly flat (+0.3%) year-over-year, with homes selling in a median of 18 days.",
      "Note the geography: West Bloomfield is a charter township, and while the West Bloomfield School District lies entirely within it, parts of the township are served by other districts — another verify-the-address market.",
    ],
    stats: {
      zhvi: "$466,635",
      zhviYoY: "+3.0%",
      medianSale: "$444,850",
      medianSaleYoY: "+0.3%",
      dom: "18 days",
      population: "65,888",
      populationVintage: "2020 Census",
      district: "West Bloomfield School District (parts of the township feed other districts)",
      nicheRank: "#30 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 6,
    city: "Bloomfield Hills",
    county: "Oakland County",
    citySlug: "bloomfield-hills-real-estate-agent",
    bestFor: "Best for estates and privacy",
    answer:
      "Bloomfield Hills is the smallest city on this list — 4,460 residents at the 2020 Census — and its priciest by sale price: Redfin's median was $912,454 for the three months ending May 2026, on very few transactions. Zillow puts the typical home value at $690,654 (June 2026, up 4.9% in a year). Bloomfield Hills Schools ranks #7 in Michigan (Niche, 2026), and the housing stock is estates on acreage, not subdivisions.",
    paragraphs: [
      "It ranks sixth not because it's weak but because it's specific: if you want land, privacy, and architecture, nothing else here competes; if you want a normal family purchase, the entry price and the thin, slow-trading inventory work against you. The thinness is measurable — Redfin's page notes only 16 homes sold in May 2026, which is why its year-over-year sale-price swing (−25.1%) says almost nothing about any individual property's value; a handful of estates in either direction moves the whole median. Homes here also take the longest to sell on this list: a median of 40 days.",
      "Buyers choosing between Bloomfield Hills and Birmingham are choosing between two different ideas of luxury — acreage and privacy versus a walkable downtown. In Zillow's smoothed series, Birmingham's typical value now runs higher.",
    ],
    stats: {
      zhvi: "$690,654",
      zhviYoY: "+4.9%",
      medianSale: "$912,454",
      medianSaleYoY: "−25.1% (16 May sales — thin sample)",
      dom: "40 days",
      population: "4,460",
      populationVintage: "2020 Census",
      district: "Bloomfield Hills Schools",
      nicheRank: "#7 in Michigan (Niche 2026)",
    },
  },
  {
    rank: 7,
    city: "Warren",
    county: "Macomb County",
    citySlug: "warren-real-estate-agent",
    bestFor: "Most affordable entry point",
    answer:
      "Warren is the affordability play: a typical home value of $204,491 (Zillow, June 2026) in a city of 139,387 residents (2020 Census), anchored by the GM Technical Center. Redfin's median sale price was $209,874 for the three months ending May 2026 — the lowest of the seven by both gauges.",
    paragraphs: [
      "At well under half of Troy's price level, Warren is where a modest budget still buys a detached brick ranch. The two market gauges currently disagree sharply on momentum — Redfin's median sale price is up 13.4% year-over-year while Zillow's smoothed value index is up just 1.7%, the slowest of the seven on that index. A gap that wide usually means the mix of what sold shifted toward pricier homes; treat the sale-price spike as a mix effect until the value index confirms it, not as 13% appreciation on your target house.",
      "On schools, the data says be careful rather than optimistic: six public districts serve the city per Warren's official schools page, and none of them appears in the top 225 of Niche's 2026 Michigan ranking. Families prioritizing schools usually look one ring north; buyers prioritizing price per square foot start here.",
    ],
    stats: {
      zhvi: "$204,491",
      zhviYoY: "+1.7%",
      medianSale: "$209,874",
      medianSaleYoY: "+13.4%",
      dom: "21 days",
      population: "139,387",
      populationVintage: "2020 Census",
      district: "Six districts incl. Warren Consolidated, Fitzgerald, Van Dyke, Warren Woods",
      nicheRank: "None in Niche's 2026 top 225",
    },
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is the best Metro Detroit suburb to buy a home in 2026?",
    answer:
      "For most family buyers, Troy — it pairs Michigan's #3-ranked school district (Niche, 2026) with a June 2026 typical home value of $472,471, well below Birmingham or Bloomfield Hills. The right answer shifts with priorities: Birmingham for walkability, Sterling Heights for first-home value, West Bloomfield for lakes.",
  },
  {
    question: "Which of these suburbs is the cheapest to buy in?",
    answer:
      "Warren, by both gauges: a typical home value of $204,491 (Zillow, June 2026) and a median sale price of $209,874 (Redfin, three months ending May 2026). Sterling Heights is next at $315,750. Birmingham and Bloomfield Hills are the most expensive.",
  },
  {
    question: "Which Metro Detroit suburb has the best schools?",
    answer:
      "By Niche's 2026 Michigan ranking of 538 districts: Troy School District #3, Rochester Community Schools #5, Bloomfield Hills Schools #7, and Birmingham Public Schools #9. District boundaries don't follow city limits in any of these cities, so always verify the attendance area for a specific address.",
  },
  {
    question: "Which suburb's home values are rising fastest?",
    answer:
      "By Zillow's smoothed home-value index, Birmingham: +6.4% in the year through June 2026. By Redfin's median sale price (three months ending May 2026), Warren leads at +13.4% — but on thin, mix-sensitive data. The two metrics measure different things; where they disagree, we show both.",
  },
  {
    question: "How quickly do homes sell in these suburbs?",
    answer:
      "Over the three months ending May 2026 (Redfin), median days on market were: Rochester Hills and Sterling Heights 15, West Bloomfield 18, Troy and Birmingham 20, Warren 21, and Bloomfield Hills 40 — estate properties trade far more slowly than family subdivisions.",
  },
  {
    question: "Are these rankings independent?",
    answer:
      "No — and we say so plainly. Real Estate Market Center is a brokerage headquartered in Troy that serves all seven cities. The ranking is our editorial judgment, but every statistic on this page is sourced and dated (Zillow Research, Redfin, U.S. Census, Niche) so you can check our work.",
  },
  {
    question: "How current is the data on this page?",
    answer:
      "Home values are Zillow's ZHVI series through June 30, 2026; sale prices and days on market are Redfin's rolling three months ending May 2026; both were retrieved July 27, 2026. Populations are 2020 Census counts. School ranks are Niche's 2026 Michigan list. Each figure's vintage is stated where it appears.",
  },
];
