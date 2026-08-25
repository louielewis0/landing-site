import type { Metadata } from "next";
import FarmClient from "./FarmClient";

export const metadata: Metadata = { title: "Farm map" };

export default function CrmFarmPage() {
  return <FarmClient />;
}
