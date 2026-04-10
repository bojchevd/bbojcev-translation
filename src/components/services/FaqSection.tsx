"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqItem = { q: string; a: string };

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
        <div className="px-5 pb-5 text-muted text-sm leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export function FaqSection({ items, title }: { items: FaqItem[]; title: string }) {
  return (
    <section className="py-12">
      <SectionHeading title={title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
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
