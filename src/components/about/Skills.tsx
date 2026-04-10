import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const languages = [
  { en: "Macedonian", mk: "Македонски", sr: "Македонски", enLevel: "Native", mkLevel: "Мајчин", srLevel: "Матерњи" },
  { en: "English", mk: "Англиски", sr: "Енглески", enLevel: "C2 — Proficient", mkLevel: "C2 — Одлично", srLevel: "C2 — Одлично" },
  { en: "Serbian", mk: "Српски", sr: "Српски", enLevel: "C2 — Proficient", mkLevel: "C2 — Одлично", srLevel: "C2 — Одлично" },
];

const catTools = [
  "SDL Trados Studio", "Idiom Workbench",
  "Wordfast", "Smartling", "MemoQ",
  "Client-specific tools",
];

const certifications = [
  { en: "Authorized Court Translator — English ↔ Macedonian (Ministry of Justice, since 1996)", mk: "Овластен судски преведувач — Англиски ↔ Македонски (Министерство за правда, од 1996)", sr: "Овлашћени судски преводилац — Енглески ↔ Македонски (Министарство правде, од 1996)" },
  { en: "Authorized Court Translator — Serbian ↔ Macedonian (Ministry of Justice, since 2010)", mk: "Овластен судски преведувач — Српски ↔ Македонски (Министерство за правда, од 2010)", sr: "Овлашћени судски преводилац — Српски ↔ Македонски (Министарство правде, од 2010)" },
  { en: "BA in English Language and Literature — Ss. Cyril and Methodius University, Skopje", mk: "Дипломиран англиски јазик и книжевност — УКИМ, Скопје", sr: "Дипломирани англиста — УКИМ, Скопље" },
];

export function Skills() {
  const t = useTranslations("about");
  const locale = useLocale() as "mk" | "en" | "sr";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("skillsTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("languagesTitle")}</h3>
            <ul className="space-y-3">
              {languages.map((lang) => (
                <li key={lang.en} className="flex justify-between items-center text-sm">
                  <span className="text-brown font-medium">{lang[locale]}</span>
                  <span className="text-muted">{{ mk: lang.mkLevel, en: lang.enLevel, sr: lang.srLevel }[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("toolsTitle")}</h3>
            <ul className="space-y-2">
              {catTools.map((tool) => (
                <li key={tool} className="text-muted text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("certificationsTitle")}</h3>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted text-sm leading-relaxed flex gap-2">
                  <span className="text-terracotta shrink-0 mt-1">✓</span>
                  <span>{cert[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
