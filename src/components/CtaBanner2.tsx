"use client";

import Button from "@/components/ui/Button";
import { useReveal } from "@/hooks/useScrollAnimation";

export default function CtaBanner2() {
  const { ref: sectionRef } = useReveal({ threshold: 0.2 });

  return (
    <section className="bg-white py-16 md:py-28">
      <div
        ref={sectionRef}
        className="cta2 max-w-screen-xl mx-auto px-6 md:px-16"
      >
        <div className="cta2-content text-center mx-auto max-w-3xl flex flex-col items-center">
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
