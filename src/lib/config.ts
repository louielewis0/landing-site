// ┌──────────────────────────────────────────────────────────────────┐
// │  EDIT THIS FILE to update business info across the whole site.   │
// │  Replace every "TODO:" value with your real info, then commit.   │
// └──────────────────────────────────────────────────────────────────┘

export const company = {
  name: "Real Estate Market Center",
  shortName: "REMC",
  // TODO: set your primary city / service area
  city: "Your City",
  state: "ST",
  tagline: "Find Your Dream Home or Sell for Top Dollar",
  description:
    "The trusted real estate brokerage helping buyers and sellers win in today's market.",

  // TODO: replace with real contact info
  phone: "(555) 123-4567",
  phoneTel: "+15551234567", // E.164 format, used in tel: links
  email: "hello@realestatemarketcenter.com",
  address: "123 Main Street, Your City, ST 12345",

  // TODO: replace with real Google Maps embed URL
  // Get it from: maps.google.com → Share → Embed a map → copy the src URL
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1!2d-122.4!3d37.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ1JzAwLjAiTiAxMjLCsDI0JzAwLjAiVw!5e0!3m2!1sen!2sus",

  // TODO: replace with real social URLs (or empty string to hide)
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },

  // TODO: replace with real stats
  stats: [
    { value: "500+", label: "Homes Sold" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "$250M+", label: "In Closed Volume" },
  ],
} as const;

// TODO: swap with real testimonials. Keep 3-5 for the best visual balance.
export const testimonials = [
  {
    quote:
      "They sold our home in 6 days for over asking. The marketing, the photos, the negotiating — everything was handled. We've already recommended them to three friends.",
    name: "Sarah & Michael J.",
    role: "Sellers",
  },
  {
    quote:
      "As first-time buyers we had no idea what we were doing. They walked us through every step, caught issues in the inspection the other side missed, and got us into our dream home under budget.",
    name: "David K.",
    role: "Buyer",
  },
  {
    quote:
      "I've worked with three brokerages over the years. Real Estate Market Center is on another level — local knowledge, real negotiating skill, and they actually pick up the phone.",
    name: "Linda R.",
    role: "Investor",
  },
];

// TODO: swap with real neighborhood copy (great for local SEO)
export const neighborhoods = [
  {
    name: "Downtown",
    blurb: "Walkable core, new-construction condos, strong rental demand.",
  },
  {
    name: "Westside",
    blurb: "Top-rated schools, single-family homes, family-friendly parks.",
  },
  {
    name: "Lakeshore",
    blurb: "Waterfront luxury, historic estates, long-term value appreciation.",
  },
  {
    name: "The Heights",
    blurb: "Up-and-coming, craftsman bungalows, great first-home territory.",
  },
];

// Featured listings — replace with real photos + details, or wire to MLS later.
export const featuredListings = [
  {
    id: "1",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: 2850,
    address: "1847 Oakwood Lane",
    neighborhood: "Westside",
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
    neighborhood: "Lakeshore",
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
    neighborhood: "The Heights",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    status: "New Price",
  },
];
