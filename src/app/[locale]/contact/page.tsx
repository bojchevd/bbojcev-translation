import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { QuoteCalculator } from "@/components/contact/QuoteCalculator";
import { ContactInfo } from "@/components/contact/ContactInfo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    title: t("pageTitle"),
    description: locale === "mk"
      ? "Побарајте понуда за превод на документи. Калкулатор на цени, формулар за понуда, директен контакт."
      : "Request a document translation quote. Price calculator, quote form, direct contact.",
    locale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-4">
            {t("pageTitle")}
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuoteForm />
            <div className="space-y-8">
              <QuoteCalculator />
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
