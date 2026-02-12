import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/test/",
          "/training",
          "/dashboard",
          "/settings",
          "/stats",
          "/admin",
          "/onboarding",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
