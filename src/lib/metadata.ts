import type { Metadata } from "next";
import { CONTACT } from "./constants";

const BASE_URL = "https://biljanavbojcev.com";

export function buildMetadata({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description: string;
  locale: string;
  path: string;
}): Metadata {
  const otherLocale = locale === "mk" ? "en" : "mk";
  const url = `${BASE_URL}/${locale}${path}`;
  const altUrl = `${BASE_URL}/${otherLocale}${path}`;
  const fullTitle = `${title} | Biljana V. Bojchev`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [otherLocale]: altUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Biljana V. Bojchev — Certified Court Translator",
      locale: locale === "mk" ? "mk_MK" : "en_US",
      type: "website",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BASE_URL,
    name: "Biljana Vasileva Bojchev — Certified Court Translator",
    alternateName: "Билјана Василева Бојчев — Овластен судски преведувач",
    description:
      "Certified court translator with 30+ years of experience. Document translation, subtitling, legal translation. Veles, North Macedonia.",
    url: BASE_URL,
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Veles",
      addressCountry: "MK",
    },
    priceRange: "$$",
    knowsLanguage: ["mk", "en", "sr", "hr", "bs"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Translation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Court Document Translation",
            description: "Certified sworn translations for all official documents with full legal validity",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legal & Business Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Subtitling & Audiovisual Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Literary Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Document Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Machine Translation Post-Editing (MTPE)",
          },
        },
      ],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Biljana Vasileva Bojchev",
    jobTitle: "Certified Court Translator",
    url: BASE_URL,
    knowsLanguage: [
      { "@type": "Language", name: "Macedonian", alternateName: "mk" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Serbian", alternateName: "sr" },
      { "@type": "Language", name: "Croatian", alternateName: "hr" },
      { "@type": "Language", name: "Bosnian", alternateName: "bs" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ss. Cyril and Methodius University, Skopje",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Authorized Court Translator — English",
        recognizedBy: { "@type": "Organization", name: "Ministry of Justice, North Macedonia" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Authorized Court Translator — Serbian",
        recognizedBy: { "@type": "Organization", name: "Ministry of Justice, North Macedonia" },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
