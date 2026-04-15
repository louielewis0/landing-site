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
      "Pricing strategy backed by 20+ years of local data",
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
      className="relative py-28 bg-[#0A1429] text-white overflow-hidden noise"
    >
      <div className="absolute inset-0 glow-orange opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.22em] mb-4">
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.05]">
            Specialized,
            <br />
            <span className="gradient-text">not generic.</span>
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            Every transaction has a different playbook. We bring the right one.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur border border-white/10 hover:border-orange-400/40 hover:from-white/[0.06] hover:to-white/[0.02] transition-all duration-300"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">
                {s.label}
              </div>
              <h3 className="text-[1.65rem] font-bold tracking-[-0.02em] mb-6 leading-[1.15]">
                {s.title}
              </h3>
              <ul className="space-y-3 mb-10 text-[15px] text-white/70">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed">
                    <svg
                      className="w-4 h-4 text-orange-400 flex-shrink-0 mt-[5px]"
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
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
