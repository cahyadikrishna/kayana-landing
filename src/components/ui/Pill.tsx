import type { ReactNode } from "react";
import type { AnalyticsAttrs } from "@/lib/analytics";

type PillTone = "paper" | "ink";

const toneStyles: Record<PillTone, { base: string; active: string }> = {
  paper: {
    base: "border-ash bg-paper text-ink hover:border-ink",
    active: "border-ink bg-ink text-paper",
  },
  ink: {
    base: "border-paper/25 text-paper/80 hover:border-paper/60 hover:text-paper",
    active: "border-paper bg-paper text-ink",
  },
};

/**
 * Hairline badge for tags and filters — the ONLY rounded element in the system.
 * Pass onClick to make it a toggle; `active` sets aria-pressed.
 */
export default function Pill({
  children,
  tone = "paper",
  active = false,
  onClick,
  className = "",
  analytics,
}: {
  children: ReactNode;
  tone?: PillTone;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  /** Tracking attributes from `analyticsAttrs()`. */
  analytics?: AnalyticsAttrs;
}) {
  const classes = `inline-flex items-center rounded-pill border px-6 pt-1.5 pb-2 type-meta transition-colors duration-200 ${
    active ? toneStyles[tone].active : toneStyles[tone].base
  } ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={classes} {...analytics}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
