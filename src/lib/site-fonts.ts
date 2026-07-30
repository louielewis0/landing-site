import { Fraunces, Inter, Manrope } from "next/font/google";

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

/** Clean geometric sans for the nav CTAs (user-requested). */
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
