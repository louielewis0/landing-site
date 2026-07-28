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
    <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.07]">
      <div className="rounded-xl p-1 bg-gradient-to-br from-white/95 to-white/85 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
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
        <span className="block font-semibold text-[14px] tracking-tight text-[#f4f5f7]">
          {company.shortName}
        </span>
        <span className="block text-[10px] tracking-[0.28em] uppercase text-[var(--gold-soft)] mt-0.5">
          CRM
        </span>
      </div>
    </div>
  );
}
