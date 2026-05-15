import { Clock, DollarSign, Home } from "lucide-react";
import Reveal from "./motion/Reveal";
import CountUp from "./motion/CountUp";

const badges = [
  { Icon: Clock, end: 20, prefix: "", suffix: "+", label: "Years of experience" },
  { Icon: DollarSign, end: 100, prefix: "$", suffix: "M+", label: "In Metro Detroit sales" },
  { Icon: Home, end: 500, prefix: "", suffix: "+", label: "Homes closed" },
];

export default function TrustBadges() {
  return (
    <section className="relative bg-ink-2 py-20 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {badges.map(({ Icon, end, prefix, suffix, label }, i) => (
            <Reveal
              key={label}
              delay={(i + 1) as 1 | 2 | 3}
              className={`flex items-center justify-center gap-5 px-8 py-6 ${
                i > 0 ? "md:border-l border-bone/10" : ""
              }`}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[var(--gold)]/40 flex items-center justify-center bg-[var(--gold)]/5">
                <Icon className="w-6 h-6 text-[var(--gold-soft)]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-4xl font-light text-bone tracking-tight leading-none">
                  <CountUp end={end} prefix={prefix} suffix={suffix} />
                </div>
                <div className="text-[11px] text-bone/45 mt-2 uppercase tracking-[0.22em]">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
