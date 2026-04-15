import { Clock, DollarSign, Home } from "lucide-react";

const badges = [
  {
    Icon: Clock,
    value: "20+",
    label: "Years of Experience",
  },
  {
    Icon: DollarSign,
    value: "$100M+",
    label: "In Metro Detroit Sales",
  },
  {
    Icon: Home,
    value: "500+",
    label: "Homes Closed",
  },
];

export default function TrustBadges() {
  return (
    <section className="relative bg-white py-16 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/70 hover:border-orange-300/60 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] transition-all"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-200 flex items-center justify-center">
                <Icon className="w-7 h-7 text-orange-600" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 tracking-[-0.02em] leading-none">
                  {value}
                </div>
                <div className="text-[13px] text-slate-500 mt-2 uppercase tracking-[0.12em] font-medium">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
