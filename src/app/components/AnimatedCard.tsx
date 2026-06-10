import { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className={`rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
