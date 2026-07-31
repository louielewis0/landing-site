import { Fraunces, Inter, Manrope, Space_Grotesk } from "next/font/google";

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

/** Body face for the user's template design system. */
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Display face — huge light uppercase headlines (user's template). */
export const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
