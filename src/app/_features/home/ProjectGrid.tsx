"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allProjects } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import { SliderCard } from "@/app/_features/home/SliderCard";

const DRAG_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;

export function ProjectGrid() {
  const items = allProjects;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const dragX = useMotionValue(0);
  const activeIndexMV = useMotionValue(0);
  const activeIndexSpring = useSpring(activeIndexMV, {
    stiffness: 220,
    damping: 28,
  });

  const draggedRef = React.useRef(false);

  const goTo = React.useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(items.length - 1, idx));
      activeIndexMV.set(next);
      setActiveIndex(next);
    },
    [items.length, activeIndexMV],
  );

  const handleActivate = React.useCallback(
    (idx: number) => {
      if (draggedRef.current) return;
      goTo(idx);
    },
    [goTo],
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-7 lg:gap-12 m-auto">
      {/* 사이드바 목록 */}
      <aside className="lg:col-span-2">
        <ul className="flex flex-col gap-2">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    isActive
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-black/10 hover:bg-black/5 hover:text-foreground dark:hover:border-white/10 dark:hover:bg-white/5",
                  )}>
                  <Badge
                    className={cn(
                      "shrink-0 rounded-full border-none px-2 py-0.5 text-[10px] font-bold uppercase",
                      item.category === "work"
                        ? "bg-primary/15 text-primary"
                        : "bg-sky-500/15 text-sky-600 dark:text-sky-400",
                    )}>
                    {item.category}
                  </Badge>
                  <span className="truncate text-sm font-semibold sm:text-base">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 카드 + 네비게이션 */}
      <div className="overflow-hidden lg:col-span-5">
        <motion.div
          className="relative flex h-[300px] cursor-grab touch-pan-y select-none items-center justify-center active:cursor-grabbing sm:h-[400px] md:h-[460px] lg:h-[480px]"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragStart={() => {
            draggedRef.current = true;
          }}
          onDragEnd={(_, info) => {
            const { offset, velocity } = info;
            const swipe =
              Math.abs(offset.x) > DRAG_THRESHOLD ||
              Math.abs(velocity.x) > VELOCITY_THRESHOLD;
            if (swipe) {
              goTo(activeIndex + (offset.x < 0 ? 1 : -1));
            }
            window.setTimeout(() => {
              draggedRef.current = false;
            }, 50);
          }}>
          {items.map((item, idx) => (
            <SliderCard
              key={item.id}
              item={item}
              idx={idx}
              activeIndexSpring={activeIndexSpring}
              isActive={idx === activeIndex}
              onActivate={handleActivate}
              onOpen={() => {}}
            />
          ))}
        </motion.div>

        {/* 화살표 + dot 네비게이션 */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="이전 프로젝트"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground transition-colors hover:bg-black/10 disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="프로젝트 목록">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={item.title}
                onClick={() => goTo(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            aria-label="다음 프로젝트"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground transition-colors hover:bg-black/10 disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
