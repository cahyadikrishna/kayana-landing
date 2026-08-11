"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

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

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Subtle parallax — video moves at 30% of scroll speed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        video.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#2a1a0e]">
      {/* Video background — parallax-bg enables GPU compositing */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="https://res.cloudinary.com/dhtysfkix/video/upload/so_10,du_25,w_1280,c_limit,f_auto,q_auto,so_10/KAYANA-LEMMYA_VIDEO_z2hzcu.jpg"
        className="anim-hero-media parallax-bg absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dhtysfkix/video/upload/so_10,du_25,w_1280,c_limit,f_auto,q_auto/KAYANA-LEMMYA_VIDEO_z2hzcu.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Nav ── */}
      <nav className="anim-nav absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-16 lg:px-20 py-6">
        <span className="font-serif text-lg italic text-white">
          Kayana Moment
        </span>

        {/* Center: nav links with underline-reveal micro-interaction */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-white/80 hover:text-white px-4 py-1.5 rounded-full border border-transparent hover:bg-white/10 hover:border-white/20 hover:backdrop-blur-sm transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop: Book a Session */}
        <Button
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          color="light"
          icon="whatsapp"
          iconPosition="left"
          className="hidden md:inline-flex [&_svg]:text-[#25D366]"
        >
          Book a Session
        </Button>

        {/* Mobile: circular WhatsApp icon */}
        <Button
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="icon-only"
          color="green"
          icon="whatsapp"
          className="flex md:hidden"
          aria-label="Book a session on WhatsApp"
        />
      </nav>

      {/* ── Headline — orchestrated load sequence ── */}
      <div className="absolute bottom-48 left-8 md:left-16 lg:left-20 z-10">
        <h1 className="font-serif font-bold text-white text-4xl md:text-7xl lg:text-8xl tracking-tight leading-none">
          <span className="anim-headline-1 block">
            We make your Graduation
          </span>
          <span className="anim-headline-2 block">
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

      {/* ── Bottom bar: pills (left) + cards (right) ── */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 z-10 flex justify-between">

        {/* Category tag pills */}
        <div className="anim-pills flex flex-col gap-2">
          {categoryPills.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-2">
              {row.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white"
                >
                  {pill}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Preview cards (desktop only) */}
        <div className="anim-preview-cards hidden md:flex gap-3">
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
                <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                  {card.title}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Scroll Indicator — gentle bounce loop ── */}
      {/* Outer div handles centering; inner div handles animation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            className="text-white/45"
            aria-hidden="true"
          >
            <path
              d="M7 2v14M2 11l5 6 5-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
