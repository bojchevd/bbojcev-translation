import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesOverview() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          title={t("home.servicesTitle")}
          subtitle={t("home.servicesSubtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="group block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-linen"
            >
              <h3 className="font-serif text-lg text-brown mb-2 group-hover:text-terracotta transition-colors">
                {t(`services.${service.slug}.title`)}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {t(`services.${service.slug}.short`)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
