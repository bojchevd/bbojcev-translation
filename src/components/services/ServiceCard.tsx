import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function ServiceCard({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/services/${slug}`}
      className="group block bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all border border-linen hover:border-terracotta/30"
    >
      <h3 className="font-serif text-xl text-brown mb-3 group-hover:text-terracotta transition-colors">
        {t(`${slug}.title`)}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {t(`${slug}.short`)}
      </p>
      <span className="inline-block mt-4 text-terracotta text-sm font-medium group-hover:translate-x-1 transition-transform">
        {{ mk: "Дознај повеќе →", en: "Learn more →", sr: "Сазнајте више →" }[locale as "mk" | "en" | "sr"]}
      </span>
    </Link>
  );
}
