/**
 * Shared motion utilities.
 *
 * Tuning notes:
 * - LUXE_EASE is the global cinematic curve — heavy ease-out, used for
 *   reveals, scroll responses, and most hovers. Sotheby's/Aman feel.
 * - SOFT_EASE for hover micro-interactions (faster, less dramatic).
 * - Durations are intentionally long. Restraint is the brand.
 */

export const LUXE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SOFT_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
export const LUXE_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const SOFT_EASE_CSS = "cubic-bezier(0.4, 0, 0.2, 1)";

export const DUR = {
  fast: 0.4,
  med: 1.0,
  slow: 1.4,
  cinema: 1.8,
} as const;

/** True if the user has requested reduced motion. SSR-safe (returns false on server). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** True if the device has a fine pointer (mouse). Used to gate desktop-only effects. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: fine)").matches ?? false;
}

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp helper. */
export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
