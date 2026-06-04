import Image from "next/image";
import { company } from "@/lib/config";

/**
 * Small logo + wordmark for the sidebar header. Echoes the
 * marketing-site Header.tsx pattern (bone-bg logo tile + display
 * wordmark) but sized down for a 240px rail. Uses
 * company.shortName ("REMC") since the full
 * "Real Estate Market Center" wraps on a narrow nav. A small gold
 * "CRM" eyebrow sits below to disambiguate from the marketing
 * site.
 */
export default function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-5 border-b border-bone/10">
      <div className="rounded-lg p-1 bg-bone/95 shrink-0">
        <Image
          src="/logo.png"
          alt={company.name}
          width={28}
          height={28}
          priority
          className="w-7 h-7 object-contain"
        />
      </div>
      <div className="leading-tight">
        <span className="block font-display font-light text-[15px] tracking-tight text-bone">
          {company.shortName}
        </span>
        <span className="block text-[10px] tracking-[0.32em] uppercase text-[var(--gold-soft)] mt-0.5">
          CRM
        </span>
      </div>
    </div>
  );
}
