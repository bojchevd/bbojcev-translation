# Professional Translator Portfolio Website — Design Spec

## Overview

A modern, bilingual portfolio website for **Biljana Vasileva Bojcev**, a certified court translator based in Veles, North Macedonia with 30+ years of experience. The site serves as her digital storefront — designed to generate leads for court document translation work and showcase her broader experience in subtitling, literary translation, and MTPE.

**Domain:** biljanavbojcev.com (to be purchased)
**Target audiences:**
- Local clients needing court/legal document translation (primary)
- International clients needing Macedonian translation services
- Studios/agencies looking for subtitling or MTPE professionals

## Tech Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Next.js 15 App Router | Industry standard, great SEO, static export support |
| Styling | Tailwind CSS v4 | Utility-first, fast to build, small bundle |
| i18n | next-intl | Mature Next.js i18n library, supports App Router |
| Hosting | Vercel (free tier) | Native Next.js support, CDN, instant deploys |
| Email | Resend (free tier) | 100 emails/day, simple API, reliable delivery |
| Deployment | Vercel (hybrid) | Static pages + single serverless API route for form email |

## i18n Strategy

- **Subdirectory routing:** `/mk/` (default) and `/en/`
- **Translation files:** `messages/mk.json` and `messages/en.json`
- **hreflang tags:** Every page links to its counterpart in the other language
- **Default redirect:** `/` → `/mk/`
- **Language switcher:** Persistent in header, switches to same page in other language

## Design Direction

### Color Palette — Blush & Terracotta

| Role | Color | Hex |
|------|-------|-----|
| Background (light) | Soft cream | `#faf5f0` |
| Background (secondary) | Warm linen | `#f0e8df` |
| Text (primary) | Rich brown | `#4a3728` |
| Accent | Terracotta | `#c4956a` |
| Text (secondary) | Muted brown | `#9a7e68` |

### Typography
- **Headings:** Serif font (e.g. Playfair Display or Lora) — conveys authority and tradition
- **Body:** Clean sans-serif (e.g. Inter or Source Sans 3) — readable, modern
- **Style:** Professional, warm, elegant — not corporate-cold, not childish

### Layout Philosophy
- Mobile-first responsive design
- Asymmetric overlap hero section (photo + text card offset)
- Generous whitespace, clear visual hierarchy
- Agency-quality polish: micro-interactions, hover states, smooth transitions
- Trust signals prominent throughout

## Pages

### 1. Home (`/mk/`, `/en/`)

**Hero Section:**
- Asymmetric overlap layout: placeholder photo with overlapping text card
- Name: Biljana Vasileva Bojcev
- Title: "Овластен судски преведувач" / "Certified Court Translator"
- Tagline referencing 30+ years experience
- Primary CTA: "Request Quote" → links to contact page
- Secondary CTA: "Learn More" → scrolls to services

**Trust Bar:**
- Icon stats: "30+ Years Experience", "5 Languages", "Court Certified", "1000+ Projects"

**Services Overview:**
- 6 cards, one per service category, linking to individual service pages
- Brief description + icon per card

**Client Logos / Experience:**
- Disney, Netflix, National Geographic, AXN, Viasat, TV1000 logos
- Text: "Trusted by leading studios and institutions"

**Testimonial Section:**
- Placeholder testimonials (to be filled with real ones later)

**Final CTA Band:**
- "Need a certified translation?" + Request Quote button

### 2. About (`/mk/about`, `/en/about`)

- Professional bio written from CV content (compelling narrative, not bullet points)
- Career timeline: key milestones from 1996 to present
- Qualifications & certifications (University degree, court translator certificates)
- Language proficiencies: Macedonian (native), English/Serbian/Bosnian/Croatian (all C2)
- CAT tools: Trados Studio 11, Trados 7, Idiom Workbench, Wordfast, Smartling, MemoQ
- Published works & conferences attended
- Professional photo placeholder

### 3. Services (`/mk/services`, `/en/services`)

Landing page with overview cards linking to 6 individual service pages:

**3a. Court Translation (`/services/court-translation`)**
- Primary service — most detailed page
- What it is, legal validity, process
- Full list of document types handled (from documents.txt + expanded research):
  - Извод на родени / Birth certificate
  - Извод на венчани / Marriage certificate
  - Уверение за неосудуван / Certificate of non-conviction
  - Тековна сметка / Bank account statement
  - Уверение за даночен обврзник / Tax registration certificate
  - Одлука за развод / Divorce decree
  - Пасош, виза / Passport, visa documents
  - Свидетелства, дипломи / School certificates, diplomas
  - Нотарски акт / Notary act
  - Полномошно / Authorization (power of attorney)
  - (Additional types to be identified through keyword research)
- FAQ section targeting search queries
- CTA to quote calculator

**3b. Legal & Business Translation (`/services/legal-translation`)**
- Contracts, laws, regulations, directives, court decisions, business plans, financial reports
- FAQ section

**3c. Subtitling & Audiovisual (`/services/subtitling`)**
- Film, series, documentary, interviews
- Channels/studios: Disney, Netflix, National Geographic, AXN, Viasat, TV1000
- Note: Contact directly for inquiries (no quote form)

**3d. Literary Translation (`/services/literary-translation`)**
- Books across genres: yoga, plants, chemistry, health, sport, history
- Note: Contact directly for inquiries

**3e. General Document Translation (`/services/general-translation`)**
- Medical, academic, personal, technical (manuals), IT/software, patents, telecom, games
- FAQ section
- CTA to quote calculator

**3f. MTPE — Machine Translation Post-Editing (`/services/mtpe`)**
- What MTPE is and why it matters
- Quality assurance process
- Note: Contact directly for inquiries

### 4. Portfolio / Experience (`/mk/portfolio`, `/en/portfolio`)

- **Subtitling showcase:** Disney, Netflix, National Geographic, AXN, Viasat, TV1000 — with context about types of content
- **EU/Government work:** Sector of European Integration translations, CELEX documents listed
- **Industry categories:** IT, technical, legal, patents, medical/pharma, finance, telecom, games, literature
- **Teaching background:** Secondary and primary English teaching (adds credibility for language expertise)
- Stats where possible

### 5. Contact (`/mk/contact`, `/en/contact`)

**Quote Request Form (document translation only):**
- Service type dropdown: Court translation / Legal translation / General translation
- Language pair selector (EN→MK, MK→EN, SR→MK, MK→SR, etc.)
- Document type (contextual based on service type)
- Number of pages
- Urgency toggle (standard / express)
- File upload (for the document to be translated)
- Message field
- Submit → sends email via Resend to biljanabojcev@gmail.com

**Quote Calculator (interactive widget):**
- Also accessible from service pages
- Step 1: Select document type → auto-assigns pricing tier
- Step 2: Select language pair
- Step 3: Number of pages
- Step 4: Urgency toggle (standard / express)
- Result: Estimated price range displayed
- Disclaimer: "This is an informational estimate. For an exact quote, please contact us or submit your document."
- CTA: "Request Exact Quote" / "Contact via WhatsApp"

**Pricing tiers:**
| Tier | Documents | Base price | Express surcharge |
|------|-----------|-----------|-------------------|
| Standard | Birth/marriage certs, non-conviction cert, tax cert, bank statements, passports, visas, diplomas, school certs | 400 MKD/page | +100 MKD/page |
| Complex | Divorce decrees, notary acts, authorizations (полномошно), and similar complex legal docs | 500 MKD/page | +100 MKD/page |

**Direct Contact Section:**
- Email: biljanabojcev@gmail.com
- Phone: +389 72 272 142
- WhatsApp button (same number)
- Viber button (same number)
- Location: Veles, North Macedonia (remote work worldwide)

## SEO & GEO Strategy

### Structured Data (JSON-LD)
- `LocalBusiness` — translator service, Veles/North Macedonia
- `Service` — one per service type
- `FAQPage` — on every service page
- `Person` — Biljana's professional profile and credentials
- `BreadcrumbList` — site navigation
- `WebSite` with `SearchAction`

### On-Page SEO
- Every document type listed by name in both MK and EN (long-tail keywords)
- FAQ sections per service page targeting real search queries
- Service pages target specific queries:
  - MK: "судски преведувач", "превод на извод на родени", "овластен преведувач Велес"
  - EN: "sworn translator Macedonia", "certified translation Skopje", "court translator North Macedonia"
- Unique meta titles, descriptions, OG tags per page per language
- Proper heading hierarchy (single H1 per page)

### GEO (AI Search Optimization)
- Clear, factual, structured content parseable by AI assistants
- Direct answers in first paragraph of each section
- Structured lists of document types, pricing, qualifications
- `speakable` schema markup where applicable

### Technical SEO
- `hreflang` tags linking MK ↔ EN page pairs
- XML sitemap including both language versions
- `robots.txt`
- Canonical URLs
- Semantic HTML (`<article>`, `<nav>`, `<main>`, `<section>`)
- Core Web Vitals optimized (static export + Vercel CDN)
- Image optimization via `next/image`

### Local SEO
- NAP consistency (Name, Address, Phone) across entire site
- Local keywords targeting: Велес, Скопје, Штип, Северна Македонија
- Google Business Profile recommended (separate from site build)

## Project Structure

```
biljana-translation-web/
├── public/
│   ├── images/          # Photos, logos, icons
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx           # Home
│   │       ├── about/page.tsx
│   │       ├── services/
│   │       │   ├── page.tsx       # Services landing
│   │       │   ├── court-translation/page.tsx
│   │       │   ├── legal-translation/page.tsx
│   │       │   ├── subtitling/page.tsx
│   │       │   ├── literary-translation/page.tsx
│   │       │   ├── general-translation/page.tsx
│   │       │   └── mtpe/page.tsx
│   │       ├── portfolio/page.tsx
│   │       └── contact/page.tsx
│   ├── components/
│   │   ├── layout/        # Header, Footer, LanguageSwitcher
│   │   ├── home/          # Hero, TrustBar, ServicesOverview, ClientLogos
│   │   ├── services/      # ServiceCard, FAQ
│   │   ├── contact/       # QuoteForm, QuoteCalculator, ContactInfo
│   │   └── ui/            # Button, Card, etc.
│   ├── lib/
│   │   ├── pricing.ts     # Pricing tiers and calculator logic
│   │   └── email.ts       # Resend integration
│   └── i18n/
│       ├── routing.ts
│       └── request.ts
├── messages/
│   ├── mk.json
│   └── en.json
├── docs/
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## What's Explicitly Out of Scope

- CMS (no Sanity, no content management)
- Blog
- Google Maps embed
- Payment processing
- User accounts / client portal
- Analytics dashboard (can add Google Analytics later)
