import {
  Home,
  TrendingUp,
  UserCheck,
  Crown,
  Building2,
  BarChart3,
  ShieldCheck,
  MapPin,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  blurb: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const services: Service[] = [
  {
    id: "buy",
    title: "Buy a Home in Michigan",
    blurb: "Find the right home, at the right price, without compromising.",
    Icon: Home,
  },
  {
    id: "sell",
    title: "Sell Your Home Fast",
    blurb: "Sell at or above asking with our proven pricing and marketing system.",
    Icon: TrendingUp,
  },
  {
    id: "first-time",
    title: "First-Time Home Buyers",
    blurb: "Step-by-step guidance plus access to down-payment assistance programs.",
    Icon: UserCheck,
  },
  {
    id: "luxury",
    title: "Luxury Real Estate",
    blurb: "Discreet, high-touch representation for premium Metro Detroit properties.",
    Icon: Crown,
  },
  {
    id: "commercial",
    title: "Commercial Properties",
    blurb: "Offices, retail, and mixed-use representation across Metro Detroit.",
    Icon: Building2,
  },
  {
    id: "investment",
    title: "Investment Consulting",
    blurb: "Cash-flow, cap-rate, and 1031 strategy for serious investors.",
    Icon: BarChart3,
  },
  {
    id: "management",
    title: "Property Management",
    blurb: "Full-service management that protects your investment and your tenants.",
    Icon: ShieldCheck,
  },
  {
    id: "relocation",
    title: "Relocation Services",
    blurb: "Move in or out of Metro Detroit with zero stress — we handle every detail.",
    Icon: MapPin,
  },
];

/**
 * Services — prototype #services treatment: cream section, white
 * hover-lift cards with icon tiles. Copy unchanged.
 */
export default function Services() {
  return (
    <section id="services" className="sec-pad bg-cream">
      <div className="container">
        <div className="sec-head reveal">
          <div className="s-eyebrow">What we do</div>
          <h2>Full-service real estate, at the highest level.</h2>
          <p>From first-time buyers to seasoned investors — one team, every need.</p>
        </div>
        <div className="services-grid">
          {services.map(({ id, title, blurb, Icon }) => (
            <a key={id} href="/home-value" className="service-card reveal" style={{ display: "block" }}>
              <div className="service-icon">
                <Icon className="w-[22px] h-[22px]" strokeWidth={2} />
              </div>
              <h3>{title}</h3>
              <p>{blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
