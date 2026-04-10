export type Service = {
  slug: string;
  iconName: string;
  hasQuoteForm: boolean;
};

export const services: Service[] = [
  { slug: "court-translation", iconName: "scale", hasQuoteForm: true },
  { slug: "legal-translation", iconName: "briefcase", hasQuoteForm: true },
  { slug: "subtitling", iconName: "film", hasQuoteForm: false },
  { slug: "literary-translation", iconName: "book", hasQuoteForm: false },
  { slug: "general-translation", iconName: "document", hasQuoteForm: true },
  { slug: "mtpe", iconName: "cpu", hasQuoteForm: false },
];
