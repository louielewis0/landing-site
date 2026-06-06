/**
 * Homepage valuation CTA — mid-page section.
 *
 * Originally embedded its own seller-lead form (4 inputs → INSERT with
 * source: "lead-magnet"). Replaced with a CTA card linking to /home-value
 * so all valuation traffic funnels through one tool and lands in /crm
 * tagged source = "home-valuation-tool". Section structure, eyebrow,
 * headline, sub-copy, bullet list, and id="lead-magnet" anchor are all
 * preserved so existing in-page navigation links (Hero CTAs, footer
 * links, etc.) that target #lead-magnet still scroll here.
 *
 * Historical leads tagged source="lead-magnet" remain in the database
 * untouched — see commit message for the optional one-line UPDATE if
 * you want to retag them.
 */
export default function LeadMagnet() {
  return (
    <section
      id="lead-magnet"
      className="relative py-32 overflow-hidden atmosphere"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div>
            <p className="eyebrow mb-5">Free · 24-hour turnaround</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-light text-bone leading-[1.04] mb-7">
              <span className="block overflow-hidden">
                <span className="block fade-up">What&rsquo;s your home</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block fade-up delay-1 italic gold-text">actually worth?</span>
              </span>
            </h2>
            <p className="text-[17px] text-bone/65 mb-10 leading-[1.7] font-light max-w-xl fade-up delay-2">
              Zestimates miss by 10% on average. Get a real valuation from a
              local broker who knows your street — not an algorithm. Detailed
              report, no cost, no obligation.
            </p>
            <ul className="space-y-3 max-w-xl fade-up delay-3">
              {[
                "Comps from the last 90 days",
                "Current neighborhood trends",
                "Upgrades worth doing (and ones that aren't)",
                "A realistic list-price range you can take to the bank",
              ].map((p) => (
                <li key={p} className="flex gap-4 text-[15px] text-bone/75">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--gold)]/40 flex items-center justify-center mt-[2px]">
                    <svg
                      className="w-3 h-3 text-[var(--gold-soft)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card — same glass treatment as the original form card, but
              routes to /home-value instead of embedding a form. */}
          <div className="relative rounded-2xl p-9 sm:p-10 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] text-center">
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

            <p className="eyebrow mb-3">Start your valuation</p>
            <h3 className="font-display text-3xl sm:text-4xl font-light text-bone tracking-tight mb-4">
              A real broker,
              <br />
              <span className="italic gold-text">in 24 hours.</span>
            </h3>
            <p className="text-[14.5px] text-bone/65 leading-relaxed font-light mb-8 max-w-sm mx-auto">
              Three quick steps. No algorithm, no instant lowball — a local Troy
              broker reviews your property and sends a real number back.
            </p>

            <a
              href="/home-value"
              className="group inline-flex items-center justify-center gap-3 w-full px-7 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-500 shadow-[0_20px_50px_-20px_rgba(200,162,76,0.45)]"
            >
              Get my free valuation
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>

            <p className="text-[11px] text-bone/40 text-center pt-5 tracking-wide">
              Private. We never share your details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
