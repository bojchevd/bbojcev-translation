export type PricingTier = "standard" | "complex";

export type DocumentType = {
  id: string;
  mk: string;
  en: string;
  tier: PricingTier;
};

export const documentTypes: DocumentType[] = [
  { id: "birth-cert", mk: "Извод на родени", en: "Birth certificate", tier: "standard" },
  { id: "marriage-cert", mk: "Извод на венчани", en: "Marriage certificate", tier: "standard" },
  { id: "non-conviction", mk: "Уверение за неосудуван", en: "Certificate of non-conviction", tier: "standard" },
  { id: "bank-statement", mk: "Тековна сметка", en: "Bank account statement", tier: "standard" },
  { id: "tax-cert", mk: "Уверение за даночен обврзник", en: "Tax registration certificate", tier: "standard" },
  { id: "passport", mk: "Пасош / Виза", en: "Passport / Visa", tier: "standard" },
  { id: "diploma", mk: "Свидетелство / Диплома", en: "School certificate / Diploma", tier: "standard" },
  { id: "drivers-license", mk: "Возачка дозвола", en: "Driver's license", tier: "standard" },
  { id: "death-cert", mk: "Извод на умрени", en: "Death certificate", tier: "standard" },
  { id: "company-reg", mk: "Регистрација на фирма", en: "Company registration", tier: "standard" },
  { id: "medical-record", mk: "Медицински извештај", en: "Medical record", tier: "standard" },
  { id: "divorce-decree", mk: "Одлука за развод", en: "Divorce decree", tier: "complex" },
  { id: "notary-act", mk: "Нотарски акт", en: "Notary act", tier: "complex" },
  { id: "authorization", mk: "Полномошно", en: "Power of attorney / Authorization", tier: "complex" },
  { id: "court-decision", mk: "Судска одлука", en: "Court decision / Verdict", tier: "complex" },
  { id: "contract", mk: "Договор", en: "Contract / Agreement", tier: "complex" },
  { id: "other", mk: "Друг документ", en: "Other document", tier: "standard" },
];

export const PRICES = {
  standard: 400,
  complex: 500,
  expressSurcharge: 100,
} as const;

export function calculatePrice(
  documentId: string,
  pages: number,
  express: boolean,
): { total: number; perPage: number; tier: PricingTier } {
  const doc = documentTypes.find((d) => d.id === documentId);
  const tier = doc?.tier ?? "standard";
  const basePrice = PRICES[tier];
  const perPage = express ? basePrice + PRICES.expressSurcharge : basePrice;
  const total = perPage * pages;
  return { total, perPage, tier };
}
