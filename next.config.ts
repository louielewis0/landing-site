import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  /**
   * Phase 2 routing: /dashboard renamed to /crm. The legacy URL
   * permanently redirects to the new base so existing bookmarks,
   * email links, and any external references keep landing on the
   * right place. Both rules are listed for explicitness — the
   * second alone would cover the bare /dashboard case too, but
   * being literal here makes the intent obvious to anyone reading
   * this config.
   *
   * /api/dashboard/* is a different prefix tree (path starts with
   * /api/, not /), so the redirect's source pattern never matches
   * API requests — internal service-role routes keep their stable
   * URL on purpose, per the Phase 2 plan.
   */
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/crm",
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/crm/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
