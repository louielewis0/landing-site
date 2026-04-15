import { company } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
          {/* TODO: replace with a real team/broker photo in /public/team.jpg */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80)",
            }}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            About {company.shortName}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Local experts. Real results. No fluff.
          </h2>
          <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
            <p>
              {company.name} is a full-service brokerage built on a simple idea:
              real estate is the biggest transaction most people ever make, and
              it deserves better than a generic agent with a generic playbook.
            </p>
            <p>
              We live here. We know which streets flood, which HOAs are changing,
              and which builders cut corners. That local depth — combined with
              modern marketing and straight talk — is why our clients keep
              referring their friends, their kids, and their coworkers.
            </p>
            <p className="font-semibold text-slate-900">
              When you work with us, you get the whole team. Every time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
            >
              Book a Consultation
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold transition-colors"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
