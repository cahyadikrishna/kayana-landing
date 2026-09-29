"use client";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";

export default function CtaBanner2() {
  const { ref } = useReveal({ threshold: 0.2 });

  return (
    <Section ref={ref}>
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionLabel>One Last Thing</SectionLabel>

        <h2 className="type-title mt-6">
          Don&apos;t let this moment pass without a <em>frame</em>.
        </h2>

        <p className="type-subheading mt-6 max-w-xl text-graphite">
          Years from now, you won&apos;t remember the stress of the thesis or the chaos of
          the ceremony. You&apos;ll remember how it felt to finally be done — and we&apos;ll
          make sure you can see it.
        </p>

        <Button href="#contact-us" variant="outline" className="mt-10">
          Let&apos;s capture it
        </Button>

        <p className="type-meta mt-4 text-graphite">No commitment. Just a conversation.</p>
      </div>
    </Section>
  );
}
