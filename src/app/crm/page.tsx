import type { Metadata } from "next";
import OverviewClient from "./overview/OverviewClient";

export const metadata: Metadata = { title: "Overview" };

export default function CrmOverviewPage() {
  return (
    <>
      <p className="eyebrow mb-3">Overview</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-8">
        Welcome back.
      </h1>
      <OverviewClient />
    </>
  );
}
