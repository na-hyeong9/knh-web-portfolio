"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/shared/lib/utils";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(className)}>
      {children}
    </motion.div>
  );
}
