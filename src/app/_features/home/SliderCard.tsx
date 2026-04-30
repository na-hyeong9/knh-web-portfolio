"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import type { ProjectItem } from "@/data/homeData";

interface SliderCardProps {
  item: ProjectItem;
  offset: number;
  isActive: boolean;
  onActivate: () => void;
}

export function SliderCard({
  item,
  offset,
  isActive,
  onActivate,
}: SliderCardProps) {
  const absOffset = Math.abs(offset);
  const direction = Math.sign(offset);
  const visible = absOffset <= 2;

  const x =
    offset === 0
      ? "0%"
      : `${direction * (50 + (absOffset - 1) * 35)}%`;
  const scale = 1 - absOffset * 0.18;
  const opacity = visible ? 1 - absOffset * 0.35 : 0;
  const zIndex = 30 - absOffset * 10;

  const inner = (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] dark:bg-zinc-950 dark:shadow-[0_22px_60px_rgba(0,0,0,0.45)]",
        isActive
          ? "border-primary/30 dark:border-primary/40"
          : "border-black/5 dark:border-white/10",
      )}>
      {item.thumbnail && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <Badge
            className={cn(
              "rounded-full border-none px-3 py-0.5 text-[10px] font-bold uppercase",
              item.category === "work"
                ? "bg-primary/15 text-primary"
                : "bg-sky-500/15 text-sky-600 dark:text-sky-400",
            )}>
            {item.category}
          </Badge>

          {isActive && (
            <div className="rounded-full border border-black/10 bg-black/5 p-2 dark:border-white/20 dark:bg-white/5 md:p-2.5">
              <ArrowUpRight className="h-4 w-4 text-zinc-700 dark:text-zinc-200 md:h-5 md:w-5" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-2xl md:text-[1.75rem]">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-300 sm:text-base">
            {item.period}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1 md:pt-2">
          {item.techStack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-full border-none bg-black/5 px-2 py-0.5 text-[10px] text-zinc-700 dark:bg-white/10 dark:text-zinc-200 sm:text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      animate={{ x, scale, opacity, zIndex }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      style={{ zIndex }}
      className={cn(
        "absolute left-1/2 top-1/2 w-[68%] max-w-[520px] -translate-x-1/2 -translate-y-1/2",
        !visible && "pointer-events-none",
      )}
      aria-hidden={!isActive}>
      {isActive ? (
        <Link
          href={item.link}
          className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem]">
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onActivate}
          tabIndex={visible ? 0 : -1}
          aria-label={`${item.title} 활성화`}
          className="block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem]">
          {inner}
        </button>
      )}
    </motion.div>
  );
}
