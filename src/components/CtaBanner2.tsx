"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

export default function CtaBanner2() {
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
            el.classList.add("cta2-visible");
            if (prefersReduced) {
              el.classList.add("cta2-no-transform");
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
        className="max-w-screen-xl mx-auto px-6 md:px-16"
      >
        <div className="cta2-content text-center mx-auto max-w-3xl flex flex-col items-center opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <span className="inline-block border border-black/20 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-black/50">
            One Last Thing
          </span>

          <h2 className="mt-6 font-serif font-bold italic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#111111] text-center">
            Don&apos;t let this moment
            <br />
            pass without a frame.
          </h2>

          <p className="mt-6 font-serif italic text-lg md:text-xl text-black/40 leading-relaxed text-center max-w-xl">
            Years from now, you won&apos;t remember the stress of the thesis or
            the chaos of the ceremony. You&apos;ll remember how it felt to
            finally be done — and we&apos;ll make sure you can see it.
          </p>

          <Button
            href="/contact"
            variant="ghost"
            color="dark"
            icon="arrow-right"
            className="mt-10"
          >
            Let&apos;s Capture It
          </Button>

          <p className="mt-4 text-xs text-black/30 tracking-wide">
            No commitment. Just a conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
