import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const statKeys = ["years", "languages", "certified", "projects"] as const;

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="bg-linen py-12 sm:py-16">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
          {statKeys.map((key, i) => (
            <div key={key} className="flex items-center">
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-brown text-center px-6 sm:px-8 lg:px-12">
                {t(key)}
              </p>
              {i < statKeys.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-terracotta/30" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
