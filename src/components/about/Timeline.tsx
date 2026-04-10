import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const milestones = [
  {
    year: "1996",
    mk: "Дипломира на Филолошкиот факултет, УКИМ Скопје. Овластена како судски преведувач за англиски јазик.",
    en: "Graduated from Faculty of Philology, Ss. Cyril and Methodius University. Authorized as court translator for English.",
    sr: "Дипломирала на Филолошком факултету, УКИМ Скопље. Овлашћена као судски преводилац за енглески језик.",
  },
  {
    year: "2001",
    mk: "Започнува со настава по англиски јазик во средно образование.",
    en: "Begins teaching English in secondary education.",
    sr: "Почиње да предаје енглески језик у средњем образовању.",
  },
  {
    year: "2004",
    mk: "Превод на ЕУ документи за Секторот за европска интеграција при Владата на РМ.",
    en: "EU document translation for the Sector of European Integration, Government of North Macedonia.",
    sr: "Превод ЕУ докумената за Сектор за европску интеграцију при Влади Северне Македоније.",
  },
  {
    year: "2007",
    mk: "Основа TRANSLATUM — преведувачка компанија. Почнува со титлување и локализација.",
    en: "Founds TRANSLATUM translation company. Starts subtitling and localization work.",
    sr: "Оснива TRANSLATUM — преводилачку компанију. Почиње са титловањем и локализацијом.",
  },
  {
    year: "2010",
    mk: "Овластена како судски преведувач за српски јазик. Присуствува на меѓународни преведувачки конференции.",
    en: "Authorized as court translator for Serbian. Attends international translation conferences.",
    sr: "Овлашћена као судски преводилац за српски језик. Присуствује међународним преводилачким конференцијама.",
  },
  {
    year: "2019",
    mk: "Продолжува како независен преведувач. Титлување за Disney, Netflix, National Geographic.",
    en: "Continues as independent freelance translator. Subtitling for Disney, Netflix, National Geographic.",
    sr: "Наставља као независни преводилац. Титловање за Disney, Netflix, National Geographic.",
  },
];

export function Timeline() {
  const t = useTranslations("about");
  const locale = useLocale() as "mk" | "en" | "sr";

  return (
    <section className="bg-linen py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("timelineTitle")} />
        <div className="max-w-3xl mx-auto">
          {milestones.map((item, i) => (
            <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-brown">{item.year}</span>
                </div>
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-terracotta/20 mt-2" />
                )}
              </div>
              <div className="pt-2.5 pb-4">
                <p className="text-muted text-sm leading-relaxed">{item[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
