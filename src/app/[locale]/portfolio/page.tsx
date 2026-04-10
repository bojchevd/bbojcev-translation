import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoShowcase } from "@/components/portfolio/LogoShowcase";
import { ExperienceGrid } from "@/components/portfolio/ExperienceGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("pageTitle") };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-muted text-lg max-w-2xl">{t("pageSubtitle")}</p>
        </Container>
      </section>

      <LogoShowcase />

      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <SectionHeading title={t("euTitle")} />
          <p className="text-muted text-center max-w-2xl mx-auto">{t("euDescription")}</p>
        </Container>
      </section>

      <ExperienceGrid />

      <section className="bg-linen py-16">
        <Container>
          <SectionHeading title={t("teachingTitle")} />
          <p className="text-muted text-center max-w-2xl mx-auto">{t("teachingDescription")}</p>
        </Container>
      </section>
    </>
  );
}
