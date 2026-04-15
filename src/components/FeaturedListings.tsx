import Image from "next/image";
import { featuredListings } from "@/lib/config";

export default function FeaturedListings() {
  return (
    <section id="listings" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
              Featured
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] leading-[1.05]">
              Moving fast
              <br />
              <span className="gradient-text">this week.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start md:self-end inline-flex items-center gap-1.5 text-slate-900 font-semibold hover:text-orange-600 transition-colors"
          >
            Request full inventory
            <span className="transition-transform hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredListings.map((l) => (
            <div
              key={l.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_80px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <Image
                  src={l.image}
                  alt={l.address}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-[900ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg">
                  {l.status}
                </div>
              </div>
              <div className="p-7">
                <div className="text-[1.65rem] font-bold text-slate-900 tracking-[-0.02em] mb-1 leading-none">
                  {l.price}
                </div>
                <div className="text-sm text-slate-600 mb-6 mt-2">
                  {l.address} · {l.neighborhood}
                </div>
                <div className="flex gap-6 text-sm text-slate-700 mb-7 pb-6 border-b border-slate-100">
                  <span><strong className="text-slate-900">{l.beds}</strong> bd</span>
                  <span><strong className="text-slate-900">{l.baths}</strong> ba</span>
                  <span><strong className="text-slate-900">{l.sqft.toLocaleString()}</strong> sqft</span>
                </div>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors group/btn"
                >
                  Schedule a showing
                  <span className="ml-1.5 group-hover/btn:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-12">
          A small sample. Hundreds more available on request.
        </p>
      </div>
    </section>
  );
}
