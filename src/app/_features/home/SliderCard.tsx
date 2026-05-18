"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";

interface SliderCardProps {
  item: ProjectItem;
  idx: number;
  activeIndexSpring: MotionValue<number>;
  isActive: boolean;
  onActivate: (idx: number) => void;
  onOpen: (id: string) => void;
}

export const SliderCard = React.memo(function SliderCard({
  item,
  idx,
  activeIndexSpring,
  isActive,
  onActivate,
  onOpen,
}: SliderCardProps) {
  const [visible, setVisible] = React.useState(() => {
    return Math.abs(activeIndexSpring.get() - idx) <= 2;
  });

  useMotionValueEvent(activeIndexSpring, "change", (v) => {
    const newVisible = Math.abs(v - idx) <= 2;
    setVisible((prev) => (prev === newVisible ? prev : newVisible));
  });

  // 단일 spring 기반으로 transform 계산 — React 리렌더 없이 RAF 내에서 직접 업데이트
  const x = useTransform(activeIndexSpring, (ai) => {
    const rawOffset = idx - ai;
    const abs = Math.abs(rawOffset);
    const dir = rawOffset >= 0 ? 1 : -1;
    if (abs < 1) return `${rawOffset * 50}%`;
    return `${dir * (50 + (abs - 1) * 35)}%`;
  });

  const scale = useTransform(activeIndexSpring, (ai) =>
    Math.max(0, 1 - Math.abs(idx - ai) * 0.18),
  );

  const opacity = useTransform(activeIndexSpring, (ai) => {
    const abs = Math.abs(idx - ai);
    return abs > 2 ? 0 : Math.max(0, 1 - abs * 0.35);
  });

  const zIndex = useTransform(activeIndexSpring, (ai) =>
    Math.round(30 - Math.abs(idx - ai) * 10),
  );

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
            draggable={false}
            priority={isActive}
            className="pointer-events-none select-none object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5 lg:gap-3 lg:p-5">
        <div className="flex items-start justify-between gap-3">
          <Badge
            className={cn(
              "rounded-full border-none px-2.5 py-0.5 text-[10px] font-bold uppercase",
              item.category === "work"
                ? "bg-primary/15 text-primary"
                : "bg-sky-500/15 text-sky-600 dark:text-sky-400",
            )}>
            {item.category}
          </Badge>

          {isActive && (
            <div className="rounded-full border border-black/10 bg-black/5 p-1.5 dark:border-white/20 dark:bg-white/5">
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-200" />
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="line-clamp-2 text-base font-bold leading-tight text-zinc-900 dark:text-white sm:text-lg lg:text-xl">
            {item.title}
          </h3>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-300 sm:text-sm">
            {item.period}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {item.techStack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-full border-none bg-black/5 px-2 py-0.5 text-[10px] text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      style={{ x, scale, opacity, zIndex, willChange: "transform, opacity" }}
      className={cn(
        "absolute left-1/2 top-1/2 w-[58%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 lg:w-[62%] lg:max-w-[440px]",
        !visible && "pointer-events-none",
      )}
      aria-hidden={!isActive}>
      {isActive ? (
        <Link
          href={item.link}
          onClick={() => onOpen(item.id)}
          className="block h-full w-full rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onActivate(idx)}
          tabIndex={visible ? 0 : -1}
          aria-label={`Activate ${item.title}`}
          className="block h-full w-full rounded-[2rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {inner}
        </button>
      )}
    </motion.div>
  );
});
