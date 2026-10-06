import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

// Hard-coded on purpose: a 404 shouldn't depend on the CMS being reachable
export const metadata: Metadata = {
  title: "Page not found — Kayana Moment",
};

export default function NotFound() {
  return (
    <Section className="flex min-h-svh items-center">
      <SectionLabel>Error 404</SectionLabel>
      <h1 className="type-display mt-6">
        This page has drifted <em>out of frame</em>.
      </h1>
      <p className="type-caption mt-6 max-w-sm text-graphite">
        The link may be old, or the page may have moved. Everything we capture
        lives on the home page.
      </p>
      <Button href="/" className="mt-10">
        Back to home
      </Button>
    </Section>
  );
}
