"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-linen">
      <Container className="flex items-center justify-between h-16 sm:h-20">
        <Link
          href={`/${locale}`}
          className="font-serif text-xl sm:text-2xl text-brown tracking-wide"
        >
          Biljana V. Bojcev
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="text-sm tracking-wide text-muted hover:text-brown transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button href={`/${locale}/contact`} variant="primary">
            {t("nav.requestQuote")}
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-brown"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-cream border-t border-linen">
          <Container className="py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-wide text-muted hover:text-brown transition-colors py-2"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Button href={`/${locale}/contact`} variant="primary" className="mt-2">
              {t("nav.requestQuote")}
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
