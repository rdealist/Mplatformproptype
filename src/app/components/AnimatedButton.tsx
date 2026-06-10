import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: AnimatedButtonProps) {
  const baseStyles = "rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2";

  const variantStyles = {
    primary: "bg-[#0071e3] text-white hover:opacity-90 focus:ring-[#0071e3]/50",
    secondary: "border border-black/[0.08] bg-transparent text-[#1d1d1f] hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] focus:ring-[#0071e3]/10",
    text: "bg-transparent text-[#0071e3] hover:bg-[#0071e3]/[0.04] focus:ring-[#0071e3]/10",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-lg",
    large: "px-8 py-4 text-2xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
