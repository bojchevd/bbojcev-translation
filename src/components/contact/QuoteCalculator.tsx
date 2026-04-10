"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { documentTypes, calculatePrice } from "@/lib/pricing";
import { LANGUAGE_PAIRS, CONTACT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale() as "mk" | "en";

  const [documentId, setDocumentId] = useState("");
  const [languagePair, setLanguagePair] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [express, setExpress] = useState(false);

  const selectedDoc = documentTypes.find((d) => d.id === documentId);
  const isPerWord = selectedDoc?.tier === "per-word";
  const result = documentId ? calculatePrice(documentId, quantity, express) : null;

  return (
    <div id="calculator" className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-linen">
      <h2 className="font-serif text-2xl text-brown mb-2">{t("title")}</h2>
      <p className="text-muted text-sm mb-6">{t("subtitle")}</p>

      <div className="space-y-5">
        {/* Document type */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            {t("documentType")}
          </label>
          <select
            value={documentId}
            onChange={(e) => { setDocumentId(e.target.value); setQuantity(1); setExpress(false); }}
            className="w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta"
          >
            <option value="">{t("selectDocument")}</option>
            {documentTypes.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc[locale]}
              </option>
            ))}
          </select>
        </div>

        {/* Language pair */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            {t("languagePair")}
          </label>
          <select
            value={languagePair}
            onChange={(e) => setLanguagePair(e.target.value)}
            className="w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta"
          >
            <option value="">{t("selectLanguage")}</option>
            {LANGUAGE_PAIRS.map((pair) => (
              <option key={`${pair.from}-${pair.to}`} value={`${pair.from}-${pair.to}`}>
                {pair.label[locale]}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity — pages or words */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            {isPerWord ? t("words") : t("pages")}
          </label>
          <input
            type="number"
            min={1}
            max={isPerWord ? 999999 : 999}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta"
          />
        </div>

        {/* Express toggle — only for page-based pricing */}
        {!isPerWord && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={express}
              onChange={(e) => setExpress(e.target.checked)}
              className="w-4 h-4 accent-terracotta"
            />
            <span className="text-sm text-muted">{t("expressLabel")}</span>
          </label>
        )}

        {/* Result */}
        {result && (
          <div className="bg-linen rounded-lg p-5 mt-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">{t("result")}</p>
            <p className="font-serif text-3xl text-brown">
              {isPerWord ? result.total.toFixed(2) : result.total.toLocaleString()} <span className="text-lg">{isPerWord ? "EUR" : "MKD"}</span>
            </p>
            <p className="text-sm text-muted mt-1">
              {isPerWord ? `€${result.unitPrice}` : `${result.unitPrice} MKD`} {isPerWord ? t("perWord") : t("perPage")} × {quantity.toLocaleString()}
            </p>
            <p className="text-xs text-muted mt-4 italic">{t("disclaimer")}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button href={`/${locale}/contact`} variant="primary">
                {t("requestQuote")}
              </Button>
              <Button
                href={`https://wa.me/${CONTACT.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
                  locale === "mk"
                    ? "Здраво, ме интересира превод на документ."
                    : "Hello, I'm interested in document translation."
                )}`}
                variant="outline"
              >
                {t("contactWhatsApp")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
