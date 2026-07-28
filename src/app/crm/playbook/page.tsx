import type { Metadata } from "next";
import PlaybookClient from "./PlaybookClient";

export const metadata: Metadata = { title: "Playbook" };

export default function CrmPlaybookPage() {
  return (
    <>
      <p className="crm-label text-[var(--gold-soft)] mb-2">Playbook</p>
      <h1 className="text-2xl font-semibold text-[#f4f5f7] tracking-tight mb-2">
        Your 90-day playbook.
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl leading-relaxed">
        Daily homework distilled from the Tommy Mello corpus, filtered for a
        solo, no-budget, zero-lead operator. Free + in-person beats paid at
        your stage. Check tasks off; the page remembers.
      </p>
      <PlaybookClient />
    </>
  );
}
