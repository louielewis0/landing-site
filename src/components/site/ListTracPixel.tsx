"use client";

import { useEffect } from "react";

/**
 * ListTracPixel — fires the ListTrac "view" event on each IDX listing detail
 * page. Realcomp REQUIRES the ListTrac monitoring code on the detail page of
 * all IDX displays (per the IDX Data Access Agreement).
 *
 * Partner token issued by ListTrac for marketcenterrealty.com. It's a public
 * client-side tracking ID (not a secret), so it lives here in code.
 * Required params: lid = MLS listing number, zc = property zip code.
 * Docs: //code.listtrac.com/sm/dt/x_1091831_e/view/?lid=[listingID]&zc=[zipcode]
 */
const LISTTRAC_PARTNER = "x_1091831_e";

export default function ListTracPixel({
  listingId,
  zip,
}: {
  listingId: string | null;
  zip?: string | null;
}) {
  useEffect(() => {
    if (!listingId) return;
    const params = new URLSearchParams({ lid: listingId });
    if (zip) params.set("zc", zip);

    const s = document.createElement("script");
    s.src = `https://code.listtrac.com/sm/dt/${LISTTRAC_PARTNER}/view/?${params.toString()}`;
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);

    return () => {
      try {
        document.body.removeChild(s);
      } catch {
        /* already removed */
      }
    };
  }, [listingId, zip]);

  return null;
}
