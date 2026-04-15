import Script from "next/script";
import { idx } from "@/lib/idx";

/**
 * Loads the Showcase IDX plugin script once per page. Only renders when the
 * IDX Account ID is configured, so dev environments without IDX credentials
 * never trigger network errors.
 */
export default function ShowcaseIDXScript() {
  if (!idx.enabled) return null;
  return (
    <Script
      id="showcase-idx"
      src={idx.scriptSrc}
      data-account-id={idx.accountId}
      strategy="lazyOnload"
    />
  );
}
