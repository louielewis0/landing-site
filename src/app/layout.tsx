import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { company } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} — Real Estate in ${company.city}`,
    template: `%s | ${company.name}`,
  },
  description: `${company.name}: ${company.city}'s trusted real estate brokerage. Buy, sell, or invest with local experts who deliver real results.`,
  keywords: [
    `homes for sale in ${company.city}`,
    `real estate agent ${company.city}`,
    `${company.city} realtor`,
    "sell my home",
    "home valuation",
    company.name,
  ],
  openGraph: {
    title: `${company.name} — Real Estate in ${company.city}`,
    description: `Buy, sell, or invest in ${company.city} with the team that delivers real results.`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.city}`,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: company.name,
  description: company.description,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: company.city,
    addressRegion: company.state,
  },
  areaServed: company.city,
  priceRange: "$$-$$$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
