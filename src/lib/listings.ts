// ┌──────────────────────────────────────────────────────────────────────┐
// │  Listings data layer — real data only, no stock photos.             │
// │                                                                      │
// │  This function returns ONLY verified listings with real image URLs. │
// │  When no real data is available, it returns an empty array — the   │
// │  UI shows an empty state, NEVER fake or placeholder listings.       │
// │                                                                      │
// │  To connect an MLS / IDX feed (Bridge Interactive, Realtor.com,     │
// │  Zillow Tech Connect, RETS, etc.), replace the body of              │
// │  getFeaturedListings() with a fetch call that returns Listing[].    │
// │  No component changes required — the Listing type stays the same.   │
// │                                                                      │
// │    export async function getFeaturedListings(): Promise<Listing[]> {│
// │      const r = await fetch("https://api.yourmls.com/featured", {    │
// │        headers: { Authorization: `Bearer ${process.env.MLS_KEY}` },│
// │        next: { revalidate: 300 },                                   │
// │      });                                                            │
// │      const data = await r.json();                                   │
// │      return data.listings.map(toListing);                           │
// │    }                                                                │
// └──────────────────────────────────────────────────────────────────────┘

export type Listing = {
  id: string;
  mlsNumber?: string;
  price: string;
  beds: number;
  baths: number;
  sqft?: number;
  address: string;
  city: string;
  state: string;
  zip?: string;
  /** Real image URL tied to this specific property. If missing, UI shows "No image available". */
  image_url?: string;
  /** Deep-link to MLS/IDX detail page or a local detail route. */
  listing_url?: string;
  status?: "For Sale" | "Pending" | "Coming Soon" | "Open House";
};

export async function getFeaturedListings(): Promise<Listing[]> {
  // No MLS/IDX connection yet. Return empty until real data is available.
  // DO NOT add stock or placeholder images here — show the empty state instead.
  return [];
}
