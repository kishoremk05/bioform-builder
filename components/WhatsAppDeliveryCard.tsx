"use client";

import { useState } from "react";

export default function WhatsAppDeliveryCard() {
  const [whatsAppNumber, setWhatsAppNumber] = useState("+91");

  const handleChooseTemplate = () => {
    const templateSection = document.getElementById("templates");
    if (!templateSection) {
      return;
    }
    templateSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResetForm = () => {
    setWhatsAppNumber("+91");
    window.dispatchEvent(new CustomEvent("biodata:reset"));
  };

  return (
    <aside className="rounded-3xl border border-[#ecd6c5] bg-gradient-to-b from-[#fff6ed] to-[#fff] p-6">
      <h3 className="text-2xl font-extrabold text-[#2e1f17]">
        Get your biodata on WhatsApp
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-[#694d3a]">
        <li>Instant PDF delivery</li>
        <li>Payment reminders</li>
        <li>Quick support</li>
      </ul>

      <label className="mt-5 block text-sm font-semibold text-[#5f422f]">
        WhatsApp Number
      </label>
      <input
        type="tel"
        value={whatsAppNumber}
        onChange={(e) => setWhatsAppNumber(e.target.value)}
        className="mt-2 w-full rounded-xl border border-[#e6cbb5] bg-white px-4 py-3 text-[#9b7a63] outline-none transition focus:border-[#c98550] focus:ring-2 focus:ring-[#f3d2b7]"
        placeholder="+91"
        suppressHydrationWarning
      />

      <button
        type="button"
        onClick={handleChooseTemplate}
        className="mt-5 w-full rounded-xl bg-[#6e3f1f] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#5d3318]"
        suppressHydrationWarning
      >
        Choose a Template
      </button>
      <button
        type="button"
        onClick={handleResetForm}
        className="mt-2 w-full rounded-xl border border-[#d8bda9] px-4 py-3 text-center text-sm font-bold text-[#6e3f1f] transition hover:bg-[#fff4ea]"
        suppressHydrationWarning
      >
        Reset Form
      </button>

      <p className="mt-4 text-xs leading-relaxed text-[#8c664d]">
        Your privacy is protected. Number used only for biodata delivery and
        order updates.
      </p>
    </aside>
  );
}
