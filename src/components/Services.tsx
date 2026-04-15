const services = [
  {
    id: "buyers",
    label: "Buyers",
    title: "Get the home. Not the stress.",
    points: [
      "Pre-MLS access to listings before they go public",
      "Block-by-block insight on pricing, schools, and resale",
      "Sharp negotiation on contingencies, credits, and price",
      "Vetted lenders, inspectors, and attorneys on call",
    ],
    cta: "Start my search",
  },
  {
    id: "sellers",
    label: "Sellers",
    title: "Maximize the number on the check.",
    points: [
      "Free, no-obligation home valuation",
      "Professional photography, video, and staging — at no extra cost",
      "Targeted campaigns that reach active, qualified buyers",
      "Proven pricing strategy backed by 20+ years of local data",
    ],
    cta: "Get my home's value",
  },
  {
    id: "investors",
    label: "Investors",
    title: "Real numbers. Real returns.",
    points: [
      "Cash-flow and cap-rate modeling on every deal",
      "Off-market, distressed, and 1031 opportunities",
      "Portfolio strategy, not one-off transactions",
      "Trusted network: lenders, PMs, contractors",
    ],
    cta: "See active deals",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-[#0B1733] text-white overflow-hidden"
    >
      <div className="absolute inset-0 glow-orange opacity-20 -z-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-3">
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Specialized, not generic.
          </h2>
          <p className="text-lg text-white/70">
            Every transaction has a different playbook. We bring the right one.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative rounded-2xl p-8 bg-white/[0.03] backdrop-blur border border-white/10 hover:border-orange-400/50 hover:bg-white/[0.06] transition-all"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-5">
                {s.label}
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-5 leading-tight">
                {s.title}
              </h3>
              <ul className="space-y-2.5 mb-8 text-sm text-white/75">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed">
                    <svg
                      className="w-4 h-4 text-orange-400 flex-shrink-0 mt-[3px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#lead-magnet"
                className="inline-flex items-center gap-1.5 text-white font-semibold text-sm group-hover:text-orange-300 transition-colors"
              >
                {s.cta}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
