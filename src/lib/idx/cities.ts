import "server-only";

/**
 * Location resolver for IDX search.
 *
 * Realcomp's OData only filters `PostalCity` and `PostalCode` quickly — the
 * `City` field is malformed ("BirminghamCity_Oakland") and times out, and
 * string functions (contains/startswith) are unsupported/slow. So a free-text
 * search box ("Birmingham", "bloomfield hills", "48009") must resolve to an
 * exact PostalCity value (or a ZIP) before we hit the API.
 *
 * POSTAL_CITIES is the real vocabulary pulled from the live feed (active
 * residential across Oakland / Wayne / Macomb). A normalized key maps each
 * human spelling to its exact PostalCity token(s); some cities straddle two
 * counties (Northville_Oakland + Northville_Wayne), hence string[] per key.
 */

export const POSTAL_CITIES: string[] = [
  "Detroit_Wayne", "Warren_Macomb", "Macomb_Macomb", "SterlingHeights_Macomb",
  "ClintonTownship_Macomb", "StClairShores_Macomb", "RoyalOak_Oakland", "Roseville_Macomb",
  "Southfield_Oakland", "WestBloomfield_Oakland", "RochesterHills_Oakland", "Troy_Oakland",
  "BloomfieldHills_Oakland", "Pontiac_Oakland", "HarrisonTownship_Macomb", "ShelbyTwp_Macomb",
  "LakeOrion_Oakland", "Eastpointe_Macomb", "Clarkston_Oakland", "CommerceTwp_Oakland",
  "Chesterfield_Macomb", "Washington_Macomb", "Waterford_Oakland", "Rochester_Oakland",
  "Farmington_Oakland", "Birmingham_Oakland", "Novi_Oakland", "HighlandPark_Wayne",
  "FarmingtonHills_Oakland", "Utica_Macomb", "Milford_Oakland", "HarperWoods_Wayne",
  "WhiteLake_Oakland", "Oxford_Oakland", "SouthLyon_Oakland", "NewBaltimore_Macomb",
  "Ferndale_Oakland", "Canton_Wayne", "Richmond_Macomb", "Inkster_Wayne",
  "Shelby_Macomb", "MtClemens_Macomb", "Davisburg_Oakland", "AuburnHills_Oakland",
  "HazelPark_Oakland", "Redford_Wayne", "Westland_Wayne", "Ortonville_Oakland",
  "MadisonHeights_Oakland", "Plymouth_Wayne", "Wixom_Oakland", "LincolnPark_Wayne",
  "Romeo_Macomb", "Oakland_Oakland", "Orion_Oakland", "Taylor_Wayne",
  "RiverRouge_Wayne", "Northville_Oakland", "OakPark_Oakland", "Highland_Oakland",
  "Northville_Wayne", "Romulus_Wayne", "Trenton_Wayne", "NewHaven_Macomb",
  "Holly_Oakland", "Livonia_Wayne", "DearbornHeights_Wayne", "Dearborn_Wayne",
  "Hamtramck_Wayne", "VanBuren_Wayne", "GrossePointe_Wayne", "Bruce_Macomb",
  "CenterLine_Macomb", "ClintonTwp_Macomb", "WalledLake_Oakland", "Wyandotte_Wayne",
  "GardenCity_Wayne", "Ray_Macomb", "Fraser_Macomb", "Lenox_Macomb",
  "Leonard_Oakland", "NewHudson_Oakland", "Berkley_Oakland", "GrosseIle_Wayne",
  "Ecorse_Wayne", "Belleville_Wayne", "Addison_Oakland", "Clawson_Oakland",
  "LathrupVillage_Oakland", "OrchardLake_Oakland", "KeegoHarbor_Oakland", "GrossePointePark_Wayne",
  "FlatRock_Wayne", "AllenPark_Wayne", "GrossePointeWoods_Wayne", "Melvindale_Wayne",
  "Armada_Macomb", "LakeTwp_Macomb", "Franklin_Oakland", "BeverlyHills_Oakland",
  "HuntingtonWoods_Oakland", "Southgate_Wayne", "NewBoston_Wayne", "Brownstown_Wayne",
  "Riverview_Wayne", "Wayne_Wayne", "Rockwood_Wayne", "BruceTwp_Macomb",
  "Fenton_Oakland", "WolverineLake_Oakland", "GrandBlanc_Oakland", "LakeAngelus_Oakland",
  "SylvanLake_Oakland", "Gibraltar_Wayne", "EastDetroit_Macomb", "MountClemens_Macomb",
];

/** The city part of a PostalCity ("BloomfieldHills_Oakland" → "BloomfieldHills"). */
export function cityPart(postalCity: string): string {
  return postalCity.split("_")[0];
}

/** Human-readable city ("BloomfieldHills_Oakland" → "Bloomfield Hills"). */
export function prettyCity(postalCity: string): string {
  return cityPart(postalCity)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\bTwp\b/, "Township")
    .trim();
}

/** Collapse a spelling to a comparable key: lowercase alphanumerics, with a few
 *  Michigan-specific equivalences (Township↔Twp, Saint↔St, Mount↔Mt). */
function normKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\btownship\b/g, "twp")
    .replace(/\bsaint\b/g, "st")
    .replace(/\bmount\b/g, "mt")
    .replace(/[^a-z0-9]/g, "");
}

// key → exact PostalCity value(s)
const CITY_INDEX: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const pc of POSTAL_CITIES) {
    const key = normKey(cityPart(pc));
    const arr = m.get(key) ?? [];
    arr.push(pc);
    m.set(key, arr);
  }
  return m;
})();

export type ResolvedLocation =
  | { kind: "zip"; zip: string; label: string }
  | { kind: "city"; postalCities: string[]; label: string }
  | { kind: "unknown"; raw: string };

/** Resolve free-text from the search box into something the API can filter on. */
export function resolveLocation(input: string): ResolvedLocation {
  const raw = (input ?? "").trim();
  if (!raw) return { kind: "unknown", raw };

  const zipMatch = raw.match(/\b(\d{5})\b/);
  if (zipMatch) return { kind: "zip", zip: zipMatch[1], label: zipMatch[1] };

  const hit = CITY_INDEX.get(normKey(raw));
  if (hit && hit.length > 0) {
    return { kind: "city", postalCities: hit, label: prettyCity(hit[0]) };
  }
  return { kind: "unknown", raw };
}

/** A short list of marquee cities for empty-state suggestions. */
export const SUGGESTED_CITIES = [
  "Birmingham", "Bloomfield Hills", "Troy", "Rochester", "Royal Oak",
  "Grosse Pointe", "Northville", "Novi", "West Bloomfield", "Franklin",
];
