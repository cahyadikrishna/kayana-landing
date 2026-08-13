import { ReactNode } from "react";

type SectionLabelColor = "light" | "dark";

const colorStyles: Record<SectionLabelColor, string> = {
  light: "border-black/20 text-black/50",
  dark: "border-white/20 text-white/50",
};

export default function SectionLabel({
  color = "light",
  children,
  className = "",
}: {
  color?: SectionLabelColor;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block w-fit border rounded-full px-4 py-1.5 text-xs uppercase tracking-widest ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}
