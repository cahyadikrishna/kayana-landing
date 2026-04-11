import React, { ReactNode } from "react";

// ─── Icon Components ────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

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

const iconComponents = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  "chevron-right": ChevronRightIcon,
  whatsapp: WhatsAppIcon,
} as const;

export type ButtonIconName = keyof typeof iconComponents;

// ─── Types ──────────────────────────────────────────────────────────────────

/**
 * variant:
 *   ghost      — outlined pill, transparent bg with hover fill (base style)
 *   pill-cta   — text label + icon in a separate colored box on the right
 *   solid      — solid-fill pill
 *   icon-only  — circle with only an icon, no text
 *
 * color:
 *   light — white text/border, for dark backgrounds
 *   dark  — black text/border, for light backgrounds
 *   green — green fill (WhatsApp mobile)
 *
 * size:
 *   sm — compact (footer pill-cta, small ghost)
 *   md — default
 *   lg — large with uppercase tracking (CtaBanner2 style)
 */
export type ButtonVariant = "ghost" | "pill-cta" | "solid" | "icon-only";
export type ButtonColor = "light" | "dark" | "green";
export type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  /** Named icon. For ghost/solid it renders inline; for pill-cta it goes in the icon box. */
  icon?: ButtonIconName;
  /** Inline icon placement for ghost/solid variants. Defaults to "right". */
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
  /** Extra classes for the label span in pill-cta variant. */
  labelClassName?: string;
  /** Extra classes for the icon box span in pill-cta variant. */
  iconBoxClassName?: string;
  "aria-label"?: string;
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

// ─── Style helpers ──────────────────────────────────────────────────────────

const ghostStyles: Record<ButtonColor, string> = {
  light: "border-white/30 text-white hover:bg-white/10",
  dark: "border-black/20 text-black hover:bg-black/5",
  green: "border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
};

const ghostSizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

const pillCtaContainerStyles: Record<ButtonColor, string> = {
  light: "border-white/20 hover:border-white/40",
  dark: "border-black/20 hover:border-black/40",
  green: "border-[#25D366]/30 hover:border-[#25D366]/60",
};

const pillCtaLabelStyles: Record<ButtonColor, string> = {
  light:
    "text-white bg-white/10 group-hover:bg-white/20 tracking-wide",
  dark: "text-black bg-transparent group-hover:bg-black/5 tracking-wide",
  green: "text-[#25D366] bg-transparent group-hover:bg-[#25D366]/5 tracking-wide",
};

const pillCtaLabelSizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-3 text-sm font-semibold",
  lg: "px-8 py-3.5 text-sm font-semibold uppercase tracking-widest",
};

const pillCtaBoxStyles: Record<ButtonColor, string> = {
  light: "bg-white text-black border-l border-white/20",
  dark: "bg-black text-white",
  green: "bg-[#25D366] text-white",
};

const pillCtaBoxSizeStyles: Record<ButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-11 h-11",
};

const solidStyles: Record<ButtonColor, string> = {
  light: "bg-white text-black hover:bg-white/90",
  dark: "bg-black text-white hover:bg-black/90",
  green: "bg-[#25D366] text-white hover:bg-[#1ebe5d]",
};

const solidSizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2 text-sm font-semibold",
  lg: "px-6 py-2.5 text-sm font-semibold",
};

const iconOnlyStyles: Record<ButtonColor, string> = {
  light: "bg-white text-black hover:bg-white/90",
  dark: "bg-black text-white hover:bg-black/90",
  green: "bg-[#25D366] text-white hover:bg-[#1ebe5d]",
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

// ─── Component ──────────────────────────────────────────────────────────────

function renderContent(
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  IconComponent: ((props: { className?: string }) => React.JSX.Element) | null,
  iconPosition: "left" | "right",
  labelClassName: string,
  iconBoxClassName: string,
  children: ReactNode
) {
  if (variant === "ghost" || variant === "solid") {
    return (
      <>
        {IconComponent && iconPosition === "left" && (
          <IconComponent className="w-4 h-4 flex-shrink-0" />
        )}
        {children}
        {IconComponent && iconPosition === "right" && (
          <IconComponent className="w-4 h-4 flex-shrink-0" />
        )}
      </>
    );
  }

  if (variant === "pill-cta") {
    return (
      <>
        <span
          className={`font-semibold whitespace-nowrap transition-colors duration-200 ${pillCtaLabelStyles[color]} ${pillCtaLabelSizeStyles[size]} ${labelClassName}`}
        >
          {children}
        </span>
        {IconComponent && (
          <span
            className={`flex flex-shrink-0 items-center justify-center ${pillCtaBoxStyles[color]} ${pillCtaBoxSizeStyles[size]} ${iconBoxClassName}`}
          >
            <IconComponent className="w-4 h-4" />
          </span>
        )}
      </>
    );
  }

  // icon-only
  return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
}

function getContainerClass(
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  className: string
): string {
  if (variant === "ghost") {
    return `inline-flex items-center gap-2 rounded-full border transition-colors ${ghostStyles[color]} ${ghostSizeStyles[size]} ${className}`;
  }
  if (variant === "pill-cta") {
    return `group inline-flex items-center rounded-full border overflow-hidden transition-colors duration-200 ${pillCtaContainerStyles[color]} ${className}`;
  }
  if (variant === "solid") {
    return `inline-flex items-center gap-2 rounded-full transition-colors ${solidStyles[color]} ${solidSizeStyles[size]} ${className}`;
  }
  // icon-only
  return `flex items-center justify-center rounded-full transition-colors ${iconOnlyStyles[color]} ${iconOnlySizeStyles[size]} ${className}`;
}

export default function Button({
  variant = "ghost",
  color = "light",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className = "",
  labelClassName = "",
  iconBoxClassName = "",
  "aria-label": ariaLabel,
  ...rest
}: ButtonProps) {
  const IconComponent = icon ? iconComponents[icon] : null;
  const containerClass = getContainerClass(variant, color, size, className);
  const content = renderContent(
    variant,
    color,
    size,
    IconComponent,
    iconPosition,
    labelClassName,
    iconBoxClassName,
    children
  );

  if (rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        target={rest.target}
        rel={rest.rel}
        aria-label={ariaLabel}
        className={containerClass}
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
    >
      {content}
    </button>
  );
}
