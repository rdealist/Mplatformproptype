import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "text" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-lg",
  large: "px-8 py-4 text-2xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#0071e3] text-white hover:opacity-90",
  secondary: "border border-[#0071e3] text-[#0071e3] bg-transparent hover:bg-[#0071e3]/[0.04]",
  text: "text-[#0071e3] bg-transparent hover:bg-[#0071e3]/[0.04]",
  danger: "bg-[#ff3b30] text-white hover:opacity-90",
};

export function Button({
  size = "medium",
  variant = "primary",
  children,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
