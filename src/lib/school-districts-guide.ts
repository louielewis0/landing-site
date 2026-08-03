/**
 * Data for /best-school-districts-metro-detroit.
 *
 * Same sourcing contract as best-suburbs-guide.ts (see
 * docs/aeo/VERIFICATION-REPORT.md): Niche ranks quoted exactly as
 * published (2026 Best School Districts in Michigan, 538 ranked,
 * accessed 2026-07-27); district boundary statements verified against
 * official district/city sites; home values come from the shared
 * rankedCities stats (Zillow ZHVI). No number without a source.
 */
import { rankedCities } from "./best-suburbs-guide";

export type DistrictEntry = {
  rank: number;
  district: string;
  nicheRank: string; // exactly as Niche labels it
  city: string; // primary city on our list served by this district
  citySlug: string;
  /** Verified boundary caveat — the verify-the-address warning */
  boundaryNote: string;
  /** What it costs to buy in: derived from the shared city stats */
  take: string;
};

function cityStats(city: string) {
  const c = rankedCities.find((r) => r.city === city);
  if (!c) throw new Error(`city not in rankedCities: ${city}`);
  return c.stats;
}

export const schoolsMeta = {
  title:
    "The Best School Districts in Metro Detroit (2026) — Ranked by Niche, Priced by the Housing Market",
  metaTitle: "Best School Districts in Metro Detroit 2026 | Ranked + Home Prices",
  metaDescription:
    "Troy #3, Rochester #5, Bloomfield Hills #7, Birmingham #9 — Niche's 2026 Michigan school district ranks for Metro Detroit suburbs, with what a home actually costs in each district and the boundary traps to verify before you offer.",
  slug: "best-school-districts-metro-detroit",
  datePublished: "2026-08-03",
  dateModified: "2026-08-03",
  shortAnswer:
    "Four of Niche's ten best school districts in Michigan (2026) serve the suburbs north of Detroit: Troy School District (#3), Rochester Community Schools (#5), Bloomfield Hills Schools (#7), and Birmingham Public Schools (#9). Troy is the value pick of the four — a #3 district at a typical home value of " +
    cityStats("Troy").zhvi +
    " (Zillow, June 2026), roughly $285,000 less than Birmingham. In every one of these cities, district lines don't follow city limits, so verify the attendance area for any specific address before you offer.",
} as const;

export const districtEntries: DistrictEntry[] = [
  {
    rank: 1,
    district: "Troy School District",
    nicheRank: "#3 of 538 in Michigan (Niche 2026)",
    city: "Troy",
    citySlug: "troy-real-estate-agent",
    boundaryNote:
      "Small pockets of the city of Troy feed neighboring districts — a street-by-street check, not a city-limits check.",
    take: `The best schools-per-dollar ratio in Metro Detroit: Michigan's #3 district at a typical home value of ${cityStats("Troy").zhvi} (Zillow, June 2026). Homes inside the boundary carry a premium over identical homes just outside it, which is exactly why the address check matters.`,
  },
  {
    rank: 2,
    district: "Rochester Community Schools",
    nicheRank: "#5 of 538 in Michigan (Niche 2026)",
    city: "Rochester Hills",
    citySlug: "rochester-hills-real-estate-agent",
    boundaryNote:
      "Serves Rochester, Rochester Hills, and Oakland Township (per the district) — but lines don't follow municipal borders; parts of Rochester Hills feed other districts.",
    take: `Effectively tied with Troy on cost: typical home value ${cityStats("Rochester Hills").zhvi} (Zillow, June 2026) for a #5 district, with the Paint Creek Trail/Stony Creek lifestyle attached. The Troy-vs-Rochester decision is commute and lifestyle, not school quality.`,
  },
  {
    rank: 3,
    district: "Bloomfield Hills Schools",
    nicheRank: "#7 of 538 in Michigan (Niche 2026)",
    city: "Bloomfield Hills",
    citySlug: "bloomfield-hills-real-estate-agent",
    boundaryNote:
      "The district covers far more than the small city of Bloomfield Hills (4,460 residents, 2020 Census) — much of its territory lies in surrounding townships, where entry prices differ substantially.",
    take: `A top-ten district where the constraint is inventory, not quality: the city's typical home value is ${cityStats("Bloomfield Hills").zhvi} (Zillow, June 2026) and few homes trade each year. Buyers priced out of the city itself should look at the district's township areas.`,
  },
  {
    rank: 4,
    district: "Birmingham Public Schools",
    nicheRank: "#9 of 538 in Michigan (Niche 2026)",
    city: "Birmingham",
    citySlug: "birmingham-real-estate-agent",
    boundaryNote:
      "The district extends beyond the city of Birmingham (including areas like Beverly Hills, where the district is headquartered) — some addresses outside the city buy into the same schools for less.",
    take: `The most expensive seat in a top-ten district: Birmingham's typical home value hit ${cityStats("Birmingham").zhvi} in June 2026 (Zillow) — you're paying for the walkable downtown as much as the classroom. District addresses outside the city core are the value play.`,
  },
  {
    rank: 5,
    district: "West Bloomfield School District",
    nicheRank: "#30 of 538 in Michigan (Niche 2026)",
    city: "West Bloomfield",
    citySlug: "west-bloomfield-real-estate-agent",
    boundaryNote:
      "Per the district, it lies entirely within West Bloomfield Township and also serves Keego Harbor, most of Orchard Lake Village, and a sliver of Sylvan Lake — but parts of the township feed other districts.",
    take: `Top-30 statewide with lake living attached: typical home value ${cityStats("West Bloomfield").zhvi} (Zillow, June 2026). The township's multiple-district geography makes the address check non-negotiable here.`,
  },
  {
    rank: 6,
    district: "Utica Community Schools",
    nicheRank: "#72 of 538 in Michigan (Niche 2026)",
    city: "Sterling Heights",
    citySlug: "sterling-heights-real-estate-agent",
    boundaryNote:
      "Serves Sterling Heights' north side; the south side is Warren Consolidated Schools (per the city's official schools page). The district a specific address feeds is a real driver of resale value.",
    take: `The first-time buyer's schools play: a top-75-of-538 district at a typical home value of ${cityStats("Sterling Heights").zhvi} (Zillow, June 2026) — roughly two-thirds of Troy's price. North-of-16-Mile addresses are the ones to verify for UCS.`,
  },
];

export const schoolsFaqs: { question: string; answer: string }[] = [
  {
    question: "What is the best school district in Metro Detroit?",
    answer:
      "By Niche's 2026 ranking of Michigan's 538 districts, the Troy School District is the highest-ranked in Metro Detroit at #3 statewide, followed by Rochester Community Schools (#5), Bloomfield Hills Schools (#7), and Birmingham Public Schools (#9). Rankings are Niche's methodology, not an official state assessment.",
  },
  {
    question: "Which top school district has the most affordable homes?",
    answer:
      "Among the top-ten-ranked districts, Troy: a typical home value of " +
      cityStats("Troy").zhvi +
      " (Zillow, June 2026) for the #3 district. If you widen to top-75, Utica Community Schools (#72, northern Sterling Heights) drops entry to " +
      cityStats("Sterling Heights").zhvi +
      ".",
  },
  {
    question: "Do school district boundaries follow city limits in Metro Detroit?",
    answer:
      "No — in every city on this list. Pockets of Troy feed neighboring districts; Rochester Community Schools crosses three municipalities; Sterling Heights splits between Utica and Warren Consolidated; districts like Birmingham and Bloomfield Hills extend well beyond their namesake cities. Always verify the exact attendance area for an address before making an offer.",
  },
  {
    question: "How do Warren's school districts rank?",
    answer:
      "Six public districts serve the city of Warren (per the city's official schools page), and none of them appears in the top 225 of Niche's 2026 Michigan ranking. Warren is Metro Detroit's affordability play rather than its schools play — families prioritizing schools usually look one ring north.",
  },
  {
    question: "Does buying in a top district actually affect home value?",
    answer:
      "Homes inside top-district boundaries in this market carry a measurable premium over comparable homes outside them, and the district is one of the first filters family buyers apply. That's a double-edged sword: you pay the premium going in, and it supports resale going out. Our agents verify the attendance zone on every listing before an offer.",
  },
];
