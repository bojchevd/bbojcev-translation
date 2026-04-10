export const CONTACT = {
  email: "biljanabojcev@gmail.com",
  phone: "+389 72 272 142",
  phoneRaw: "+38972272142",
  address: "Veles, North Macedonia",
} as const;

export const LANGUAGE_PAIRS = [
  { from: "en", to: "mk", label: { mk: "Англиски → Македонски", en: "English → Macedonian" } },
  { from: "mk", to: "en", label: { mk: "Македонски → Англиски", en: "Macedonian → English" } },
  { from: "sr", to: "mk", label: { mk: "Српски → Македонски", en: "Serbian → Macedonian" } },
  { from: "mk", to: "sr", label: { mk: "Македонски → Српски", en: "Macedonian → Serbian" } },
] as const;

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/portfolio", labelKey: "nav.portfolio" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;
