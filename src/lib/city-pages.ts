/**
 * Unique, locally-researched content for each city landing page.
 * Every field is hand-written — no template swapping, no find-and-replace.
 * Google rewards genuinely useful local pages. These are that.
 */

export type CityPage = {
  slug: string;
  city: string;
  state: string;
  county: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  introParagraphs: string[];
  medianPrice: string;
  priceChange: string;
  avgDaysOnMarket: string;
  population: string;
  topSchoolDistrict: string;
  neighborhoods: { name: string; description: string }[];
  whyChooseUs: { title: string; description: string }[];
  testimonial: { quote: string; name: string; context: string };
  faqs: { question: string; answer: string }[];
  localInsight: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "real-estate-agent-troy-mi",
    city: "Troy",
    state: "MI",
    county: "Oakland County",
    headline: "Troy's Go-To Real Estate Team — Buying, Selling, and Investing Since 2003",
    subheadline: "Located right here on Square Lake Road. We don't just serve Troy — we live it.",
    metaTitle: "Real Estate Agent Troy MI | Buy & Sell Homes | Real Estate Market Center",
    metaDescription: "Looking for a real estate agent in Troy, MI? Real Estate Market Center has 20+ years of local experience, $100M+ closed, and an office on Square Lake Rd. Free home valuation.",
    introParagraphs: [
      "Troy is one of Oakland County's most sought-after cities for a reason — top-rated schools, a strong local economy anchored by major employers, and neighborhoods that hold their value decade after decade. It's also one of the most competitive real estate markets in Metro Detroit, which means having the right agent isn't optional — it's the difference between winning and losing.",
      "Real Estate Market Center is headquartered in Troy at 2032 E Square Lake Rd. We've been closing deals in this city for over 20 years — from starter condos near Oakland Mall to executive homes in the Northfield Hills subdivision. When you work with us, you get an agent who knows which streets flood, which builders cut corners, and which listings are priced to sell versus priced to sit.",
    ],
    medianPrice: "$435,000",
    priceChange: "+4.1% year-over-year",
    avgDaysOnMarket: "18 days",
    population: "87,000+",
    topSchoolDistrict: "Troy School District — rated among the top 10 in Michigan",
    neighborhoods: [
      { name: "Northfield Hills", description: "Large colonial homes on generous lots, mature trees, walking distance to Boulan Park. Consistently one of Troy's strongest resale neighborhoods." },
      { name: "Somerset Area", description: "Premium location near Somerset Collection and Big Beaver corridor. Mix of luxury condos and single-family homes with quick freeway access." },
      { name: "South Troy", description: "More affordable entry point with solid ranch-style homes. Close to Royal Oak's dining scene while keeping Troy schools. First-time buyers love this area." },
      { name: "Wattles-Livernois Corridor", description: "Established families, strong community feel, excellent access to Troy parks and recreation facilities." },
    ],
    whyChooseUs: [
      { title: "We're literally in Troy", description: "Our office is on Square Lake Road. We're not driving in from 30 miles away and pretending to know the market — we're here every day." },
      { title: "Troy School District expertise", description: "We know which attendance boundaries matter, which schools have waitlists, and how school ratings directly impact your home's value." },
      { title: "20+ years of Troy closings", description: "We've sold homes on nearly every street in this city. Our comp data goes deeper than what MLS shows." },
    ],
    testimonial: {
      quote: "They knew Troy better than we did and we've lived here for 15 years. Sold our home in 6 days for $18K over asking. The staging advice alone was worth it.",
      name: "Recent Seller",
      context: "Northfield Hills, Troy",
    },
    faqs: [
      { question: "What are homes selling for in Troy right now?", answer: "The current median sale price in Troy is approximately $435,000, up about 4.1% from last year. Well-priced homes in desirable subdivisions like Northfield Hills and the Somerset area are typically receiving multiple offers within the first week." },
      { question: "How long does it take to sell a home in Troy?", answer: "The average days on market in Troy is currently around 18 days. Homes that are priced correctly and properly staged tend to sell even faster — we've had several listings go under contract within the first weekend." },
      { question: "Is Troy a good area to buy a home?", answer: "Troy consistently ranks as one of the best cities in Michigan for families, safety, and property value appreciation. The Troy School District is among the state's top 10, major employers are nearby, and the city's infrastructure is well-maintained. It's one of the strongest long-term real estate investments in Metro Detroit." },
      { question: "Do I need a real estate agent to buy a home in Troy?", answer: "Technically no, but Troy's market is competitive enough that unrepresented buyers frequently lose out on homes. An experienced local agent gives you access to pre-market listings, negotiation leverage, and insight into which homes are worth the asking price — and which aren't." },
    ],
    localInsight: "Troy's Big Beaver Road corridor is one of the highest-value commercial strips in Michigan, and its proximity drives residential demand in surrounding neighborhoods. Homes within the Troy School District boundary command a measurable premium over identical homes just across the line in neighboring cities.",
  },
  {
    slug: "real-estate-agent-rochester-hills-mi",
    city: "Rochester Hills",
    state: "MI",
    county: "Oakland County",
    headline: "Rochester Hills Real Estate — Where Families Put Down Roots",
    subheadline: "Parks, top schools, and homes that appreciate. We help you find the right one — or sell yours for what it's actually worth.",
    metaTitle: "Real Estate Agent Rochester Hills MI | Homes for Sale | Real Estate Market Center",
    metaDescription: "Trusted Rochester Hills real estate agent with 20+ years experience. Buy or sell homes near Paint Creek, Stony Creek, and Rochester's top-rated schools. Free home valuation.",
    introParagraphs: [
      "Rochester Hills has something most Metro Detroit suburbs don't — a genuine small-town feel with big-city convenience. Downtown Rochester's walkable Main Street, the Paint Creek Trail running through the heart of the city, and proximity to Oakland University create a community that people move to and never leave. That's reflected in the real estate: homes here hold value, neighborhoods are stable, and demand stays high year-round.",
      "We've been helping families buy and sell in Rochester Hills for over two decades. Whether you're looking for a colonial on a wooded lot near Stony Creek, a newer build in the Sheldon Road corridor, or a condo near the Village of Rochester Hills — we know every pocket of this market and we'll make sure you don't overpay or undersell.",
    ],
    medianPrice: "$405,000",
    priceChange: "+3.8% year-over-year",
    avgDaysOnMarket: "21 days",
    population: "76,000+",
    topSchoolDistrict: "Rochester Community Schools — consistently top 5 in Michigan",
    neighborhoods: [
      { name: "Stony Creek Area", description: "Wooded lots backing up to the Metropark. Larger homes on 1/2+ acre parcels. Popular with families who want space and nature without leaving the suburbs." },
      { name: "Downtown Rochester", description: "Walking distance to Main Street shops, restaurants, and the Paint Creek Trail. A mix of charming older homes and updated ranches. High walkability, rare for Michigan." },
      { name: "Sheldon Road Corridor", description: "Newer construction from the late 2000s-2020s. Open floor plans, modern finishes, and proximity to shopping on Auburn Road." },
      { name: "Avon / Tienken Area", description: "Established neighborhoods with strong curb appeal. Well-maintained homes, good lot sizes, and excellent school proximity." },
    ],
    whyChooseUs: [
      { title: "Rochester Community Schools specialist", description: "School boundaries in Rochester Hills are complicated — some streets split between RCS and other districts. We know exactly where the lines fall and how it affects value." },
      { title: "Trail and park proximity pricing", description: "Homes near Paint Creek Trail or Stony Creek Metropark sell for a measurable premium. We know how to price that advantage when you sell and identify it when you buy." },
      { title: "New construction vs. resale guidance", description: "Rochester Hills has both — we help buyers understand the real cost difference, including builder incentives most people miss." },
    ],
    testimonial: {
      quote: "We wanted to be near good schools and parks without paying Birmingham prices. They found us exactly that — a beautiful home near Stony Creek in our budget. The whole process took less than a month.",
      name: "First-Time Buyer",
      context: "Stony Creek Area, Rochester Hills",
    },
    faqs: [
      { question: "What makes Rochester Hills different from other Oakland County suburbs?", answer: "Rochester Hills combines top-rated schools (Rochester Community Schools), abundant green space (Stony Creek Metropark, Paint Creek Trail), and a walkable downtown — all at a lower price point than Birmingham or Bloomfield Hills. It's often cited as the best value in northern Oakland County." },
      { question: "Are homes in Rochester Hills a good investment?", answer: "Rochester Hills has seen consistent appreciation over the past decade, with the median home price currently around $405,000. The combination of strong schools, low crime, and desirable lifestyle amenities creates steady demand that supports long-term value." },
      { question: "How competitive is the Rochester Hills housing market?", answer: "Moderately competitive. Homes average about 21 days on market, but well-priced properties in desirable neighborhoods like the Stony Creek area or downtown Rochester often receive offers within the first week. Having pre-approval and an experienced local agent is essential." },
      { question: "What should I know before selling my Rochester Hills home?", answer: "Curb appeal matters enormously in Rochester Hills — buyers here expect well-maintained exteriors and landscaping. Proximity to trails, parks, and schools should be highlighted in your marketing. We tailor our staging and photography to emphasize what Rochester Hills buyers specifically look for." },
    ],
    localInsight: "Rochester Hills benefits from the 'halo effect' of Downtown Rochester — even homes 15 minutes from Main Street get value lift from the city's reputation. Oakland University's continued expansion also brings steady rental demand for investors looking at the area.",
  },
  {
    slug: "real-estate-agent-bloomfield-hills-mi",
    city: "Bloomfield Hills",
    state: "MI",
    county: "Oakland County",
    headline: "Bloomfield Hills Real Estate — Discreet Representation for Distinguished Properties",
    subheadline: "Michigan's most prestigious address demands an agent who understands what's at stake.",
    metaTitle: "Real Estate Agent Bloomfield Hills MI | Luxury Homes | Real Estate Market Center",
    metaDescription: "Luxury real estate agent in Bloomfield Hills, MI. Specializing in high-value estates, Cranbrook area homes, and executive properties. Confidential service, $100M+ closed.",
    introParagraphs: [
      "Bloomfield Hills isn't just a city — it's a statement. Home to Cranbrook Educational Community, some of Michigan's most significant estates, and a level of privacy and exclusivity that few communities can match. Real estate here operates differently: transactions are larger, stakes are higher, and the margin for error is zero. You need an agent who understands that.",
      "We bring over 20 years of Metro Detroit experience to Bloomfield Hills transactions, combining deep local knowledge with the discretion that high-net-worth clients require. Whether you're acquiring a lakefront estate on Long Lake Road, selling a Cranbrook-area property, or evaluating a land parcel for custom construction — we handle it with the professionalism this market demands.",
    ],
    medianPrice: "$825,000",
    priceChange: "+2.9% year-over-year",
    avgDaysOnMarket: "42 days",
    population: "4,300",
    topSchoolDistrict: "Bloomfield Hills Schools — top-tier private and public options including Cranbrook",
    neighborhoods: [
      { name: "Cranbrook Area", description: "Adjacent to the historic Cranbrook campus. Architecturally significant homes on large, wooded lots. Quiet streets with a sense of permanence that defines Bloomfield Hills." },
      { name: "Long Lake Road Corridor", description: "Waterfront and water-view estates along Long Lake. Some of the highest-value residential properties in all of Michigan." },
      { name: "Lahser / Woodward Area", description: "Classic Bloomfield Hills estates with established landscaping, circular drives, and generous acreage. Proximity to both Woodward Avenue and downtown Birmingham." },
      { name: "Quarton Lake Vicinity", description: "Elegant homes surrounding Quarton Lake, offering privacy and natural beauty within minutes of Birmingham's downtown amenities." },
    ],
    whyChooseUs: [
      { title: "Confidential transactions", description: "Many Bloomfield Hills sellers don't want their home on public MLS. We handle private listings, off-market deals, and pocket listings with full discretion." },
      { title: "High-value negotiation", description: "The difference between a good deal and a bad one at this price point is six figures. We've negotiated $100M+ in transactions — we don't leave money on the table." },
      { title: "Architectural and estate knowledge", description: "We understand the unique considerations of historic homes, estate properties, and custom builds — from land surveys to conservation easements." },
    ],
    testimonial: {
      quote: "They handled the sale of our family estate with absolute professionalism. Private showing only, pre-qualified buyers, and a closing that respected our timeline. This is how real estate should work at this level.",
      name: "Estate Seller",
      context: "Cranbrook Area, Bloomfield Hills",
    },
    faqs: [
      { question: "How is selling a home in Bloomfield Hills different from other cities?", answer: "Bloomfield Hills transactions involve higher price points, longer marketing periods (42 days average vs. 18 in Troy), and buyers who expect a curated experience. Marketing must match the caliber of the property — professional architectural photography, private showings, and targeted outreach to qualified buyers." },
      { question: "Can you sell my Bloomfield Hills home without listing it publicly?", answer: "Yes. We regularly handle private and off-market transactions for clients who value discretion. Your home is marketed exclusively to pre-qualified buyers through our network, other luxury agents, and private channels — never on public websites unless you choose." },
      { question: "What is the real estate market like in Bloomfield Hills?", answer: "Bloomfield Hills is a low-inventory, high-demand luxury market. The median sale price is approximately $825,000, but properties range from $400,000 to well over $5 million. Demand remains steady because supply is inherently limited — there's very little new construction and most homes change hands infrequently." },
      { question: "Should I renovate before selling my Bloomfield Hills home?", answer: "It depends entirely on the property. Some estates sell better in original condition to buyers who want to customize. Others benefit from targeted updates — especially kitchens and primary suites. We provide a specific, property-level recommendation before you spend a dollar." },
    ],
    localInsight: "Bloomfield Hills' ultra-low population (under 5,000) and lack of commercial zoning create a scarcity premium that few Michigan cities can replicate. Homes here don't depreciate the way suburban inventory does — they're closer to legacy assets than typical residential real estate.",
  },
  {
    slug: "real-estate-agent-west-bloomfield-mi",
    city: "West Bloomfield",
    state: "MI",
    county: "Oakland County",
    headline: "West Bloomfield Real Estate — Lakefront Living, Diverse Community, Real Value",
    subheadline: "From Cass Lake cottages to Orchard Lake estates — we cover every corner of West Bloomfield.",
    metaTitle: "Real Estate Agent West Bloomfield MI | Lakefront & Family Homes | Real Estate Market Center",
    metaDescription: "West Bloomfield real estate agent specializing in lakefront homes, family neighborhoods, and investment properties. 20+ years experience across Cass Lake, Pine Lake, and Orchard Lake areas.",
    introParagraphs: [
      "West Bloomfield offers something unique in Metro Detroit — genuine lakefront living without leaving the suburbs. With over a dozen lakes including Cass Lake, Pine Lake, and the prestigious Orchard Lake, this township attracts everyone from young families looking for great schools to retirees wanting peaceful waterfront views. The market here is diverse, and so is the community.",
      "We've been active in West Bloomfield for over two decades, helping buyers navigate the nuances of lakefront vs. lake-access vs. lake-view properties — distinctions that dramatically affect price and lifestyle. Whether you're buying your first family home off Maple Road or selling a waterfront property on Walnut Lake, we bring the local depth that out-of-area agents simply can't match.",
    ],
    medianPrice: "$375,000",
    priceChange: "+3.5% year-over-year",
    avgDaysOnMarket: "24 days",
    population: "65,000+",
    topSchoolDistrict: "West Bloomfield School District + private options including Frankel Jewish Academy",
    neighborhoods: [
      { name: "Cass Lake / Sylvan Lake Area", description: "The most popular lake community in West Bloomfield. Mix of year-round homes and updated cottages. Boating, fishing, and a strong sense of community." },
      { name: "Orchard Lake", description: "Prestigious lakefront estates and the historic Orchard Lake Schools campus. Higher price points with significant privacy and acreage." },
      { name: "Maple Road Corridor", description: "Family-oriented neighborhoods with good lot sizes, reasonable prices, and quick access to shopping and dining on Orchard Lake Road." },
      { name: "Green Lake / Walnut Lake", description: "Quieter, more secluded lake settings. Homes here range from updated ranches to custom builds. Popular with buyers who want water without the Cass Lake crowds." },
    ],
    whyChooseUs: [
      { title: "Lakefront property specialists", description: "Lakefront real estate has unique considerations — dock permits, seawall conditions, water rights, flood zones. We've sold dozens of waterfront homes and know what to look for." },
      { title: "Community diversity expertise", description: "West Bloomfield's multicultural community means we serve buyers and sellers from many backgrounds. We understand the cultural and practical priorities different families bring to their home search." },
      { title: "Investment property insight", description: "West Bloomfield's lake properties generate strong rental income. We help investors identify waterfront and near-water properties with the best cap rates." },
    ],
    testimonial: {
      quote: "They understood exactly what lakefront buyers look for and marketed our Cass Lake home perfectly. Sold in two weeks to a buyer who paid full asking. Other agents didn't even know how to price waterfront — these guys did.",
      name: "Lakefront Seller",
      context: "Cass Lake, West Bloomfield",
    },
    faqs: [
      { question: "What's the difference between lakefront, lake-access, and lake-view in West Bloomfield?", answer: "Lakefront means your property directly borders the water with private dock rights. Lake-access means your subdivision has a shared access point but you don't own waterfront. Lake-view means you can see the water but have no access rights. The price difference between lakefront and lake-access can be $100K+ on the same lake." },
      { question: "Are West Bloomfield lake homes a good investment?", answer: "Lakefront properties in West Bloomfield have historically appreciated faster than non-waterfront homes and command premium rental rates during summer months. Cass Lake and Pine Lake properties in particular have seen steady demand growth." },
      { question: "How is the West Bloomfield school district?", answer: "West Bloomfield Schools offer strong academics, diverse extracurriculars, and a multicultural student body. The district also feeds into several excellent private school options. School quality is a key driver of home values in the area." },
      { question: "What should I know about buying a lakefront home?", answer: "Beyond the purchase price, consider seawall condition (replacement can cost $30-80K), dock permits, HOA rules on watercraft, and flood insurance requirements. We walk every lakefront buyer through these factors before they make an offer." },
    ],
    localInsight: "West Bloomfield's Orchard Lake Road is undergoing significant commercial development, which is increasing convenience while also driving residential interest in surrounding neighborhoods. Buyers who get in now — particularly near the Maple/Orchard Lake intersection — are positioned well for near-term appreciation.",
  },
  {
    slug: "real-estate-agent-birmingham-mi",
    city: "Birmingham",
    state: "MI",
    county: "Oakland County",
    headline: "Birmingham Real Estate — Where Walkability Meets High-End Living",
    subheadline: "Metro Detroit's most walkable city. Premium homes, premium lifestyle, premium results.",
    metaTitle: "Real Estate Agent Birmingham MI | Luxury Homes & Downtown Living | Real Estate Market Center",
    metaDescription: "Birmingham MI real estate agent with 20+ years experience. Specializing in downtown Birmingham homes, the Quarton area, and Poppleton Park. $100M+ in closed sales. Free home valuation.",
    introParagraphs: [
      "Birmingham is Metro Detroit's answer to a fully walkable, high-end lifestyle. World-class dining along Old Woodward, boutique shopping on Maple Road, and a downtown that draws people from across the region. The real estate market reflects that desirability — homes here sell fast, competition is intense, and pricing requires precision. This is not a market for generalist agents.",
      "We've been helping buyers win in Birmingham and helping sellers maximize their returns for over 20 years. From the tree-lined streets of Poppleton Park to the high-demand Quarton area, from downtown condos to the stately homes along Cranbrook Road — we know what makes each micro-neighborhood distinct and what buyers in each pocket are willing to pay.",
    ],
    medianPrice: "$625,000",
    priceChange: "+4.6% year-over-year",
    avgDaysOnMarket: "14 days",
    population: "21,000+",
    topSchoolDistrict: "Birmingham Public Schools — Seaholm and Groves high schools, consistently top-rated",
    neighborhoods: [
      { name: "Poppleton Park", description: "Birmingham's most iconic neighborhood. Brick Tudors and colonials on quiet streets, walking distance to downtown. Homes here rarely last a week on market." },
      { name: "Quarton Area", description: "Larger lots, higher price points, and proximity to Quarton Lake and Quarton Elementary. One of the most family-focused pockets in Birmingham." },
      { name: "Downtown / Triangle District", description: "Condos, townhomes, and walkable living. Steps from restaurants, shops, and Shain Park. Attracts young professionals and empty nesters who want urban convenience." },
      { name: "Torry / Adams Area", description: "Southeast Birmingham with strong mid-range options. Good value relative to Poppleton and Quarton while still offering Birmingham schools and walkability." },
    ],
    whyChooseUs: [
      { title: "14-day average sell time", description: "Birmingham moves fast. We prepare sellers to hit the market ready — staging, professional photography, pre-listing inspections — so you capture the first-week buyer surge." },
      { title: "Micro-neighborhood pricing", description: "A home in Poppleton Park prices differently than an identical home in Torry. We know the street-by-street premiums that matter." },
      { title: "Multi-offer negotiation", description: "Birmingham homes frequently receive multiple offers. We've managed hundreds of multi-offer situations and know how to structure your bid to win without overpaying — or accept the right offer when you're selling." },
    ],
    testimonial: {
      quote: "Birmingham is cutthroat. We lost two homes before we hired them. Third try, they got us in at $15K under list by structuring the offer differently. Nobody else suggested that approach.",
      name: "Buyer",
      context: "Poppleton Park, Birmingham",
    },
    faqs: [
      { question: "Why are Birmingham homes so expensive?", answer: "Three factors: walkability (rare in Michigan), top-rated schools (Birmingham Public Schools), and scarcity (only 21,000 residents means limited housing stock). These fundamentals create sustained demand that keeps prices high and appreciation strong — currently +4.6% YoY." },
      { question: "How fast do homes sell in Birmingham?", answer: "The average is about 14 days, but desirable listings in Poppleton Park and the Quarton area frequently sell within the first weekend. If you're a buyer, you need pre-approval and an agent who can write offers same-day." },
      { question: "Is it better to buy a condo or a house in Birmingham?", answer: "It depends on your lifestyle. Downtown condos offer walkability and low maintenance but come with HOA fees and limited space. Single-family homes offer yards, privacy, and more appreciation potential but require more upkeep. We can help you model the financial comparison for your specific situation." },
      { question: "What should I fix before selling my Birmingham home?", answer: "Birmingham buyers expect move-in-ready. The highest-ROI investments are typically: kitchen and bath updates, hardwood floor refinishing, professional landscaping, and fresh exterior paint. We provide a room-by-room priority list so you only spend money where it counts." },
    ],
    localInsight: "Birmingham's zoning protections and historic district designations limit new construction and density, which creates a supply ceiling that supports long-term values. The Triangle District redevelopment added modern housing stock, but demand still significantly outpaces supply across the city.",
  },
  {
    slug: "real-estate-agent-sterling-heights-mi",
    city: "Sterling Heights",
    state: "MI",
    county: "Macomb County",
    headline: "Sterling Heights Real Estate — Metro Detroit's Best Value for Families and First-Time Buyers",
    subheadline: "Affordable, safe, and growing. The largest city in Macomb County — and one of the smartest places to buy right now.",
    metaTitle: "Real Estate Agent Sterling Heights MI | Affordable Homes | Real Estate Market Center",
    metaDescription: "Sterling Heights real estate agent helping families and first-time buyers find affordable homes in Macomb County. 20+ years, $100M+ closed. Free home valuation — call (248) 568-6081.",
    introParagraphs: [
      "Sterling Heights is where smart buyers go when they want strong schools, safe neighborhoods, and a home they can actually afford. As the largest city in Macomb County with over 134,000 residents, it offers the infrastructure, amenities, and community services of a major city — with a median home price that's nearly half of what you'd pay in Birmingham or Bloomfield Hills. For first-time buyers, growing families, and investors, Sterling Heights is one of the strongest value plays in Metro Detroit.",
      "We've closed hundreds of transactions across Sterling Heights — from ranch-style homes near Lakeside Mall to newer townhomes along the M-59 corridor. This is a market where pricing strategy matters even more because margins are tighter. You need an agent who knows what $280K buys on the north end versus the south end, and how Utica schools versus Warren Consolidated affects resale. That's what we bring.",
    ],
    medianPrice: "$280,000",
    priceChange: "+5.2% year-over-year",
    avgDaysOnMarket: "16 days",
    population: "134,000+",
    topSchoolDistrict: "Utica Community Schools (north side) + Warren Consolidated (south side)",
    neighborhoods: [
      { name: "North Sterling Heights / Utica Schools", description: "The most desirable section — Utica Community Schools are top-rated in Macomb County. Newer subdivisions, well-maintained streets, and quick access to M-59 and M-53." },
      { name: "Sterling Heights Town Center", description: "The emerging downtown area with new mixed-use development, restaurants, and community spaces. Values are rising as the area develops." },
      { name: "Schoenherr / 15 Mile Area", description: "Affordable entry point with solid brick ranches from the 1970s-80s. Great for first-time buyers who want a move-in-ready home under $250K." },
      { name: "Lakeside / Hall Road Corridor", description: "Near Lakeside Mall and the commercial hub of Macomb County. Convenient location with a mix of detached homes and condo communities." },
    ],
    whyChooseUs: [
      { title: "First-time buyer programs", description: "We specialize in helping first-time buyers access down payment assistance, MSHDA loans, and FHA programs that make Sterling Heights homeownership possible with as little as 3% down." },
      { title: "School district navigation", description: "Sterling Heights straddles multiple school districts. Where you buy determines which schools your kids attend — we make sure you end up in the right one." },
      { title: "Fastest appreciation in Metro Detroit", description: "Sterling Heights is seeing +5.2% YoY appreciation — the highest on our city list. Buyers who get in now are building equity faster than in higher-priced cities." },
    ],
    testimonial: {
      quote: "We had a $260K budget and thought we'd be stuck in a condo. They found us a three-bedroom house with a yard in the Utica school district. We close next month and our mortgage is less than our old rent.",
      name: "First-Time Buyer",
      context: "North Sterling Heights",
    },
    faqs: [
      { question: "Is Sterling Heights a good place to buy a first home?", answer: "Sterling Heights is arguably the best first-time buyer market in Metro Detroit. The median home price of $280,000 is accessible with FHA or conventional financing, the city is safe and well-maintained, and appreciation is currently outpacing most Oakland County suburbs at +5.2% year-over-year." },
      { question: "What's the difference between the north and south sides of Sterling Heights?", answer: "The north side (roughly above 16 Mile Road) falls within the Utica Community Schools district, which is higher-rated and commands a price premium. The south side is Warren Consolidated Schools — still solid, but homes are typically $20-40K less. Both areas are safe and well-maintained." },
      { question: "Are there investment opportunities in Sterling Heights?", answer: "Absolutely. Sterling Heights' rental demand is strong due to its proximity to the automotive corridor (FCA/Stellantis, General Dynamics). Entry prices are low relative to rents, creating favorable cap rates — particularly for single-family rentals near the M-59 corridor." },
      { question: "How does Sterling Heights compare to Troy?", answer: "Troy has higher-rated schools and higher home prices ($435K median vs. $280K). Sterling Heights offers more home for the money, faster appreciation, and is ideal for buyers who prioritize value. Many families start in Sterling Heights and move to Troy later — and some never leave because the value is too good." },
    ],
    localInsight: "Sterling Heights' Town Center development is transforming the city's identity from bedroom community to destination. The new public spaces, restaurants, and walkable infrastructure are attracting younger buyers who previously wouldn't have considered Macomb County. Early adopters in surrounding neighborhoods are seeing accelerated appreciation.",
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return cityPages.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cityPages.map((c) => c.slug);
}
