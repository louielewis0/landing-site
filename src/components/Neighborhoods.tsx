import { neighborhoods, company } from "@/lib/config";

export default function Neighborhoods() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">
            Where we work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            We know {company.region} block by block.
          </h2>
          <p className="text-lg text-slate-600">
            From Troy's top-rated schools to Birmingham's walkable downtown —
            we've closed deals on every kind of street.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map((n) => (
            <a
              key={n.name}
              href="#contact"
              className="group relative overflow-hidden block p-7 rounded-2xl bg-white border border-slate-100 hover:border-orange-300 hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-500/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-colors" />
              <div className="relative">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-orange-600 transition-colors">
                  {n.name}
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {n.blurb}
                </p>
                <span className="text-sm font-semibold text-slate-900 inline-flex items-center gap-1">
                  View homes
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
