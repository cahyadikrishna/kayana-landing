"use client";

import { useEffect, useRef, useState } from "react";
import Divider from "@/components/ui/Divider";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
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
  const { ref, isVisible } = useReveal({ threshold: 0.2 });

  return (
    <Section id="about-us" ref={ref} className="overflow-hidden">
      <SectionLabel index={1} className="reveal">
        About Us
      </SectionLabel>

      {/* Part 1 — Stats row, columns ruled by hairlines */}
      <div className="mt-10 flex flex-col md:flex-row">
        {stats.map((stat, i) => (
          <div key={stat.label} className="contents">
            {i > 0 && <Divider orientation="vertical" className="hidden md:block" />}

            <div
              className={`reveal flex flex-1 flex-col py-8 md:px-10 md:py-0 ${
                i === 0 ? "md:pl-0" : ""
              } ${i === stats.length - 1 ? "md:pr-0" : "border-b border-ink md:border-none"}`}
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              <p className="type-title">
                <StatNumber value={stat.value} suffix={stat.suffix} started={isVisible} />
              </p>
              <p className="type-caption mt-3 max-w-[200px] text-graphite">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider className="my-section" />

      {/* Part 2 — Closing quote */}
      <div className="reveal flex flex-col gap-6 md:flex-row md:gap-0">
        <div className="md:w-1/3">
          <SectionLabel>Why It Matters</SectionLabel>
        </div>

        <div className="md:w-2/3">
          <p className="type-quote max-w-3xl">
            &ldquo;They&apos;ve already crossed the stage, held their scrolls, and smiled for
            the last time as students. Their moments are captured <em>beautifully</em>,
            forever. Now it&apos;s your turn.&rdquo;
          </p>

          <p className="type-meta mt-6 text-graphite">— Kayana Moment</p>
        </div>
      </div>
    </Section>
  );
}
