import Image from "next/image";
import {
  Brush,
  Facebook,
  Instagram,
  LayoutTemplate,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";
import BiodataForm from "@/components/BiodataForm";
import FAQAccordion from "@/components/FAQAccordion";
import LiveBiodataCount from "@/components/LiveBiodataCount";
import MarriageFormatSection from "@/components/MarriageFormatSection";
import TemplateCarousel from "@/components/TemplateCarousel";
import WhatsAppDeliveryCard from "@/components/WhatsAppDeliveryCard";

export default function Home() {
  const testimonials = [
    {
      name: "Vinod Jethwa",
      date: "Jan 8, 2025",
      title: "Seamless work and less time consuming",
      text: "Its seamless work and less time consuming. Just have your details ready, choose your desired template, and download instantly. The pricing feels fair and the process is super convenient.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
    {
      name: "Nehal Patel",
      date: "Sep 17, 2024",
      title: "Excellent Website",
      text: "Excellent website to create biodata. Very good formats are available and the support team is responsive whenever changes are needed.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
    {
      name: "Rahul Srivastava",
      date: "Mar 20, 2025",
      title: "Amazing service by team",
      text: "There was a small glitch in downloaded PDF details, and the support team fixed it quickly. Really smooth experience and very helpful service overall.",
      avatar: "https://biodatamaker.app/images/resources/avatar.png",
    },
  ];

  const whyChooseItems = [
    {
      title: "Easy to use",
      text: "No signup complexity. Enter your details, choose a template, and your biodata PDF is ready in minutes.",
      icon: Sparkles,
    },
    {
      title: "Customization made simple",
      text: "You control every detail. Add, remove, and edit sections so your biodata matches your preferences perfectly.",
      icon: Brush,
    },
    {
      title: "Great Looking Templates",
      text: "Unique, clean, and elegant designs crafted specifically for matrimonial biodata formats.",
      icon: LayoutTemplate,
    },
  ];

  const faqs = [
    {
      question: "Do I need design skills to create a marriage biodata?",
      answer:
        "No design skills are required. Just enter your details, choose a template, and generate your biodata PDF in minutes.",
    },
    {
      question: "Can I add my profile photo in the biodata?",
      answer:
        "Yes, you can upload your photo while filling the form. The image is included in your biodata output.",
    },
    {
      question: "Do I need to register before creating biodata?",
      answer:
        "You can quickly sign in and save details to Firebase so your biodata information is available when you return.",
    },
    {
      question: "What format will I get after download?",
      answer:
        "You will receive a clean PDF format designed for easy sharing with families and potential matches.",
    },
    {
      question: "Can I include custom fields for my community?",
      answer:
        "Yes. The form is flexible and supports extended details so you can include community-specific information.",
    },
  ];

  return (
    <main className="landing-root min-h-screen">
      <section className="relative overflow-hidden">
        <div className="hero-ribbon absolute inset-x-0 top-0 h-[78%]" />
        <div className="hero-cut absolute -bottom-48 left-0 right-0 z-[1] h-96 bg-white" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8 lg:px-10">
          <nav className="flex items-center justify-between py-1">
            <p className="text-[28px] font-black leading-none tracking-[-0.03em] text-[#2d2433] md:text-[32px]">
              biodatamaker.app
            </p>

            <div className="ml-auto flex items-center gap-3 pr-2 md:gap-7 md:pr-0">
              <a
                href="#"
                className="text-[16px] font-bold text-[#2f2c33] md:text-[18px]"
              >
                Blog
              </a>
              <a
                href="#create"
                className="rounded-full bg-[#ea1f5c] px-5 py-2 text-xs font-bold text-white shadow-[0_8px_22px_rgba(234,31,92,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d41851] md:px-8 md:py-2.5 md:text-[16px]"
              >
                Create My Biodata
              </a>
            </div>
          </nav>

          <div className="relative mt-8 grid items-start gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 lg:gap-10">
            <header className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
              <h1 className="text-[38px] font-black leading-[1.06] tracking-[-0.03em] text-[#201f2b] md:text-[64px] lg:text-[70px]">
                The Ultimate
                <br />
                Marriage Biodata
                <br />
                Maker
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#3c3b45] md:mx-0 md:text-[22px] md:leading-[1.34]">
                Create beautiful biodata for marriage with just a few clicks!
                Easy to use, fully customizable, elegantly designed marriage
                biodata formats
              </p>

              <a
                href="#create"
                className="mt-10 inline-flex rounded-full bg-[#ea1f5c] px-7 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(234,31,92,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d41851] md:px-9 md:text-[20px]"
              >
                Create My Biodata
              </a>

              <p className="mt-6 flex items-center justify-center gap-2 text-[20px] text-[#3a3a40] md:justify-start">
                <LiveBiodataCount />
              </p>
            </header>

            <div className="relative hidden min-h-[460px] md:block md:pr-8 lg:min-h-[520px] lg:pr-10">
              <div className="absolute right-[8.25rem] top-[6.75rem] h-[320px] w-[225px] rotate-[-10deg] overflow-hidden rounded-sm border-[3px] border-[#b57b34] bg-white shadow-[0_26px_45px_rgba(70,55,30,0.2)] lg:right-[10.25rem] lg:top-[7.25rem] lg:h-[350px] lg:w-[245px]">
                <Image
                  src="https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fwhite-brown-theme-marriage-biodata-sample-format-girl.png&w=640&q=75"
                  alt="Marriage biodata preview"
                  fill
                  className="object-cover object-top"
                  sizes="380px"
                />
              </div>

              <div className="absolute right-[2.25rem] top-[1.5rem] h-[390px] w-[270px] overflow-hidden rounded-sm border-[5px] border-[#d4a35f] bg-white shadow-[0_26px_45px_rgba(70,55,30,0.25)] lg:right-[3.25rem] lg:top-[2rem] lg:h-[430px] lg:w-[300px]">
                <Image
                  src="https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Fpopular-hindu-marriage-biodata-format.png&w=640&q=75"
                  alt="Marriage biodata central preview"
                  fill
                  className="object-cover object-top"
                  sizes="420px"
                />
              </div>

              <div className="absolute right-[0.75rem] top-[9.25rem] h-[300px] w-[210px] rotate-[10deg] overflow-hidden rounded-sm border border-[#d8d5d7] bg-[#f5efed] shadow-[0_20px_35px_rgba(72,72,72,0.2)] lg:right-[1.25rem] lg:top-[10rem] lg:h-[330px] lg:w-[230px]">
                <Image
                  src="https://biodatamaker.app/_next/image?url=%2Fimages%2Fexamples%2Felegant-marriage-biodata-sample-boy.png&w=640&q=75"
                  alt="Marriage biodata side preview"
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="templates"
        className="bg-[#e8e7ef] px-4 pb-14 pt-10 md:pb-20 md:pt-14"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Beautifully Handcrafted Marriage Biodata Templates
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[#694d3a]">
            Choose from polished formats designed to look neat, professional,
            and family-friendly right away.
          </p>
          <TemplateCarousel />
        </div>
      </section>

      <section id="create" className="mt-6 px-4 pb-14 md:mt-10 md:pb-20">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-[#dbc8bd] bg-white shadow-[0_22px_60px_rgba(110,63,31,0.1)]">
          <header className="bg-[linear-gradient(100deg,#d892b5_0%,#f2c58d_56%,#8fb6c2_100%)] px-6 py-10 text-center md:px-10 md:py-12">
            <h2 className="text-4xl font-black tracking-[-0.02em] text-[#22202a] md:text-6xl">
              Marriage Biodata Form
            </h2>
            <p className="mt-3 text-xl text-[#282532] md:text-4xl">
              Start creating your Marriage Biodata
            </p>
          </header>

          <div className="space-y-5 bg-[#f5f4f7] p-5 md:p-8">
            <div className="mx-auto w-full max-w-6xl">
              <BiodataForm />
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <WhatsAppDeliveryCard />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e7e4f0] px-4 pb-12 pt-14 md:pb-16 md:pt-18">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-4xl">
            Create your Perfect Marriage Biodata in Just 3 Easy Steps
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-center text-lg leading-[1.55] text-[#383643] md:text-[28px]">
            Simply add your personal, family, and contact details. Choose a
            polished template and get your beautiful biodata in PDF format.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your information",
                text: "Simply add your personal, family, and contact details. You can also add a profile photo for your biodata.",
              },
              {
                step: "2",
                title: "Choose the template",
                text: "Create biodata with our wide variety of well-designed templates. Just select one and we do the rest.",
              },
              {
                step: "3",
                title: "Download the PDF",
                text: "Everything is done now, and you will get your final biodata in PDF format instantly.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-[#cdc8dc] bg-[#f4f2fa] p-6 shadow-[0_14px_36px_rgba(59,45,78,0.08)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2d39] text-lg font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#1f1c28]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4f4a57]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff4e8] px-4 pb-10 pt-12 md:pb-14 md:pt-14">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#252230] md:text-4xl">
            Why Choose Our Marriage Biodata Maker
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {whyChooseItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[#ecd9c8] bg-[#fffdfa] p-6 shadow-[0_12px_30px_rgba(96,63,37,0.08)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eadf] text-[#734d33]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[#2f241c]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6a4a35]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#edf4fb] px-4 pb-14 pt-12 md:pb-20 md:pt-14">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold text-[#1f2b3b] md:text-4xl">
            Wall of Love
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[#4a5f76]">
            Real feedback from users who created their marriage biodata with us.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-[#cedbe8] bg-white p-6 shadow-[0_14px_32px_rgba(44,84,125,0.1)]"
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
                    <h3 className="text-base font-bold text-[#1f2b3b]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5e748d]">{item.date}</p>
                </div>

                <div className="mt-3 text-[#f3b21d]">★★★★★</div>
                <h4 className="mt-3 text-base font-bold text-[#1f2b3b]">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#4a5f76]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MarriageFormatSection />

      <section className="mt-6 px-4 pb-16 pt-4 md:mt-10 md:pb-24 md:pt-8">
        <div className="mx-auto w-full max-w-7xl rounded-[2.1rem] border border-[#e9d7c9] bg-white p-6 md:p-8">
          <h2 className="text-center text-3xl font-extrabold text-[#2e1f17] md:text-[3rem]">
            Frequently Asked Questions
          </h2>

          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="px-4 pb-8 md:pb-10">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] bg-[#c4cce8] px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="mx-auto max-w-6xl text-2xl font-extrabold leading-[1.2] text-[#22232c] md:text-[2.7rem]">
            Creating a Marriage Biodata is a meaningful step in your journey
            towards finding the right life partner.
          </h2>
          <p className="mt-8 text-base text-[#1f2230] md:text-xl">
            Start your journey with us today!
          </p>

          <a
            href="#create"
            className="mt-10 inline-flex rounded-full bg-[#e61f5e] px-10 py-4 text-sm font-bold text-white shadow-[0_12px_26px_rgba(230,31,94,0.28)] transition hover:-translate-y-0.5 hover:bg-[#cf184f] md:mt-12 md:px-14 md:text-lg"
          >
            Create My Biodata
          </a>
        </div>
      </section>

      <footer className="bg-[#212125] px-4 pb-4 pt-14 text-[#eef0f6]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-[#e8ebf4]">About Us</h3>
            <p className="mt-4 text-sm leading-[1.55] text-[#f5f7fd] md:text-base">
              Welcome to our online matrimonial biodata maker! We are a team of
              dedicated professionals with a passion for making the process of
              creating a biodata simple, easy, and enjoyable.
            </p>
            <p className="mt-4 text-sm leading-[1.55] text-[#f5f7fd] md:text-base">
              We understand the importance of finding the right match and
              believe that a great biodata is the first step in that journey.
              That&apos;s why we have made our tool easy to use and
              customizable, allowing you to create a beautiful biodata that
              truly represents you.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e8ebf4]">
              Connect with us
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:support@biodatamaker.app"
                aria-label="Email"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4a4b51] text-[#f5f7fd] transition hover:bg-[#5a5b62]"
              >
                <Mail className="h-7 w-7" />
              </a>
              <a
                href="https://www.instagram.com/biodatamakerapp"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4a4b51] text-[#f5f7fd] transition hover:bg-[#5a5b62]"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href="https://in.pinterest.com/biodatamaker/"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4a4b51] text-[#f5f7fd] transition hover:bg-[#5a5b62]"
              >
                <span className="text-2xl font-bold">P</span>
              </a>
              <a
                href="https://www.facebook.com/biodatamaker/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4a4b51] text-[#f5f7fd] transition hover:bg-[#5a5b62]"
              >
                <Facebook className="h-7 w-7" />
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xl font-bold text-white md:text-2xl">Google</p>
              <div className="mt-2 flex items-center gap-3 text-[#f3c72f]">
                <span className="text-xl font-bold text-[#f5f7fd] md:text-2xl">
                  4.6
                </span>
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
              </div>
              <a
                href="https://www.google.com/maps/place/Biodatamaker/@21.0680074,82.7525294,5z/data=!4m8!3m7!1s0xa3916263c8a5f127:0x5a5a1e379a48f236!8m2!3d21.0680074!4d82.7525294!9m1!1b1!16s%2Fg%2F11y31lgs_7"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-[#d4dcf1] underline underline-offset-4 transition hover:text-white"
              >
                Read our reviews
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e8ebf4]">Support</h3>
            <div className="mt-4 space-y-3 text-sm md:text-base">
              <a
                href="#"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Refund Policy
              </a>
              <a
                href="#"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Shipping and Delivery Policy
              </a>
              <a
                href="#"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e8ebf4]">Resources</h3>
            <div className="mt-4 space-y-3 text-sm md:text-base">
              <a
                href="https://biodatamaker.app/blog"
                target="_blank"
                rel="noreferrer"
                className="block text-[#f5f7fd] transition hover:text-white"
              >
                Blog
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 w-full max-w-7xl border-t border-[#35363d] pt-5 text-center text-sm text-[#aeb6cc]">
          Copyright 2026 - biodatamaker.app
        </p>
      </footer>
    </main>
  );
}
