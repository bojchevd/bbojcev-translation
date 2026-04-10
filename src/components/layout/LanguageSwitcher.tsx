"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "mk" ? "en" : "mk";
  const label = locale === "mk" ? "EN" : "MK";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/"));
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium tracking-wider text-muted hover:text-brown transition-colors border border-muted/30 rounded-sm px-3 py-1"
      aria-label={`Switch to ${otherLocale === "mk" ? "Macedonian" : "English"}`}
    >
      {label}
    </button>
  );
}
