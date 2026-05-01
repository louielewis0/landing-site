import {
  Home,
  TrendingUp,
  UserCheck,
  Crown,
  Building2,
  BarChart3,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Reveal from "./motion/Reveal";

type Service = {
  id: string;
  label: string;
  title: string;
  blurb: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const services: Service[] = [
  {
    id: "buy",
    label: "Buyers",
    title: "Buy a Home in Michigan",
    blurb: "Find the right home, at the right price, without compromising.",
    Icon: Home,
  },
  {
    id: "sell",
    label: "Sellers",
    title: "Sell Your Home Fast",
    blurb: "Sell at or above asking with our proven pricing and marketing system.",
    Icon: TrendingUp,
  },
  {
    id: "first-time",
    label: "First-Time",
    title: "First-Time Home Buyers",
    blurb: "Step-by-step guidance plus access to down-payment assistance programs.",
    Icon: UserCheck,
  },
  {
    id: "luxury",
    label: "Luxury",
    title: "Luxury Real Estate",
    blurb: "Discreet, high-touch representation for premium Metro Detroit properties.",
    Icon: Crown,
  },
  {
    id: "commercial",
    label: "Commercial",
    title: "Commercial Properties",
    blurb: "Offices, retail, and mixed-use representation across Metro Detroit.",
    Icon: Building2,
  },
  {
    id: "investment",
    label: "Investors",
    title: "Investment Consulting",
    blurb: "Cash-flow, cap-rate, and 1031 strategy for serious investors.",
    Icon: BarChart3,
  },
  {
    id: "management",
    label: "Management",
    title: "Property Management",
    blurb: "Full-service management that protects your investment and your tenants.",
    Icon: ShieldCheck,
  },
  {
    id: "relocation",
    label: "Relocation",
    title: "Relocation Services",
    blurb: "Move in or out of Metro Detroit with zero stress — we handle every detail.",
    Icon: MapPin,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-32 bg-ink-2 text-bone overflow-hidden"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(200,162,76,0.13), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(140,74,31,0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <Reveal>
            <p className="eyebrow mb-5">What we do</p>
          </Reveal>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] mb-6 text-bone">
            <span className="block overflow-hidden">
              <Reveal variant="mask" className="block">Full-service real estate,</Reveal>
            </span>
            <span className="block overflow-hidden">
              <Reveal variant="mask" delay={1} className="block italic gold-text">at the highest level.</Reveal>
            </span>
          </h2>
          <Reveal delay={2}>
            <p className="text-[17px] text-bone/55 leading-relaxed font-light max-w-2xl">
              From first-time buyers to seasoned investors — one team, every need.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
          ))}
        </div>

        <Reveal delay={2} className="mt-16 text-center">
          <a
            href="#lead-magnet"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
          >
            Request your valuation
            <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }: { service: Service; delay: 1 | 2 | 3 | 4 }) {
  const { Icon } = service;
  return (
    <Reveal
      delay={delay}
      as="a"
      className="group relative flex flex-col h-full rounded-2xl p-7 border border-bone/10 bg-gradient-to-b from-bone/[0.03] to-transparent hover:border-[var(--gold)]/40 hover:from-bone/[0.06] transition-all duration-700"
    >
      <a href="#lead-magnet" className="absolute inset-0 z-10" aria-label={service.title} />
      <div className="w-11 h-11 rounded-full border border-[var(--gold)]/30 flex items-center justify-center mb-6 text-[var(--gold-soft)] group-hover:border-[var(--gold)]/60 transition-colors duration-500">
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>

      <h3 className="font-display text-[1.5rem] font-light tracking-tight mb-3 leading-tight text-bone">
        {service.title}
      </h3>

      <p className="text-[13.5px] text-bone/55 leading-relaxed mb-7 flex-1 font-light">
        {service.blurb}
      </p>

      <span className="relative inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-[var(--gold-soft)] group-hover:text-[var(--gold)] transition-colors duration-500 mt-auto">
        Learn more
        <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1.5" />
      </span>
    </Reveal>
  );
}
