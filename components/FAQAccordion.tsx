"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-7 max-w-5xl space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className="rounded-[1.3rem] border border-[#ead5c6] bg-[#fffaf5] px-5 py-3 md:px-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="pt-1 text-lg font-semibold leading-snug text-[#3f2e22] md:text-[1.8rem]">
                {item.question}
              </h3>
              <button
                type="button"
                aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1c7b4] bg-white text-[#7a5133] transition hover:bg-[#fff2e6]"
              >
                {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
            </div>

            {isOpen ? (
              <p className="mt-3 pr-8 text-sm leading-relaxed text-[#6a4c39] md:text-base md:leading-[1.45]">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
