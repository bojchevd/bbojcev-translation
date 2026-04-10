import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    mk: "Професионален и брз превод. Секогаш точна и прецизна.",
    en: "Professional and fast translation. Always accurate and precise.",
    author: "M.S.",
    role: { mk: "Правна фирма, Скопје", en: "Law firm, Skopje" },
  },
  {
    mk: "Одличен квалитет на титлување. Ја препорачувам без резерва.",
    en: "Excellent subtitling quality. I recommend her without reservation.",
    author: "D.K.",
    role: { mk: "Продуцент, Белград", en: "Producer, Belgrade" },
  },
  {
    mk: "Соработуваме повеќе од 10 години. Секогаш навремена достава.",
    en: "We have been working together for over 10 years. Always on-time delivery.",
    author: "T.P.",
    role: { mk: "Преведувачка агенција", en: "Translation agency" },
  },
];

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale() as "mk" | "en";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("testimonialsTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-linen"
            >
              <p className="text-muted text-sm leading-relaxed italic mb-4">
                &ldquo;{item[locale]}&rdquo;
              </p>
              <footer className="text-xs">
                <p className="font-medium text-brown">{item.author}</p>
                <p className="text-muted">{item.role[locale]}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
