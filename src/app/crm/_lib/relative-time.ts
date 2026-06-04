/**
 * Tiny relative-time helper used across overview widgets (recent
 * leads, needs-attention, activity feed in 2E). Returns strings
 * like "just now", "5m ago", "3h ago", "2d ago", "Nov 14" for the
 * older falloff.
 *
 * Pure function, no localization yet — strings are baked English
 * to match the rest of the site's voice. When we localize in
 * future, swap for Intl.RelativeTimeFormat with a locale prop.
 */
export function relativeTime(input: string | Date): string {
  const then =
    input instanceof Date ? input.getTime() : new Date(input).getTime();
  const diff = (Date.now() - then) / 1000;

  if (diff < 0) return "in the future";
  if (diff < 30) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return new Date(then).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
