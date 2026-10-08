import type { ReactNode } from "react";
import type { AnalyticsAttrs } from "@/lib/analytics";

// ─── Icons ──────────────────────────────────────────────────────────────────

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Types ──────────────────────────────────────────────────────────────────

/**
 * variant:
 *   link    — text + → arrow, no box. The default for every CTA.
 *   outline — 1px hairline rectangle, inverts on hover. For a single emphasized action.
 *   solid   — ink fill. RESERVED for the floating "Book a Session" sticky only.
 *
 * tone: the surface the button sits on.
 *   paper — ink text on white
 *   ink   — white text on ink or on dark photography
 */
export type ButtonVariant = "link" | "outline" | "solid";
export type ButtonTone = "paper" | "ink";

interface SharedProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  /** Leading glyph (e.g. <WhatsAppIcon />). Replaces the trailing arrow when set. */
  icon?: ReactNode;
  /** Show the trailing → arrow. Defaults to true unless an icon is given. */
  arrow?: boolean;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Tracking attributes from `analyticsAttrs()`. */
  analytics?: AnalyticsAttrs;
}

interface AsAnchor extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
  type?: never;
  onClick?: never;
}

interface AsButton extends SharedProps {
  href?: never;
  target?: never;
  rel?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export type ButtonProps = AsAnchor | AsButton;

// ─── Styles ─────────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, Record<ButtonTone, string>> = {
  link: {
    paper: "text-ink",
    ink: "text-paper",
  },
  outline: {
    paper: "border border-ink text-ink px-6 py-3 hover:bg-ink hover:text-paper",
    ink: "border border-paper/60 text-paper px-6 py-3 hover:bg-paper hover:text-ink hover:border-paper",
  },
  solid: {
    // Hairline keeps the fill legible when the sticky floats over ink sections
    paper: "bg-ink text-paper border border-paper/25 px-6 py-3 hover:bg-ink-pure",
    ink: "bg-paper text-ink px-6 py-3 hover:bg-ash",
  },
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function Button({
  variant = "link",
  tone = "paper",
  icon,
  arrow,
  children,
  className = "",
  "aria-label": ariaLabel,
  analytics,
  ...rest
}: ButtonProps) {
  const showArrow = arrow ?? !icon;
  const containerClass = `group inline-flex items-center gap-2 type-caption transition-colors duration-200 ${variantStyles[variant][tone]} ${className}`;

  const content = (
    <>
      {icon && <span className="flex h-4 w-4 shrink-0 [&>svg]:size-full">{icon}</span>}
      <span className={variant === "link" ? "link-underline" : undefined}>
        {children}
      </span>
      {showArrow && (
        <span
          aria-hidden="true"
          className="ml-element inline-block transition-transform duration-400 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        target={rest.target}
        rel={rest.rel}
        aria-label={ariaLabel}
        className={containerClass}
        {...analytics}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      aria-label={ariaLabel}
      className={containerClass}
      {...analytics}
    >
      {content}
    </button>
  );
}
