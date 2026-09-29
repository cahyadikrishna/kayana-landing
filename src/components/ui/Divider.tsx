type DividerTone = "paper" | "ink";

const toneStyles: Record<DividerTone, string> = {
  paper: "bg-ink",
  ink: "bg-paper/20",
};

/**
 * 1px hairline rule — the system's only separator. Use instead of shadows,
 * cards, or tinted blocks. Vertical dividers stretch to their flex parent.
 */
export default function Divider({
  tone = "paper",
  orientation = "horizontal",
  className = "",
}: {
  tone?: DividerTone;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const shape = orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch";
  return <div aria-hidden="true" className={`${shape} ${toneStyles[tone]} ${className}`} />;
}
