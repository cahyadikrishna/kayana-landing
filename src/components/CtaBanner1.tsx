"use client";

import { useEffect, useRef } from "react";

export default function CtaBanner1() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("cta1-visible");
            if (prefersReduced) {
              el.classList.add("cta1-no-transform");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 md:py-28">
      <div
        ref={sectionRef}
        className="max-w-screen-xl mx-auto px-6 md:px-16 flex flex-col md:flex-row md:items-end gap-10"
      >
        {/* Left column */}
        <div className="md:w-1/2 cta1-left opacity-0 -translate-x-5 transition-all duration-600 ease-out">
          <span className="inline-block border border-black/20 rounded-full px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-black/50">
            About Us
          </span>

          <h2 className="mt-6 font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-[#111111] max-w-lg">
            The moments that
            <br />
            mark the end of one
            <br />
            <span className="italic">chapter, and the</span>
            <br />
            beginning of everything.
          </h2>
        </div>

        {/* Right column */}
        <div className="md:w-1/2 cta1-right opacity-0 translate-x-5 transition-all duration-600 ease-out">
          <p className="font-sans text-sm md:text-base text-black/60 leading-relaxed max-w-sm">
            Your graduation only happens once. The nerves, the laughter, the
            quiet pride in your parents&apos; eyes — these are the details that
            disappear fastest. A professional session doesn&apos;t just give you
            photos. It gives you a way back to exactly how this day felt, for
            the rest of your life.
          </p>

          <a
            href="/contact"
            className="group inline-flex items-center rounded-full border border-black/20 overflow-hidden hover:border-black/40 transition-colors duration-200 mt-8"
          >
            <span className="px-6 py-3 font-sans font-semibold text-sm tracking-wide text-black whitespace-nowrap bg-transparent group-hover:bg-black/5 transition-colors duration-200">
              LET&apos;S CAPTURE IT
            </span>
            <span className="w-10 h-10 bg-black flex items-center justify-center text-white text-sm">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
