import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { company } from "@/lib/config";
import ScrollInterceptor from "@/components/ScrollInterceptor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `Metro Detroit Real Estate | Buy & Sell Homes in Michigan | ${company.name}`,
    template: `%s | ${company.name}`,
  },
  description:
    "Metro Detroit real estate experts serving Troy, Rochester Hills, Birmingham, Bloomfield Hills, West Bloomfield, Sterling Heights, and Warren. 20+ years experience, $100M+ in closed sales. Get a free home valuation today.",
  keywords: [
    "homes for sale in Troy MI",
    "sell my house fast Metro Detroit",
    "real estate agent Rochester Hills",
    "Birmingham MI real estate",
    "Bloomfield Hills homes for sale",
    "Metro Detroit realtor",
    "Troy Michigan real estate",
    "Sterling Heights homes",
    "Warren MI real estate agent",
    "West Bloomfield homes for sale",
    "Michigan luxury homes",
    "first-time home buyer Michigan",
    "investment properties Michigan",
    company.name,
  ],
  openGraph: {
    title: `Metro Detroit Real Estate Experts | ${company.name}`,
    description:
      "Buy and sell homes with confidence across Troy, Rochester Hills, Birmingham, Bloomfield Hills and surrounding areas. 20+ years experience, $100M+ closed.",
    type: "website",
    locale: "en_US",
    url: "https://marketcenterrealty.com",
    siteName: company.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Metro Detroit Real Estate | ${company.name}`,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://marketcenterrealty.com" },
  icons: { icon: "/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: company.name,
  description: company.description,
  telephone: company.phone,
  email: company.email,
  url: "https://marketcenterrealty.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2032 E Square Lake Rd Suite 400A",
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: "48098",
    addressCountry: "US",
  },
  areaServed: [
    "Troy, MI",
    "Rochester Hills, MI",
    "Birmingham, MI",
    "Bloomfield Hills, MI",
    "West Bloomfield, MI",
    "Sterling Heights, MI",
    "Warren, MI",
  ],
  priceRange: "$$-$$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "50",
  },
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
        <ScrollInterceptor />
      </body>
    </html>
  );
}
