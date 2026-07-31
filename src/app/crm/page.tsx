import type { Metadata } from "next";
import OverviewClient from "./overview/OverviewClient";

export const metadata: Metadata = { title: "Overview" };

export default function CrmOverviewPage() {
  return (
    <>
      <p className="crm-label text-[var(--gold-soft)] mb-2">Overview</p>
      <h1 className="text-2xl font-semibold text-[#191a1c] tracking-tight mb-8">
        Welcome back.
      </h1>
      <OverviewClient />
    </>
  );
}
