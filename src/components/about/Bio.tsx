import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Bio() {
  const t = useTranslations("about");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-terracotta/10 rounded-lg translate-x-3 translate-y-3" />
              <Image
                src="/images/headshot-main.png"
                alt="Biljana Vasileva Bojchev"
                width={400}
                height={500}
                className="relative rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-serif text-3xl text-brown mb-6">{t("bioTitle")}</h2>
            <div className="text-muted leading-relaxed space-y-4">
              {t("bio")
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
