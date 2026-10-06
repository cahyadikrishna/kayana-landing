import type { ReactNode } from "react";

type SectionLabelTone = "paper" | "ink";

const toneStyles: Record<SectionLabelTone, string> = {
  paper: "text-graphite",
  ink: "text-paper/50",
};

/**
 * Eyebrow metadata above a section title, e.g. "(01) Our Work".
 * Mono, no box — it labels content, it isn't a badge (use Pill for that).
 * Use as="h2" when the eyebrow is the section's only heading. The (01) index
 * is decorative and hidden from screen readers.
 */
export default function SectionLabel({
  tone = "paper",
  as: Tag = "p",
  id,
  index,
  children,
  className = "",
}: {
  tone?: SectionLabelTone;
  as?: "p" | "h2";
  id?: string;
  /** Section number, rendered as a zero-padded (01) prefix. */
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag id={id} className={`type-meta ${toneStyles[tone]} ${className}`}>
      {index !== undefined && (
        <span aria-hidden="true" className="mr-3">({String(index).padStart(2, "0")})</span>
      )}
      {children}
    </Tag>
  );
}
