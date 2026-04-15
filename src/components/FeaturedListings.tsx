import Image from "next/image";
import { getFeaturedListings, type Listing } from "@/lib/listings";
import ListingAlertForm from "./ListingAlertForm";

export default async function FeaturedListings() {
  const listings = await getFeaturedListings();

  return (
    <section id="listings" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            Featured Homes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] leading-[1.05] mb-5">
            Featured Homes in
            <br />
            <span className="gradient-text">Metro Detroit.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A handpicked selection of Metro Detroit homes for sale — including
            Troy MI real estate, Rochester Hills homes, Birmingham MI listings,
            and more. Tap any home to request details or schedule a private tour.
          </p>
        </div>

        {/* Listings grid + alert form */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Listings: 2/3 on large screens */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {listings.slice(0, 4).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>

          {/* Lead form: 1/3 sticky */}
          <div className="lg:sticky lg:top-28 h-fit">
            <ListingAlertForm />
          </div>
        </div>

        {/* Remaining listings below */}
        {listings.length > 4 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {listings.slice(4).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ListingCard({ listing: l }: { listing: Listing }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-1 transition-all duration-500">
      <a href="#contact" className="block relative aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={l.image}
          alt={`${l.address}, ${l.city}, ${l.state}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.05] transition-transform duration-[900ms]"
        />
        {l.status && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg">
            {l.status}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>

      <div className="p-6">
        <div className="text-[1.5rem] font-bold text-slate-900 tracking-[-0.02em] leading-none mb-2">
          {l.price}
        </div>
        <div className="text-[15px] text-slate-900 font-semibold mt-2">
          {l.address}
        </div>
        <div className="text-sm text-slate-500 mb-5">
          {l.city}, {l.state}{l.zip ? ` ${l.zip}` : ""}
        </div>
        <div className="flex gap-5 text-sm text-slate-700 pb-5 mb-5 border-b border-slate-100">
          <span>
            <strong className="text-slate-900">{l.beds}</strong>
            <span className="text-slate-500 ml-1">bd</span>
          </span>
          <span>
            <strong className="text-slate-900">{l.baths}</strong>
            <span className="text-slate-500 ml-1">ba</span>
          </span>
          <span>
            <strong className="text-slate-900">{l.sqft.toLocaleString()}</strong>
            <span className="text-slate-500 ml-1">sqft</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={l.detailsUrl ?? "#contact"}
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-[13px] font-semibold transition-colors"
          >
            View Details
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-white text-[13px] font-semibold transition-colors"
          >
            Schedule Tour
          </a>
        </div>
      </div>
    </article>
  );
}
