import { neighborhoods, company } from "@/lib/config";

export default function Neighborhoods() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
            Know your market
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Homes for sale across {company.city}
          </h2>
          <p className="text-lg text-slate-600">
            From downtown lofts to family neighborhoods and waterfront estates —
            we know {company.city} block by block.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map((n) => (
            <a
              key={n.name}
              href="#contact"
              className="group block p-6 rounded-2xl bg-white border border-slate-100 hover:border-amber-400 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                {n.name}
              </h3>
              <p className="text-sm text-slate-600 mb-4">{n.blurb}</p>
              <span className="text-sm font-semibold text-slate-900 inline-flex items-center gap-1">
                View homes
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
