"use client";

import { useId } from "react";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";
import type { CtaBlockContent } from "@/sanity/content";

export default function CtaBanner2({ cta }: { cta: CtaBlockContent | null }) {
  const { ref } = useReveal({ threshold: 0.2 });
  const titleId = useId();

  return (
    <Section ref={ref} labelledBy={titleId}>
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionLabel>{cta?.eyebrow}</SectionLabel>

        <h2 id={titleId} className="type-title mt-6">
          <Headline value={cta?.title} />
        </h2>

        <p className="type-subheading mt-6 max-w-xl text-graphite">{cta?.body}</p>

        <Button href="#contact-us" variant="outline" className="mt-10">
          {cta?.ctaLabel}
        </Button>

        {cta?.note && <p className="type-meta mt-4 text-graphite">{cta.note}</p>}
      </div>
    </Section>
  );
}
