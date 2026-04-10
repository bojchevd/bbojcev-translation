import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-3">
              {t("title")}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brown leading-tight mb-6">
              {t("name")}
            </h1>
            <p className="text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={`/${locale}/contact`} variant="primary">
                {t("cta")}
              </Button>
              <Button href="#services" variant="outline">
                {t("learnMore")}
              </Button>
            </div>
          </div>

          {/* Photo — asymmetric overlap */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto w-64 sm:w-80 lg:w-full max-w-md">
              <div className="absolute inset-0 bg-terracotta/10 rounded-lg translate-x-4 translate-y-4" />
              <div className="relative bg-linen rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/headshot-main.png"
                  alt={t("name")}
                  width={400}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Overlapping credentials card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 sm:p-5">
                <p className="font-serif text-brown text-sm sm:text-base font-semibold">
                  {t("title")}
                </p>
                <p className="text-muted text-xs sm:text-sm mt-1">
                  {locale === "mk" ? "од 1996 година" : "Since 1996"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
