"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "6281234567890"; // replace with actual number

const navLinks = ["Home", "Service", "Projects", "Contact Us"];

const categoryPills = [
  ["Outdoor", "Studio"],
  ["Candid", "Formal", "Events"],
];

const previewCards = [
  {
    title: "Golden Hour at the Quad",
    subtitle: "Shot at Universitas Indonesia",
    image: "https://picsum.photos/seed/hero-card-1/128/128",
  },
  {
    title: "A Symphony of Toques",
    subtitle: "Shot with Canon R5",
    image: "https://picsum.photos/seed/hero-card-2/128/128",
  },
  {
    title: "Last Bell, First Chapter",
    subtitle: "Shot at IPB University",
    image: "https://picsum.photos/seed/hero-card-3/128/128",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedEls = el.querySelectorAll(".hero-fade-up");
    animatedEls.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#2a1a0e]"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="https://res.cloudinary.com/dhtysfkix/video/upload/so_10,du_25,w_1280,c_limit,f_auto,q_auto,so_10/KAYANA-LEMMYA_VIDEO_z2hzcu.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dhtysfkix/video/upload/so_10,du_25,w_1280,c_limit,f_auto,q_auto/KAYANA-LEMMYA_VIDEO_z2hzcu.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Nav ── */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-16 lg:px-20 py-6">
        <span className="font-serif text-lg italic text-white">
          Kayana Moment
        </span>

        {/* Center: plain text nav with glass hover */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-sans text-sm text-white/80 hover:text-white px-4 py-1.5 rounded-full border border-transparent hover:bg-white/10 hover:border-white/20 hover:backdrop-blur-sm transition-all duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop: pill with WhatsApp icon + label */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-sans text-sm font-semibold text-black hover:bg-white/90 transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          Book a Session
        </a>

        {/* Mobile: circular WhatsApp icon only */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors"
          aria-label="Book a session on WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5" />
        </a>
      </nav>

      {/* ── Headline ── */}
      <div className="absolute bottom-48 left-8 md:left-16 lg:left-20 z-10">
        <h1 className="font-serif font-bold text-white text-4xl md:text-7xl lg:text-8xl tracking-tight leading-none">
          <span
            className="hero-fade-up block opacity-0 translate-y-4 transition-all duration-700"
            style={{ transitionDelay: "100ms" }}
          >
            We make your Graduation
          </span>
          <span
            className="hero-fade-up block opacity-0 translate-y-4 transition-all duration-700"
            style={{ transitionDelay: "200ms" }}
          >
            <span
              className="not-italic font-normal"
              style={{ fontFamily: "var(--font-pinyon-script)", fontSize: "1.15em" }}
            >
              effortless
            </span>
            <span className="italic"> captured.</span>
          </span>
        </h1>
      </div>

      {/* ── Bottom bar: pills (left) + slide counter (center) + cards (right) ── */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 z-10 flex justify-between">

        {/* Category tag pills */}
        <div
          className="hero-fade-up flex flex-col gap-2 opacity-0 translate-y-4 transition-all duration-700"
          style={{ transitionDelay: "500ms" }}
        >
          {categoryPills.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-2">
              {row.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 font-sans text-sm text-white"
                >
                  {pill}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Preview cards (desktop only) */}
        <div className="hidden md:flex gap-3">
          {previewCards.map((card) => (
            <div
              key={card.title}
              className="flex min-w-[240px] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold text-white leading-snug line-clamp-2">
                  {card.title}
                </p>
                <p className="font-sans text-xs text-white/50 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
