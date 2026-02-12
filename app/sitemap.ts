import { MetadataRoute } from "next";
import { states } from "@/data/states";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date("2026-02-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/practice-tests-by-state`,
      lastModified: new Date("2026-02-12"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // State DMV practice test landing pages (primary SEO pages)
  const stateDmvPages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${siteUrl}/${state.slug}-dmv-practice-test`,
    lastModified: new Date("2026-02-12"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Spanish state DMV practice test landing pages
  const stateDmvPagesEs: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
    lastModified: new Date("2026-02-12"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Spanish index page
  const spanishIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/es/examenes-practica-por-estado`,
      lastModified: new Date("2026-02-12"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return [...corePages, ...stateDmvPages, ...stateDmvPagesEs, ...spanishIndexPage];
}
