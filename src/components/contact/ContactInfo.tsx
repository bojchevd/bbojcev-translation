import { useLocale, useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

export function ContactInfo() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-linen">
      <h2 className="font-serif text-2xl text-brown mb-2">{t("directTitle")}</h2>
      <p className="text-muted text-sm mb-6">{t("directSubtitle")}</p>

      <div className="space-y-4">
        {/* Email */}
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-3 text-brown hover:text-terracotta transition-colors group"
        >
          <span className="w-10 h-10 bg-linen rounded-full flex items-center justify-center text-sm group-hover:bg-terracotta/10 transition-colors">
            @
          </span>
          <div>
            <p className="text-sm font-medium">{CONTACT.email}</p>
            <p className="text-xs text-muted">Email</p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${CONTACT.phoneRaw}`}
          className="flex items-center gap-3 text-brown hover:text-terracotta transition-colors group"
        >
          <span className="w-10 h-10 bg-linen rounded-full flex items-center justify-center text-sm group-hover:bg-terracotta/10 transition-colors">
            ✆
          </span>
          <div>
            <p className="text-sm font-medium">{CONTACT.phone}</p>
            <p className="text-xs text-muted">{locale === "mk" ? "Телефон" : "Phone"}</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CONTACT.phoneRaw.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-brown hover:text-terracotta transition-colors group"
        >
          <span className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-sm group-hover:bg-green-100 transition-colors">
            W
          </span>
          <div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs text-muted">{CONTACT.phone}</p>
          </div>
        </a>

        {/* Viber */}
        <a
          href={`viber://chat?number=${CONTACT.phoneRaw.replace("+", "%2B")}`}
          className="flex items-center gap-3 text-brown hover:text-terracotta transition-colors group"
        >
          <span className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-sm group-hover:bg-purple-100 transition-colors">
            V
          </span>
          <div>
            <p className="text-sm font-medium">Viber</p>
            <p className="text-xs text-muted">{CONTACT.phone}</p>
          </div>
        </a>
      </div>

      {/* Location */}
      <div className="mt-6 pt-6 border-t border-linen">
        <p className="text-sm text-brown font-medium">{CONTACT.address}</p>
        <p className="text-xs text-muted mt-1">
          {locale === "mk" ? "Достапна за далечинска работа ширум светот" : "Available for remote work worldwide"}
        </p>
      </div>
    </div>
  );
}
