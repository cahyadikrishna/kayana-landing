"use client";

import { useId } from "react";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";
import type { CtaBlockContent } from "@/sanity/content";

export default function CtaBanner1({ cta }: { cta: CtaBlockContent | null }) {
  const { ref } = useReveal({ threshold: 0.2 });
  const titleId = useId();

  return (
    <Section
      ref={ref}
      labelledBy={titleId}
      containerClassName="flex flex-col gap-10 md:flex-row md:items-end"
    >
      {/* Left column */}
      <div className="reveal md:w-3/5">
        <SectionLabel index={3}>{cta?.eyebrow}</SectionLabel>

        <h2 id={titleId} className="type-title mt-6">
          <Headline value={cta?.title} />
        </h2>
      </div>

      {/* Right column */}
      <div className="reveal md:w-2/5" style={{ "--i": 1 } as React.CSSProperties}>
        <p className="max-w-sm text-graphite">{cta?.body}</p>

        <Button href="#contact-us" className="mt-8">
          {cta?.ctaLabel}
        </Button>
      </div>
    </Section>
  );
}
