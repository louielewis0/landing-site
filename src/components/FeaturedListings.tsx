import Image from "next/image";
import { featuredListings } from "@/lib/config";

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
              Featured Listings
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Homes moving fast this week
            </h2>
          </div>
          <a
            href="#contact"
            className="text-slate-900 font-bold hover:text-amber-600 transition-colors"
          >
            Request full inventory →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredListings.map((l) => (
            <div
              key={l.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <Image
                  src={l.image}
                  alt={l.address}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wide">
                  {l.status}
                </div>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {l.price}
                </div>
                <div className="text-sm text-slate-600 mb-4">
                  {l.address} · {l.neighborhood}
                </div>
                <div className="flex gap-4 text-sm text-slate-700 mb-6">
                  <span>
                    <strong>{l.beds}</strong> beds
                  </span>
                  <span>
                    <strong>{l.baths}</strong> baths
                  </span>
                  <span>
                    <strong>{l.sqft.toLocaleString()}</strong> sqft
                  </span>
                </div>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
                >
                  Schedule a Showing
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Listings shown are a small sample. Hundreds more available on request.
        </p>
      </div>
    </section>
  );
}
