import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const stats = [
  { key: "years", icon: "📅" },
  { key: "languages", icon: "🌍" },
  { key: "certified", icon: "✓" },
  { key: "projects", icon: "📄" },
] as const;

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="bg-linen py-10">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-sm sm:text-base font-medium text-brown">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
