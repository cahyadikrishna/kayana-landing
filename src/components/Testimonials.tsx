"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "@/styles/testimonials.css";

const testimonials = [
  {
    quote:
      "Kayana Moment captured everything I didn\u2019t know I needed. The candid shots between the formal ones are my absolute favorites.",
    name: "Alya Ramadhani",
    occasion: "Universitas Indonesia \u2014 Class of 2024",
    position: { top: "40px", left: "4%" },
    floatClass: "float-card-1",
  },
  {
    quote:
      "I was nervous in front of the camera but they made it feel completely natural. Every photo tells a real story.",
    name: "Bintang Prasetyo",
    occasion: "ITB Graduation \u2014 Engineering Faculty",
    position: { top: "160px", left: "22%" },
    floatClass: "float-card-2",
  },
  {
    quote:
      "The golden hour session was beyond anything I imagined. I still get emotional looking at the photos.",
    name: "Sari Kusuma",
    occasion: "UGM \u2014 Faculty of Medicine, 2023",
    position: { top: "30px", right: "5%" },
    floatClass: "float-card-3",
  },
  {
    quote:
      "Professional, warm, and incredibly talented. Our whole family cried when we saw the final gallery.",
    name: "Reza & Ibu Hartono",
    occasion: "Family Session \u2014 Wisuda IPB 2024",
    position: { bottom: "80px", right: "20%" },
    floatClass: "float-card-4",
  },
  {
    quote:
      "Worth every penny. These photos will be on our walls forever. Kayana Moment truly understands the emotion of the day.",
    name: "Nadya Fitriani",
    occasion: "Universitas Brawijaya \u2014 Class of 2024",
    position: { bottom: "60px", left: "6%" },
    floatClass: "float-card-5",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("testimonials-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen bg-black"
    >
      {/* Background image */}
      <Image
        src="https://picsum.photos/seed/gradmoody/1600/900"
        alt="Moody graduation backdrop"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_100%)] pointer-events-none" />

      {/* Section heading */}
      <div className="relative z-10 pt-20 px-8 md:px-16">
        <span className="block font-sans text-xs uppercase tracking-widest text-white/40 mb-3">
          [What they say]
        </span>
        <h2 className="font-serif font-bold italic text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          Kind Words.
        </h2>
        <p className="mt-3 font-sans text-sm text-white/40 max-w-xs">
          Every session leaves a story. Here are a few.
        </p>
      </div>

      {/* Cards — desktop: absolute scattered / mobile: stacked */}

      {/* Mobile stack */}
      <div className="relative z-10 flex flex-col gap-5 px-6 py-10 md:hidden">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`float-card ${t.floatClass} w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 opacity-0 translate-y-5 transition-all duration-700`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p className="font-serif italic text-4xl text-white/20 leading-none mb-2">
              &ldquo;
            </p>
            <p className="font-serif italic text-white text-base leading-relaxed">
              {t.quote}
            </p>
            <div className="mt-4 mb-3 border-t border-white/10" />
            <p className="font-sans font-semibold text-white text-sm">
              {t.name}
            </p>
            <p className="font-sans text-white/40 text-xs tracking-wide uppercase mt-0.5">
              {t.occasion}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop scattered */}
      <div className="hidden md:block relative z-10 w-full min-h-[800px]">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`float-card ${t.floatClass} absolute w-72 md:w-80 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 md:p-7 opacity-0 translate-y-5 transition-all duration-700`}
            style={{ ...t.position, transitionDelay: `${i * 100}ms` }}
          >
            <p className="font-serif italic text-4xl text-white/20 leading-none mb-2">
              &ldquo;
            </p>
            <p className="font-serif italic text-white text-base leading-relaxed">
              {t.quote}
            </p>
            <div className="mt-4 mb-3 border-t border-white/10" />
            <p className="font-sans font-semibold text-white text-sm">
              {t.name}
            </p>
            <p className="font-sans text-white/40 text-xs tracking-wide uppercase mt-0.5">
              {t.occasion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
