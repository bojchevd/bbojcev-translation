import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const studios = [
  { name: "Disney", type: "Streaming & Film" },
  { name: "Netflix", type: "Streaming & Series" },
  { name: "National Geographic", type: "Documentary" },
  { name: "AXN", type: "Entertainment" },
  { name: "Viasat", type: "Broadcasting" },
  { name: "TV1000", type: "Film Channel" },
];

export function LogoShowcase() {
  const t = useTranslations("portfolio");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("subtitlingTitle")} />
        <p className="text-muted text-center max-w-2xl mx-auto mb-12">
          {t("subtitlingDescription")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {studios.map((studio) => (
            <div
              key={studio.name}
              className="bg-white rounded-lg p-6 text-center shadow-sm border border-linen hover:border-terracotta/30 transition-colors"
            >
              <p className="font-serif text-xl text-brown">{studio.name}</p>
              <p className="text-muted text-xs mt-1">{studio.type}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
