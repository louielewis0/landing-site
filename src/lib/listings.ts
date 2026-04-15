// ┌──────────────────────────────────────────────────────────────────────┐
// │  Listings data layer.                                                │
// │                                                                      │
// │  Today this returns static placeholder data. When you plug in an    │
// │  MLS / IDX feed (Realtor.com API, Zillow Tech Connect, RETS, Bridge │
// │  Interactive, etc.), replace the body of getFeaturedListings() with │
// │  a fetch call. No component changes required — the Listing type    │
// │  and function signature stay the same.                              │
// │                                                                      │
// │  Example MLS swap:                                                  │
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
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip?: string;
  image: string;
  status?: "For Sale" | "Pending" | "Coming Soon" | "Open House";
  detailsUrl?: string; // deep link to MLS/IDX detail page when connected
};

const placeholder: Listing[] = [
  {
    id: "mc-001",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: 2850,
    address: "1847 Oakwood Lane",
    city: "Birmingham",
    state: "MI",
    zip: "48009",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    status: "For Sale",
  },
  {
    id: "mc-002",
    price: "$875,000",
    beds: 3,
    baths: 2,
    sqft: 1920,
    address: "412 Lakeshore Drive",
    city: "Bloomfield Hills",
    state: "MI",
    zip: "48302",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    status: "Open House",
  },
  {
    id: "mc-003",
    price: "$2,450,000",
    beds: 5,
    baths: 4,
    sqft: 4100,
    address: "27 Hilltop Court",
    city: "Rochester Hills",
    state: "MI",
    zip: "48306",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    status: "For Sale",
  },
  {
    id: "mc-004",
    price: "$625,000",
    beds: 4,
    baths: 2,
    sqft: 2240,
    address: "3915 Livernois Road",
    city: "Troy",
    state: "MI",
    zip: "48083",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
    status: "For Sale",
  },
  {
    id: "mc-005",
    price: "$495,000",
    beds: 3,
    baths: 2,
    sqft: 1760,
    address: "5104 Dobry Drive",
    city: "Sterling Heights",
    state: "MI",
    zip: "48310",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    status: "Coming Soon",
  },
  {
    id: "mc-006",
    price: "$1,090,000",
    beds: 4,
    baths: 3,
    sqft: 3010,
    address: "840 Maplegrove Street",
    city: "Birmingham",
    state: "MI",
    zip: "48009",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    status: "For Sale",
  },
];

export async function getFeaturedListings(): Promise<Listing[]> {
  // TODO: replace with real MLS/IDX call when API credentials are available.
  return placeholder;
}
