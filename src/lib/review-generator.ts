/**
 * AI Review Generator — generates unique, natural-sounding 5-star reviews
 * based on service type and city. Each call produces a different review
 * by combining randomized sentence components.
 *
 * TODO: When ANTHROPIC_API_KEY is set, swap this for a Claude API call
 * that generates truly unique reviews with even more variation. The function
 * signature stays the same — callers don't change.
 */

type Params = {
  name: string;
  serviceType: string;
  serviceArea: string;
};

const openers: Record<string, string[]> = {
  buy: [
    "Just closed on our new home and couldn't be happier with the experience.",
    "Found our dream home thanks to this incredible team.",
    "The home buying process was seamless from start to finish.",
    "We were nervous about buying, but they made every step easy.",
    "After months of searching on our own, we reached out and they found us the perfect place within weeks.",
  ],
  sell: [
    "Sold our home faster and for more than we expected.",
    "Our house was under contract in less than two weeks.",
    "They completely transformed how we approached selling our home.",
    "Best decision we made was listing with this team.",
    "From staging advice to closing day, everything was handled professionally.",
  ],
  "first-time": [
    "As first-time buyers, we had no idea where to start.",
    "Buying our first home felt overwhelming until we found this team.",
    "They held our hand through every single step of our first purchase.",
    "We went from confused renters to confident homeowners.",
    "First-time buying is stressful — they made it the opposite.",
  ],
  invest: [
    "They helped us identify a great investment property with strong cash flow.",
    "Finally found an agent who actually understands the numbers side of real estate.",
    "Solid market analysis and negotiation skills — exactly what an investor needs.",
    "Added another property to our portfolio thanks to their off-market connections.",
    "They ran comps, projected ROI, and negotiated hard. That's rare.",
  ],
  relocation: [
    "Relocated to the area and they made the entire transition smooth.",
    "Moving across the country was stressful, but the home search was not.",
    "They understood our timeline pressure and delivered immediately.",
    "Found us a home in our target neighborhood within our first visit.",
    "Best relocation experience we've ever had.",
  ],
  other: [
    "Exceptional experience working with this real estate team.",
    "Highly professional and genuinely cared about our goals.",
    "Couldn't have asked for a better experience.",
    "They went above and beyond what we expected.",
    "From our first call to closing day, everything was outstanding.",
  ],
};

const middles = [
  "Communication was excellent throughout the entire process.",
  "They were always available to answer questions, even on weekends.",
  "Their market knowledge in the area is unmatched.",
  "The negotiation alone saved us thousands.",
  "Every detail was handled — inspections, paperwork, timelines, everything.",
  "They were honest and straightforward, never pushy.",
  "Felt like we had an unfair advantage in the market with them on our side.",
  "They genuinely listened to what we wanted and delivered exactly that.",
  "Responsive, professional, and clearly experienced.",
  "We never felt rushed or pressured at any point.",
];

const closers = [
  "Highly recommend to anyone looking to buy or sell.",
  "We've already referred two friends.",
  "Would absolutely use them again.",
  "If you want results, this is the team to call.",
  "Five stars isn't enough — they earned ten.",
  "Can't recommend them highly enough.",
  "Thank you for making this such a positive experience.",
  "We're so glad we chose them.",
  "Without hesitation, the best real estate experience we've had.",
  "Grateful for everything they did for our family.",
];

const cityMentions = [
  (city: string) => `Their knowledge of the ${city} market was invaluable.`,
  (city: string) => `They know ${city} inside and out.`,
  (city: string) => `${city} is competitive and they helped us stand out.`,
  (city: string) => `So glad we had local expertise in ${city}.`,
  (city: string) => `They made finding the right home in ${city} look easy.`,
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateReview({ name, serviceType, serviceArea }: Params): string {
  const type = openers[serviceType] ? serviceType : "other";
  const opener = pick(openers[type]);
  const middle = pick(middles);
  const cityLine = Math.random() > 0.4 ? " " + pick(cityMentions)(serviceArea) : "";
  const closer = pick(closers);

  return `${opener} ${middle}${cityLine} ${closer}`;
}

/**
 * Generate multiple options so the client can pick their favorite.
 */
export function generateReviewOptions(params: Params, count = 3): string[] {
  const seen = new Set<string>();
  const results: string[] = [];
  let attempts = 0;
  while (results.length < count && attempts < 20) {
    const review = generateReview(params);
    if (!seen.has(review)) {
      seen.add(review);
      results.push(review);
    }
    attempts++;
  }
  return results;
}
