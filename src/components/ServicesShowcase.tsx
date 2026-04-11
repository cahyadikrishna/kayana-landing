"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/services-showcase.css";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    year: "2019",
    name: "Graduation Photography",
    image: "https://picsum.photos/seed/gradphoto/800/600",
    caption: "Full-day ceremony coverage from processional to cap toss.",
  },
  {
    year: "2020",
    name: "Portrait Sessions",
    image: "https://picsum.photos/seed/portrait22/800/600",
    caption: "Styled individual and group portraits at curated locations.",
  },
  {
    year: "2021",
    name: "Event Coverage",
    image: "https://picsum.photos/seed/eventcov/800/600",
    caption: "Comprehensive documentation of celebrations and dinners.",
  },
  {
    year: "2022",
    name: "Photo Retouching",
    image: "https://picsum.photos/seed/retouch9/800/600",
    caption: "Professional color grading and publication-ready editing.",
  },
  {
    year: "2023",
    name: "Digital Prints",
    image: "https://picsum.photos/seed/digprint/800/600",
    caption: "Museum-quality prints, photobooks, and framed pieces.",
  },
];

export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useScrollAnimation();

  const handleHover = useCallback(
    (i: number) => {
      if (i === activeIndex) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPrevIndex(activeIndex);
      setActiveIndex(i);
      timeoutRef.current = setTimeout(() => setPrevIndex(null), 500);
    },
    [activeIndex]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section ref={scrollRef} className="bg-[#111111] py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="fade-up flex flex-col md:flex-row gap-8 md:gap-0">
          {/* Left labels */}
          <div className="md:w-1/2">
            <span className="block text-xs uppercase tracking-widest text-white/30">
              [004]
            </span>
            <span className="block text-xs uppercase tracking-widest text-white/30 mt-1">
              Services
            </span>
          </div>

          {/* Right heading */}
          <div className="md:w-1/2">
            <p className="text-3xl md:text-4xl text-white/70 leading-snug">
              <span className="font-bold text-white">Service</span> is a moment
              that reflecting our ongoing{" "}
              <span className="font-bold text-white">dedication</span> to your
              best <span className="font-bold text-white">memories</span>
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="fade-up mt-16 flex flex-col md:flex-row gap-8 md:gap-12 items-start" style={{ transitionDelay: "150ms" }}>
          {/* Left column — service rows */}
          <div className="md:w-[55%] w-full divide-y divide-white/10">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={service.name}
                  onMouseEnter={() => handleHover(i)}
                  className={`flex items-center gap-4 cursor-pointer select-none transition-colors duration-300 px-5 py-5 ${
                    isActive
                      ? "bg-white/10 rounded-xl"
                      : "bg-transparent hover:bg-white/5 hover:rounded-xl"
                  }`}
                >
                  {/* Year */}
                  <span className="w-20 text-sm text-white/50 flex-shrink-0">
                    {service.year}
                  </span>

                  {/* Service name */}
                  <span className="flex-1 font-serif font-semibold text-white text-xl leading-snug">
                    {service.name}
                  </span>

                  {/* Arrow button */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black"
                        : "border border-white/20 text-white/50"
                    }`}
                  >
                    →
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column — image preview card */}
          <div className="md:w-[45%] w-full sticky top-24">
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {/* Image area */}
              <div className="relative aspect-[4/3]">
                {/* Outgoing image */}
                {prevIndex !== null && (
                  <div
                    key={`out-${prevIndex}`}
                    className="animate-slide-out absolute inset-0 z-10"
                  >
                    <Image
                      src={services[prevIndex].image}
                      alt={services[prevIndex].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                )}

                {/* Incoming image */}
                <div
                  key={`in-${activeIndex}`}
                  className={`absolute inset-0 z-20 ${prevIndex !== null ? "animate-slide-in" : ""}`}
                >
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="px-5 py-4 border-t border-white/10">
                <p className="text-sm text-white/50">
                  {services[activeIndex].caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
