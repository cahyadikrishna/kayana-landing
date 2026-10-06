"use client";

import { useId } from "react";
import Headline from "@/components/ui/Headline";
import SanityImage from "@/components/ui/SanityImage";
import type { HeroContent } from "@/sanity/content";

export default function Hero({ hero }: { hero: HeroContent | null }) {
  const titleId = useId();
  const [left, middle, right] = hero?.cutouts ?? [];

  return (
    <section
      id="home"
      aria-labelledby={titleId}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-paper"
    >
      {/* Static background image */}
      <SanityImage
        image={hero?.background}
        alt=""
        fill
        preload
        sizes="100vw"
        className="anim-fade object-cover"
      />

      {/* Ink overlay for text legibility */}
      <div className="absolute inset-0 bg-ink-pure/30" />

      {/* ── Hero content: two-column layout ── */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        {/* Left column — headline, credits, scroll indicator */}
        <div className="relative z-30 flex w-full flex-col justify-start px-6 pt-28 pb-24 md:w-1/2 md:justify-between md:px-16 md:pb-10 lg:w-[45%] lg:pr-10 lg:pl-20">
          <h1
            id={titleId}
            className="anim-rise type-display text-center md:text-left"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <Headline value={hero?.headline} />
          </h1>

          <div>
            {/* Photo credits — catalog-style hairline rows (desktop only) */}
            <ul
              className="anim-fade mt-10 hidden max-w-sm md:block"
              style={{ "--i": 6 } as React.CSSProperties}
            >
              {hero?.credits?.map((credit, i) => (
                <li
                  key={credit._key}
                  className="flex items-baseline gap-4 border-t border-paper/25 py-3 last:border-b"
                >
                  <span className="type-meta text-paper/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-caption flex-1">{credit.title}</span>
                  <span className="type-meta text-paper/50">{credit.meta}</span>
                </li>
              ))}
            </ul>

            {/* Scroll indicator */}
            <div className="scroll-indicator pointer-events-none mt-8 hidden flex-col items-start gap-2 md:flex">
              <span className="type-meta text-paper/50">Scroll</span>
              <svg
                width="14"
                height="22"
                viewBox="0 0 14 22"
                fill="none"
                className="text-paper/50"
                aria-hidden="true"
              >
                <path d="M7 2v14M2 11l5 6 5-6" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column — person assets */}
        <div className="pointer-events-none absolute right-0 bottom-0 h-[55%] w-full md:relative md:h-full md:w-1/2 lg:w-[55%]">
          {/* Middle — largest, lowest z. The LCP element, so it preloads */}
          <div className="absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2">
            <SanityImage
              image={middle}
              preload
              sizes="(min-width: 768px) 40vw, 60vw"
              className="anim-person h-full w-max object-cover"
              style={{ "--i": 1 } as React.CSSProperties}
            />
          </div>

          {/* Left — higher z */}
          <div className="absolute bottom-0 left-0 z-20 h-[70%]">
            <SanityImage
              image={left}
              sizes="(min-width: 768px) 25vw, 35vw"
              className="anim-person h-full w-auto"
              style={{ "--i": 3 } as React.CSSProperties}
            />
          </div>

          {/* Right — higher z */}
          <div className="absolute right-0 bottom-0 z-20 h-[70%]">
            <SanityImage
              image={right}
              sizes="(min-width: 768px) 25vw, 35vw"
              className="anim-person h-full w-auto"
              style={{ "--i": 5 } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
