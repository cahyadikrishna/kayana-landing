"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/navigation";

const WHATSAPP_NUMBER = "6281234567890"; // replace with actual number

const categoryPills = [
  ["Outdoor", "Studio"],
  ["Candid", "Formal", "Events"],
];

const previewCards = [
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-white"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 12h18" />
          <path d="M3 6h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyCta, setStickyCta] = useState(false);

  // Sticky CTA scroll trigger
  useEffect(() => {
    const onScroll = () => {
      setStickyCta(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-[#2a1a0e]"
    >
      {/* Static background image */}
      <Image
        src="/assets/hero-bg-bw.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="anim-hero-media object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Person cutouts — overlapping trio, staggered slide-up ── */}
      {/* z order: person 3 (middle, lowest) < person 1 (left) = person 2 (right) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[38svh] w-[min(95vw,430px)] -translate-x-1/2 md:left-auto md:right-0 md:h-[85%] md:w-[58%] md:translate-x-0 lg:w-[50%] xl:w-[40%]">
        {/* Person 3 — middle, lowest index */}
        <div className="absolute bottom-0 z-10 h-full">
          <Image
            src="/assets/hero-person-3.png"
            alt="Graduate in red kebaya"
            width={4218}
            height={4450}
            sizes="(min-width: 768px) 40vw, 60vw"
            className="anim-person-3 h-full w-max object-cover"
          />
        </div>
        {/* Person 1 — left of person 3, one index higher */}
        <div className="absolute bottom-0 left-[-150px] z-20 h-[70%]">
          <Image
            src="/assets/hero-person-1.png"
            alt="Graduate holding cap"
            width={1892}
            height={3058}
            sizes="(min-width: 768px) 25vw, 35vw"
            className="anim-person-1 h-full w-auto"
          />
        </div>
        {/* Person 2 — right of person 3, higher index than person 3 */}
        <div className="absolute bottom-0 right-0 z-20 h-[70%]">
          <Image
            src="/assets/hero-person-2.png"
            alt="Graduate in black kebaya with sash"
            width={1540}
            height={2818}
            sizes="(min-width: 768px) 25vw, 35vw"
            className="anim-person-2 h-full w-auto"
          />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="anim-nav absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-16 lg:px-20 py-6">
        <span className="font-serif text-lg italic text-white">
          Kayana Moment
        </span>

        {/* Desktop: center nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 hover:text-white px-4 py-1.5 rounded-full border border-transparent hover:bg-white/10 hover:border-white/20 hover:backdrop-blur-sm transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: Book a Session — green, flies to sticky on scroll */}
        <div
          className={`hidden md:inline-flex transition-all duration-500 ease-out ${
            stickyCta
              ? "opacity-0 scale-75 translate-x-4 translate-y-3 pointer-events-none"
              : "opacity-100 scale-100 translate-x-0 translate-y-0"
          }`}
        >
          <Button
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            color="green"
            icon="whatsapp"
            iconPosition="left"
          >
            Book a Session
          </Button>
        </div>

        {/* Mobile: hamburger menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors active:bg-white/20"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <HamburgerIcon open={mobileMenuOpen} />
        </button>
      </nav>

      {/* ── Desktop sticky CTA (flying clone) ── */}
      <div
        className={`fixed z-50 hidden md:block transition-all duration-500 ease-out ${
          stickyCta
            ? "bottom-8 right-8 opacity-100 scale-100 translate-x-0 translate-y-0"
            : "bottom-8 right-8 opacity-0 scale-75 translate-x-4 -translate-y-3 pointer-events-none"
        }`}
      >
        <Button
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          color="green"
          icon="whatsapp"
          iconPosition="left"
          className="shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          Book a Session
        </Button>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-[#2a1a0e]/95 backdrop-blur-xl border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <span className="font-serif text-lg italic text-white">
              Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 transition-colors active:bg-white/20"
              aria-label="Close menu"
            >
              <HamburgerIcon open={true} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1 px-6 py-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-white/80 hover:text-white py-3 border-b border-white/10 transition-colors"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Headline — orchestrated load sequence ── */}
      <div className="absolute bottom-[46%] left-8 right-8 md:bottom-48 md:right-auto md:left-16 lg:left-20 md:w-1/2 lg:w-[45%] z-10">
        <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl text-center md:text-left md:text-6xl lg:text-8xl tracking-tight leading-tight md:leading-none">
          <span className="anim-headline-1 block">
            We make your Graduation <span className="font-italic">effortless</span> captured.
          </span>
        </h1>
      </div>

      {/* ── Bottom bar: pills (left) + cards (right) ── */}
      <div className="absolute bottom-24 md:bottom-8 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 z-10 flex justify-center md:justify-between">

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

      {/* ── Mobile sticky CTA — always visible on mobile ── */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          color="green"
          icon="whatsapp"
          iconPosition="left"
          size="sm"
          className="shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          Book a Session
        </Button>
      </div>
    </section>
  );
}
