"use client";

import Button from "@/components/ui/Button";
import { useReveal } from "@/hooks/useScrollAnimation";

export default function CtaBanner1() {
  const { ref: sectionRef } = useReveal({ threshold: 0.2 });

  return (
    <section className="bg-white py-16 md:py-28">
      <div
        ref={sectionRef}
        className="cta1 max-w-screen-xl mx-auto px-6 md:px-16 flex flex-col md:flex-row md:items-end gap-10"
      >
        {/* Left column */}
        <div className="md:w-1/2 cta1-left">
          <span className="inline-block border border-black/20 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-black/50">
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
        <div className="md:w-1/2 cta1-right">
          <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-sm">
            Your graduation only happens once. The nerves, the laughter, the
            quiet pride in your parents&apos; eyes — these are the details that
            disappear fastest. A professional session doesn&apos;t just give you
            photos. It gives you a way back to exactly how this day felt, for
            the rest of your life.
          </p>

          <Button
            href="/contact"
            variant="ghost"
            color="dark"
            icon="arrow-right"
            className="mt-8"
          >
            Let&apos;s Capture It
          </Button>
        </div>
      </div>
    </section>
  );
}
