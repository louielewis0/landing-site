// ┌──────────────────────────────────────────────────────────────────┐
// │  EDIT THIS FILE to update business info across the whole site.   │
// └──────────────────────────────────────────────────────────────────┘

export const company = {
  name: "Real Estate Market Center",
  shortName: "REMC",
  city: "Troy",
  state: "MI",
  region: "Metro Detroit",
  tagline: "Find Your Dream Home or Sell for Top Dollar",
  description:
    "Metro Detroit's trusted real estate brokerage. Over 20 years, $100M+ closed, and still picking up the phone.",

  phone: "(248) 568-6081",
  phoneTel: "+12485686081",
  email: "sunduslewis@gmail.com",
  address: "2032 E Square Lake Rd, Suite 400A, Troy, MI",

  // Address-based embed (works without an API key). Swap anytime via maps.google.com → Share → Embed a map.
  googleMapsEmbed:
    "https://maps.google.com/maps?q=2032%20E%20Square%20Lake%20Rd%20Suite%20400A%20Troy%20MI&t=&z=15&ie=UTF8&iwloc=&output=embed",

  social: {
    facebook: "https://www.facebook.com/sunduslewis/",
    instagram: "",
    linkedin: "",
  },

  stats: [
    { value: "20+", label: "Years Experience" },
    { value: "$100M+", label: "In Real Estate Sold" },
    { value: "500+", label: "Homes Closed" },
    { value: "Metro Detroit", label: "Local Experts" },
  ],
} as const;

export const testimonials = [
  {
    quote:
      "Real Estate Market Center got our home sold in just 6 days for $18,000 over asking. The entire process was smooth, professional, and stress-free. If you're even thinking about selling, don't go with anyone else.",
    name: "Recent Seller",
    role: "Troy, MI",
  },
  {
    quote:
      "As a first-time buyer, I had no idea what I was doing. They walked me through every step, negotiated aggressively on my behalf, and got me a better deal than I expected. I wouldn't have gotten this home without them.",
    name: "First-Time Buyer",
    role: "Metro Detroit",
  },
  {
    quote:
      "We had our house listed with another agent for months with no results. Real Estate Market Center came in with a completely different strategy and had it under contract within 2 weeks. That says everything.",
    name: "Relisted Seller",
    role: "Oakland County",
  },
  {
    quote:
      "I've worked with multiple agents, but this team actually understands the market. They helped me find a property with strong upside and negotiated terms that immediately put me ahead. This is who you want if you're serious about real estate.",
    name: "Investor Client",
    role: "Metro Detroit",
  },
  {
    quote:
      "What stood out most was how much they actually cared. They weren't just trying to close a deal — they made sure it was the right deal for us. That level of honesty is rare.",
    name: "Happy Homeowner",
    role: "Troy, MI",
  },
];

// TODO: swap neighborhoods for the Metro Detroit areas you actually work (add/remove freely).
export const neighborhoods = [
  {
    name: "Troy",
    blurb: "Top-rated schools, strong resale value, and a thriving local economy.",
  },
  {
    name: "Birmingham",
    blurb: "Walkable downtown, upscale homes, Metro Detroit's premier lifestyle.",
  },
  {
    name: "Bloomfield Hills",
    blurb: "Executive estates, top schools, and long-term value appreciation.",
  },
  {
    name: "Rochester Hills",
    blurb: "Family-friendly, parks, and excellent new-construction inventory.",
  },
];

export const featuredListings = [
  {
    id: "1",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: 2850,
    address: "1847 Oakwood Lane",
    neighborhood: "Birmingham",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    status: "Just Listed",
  },
  {
    id: "2",
    price: "$875,000",
    beds: 3,
    baths: 2,
    sqft: 1920,
    address: "412 Lakeshore Drive",
    neighborhood: "Bloomfield Hills",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    status: "Open House Sat",
  },
  {
    id: "3",
    price: "$2,450,000",
    beds: 5,
    baths: 4,
    sqft: 4100,
    address: "27 Hilltop Court",
    neighborhood: "Rochester Hills",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    status: "New Price",
  },
];
