import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown text-cream/80">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl text-cream mb-3">
              Biljana V. Bojchev
            </p>
            <p className="text-sm leading-relaxed">{t("hero.title")}</p>
            <p className="text-sm mt-1">{t("footer.location")}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-medium text-cream mb-3 text-sm tracking-wider uppercase">
              {locale === "mk" ? "Навигација" : "Navigation"}
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    className="text-sm hover:text-cream transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-medium text-cream mb-3 text-sm tracking-wider uppercase">
              {locale === "mk" ? "Контакт" : "Contact"}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-cream transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="hover:text-cream transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.phoneRaw.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`viber://chat?number=${CONTACT.phoneRaw.replace("+", "%2B")}`}
                  className="hover:text-cream transition-colors"
                >
                  Viber
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-center text-xs">
          {t("footer.copyright", { year })}
        </div>
      </Container>
    </footer>
  );
}
