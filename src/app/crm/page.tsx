import type { Metadata } from "next";
import TemplateDashboard from "./overview/TemplateDashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default function CrmOverviewPage() {
  return <TemplateDashboard />;
}
