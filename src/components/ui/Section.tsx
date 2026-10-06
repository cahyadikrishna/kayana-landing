import type { ReactNode, Ref } from "react";

export type SectionTone = "paper" | "ink";

const toneStyles: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

/**
 * Every page section starts here: surface tone, vertical rhythm
 * (--spacing-section) and the page container/gutters.
 * Paper is the default; ink is reserved for at most two anchor sections.
 * Pass the title's id as labelledBy so the section is a named region.
 */
export default function Section({
  id,
  tone = "paper",
  as: Tag = "section",
  ref,
  labelledBy,
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  as?: "section" | "footer";
  ref?: Ref<HTMLElement>;
  /** id of the section's heading, wired to aria-labelledby. */
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={`py-section ${toneStyles[tone]} ${className}`}
    >
      <div className={`container-page ${containerClassName}`}>{children}</div>
    </Tag>
  );
}
