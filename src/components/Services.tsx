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
      className="relative py-28 bg-[#0A1429] text-white overflow-hidden noise"
    >
      <div className="absolute inset-0 glow-orange opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.22em] mb-4">
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-5 leading-[1.05]">
            Full-service real estate,
            <br />
            <span className="gradient-text">done at the highest level.</span>
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            From first-time buyers to seasoned investors — one team, every need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#lead-magnet"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 transition-all"
          >
            Get Free Home Valuation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { Icon } = service;
  return (
    <a
      href="#lead-magnet"
      className="group relative flex flex-col h-full rounded-2xl p-7 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur border border-white/10 hover:border-orange-400/40 hover:from-white/[0.07] hover:to-white/[0.02] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Icon — primary visual anchor */}
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
        <Icon className="w-6 h-6 text-orange-400" strokeWidth={1.75} />
      </div>

      {/* Title */}
      <h3 className="text-[17px] font-bold tracking-tight mb-2 leading-tight">
        {service.title}
      </h3>

      {/* Description — fills available space so CTA aligns at bottom */}
      <p className="text-[13.5px] text-white/60 leading-relaxed mb-6 flex-1">
        {service.blurb}
      </p>

      {/* CTA — consistent label + arrow, pinned to bottom */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-300 group-hover:text-orange-200 transition-colors mt-auto">
        Learn More
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}
