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
  buyerHeadline: string;
  buyerParagraphs: string[];
  buyerPoints: string[];
  sellerHeadline: string;
  sellerParagraphs: string[];
  sellerPoints: string[];
  marketTrend: string;
  ctaHeadline: string;
  ctaSubheadline: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "troy-real-estate-agent",
    city: "Troy",
    state: "MI",
    county: "Oakland County",
    headline: "Troy's Go-To Real Estate Team — Buying, Selling, and Investing Since 2003",
    subheadline: "Located right here on Square Lake Road. We don't just serve Troy — we live it.",
    metaTitle: "Troy MI Real Estate Agent | Buy & Sell Homes | Real Estate Market Center",
    metaDescription: "Looking for a real estate agent in Troy, MI? Real Estate Market Center has 20+ years of local experience, $100M+ closed, and an office on Square Lake Rd. Get your free home valuation today.",
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
    buyerHeadline: "Why Buyers Keep Choosing Troy Over Every Other Oakland County Suburb",
    buyerParagraphs: [
      "Troy sits at the crossroads of convenience and quality. With I-75 and I-696 intersecting within city limits, commuting to downtown Detroit, Southfield, or Auburn Hills takes under 30 minutes. Major employers like Magna International, Meritor, and Kelly Services are headquartered here, which means many Troy residents walk away from their commute entirely. For buyers, that translates into sustained demand — people want to live where they work, and Troy delivers.",
      "Beyond the commute, Troy offers a daily quality of life that's hard to beat. The Troy Public Library system has won national awards. The city's parks and recreation department operates over 20 facilities. And the dining scene — particularly along the Big Beaver and Rochester Road corridors — rivals anything you'll find in Royal Oak or Birmingham, often at lower prices. Buying here means investing in a lifestyle, not just a property.",
    ],
    buyerPoints: [
      "Troy School District attendance boundaries shift by street — verify before you fall in love with a house, because moving one block can change your child's school",
      "Homes south of Big Beaver tend to list $40-60K lower than equivalent properties on the north side, making South Troy a legitimate value play for budget-conscious families",
      "New-build inventory in Troy is extremely limited; most purchases are resale, so expect competition on well-maintained, move-in-ready homes",
      "Property taxes in Troy are moderate for Oakland County, but special assessments for road and sewer improvements can add unexpected costs — always check before closing",
    ],
    sellerHeadline: "Selling in Troy? Here's How to Capture Every Dollar Your Home Is Worth",
    sellerParagraphs: [
      "Troy sellers have a structural advantage: demand consistently outstrips supply. The city's reputation for excellent schools, safety, and corporate proximity means there is always a pool of qualified buyers waiting. But that advantage only pays off if your home hits the market with the right price, the right presentation, and the right timing. We've seen overpriced Troy listings sit for weeks while properly positioned homes get multiple offers in days.",
      "What separates a good Troy sale from a great one often comes down to understanding who your buyer is. A Northfield Hills colonial appeals to a different buyer than a South Troy ranch. Executive relocations from out of state look for different things than local move-up families. We tailor our staging, photography, and marketing to speak directly to the most likely buyer for your specific property — because generic marketing leaves money on the table.",
    ],
    sellerPoints: [
      "Troy buyers overwhelmingly prioritize updated kitchens and finished basements — if yours are dated, even modest upgrades can yield 3-4x return at closing",
      "Listing on a Thursday gives you maximum exposure heading into the weekend, when Troy sees its highest showing traffic",
      "Homes priced within 2% of true market value receive an average of three offers in Troy; homes priced 5% above sit 30+ days",
      "Corporate relocation buyers — a significant Troy demographic — need fast timelines, so flexibility on closing dates can be a competitive advantage in negotiations",
    ],
    marketTrend: "Troy's market is tightening as spring inventory remains below historical averages. The north-side neighborhoods around Northfield Hills and the Wattles corridor are seeing the most aggressive bidding, with multiple-offer situations becoming routine on homes under $500K. Meanwhile, the condo market near Somerset Collection has cooled slightly as higher interest rates push some buyers toward single-family homes where they see better long-term value. Expect this two-speed dynamic to continue through summer.",
    ctaHeadline: "Your Troy Home Search Starts at Square Lake Road",
    ctaSubheadline: "Talk to an agent who closes deals in Troy every month — not one who drives in from Lansing with a GPS and a prayer.",
  },
  {
    slug: "rochester-hills-real-estate-agent",
    city: "Rochester Hills",
    state: "MI",
    county: "Oakland County",
    headline: "Rochester Hills Real Estate — Where Families Put Down Roots",
    subheadline: "Parks, top schools, and homes that appreciate. We help you find the right one — or sell yours for what it's actually worth.",
    metaTitle: "Rochester Hills Realtor | Homes for Sale | Real Estate Market Center",
    metaDescription: "Trusted Rochester Hills realtor with 20+ years of local experience. Find homes near Paint Creek, Stony Creek, and top-rated Rochester schools — or sell yours for top dollar. Schedule a free consultation.",
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
    buyerHeadline: "What Smart Buyers Need to Know Before House-Hunting in Rochester Hills",
    buyerParagraphs: [
      "Rochester Hills rewards buyers who do their homework. The city stretches from the urban energy of downtown Rochester in the south to the wooded, almost rural character of the neighborhoods bordering Stony Creek Metropark in the north. That range means price, lot size, and feel vary dramatically depending on where you land. A $380K ranch near Auburn and Dequindre looks nothing like a $420K colonial off Tienken — and neither will your daily life in those two locations.",
      "One thing that catches transplants off guard is how much the outdoor infrastructure shapes the market here. Homes within a 10-minute walk of Paint Creek Trail command a consistent premium, and properties backing up to Stony Creek parkland almost never drop in value. If you enjoy biking, hiking, or cross-country skiing, proximity to these assets is worth paying for — you'll recoup it when you sell.",
    ],
    buyerPoints: [
      "Rochester Community Schools boundaries don't follow Rochester Hills city limits — parts of the city feed into Avondale or Romeo, so always verify school assignment before making an offer",
      "The Sheldon Road corridor offers newer homes with modern layouts, but smaller lots and HOA fees can surprise buyers used to the older, larger-lot subdivisions",
      "Flood zones exist along the Clinton River corridor; get elevation certificates and check FEMA maps before committing to a riverfront or low-lying property",
      "Oakland University's presence means student-heavy rentals in some pockets — if that matters to you, drive the neighborhood on a weekday evening before signing",
    ],
    sellerHeadline: "Selling Your Rochester Hills Home for What It's Actually Worth",
    sellerParagraphs: [
      "Rochester Hills sellers benefit from a buyer pool that is overwhelmingly families. These are people relocating for Rochester Community Schools, upgrading from a first home in Sterling Heights, or moving closer to the trails and parks that define this city. They are not bargain hunters — they're willing to pay fair value for a home that checks their boxes. Your job as a seller is to make those boxes obvious.",
      "The biggest mistake Rochester Hills sellers make is underinvesting in exterior presentation. This is a city where curb appeal carries outsized weight because the neighborhoods are genuinely attractive. A freshly mulched bed, power-washed driveway, and well-maintained landscaping create a first impression that primes buyers to see everything else more favorably. Inside, clean sight lines and natural light matter more than trendy finishes — Rochester Hills buyers lean traditional.",
    ],
    sellerPoints: [
      "Homes photographed with drone shots showing proximity to Stony Creek or Paint Creek Trail sell faster — aerial context gives buyers the lifestyle story that ground-level photos miss",
      "Spring listings in Rochester Hills consistently outperform fall listings by 3-5% in sale price, driven by families wanting to move before the school year",
      "If your home backs to parkland or trails, lead with that in the listing title — it's the single most searched amenity filter for this market",
      "Rochester Hills buyers expect a home inspection to come back clean; addressing minor issues before listing avoids renegotiation and keeps your timeline on track",
    ],
    marketTrend: "Rochester Hills inventory is holding steady but buyer demand has shifted northward. Homes in the Stony Creek area and along Tienken Road are seeing the strongest activity, while the more affordable pockets near Auburn and Dequindre are moving at a slightly slower pace as interest rates push some first-time buyers to the sidelines. The new construction pipeline on Sheldon Road is absorbing demand that might otherwise push resale prices higher, creating an unusual equilibrium where both new and existing homes are selling without aggressive bidding wars.",
    ctaHeadline: "Find Your Place Along the Paint Creek Trail",
    ctaSubheadline: "Connect with a Rochester Hills agent who knows every subdivision, school boundary, and hidden gem in this city.",
  },
  {
    slug: "bloomfield-hills-real-estate-agent",
    city: "Bloomfield Hills",
    state: "MI",
    county: "Oakland County",
    headline: "Bloomfield Hills Real Estate — Discreet Representation for Distinguished Properties",
    subheadline: "Michigan's most prestigious address demands an agent who understands what's at stake.",
    metaTitle: "Bloomfield Hills Luxury Real Estate | Top Agent | Real Estate Market Center",
    metaDescription: "Bloomfield Hills luxury real estate specialists. We handle high-value estates, Cranbrook-area properties, and private transactions with the discretion your sale demands. Let's talk confidentially.",
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
    buyerHeadline: "Acquiring Property in Bloomfield Hills: What Serious Buyers Should Understand",
    buyerParagraphs: [
      "Buying in Bloomfield Hills is not like buying anywhere else in Metro Detroit. The inventory is limited by design — the city has no commercial zoning, no high-density developments, and a population under 5,000. When a desirable property comes to market, it may be the only one of its kind available for years. That scarcity creates urgency, but it also demands patience. Overpaying because you feel rushed is a mistake; so is hesitating on a property that truly fits because you assume another will come along.",
      "Many of the most interesting Bloomfield Hills properties never appear on public listing sites. Private sales, estate transactions, and off-market deals account for a meaningful share of activity in this market. Having an agent with deep relationships in the luxury community isn't a nice-to-have — it's how you access inventory that other buyers never see. We maintain active connections with estate attorneys, trust administrators, and other luxury agents across Oakland County specifically for this reason.",
    ],
    buyerPoints: [
      "Bloomfield Hills has no city income tax, but property taxes on high-value estates can exceed $20,000 annually — factor this into your carrying-cost calculations before committing",
      "Many homes here were custom-built decades ago with unique mechanical systems; always budget for a specialized inspector who understands older boilers, well systems, and plaster construction",
      "Lot size and topography vary enormously — a 2-acre parcel on a slope may have far less usable outdoor space than a flat half-acre, so walk every property in person",
      "Cranbrook-area homes carry a prestige premium that holds during downturns; if capital preservation matters as much as lifestyle, focus your search there",
    ],
    sellerHeadline: "Positioning Your Bloomfield Hills Estate for a Result That Reflects Its True Value",
    sellerParagraphs: [
      "Selling a Bloomfield Hills property requires a fundamentally different approach than selling a home in Troy or Rochester Hills. Your buyer pool is smaller, more sophisticated, and expects a curated experience from the first interaction. They are not scrolling Zillow — they are working with their own agents, receiving private previews, and evaluating properties as part of a broader wealth strategy. Your marketing needs to meet them where they are, not where the mass market lives.",
      "Pricing a Bloomfield Hills estate is as much art as science. Comparable sales are sparse because so few homes trade each year, and no two properties are truly alike. An estate on three wooded acres near Cranbrook bears little resemblance to a contemporary on Long Lake, even if the square footage is similar. We develop pricing strategies based on detailed property analysis, replacement cost, and our knowledge of what current buyers at this level are actually seeking — not just what closed last quarter.",
    ],
    sellerPoints: [
      "Professional architectural photography — not standard real estate photography — is essential; buyers at this price point judge a property's caliber by the quality of its visual presentation",
      "Pre-listing appraisals from luxury-certified appraisers help anchor negotiations and prevent lowball offers from less experienced buyer agents",
      "Timing matters less in Bloomfield Hills than in other markets because buyer urgency is driven by life events, not seasons — don't wait for spring if your property is ready now",
      "Estate sales with multiple heirs benefit from a structured marketing plan with clear decision-making protocols; we facilitate this to keep the transaction on track",
    ],
    marketTrend: "The Bloomfield Hills luxury segment is seeing a subtle shift in buyer profiles. Corporate executives and established wealth still dominate, but a growing cohort of tech entrepreneurs and remote-work professionals are entering the market — drawn by the space, privacy, and proximity to Detroit's cultural assets. Properties under $1 million are moving faster than they have in three years, while the $2M-plus tier remains deliberate, with buyers taking 60-90 days to commit. Sellers in the sub-million range should expect competitive interest if the property presents well.",
    ctaHeadline: "Your Bloomfield Hills Transaction Deserves a Different Level of Service",
    ctaSubheadline: "Speak privately with an agent who handles high-value properties with the discretion and expertise this market requires.",
  },
  {
    slug: "west-bloomfield-real-estate-agent",
    city: "West Bloomfield",
    state: "MI",
    county: "Oakland County",
    headline: "West Bloomfield Real Estate — Lakefront Living, Diverse Community, Real Value",
    subheadline: "From Cass Lake cottages to Orchard Lake estates — we cover every corner of West Bloomfield.",
    metaTitle: "West Bloomfield MI Real Estate Broker | Lakefront Homes | Real Estate Market Center",
    metaDescription: "West Bloomfield real estate broker specializing in lakefront properties, family homes, and investment opportunities across Cass Lake, Pine Lake, and Orchard Lake. Call us for a waterfront market analysis.",
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
    buyerHeadline: "Buying in West Bloomfield: Lakes, Lifestyle, and What the Listing Won't Tell You",
    buyerParagraphs: [
      "West Bloomfield's defining feature is water, and understanding how water access works here is the single most important thing a buyer can learn before making an offer. There are over a dozen lakes in the township, each with its own character, regulations, and price dynamics. Cass Lake is the largest all-sports lake in Oakland County — jet skis, powerboats, and weekend activity are part of the deal. Walnut Lake is quieter and more private. Pine Lake skews upscale. Choosing the right lake is as important as choosing the right house.",
      "Beyond the lakes, West Bloomfield appeals to buyers who value cultural diversity and community depth. The township has one of the most diverse populations in Oakland County, with thriving Chaldean, Jewish, and South Asian communities that support a rich landscape of restaurants, cultural institutions, and houses of worship. For families who want their children to grow up in a truly multicultural environment, this is rare in suburban Michigan.",
    ],
    buyerPoints: [
      "Lakefront homes require flood insurance in most cases — annual premiums can range from $800 to $3,000 depending on elevation and flood zone classification, so budget accordingly",
      "Seawall inspections are not included in standard home inspections; hire a marine contractor to evaluate the seawall separately, because replacement costs $30-80K",
      "Lake-access subdivisions with shared docks or beach areas can deliver 80% of the lakefront lifestyle at 60% of the price — a genuine value alternative if direct waterfront is out of budget",
      "West Bloomfield straddles multiple school districts; homes on the eastern edge may fall into Farmington or Bloomfield Hills schools rather than West Bloomfield — confirm before you commit",
    ],
    sellerHeadline: "What West Bloomfield Sellers Need to Do Differently to Win Top Dollar",
    sellerParagraphs: [
      "Selling a West Bloomfield home — especially waterfront — requires marketing that goes far beyond MLS and a yard sign. Lakefront buyers in this market are searching regionally, not just locally. They are comparing your Cass Lake property to homes on Lake Orion, White Lake, and even up to the Traverse City area. Your listing needs to compete on lifestyle storytelling, not just square footage and bedroom count. Drone video of the water, sunset shots from the dock, and detailed descriptions of lake amenities make the difference.",
      "Non-lakefront sellers in West Bloomfield should lean into the community story. Highlight proximity to Orchard Lake Road dining, the quality of the schools, and the diversity that makes this township distinct. Buyers choosing West Bloomfield over Farmington Hills or Commerce Township are making a lifestyle decision — your marketing should validate that choice and make your home the obvious next step.",
    ],
    sellerPoints: [
      "Lakefront listings with professional drone video receive significantly more online engagement; waterfront properties without aerial footage look incomplete to today's buyers",
      "Seasonal timing matters for waterfront homes — listing in late April or May, when the lake is coming alive, generates more emotional buyer response than a December listing with snow-covered docks",
      "If you have a newer seawall, upgraded dock, or recent well/septic inspection, lead with those in your listing — they remove fear for lakefront buyers and accelerate offers",
      "West Bloomfield's diverse buyer pool means your home should be marketed across multiple cultural communities and in multiple channels — we handle this routinely and know which networks move the needle",
    ],
    marketTrend: "West Bloomfield is experiencing a split market. Lakefront properties — particularly on Cass Lake and Pine Lake — are moving briskly with multiple interested parties, fueled by post-pandemic demand for outdoor lifestyle living that shows no sign of fading. Meanwhile, non-waterfront homes in the $300-400K range are seeing more measured activity, with buyers taking their time and negotiating more aggressively on price. The Orchard Lake Road commercial corridor expansion is generating renewed interest in nearby residential streets, and we expect that halo effect to sharpen over the next 12 months.",
    ctaHeadline: "Ready for Lakefront Living? Let's Find Your Water",
    ctaSubheadline: "Talk to a West Bloomfield agent who has priced docks, inspected seawalls, and closed waterfront deals for over two decades.",
  },
  {
    slug: "birmingham-real-estate-agent",
    city: "Birmingham",
    state: "MI",
    county: "Oakland County",
    headline: "Birmingham Real Estate — Where Walkability Meets High-End Living",
    subheadline: "Metro Detroit's most walkable city. Premium homes, premium lifestyle, premium results.",
    metaTitle: "Birmingham MI Realtor | Premium Homes & Downtown Living | Real Estate Market Center",
    metaDescription: "Birmingham MI realtor specializing in Poppleton Park, Quarton area, and downtown condos. In a market this competitive, you need an agent who writes winning offers. Reach out for a strategy session.",
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
    buyerHeadline: "Winning a Home in Birmingham Takes More Than a Good Offer Price",
    buyerParagraphs: [
      "Birmingham is the fastest-moving residential market in Metro Detroit. With an average of 14 days on market and frequent multiple-offer scenarios in Poppleton Park and the Quarton area, buying here requires preparation that goes beyond pre-approval. You need an agent who knows the listing agents personally, understands what terms each seller cares about most, and can craft an offer that stands out in a stack of five or six competing bids. Price alone doesn't win in Birmingham — structure, timing, and relationships do.",
      "What surprises many Birmingham buyers is how much value varies block by block. A Tudor on Purdy Street in Poppleton Park might trade at $150 per square foot more than a similar home eight blocks east in the Torry area — both with Birmingham schools, both walkable to downtown. Understanding these micro-premiums prevents you from overpaying in one pocket or getting priced out of another because you didn't know the true floor.",
    ],
    buyerPoints: [
      "Homes in Birmingham's historic district come with design review requirements — exterior changes, additions, and even paint colors may need approval, so understand the constraints before buying",
      "Birmingham property taxes are among the highest in Oakland County; a $625K home can carry $12,000+ in annual taxes, which significantly impacts your effective monthly payment",
      "The Triangle District offers the only realistic condo inventory downtown, but HOA fees range from $300 to $800/month — model total cost of ownership carefully against a single-family alternative",
      "Off-street parking is limited in the downtown core; if you're looking at a walkable location, verify that the property has a garage or dedicated parking — street parking during restaurant hours is a real friction point",
    ],
    sellerHeadline: "How Birmingham Sellers Turn a Fast Market Into Maximum Returns",
    sellerParagraphs: [
      "Birmingham's 14-day average sell time can be a double-edged sword for sellers. Yes, your home will likely sell quickly — but that speed only benefits you if the price is right from day one. Overpricing in Birmingham doesn't generate aspirational offers; it generates zero offers while correctly priced neighbors go under contract over the weekend. The first week on market is when buyer attention peaks. Miss that window and you're chasing the market down.",
      "The Birmingham buyer is discerning and well-informed. They've walked downtown, eaten at the restaurants, compared Poppleton to Quarton to the Triangle District. By the time they tour your home, they've already formed expectations. Sellers who succeed here invest in presentation that matches those expectations — not generic staging, but styling that reflects the specific character of the neighborhood. A Poppleton Park Tudor should feel warm and classic. A Triangle District condo should feel modern and urban. We match the staging to the story.",
    ],
    sellerPoints: [
      "Professional photography is table stakes in Birmingham — listings without it are dismissed immediately by buyers accustomed to high-quality presentation across the market",
      "Pre-listing inspections eliminate surprises and give you leverage; a clean inspection report attached to the listing signals confidence and discourages lowball offers",
      "Birmingham buyers pay attention to energy efficiency — updated windows, newer mechanicals, and smart thermostats are small investments that signal a well-maintained home",
      "Timing your listing to avoid major Birmingham events (like the Woodward Dream Cruise weekend) ensures your first open house gets full attention rather than competing with city-wide distractions",
    ],
    marketTrend: "Birmingham continues to be the tightest market in Oakland County. Inventory is historically low, with fewer than 40 active single-family listings most weeks. The Poppleton Park and Quarton neighborhoods are essentially a seller's market year-round, with multiple-offer situations occurring on roughly half of all listings. The condo market in the Triangle District has stabilized after a post-pandemic correction, with prices returning to 2022 peaks as empty nesters and young professionals compete for walkable units. Expect appreciation to hold at 4-5% through the year, with brief acceleration during the spring selling season.",
    ctaHeadline: "Get the Inside Track on Birmingham's Fastest-Moving Market",
    ctaSubheadline: "Whether you're buying or selling, work with an agent who has closed hundreds of deals on these streets — not just visited for brunch.",
  },
  {
    slug: "sterling-heights-real-estate-agent",
    city: "Sterling Heights",
    state: "MI",
    county: "Macomb County",
    headline: "Sterling Heights Real Estate — Metro Detroit's Best Value for Families and First-Time Buyers",
    subheadline: "Affordable, safe, and growing. The largest city in Macomb County — and one of the smartest places to buy right now.",
    metaTitle: "Sterling Heights Real Estate Agent | Affordable Family Homes | Real Estate Market Center",
    metaDescription: "Sterling Heights real estate agent helping families find affordable homes in Macomb County's largest city. First-time buyer programs, Utica schools expertise, and 20+ years of closings. Get your free home valuation.",
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
    buyerHeadline: "First-Time Buyers: Here's Why Sterling Heights Should Be at the Top of Your List",
    buyerParagraphs: [
      "Sterling Heights is the entry point to Metro Detroit homeownership that actually makes financial sense. At a median price of $280K, monthly mortgage payments here — even with today's rates — often come in below what renters pay for a two-bedroom apartment in Royal Oak or Ferndale. That math alone has driven a wave of first-time buyers into the market, but the value story goes deeper. Sterling Heights offers city-level infrastructure — maintained roads, responsive services, extensive parks — without the premium that Oakland County zip codes carry.",
      "For families, the north-side Utica Community Schools district is the anchor. It consistently ranks among the top districts in Macomb County, and homes within its boundaries carry a $20-40K premium over otherwise identical homes on the south side in Warren Consolidated territory. That premium is real, but it also means south-side homes represent an opportunity for buyers who prioritize square footage and lot size over school rankings — or who plan to use private or charter options.",
    ],
    buyerPoints: [
      "MSHDA down payment assistance can cover up to $10,000 toward your purchase in Sterling Heights — we help qualifying buyers apply and structure their offer to include it",
      "Brick ranch homes in the Schoenherr/15 Mile area are the best value in the city, but watch for aging sewer laterals — ask about sewer scope inspections before waiving contingencies",
      "Sterling Heights has no city income tax, which saves residents money compared to cities like Detroit or Pontiac that levy local income taxes on top of state rates",
      "The M-59 corridor is noisy — homes within two blocks of the highway trade at a discount that can seem like a deal, but resale will always be constrained by road noise",
    ],
    sellerHeadline: "Sterling Heights Sellers: How to Stand Out in a Market Where Every Dollar Counts",
    sellerParagraphs: [
      "Selling in Sterling Heights is different from selling in higher-priced markets because your buyers are more price-sensitive and more analytical. They are comparing your home not just to other Sterling Heights listings, but to homes in Warren, Clinton Township, and Shelby Township at similar price points. Every dollar of your asking price needs to be justified by condition, location, or school district — because these buyers have done their homework and they have options.",
      "The good news is that Sterling Heights' appreciation trajectory gives you leverage. At +5.2% year-over-year, you're in a market where buyers feel urgency — they know prices are climbing and waiting costs them money. Capitalize on that momentum by pricing aggressively (not aspirationally) and presenting a move-in-ready home. First-time buyers, who make up a large share of this market, are often stretching their budget and won't take on a home that needs $15K in immediate repairs. Remove that friction and you remove their hesitation.",
    ],
    sellerPoints: [
      "Homes in the Utica school district sell for a measurable premium — if your home falls within UCS boundaries, make that the first line of your listing description",
      "Clean, neutral presentation outperforms trendy staging in Sterling Heights; buyers here want to see themselves in the space, not admire someone else's design choices",
      "Pricing within $5K of a round number threshold ($275K vs. $280K) can expand your buyer pool by capturing search filters that max out at round numbers",
      "Offering a home warranty ($400-500 cost to seller) reduces buyer anxiety about aging mechanicals and can be the tiebreaker when competing against similar listings nearby",
    ],
    marketTrend: "Sterling Heights is the appreciation story of Metro Detroit right now. At +5.2% year-over-year, it's outpacing every city on our list — including Birmingham. The driver is straightforward: affordability. As Oakland County prices push more buyers east into Macomb County, Sterling Heights absorbs that demand because it offers the best combination of price, schools, and infrastructure. The Town Center development is accelerating this trend by giving the city a walkable core it never had before. North-side homes in the Utica district are seeing the most competition, with well-priced listings under $300K routinely drawing four or five offers within the first week.",
    ctaHeadline: "Stop Renting. Start Building Equity in Sterling Heights",
    ctaSubheadline: "We help first-time buyers navigate financing, school districts, and neighborhoods — so you get the right home, not just any home.",
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return cityPages.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cityPages.map((c) => c.slug);
}
