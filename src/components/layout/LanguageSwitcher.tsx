"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "mk", label: "MK", full: "Македонски" },
  { code: "en", label: "EN", full: "English" },
  { code: "sr", label: "SR", full: "Српски" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-medium tracking-wider text-muted hover:text-brown transition-colors border border-muted/30 rounded-sm px-3 py-1"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current.label}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 bg-white border border-linen rounded-sm shadow-lg py-1 min-w-[140px] z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                locale === l.code
                  ? "text-brown font-medium bg-linen"
                  : "text-muted hover:text-brown hover:bg-cream"
              }`}
            >
              <span className="font-medium">{l.label}</span>
              <span className="ml-2 text-xs">{l.full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
