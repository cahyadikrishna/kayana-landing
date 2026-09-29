"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button, { WhatsAppIcon } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/navigation";

const WHATSAPP_NUMBER = "6281234567890"; // replace with actual number
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

const credits = [
  { index: "01", title: "A Symphony of Toques", meta: "Canon R5" },
  { index: "02", title: "Last Bell, First Chapter", meta: "IPB University" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 8h18" />
          <path d="M3 16h18" />
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
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-paper"
    >
      {/* Static background image */}
      <Image
        src="/assets/hero-bg-bw.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="anim-fade object-cover"
      />

      {/* Ink overlay for text legibility */}
      <div className="absolute inset-0 bg-ink-pure/30" />

      {/* ── Hero content: two-column layout ── */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        {/* Left column — headline, credits, scroll indicator */}
        <div className="relative z-30 flex w-full flex-col justify-start px-6 pt-28 pb-24 md:w-1/2 md:justify-between md:px-16 md:pb-10 lg:w-[45%] lg:pr-10 lg:pl-20">
          <h1
            className="anim-rise type-display text-center md:text-left"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            We make your Graduation <em>effortless</em> captured.
          </h1>

          <div>
            {/* Photo credits — catalog-style hairline rows (desktop only) */}
            <ul
              className="anim-fade mt-10 hidden max-w-sm md:block"
              style={{ "--i": 6 } as React.CSSProperties}
            >
              {credits.map((credit) => (
                <li
                  key={credit.index}
                  className="flex items-baseline gap-4 border-t border-paper/25 py-3 last:border-b"
                >
                  <span className="type-meta text-paper/50">{credit.index}</span>
                  <span className="type-caption flex-1">{credit.title}</span>
                  <span className="type-meta text-paper/50">{credit.meta}</span>
                </li>
              ))}
            </ul>

            {/* Scroll indicator */}
            <div className="scroll-indicator pointer-events-none mt-8 hidden flex-col items-start gap-2 md:flex">
              <span className="type-meta text-paper/50">Scroll</span>
              <svg
                width="14"
                height="22"
                viewBox="0 0 14 22"
                fill="none"
                className="text-paper/50"
                aria-hidden="true"
              >
                <path d="M7 2v14M2 11l5 6 5-6" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column — person assets */}
        <div className="pointer-events-none absolute right-0 bottom-0 h-[55%] w-full md:relative md:h-full md:w-1/2 lg:w-[55%]">
          {/* Person 3 — middle, lowest z */}
          <div className="absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2">
            <Image
              src="/assets/hero-person-3.png"
              alt="Graduate in red kebaya"
              width={4218}
              height={4450}
              sizes="(min-width: 768px) 40vw, 60vw"
              className="anim-person h-full w-max object-cover"
              style={{ "--i": 1 } as React.CSSProperties}
            />
          </div>

          {/* Person 1 — left, higher z */}
          <div className="absolute bottom-0 left-0 z-20 h-[70%]">
            <Image
              src="/assets/hero-person-1.png"
              alt="Graduate holding cap"
              width={1892}
              height={3058}
              sizes="(min-width: 768px) 25vw, 35vw"
              className="anim-person h-full w-auto"
              style={{ "--i": 3 } as React.CSSProperties}
            />
          </div>

          {/* Person 2 — right, higher z */}
          <div className="absolute right-0 bottom-0 z-20 h-[70%]">
            <Image
              src="/assets/hero-person-2.png"
              alt="Graduate in black kebaya with sash"
              width={1540}
              height={2818}
              sizes="(min-width: 768px) 25vw, 35vw"
              className="anim-person h-full w-auto"
              style={{ "--i": 5 } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="anim-fade absolute top-0 right-0 left-0 z-20 flex items-center justify-between border-b border-paper/20 px-6 py-5 md:px-16 lg:px-20">
        <a href="#home" className="type-subheading">
          Kayana Moment
        </a>

        {/* Desktop: center nav links */}
        <div className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline type-caption px-4 text-paper/80 transition-colors hover:text-paper lg:px-[30px]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: Book a Session — hands off to the sticky on scroll */}
        <div
          className={`hidden transition-opacity duration-400 md:inline-flex ${
            stickyCta ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <Button
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            tone="ink"
            icon={<WhatsAppIcon />}
          >
            Book a Session
          </Button>
        </div>

        {/* Mobile: menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors active:bg-paper/10 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <MenuIcon open={mobileMenuOpen} />
        </button>
      </nav>

      {/* ── Sticky booking CTA — desktop after scroll, always on mobile ── */}
      <div
        className={`fixed right-6 bottom-6 z-50 transition-all duration-400 md:right-8 md:bottom-8 ${
          stickyCta
            ? "opacity-100 md:translate-y-0"
            : "opacity-100 md:pointer-events-none md:translate-y-3 md:opacity-0"
        }`}
      >
        <Button
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          icon={<WhatsAppIcon />}
        >
          Book a Session
        </Button>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-400 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink-pure/60"
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 flex h-full w-[280px] flex-col border-l border-paper/20 bg-ink transition-transform duration-400 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-paper/20 px-6 py-5">
            <span className="type-meta text-paper/50">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors active:bg-paper/10"
              aria-label="Close menu"
            >
              <MenuIcon open={true} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-6 py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="type-heading border-b border-paper/20 py-4 text-paper/80 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
