import { company } from "@/lib/config";

export default function FloatingCTA() {
  return (
    <a
      href={`tel:${company.phoneTel}`}
      className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold shadow-2xl"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      Call {company.phone}
    </a>
  );
}
