import { Fraunces, Inter } from "next/font/google";

/**
 * Public-site font pair (parallax redesign). Loaded here — NOT in the
 * root layout — so the CRM keeps its Geist/Cormorant stack and these
 * families are only preloaded on public pages via SiteShell.
 */
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
