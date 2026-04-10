import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const clients = [
  "Disney",
  "Netflix",
  "National Geographic",
  "AXN",
  "Viasat",
  "TV1000",
];

export function ClientLogos() {
  const t = useTranslations("home");

  return (
    <section className="bg-linen py-16 sm:py-24">
      <Container>
        <SectionHeading
          title={t("clientsTitle")}
          subtitle={t("clientsSubtitle")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {clients.map((name) => (
            <div
              key={name}
              className="text-muted font-serif text-lg sm:text-xl tracking-wide opacity-60 hover:opacity-100 transition-opacity"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
