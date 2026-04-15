import { testimonials } from "@/lib/config";

export default function Testimonials() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            Clients
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] leading-[1.05]">
            Outcomes,
            <br />
            <span className="gradient-text">not promises.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5 max-w-5xl mx-auto">
          {testimonials.slice(3, 5).map((t) => (
            <TestimonialCard key={t.name} {...t} featured />
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
  featured,
}: {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
}) {
  return (
    <figure
      className={`group relative rounded-3xl p-8 bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 hover:border-orange-300/60 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-all duration-300 ${
        featured ? "lg:p-10" : ""
      }`}
    >
      <svg
        className="absolute top-6 right-6 w-8 h-8 text-orange-500/15"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="flex gap-0.5 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-slate-800 leading-[1.65] mb-6 text-[15.5px]">
        "{quote}"
      </blockquote>
      <figcaption className="pt-5 border-t border-slate-100 text-sm">
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-slate-500 text-[13px]">{role}</div>
      </figcaption>
    </figure>
  );
}
