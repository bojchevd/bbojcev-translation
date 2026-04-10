import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "./FaqSection";

export function ServicePageLayout({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const locale = useLocale();

  const hasDocuments = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasFaq = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasQuoteForm = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasContactNote = ["subtitling", "literary-translation", "mtpe"].includes(slug);

  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-6">
            {t(`${slug}.title`)}
          </h1>
          <div className="text-muted leading-relaxed max-w-3xl space-y-4">
            {t(`${slug}.description`)
              .split("\n\n")
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </Container>
      </section>

      {hasDocuments && (
        <section className="py-16">
          <Container>
            <h2 className="font-serif text-2xl text-brown mb-8">
              {t(`${slug}.documentsTitle`)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
              {(t.raw(`${slug}.documents`) as string[]).map((doc, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-1.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {slug === "subtitling" && (
        <section className="py-16">
          <Container>
            <h2 className="font-serif text-2xl text-brown mb-8">
              {t("subtitling.clientsTitle")}
            </h2>
            <div className="flex flex-wrap gap-6">
              {(t.raw("subtitling.clients") as string[]).map((client) => (
                <div key={client} className="bg-linen px-6 py-3 rounded-lg font-serif text-brown text-lg">
                  {client}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {hasFaq && (
        <Container>
          <FaqSection
            items={t.raw(`${slug}.faq`) as { q: string; a: string }[]}
            title={locale === "mk" ? "Најчесто поставувани прашања" : "Frequently Asked Questions"}
          />
        </Container>
      )}

      <section className="bg-linen py-16">
        <Container className="text-center">
          {hasQuoteForm ? (
            <>
              <h2 className="font-serif text-2xl text-brown mb-4">
                {locale === "mk" ? "Пресметајте ја цената" : "Calculate Your Price"}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={`/${locale}/contact`} variant="primary">
                  {locale === "mk" ? "Побарај понуда" : "Request Quote"}
                </Button>
                <Button href={`/${locale}/contact#calculator`} variant="outline">
                  {locale === "mk" ? "Калкулатор на цени" : "Price Calculator"}
                </Button>
              </div>
            </>
          ) : hasContactNote ? (
            <>
              <p className="text-muted mb-4">{t(`${slug}.contactNote`)}</p>
              <Button href={`/${locale}/contact`} variant="primary">
                {locale === "mk" ? "Контактирајте не" : "Contact Us"}
              </Button>
            </>
          ) : null}
        </Container>
      </section>
    </>
  );
}
