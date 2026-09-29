"use client";

import Image from "next/image";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "Kayana Moment captured everything I didn’t know I needed. The candid shots between the formal ones are my absolute favorites.",
    name: "Alya Ramadhani",
    occasion: "Universitas Indonesia — Class of 2024",
  },
  {
    quote:
      "I was nervous in front of the camera but they made it feel completely natural. Every photo tells a real story.",
    name: "Bintang Prasetyo",
    occasion: "ITB Graduation — Engineering Faculty",
  },
  {
    quote:
      "The golden hour session was beyond anything I imagined. I still get emotional looking at the photos.",
    name: "Sari Kusuma",
    occasion: "UGM — Faculty of Medicine, 2023",
  },
  {
    quote:
      "Professional, warm, and incredibly talented. Our whole family cried when we saw the final gallery.",
    name: "Reza & Ibu Hartono",
    occasion: "Family Session — Wisuda IPB 2024",
  },
  {
    quote:
      "Worth every penny. These photos will be on our walls forever. Kayana Moment truly understands the emotion of the day.",
    name: "Nadya Fitriani",
    occasion: "Universitas Brawijaya — Class of 2024",
  },
];

export default function Testimonials() {
  const { ref } = useReveal({ threshold: 0.15 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden bg-ink py-section text-paper"
    >
      {/* Full-bleed photograph carries the atmosphere; a flat ink veil keeps text legible */}
      <Image
        src="https://picsum.photos/seed/gradmoody/1600/900"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center grayscale"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/75" />

      <div className="relative z-10 container-page">
        {/* Section header row */}
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel tone="ink" index={4}>
              What They Say
            </SectionLabel>
            <h2 className="type-title mt-6">
              Kind <em>words</em>.
            </h2>
          </div>
          <p className="type-caption max-w-xs text-paper/60">
            Every session leaves a story. Here are a few.
          </p>
        </div>

        <Divider tone="ink" className="mt-12" />

        {/* Ruled columns — scroll horizontally past three */}
        <div className="scroll-x-container -mx-6 flex snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 md:mx-0 md:scroll-px-0 md:px-0">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className="reveal flex w-[85%] shrink-0 snap-start flex-col border-l border-paper/20 py-10 pr-8 pl-6 first:border-l-0 first:pl-0 md:w-1/3 md:pr-10 md:pl-10"
              style={{ "--i": Math.min(i, 3) + 1 } as React.CSSProperties}
            >
              <p className="type-quote flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8">
                <p className="type-caption">{t.name}</p>
                <p className="type-meta mt-1 text-paper/50">{t.occasion}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <Divider tone="ink" />
      </div>
    </section>
  );
}
