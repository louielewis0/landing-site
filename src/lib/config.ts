// ┌──────────────────────────────────────────────────────────────────┐
// │  EDIT THIS FILE to update business info across the whole site.   │
// └──────────────────────────────────────────────────────────────────┘

export const company = {
  name: "Real Estate Market Center",
  shortName: "REMC",
  city: "Troy",
  state: "MI",
  region: "Metro Detroit",
  tagline: "Metro Detroit's independent luxury real estate brokerage.",
  footerTagline:
    "Proudly serving Metro Detroit homeowners, buyers, and investors.",
  description:
    "Metro Detroit's independent luxury real estate brokerage — 20+ years of experience and $100M+ in closed sales. Serving Troy, Rochester Hills, Birmingham, Bloomfield Hills, Sterling Heights, Royal Oak, Detroit, Warren, and Farmington Hills.",

  phone: "(248) 568-6081",
  phoneTel: "+12485686081",
  email: "realestatemarketmedia@gmail.com",
  address: "2032 E Square Lake Rd Ste 400A, Troy, MI 48085",

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

export const cities = [
  { name: "Troy", slug: "troy" },
  { name: "Rochester Hills", slug: "rochester-hills" },
  { name: "Birmingham", slug: "birmingham" },
  { name: "Bloomfield Hills", slug: "bloomfield-hills" },
  { name: "West Bloomfield", slug: "west-bloomfield" },
  { name: "Sterling Heights", slug: "sterling-heights" },
  { name: "Warren", slug: "warren" },
];

export const services = [
  {
    id: "buy",
    title: "Buy a Home in Michigan",
    blurb: "Find the right home, at the right price, without compromising.",
    icon: "home",
  },
  {
    id: "sell",
    title: "Sell Your Home Fast",
    blurb: "Sell at or above asking with our proven pricing and marketing system.",
    icon: "sell",
  },
  {
    id: "first-time",
    title: "First-Time Home Buyers",
    blurb: "Step-by-step guidance plus access to down-payment assistance programs.",
    icon: "key",
  },
  {
    id: "luxury",
    title: "Luxury Real Estate",
    blurb: "Discreet, high-touch representation for premium Metro Detroit properties.",
    icon: "crown",
  },
  {
    id: "commercial",
    title: "Commercial Properties",
    blurb: "Offices, retail, and mixed-use representation across Metro Detroit.",
    icon: "building",
  },
  {
    id: "investment",
    title: "Investment Consulting",
    blurb: "Cash-flow, cap-rate, and 1031 strategy for serious investors.",
    icon: "chart",
  },
  {
    id: "management",
    title: "Property Management",
    blurb: "Full-service management that protects your investment and your tenants.",
    icon: "shield",
  },
  {
    id: "relocation",
    title: "Relocation Services",
    blurb: "Move in or out of Metro Detroit with zero stress — we handle every detail.",
    icon: "map",
  },
];

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
    role: "Rochester Hills, MI",
  },
  {
    quote:
      "We had our house listed with another agent for months with no results. Real Estate Market Center came in with a completely different strategy and had it under contract within 2 weeks. That says everything.",
    name: "Relisted Seller",
    role: "Birmingham, MI",
  },
  {
    quote:
      "I've worked with multiple agents, but this team actually understands the market. They helped me find a property with strong upside and negotiated terms that immediately put me ahead. This is who you want if you're serious about real estate.",
    name: "Investor Client",
    role: "Bloomfield Hills, MI",
  },
  {
    quote:
      "What stood out most was how much they actually cared. They weren't just trying to close a deal — they made sure it was the right deal for us. That level of honesty is rare.",
    name: "Happy Homeowner",
    role: "Sterling Heights, MI",
  },
];

export const neighborhoods = [
  { name: "Troy", blurb: "Top-rated schools, strong resale value, and a thriving local economy." },
  { name: "Birmingham", blurb: "Walkable downtown, upscale homes, Metro Detroit's premier lifestyle." },
  { name: "Bloomfield Hills", blurb: "Executive estates, top schools, and long-term value appreciation." },
  { name: "Rochester Hills", blurb: "Family-friendly, parks, and excellent new-construction inventory." },
];

/**
 * Real, verbatim 5-star Google reviews for Real Estate Market Center
 * (Sundus Lewis' Business Profile, 5.0★ / 70+ reviews). Shown as visible
 * social proof only — never emitted as self-serving aggregateRating schema.
 * Shared by the homepage and the brokerage-comparison page. Only REMC's own
 * reviews ever appear on the site.
 */
export const googleReviews = [
  { text: "Really helpful and professional team! They made the entire process smooth and stress-free, and their knowledge of the local market was evident from start to finish. I'd highly recommend Real Estate Market Center to anyone looking for a team that's responsive, knowledgeable, and genuinely easy to work with.", name: "Fadi E." },
  { text: "Had a great experience working with Real Estate Market Center. The entire staff was incredibly nice, professional, and efficient from start to finish. They are just the best.", name: "Steven N." },
  { text: "It was a pleasure working with Real Estate Market Center. Everyone on the team was professional, responsive, and really knew the ins and outs of the market.", name: "Anthony M." },
  { text: "I had an excellent experience with Real Estate Market Center. Their team was knowledgeable, dependable, and easy to work with throughout the entire process. They have a strong understanding of the Metro Detroit real estate market.", name: "Vincent A." },
  { text: "Best brokerage in Troy — highly recommend Real Estate Market Center!", name: "Adam J." },
] as const;

// Listings are now sourced from src/lib/listings.ts (MLS-ready).
