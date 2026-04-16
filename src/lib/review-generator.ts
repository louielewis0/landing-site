/**
 * AI Review Generator — produces unique, natural-sounding 5-star reviews.
 * ~15 openers per type × 25 middles × 20 closers × 12 city lines
 * = 90,000+ unique combinations per service type.
 *
 * Every client who taps 5 stars gets a different set of options.
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
    "Hands down the best home buying experience we could have asked for.",
    "They took the stress out of buying a home completely.",
    "We looked at dozens of homes and they never lost patience — not once.",
    "From our very first meeting, we knew we were in good hands.",
    "They helped us find a home we didn't even know was on the market.",
    "We were ready to give up on our search, then we called this team.",
    "Closed on our home ahead of schedule and under budget.",
    "They fought for us during negotiations and it showed in the final price.",
    "Our agent was more like a trusted advisor than a salesperson.",
    "Made what could have been a nightmare into something we actually enjoyed.",
  ],
  sell: [
    "Sold our home faster and for more than we expected.",
    "Our house was under contract in less than two weeks.",
    "They completely transformed how we approached selling our home.",
    "Best decision we made was listing with this team.",
    "From staging advice to closing day, everything was handled professionally.",
    "Got multiple offers within the first weekend on market.",
    "They priced our home perfectly — sold above asking.",
    "The marketing they did for our home was next level.",
    "We interviewed three agents. Went with them. No regrets.",
    "They told us exactly what to fix and what to leave alone. Saved us thousands.",
    "Sold in a tough market when our neighbors' homes were sitting.",
    "The open house strategy they used brought in serious buyers immediately.",
    "Our home sold for $20K more than the estimate we got from another agent.",
    "They handled every showing, every offer, every negotiation. We just signed.",
    "Listing to closing in 18 days. That's all I need to say.",
  ],
  "first-time": [
    "As first-time buyers, we had no idea where to start.",
    "Buying our first home felt overwhelming until we found this team.",
    "They held our hand through every single step of our first purchase.",
    "We went from confused renters to confident homeowners.",
    "First-time buying is stressful — they made it the opposite.",
    "They explained everything in plain English, no jargon, no pressure.",
    "We didn't even know what an escrow was. They walked us through all of it.",
    "For anyone buying their first home — this is who you call.",
    "They connected us with a lender who got us a rate we didn't think was possible.",
    "We thought we couldn't afford to buy. They showed us programs we qualified for.",
    "Patient, knowledgeable, and genuinely invested in helping us.",
    "They treated our starter home budget like it was a million-dollar deal.",
    "Every dumb question we asked was met with a real, thoughtful answer.",
    "We closed on our first home and honestly still can't believe it happened.",
    "They made first-time buying feel like something we could actually do.",
  ],
  invest: [
    "They helped us identify a great investment property with strong cash flow.",
    "Finally found an agent who actually understands the numbers side of real estate.",
    "Solid market analysis and negotiation skills — exactly what an investor needs.",
    "Added another property to our portfolio thanks to their off-market connections.",
    "They ran comps, projected ROI, and negotiated hard. That's rare.",
    "Most agents don't understand cap rates. This team does.",
    "They sourced a deal I never would have found on Zillow.",
    "Helped me close on a duplex that cash-flows from day one.",
    "They think like investors, not just agents. That's the difference.",
    "I've bought six properties. This was the smoothest transaction by far.",
    "They analyzed the deal from every angle before we even made an offer.",
    "Connected me with a property manager and contractor in the same week.",
    "Their off-market pipeline is the real deal.",
    "Negotiated terms that put me ahead before I even closed.",
    "If you're serious about building a portfolio, talk to these guys first.",
  ],
  relocation: [
    "Relocated to the area and they made the entire transition smooth.",
    "Moving across the country was stressful, but the home search was not.",
    "They understood our timeline pressure and delivered immediately.",
    "Found us a home in our target neighborhood within our first visit.",
    "Best relocation experience we've ever had.",
    "We had two weeks to find a home. They made it happen in one.",
    "Knew nothing about the area — they gave us a full education.",
    "They drove us through every neighborhood and gave us the real scoop.",
    "Relocation is chaos. They were the calm in the middle of it.",
    "Found us a place near the right schools, commute, and budget. Nailed it.",
    "They coordinated everything remotely until we arrived. Seamless.",
    "We FaceTimed tours, they handled offers. Moved in with zero surprises.",
    "Relocating with a family is hard. They made the house part easy.",
    "Our company's relocation coordinator said they were the best they'd worked with.",
    "From out-of-state to moved-in within 30 days. Couldn't ask for more.",
  ],
  other: [
    "Exceptional experience working with this real estate team.",
    "Highly professional and genuinely cared about our goals.",
    "Couldn't have asked for a better experience.",
    "They went above and beyond what we expected.",
    "From our first call to closing day, everything was outstanding.",
    "Professional, responsive, and clearly know what they're doing.",
    "They earned our trust from the very first conversation.",
    "Real estate done right. No shortcuts, no games.",
    "They treated us like their only client.",
    "Exceeded every expectation we had.",
    "We've worked with other agents before. This was a different level.",
    "Honest, hardworking, and results-driven. The full package.",
    "They made a complicated process feel simple.",
    "Would trust them with any real estate decision.",
    "The kind of team you recommend to everyone you know.",
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
  "They anticipated problems before they happened and handled them quietly.",
  "The level of attention to detail was impressive.",
  "They kept us informed at every stage — no surprises.",
  "Quick to respond, always prepared, and knew the market cold.",
  "They went to bat for us during negotiations and it made all the difference.",
  "We felt like a priority from day one, not just another transaction.",
  "Their network of lenders, inspectors, and attorneys was a huge advantage.",
  "They were upfront about everything — even when it wasn't what we wanted to hear.",
  "The entire process was organized and on schedule.",
  "They made themselves available whenever we needed them, no exceptions.",
  "We could tell they genuinely cared about the outcome, not just the commission.",
  "Their advice on pricing strategy was spot-on.",
  "They handled the paperwork so efficiently we barely had to think about it.",
  "Every recommendation they made turned out to be the right call.",
  "They brought a level of professionalism we didn't expect.",
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
  "Already told our neighbors to call them when they're ready.",
  "If you're on the fence, just call them. You'll see.",
  "This team sets the bar for what real estate service should be.",
  "Looking forward to working with them again in the future.",
  "Truly a five-star experience from beginning to end.",
  "We will never use anyone else.",
  "The kind of service you tell people about at dinner parties.",
  "They made believers out of us.",
  "Worth every minute of the process.",
  "We're clients for life after this experience.",
];

const cityMentions = [
  (city: string) => `Their knowledge of the ${city} market was invaluable.`,
  (city: string) => `They know ${city} inside and out.`,
  (city: string) => `${city} is competitive and they helped us stand out.`,
  (city: string) => `So glad we had local expertise in ${city}.`,
  (city: string) => `They made finding the right home in ${city} look easy.`,
  (city: string) => `Nobody knows ${city} real estate like this team.`,
  (city: string) => `They showed us parts of ${city} we never would have found on our own.`,
  (city: string) => `If you're looking in ${city}, these are the people to call.`,
  (city: string) => `Their insight into the ${city} market saved us time and money.`,
  (city: string) => `${city} moves fast and they kept us ahead of every listing.`,
  (city: string) => `They understand what makes ${city} neighborhoods different from each other.`,
  (city: string) => `Grateful to have had a team that actually lives and works in ${city}.`,
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique<T>(arr: T[], exclude: Set<T>): T {
  const available = arr.filter((x) => !exclude.has(x));
  return available.length > 0 ? pick(available) : pick(arr);
}

export function generateReview({ name, serviceType, serviceArea }: Params): string {
  const type = openers[serviceType] ? serviceType : "other";
  const opener = pick(openers[type]);
  const middle = pick(middles);
  const includeCity = Math.random() > 0.3;
  const cityLine = includeCity ? " " + pick(cityMentions)(serviceArea) : "";
  const closer = pick(closers);

  return `${opener} ${middle}${cityLine} ${closer}`;
}

/**
 * Generate multiple unique options. Uses deduplication on all sentence
 * components so no two options in the same set share an opener, middle,
 * or closer.
 */
export function generateReviewOptions(params: Params, count = 3): string[] {
  const type = openers[params.serviceType] ? params.serviceType : "other";
  const usedOpeners = new Set<string>();
  const usedMiddles = new Set<string>();
  const usedClosers = new Set<string>();
  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    const opener = pickUnique(openers[type], usedOpeners);
    const middle = pickUnique(middles, usedMiddles);
    const closer = pickUnique(closers, usedClosers);
    const includeCity = Math.random() > 0.3;
    const cityLine = includeCity ? " " + pick(cityMentions)(params.serviceArea) : "";

    usedOpeners.add(opener);
    usedMiddles.add(middle);
    usedClosers.add(closer);

    results.push(`${opener} ${middle}${cityLine} ${closer}`);
  }

  return results;
}
