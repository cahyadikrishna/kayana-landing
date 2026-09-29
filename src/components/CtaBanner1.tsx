"use client";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";

export default function CtaBanner1() {
  const { ref } = useReveal({ threshold: 0.2 });

  return (
    <Section ref={ref} containerClassName="flex flex-col gap-10 md:flex-row md:items-end">
      {/* Left column */}
      <div className="reveal md:w-3/5">
        <SectionLabel index={3}>Why Us</SectionLabel>

        <h2 className="type-title mt-6">
          The moments that mark the end of one <em>chapter</em>, and the beginning of
          everything.
        </h2>
      </div>

      {/* Right column */}
      <div className="reveal md:w-2/5" style={{ "--i": 1 } as React.CSSProperties}>
        <p className="max-w-sm text-graphite">
          Your graduation only happens once. The nerves, the laughter, the quiet pride in
          your parents&apos; eyes — these are the details that disappear fastest. A
          professional session doesn&apos;t just give you photos. It gives you a way back
          to exactly how this day felt, for the rest of your life.
        </p>

        <Button href="#contact-us" className="mt-8">
          Let&apos;s capture it
        </Button>
      </div>
    </Section>
  );
}
