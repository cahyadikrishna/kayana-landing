"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useScrollAnimation";

const stats = [
  { value: 1000, suffix: "+", label: "Graduation sessions captured across Bali" },
  { value: 50, suffix: "+", label: "Universities and campuses represented" },
  { value: 100, suffix: "%", label: "Sessions delivered with care and heart" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return start ? count : 0;
}

function StatNumber({
  value,
  suffix,
  started,
}: {
  value: number;
  suffix: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1200, started);
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

export default function About() {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.2 });

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="about-section bg-white py-20 md:py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Part 1 — Stats row */}
        <div className="flex flex-col md:flex-row items-stretch">
          {stats.map((stat, i) => (
            <div key={stat.label} className="contents">
              {i > 0 && (
                <div className="hidden md:block w-px bg-black/10 self-stretch mx-0" />
              )}

              <div
                className={`about-stat flex-1 flex flex-col justify-center px-0 md:px-10 py-8 md:py-0 ${
                  i === 0 ? "md:pl-0" : ""
                } ${i === stats.length - 1 ? "md:pr-0" : ""} ${
                  i < stats.length - 1
                    ? "border-b border-black/10 md:border-none"
                    : ""
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-black leading-none tracking-tight">
                  <StatNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    started={isVisible}
                  />
                </p>
                <p className="text-sm md:text-base text-black/50 mt-3 leading-snug max-w-[180px]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal divider */}
        <div className="mt-16 md:mt-20 mb-14 md:mb-18 border-t border-black/8" />

        {/* Part 2 — Closing quote */}
        <div className="about-quote flex flex-col md:flex-row gap-6 md:gap-0">
          {/* Left column — label */}
          <div className="md:w-1/3 flex flex-col justify-start pt-1">
            <span className="inline-block w-fit border border-black/15 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-black/40">
              Why It Matters
            </span>
          </div>

          {/* Right column — quote */}
          <div className="md:w-2/3">
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black leading-snug tracking-tight max-w-3xl">
              &ldquo;They&apos;ve already crossed the stage, held their scrolls,
              and smiled for the last time as students. Their moments are
              captured —{" "}
              <span className="text-black/35">beautifully, forever.</span>
              <br className="hidden md:block" />{" "}
              <span className="font-bold">
                Now it&apos;s your turn.&rdquo;
              </span>
            </p>

            <p className="mt-6 text-sm text-black/35 tracking-wide">
              — Kayana Moment, Bali
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
