import Image from "next/image";
import BiodataForm from "@/components/BiodataForm";
import WhatsAppDeliveryCard from "@/components/WhatsAppDeliveryCard";

export default function Home() {
  const templates = [
    {
      title: "Classic Brown Border",
      tag: "Most popular",
      description: "Traditional look with neat sections and elegant hierarchy.",
      image:
        "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fwhite-brown-theme-marriage-biodata-sample-format-girl.png&w=640&q=75",
    },
    {
      title: "Modern Ivory",
      tag: "Premium",
      description:
        "Minimal and high-contrast layout for a clean one-page biodata.",
      image:
        "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fpopular-hindu-marriage-biodata-format.png&w=640&q=75",
    },
    {
      title: "Royal Green",
      tag: "New",
      description: "A balanced blend of modern typography and cultural warmth.",
      image:
        "https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Felegant-marriage-biodata-sample-boy.png&w=640&q=75",
    },
  ];

  const testimonials = [
    {
      name: "Vinod Jethwa",
      date: "Jan 8, 2025",
      text: "Seamless work and less time consuming. Just fill details and choose a template.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
    {
      name: "Nehal Patel",
      date: "Sep 17, 2024",
      text: "Excellent website to create biodata. Beautiful formats and quick support.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
    {
      name: "Rahul Srivastava",
      date: "Mar 20, 2025",
      text: "Support team helped quickly with changes. Smooth and reliable service.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
  ];

  const faqs = [
    "Do I need design skills to create a marriage biodata?",
    "Can I add my profile photo in the biodata?",
    "Do I need to register before creating biodata?",
    "What format will I get after download?",
    "Can I include custom fields for my community?",
  ];

  return (
    <main className="landing-root min-h-screen">
      <section className="relative overflow-hidden px-4 pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="mx-auto w-full max-w-6xl">
          <nav className="flex items-center justify-between rounded-full border border-[#e8d5c6] bg-white/85 px-5 py-3 backdrop-blur">
            <p className="text-sm font-bold tracking-wide text-[#6e3f1f]">
              BioForm Builder
            </p>
            <a
              href="#create"
              className="rounded-full bg-[#6e3f1f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5d3318]"
            >
              Create My Biodata
            </a>
          </nav>

          <header className="mx-auto mt-10 max-w-4xl text-center md:mt-14">
            <p className="inline-flex items-center rounded-full border border-[#f1d7be] bg-[#fff4ea] px-4 py-1.5 text-sm font-semibold text-[#8a4f26]">
              541 biodatas created today
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-[#2e1f17] md:text-6xl">
              BioForm Builder
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#694d3a] md:text-lg">
              Create beautiful biodata for marriage with just a few clicks. Easy
              to use, customizable, and elegantly designed formats.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#create"
                className="rounded-xl bg-[#6e3f1f] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5d3318]"
              >
                Create My Biodata
              </a>
              <a
                href="#templates"
                className="rounded-xl border border-[#d9b79c] bg-white px-6 py-3 text-sm font-bold text-[#6e3f1f] transition hover:bg-[#fff4ea]"
              >
                View Templates
              </a>
            </div>
          </header>
        </div>
      </section>

      <section id="templates" className="px-4 pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Beautifully Handcrafted Marriage Biodata Templates
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[#694d3a]">
            Choose from polished formats designed to look neat, professional,
            and family-friendly right away.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {templates.map((template, index) => (
              <article
                key={template.title}
                className="group rounded-3xl border border-[#edd8c8] bg-white p-5 shadow-[0_12px_40px_rgba(110,63,31,0.08)] transition hover:-translate-y-1"
              >
                <div className="rounded-2xl bg-gradient-to-br from-[#fef6ef] via-[#f5e8dd] to-[#fff] p-4">
                  <div className="relative h-44 overflow-hidden rounded-xl border border-[#e7cfbb] bg-white">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#2e1f17]">
                    {template.title}
                  </h3>
                  <span className="rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-semibold text-[#8a4f26]">
                    {template.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#6b4d3b]">
                  {template.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="create" className="px-4 pb-14 md:pb-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 rounded-[2rem] border border-[#e8d5c6] bg-white p-5 shadow-[0_20px_60px_rgba(110,63,31,0.09)] md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a4f26]">
              Marriage Biodata Form
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#2e1f17]">
              Start creating your Marriage Biodata
            </h2>

            <div className="mt-6">
              <BiodataForm />
            </div>
          </div>

          <WhatsAppDeliveryCard />
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Create your Perfect Marriage Biodata in Just 3 Easy Steps
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your information",
                text: "Add your personal, family, and contact details, plus your profile photo.",
              },
              {
                step: "2",
                title: "Choose the template",
                text: "Select one beautiful template and let the system style it perfectly.",
              },
              {
                step: "3",
                title: "Download the PDF",
                text: "Receive your biodata PDF instantly and share it with confidence.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-[#ead6c7] bg-white p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6e3f1f] text-lg font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#2e1f17]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b4d3b]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Wall of Love
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-[#ecd7c8] bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={42}
                      height={42}
                      className="h-10 w-10 rounded-full border border-[#e3c9b4] bg-[#fff7ef]"
                    />
                    <h3 className="text-base font-bold text-[#2e1f17]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8d654a]">{item.date}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#694d3a]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-[#e9d7c9] bg-white p-6 md:p-8">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((question) => (
              <details
                key={question}
                className="group rounded-2xl border border-[#ecd7c8] bg-[#fffaf5] p-4"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-[#4d3426]">
                  {question}
                </summary>
                <p className="mt-2 text-sm text-[#6a4c39]">
                  Yes. Just fill your details, select a template, and generate
                  your PDF instantly.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e8d8ca] bg-[#f9efe6] px-4 py-12">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-2xl font-extrabold text-[#2e1f17] md:text-3xl">
            BioForm Builder
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6a4c39] md:text-base">
            Creating a marriage biodata is a meaningful step in your journey
            towards finding the right life partner.
          </p>
          <a
            href="#create"
            className="mt-6 inline-block rounded-xl bg-[#6e3f1f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5d3318]"
          >
            Create My Biodata
          </a>
          <p className="mt-6 text-xs text-[#8f6b52]">
            Copyright 2026 - BioForm Builder
          </p>
        </div>
      </footer>
    </main>
  );
}
