import { ReactNode } from "react";
import { clsx } from "clsx";

type TagVariant = "primary" | "success" | "warning" | "error" | "neutral";

interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  primary: "bg-[#0071e3]/[0.08] text-[#0071e3]",
  success: "bg-[#34c759]/[0.08] text-[#34c759]",
  warning: "bg-[#ff9500]/[0.08] text-[#ff9500]",
  error: "bg-[#ff3b30]/[0.08] text-[#ff3b30]",
  neutral: "bg-black/[0.04] text-[#1d1d1f]",
};

export function Tag({ variant = "primary", children, className }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1",
        "text-sm font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
