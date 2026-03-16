"use client";

import dynamic from "next/dynamic";

type FAQItem = {
  question: string;
  answer: string;
};

const TemplateCarousel = dynamic(
  () => import("@/components/TemplateCarousel"),
  {
    ssr: false,
  },
);

const MarriageFormatSection = dynamic(
  () => import("@/components/MarriageFormatSection"),
  { ssr: false },
);

const FAQAccordion = dynamic(() => import("@/components/FAQAccordion"), {
  ssr: false,
});

export function ClientTemplateCarousel() {
  return <TemplateCarousel />;
}

export function ClientMarriageFormatSection() {
  return <MarriageFormatSection />;
}

export function ClientFAQAccordion({ items }: { items: FAQItem[] }) {
  return <FAQAccordion items={items} />;
}
