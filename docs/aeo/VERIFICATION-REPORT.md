# VERIFICATION REPORT — /best-metro-detroit-suburbs

Built 2026-07-27, per the Corpus System's verification rule: every load-bearing
numeric claim on the page was independently sourced, and market figures were
cross-checked against a second source. No number was estimated, averaged, or
carried over from `src/lib/city-pages.ts` (whose hardcoded stats are unsourced
and undated — see "Known site debt" below).

## Method

Two independent market sources, one primary demographic source, one named
ratings source:

- **Zillow ZHVI** — pulled from Zillow Research's official public CSV
  (`City_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv`,
  files.zillowstatic.com, retrieved 2026-07-27; latest column 2026-06-30),
  matched to each city by Zillow RegionID. Live zillow.com pages returned 403;
  the CSV is the same series those pages display. One-year changes computed
  from the series itself (2025-06-30 vs 2026-06-30).
  ⚠ Adversarial finding: Google-cached snippets of Zillow city pages carry
  values 1–4.5 years stale (verified by matching each snippet to the CSV time
  series). Never cite snippet values.
- **Redfin** — city housing-market pages rendered 2026-07-27 via headless
  Chrome (Redfin blocks plain fetches); stats are "All Home Types," rolling
  three months ending May 2026. Canonical tags verified each page is the
  Michigan city. Note: the obvious-looking Redfin URL `city/17877/MI/Troy`
  resolves to Stamford, TX — Troy MI is `city/20232`.
- **U.S. Census** — data.census.gov city/township profiles (2020 Decennial
  total population, table DECENNIALPL2020.P1). QuickFacts returned 403, so no
  newer PEP estimate could be verified from a primary source; the page
  therefore quotes 2020 counts and says so.
- **Niche** — "2026 Best School Districts in Michigan" (538 districts),
  captured 2026-07-27 from Niche's own listing pages. Quoted as Niche's
  opinion, attributed, never as an official state assessment.

## Claims → verdicts

### Zillow typical home value (ZHVI), June 30 2026 [CONFIRMED — official Zillow dataset]

| City | ZHVI | 1-yr change | RegionID |
|---|---|---|---|
| Troy | $472,471 | +2.56% | 7476 |
| Rochester Hills | $480,334 | +3.60% | 54179 |
| Birmingham | $757,616 | +6.41% | 17035 |
| Bloomfield Hills | $690,654 | +4.90% | 3701 |
| West Bloomfield | $466,635 | +2.99% | 34725 |
| Sterling Heights | $315,750 | +2.42% | 47847 |
| Warren | $204,491 | +1.69% | 21159 |

### Redfin median sale price / DOM, 3 months ending May 2026 [CONFIRMED — rendered pages]

| City | Median sale | YoY | DOM | URL |
|---|---|---|---|---|
| Troy | $435,739 | −5.9% | 20 | redfin.com/city/20232/MI/Troy/housing-market |
| Rochester Hills | $434,740 | +2.3% | 15 | redfin.com/city/17662/MI/Rochester-Hills/housing-market |
| Birmingham | $817,511 | +12.8% | 20 | redfin.com/city/2248/MI/Birmingham/housing-market |
| Bloomfield Hills | $912,454 | −25.1% (16 May sales — thin) | 40 | redfin.com/city/2376/MI/Bloomfield-Hills/housing-market |
| West Bloomfield | $444,850 | +0.3% | 18 | redfin.com/neighborhood/192650/… (no standalone township city page; this is the page Redfin's own township listings link to — disclosed on-page) |
| Sterling Heights | $319,759 | +2.8% | 15 | redfin.com/city/19341/MI/Sterling-Heights/housing-market |
| Warren | $209,874 | +13.4% | 21 | redfin.com/city/20734/MI/Warren/housing-market |

### Population, 2020 Census [CONFIRMED — data.census.gov profiles]

Troy 87,294 · Rochester Hills 76,300 · Birmingham 21,813 · Bloomfield Hills
4,460 · West Bloomfield twp 65,888 · Sterling Heights 134,346 · Warren 139,387.
Per-city profile URLs: g=1600000US2680700, US2669035, US2608640, US2609180,
0600000US2612585480, US2676460, US2684000.

### School districts + Niche 2026 ranks [CONFIRMED — official sites + Niche listing data]

- Troy School District **#3**; Rochester Community Schools **#5** (serves
  Rochester, Rochester Hills, Oakland Twp per district site); Bloomfield Hills
  Schools **#7**; Birmingham Public Schools **#9**; West Bloomfield SD **#30**
  (district's About page: lies entirely within the township; parts of township
  served by other districts); Utica Community Schools **#72**.
- Sterling Heights served by Utica CS + Warren Consolidated — per
  sterlingheights.gov/1004/Schools.
- Warren: six districts per miwarren.org; **none appears in Niche's 2026 top
  225** (pages 1–9 of the 538-district list crawled 2026-07-27; Warren
  Consolidated's own profile 403'd, so an exact below-225 rank is UNVERIFIABLE
  — the page claims only "none in the top 225," which is what was verified).

## Documented disputes (kept as disputes on the page, not averaged)

1. **Troy momentum** — Zillow index +2.6% vs Redfin sale price −5.9%. Page
   shows both and explains mix-sensitivity of a 3-month median.
2. **Warren momentum** — Redfin +13.4% vs Zillow +1.7%. Page shows both and
   warns against reading the sale-price spike as appreciation.
3. **Bloomfield Hills −25.1%** — Redfin's own page notes only 16 May sales;
   quoted with the thin-sample caveat attached, never bare.

## Superlative audit (every "est" on the page, with its basis)

- "Fastest one-year growth … Zillow's index: Birmingham +6.4%" — table-derivable. ✓
- "Slowest … on that index: Warren +1.7%" — table-derivable. ✓
- "Fastest by Redfin sale price: Warren +13.4%" — stated with mix-effect caution. ✓
- "Most affordable: Warren" — lowest on both gauges. ✓
- "Tied fastest DOM: Rochester Hills & Sterling Heights, 15 days" — table-derivable. ✓
- "Smallest city: Bloomfield Hills 4,460" — table-derivable. ✓
- "#3 school district" etc. — attributed to Niche 2026 everywhere. ✓
- No claim of "best schools in Michigan," "safest," "fastest-growing city," or
  any superlative we did not have data for.

## Known site debt (out of scope for this page, flagged for follow-up)

- `src/lib/city-pages.ts` hardcodes medians/YoY/DOM with no source or date;
  several now contradict verified data (e.g. Warren "+6.1% — fastest in Metro
  Detroit" vs Zillow +1.7%; Birmingham median "$625K" vs Redfin $817.5K /
  ZHVI $757.6K). These pages should be refreshed from the tables above.
- City-page JSON-LD previously included a hardcoded `aggregateRating` 5.0/50
  with no verifiable on-page reviews — removed 2026-07-27 (structured-data
  spam risk).
- Testimonials in `city-pages.ts`/`config.ts` are unattributed; confirm they
  correspond to real clients before they're used anywhere new.

## Refresh procedure (quarterly or when Zillow/Redfin publish)

1. Re-pull the ZHVI CSV, same RegionIDs; update `zhvi`/`zhviYoY` in
   `src/lib/best-suburbs-guide.ts`.
2. Re-render the seven Redfin URLs above; update sale price/YoY/DOM and the
   data-month strings.
3. Check Niche's new ranking year; update rank strings and year labels.
4. Bump `dateModified` and the visible "last reviewed" date. Never change
   `datePublished`.
5. Re-run this report's superlative audit — a rank change can invalidate an
   "est" claim.
