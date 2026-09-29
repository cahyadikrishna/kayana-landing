import type { ReactNode } from "react";

type SectionLabelTone = "paper" | "ink";

const toneStyles: Record<SectionLabelTone, string> = {
  paper: "text-graphite",
  ink: "text-paper/50",
};

/**
 * Eyebrow metadata above a section title, e.g. "(01) Our Work".
 * Mono, no box — it labels content, it isn't a badge (use Pill for that).
 */
export default function SectionLabel({
  tone = "paper",
  index,
  children,
  className = "",
}: {
  tone?: SectionLabelTone;
  /** Section number, rendered as a zero-padded (01) prefix. */
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`type-meta ${toneStyles[tone]} ${className}`}>
      {index !== undefined && (
        <span className="mr-3">({String(index).padStart(2, "0")})</span>
      )}
      {children}
    </p>
  );
}
