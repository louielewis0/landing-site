# LOCAL AEO PLAYBOOK — ranking REMC for "best real estate brokerage near me" in Google AI Mode

Built 2026-07-27 under the Corpus System's rules: every prescriptive claim
carries a quote and source; sources are trust-tiered **by incentive**; where
evidence conflicts, both positions are shown; gaps are stated, never filled.

Research base: (a) Google's own documentation — **primary**, quotes verified
character-for-character against raw HTML on 2026-07-27; (b) vendor citation
studies — **low trust** (every large-n dataset comes from a company selling
visibility software; mechanics usable, efficacy framing discounted); (c) a
same-day audit of REMC's actual footprint.

---

## 0. The honest ceiling (read first)

Google, verbatim: *"There's no way to request or pay for a better local
ranking on Google."* and *"Just because a page meets all requirements, best
practices, and complies with the policies, doesn't mean that Google will
crawl, index, or serve its content."*
— support.google.com/business/answer/7091; developers.google.com/search/docs/appearance/ai-features

Nobody can guarantee the top slot, and results vary by the searcher's exact
location ("distance" is a core factor). What we can do is fix the fact that
REMC is currently **absent from every surface** this answer is assembled from.

## 1. How Google AI builds a "best brokerages near me" answer

1. **Google cites itself first for local intent.** AI Mode's most-cited domain
   is google.com, driven substantially by **Business Profile panels** rendered
   inline for local-intent queries — real estate named among the strongest
   verticals (Profound 32M-citation dataset via Search Engine Land, Jul 2026;
   SE Ranking 1.3M-citation snapshot, Feb 2026 — both **low trust**/vendor,
   but converging, and consistent with Google's primary guidance to "ensure
   your … Business Profile information is up-to-date").
2. **Pure local queries often skip the AI essay entirely**: in a 540-query
   manual study, local packs appeared 93% of the time vs AI Overviews 15%
   (Whitespark, May 2025, **low trust**, dated). Either way, the same asset
   wins: the Business Profile.
3. **When AI does write an answer, ~60% of citations are third-party
   publishers** — Yelp, directory "best of" lists, local press (same study).
   Practitioner consensus ranks "presence on expert-curated lists" the #1 AI
   visibility factor (Whitespark LSRF 2026 — **opinion survey**, n=47, not
   measurement).
4. **Google's stated local ranking factors** (primary, verbatim): *"Local
   results are mainly based on relevance, distance, and popularity."* with
   prominence *"based on info like how many websites link to your business and
   how many reviews you have. More reviews and positive ratings can help your
   business's local ranking."* — support.google.com/business/answer/7091

## 2. REMC's current state (audited 2026-07-27)

- **Absent from all top results** for "best real estate brokerage / realtor /
  agents Troy MI" — confirmed not on Expertise.com's 11-agent Troy list;
  ThreeBestRated has no Troy page at all (nearest: Sterling Heights).
- **No brokerage-level profiles**: Yelp and Zillow show only agent pages
  (Sundus Lewis, Rana Yalda); no Realtor.com presence surfaced.
- **NAP conflicts in circulation**: ZIP resolved — owner confirmed **48085**
  on 2026-07-27; the site's schema had been publishing 48098 (wrong) and was
  corrected same day in layout.tsx, [slug]/page.tsx, and config.ts. Remaining:
  legacy office "1977 E Wattles Rd Ste C" still cited (FastExpert "additional
  office", Zillow agent profile); four business-name variants; dead domain
  marketcenterteam.com still indexed under an old name.
- **Google Business Profile: state unknown** (automated viewing blocked) —
  first thing to check by hand.

## 3. Prioritized actions

### P0 — the Business Profile (this is most of the battle)

1. ~~Confirm the correct ZIP~~ **DONE 2026-07-27: correct ZIP is 48085**; the
   site's schema/footer were wrong and have been fixed. Canonical NAP for
   every surface: "Real Estate Market Center, 2032 E Square Lake Rd, Suite
   400A, Troy, MI 48085, (248) 568-6081" — make GBP and all directories match
   this string exactly.
2. **Claim/verify a Business Profile for "Real Estate Market Center"** as the
   brokerage entity (not only agent profiles). Google, verbatim: *"Verify your
   business: This tells Google that you're authorized to represent the
   business, so it's more likely to show up in search results."*
3. **Complete it exhaustively** — primary category (Real estate agency),
   services, service areas, hours, photos/videos, website →
   marketcenterrealty.com. Google, verbatim: *"Businesses with complete and
   accurate info are more likely to show up in local search results."*
4. **Respond to every review.** Google, verbatim: *"Positive reviews and
   helpful replies can help your business stand out."* Correlational data
   (SearchAtlas, low trust) also puts review quality/responsiveness above raw
   volume for AI citations.

### P0 — review-funnel compliance fix (protects everything else)

Google's policy, verbatim: merchants may not *"selectively solicit positive
reviews from customers"* and *"nor should they request that specific content
be included"* (support.google.com/contributionpolicy/answer/7400114).

The site's current review flow (`src/lib/review-generator.ts`) drafts
ready-made 5-star review text for clients to choose from, inside a 5-star-only
path. That is squarely "requesting specific content" and adjacent to selective
solicitation — a profile-suspension / review-removal risk aimed at the exact
asset this plan depends on. **Fix: ask every client for a review in their own
words (open text, no drafts, no star-gating), steady cadence.** Consumer
survey data (BrightLocal 2026, low trust) says recency matters to readers —
74% want reviews from the last 3 months — so a slow steady stream beats a
burst.

### P1 — get onto the surfaces AI actually cites

5. **Brokerage-level profiles**: create/claim Yelp business page, Zillow
   brokerage profile, Realtor.com office profile, and fix the FastExpert
   listing's NAP. Basis: local AI citations are dominated by GBP + directories
   (multiple vendor datasets, low trust, converging).
6. **Expert-curated lists**: pursue inclusion on Expertise.com (Troy real
   estate agents), U.S. News agent directory, ThreeBestRated (request a Troy
   category), and any Detroit-area press "best of" features. Basis:
   ~60% third-party citation share in local AI answers (Whitespark, low
   trust) + LSRF #1 opinion factor. No measurement study validates this yet —
   stated as the field's belief, not proven causation.
7. **Retire stale entities**: get the dead marketcenterteam.com de-indexed
   (or 301 it to marketcenterrealty.com if the domain can be recovered) and
   correct the legacy Wattles Rd citations.

### P2 — website's supporting role

8. Keep doing what the site now does: unique, sourced local content (the
   suburbs guide), clean schema, consistent NAP. Google, verbatim: *"There are
   no additional requirements to appear in AI Overviews or AI Mode, nor other
   special optimizations necessary."*
9. **Do not mass-generate city/"best brokerage" pages.** Google's spam
   policy, verbatim: scaled content abuse = *"many pages are generated for the
   primary purpose of manipulating search rankings and not helping users"*;
   doorway abuse = pages *"created to rank for specific, similar search
   queries."* Seven hand-researched city pages: fine. Fifty templated ones:
   the failure mode.
10. A self-published "why we're the best brokerage" page is **low-trust by
    incentive** — the same logic this playbook uses on vendors, Google's
    systems apply to you. Third-party proof (lists, reviews, press) is the
    lever; self-assertion isn't.

## 4. DEFAULT OVERRIDES — never contradict with generic priors

1. **Schema markup is hygiene, not a ranking lever.** Google: *"There's also
   no special schema.org structured data that you need to add."* + Ahrefs
   controlled study (1,885 pages vs ~4,000 controls, May 2026 — the closest
   thing to a primary source in this field): no citation uplift on any AI
   platform.
2. **The Business Profile outranks the website for this query class.** Keep
   site work in proportion.
3. **Review authenticity beats review volume.** Never gate by stars, never
   supply wording, never incentivize — policy risk concentrates exactly where
   the value is. The "25+ reviews at 4.3+" floor repeated by agencies traces
   to no disclosed study (verified NOT FOUND) — treat as lore.
4. **Never put self-serving ratings in structured data.** Google: pages where
   *"the entity that's being reviewed controls the reviews about itself"* are
   *"ineligible for star review feature."* (The 5.0/50 markup already removed
   from the site on 2026-07-27 violated this.)
5. **No one can promise the top AI slot** — treat any vendor guarantee as the
   marketing failure mode this document's method exists to filter.

## 5. Documented gaps (stated, not filled)

- No fully independent (zero-commercial-tie) measurement of AI Mode local
  citation behavior exists; all large-n data is vendor-collected.
- GBP's exact current weight is moving fast (its share of Google
  self-citations went 97.9% → 36.1% between Jun 2025 and Feb 2026 as organic
  links were added). Re-check mechanics quarterly; snapshots older than ~2
  quarters may misdescribe the surface.
- REMC's own GBP state (exists? rating? reviews?) — unobservable by tooling;
  owner to check and report back.
- Whether curated-list presence *causes* AI citation (vs correlates) —
  unproven either way.

## 6. Measurement loop

Monthly, from a Troy-area device (results are location-dependent): search
"best real estate brokerage near me" and "best real estate brokerage Troy MI"
in Google AI Mode; record whether REMC's Business Profile panel or any citing
list appears. Track GBP metrics (views, calls, direction requests) in the
Business Profile dashboard. Re-audit citations (section 2) quarterly alongside
the suburbs-guide data refresh.
