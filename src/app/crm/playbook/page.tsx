import type { Metadata } from "next";
import PlaybookClient from "./PlaybookClient";

export const metadata: Metadata = { title: "Playbook" };

export default function CrmPlaybookPage() {
  return (
    <>
      <p className="eyebrow mb-3">Playbook</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        Your 90-day playbook.
      </h1>
      <p className="text-bone/55 text-[14.5px] font-light mb-10 max-w-2xl leading-relaxed">
        Daily homework distilled from the Tommy Mello corpus, filtered for a
        solo, no-budget, zero-lead operator. Free + in-person beats paid at
        your stage. Check tasks off; the page remembers.
      </p>
      <PlaybookClient />
    </>
  );
}
