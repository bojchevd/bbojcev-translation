import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industries = [
  { en: "IT & Software", mk: "ИТ и софтвер" },
  { en: "Technical Manuals", mk: "Технички прирачници" },
  { en: "Legal & Regulatory", mk: "Правни документи" },
  { en: "Patents", mk: "Патенти" },
  { en: "Medical & Pharma", mk: "Медицина и фармација" },
  { en: "Finance & Banking", mk: "Финансии и банкарство" },
  { en: "Telecommunications", mk: "Телекомуникации" },
  { en: "Games & Entertainment", mk: "Игри и забава" },
  { en: "Literature & Publishing", mk: "Литература и издаваштво" },
  { en: "Academic & Research", mk: "Академски и истражувачки" },
];

export function ExperienceGrid() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as "mk" | "en";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("industriesTitle")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.en}
              className="bg-linen rounded-lg p-4 text-center text-sm text-brown font-medium"
            >
              {ind[locale]}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
