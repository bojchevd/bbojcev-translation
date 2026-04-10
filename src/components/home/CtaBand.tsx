import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-brown py-16">
      <Container className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-cream/70 mb-8 text-lg">{t("ctaSubtitle")}</p>
        <Button href={`/${locale}/contact`} variant="secondary">
          {t("ctaButton")}
        </Button>
      </Container>
    </section>
  );
}
