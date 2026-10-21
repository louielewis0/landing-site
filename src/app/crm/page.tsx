import type { Metadata } from "next";
import CommandCenter from "./overview/CommandCenter";

export const metadata: Metadata = { title: "Dashboard" };

export default function CrmOverviewPage() {
  return <CommandCenter />;
}
