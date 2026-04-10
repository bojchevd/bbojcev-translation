"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LANGUAGE_PAIRS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function QuoteForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as "mk" | "en" | "sr";

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("serviceType") as string,
      languagePair: formData.get("languagePair") as string,
      documentType: formData.get("documentType") as string,
      pages: formData.get("pages") as string,
      urgent: formData.get("urgent") === "on",
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-linen text-center">
        <p className="text-brown font-serif text-xl mb-2">✓</p>
        <p className="text-brown font-medium">{t("success")}</p>
      </div>
    );
  }

  const inputClasses = "w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-linen">
      <h2 className="font-serif text-2xl text-brown mb-2">{t("formTitle")}</h2>
      <p className="text-muted text-sm mb-6">{t("formSubtitle")}</p>

      <div className="space-y-5">
        {/* Name & Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5">{t("name")}</label>
            <input name="name" required className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5">{t("email")}</label>
            <input name="email" type="email" required className={inputClasses} />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">{t("phone")}</label>
          <input name="phone" type="tel" className={inputClasses} />
        </div>

        {/* Service type */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">{t("serviceType")}</label>
          <select name="serviceType" required className={inputClasses}>
            <option value="">{t("selectService")}</option>
            <option value="court">{t("courtTranslation")}</option>
            <option value="legal">{t("legalTranslation")}</option>
            <option value="general">{t("generalTranslation")}</option>
          </select>
        </div>

        {/* Language pair */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">{t("languagePair")}</label>
          <select name="languagePair" required className={inputClasses}>
            <option value="">{t("selectLanguage")}</option>
            {LANGUAGE_PAIRS.map((pair) => (
              <option key={`${pair.from}-${pair.to}`} value={`${pair.from}-${pair.to}`}>
                {pair.label[locale]}
              </option>
            ))}
          </select>
        </div>

        {/* Document type & pages row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5">{t("documentType")}</label>
            <input name="documentType" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5">{t("pages")}</label>
            <input name="pages" type="number" min={1} className={inputClasses} />
          </div>
        </div>

        {/* Urgency */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input name="urgent" type="checkbox" className="w-4 h-4 accent-terracotta" />
          <span className="text-sm text-muted">{t("urgentLabel")}</span>
        </label>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">{t("message")}</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder={t("messagePlaceholder")}
            className={inputClasses}
          />
        </div>

        {status === "error" && (
          <p className="text-red-600 text-sm">{t("error")}</p>
        )}

        <Button type="submit" variant="primary" className="w-full">
          {status === "sending" ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
