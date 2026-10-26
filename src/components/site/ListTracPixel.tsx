"use client";

import { useEffect } from "react";

/**
 * ListTracPixel — fires a ListTrac "listing detail view" on each IDX listing
 * detail page. Realcomp REQUIRES the ListTrac monitoring code on the detail
 * page of all IDX displays (per the IDX Data Access Agreement).
 *
 * The exact tracking snippet is partner-specific — you get it from the
 * "Developers" area after registering at http://realcomp.listtrac.com/admin/register.
 * Until the ID is configured this component is inert (no network call), so the
 * detail pages ship safely; set NEXT_PUBLIC_LISTTRAC_ID in Vercel (and paste
 * the exact developer snippet if it differs from the standard beacon below) to
 * activate it.
 */
export default function ListTracPixel({
  listingId,
  zip,
}: {
  listingId: string | null;
  zip?: string | null;
}) {
  useEffect(() => {
    const partnerId = process.env.NEXT_PUBLIC_LISTTRAC_ID;
    if (!partnerId || !listingId) return; // inert until configured

    // Standard ListTrac page-view beacon. If your Developers-area snippet
    // differs, replace the body of this effect with it verbatim.
    try {
      const params = new URLSearchParams({
        pid: partnerId,
        pagetype: "detail",
        mlsnum: listingId,
        ...(zip ? { zip } : {}),
      });
      const img = new Image();
      img.src = `https://listtrac.com/Track/Track.aspx?${params.toString()}`;
    } catch {
      /* tracking must never break the page */
    }
  }, [listingId, zip]);

  return null;
}
