import type { Metadata } from "next";
import AdminGate from "./gate";

export const metadata: Metadata = {
  title: "Admin | Real Estate Market Center",
  description: "Internal review growth system dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminGate />;
}
