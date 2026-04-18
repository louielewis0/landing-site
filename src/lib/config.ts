// ┌──────────────────────────────────────────────────────────────────┐
// │  EDIT THIS FILE to update business info across the whole site.   │
// └──────────────────────────────────────────────────────────────────┘

export const company = {
  name: "Real Estate Market Center",
  shortName: "REMC",
  city: "Troy",
  state: "MI",
  region: "Metro Detroit",
  tagline: "Metro Detroit's trusted full-service real estate experts.",
  footerTagline:
    "Proudly serving Metro Detroit homeowners, buyers, and investors.",
  description:
    "Metro Detroit real estate experts with 20+ years of experience and $100M+ in closed sales. Serving Troy, Rochester Hills, Birmingham, Bloomfield Hills, Sterling Heights, Royal Oak, Detroit, Warren, and Farmington Hills.",

  phone: "(248) 568-6081",
  phoneTel: "+12485686081",
  email: "realestatemarketmedia@gmail.com",
  address: "2032 E Square Lake Rd, Suite 400A, Troy, MI",

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

// Listings are now sourced from src/lib/listings.ts (MLS-ready).
