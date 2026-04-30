"use client";

import * as React from "react";
import { motion, useMotionValue } from "motion/react";
import { allProjects } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import { SliderCard } from "@/app/_features/home/SliderCard";

const DRAG_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;
const STORAGE_KEY = "projectGrid:activeId";

export function ProjectGrid() {
  const items = allProjects;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dragX = useMotionValue(0);
  const draggedRef = React.useRef(false);
  const skipFirstSaveRef = React.useRef(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const savedId = window.sessionStorage.getItem(STORAGE_KEY);
    if (!savedId) return;
    const idx = items.findIndex((it) => it.id === savedId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (idx >= 0) setActiveIndex(idx);
  }, [items]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (skipFirstSaveRef.current) {
      skipFirstSaveRef.current = false;
      return;
    }
    const current = items[activeIndex];
    if (current) {
      window.sessionStorage.setItem(STORAGE_KEY, current.id);
    }
  }, [activeIndex, items]);

  const goTo = (idx: number) => {
    const next = Math.max(0, Math.min(items.length - 1, idx));
    setActiveIndex(next);
  };

  const handleActivate = (idx: number) => {
    if (draggedRef.current) return;
    goTo(idx);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-7 lg:gap-12 m-auto">
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

      <div className="lg:col-span-5">
        <motion.div
          className="relative flex h-[440px] cursor-grab touch-pan-y select-none items-center justify-center active:cursor-grabbing sm:h-[500px] md:h-[560px]"
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
              const dir = offset.x < 0 ? 1 : -1;
              goTo(activeIndex + dir);
            }
            window.setTimeout(() => {
              draggedRef.current = false;
            }, 50);
          }}>
          {items.map((item, idx) => (
            <SliderCard
              key={item.id}
              item={item}
              offset={idx - activeIndex}
              isActive={idx === activeIndex}
              onActivate={() => handleActivate(idx)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
