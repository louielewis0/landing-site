# Real Estate SEO & AEO Playbook — Real Estate Market Center + The Mile Detroit

Adapted from a test-backed local-service SEO playbook (Nov 2026). The *rules* are
copied; the *shape* is deliberately different — our sites are real estate, not
restoration, and must not look like anyone else's network. Replace `{city}` with a
real town (Troy, Birmingham, Bloomfield Hills, Rochester Hills, …), `{county}` with
Oakland / Macomb / Wayne.

Trade translation from the source playbook:
`{service}` → "real estate agent / brokerage / home selling" · `storms/FEMA/NOAA data`
→ MLS medians, days-on-market, property-tax millage, school ratings, Census income,
building permits · `cost page` → home-value + calculator pages · `emergency what-to-do`
→ life-event guides (divorce, inherited, relocating). (The literal restoration version
of this playbook maps 1:1 onto **Prime Restoration** — keep that site separate.)

---

## Core principles (unchanged — they're laws, not design)

1. **Measure, then build.** Pull Search Console first. Build/expand pages that already
   get impressions at position ~10 or worse — don't guess.
2. **Format beats count.** "Best {service} in {city}" list pages averaged pos. 9;
   plain service-by-city pages pos. 23. We already lead with best-agent/best-brokerage
   pages — right call. Don't dilute with a thin city×service matrix.
3. **Depth + uniqueness are gates, not goals.** A page ships only if it passes a size
   floor AND an overlap check against every other page.
4. **Indexed ≠ submitted.** A page counts only when GSC reports *indexed*. Check 7 days
   after launch.
5. **Map pack runs on distance + reviews, not pages.** Your verified address and your
   reviews move the map; pages barely do.
6. **AI engines are a second search engine.** ChatGPT / Google AI Mode pull from
   directories, map listings and cost pages — plan for them on purpose. The Mile is our
   deliberate play here.
7. **Test wording head-to-head.** Never trust a score tool. Show two headline versions
   to ChatGPT and Gemini in both orders; count wins.

---

## Our five page types (one intent each, so they don't compete)

| Type | Intent | Our pattern | Priority |
|---|---|---|---|
| **"Best" list** | choosing a brokerage/agent | `/best-real-estate-agent-{city}`, `/best-real-estate-brokerages-{county}` | 1 |
| **Value / "cost"** | price research | `/what-is-my-home-worth-{city}`, `/home-value`, the calculators | 2 |
| **Life-event guide** | problem happening now | `/selling-a-house-during-divorce-michigan`, `/selling-an-inherited-house-michigan`, `/relocating-to-metro-detroit`, `/water-damage-sell-or-restore` | 3 |
| **One-city service** | hire in a town | `/{city}-real-estate-agent` | 4 |
| **Topic (luxury/commercial)** | special buyer | `/luxury-homes-in-{city}`, `/{city}-lakefront-homes` | 5 |

**URL + title rules**
- **One city per city page.** Never merge two towns. A cross-town topic (luxury,
  lakefront, divorce) gets its own page — we already do this.
- **No "near me" in a title or H1.** Google already knows the searcher's location. Use
  it once as an FAQ at most.
- **Title order: words people type → place → brand last.** ≤60 chars. **No month in the
  title** (it dates the page and forces re-writes).
- **Target towns by money, not search volume.** Highest-income towns closest to the
  Troy HQ first; big low-income towns last.
- **Every new page ≥2 internal links from already-indexed pages**, within 3 clicks of home.
- **Never delete pages to "clean up."** Fix a weak page or 301 it into a stronger one.

---

## Page specs — the depth floor (our #1 gap)

Current best-agent pages ≈ 460–500 words. The tested floor for a competitive "best"
page is **~4,000 words / 35–42 KB of visible text**. Under ~30 KB did not rank. Every
"best" and value page should hit this spec:

| Item | Minimum |
|---|---|
| Length | ~4,000 words / 35–42 KB page text (don't pad — see below) |
| Local detail | 8 named neighborhoods, subdivisions, streets or landmarks per city |
| Companies/agents listed | if a list page: 5, each with name + source link; **if we're on it, say so** |
| Dated local facts | 3 with dates + sources (a millage vote, a new development, a school boundary change, a market shift) |
| **New fact** | 1 number **no competing page has** — pull it ourselves (see Unique-data edge) |
| Headings | written as the **questions people ask** |
| Comparison table | 5+ columns |
| FAQs | 6, **different from every sibling page** |

**Rules**
- **Never pad to hit the floor.** Cut any sentence with no fact. Depth = more real local
  facts, not more adjectives.
- **Name a real author with a short bio + MI license number** (Sundus Lewis, Broker, or
  the agent who knows that town). Never invent a person.
- **FAQ rule (already shipped):** every FAQ answer names the business + phone. One
  upgrade left — **link the first "Real Estate Market Center" mention on each page to our
  Google Business Profile.** AI engines quote FAQ answers; a named, linked answer sends
  the reader to us.

---

## The uniqueness gate — our biggest structural risk

16 pages share one template. Before any page ships, compare it to every other page:

- **Jaccard similarity ≤ 0.20** (split text into 5-word shingles, measure overlap).
- **Containment ≤ 0.30** (share of the new page found in any other page).

A FAIL blocks deploy — **rewrite the shared sections, don't swap synonyms.** When two
pages share most of their text, Google ranks one and buries the other, often the wrong
one. Fix: push the *unique local substance* (per-city data, named neighborhoods, dated
events, the agent who works that town) up high, and keep only a thin shared shell.

> Action: build a shingle-overlap script in CI that scores every new/edited city page
> against all siblings and fails the deploy over the thresholds above.

---

## The unique-data edge (our moat — build this first)

We have live Realcomp MLS via `getMarketStats`. Nobody else writing "best agent in Troy"
has our numbers. Turn that into the "1 fact no competitor has" on every city page:

- Expose a **public per-city stats feed** (server route, creds stay server-side):
  median sale price, average DOM, active inventory, $1M+ luxury count — by city, cached
  and refreshed (ISR / `unstable_cache`), honest `lastmod`.
- Drop a **dated data table** on each city + value page from that feed ("Troy, as of
  {date}: median $X, {n} days on market, {k} active listings").
- Build an **interactive cost estimator per county** with the public data table under it
  (richer than a static cost article).
- The Mile re-publishes the monthly version of this (owned media) and links back to the
  matching RMC page — AI Overviews favor cost/price pages and cite the source that holds
  the number.

This single move closes the depth gap, the uniqueness gap, and the AI-citation gap at
once, because the unique fact is different for every city.

---

## Google Business Profile + reviews (the map-pack engine)

- **Map pack ranks from the verified address**, even if hidden. In the source test the
  profile hit top-3 within ~4 miles and nowhere 6.7 miles out — even with 7 pages built
  for the far city. **Pages don't win the map pack; a verified office near the town does.**
- ⚠️ **/locations caveat:** listing the Birmingham / Rochester Hills / Bloomfield Hills
  offices on a page helps *organic*, but it does **nothing** for the map pack unless each
  is a **separately verified GBP at a real, staffed address.** A real second verified
  office is the main way to win a second area. Never use a virtual office / fake address —
  Google suspends those.
- **Categories matter for AI Mode** — AI Mode reads them. Keep primary + secondary
  categories tight and accurate (real estate agency, real estate consultant, etc.).
- **List service areas by city name** — AI labels the profile with those names.
- **Edit the profile once, then leave it. Post ≤1×/day. Never delete-and-repost.**
- Keep **NAP identical** on every directory; one phone number sitewide.

**Reviews**
- Ask every closed client the **same day**, by text, with a **direct review link.**
- **Reply to every review.** Never imply someone was a client if unconfirmed.
- **Read the live count and update the site** — never inflate. (We're 5.0 / 105+.)
- Wording test worth copying: "Family real estate business since {year}" beat a bare
  "since {year}" 17–3 in ChatGPT/Gemini; a third-party award line beat a bare star
  rating (we have the TownAnswer line — good). Run our own head-to-head before adopting.

---

## AI search visibility (ChatGPT / AI Mode / AI Overviews)

- **AI picks local businesses from *other* sites more than our own.** In the source
  test the business's own site was only the 4th-most-cited source; the rest were
  comparison sites, directories and review platforms.
- **Get on the lists ChatGPT cites.** For each target town, ask ChatGPT (logged out)
  "best real estate agent in {city}" and "best brokerage in {city}," record every cited
  page, and claim/join each directory + review platform it names (Zillow, Realtor.com,
  Google, Yelp, Nextdoor, local "best of" lists). Fix gaps first.
- **Google AI Mode cites map listings, not our site** (0 site cites vs 200+ map cites in
  the test). Categories + service areas + reviews drive it.
- **AI Overviews favor price pages** — our home-value / cost / estimator pages are the
  cited source for "how much is a home worth in {city}."
- **"What to do" queries cite one strong statewide guide**, not one per city — keep the
  divorce/inherited/relocating guides statewide, deep, and singular.
- **Index in Bing** (IndexNow after every deploy — we do this). No Bing index → no
  ChatGPT-search visibility.
- **Write FAQ answers to be quoted:** answer in the first sentence, then one local fact,
  then name + phone. (We've done name+phone; add the first-sentence answer + local fact.)
- **Re-run the ChatGPT / AI-Overview check every 2 weeks** with the same question list.

---

## Deploy gates (script them — memory-based rules fail quietly)

1. **Index gate:** every indexable page has a self-referencing canonical, is in a
   sitemap, and has ≥2 internal links. A noindex page has no canonical.
2. **Sitemap speed:** sitemap returns 200 in ≤3 s; every URL in it 200 in ≤5 s and not
   noindex. **Build sitemaps as static files** (a recalculating sitemap got skipped).
3. **Honest lastmod:** update a page's `lastmod` in the same commit you change it. Never
   bump a whole section. A healthy sitemap holds many different dates.
4. **Lighthouse** (mobile, median of 3, quiet machine): perf ≥95, SEO ≥95, a11y ≥90,
   best-practices ≥90. (We're already 100/100 on a11y — hold it.)
5. **Embeds/CSP:** every new video/map/outside image needs a CSP entry, tested in a real
   browser (a curl 200 proves nothing). A missing entry once hid all videos for 10 days.

After deploy: resubmit sitemap in GSC and read back "last read"; Request Indexing for
new URLs; check index status via URL Inspection API at 7 days; ping Bing via IndexNow.

---

## Measurement cadence

| When | Check | Source |
|---|---|---|
| Daily | which page *formats* earn clicks; towns with impressions but no page | GSC API |
| Weekly | sitemaps read in last 14 days; Lighthouse on changed pages | GSC, Lighthouse |
| 7 days after launch | indexed or not, per new URL | URL Inspection API |
| Every 2 weeks | map-pack rank per town (from town center, mobile) | rank-grid tool |
| Every 2 weeks | ChatGPT / AI Overview / AI Mode mentions, same question list | logged-out checks |

Pages need ~10–14 days before a rank read means anything. Don't react sooner.

---

## Banned (these get you penalized or ignored)

- "Near me" in titles / H1s.
- Fake addresses, virtual offices, or test phone numbers on live pages.
- Invented authors, reviews, review counts, or awards.
- Publishing our own job prices/counts *as data* (use public/MLS aggregates with sources).
- Deleting and reposting GBP posts.
- Noindexing or pulling pages to "clean up" the index.
- Bumping `lastmod` on pages we didn't change.
- Padding to reach the size floor.
- Copying text, images, or layout from another site.
- **AI filler words:** delve, robust, seamless, comprehensive, cutting-edge, "look no
  further," "when it comes to." Write the plain verb and the number.

---

## Prioritized action list (close the gaps that showed up in the audit)

1. **Per-city MLS data feed + dated table** on every city/value page (the moat; closes
   depth + uniqueness + AI-citation at once). *Build the public stats route first.*
2. **Deepen the 16 city pages to spec** — 8 named neighborhoods, 3 dated local facts,
   a 5-col comparison table, 6 unique FAQs, named author + MI license. One town at a
   time; richest-income towns first.
3. **Uniqueness CI gate** — shingle-overlap script; fail deploy over Jaccard 0.20 /
   containment 0.30.
4. **Link the first brand mention per page to the GBP**; rewrite FAQ answers to lead
   with the answer sentence + one local fact (name/phone already done).
5. **Verify a real 2nd GBP office** (if staffed) to win a second map-pack area — the
   /locations page alone won't do it.
6. **Directory sweep** — run the logged-out ChatGPT "best agent in {city}" check per
   town, claim every cited directory/review platform.
7. **Static sitemap + honest lastmod + URL Inspection API** index check at 7 days.
8. **Biweekly AI-mention + map-grid tracking** on a fixed question list.
