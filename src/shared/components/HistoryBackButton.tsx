"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib/utils";

interface HistoryBackButtonProps {
  fallbackHref?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function HistoryBackButton({
  fallbackHref = "/",
  className,
  children,
  ariaLabel,
}: HistoryBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(className)}>
      {children}
    </button>
  );
}
