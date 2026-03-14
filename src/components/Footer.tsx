"use client";

import { useEffect, useRef } from "react";

const navLinks = ["About Us", "Projects", "Services", "Terms & Conditions"];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="px-3 py-3 md:px-8 md:py-8">
      <div
        ref={footerRef}
        className="rounded-2xl bg-[#1a1c18] border border-white/5 overflow-hidden px-6 py-10 md:px-14 md:py-16 opacity-0 translate-y-6 transition-all duration-700 ease-out"
      >
        {/* Top zone */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Left — CTA headline */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <span className="block font-sans text-xs uppercase tracking-widest text-white/30">
                [005]
              </span>
              <span className="block font-sans text-xs uppercase tracking-widest text-white/30 mt-1">
                Contact Us
              </span>
            </div>

            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight text-white">
              <span
                className="block footer-fade opacity-0 translate-y-4 transition-all duration-700"
                style={{ transitionDelay: "100ms" }}
              >
                Let&apos;s{" "}
                <span className="font-serif italic">capture</span> your
              </span>
              <span
                className="block footer-fade opacity-0 translate-y-4 transition-all duration-700"
                style={{ transitionDelay: "200ms" }}
              >
                vision{" "}
                <a
                  href="#contact"
                  className="group inline-flex items-center align-middle mx-1 md:mx-3 rounded-full border border-white/20 overflow-hidden"
                >
                  <span className="px-4 py-1.5 md:px-5 md:py-2 bg-white/10 text-white font-sans font-semibold text-xs md:text-sm tracking-wide whitespace-nowrap group-hover:bg-white/20 transition-colors duration-200">
                    BOOK A SESSION
                  </span>
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center text-black text-sm border-l border-white/20">
                    →
                  </span>
                </a>{" "}
                with
              </span>
              <span
                className="block footer-fade opacity-0 translate-y-4 transition-all duration-700"
                style={{ transitionDelay: "300ms" }}
              >
                us
              </span>
            </h2>
          </div>

          {/* Right — contact details */}
          <div
            className="md:w-1/3 flex flex-col items-start md:items-end justify-center gap-2 footer-fade opacity-0 translate-y-4 transition-all duration-700"
            style={{ transitionDelay: "300ms" }}
          >
            <p className="font-sans text-sm text-white/50">
              Bandung, Indonesia
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              +62 812-3456-7890
            </a>
            <a
              href="mailto:hello@kayanamoment.com"
              className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              hello@kayanamoment.com
            </a>
            <a
              href="https://instagram.com/kayanamoment"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              @kayanamoment
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8 border-t border-white/10" />

        {/* Bottom zone */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 footer-fade opacity-0 translate-y-4 transition-all duration-700"
          style={{ transitionDelay: "500ms" }}
        >
          {/* Left — logo */}
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <rect x="2" y="2" width="9" height="9" fill="currentColor" />
              <rect x="13" y="2" width="9" height="9" fill="currentColor" />
              <rect x="2" y="13" width="9" height="9" fill="currentColor" />
              <rect x="13" y="13" width="9" height="9" fill="currentColor" />
            </svg>
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
                className="font-sans text-xs md:text-sm text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — copyright */}
          <p className="font-sans text-xs text-white/30">
            ©Kayana 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
