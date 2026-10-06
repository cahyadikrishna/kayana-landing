"use client";

import { useEffect, useId, useRef, useState } from "react";
import Divider from "@/components/ui/Divider";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";
import type { AboutContent } from "@/sanity/content";

// Renders the real value on the server and without JS; animates 0 → target once `start`
// flips, unless the visitor prefers reduced motion. null means "show the target".
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (progress < 1) {
        setCount(Math.round(target * eased));
        raf = requestAnimationFrame(tick);
      } else {
        setCount(null);
      }
    };

    raf = requestAnimationFrame(tick);
    // An interrupted count (e.g. a live edit to target) snaps to the target instead of freezing
    return () => {
      cancelAnimationFrame(raf);
      setCount(null);
    };
  }, [start, target, duration]);

  return count ?? target;
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
      {/* Fixed locale so server and client markup match; #10 swaps in the active locale */}
      {count.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export default function About({ about }: { about: AboutContent | null }) {
  const { ref, isVisible } = useReveal({ threshold: 0.2 });
  const stats = about?.stats ?? [];
  const titleId = useId();

  return (
    <Section id="about-us" ref={ref} labelledBy={titleId} className="overflow-hidden">
      <SectionLabel as="h2" id={titleId} index={1} className="reveal">
        {about?.eyebrow}
      </SectionLabel>

      {/* Part 1 — Stats row, columns ruled by hairlines */}
      <div className="mt-10 flex flex-col md:flex-row">
        {stats.map((stat, i) => (
          <div key={stat._key} className="contents">
            {i > 0 && <Divider orientation="vertical" className="hidden md:block" />}

            <div
              className={`reveal flex flex-1 flex-col py-8 md:px-10 md:py-0 ${
                i === 0 ? "md:pl-0" : ""
              } ${i === stats.length - 1 ? "md:pr-0" : "border-b border-ink md:border-none"}`}
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              <p className="type-title">
                <StatNumber
                  value={stat.value ?? 0}
                  suffix={stat.suffix ?? ""}
                  started={isVisible}
                />
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
          <SectionLabel>{about?.quoteEyebrow}</SectionLabel>
        </div>

        <div className="md:w-2/3">
          <p className="type-quote max-w-3xl">
            &ldquo;
            <Headline value={about?.quote} />
            &rdquo;
          </p>

          <p className="type-meta mt-6 text-graphite">— {about?.attribution}</p>
        </div>
      </div>
    </Section>
  );
}
