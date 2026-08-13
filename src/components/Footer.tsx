"use client";

import Button from "@/components/ui/Button";
import { useReveal } from "@/hooks/useScrollAnimation";
import SectionLabel from "./ui/SectionLabel";

const navLinks = ["About Us", "Projects", "Services", "Terms & Conditions"];

export default function Footer() {
  const { ref: footerRef } = useReveal({ threshold: 0.1 });

  return (
    <footer className="px-3 py-3 md:px-8 md:py-8">
      <div
        ref={footerRef}
        className="footer rounded-2xl bg-[#1a1c18] border border-white/5 overflow-hidden px-6 py-10 md:px-14 md:py-16"
      >
        {/* Top zone */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Left — CTA headline */}
          <div className="md:w-1/2">
            <SectionLabel color="dark" className="mb-3">
              Contact Us
            </SectionLabel>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight text-white">
              <span
                className="block footer-fade"
                style={{ transitionDelay: "100ms" }}
              >
                Let&apos;s capture your vision with us
              </span>
            </h2>
          </div>

          {/* Right — contact details */}
          <div
            className="md:w-1/3 flex flex-col items-start md:items-end justify-center gap-2 footer-fade"
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-sm text-white/50">
              Bali, Indonesia
            </p>
            <a
              href="https://wa.me/6289606620616"
              target="_blank"
              rel="noopener noreferrer"
              className="link-reveal text-sm text-white/50 hover:text-white transition-all duration-300"
            >
              +62 812-3456-7890
            </a>
            <a
              href="mailto:hello@kayanamoment.com"
              className="link-reveal text-sm text-white/50 hover:text-white transition-all duration-300"
            >
              hello@kayanamoment.com
            </a>
            <a
              href="https://instagram.com/kayanamoment"
              target="_blank"
              rel="noopener noreferrer"
              className="link-reveal text-sm text-white/50 hover:text-white transition-all duration-300"
            >
              @kayanamoment
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8 border-t border-white/10" />

        {/* Bottom zone */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 footer-fade"
          style={{ transitionDelay: "500ms" }}
        >
          {/* Left — logo */}
          <div className="flex items-center">
            <span className="ml-2 font-serif italic text-white text-base">
              Kayana Moment
            </span>
          </div>

          {/* Center — nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="link-reveal text-xs md:text-sm text-white/40 hover:text-white/80 transition-all duration-300 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — copyright */}
          <p className="text-xs text-white/30">
            ©Kayana Moment {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
