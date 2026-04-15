const services = [
  {
    id: "buyers",
    title: "For Buyers",
    tagline: "Win the home you love — without overpaying.",
    points: [
      "Off-market opportunities and pre-MLS access",
      "Neighborhood-level market intelligence",
      "Negotiation strategy that saves clients $15K+ on average",
      "End-to-end guidance: inspection, lender, closing",
    ],
    cta: "Start My Home Search",
  },
  {
    id: "sellers",
    title: "For Sellers",
    tagline: "Sell faster and for more than the market average.",
    points: [
      "Free, instant home valuation — no obligation",
      "Professional photography, video, and staging",
      "Targeted digital marketing to active buyers",
      "Average listing sells 12 days faster than the local median",
    ],
    cta: "Get My Home's Value",
  },
  {
    id: "investors",
    title: "For Investors",
    tagline: "Data-driven opportunities with real ROI analysis.",
    points: [
      "Cash-flow and cap-rate modeling on every deal",
      "Access to distressed, probate, and off-market inventory",
      "1031 exchange coordination and portfolio strategy",
      "Trusted vendor network: lenders, PMs, contractors",
    ],
    cta: "Explore Investment Deals",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
            How we help
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Whatever your move, we've done it before.
          </h2>
          <p className="text-lg text-slate-600">
            Specialized expertise for every client — not a one-size-fits-all
            approach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-amber-400 hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-slate-600 mb-6">{s.tagline}</p>
              <ul className="space-y-3 mb-8">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-slate-700">
                    <svg
                      className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#lead-magnet"
                className="inline-flex items-center gap-2 text-slate-900 font-bold group-hover:text-amber-600 transition-colors"
              >
                {s.cta}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
