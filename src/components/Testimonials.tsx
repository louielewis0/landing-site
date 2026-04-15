import { testimonials } from "@/lib/config";

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">
            Clients
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Outcomes, not promises.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5 max-w-5xl mx-auto">
          {testimonials.slice(3, 5).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="relative rounded-2xl p-7 bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-orange-200 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.08)] transition-all">
      <div className="flex gap-0.5 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className="w-4 h-4 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-slate-800 leading-relaxed mb-6 text-[15px]">
        {quote}
      </blockquote>
      <figcaption className="pt-4 border-t border-slate-100 text-sm">
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-slate-500">{role}</div>
      </figcaption>
    </figure>
  );
}
