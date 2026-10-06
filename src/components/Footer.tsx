"use client";

import { useReveal } from "@/hooks/useScrollAnimation";
import { NAV_LINKS } from "@/lib/navigation";
import { UI } from "@/lib/ui-strings";
import Divider from "@/components/ui/Divider";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { stegaClean } from "next-sanity";
import { whatsappHref, type ContactHeader, type Settings } from "@/sanity/content";

export default function Footer({
  header,
  settings,
}: {
  header: ContactHeader | null;
  settings: Settings | null;
}) {
  const { ref } = useReveal({ threshold: 0.1 });

  const email = stegaClean(settings?.email);
  const instagram = stegaClean(settings?.instagram);
  const contacts = [
    { label: settings?.whatsappLabel, href: whatsappHref(settings), external: true },
    { label: settings?.email, href: email && `mailto:${email}`, external: false },
    {
      label: settings?.instagram && `@${settings.instagram}`,
      href: instagram && `https://instagram.com/${instagram}`,
      external: true,
    },
  ].filter((contact) => contact.label && contact.href);

  // Wordmark: last word of the site name becomes the italic accent
  const nameWords = (settings?.siteName ?? "").split(" ");
  const accent = nameWords.length > 1 ? nameWords.pop() : undefined;

  return (
    <Section as="footer" id="contact-us" tone="ink" ref={ref} className="pb-10">
      {/* Top zone */}
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="reveal md:w-1/2">
          <SectionLabel tone="ink" index={5}>
            {header?.eyebrow}
          </SectionLabel>
          <h2 className="type-title mt-6">
            <Headline value={header?.title} />
          </h2>
        </div>

        <address
          className="reveal flex flex-col items-start gap-1 not-italic md:w-1/3 md:items-end"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <p className="type-meta mb-2 text-paper/50">{settings?.location}</p>
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href ?? undefined}
              {...(contact.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="link-underline type-caption text-paper/70 transition-colors hover:text-paper"
            >
              {contact.label}
            </a>
          ))}
        </address>
      </div>

      <Divider tone="ink" className="mt-section mb-8" />

      {/* Bottom zone */}
      <div
        className="reveal flex flex-col items-center justify-between gap-6 md:flex-row"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <nav aria-label={UI.footerNav} className="flex flex-wrap justify-center gap-6">
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
          ©{new Date().getFullYear()} {settings?.siteName}. All rights reserved.
        </p>
      </div>

      {/* End mark — oversized wordmark */}
      <p
        aria-hidden="true"
        className="reveal type-display mt-16 text-center whitespace-nowrap md:text-[11.5vw]"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {nameWords.join(" ")} {accent && <em>{accent}</em>}
      </p>
    </Section>
  );
}
