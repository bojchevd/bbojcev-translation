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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${BASE_URL}/mk${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page === "" ? 1.0 : page.includes("/services/") ? 0.9 : 0.8,
      alternates: {
        languages: {
          mk: `${BASE_URL}/mk${page}`,
          en: `${BASE_URL}/en${page}`,
        },
      },
    });
    entries.push({
      url: `${BASE_URL}/en${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page === "" ? 1.0 : page.includes("/services/") ? 0.9 : 0.8,
      alternates: {
        languages: {
          mk: `${BASE_URL}/mk${page}`,
          en: `${BASE_URL}/en${page}`,
        },
      },
    });
  }

  return entries;
}
