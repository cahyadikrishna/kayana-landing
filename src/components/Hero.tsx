"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dhtysfkix/video/upload/v1773479195/KAYANA-LEMMYA_VIDEO_z2hzcu.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Nav (floating over video) ── */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <rect x="2" y="2" width="9" height="9" fill="currentColor" />
            <rect x="13" y="2" width="9" height="9" fill="currentColor" />
            <rect x="2" y="13" width="9" height="9" fill="currentColor" />
            <rect x="13" y="13" width="9" height="9" fill="currentColor" />
          </svg>
          <span className="font-serif text-lg italic text-white">
            Kayana Moment
          </span>
        </div>

        {/* Center: pill nav */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-2 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-sans text-sm text-white/80 hover:text-white px-4 py-1.5 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: CTA buttons */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:inline-block rounded-full bg-white px-5 py-2 font-sans text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Book a Session
          </a>
          <a
            href="#contact"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            aria-label="Book a session"
          >
            ↗
          </a>
        </div>
      </nav>

      {/* ── Headline (bottom-left) ── */}
      <div className="absolute bottom-48 left-6 md:left-16 z-10">
        <h1 className="font-serif font-bold text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
          <span
            className="hero-fade-up block opacity-0 translate-y-4 transition-all duration-700"
            style={{ transitionDelay: "100ms" }}
          >
            We make your
          </span>
          <span
            className="hero-fade-up block opacity-0 translate-y-4 transition-all duration-700"
            style={{ transitionDelay: "200ms" }}
          >
            Graduation effortless
          </span>
          <span
            className="hero-fade-up block opacity-0 translate-y-4 transition-all duration-700 italic"
            style={{ transitionDelay: "300ms" }}
          >
            captured.
          </span>
        </h1>
      </div>

      {/* ── Category tag pills (bottom-left, below headline) ── */}
      <div
        className="hero-fade-up absolute bottom-6 md:bottom-8 left-6 md:left-16 z-10 flex flex-col gap-2 opacity-0 translate-y-4 transition-all duration-700"
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

      {/* ── Slide counter + progress bar (bottom-center, desktop only) ── */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <span className="font-sans text-xs text-white/60">01</span>
        <div className="relative h-px w-24 bg-white/20">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-white" />
        </div>
        <span className="font-sans text-xs text-white/60">03</span>
      </div>

      {/* ── Project preview cards (bottom-right) ── */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-16 z-10 flex gap-3 overflow-x-auto scroll-x-container max-w-[calc(100vw-12rem)]">
        {previewCards.map((card) => (
          <div
            key={card.title}
            className="flex min-w-[260px] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
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
    </section>
  );
}
