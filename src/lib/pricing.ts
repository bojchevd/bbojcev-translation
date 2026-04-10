export type PricingTier = "standard" | "complex" | "per-word";

export type DocumentType = {
  id: string;
  mk: string;
  en: string;
  sr: string;
  tier: PricingTier;
};

export const documentTypes: DocumentType[] = [
  { id: "birth-cert", mk: "Извод на родени", en: "Birth certificate", sr: "Извод из матичне књиге рођених", tier: "standard" },
  { id: "marriage-cert", mk: "Извод на венчани", en: "Marriage certificate", sr: "Извод из матичне књиге венчаних", tier: "standard" },
  { id: "non-conviction", mk: "Уверение за неосудуван", en: "Certificate of non-conviction", sr: "Уверење о некажњавању", tier: "standard" },
  { id: "bank-statement", mk: "Тековна сметка", en: "Bank account statement", sr: "Извод из банке", tier: "standard" },
  { id: "tax-cert", mk: "Уверение за даночен обврзник", en: "Tax registration certificate", sr: "Уверење о пореском обвезнику", tier: "standard" },
  { id: "passport", mk: "Пасош / Виза", en: "Passport / Visa", sr: "Пасош / Виза", tier: "standard" },
  { id: "diploma", mk: "Свидетелство / Диплома", en: "School certificate / Diploma", sr: "Сведочанство / Диплома", tier: "standard" },
  { id: "drivers-license", mk: "Возачка дозвола", en: "Driver's license", sr: "Возачка дозвола", tier: "standard" },
  { id: "death-cert", mk: "Извод на умрени", en: "Death certificate", sr: "Извод из матичне књиге умрлих", tier: "standard" },
  { id: "company-reg", mk: "Регистрација на фирма", en: "Company registration", sr: "Регистрација фирме", tier: "standard" },
  { id: "medical-record", mk: "Медицински извештај", en: "Medical record", sr: "Медицински извештај", tier: "standard" },
  { id: "divorce-decree", mk: "Одлука за развод", en: "Divorce decree", sr: "Одлука о разводу", tier: "complex" },
  { id: "notary-act", mk: "Нотарски акт", en: "Notary act", sr: "Нотарски акт", tier: "complex" },
  { id: "authorization", mk: "Полномошно", en: "Power of attorney / Authorization", sr: "Пуномоћје", tier: "complex" },
  { id: "court-decision", mk: "Судска одлука", en: "Court decision / Verdict", sr: "Судска одлука / Пресуда", tier: "complex" },
  { id: "contract", mk: "Договор", en: "Contract / Agreement", sr: "Уговор", tier: "complex" },
  { id: "technical-docs", mk: "Техничка документација", en: "Technical documentation", sr: "Техничка документација", tier: "per-word" },
  { id: "other", mk: "Друг документ", en: "Other document", sr: "Други документ", tier: "standard" },
];

export const PRICES = {
  standard: 400,
  complex: 500,
  expressSurcharge: 100,
  perWordEur: 0.08,
} as const;

export function calculatePrice(
  documentId: string,
  quantity: number,
  express: boolean,
): { total: number; unitPrice: number; tier: PricingTier } {
  const doc = documentTypes.find((d) => d.id === documentId);
  const tier = doc?.tier ?? "standard";

  if (tier === "per-word") {
    const unitPrice = PRICES.perWordEur;
    const total = Math.round(unitPrice * quantity * 100) / 100;
    return { total, unitPrice, tier };
  }

  const basePrice = PRICES[tier];
  const unitPrice = express ? basePrice + PRICES.expressSurcharge : basePrice;
  const total = unitPrice * quantity;
  return { total, unitPrice, tier };
}
