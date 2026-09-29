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
 */
export default function Section({
  id,
  tone = "paper",
  as: Tag = "section",
  ref,
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  as?: "section" | "footer";
  ref?: Ref<HTMLElement>;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} ref={ref} className={`py-section ${toneStyles[tone]} ${className}`}>
      <div className={`container-page ${containerClassName}`}>{children}</div>
    </Tag>
  );
}
