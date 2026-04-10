# Translator Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (MK/EN) portfolio website for certified court translator Biljana Vasileva Bojcev that generates leads and ranks well in search.

**Architecture:** Next.js 15 App Router with next-intl for bilingual subdirectory routing (`/mk/`, `/en/`). Tailwind CSS v4 for styling with a Blush & Terracotta palette. Static pages served via Vercel with one serverless API route for contact form email via Resend.

**Tech Stack:** Next.js 15, Tailwind CSS v4, next-intl, Resend, Vercel

**Spec:** `docs/superpowers/specs/2026-04-10-translator-portfolio-design.md`

---

## File Map

```
biljana-translation-web/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.ts
├── .env.local                          # RESEND_API_KEY, CONTACT_EMAIL
├── .gitignore
├── public/
│   ├── robots.txt
│   ├── images/
│   │   └── placeholder-portrait.svg    # SVG placeholder for photo
│   └── icons/
│       └── (service icons as SVG)
├── messages/
│   ├── mk.json                         # All Macedonian strings
│   └── en.json                         # All English strings
├── src/
│   ├── i18n/
│   │   ├── routing.ts                  # next-intl locale routing config
│   │   └── request.ts                  # next-intl server request config
│   ├── middleware.ts                    # next-intl middleware for locale redirect
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (minimal, wraps [locale])
│   │   ├── [locale]/
│   │   │   ├── layout.tsx              # Locale layout: html lang, fonts, Header, Footer, JSON-LD
│   │   │   ├── page.tsx                # Home page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx            # Services landing
│   │   │   │   ├── court-translation/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── legal-translation/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── subtitling/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── literary-translation/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── general-translation/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── mtpe/
│   │   │   │       └── page.tsx
│   │   │   ├── portfolio/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts            # POST handler: validate + send email via Resend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Logo, nav, language switcher, mobile menu
│   │   │   ├── Footer.tsx              # Links, contact info, copyright
│   │   │   └── LanguageSwitcher.tsx    # MK/EN toggle
│   │   ├── home/
│   │   │   ├── Hero.tsx                # Asymmetric overlap hero
│   │   │   ├── TrustBar.tsx            # Stats icons row
│   │   │   ├── ServicesOverview.tsx     # 6 service cards grid
│   │   │   ├── ClientLogos.tsx         # Disney, Netflix, NatGeo etc.
│   │   │   ├── Testimonials.tsx        # Placeholder testimonials
│   │   │   └── CtaBand.tsx             # Final CTA section
│   │   ├── about/
│   │   │   ├── Bio.tsx                 # Professional bio narrative
│   │   │   ├── Timeline.tsx            # Career milestones
│   │   │   └── Skills.tsx              # Languages, CAT tools, certifications
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx         # Card for services landing page
│   │   │   ├── ServicePageLayout.tsx   # Shared layout for individual service pages
│   │   │   └── FaqSection.tsx          # FAQ accordion with JSON-LD
│   │   ├── portfolio/
│   │   │   ├── LogoShowcase.tsx        # Studio/channel logos with descriptions
│   │   │   └── ExperienceGrid.tsx      # Industry categories grid
│   │   ├── contact/
│   │   │   ├── QuoteForm.tsx           # Document translation quote form
│   │   │   ├── QuoteCalculator.tsx     # Interactive price estimator
│   │   │   └── ContactInfo.tsx         # Direct contact: email, phone, WhatsApp, Viber
│   │   └── ui/
│   │       ├── Button.tsx              # Primary/secondary/outline variants
│   │       ├── SectionHeading.tsx      # Consistent section titles
│   │       └── Container.tsx           # Max-width centered container
│   ├── lib/
│   │   ├── pricing.ts                  # Pricing tiers, document classification, calculator logic
│   │   ├── metadata.ts                 # generateMetadata helpers, JSON-LD builders
│   │   └── constants.ts               # Contact info, social links, language pairs
│   └── data/
│       └── services.ts                 # Service definitions (slugs, icons, tiers, document lists)
```

---

### Task 1: Project Scaffold & Configuration

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.ts`, `tsconfig.json`, `.gitignore`, `.env.local`
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Create: `messages/mk.json`, `messages/en.json`
- Create: `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

- [ ] **Step 1: Initialize Next.js 15 project**

```bash
cd /c/Projects/biljana-translation-web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

Accept defaults. This scaffolds Next.js 15 with Tailwind v4, App Router, TypeScript, `src/` directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl resend
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Configure next-intl routing**

Create `src/i18n/routing.ts`:
```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["mk", "en"],
  defaultLocale: "mk",
});
```

Create `src/i18n/request.ts`:
```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "mk" | "en")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create middleware for locale redirect**

Create `src/middleware.ts`:
```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(mk|en)/:path*"],
};
```

- [ ] **Step 5: Update next.config.ts**

Replace `next.config.ts` contents:
```typescript
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Configure Tailwind with custom theme**

Replace `tailwind.config.ts` (or the relevant CSS file — Tailwind v4 uses CSS-based config). In `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-cream: #faf5f0;
  --color-linen: #f0e8df;
  --color-brown: #4a3728;
  --color-terracotta: #c4956a;
  --color-muted: #9a7e68;
  --color-brown-light: #6b5445;

  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

- [ ] **Step 7: Create initial translation files**

Create `messages/mk.json`:
```json
{
  "metadata": {
    "title": "Биљана Василева Бојчев — Овластен судски преведувач",
    "description": "Овластен судски преведувач со 30+ години искуство. Превод на документи, титлување, правен превод. Велес, Северна Македонија."
  },
  "nav": {
    "home": "Почетна",
    "about": "За мене",
    "services": "Услуги",
    "portfolio": "Портфолио",
    "contact": "Контакт",
    "requestQuote": "Побарај понуда"
  },
  "hero": {
    "name": "Биљана Василева Бојчев",
    "title": "Овластен судски преведувач",
    "tagline": "Повеќе од 30 години искуство во превод на документи, титлување и локализација",
    "cta": "Побарај понуда",
    "learnMore": "Дознај повеќе"
  },
  "trustBar": {
    "years": "30+ години искуство",
    "languages": "5 јазици",
    "certified": "Судски овластен",
    "projects": "1000+ проекти"
  },
  "footer": {
    "copyright": "© {year} Биљана Василева Бојчев. Сите права задржани.",
    "location": "Велес, Северна Македонија"
  }
}
```

Create `messages/en.json`:
```json
{
  "metadata": {
    "title": "Biljana Vasileva Bojcev — Certified Court Translator",
    "description": "Certified court translator with 30+ years of experience. Document translation, subtitling, legal translation. Veles, North Macedonia."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "requestQuote": "Request Quote"
  },
  "hero": {
    "name": "Biljana Vasileva Bojcev",
    "title": "Certified Court Translator",
    "tagline": "Over 30 years of experience in document translation, subtitling, and localization",
    "cta": "Request Quote",
    "learnMore": "Learn More"
  },
  "trustBar": {
    "years": "30+ Years Experience",
    "languages": "5 Languages",
    "certified": "Court Certified",
    "projects": "1000+ Projects"
  },
  "footer": {
    "copyright": "© {year} Biljana Vasileva Bojcev. All rights reserved.",
    "location": "Veles, North Macedonia"
  }
}
```

- [ ] **Step 8: Create root layout and locale layout**

Replace `src/app/layout.tsx`:
```tsx
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

Create `src/app/[locale]/layout.tsx`:
```tsx
import type { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-brown font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Create minimal home page**

Replace `src/app/[locale]/page.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // We need to await params in Next.js 15
  return <HomePageContent params={params} />;
}

async function HomePageContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-serif text-4xl text-brown">
        Biljana Vasileva Bojcev
      </h1>
    </main>
  );
}
```

- [ ] **Step 10: Create .env.local and .gitignore update**

Create `.env.local`:
```
RESEND_API_KEY=re_placeholder
CONTACT_EMAIL=biljanabojcev@gmail.com
```

Ensure `.gitignore` includes:
```
.env.local
.superpowers/
```

- [ ] **Step 11: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000` — should redirect to `/mk/`. Verify:
- No errors in console
- Page renders with "Biljana Vasileva Bojcev"
- Manually navigate to `/en/` — should also work

- [ ] **Step 12: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 project with next-intl bilingual routing"
```

---

### Task 2: UI Primitives & Layout Shell (Header + Footer)

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Container.tsx`
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/LanguageSwitcher.tsx`
- Create: `src/lib/constants.ts`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create constants**

Create `src/lib/constants.ts`:
```typescript
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
  { from: "hr", to: "mk", label: { mk: "Хрватски → Македонски", en: "Croatian → Macedonian" } },
  { from: "bs", to: "mk", label: { mk: "Босански → Македонски", en: "Bosnian → Macedonian" } },
] as const;

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/portfolio", labelKey: "nav.portfolio" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;
```

- [ ] **Step 2: Create UI primitives**

Create `src/components/ui/Container.tsx`:
```tsx
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

Create `src/components/ui/Button.tsx`:
```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary: "bg-brown text-cream hover:bg-brown-light transition-colors",
  secondary: "bg-terracotta text-cream hover:opacity-90 transition-opacity",
  outline: "border-2 border-brown text-brown hover:bg-brown hover:text-cream transition-colors",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-6 py-3 font-medium rounded-sm text-sm tracking-wide ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
}
```

Create `src/components/ui/SectionHeading.tsx`:
```tsx
export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="font-serif text-3xl sm:text-4xl text-brown mb-3">
        {title}
      </h2>
      {subtitle && <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`mt-4 h-0.5 w-16 bg-terracotta ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
```

- [ ] **Step 3: Create LanguageSwitcher**

Create `src/components/layout/LanguageSwitcher.tsx`:
```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

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
```

- [ ] **Step 4: Create Header with mobile menu**

Create `src/components/layout/Header.tsx`:
```tsx
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
        <Link href={`/${locale}`} className="font-serif text-xl sm:text-2xl text-brown tracking-wide">
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
```

- [ ] **Step 5: Create Footer**

Create `src/components/layout/Footer.tsx`:
```tsx
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown text-cream/80">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl text-cream mb-3">Biljana V. Bojcev</p>
            <p className="text-sm leading-relaxed">{t("hero.title")}</p>
            <p className="text-sm mt-1">{t("footer.location")}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-medium text-cream mb-3 text-sm tracking-wider uppercase">
              {locale === "mk" ? "Навигација" : "Navigation"}
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    className="text-sm hover:text-cream transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-medium text-cream mb-3 text-sm tracking-wider uppercase">
              {locale === "mk" ? "Контакт" : "Contact"}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-cream transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-cream transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.phoneRaw.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`viber://chat?number=${CONTACT.phoneRaw.replace("+", "%2B")}`}
                  className="hover:text-cream transition-colors"
                >
                  Viber
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-center text-xs">
          {t("footer.copyright", { year })}
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Wire Header and Footer into locale layout**

Update `src/app/[locale]/layout.tsx` — add Header and Footer wrapping `{children}`:
```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ... keep existing imports

// Inside the return, wrap children:
<body className="bg-cream text-brown font-sans antialiased">
  <NextIntlClientProvider messages={messages}>
    <Header />
    <main>{children}</main>
    <Footer />
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 7: Verify in browser**

```bash
npm run dev
```

Check: Header with nav links, language switcher toggles between `/mk/` and `/en/`, mobile menu opens/closes, Footer renders with contact info. Both languages work.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add UI primitives, Header with mobile menu, Footer, language switcher"
```

---

### Task 3: Home Page

**Files:**
- Create: `src/components/home/Hero.tsx`, `src/components/home/TrustBar.tsx`, `src/components/home/ServicesOverview.tsx`, `src/components/home/ClientLogos.tsx`, `src/components/home/Testimonials.tsx`, `src/components/home/CtaBand.tsx`
- Create: `src/data/services.ts`
- Create: `public/images/placeholder-portrait.svg`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Create service data definitions**

Create `src/data/services.ts`:
```typescript
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
```

- [ ] **Step 2: Add home page translation strings**

Add to `messages/en.json` (and corresponding Macedonian in `mk.json`):
```json
{
  "services": {
    "court-translation": {
      "title": "Court Translation",
      "short": "Certified sworn translations for all official documents with full legal validity."
    },
    "legal-translation": {
      "title": "Legal & Business Translation",
      "short": "Contracts, regulations, court decisions, business plans, and financial documents."
    },
    "subtitling": {
      "title": "Subtitling & Audiovisual",
      "short": "Professional subtitling for film, series, documentaries, and interviews."
    },
    "literary-translation": {
      "title": "Literary Translation",
      "short": "Book translation across genres — health, science, history, and more."
    },
    "general-translation": {
      "title": "General Translation",
      "short": "Medical, academic, technical, IT, and personal document translation."
    },
    "mtpe": {
      "title": "MT Post-Editing",
      "short": "Professional review and editing of machine-translated content for publication quality."
    }
  },
  "home": {
    "servicesTitle": "Services",
    "servicesSubtitle": "Professional translation services tailored to your needs",
    "clientsTitle": "Trusted By",
    "clientsSubtitle": "Working with leading studios and institutions worldwide",
    "testimonialsTitle": "Client Testimonials",
    "ctaTitle": "Need a certified translation?",
    "ctaSubtitle": "Get a free quote for your document translation project",
    "ctaButton": "Request Quote"
  }
}
```

Add corresponding Macedonian translations to `mk.json`:
```json
{
  "services": {
    "court-translation": {
      "title": "Судски превод",
      "short": "Овластен судски превод на сите официјални документи со полна правна важност."
    },
    "legal-translation": {
      "title": "Правен и деловен превод",
      "short": "Договори, регулативи, судски одлуки, бизнис планови и финансиски документи."
    },
    "subtitling": {
      "title": "Титлување и аудиовизуелен превод",
      "short": "Професионално титлување за филмови, серии, документарци и интервјуа."
    },
    "literary-translation": {
      "title": "Книжевен превод",
      "short": "Превод на книги од различни жанрови — здравје, наука, историја и повеќе."
    },
    "general-translation": {
      "title": "Општ превод",
      "short": "Медицински, академски, технички, ИТ и превод на лични документи."
    },
    "mtpe": {
      "title": "МТ пост-едитирање",
      "short": "Професионална ревизија и уредување на машински преведена содржина."
    }
  },
  "home": {
    "servicesTitle": "Услуги",
    "servicesSubtitle": "Професионални преведувачки услуги прилагодени на вашите потреби",
    "clientsTitle": "Соработка со",
    "clientsSubtitle": "Работа со водечки студија и институции ширум светот",
    "testimonialsTitle": "Мислења од клиенти",
    "ctaTitle": "Ви треба овластен превод?",
    "ctaSubtitle": "Добијте бесплатна понуда за вашиот проект за превод на документи",
    "ctaButton": "Побарај понуда"
  }
}
```

- [ ] **Step 3: Create placeholder portrait SVG**

Create `public/images/placeholder-portrait.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" fill="none">
  <rect width="400" height="500" rx="8" fill="#f0e8df"/>
  <circle cx="200" cy="180" r="70" fill="#c4956a" opacity="0.3"/>
  <path d="M120 500 V380 C120 330 160 300 200 300 C240 300 280 330 280 380 V500" fill="#c4956a" opacity="0.2"/>
  <text x="200" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#9a7e68">Photo placeholder</text>
</svg>
```

- [ ] **Step 4: Create Hero component**

Create `src/components/home/Hero.tsx`:
```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-3">
              {t("title")}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brown leading-tight mb-6">
              {t("name")}
            </h1>
            <p className="text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={`/${locale}/contact`} variant="primary">
                {t("cta")}
              </Button>
              <Button href="#services" variant="outline">
                {t("learnMore")}
              </Button>
            </div>
          </div>

          {/* Photo — asymmetric overlap */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto w-64 sm:w-80 lg:w-full max-w-md">
              <div className="absolute inset-0 bg-terracotta/10 rounded-lg translate-x-4 translate-y-4" />
              <div className="relative bg-linen rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/placeholder-portrait.svg"
                  alt={t("name")}
                  width={400}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Overlapping credentials card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 sm:p-5">
                <p className="font-serif text-brown text-sm sm:text-base font-semibold">{t("title")}</p>
                <p className="text-muted text-xs sm:text-sm mt-1">
                  {locale === "mk" ? "од 1996 година" : "Since 1996"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create TrustBar component**

Create `src/components/home/TrustBar.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const stats = [
  { key: "years", icon: "📅" },
  { key: "languages", icon: "🌍" },
  { key: "certified", icon: "✓" },
  { key: "projects", icon: "📄" },
] as const;

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="bg-linen py-10">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-sm sm:text-base font-medium text-brown">{t(stat.key)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Note: We're using emoji placeholders for icons here. These should be replaced with proper SVG icons during polish, but they communicate the concept and are functional.

- [ ] **Step 6: Create ServicesOverview component**

Create `src/components/home/ServicesOverview.tsx`:
```tsx
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesOverview() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          title={t("home.servicesTitle")}
          subtitle={t("home.servicesSubtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="group block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-linen"
            >
              <h3 className="font-serif text-lg text-brown mb-2 group-hover:text-terracotta transition-colors">
                {t(`services.${service.slug}.title`)}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {t(`services.${service.slug}.short`)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Create ClientLogos component**

Create `src/components/home/ClientLogos.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const clients = [
  "Disney", "Netflix", "National Geographic", "AXN", "Viasat", "TV1000",
];

export function ClientLogos() {
  const t = useTranslations("home");

  return (
    <section className="bg-linen py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {clients.map((name) => (
            <div
              key={name}
              className="text-muted font-serif text-lg sm:text-xl tracking-wide opacity-60 hover:opacity-100 transition-opacity"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-8">
          {t("clientsSubtitle")}
        </p>
      </Container>
    </section>
  );
}
```

Note: Client names rendered as styled text for now — can be replaced with actual logos later.

- [ ] **Step 8: Create Testimonials component**

Create `src/components/home/Testimonials.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    mk: "Професионален и брз превод. Секогаш точна и прецизна.",
    en: "Professional and fast translation. Always accurate and precise.",
    author: "M.S.",
    role: { mk: "Правна фирма, Скопје", en: "Law firm, Skopje" },
  },
  {
    mk: "Одличен квалитет на титлување. Ја препорачувам без резерва.",
    en: "Excellent subtitling quality. I recommend her without reservation.",
    author: "D.K.",
    role: { mk: "Продуцент, Белград", en: "Producer, Belgrade" },
  },
  {
    mk: "Соработуваме повеќе од 10 години. Секогаш навремена достава.",
    en: "We have been working together for over 10 years. Always on-time delivery.",
    author: "T.P.",
    role: { mk: "Преведувачка агенција", en: "Translation agency" },
  },
];

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale() as "mk" | "en";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("testimonialsTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-linen"
            >
              <p className="text-muted text-sm leading-relaxed italic mb-4">
                &ldquo;{locale === "mk" ? item.mk : item.en}&rdquo;
              </p>
              <footer className="text-xs">
                <p className="font-medium text-brown">{item.author}</p>
                <p className="text-muted">{item.role[locale]}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: Create CtaBand component**

Create `src/components/home/CtaBand.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-brown py-16">
      <Container className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-cream/70 mb-8 text-lg">{t("ctaSubtitle")}</p>
        <Button href={`/${locale}/contact`} variant="secondary">
          {t("ctaButton")}
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 10: Assemble home page**

Replace `src/app/[locale]/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <ClientLogos />
      <Testimonials />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 11: Verify in browser**

```bash
npm run dev
```

Check both `/mk/` and `/en/`. Verify: Hero renders with placeholder photo, trust bar shows 4 stats, 6 service cards link correctly, client names display, testimonials render, CTA band at bottom. Check mobile responsiveness.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: build complete home page with hero, trust bar, services, clients, testimonials, CTA"
```

---

### Task 4: About Page

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/components/about/Bio.tsx`, `src/components/about/Timeline.tsx`, `src/components/about/Skills.tsx`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Add about page translations**

Add to `messages/en.json`:
```json
{
  "about": {
    "pageTitle": "About Biljana",
    "bioTitle": "Professional Background",
    "bio": "With over 30 years of experience in translation and language services, Biljana Vasileva Bojcev is one of North Macedonia's most experienced certified court translators. Authorized by the Ministry of Justice since 1996, she provides sworn translations that carry full legal validity for courts, government institutions, embassies, and private clients.\n\nBeyond court translation, Biljana's career spans subtitling for major international studios including Disney and Netflix, EU document translation for the Sector of European Integration, and literary translation across multiple genres. Her unique combination of legal precision and creative linguistic skill makes her a trusted partner for any translation need.\n\nBased in Veles, North Macedonia, Biljana works with clients locally and internationally, delivering quality translations in English, Serbian, Croatian, Bosnian, and Macedonian.",
    "timelineTitle": "Career Milestones",
    "skillsTitle": "Languages & Tools",
    "languagesTitle": "Language Proficiency",
    "toolsTitle": "CAT Tools",
    "certificationsTitle": "Certifications",
    "publicationsTitle": "Publications & Conferences"
  }
}
```

Add corresponding Macedonian to `mk.json`:
```json
{
  "about": {
    "pageTitle": "За Биљана",
    "bioTitle": "Професионално искуство",
    "bio": "Со повеќе од 30 години искуство во превод и јазични услуги, Биљана Василева Бојчев е еден од најискусните овластени судски преведувачи во Северна Македонија. Овластена од Министерството за правда од 1996 година, таа обезбедува судски преводи со полна правна важност за судови, државни институции, амбасади и приватни клиенти.\n\nПокрај судскиот превод, кариерата на Биљана вклучува титлување за големи меѓународни студија вклучувајќи Disney и Netflix, превод на ЕУ документи за Секторот за европска интеграција, и книжевен превод од различни жанрови. Нејзината уникатна комбинација на правна прецизност и креативна лингвистичка вештина ја прави доверлив партнер за секоја преведувачка потреба.\n\nЛоцирана во Велес, Северна Македонија, Биљана работи со клиенти локално и меѓународно, обезбедувајќи квалитетни преводи на англиски, српски, хрватски, босански и македонски јазик.",
    "timelineTitle": "Кариерни пресвртници",
    "skillsTitle": "Јазици и алатки",
    "languagesTitle": "Познавање на јазици",
    "toolsTitle": "CAT алатки",
    "certificationsTitle": "Сертификати",
    "publicationsTitle": "Публикации и конференции"
  }
}
```

- [ ] **Step 2: Create Bio component**

Create `src/components/about/Bio.tsx`:
```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Bio() {
  const t = useTranslations("about");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Photo */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-terracotta/10 rounded-lg translate-x-3 translate-y-3" />
              <Image
                src="/images/placeholder-portrait.svg"
                alt="Biljana Vasileva Bojcev"
                width={400}
                height={500}
                className="relative rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-3xl text-brown mb-6">{t("bioTitle")}</h2>
            <div className="text-muted leading-relaxed space-y-4">
              {t("bio").split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create Timeline component**

Create `src/components/about/Timeline.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const milestones = [
  {
    year: "1996",
    mk: "Дипломира на Филолошкиот факултет, УКИМ Скопје. Овластена како судски преведувач за англиски јазик.",
    en: "Graduated from Faculty of Philology, Ss. Cyril and Methodius University. Authorized as court translator for English.",
  },
  {
    year: "2001",
    mk: "Започнува со настава по англиски јазик во средно образование.",
    en: "Begins teaching English in secondary education.",
  },
  {
    year: "2004",
    mk: "Превод на ЕУ документи за Секторот за европска интеграција при Владата на РМ.",
    en: "EU document translation for the Sector of European Integration, Government of North Macedonia.",
  },
  {
    year: "2007",
    mk: "Основа TRANSLATUM — преведувачка компанија. Почнува со титлување и локализација.",
    en: "Founds TRANSLATUM translation company. Starts subtitling and localization work.",
  },
  {
    year: "2010",
    mk: "Овластена како судски преведувач за српски јазик. Присуствува на меѓународни преведувачки конференции.",
    en: "Authorized as court translator for Serbian. Attends international translation conferences.",
  },
  {
    year: "2019",
    mk: "Продолжува како независен преведувач. Титлување за Disney, Netflix, National Geographic.",
    en: "Continues as independent freelance translator. Subtitling for Disney, Netflix, National Geographic.",
  },
];

export function Timeline() {
  const t = useTranslations("about");
  const locale = useLocale() as "mk" | "en";

  return (
    <section className="bg-linen py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("timelineTitle")} />
        <div className="max-w-3xl mx-auto">
          {milestones.map((item, i) => (
            <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-brown">{item.year}</span>
                </div>
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-terracotta/20 mt-2" />
                )}
              </div>
              <div className="pt-2.5 pb-4">
                <p className="text-muted text-sm leading-relaxed">{item[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create Skills component**

Create `src/components/about/Skills.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const languages = [
  { name: "Macedonian", mk: "Македонски", level: "Native", mkLevel: "Мајчин" },
  { name: "English", mk: "Англиски", level: "C2 — Proficient", mkLevel: "C2 — Одлично" },
  { name: "Serbian", mk: "Српски", level: "C2 — Proficient", mkLevel: "C2 — Одлично" },
  { name: "Croatian", mk: "Хрватски", level: "C2 — Proficient", mkLevel: "C2 — Одлично" },
  { name: "Bosnian", mk: "Босански", level: "C2 — Proficient", mkLevel: "C2 — Одлично" },
];

const catTools = [
  "SDL Trados Studio 11", "Trados 7 Freelance", "Idiom Workbench",
  "Wordfast", "Smartling", "MemoQ",
];

const certifications = [
  {
    en: "Authorized Court Translator — English ↔ Macedonian (Ministry of Justice, since 1996)",
    mk: "Овластен судски преведувач — Англиски ↔ Македонски (Министерство за правда, од 1996)",
  },
  {
    en: "Authorized Court Translator — Serbian ↔ Macedonian (Ministry of Justice, since 2010)",
    mk: "Овластен судски преведувач — Српски ↔ Македонски (Министерство за правда, од 2010)",
  },
  {
    en: "BA in English Language and Literature — Ss. Cyril and Methodius University, Skopje",
    mk: "Дипломиран англиски јазик и книжевност — УКИМ, Скопје",
  },
];

export function Skills() {
  const t = useTranslations("about");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("skillsTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Languages */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("languagesTitle")}</h3>
            <ul className="space-y-3">
              {languages.map((lang) => (
                <LanguageRow key={lang.name} lang={lang} />
              ))}
            </ul>
          </div>

          {/* CAT Tools */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("toolsTitle")}</h3>
            <ul className="space-y-2">
              {catTools.map((tool) => (
                <li key={tool} className="text-muted text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-linen">
            <h3 className="font-serif text-xl text-brown mb-4">{t("certificationsTitle")}</h3>
            <CertificationsList certifications={certifications} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function LanguageRow({ lang }: { lang: typeof languages[number] }) {
  // Uses client locale detection via CSS — both values rendered, one hidden
  return (
    <li className="flex justify-between items-center text-sm">
      <span className="text-brown font-medium">{lang.name}</span>
      <span className="text-muted">{lang.level}</span>
    </li>
  );
}

function CertificationsList({ certifications }: { certifications: { en: string; mk: string }[] }) {
  return (
    <ul className="space-y-3">
      {certifications.map((cert, i) => (
        <li key={i} className="text-muted text-sm leading-relaxed flex gap-2">
          <span className="text-terracotta shrink-0 mt-1">✓</span>
          <span>{cert.en}</span>
        </li>
      ))}
    </ul>
  );
}
```

Note: The LanguageRow and CertificationsList render English by default. The locale-aware rendering needs to use `useLocale()` — update during implementation to read locale and pick `lang.name` vs `lang.mk` and `cert.en` vs `cert.mk` accordingly. These components should be `"use client"` or the parent should pass the locale.

- [ ] **Step 5: Assemble about page**

Create `src/app/[locale]/about/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Bio } from "@/components/about/Bio";
import { Timeline } from "@/components/about/Timeline";
import { Skills } from "@/components/about/Skills";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("pageTitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Bio />
      <Timeline />
      <Skills />
    </>
  );
}
```

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Navigate to `/mk/about` and `/en/about`. Verify: bio with placeholder photo, timeline renders chronologically, skills grid shows languages/tools/certifications. Check mobile layout.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: build About page with bio, career timeline, and skills sections"
```

---

### Task 5: Services Landing & Individual Service Pages

**Files:**
- Create: `src/app/[locale]/services/page.tsx`
- Create: `src/app/[locale]/services/court-translation/page.tsx`
- Create: `src/app/[locale]/services/legal-translation/page.tsx`
- Create: `src/app/[locale]/services/subtitling/page.tsx`
- Create: `src/app/[locale]/services/literary-translation/page.tsx`
- Create: `src/app/[locale]/services/general-translation/page.tsx`
- Create: `src/app/[locale]/services/mtpe/page.tsx`
- Create: `src/components/services/ServiceCard.tsx`, `src/components/services/ServicePageLayout.tsx`, `src/components/services/FaqSection.tsx`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Add service page translations**

Add to `messages/en.json` (extend the existing `services` key with full page content):
```json
{
  "services": {
    "pageTitle": "Our Services",
    "pageSubtitle": "Comprehensive translation services for every need",
    "court-translation": {
      "title": "Court Translation",
      "short": "Certified sworn translations for all official documents with full legal validity.",
      "description": "As an authorized court translator certified by the Ministry of Justice of North Macedonia since 1996, Biljana provides sworn translations that are legally valid for courts, government institutions, embassies, universities, and all official purposes.\n\nEvery translated document is stamped and signed with the official court translator seal, ensuring full legal recognition in North Macedonia and internationally.",
      "documentsTitle": "Documents We Translate",
      "documents": [
        "Birth certificates (Извод на родени)",
        "Marriage certificates (Извод на венчани)",
        "Certificate of non-conviction (Уверение за неосудуван)",
        "Bank account statements (Тековна сметка)",
        "Tax registration certificates (Уверение за даночен обврзник)",
        "Divorce decrees (Одлука за развод)",
        "Passports and visa documents (Пасош, виза)",
        "School certificates and diplomas (Свидетелства, дипломи)",
        "Notary acts (Нотарски акт)",
        "Power of attorney / Authorization (Полномошно)",
        "Court decisions and verdicts",
        "Company registration documents",
        "Medical records and reports",
        "Driver's licenses",
        "Death certificates"
      ],
      "faq": [
        {
          "q": "How much does court translation cost?",
          "a": "Standard court document translation costs 400 MKD per page. Complex legal documents such as divorce decrees, notary acts, and authorizations cost 500 MKD per page. Express delivery is available for an additional 100 MKD per page."
        },
        {
          "q": "How long does court translation take?",
          "a": "Standard delivery is typically 1-3 business days depending on document length and complexity. Express delivery is available for urgent requests."
        },
        {
          "q": "Is the translation legally valid?",
          "a": "Yes. As an authorized court translator certified by the Ministry of Justice, all translations carry an official stamp and signature with full legal validity for courts, embassies, and government institutions."
        },
        {
          "q": "What languages do you translate?",
          "a": "Court translations are available between Macedonian, English, and Serbian in all directions. All language pairs carry the same legal validity."
        }
      ]
    },
    "legal-translation": {
      "title": "Legal & Business Translation",
      "short": "Contracts, regulations, court decisions, business plans, and financial documents.",
      "description": "Professional translation of legal and business documents requiring specialized terminology and absolute accuracy. With experience translating EU directives, government regulations, and corporate documents, Biljana ensures your legal translations meet the highest standards.\n\nFrom contracts and court decisions to financial reports and business plans, every translation preserves the precise legal meaning of the original document.",
      "documentsTitle": "Document Types",
      "documents": [
        "Contracts and agreements",
        "Laws and regulations",
        "EU directives and decisions",
        "Court decisions and verdicts",
        "Business plans",
        "Financial reports and balance sheets",
        "Corporate registration documents",
        "Tender documentation",
        "Insurance documents",
        "Compliance documentation"
      ],
      "faq": [
        {
          "q": "Do you have experience with EU legal documents?",
          "a": "Yes. Biljana has extensive experience translating EU directives, regulations, and CELEX documents for the Sector of European Integration of the Government of North Macedonia."
        },
        {
          "q": "Can you handle large-volume legal translation projects?",
          "a": "Yes. With decades of experience and professional CAT tools (Trados, MemoQ, Wordfast), large-volume projects are handled efficiently with consistent terminology."
        }
      ]
    },
    "subtitling": {
      "title": "Subtitling & Audiovisual",
      "short": "Professional subtitling for film, series, documentaries, and interviews.",
      "description": "Professional subtitling services for the entertainment industry. Biljana has subtitled content for some of the world's biggest studios and channels, combining linguistic precision with creative adaptation that respects the original tone and intent.\n\nFrom blockbuster films to documentary series, each subtitle is crafted to deliver the best viewing experience while maintaining accuracy and natural flow in the target language.",
      "clientsTitle": "Studios & Channels",
      "clients": ["Disney", "Netflix", "National Geographic", "AXN", "Viasat", "TV1000"],
      "contactNote": "For subtitling inquiries, please contact directly via email or WhatsApp."
    },
    "literary-translation": {
      "title": "Literary Translation",
      "short": "Book translation across genres — health, science, history, and more.",
      "description": "Literary translation that captures not just meaning but voice, style, and cultural nuance. Biljana translates books across a wide range of genres, bringing international works to Macedonian readers while preserving the author's intent and literary quality.\n\nGenres include health and wellness, science, history, sport, chemistry, and more.",
      "contactNote": "For literary translation inquiries, please contact directly via email or WhatsApp."
    },
    "general-translation": {
      "title": "General Translation",
      "short": "Medical, academic, technical, IT, and personal document translation.",
      "description": "Comprehensive translation services for documents across all industries and subject areas. Whether you need medical records translated, academic papers localized, or technical manuals adapted, Biljana brings specialized knowledge and professional precision to every project.",
      "documentsTitle": "Areas of Expertise",
      "documents": [
        "Medical and pharmaceutical documents",
        "Academic papers and research",
        "Technical manuals (machinery, appliances, electronics)",
        "IT and software localization",
        "Patent documentation",
        "Telecommunications and broadcasting",
        "Questionnaires and surveys",
        "Personal correspondence",
        "Website content"
      ],
      "faq": [
        {
          "q": "What subject areas do you cover?",
          "a": "Medical/pharmaceutical, academic, technical (manuals for machinery, household appliances, cameras, printers), IT/software, patents, telecommunications, broadcasting, and general personal documents."
        },
        {
          "q": "Do you use translation memory tools?",
          "a": "Yes. Professional CAT tools including SDL Trados Studio, MemoQ, Wordfast, and Smartling ensure consistency across large projects and reduce turnaround time."
        }
      ]
    },
    "mtpe": {
      "title": "MT Post-Editing",
      "short": "Professional review and editing of machine-translated content for publication quality.",
      "description": "Machine Translation Post-Editing (MTPE) combines the speed of machine translation with the quality assurance of a professional human translator. Biljana reviews and refines machine-translated content to ensure it meets publication standards — correcting errors, improving fluency, and ensuring terminology consistency.\n\nIdeal for large-volume projects where speed is essential without compromising quality.",
      "contactNote": "For MTPE project inquiries, please contact directly via email or WhatsApp."
    }
  }
}
```

Add corresponding Macedonian translations to `mk.json`. This is a large block — translate all the above strings into Macedonian, following the same JSON structure. Key translations:
- "Our Services" → "Наши услуги"
- "Court Translation" → "Судски превод"
- Document names should be in Macedonian first (they already are in the document list, reverse the order)
- FAQ questions and answers translated into natural Macedonian

- [ ] **Step 2: Create ServiceCard component**

Create `src/components/services/ServiceCard.tsx`:
```tsx
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function ServiceCard({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/services/${slug}`}
      className="group block bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all border border-linen hover:border-terracotta/30"
    >
      <h3 className="font-serif text-xl text-brown mb-3 group-hover:text-terracotta transition-colors">
        {t(`${slug}.title`)}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {t(`${slug}.short`)}
      </p>
      <span className="inline-block mt-4 text-terracotta text-sm font-medium group-hover:translate-x-1 transition-transform">
        {locale === "mk" ? "Дознај повеќе →" : "Learn more →"}
      </span>
    </Link>
  );
}
```

- [ ] **Step 3: Create FaqSection component with JSON-LD**

Create `src/components/services/FaqSection.tsx`:
```tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqItem = { q: string; a: string };

export function FaqSection({
  items,
  title,
}: {
  items: FaqItem[];
  title: string;
}) {
  return (
    <section className="py-12">
      <SectionHeading title={title} />

      {/* JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, i) => (
          <FaqAccordion key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-linen rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-linen/50 transition-colors"
      >
        <span className="font-medium text-brown text-sm pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-muted shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-muted text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create ServicePageLayout component**

Create `src/components/services/ServicePageLayout.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "./FaqSection";

type ServicePageLayoutProps = {
  slug: string;
};

export function ServicePageLayout({ slug }: ServicePageLayoutProps) {
  const t = useTranslations("services");
  const locale = useLocale();

  const hasDocuments = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasFaq = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasQuoteForm = ["court-translation", "legal-translation", "general-translation"].includes(slug);
  const hasContactNote = ["subtitling", "literary-translation", "mtpe"].includes(slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-6">
            {t(`${slug}.title`)}
          </h1>
          <div className="text-muted leading-relaxed max-w-3xl space-y-4">
            {t(`${slug}.description`).split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Document types list */}
      {hasDocuments && (
        <section className="py-16">
          <Container>
            <h2 className="font-serif text-2xl text-brown mb-8">
              {t(`${slug}.documentsTitle`)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
              {(t.raw(`${slug}.documents`) as string[]).map((doc, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-1.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Subtitling clients */}
      {slug === "subtitling" && (
        <section className="py-16">
          <Container>
            <h2 className="font-serif text-2xl text-brown mb-8">
              {t("subtitling.clientsTitle")}
            </h2>
            <div className="flex flex-wrap gap-6">
              {(t.raw("subtitling.clients") as string[]).map((client) => (
                <div
                  key={client}
                  className="bg-linen px-6 py-3 rounded-lg font-serif text-brown text-lg"
                >
                  {client}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {hasFaq && (
        <Container>
          <FaqSection
            items={t.raw(`${slug}.faq`) as { q: string; a: string }[]}
            title={locale === "mk" ? "Најчесто поставувани прашања" : "Frequently Asked Questions"}
          />
        </Container>
      )}

      {/* CTA */}
      <section className="bg-linen py-16">
        <Container className="text-center">
          {hasQuoteForm ? (
            <>
              <h2 className="font-serif text-2xl text-brown mb-4">
                {locale === "mk" ? "Пресметајте ја цената" : "Calculate Your Price"}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={`/${locale}/contact`} variant="primary">
                  {locale === "mk" ? "Побарај понуда" : "Request Quote"}
                </Button>
                <Button href={`/${locale}/contact#calculator`} variant="outline">
                  {locale === "mk" ? "Калкулатор на цени" : "Price Calculator"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted mb-4">{t(`${slug}.contactNote`)}</p>
              <Button href={`/${locale}/contact`} variant="primary">
                {locale === "mk" ? "Контактирајте не" : "Contact Us"}
              </Button>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Create services landing page**

Create `src/app/[locale]/services/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("pageTitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          title={(await getTranslations({ locale, namespace: "services" }))("pageTitle")}
          subtitle={(await getTranslations({ locale, namespace: "services" }))("pageSubtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} slug={service.slug} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Create all 6 individual service pages**

Each service page follows the same pattern. Create all 6:

Create `src/app/[locale]/services/court-translation/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.court-translation" });
  return {
    title: t("title"),
    description: t("short"),
  };
}

export default async function CourtTranslationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePageLayout slug="court-translation" />;
}
```

Create identical files for the remaining 5 services, changing the slug:
- `src/app/[locale]/services/legal-translation/page.tsx` — slug `"legal-translation"`
- `src/app/[locale]/services/subtitling/page.tsx` — slug `"subtitling"`
- `src/app/[locale]/services/literary-translation/page.tsx` — slug `"literary-translation"`
- `src/app/[locale]/services/general-translation/page.tsx` — slug `"general-translation"`
- `src/app/[locale]/services/mtpe/page.tsx` — slug `"mtpe"`

Each follows the same template — only change the slug string and the import path prefix for `getTranslations`.

- [ ] **Step 7: Verify in browser**

```bash
npm run dev
```

Check `/mk/services` and `/en/services` — landing page with 6 cards. Click through to each service page. Verify: description text, document lists (court/legal/general), FAQ accordions open/close, CTA buttons link to contact, subtitling page shows client names. Check both languages.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: build services landing page and all 6 individual service pages with FAQs"
```

---

### Task 6: Portfolio Page

**Files:**
- Create: `src/app/[locale]/portfolio/page.tsx`
- Create: `src/components/portfolio/LogoShowcase.tsx`, `src/components/portfolio/ExperienceGrid.tsx`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Add portfolio translations**

Add to `messages/en.json`:
```json
{
  "portfolio": {
    "pageTitle": "Portfolio & Experience",
    "pageSubtitle": "Over three decades of professional translation across industries",
    "subtitlingTitle": "Subtitling & Audiovisual",
    "subtitlingDescription": "Professional subtitling for shows, series, documentaries, films, and interviews broadcast on major international channels and streaming platforms.",
    "euTitle": "EU & Government Translation",
    "euDescription": "Translation of EU directives, regulations, and CELEX documents for the Sector of European Integration of the Government of North Macedonia. Documents spanning transport, agriculture, internal affairs, and finance.",
    "industriesTitle": "Industry Experience",
    "teachingTitle": "Language Education",
    "teachingDescription": "Over 20 years teaching English at primary and secondary level, including preparation for Matura exams and university entrance. Experience in multicultural educational settings with Macedonian, Albanian, Bosnian, Vlach, and Roma students."
  }
}
```

Add corresponding Macedonian translations to `mk.json`.

- [ ] **Step 2: Create LogoShowcase component**

Create `src/components/portfolio/LogoShowcase.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const studios = [
  { name: "Disney", type: "Streaming & Film" },
  { name: "Netflix", type: "Streaming & Series" },
  { name: "National Geographic", type: "Documentary" },
  { name: "AXN", type: "Entertainment" },
  { name: "Viasat", type: "Broadcasting" },
  { name: "TV1000", type: "Film Channel" },
];

export function LogoShowcase() {
  const t = useTranslations("portfolio");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("subtitlingTitle")} />
        <p className="text-muted text-center max-w-2xl mx-auto mb-12">
          {t("subtitlingDescription")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {studios.map((studio) => (
            <div
              key={studio.name}
              className="bg-white rounded-lg p-6 text-center shadow-sm border border-linen hover:border-terracotta/30 transition-colors"
            >
              <p className="font-serif text-xl text-brown">{studio.name}</p>
              <p className="text-muted text-xs mt-1">{studio.type}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create ExperienceGrid component**

Create `src/components/portfolio/ExperienceGrid.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industries = [
  { en: "IT & Software", mk: "ИТ и софтвер" },
  { en: "Technical Manuals", mk: "Технички прирачници" },
  { en: "Legal & Regulatory", mk: "Правни документи" },
  { en: "Patents", mk: "Патенти" },
  { en: "Medical & Pharma", mk: "Медицина и фармација" },
  { en: "Finance & Banking", mk: "Финансии и банкарство" },
  { en: "Telecommunications", mk: "Телекомуникации" },
  { en: "Games & Entertainment", mk: "Игри и забава" },
  { en: "Literature & Publishing", mk: "Литература и издаваштво" },
  { en: "Academic & Research", mk: "Академски и истражувачки" },
];

export function ExperienceGrid() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as "mk" | "en";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t("industriesTitle")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.en}
              className="bg-linen rounded-lg p-4 text-center text-sm text-brown font-medium"
            >
              {ind[locale]}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Assemble portfolio page**

Create `src/app/[locale]/portfolio/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoShowcase } from "@/components/portfolio/LogoShowcase";
import { ExperienceGrid } from "@/components/portfolio/ExperienceGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("pageTitle") };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <>
      {/* Page header */}
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-muted text-lg max-w-2xl">{t("pageSubtitle")}</p>
        </Container>
      </section>

      <LogoShowcase />

      {/* EU/Government section */}
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <SectionHeading title={t("euTitle")} />
          <p className="text-muted text-center max-w-2xl mx-auto">
            {t("euDescription")}
          </p>
        </Container>
      </section>

      <ExperienceGrid />

      {/* Teaching section */}
      <section className="bg-linen py-16">
        <Container>
          <SectionHeading title={t("teachingTitle")} />
          <p className="text-muted text-center max-w-2xl mx-auto">
            {t("teachingDescription")}
          </p>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Check `/mk/portfolio` and `/en/portfolio`. Verify: studio showcase grid, EU section, industry experience grid, teaching section. Both languages.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: build Portfolio page with studio showcase, industries, EU work, and teaching"
```

---

### Task 7: Pricing Logic & Quote Calculator

**Files:**
- Create: `src/lib/pricing.ts`
- Create: `src/components/contact/QuoteCalculator.tsx`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Create pricing logic**

Create `src/lib/pricing.ts`:
```typescript
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
```

- [ ] **Step 2: Add calculator translations**

Add to `messages/en.json`:
```json
{
  "calculator": {
    "title": "Price Calculator",
    "subtitle": "Get an instant estimate for your translation",
    "documentType": "Document Type",
    "selectDocument": "Select document type",
    "languagePair": "Language Pair",
    "selectLanguage": "Select language pair",
    "pages": "Number of Pages",
    "express": "Express Delivery",
    "expressLabel": "I need express delivery (+100 MKD/page)",
    "result": "Estimated Price",
    "perPage": "per page",
    "disclaimer": "This is an informational estimate. For an exact quote, please contact us or submit your document.",
    "requestQuote": "Request Exact Quote",
    "contactWhatsApp": "Contact via WhatsApp"
  }
}
```

Add corresponding Macedonian to `mk.json`:
```json
{
  "calculator": {
    "title": "Калкулатор на цени",
    "subtitle": "Добијте моментална проценка за вашиот превод",
    "documentType": "Тип на документ",
    "selectDocument": "Изберете тип на документ",
    "languagePair": "Јазичен пар",
    "selectLanguage": "Изберете јазичен пар",
    "pages": "Број на страни",
    "express": "Итна достава",
    "expressLabel": "Ми треба итна достава (+100 МКД/страна)",
    "result": "Проценета цена",
    "perPage": "по страна",
    "disclaimer": "Ова е информативна проценка. За точна цена, контактирајте не или прикачете го вашиот документ.",
    "requestQuote": "Побарај точна понуда",
    "contactWhatsApp": "Контакт преку WhatsApp"
  }
}
```

- [ ] **Step 3: Create QuoteCalculator component**

Create `src/components/contact/QuoteCalculator.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { documentTypes, calculatePrice, PRICES } from "@/lib/pricing";
import { LANGUAGE_PAIRS, CONTACT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale() as "mk" | "en";

  const [documentId, setDocumentId] = useState("");
  const [languagePair, setLanguagePair] = useState("");
  const [pages, setPages] = useState(1);
  const [express, setExpress] = useState(false);

  const result = documentId ? calculatePrice(documentId, pages, express) : null;

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
            onChange={(e) => setDocumentId(e.target.value)}
            className="w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta"
          >
            <option value="">{t("selectDocument")}</option>
            {documentTypes.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc[locale]} {doc.tier === "complex" ? "★" : ""}
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

        {/* Pages */}
        <div>
          <label className="block text-sm font-medium text-brown mb-1.5">
            {t("pages")}
          </label>
          <input
            type="number"
            min={1}
            max={999}
            value={pages}
            onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border border-linen rounded-sm px-3 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-terracotta"
          />
        </div>

        {/* Express toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={express}
            onChange={(e) => setExpress(e.target.checked)}
            className="w-4 h-4 accent-terracotta"
          />
          <span className="text-sm text-muted">{t("expressLabel")}</span>
        </label>

        {/* Result */}
        {result && (
          <div className="bg-linen rounded-lg p-5 mt-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">{t("result")}</p>
            <p className="font-serif text-3xl text-brown">
              {result.total.toLocaleString()} <span className="text-lg">MKD</span>
            </p>
            <p className="text-sm text-muted mt-1">
              {result.perPage} MKD {t("perPage")} × {pages}
            </p>
            <p className="text-xs text-muted mt-4 italic">{t("disclaimer")}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button href={`/${locale}/contact`} variant="primary">
                {t("requestQuote")}
              </Button>
              <Button
                href={`https://wa.me/${CONTACT.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
                  locale === "mk"
                    ? `Здраво, ме интересира превод на документ.`
                    : `Hello, I'm interested in document translation.`
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
```

- [ ] **Step 4: Verify calculator works**

We'll integrate this into the contact page in the next task. For now, temporarily import it on the home page to test, or wait until Task 8.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add pricing logic and interactive quote calculator component"
```

---

### Task 8: Contact Page with Quote Form & Email API

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/contact/QuoteForm.tsx`, `src/components/contact/ContactInfo.tsx`
- Create: `src/app/api/contact/route.ts`
- Create: `src/lib/email.ts`
- Modify: `messages/mk.json`, `messages/en.json`

- [ ] **Step 1: Add contact translations**

Add to `messages/en.json`:
```json
{
  "contact": {
    "pageTitle": "Contact",
    "formTitle": "Request a Quote",
    "formSubtitle": "For court, legal, and general document translation",
    "serviceType": "Service Type",
    "selectService": "Select service type",
    "courtTranslation": "Court Translation",
    "legalTranslation": "Legal & Business Translation",
    "generalTranslation": "General Translation",
    "languagePair": "Language Pair",
    "selectLanguage": "Select language pair",
    "documentType": "Document Type",
    "pages": "Number of Pages",
    "urgent": "Urgent / Express",
    "urgentLabel": "I need express delivery",
    "file": "Upload Document (optional)",
    "fileHelp": "PDF, DOC, DOCX, JPG — Max 10MB",
    "message": "Additional Details",
    "messagePlaceholder": "Describe your translation needs...",
    "name": "Full Name",
    "email": "Email Address",
    "phone": "Phone Number (optional)",
    "submit": "Send Request",
    "sending": "Sending...",
    "success": "Your request has been sent successfully! We will contact you within 24 hours.",
    "error": "Something went wrong. Please try again or contact us directly.",
    "directTitle": "Contact Directly",
    "directSubtitle": "For subtitling, literary translation, MTPE, and all other inquiries",
    "orContact": "Or reach out directly"
  }
}
```

Add corresponding Macedonian to `mk.json`:
```json
{
  "contact": {
    "pageTitle": "Контакт",
    "formTitle": "Побарај понуда",
    "formSubtitle": "За судски, правен и општ превод на документи",
    "serviceType": "Тип на услуга",
    "selectService": "Изберете тип на услуга",
    "courtTranslation": "Судски превод",
    "legalTranslation": "Правен и деловен превод",
    "generalTranslation": "Општ превод",
    "languagePair": "Јазичен пар",
    "selectLanguage": "Изберете јазичен пар",
    "documentType": "Тип на документ",
    "pages": "Број на страни",
    "urgent": "Итно / Експрес",
    "urgentLabel": "Ми треба итна достава",
    "file": "Прикачете документ (опционално)",
    "fileHelp": "PDF, DOC, DOCX, JPG — Макс 10MB",
    "message": "Дополнителни детали",
    "messagePlaceholder": "Опишете ги вашите потреби за превод...",
    "name": "Име и презиме",
    "email": "Е-пошта",
    "phone": "Телефонски број (опционално)",
    "submit": "Испрати барање",
    "sending": "Се испраќа...",
    "success": "Вашето барање е успешно испратено! Ќе ве контактираме во рок од 24 часа.",
    "error": "Нешто тргна наопаку. Обидете се повторно или контактирајте не директно.",
    "directTitle": "Контактирајте директно",
    "directSubtitle": "За титлување, книжевен превод, МТПЕ и сите останати прашања",
    "orContact": "Или контактирајте не директно"
  }
}
```

- [ ] **Step 2: Create email utility**

Create `src/lib/email.ts`:
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  languagePair: string;
  documentType?: string;
  pages?: number;
  urgent: boolean;
  message: string;
}) {
  const to = process.env.CONTACT_EMAIL || "biljanabojcev@gmail.com";

  const html = `
    <h2>New Translation Quote Request</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold">Name:</td><td style="padding:8px">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${escapeHtml(data.email)}</td></tr>
      ${data.phone ? `<tr><td style="padding:8px;font-weight:bold">Phone:</td><td style="padding:8px">${escapeHtml(data.phone)}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold">Service:</td><td style="padding:8px">${escapeHtml(data.serviceType)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Language Pair:</td><td style="padding:8px">${escapeHtml(data.languagePair)}</td></tr>
      ${data.documentType ? `<tr><td style="padding:8px;font-weight:bold">Document Type:</td><td style="padding:8px">${escapeHtml(data.documentType)}</td></tr>` : ""}
      ${data.pages ? `<tr><td style="padding:8px;font-weight:bold">Pages:</td><td style="padding:8px">${data.pages}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold">Urgent:</td><td style="padding:8px">${data.urgent ? "Yes" : "No"}</td></tr>
    </table>
    <h3>Message:</h3>
    <p>${escapeHtml(data.message)}</p>
  `;

  return resend.emails.send({
    from: "Website <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `New Quote Request: ${data.serviceType} — ${data.name}`,
    html,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
```

- [ ] **Step 3: Create API route**

Create `src/app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, serviceType, languagePair, message } = body;
    if (!name || !email || !serviceType || !languagePair || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    await sendContactEmail({
      name,
      email,
      phone: body.phone || undefined,
      serviceType,
      languagePair,
      documentType: body.documentType || undefined,
      pages: body.pages ? parseInt(body.pages) : undefined,
      urgent: body.urgent === true,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 4: Create QuoteForm component**

Create `src/components/contact/QuoteForm.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LANGUAGE_PAIRS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function QuoteForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as "mk" | "en";

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
```

- [ ] **Step 5: Create ContactInfo component**

Create `src/components/contact/ContactInfo.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

export function ContactInfo() {
  const t = useTranslations("contact");

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
            <p className="text-xs text-muted">Phone</p>
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
          {/* Bilingual inline */}
          Available for remote work worldwide
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Assemble contact page**

Create `src/app/[locale]/contact/page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { QuoteCalculator } from "@/components/contact/QuoteCalculator";
import { ContactInfo } from "@/components/contact/ContactInfo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brown mb-4">
            {t("pageTitle")}
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Quote form */}
            <QuoteForm />

            {/* Right: Calculator + Direct contact */}
            <div className="space-y-8">
              <QuoteCalculator />
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 7: Verify in browser**

```bash
npm run dev
```

Navigate to `/mk/contact` and `/en/contact`. Verify: quote form renders all fields, calculator updates estimate live, contact info shows all channels. Test form submission (will fail without real Resend key — that's expected, just verify no JS errors). Both languages.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: build Contact page with quote form, price calculator, email API, and direct contact"
```

---

### Task 9: SEO Infrastructure (Metadata, JSON-LD, Sitemap, robots.txt)

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `public/robots.txt`
- Create: `src/app/sitemap.ts`
- Modify: `src/app/[locale]/layout.tsx` (add JSON-LD)
- Modify: all page files (add `generateMetadata`)

- [ ] **Step 1: Create metadata helpers**

Create `src/lib/metadata.ts`:
```typescript
import type { Metadata } from "next";
import { CONTACT } from "./constants";

const BASE_URL = "https://biljanavbojcev.com";

export function buildMetadata({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description: string;
  locale: string;
  path: string;
}): Metadata {
  const otherLocale = locale === "mk" ? "en" : "mk";
  const url = `${BASE_URL}/${locale}${path}`;
  const altUrl = `${BASE_URL}/${otherLocale}${path}`;
  const fullTitle = `${title} | Biljana V. Bojcev`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [otherLocale]: altUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Biljana V. Bojcev — Certified Court Translator",
      locale: locale === "mk" ? "mk_MK" : "en_US",
      type: "website",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BASE_URL,
    name: "Biljana Vasileva Bojcev — Certified Court Translator",
    alternateName: "Биљана Василева Бојчев — Овластен судски преведувач",
    description:
      "Certified court translator with 30+ years of experience. Document translation, subtitling, legal translation. Veles, North Macedonia.",
    url: BASE_URL,
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Veles",
      addressCountry: "MK",
    },
    priceRange: "$$",
    knowsLanguage: ["mk", "en", "sr", "hr", "bs"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Translation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Court Document Translation",
            description: "Certified sworn translations for all official documents with full legal validity",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legal & Business Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Subtitling & Audiovisual Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Literary Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Document Translation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Machine Translation Post-Editing (MTPE)",
          },
        },
      ],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Biljana Vasileva Bojcev",
    jobTitle: "Certified Court Translator",
    url: BASE_URL,
    knowsLanguage: [
      { "@type": "Language", name: "Macedonian", alternateName: "mk" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Serbian", alternateName: "sr" },
      { "@type": "Language", name: "Croatian", alternateName: "hr" },
      { "@type": "Language", name: "Bosnian", alternateName: "bs" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ss. Cyril and Methodius University, Skopje",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Authorized Court Translator — English",
        recognizedBy: { "@type": "Organization", name: "Ministry of Justice, North Macedonia" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Authorized Court Translator — Serbian",
        recognizedBy: { "@type": "Organization", name: "Ministry of Justice, North Macedonia" },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
```

- [ ] **Step 2: Add JSON-LD to locale layout**

Modify `src/app/[locale]/layout.tsx` — add the LocalBusiness and Person JSON-LD in the `<head>`:
```tsx
import { localBusinessJsonLd, personJsonLd } from "@/lib/metadata";

// Inside the <html> tag, before <body>:
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
  />
</head>
```

- [ ] **Step 3: Update all pages with proper generateMetadata**

Update each page's `generateMetadata` to use `buildMetadata`. Example for `src/app/[locale]/page.tsx`:
```tsx
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "",
  });
}
```

Apply the same pattern to: about (`path: "/about"`), services (`path: "/services"`), each service sub-page (`path: "/services/court-translation"` etc.), portfolio (`path: "/portfolio"`), contact (`path: "/contact"`).

- [ ] **Step 4: Create sitemap**

Create `src/app/sitemap.ts`:
```typescript
import type { MetadataRoute } from "next";

const BASE_URL = "https://biljanavbojcev.com";

const pages = [
  "",
  "/about",
  "/services",
  "/services/court-translation",
  "/services/legal-translation",
  "/services/subtitling",
  "/services/literary-translation",
  "/services/general-translation",
  "/services/mtpe",
  "/portfolio",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${BASE_URL}/mk${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page === "" ? 1.0 : page.includes("/services/") ? 0.9 : 0.8,
      alternates: {
        languages: {
          mk: `${BASE_URL}/mk${page}`,
          en: `${BASE_URL}/en${page}`,
        },
      },
    });
    entries.push({
      url: `${BASE_URL}/en${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page === "" ? 1.0 : page.includes("/services/") ? 0.9 : 0.8,
      alternates: {
        languages: {
          mk: `${BASE_URL}/mk${page}`,
          en: `${BASE_URL}/en${page}`,
        },
      },
    });
  }

  return entries;
}
```

- [ ] **Step 5: Create robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://biljanavbojcev.com/sitemap.xml
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Check:
- View page source on any page — JSON-LD blocks should be in `<head>`
- Navigate to `/sitemap.xml` — should list all pages in both languages
- Navigate to `/robots.txt` — should be served

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add full SEO infrastructure — JSON-LD, sitemap, robots.txt, hreflang metadata"
```

---

### Task 10: Final Polish & Build Verification

**Files:**
- Modify: various components for responsive polish
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any build errors. Common issues:
- Missing translation keys — check `mk.json` and `en.json` have identical structure
- Type errors in components
- Image optimization issues with SVG

- [ ] **Step 2: Test production build locally**

```bash
npm run start
```

Navigate through every page in both languages. Check:
- All pages render without errors
- Language switcher works on every page
- All links are correct
- Mobile menu works
- Quote calculator computes correctly
- Form renders (submission won't work without real Resend key)
- No console errors

- [ ] **Step 3: Verify SEO output**

View page source and confirm:
- `<html lang="mk">` or `<html lang="en">` is correct
- `<link rel="alternate" hreflang="...">` tags present
- JSON-LD blocks render valid JSON
- `<title>` tags are unique per page
- `<meta name="description">` is unique per page

- [ ] **Step 4: Fix any issues found**

Address any build, rendering, or SEO issues discovered in steps 1-3.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: polish and build verification — production-ready"
```

---

## Summary

| Task | Description | Key Deliverable |
|------|-------------|-----------------|
| 1 | Project scaffold & config | Working Next.js + next-intl + Tailwind |
| 2 | UI primitives & layout shell | Header, Footer, language switcher |
| 3 | Home page | Hero, trust bar, services grid, clients, testimonials, CTA |
| 4 | About page | Bio, career timeline, skills/certifications |
| 5 | Services pages | Landing + 6 individual pages with FAQs |
| 6 | Portfolio page | Studio showcase, industries, EU work |
| 7 | Pricing & calculator | Pricing logic, interactive calculator widget |
| 8 | Contact page & email API | Quote form, calculator, direct contact, Resend API |
| 9 | SEO infrastructure | JSON-LD, sitemap, robots.txt, metadata |
| 10 | Polish & build verification | Production build, responsive check, SEO audit |
