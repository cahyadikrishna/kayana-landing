"use client";

import { useReveal } from "@/hooks/useScrollAnimation";
import { NAV_LINKS } from "@/lib/navigation";
import Divider from "@/components/ui/Divider";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const contacts = [
  { label: "+62 812-3456-7890", href: "https://wa.me/6289606620616", external: true },
  { label: "hello@kayanamoment.com", href: "mailto:hello@kayanamoment.com", external: false },
  { label: "@kayanamoment", href: "https://instagram.com/kayanamoment", external: true },
];

export default function Footer() {
  const { ref } = useReveal({ threshold: 0.1 });

  return (
    <Section as="footer" id="contact-us" tone="ink" ref={ref} className="pb-10">
      {/* Top zone */}
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="reveal md:w-1/2">
          <SectionLabel tone="ink" index={5}>
            Contact Us
          </SectionLabel>
          <h2 className="type-title mt-6">
            Let&apos;s capture your <em>vision</em> with us.
          </h2>
        </div>

        <div
          className="reveal flex flex-col items-start gap-1 md:w-1/3 md:items-end"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <p className="type-meta mb-2 text-paper/50">Bali, Indonesia</p>
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              {...(contact.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="link-underline type-caption text-paper/70 transition-colors hover:text-paper"
            >
              {contact.label}
            </a>
          ))}
        </div>
      </div>

      <Divider tone="ink" className="mt-section mb-8" />

      {/* Bottom zone */}
      <div
        className="reveal flex flex-col items-center justify-between gap-6 md:flex-row"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline type-caption text-paper/60 transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="type-meta text-paper/40">
          ©{new Date().getFullYear()} Kayana Moment. All rights reserved.
        </p>
      </div>

      {/* End mark — oversized wordmark */}
      <p
        aria-hidden="true"
        className="reveal type-display mt-16 text-center whitespace-nowrap md:text-[11.5vw]"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        Kayana <em>Moment</em>
      </p>
    </Section>
  );
}
