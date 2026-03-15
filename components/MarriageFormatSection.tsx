"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type FormatTab = {
  key: string;
  label: string;
  tone: string;
  heading: string;
  description: string;
  points: string[];
};

const tabs: FormatTab[] = [
  {
    key: "personal",
    label: "Personal Details, Hobbies & Values",
    tone: "bg-[#ffe9e2] text-[#7b3b2f] border-[#f0c6ba]",
    heading: "Personal Details, Hobbies & Values",
    description:
      "This section creates your first impression and should be clear, warm, and complete.",
    points: [
      "Include full name, date of birth, place of birth, and height.",
      "Add hobbies and interests to show personality and compatibility.",
      "Mention personal values and expectations honestly for better matches.",
      "Use a recent, clear, professional-looking photograph.",
    ],
  },
  {
    key: "cultural",
    label: "Cultural & Astrological Details",
    tone: "bg-[#e9f3ff] text-[#274d7a] border-[#c8dcf4]",
    heading: "Cultural & Astrological Details",
    description:
      "For many families, these details are essential for traditions and horoscope matching.",
    points: [
      "Mention religion, caste, sub-caste, and gotra where relevant.",
      "Add rashi and nakshatra for astrological preferences.",
      "Keep this section accurate and easy to scan.",
      "Include only the details important for your family context.",
    ],
  },
  {
    key: "education",
    label: "Educational & Professional Details",
    tone: "bg-[#edf9ef] text-[#296145] border-[#cae8d0]",
    heading: "Educational & Professional Details",
    description:
      "This section highlights your academic background and career stability.",
    points: [
      "Mention highest qualification and notable academic details.",
      "Add occupation, company, and work location.",
      "Include annual income if you want to provide more clarity.",
      "Keep wording concise and factual.",
    ],
  },
  {
    key: "family",
    label: "Family Details",
    tone: "bg-[#fff3e2] text-[#815628] border-[#f0d5af]",
    heading: "Family Details",
    description:
      "A well-written family section provides context and trust for both families.",
    points: [
      "Include parents' names and occupations.",
      "Mention siblings and basic family structure.",
      "State family type and family status when needed.",
      "Keep details respectful and straightforward.",
    ],
  },
  {
    key: "contact",
    label: "Contact Details",
    tone: "bg-[#f4ecff] text-[#5a3a82] border-[#dcccf4]",
    heading: "Contact Details",
    description:
      "Your contact section should make it easy for families to reach out confidently.",
    points: [
      "Add contact person name and active phone number.",
      "Include email and complete residential address.",
      "Use correct spellings and up-to-date information.",
      "Keep this section neat and clearly separated from others.",
    ],
  },
  {
    key: "expert",
    label: "Expert Tip",
    tone: "bg-[#e6f8f3] text-[#236b60] border-[#bde9dd]",
    heading: "Expert Tip",
    description:
      "A great biodata is not just complete, it is easy to read and visually balanced.",
    points: [
      "Use clear headings and short, readable lines.",
      "Avoid clutter and focus on relevant details.",
      "Proofread all fields before generating PDF.",
      "Choose a template that matches your profile style.",
    ],
  },
];

export default function MarriageFormatSection() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const selected = useMemo(
    () => tabs.find((tab) => tab.key === activeTab) ?? tabs[0],
    [activeTab],
  );

  return (
    <section className="bg-[#fff8f1] px-4 py-14 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_500px]">
        <div>
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-extrabold text-[#2e1f17] md:text-5xl">
            Marriage Biodata Format: Crafting Your Perfect Introduction
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-center text-[#6a4c39] md:text-lg">
            A marriage biodata is a comprehensive profile that introduces your
            background, education, career, family, and values. A strong format
            creates a clear and positive first impression.
          </p>

          <div className="mt-8 rounded-3xl border border-[#ecd8c8] bg-white p-6 shadow-[0_14px_38px_rgba(110,63,31,0.08)]">
            <h3 className="text-2xl font-bold text-[#2e1f17]">
              What a Well-Structured Marriage Biodata Looks Like
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6a4c39] md:text-base">
              A professional and effective marriage biodata should be
              well-organized, visually appealing, and easy for potential matches
              and their families to read.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#5f4636] md:text-base">
              <li>Include key sections like personal, cultural, education, family, and contact details.</li>
              <li>Use concise language and clear headings for easy readability.</li>
              <li>Proofread details and keep formatting consistent across all fields.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-3xl border border-[#ead7c7] bg-[#fffdf8] p-5 md:p-6">
            <h3 className="text-2xl font-bold text-[#2e1f17]">
              Key Sections for Your Marriage Biodata
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {tabs.map((tab) => {
                const isActive = tab.key === selected.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${tab.tone} ${
                      isActive ? "ring-2 ring-offset-2 ring-[#d09b72]" : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-[#ecd8c8] bg-white p-5">
              <h4 className="text-xl font-bold text-[#2e1f17]">{selected.heading}</h4>
              <p className="mt-2 text-sm text-[#6a4c39] md:text-base">{selected.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#5f4636] md:text-base">
                {selected.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:h-fit lg:self-start">
          <div className="rounded-[2rem] border border-[#ead7c7] bg-white p-4 shadow-[0_18px_42px_rgba(110,63,31,0.09)]">
            <div className="relative h-[740px] overflow-hidden rounded-2xl border border-[#dfc7b2] bg-[#fff8f1]">
              <Image
                src="https://biodatamaker.app/_next/image?url=%2Fimages%2Fresources%2Fsample-marriage-biodata-format.png&w=1080&q=75"
                alt="Sample marriage biodata reference"
                fill
                className="object-cover object-top"
                sizes="360px"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
