import type { MetadataRoute } from "next";

const BASE_URL = "https://biljanavbojcev.com";

const pages = [
  "",
  "/about",
  "/services",
  "/services/court-translation",
  "/services/legal-translation",
  "/services/subtitling",
  "/services/literary-translation",
  "/services/general-translation",
  "/services/mtpe",
  "/portfolio",
  "/contact",
];

const locales = ["mk", "en", "sr"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const alternateLanguages: Record<string, string> = {};
    for (const loc of locales) {
      alternateLanguages[loc] = `${BASE_URL}/${loc}${page}`;
    }

    for (const loc of locales) {
      entries.push({
        url: `${BASE_URL}/${loc}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : page.includes("/services/") ? 0.9 : 0.8,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  return entries;
}
