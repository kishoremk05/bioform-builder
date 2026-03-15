"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type TemplateRecord = {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  accentClassName: string;
  frameClassName: string;
  contentClassName: string;
  order: number;
};

const fallbackTemplates: TemplateRecord[] = [
  {
    id: "classic-brown-border",
    title: "Classic Brown Border",
    tag: "Most popular",
    description: "Traditional look with neat sections and elegant hierarchy.",
    image:
      "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fwhite-brown-theme-marriage-biodata-sample-format-girl.png&w=640&q=75",
    accentClassName: "from-[#f8eee4] via-[#f3dfcf] to-[#ead2be]",
    frameClassName: "border-[#cf9e76]",
    contentClassName: "bg-[#fffaf5]",
    order: 1,
  },
  {
    id: "modern-ivory",
    title: "Modern Ivory",
    tag: "Premium",
    description: "Minimal and high-contrast layout for a clean one-page biodata.",
    image:
      "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fpopular-hindu-marriage-biodata-format.png&w=640&q=75",
    accentClassName: "from-[#f7f2ea] via-[#eadbc6] to-[#f6eee5]",
    frameClassName: "border-[#d1aa6e]",
    contentClassName: "bg-[#fffdfa]",
    order: 2,
  },
  {
    id: "royal-blue-arch",
    title: "Royal Blue Arch",
    tag: "New",
    description: "A bold showcase layout with a formal portrait-first presentation.",
    image:
      "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Felegant-marriage-biodata-sample-boy.png&w=640&q=75",
    accentClassName: "from-[#eef2f8] via-[#dde7f4] to-[#f5f0ec]",
    frameClassName: "border-[#99a8bf]",
    contentClassName: "bg-[#fcfbfa]",
    order: 3,
  },
  {
    id: "maroon-classic",
    title: "Maroon Classic",
    tag: "Trending",
    description: "A rich traditional card for detailed family and personal sections.",
    image:
      "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fwhite-brown-theme-marriage-biodata-sample-format-girl.png&w=640&q=75",
    accentClassName: "from-[#f6e7e4] via-[#efd8d2] to-[#f9ece8]",
    frameClassName: "border-[#c89d90]",
    contentClassName: "bg-[#fff9f8]",
    order: 4,
  },
  {
    id: "rose-elegance",
    title: "Rose Elegance",
    tag: "Editor pick",
    description: "Soft feminine tones with a polished portrait-led biodata layout.",
    image:
      "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fwhite-brown-theme-marriage-biodata-sample-format-girl.png&w=640&q=75",
    accentClassName: "from-[#f8ecef] via-[#f0d8e1] to-[#f8eff3]",
    frameClassName: "border-[#d7b4c0]",
    contentClassName: "bg-[#fffafc]",
    order: 5,
  },
];

const normalizeTemplate = (
  id: string,
  value: Record<string, unknown>,
): TemplateRecord | null => {
  if (typeof value.title !== "string" || typeof value.image !== "string") {
    return null;
  }

  return {
    id,
    title: value.title,
    tag: typeof value.tag === "string" ? value.tag : "Template",
    description:
      typeof value.description === "string"
        ? value.description
        : "Beautiful biodata format ready for customization.",
    image: value.image,
    accentClassName:
      typeof value.accentClassName === "string"
        ? value.accentClassName
        : "from-[#f8eee4] via-[#f2e1d0] to-[#fcf6ef]",
    frameClassName:
      typeof value.frameClassName === "string"
        ? value.frameClassName
        : "border-[#d8b796]",
    contentClassName:
      typeof value.contentClassName === "string"
        ? value.contentClassName
        : "bg-[#fffaf6]",
    order: typeof value.order === "number" ? value.order : Number.MAX_SAFE_INTEGER,
  };
};

export default function TemplateCarousel() {
  const [templates, setTemplates] = useState<TemplateRecord[]>(fallbackTemplates);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"firebase" | "fallback">("fallback");
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTemplates = async () => {
      try {
        const snapshot = await getDocs(collection(db, "templates"));
        const remoteTemplates = snapshot.docs
          .map((doc) => normalizeTemplate(doc.id, doc.data()))
          .filter((template): template is TemplateRecord => template !== null)
          .sort((left, right) => left.order - right.order);

        if (!isMounted) {
          return;
        }

        if (remoteTemplates.length > 0) {
          setTemplates(remoteTemplates);
          setSource("firebase");
        }
      } catch (error) {
        console.warn("Unable to load template list from Firestore.", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    const amount = Math.min(container.clientWidth * 0.82, 420);
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll templates left"
            onClick={() => scrollByAmount("left")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e3cdbd] bg-white text-[#6e3f1f] shadow-[0_10px_24px_rgba(110,63,31,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fff8f2]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll templates right"
            onClick={() => scrollByAmount("right")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e3cdbd] bg-white text-[#6e3f1f] shadow-[0_10px_24px_rgba(110,63,31,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fff8f2]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-[#e8e7ef] to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-[#e8e7ef] to-transparent md:block" />

        <div
          ref={carouselRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-4"
        >
          {templates.map((template, index) => (
            <article
              key={template.id}
              className="group min-w-[280px] max-w-[280px] shrink-0 snap-start rounded-[2rem] border border-[#edd8c8] bg-white p-5 shadow-[0_16px_42px_rgba(110,63,31,0.09)] transition hover:-translate-y-1 md:min-w-[340px] md:max-w-[340px]"
            >
              <div className={`rounded-[1.7rem] bg-gradient-to-br ${template.accentClassName} p-4`}>
                <div
                  className={`relative h-[360px] overflow-hidden rounded-[1.4rem] border ${template.frameClassName} ${template.contentClassName} md:h-[420px]`}
                >
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, 340px"
                    priority={index < 2}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-[1.7rem] font-extrabold leading-tight text-[#2e1f17]">
                  {template.title}
                </h3>
                <span className="shrink-0 rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-semibold text-[#8a4f26]">
                  {template.tag}
                </span>
              </div>

              <p className="mt-3 text-base leading-relaxed text-[#6b4d3b]">
                {template.description}
              </p>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}