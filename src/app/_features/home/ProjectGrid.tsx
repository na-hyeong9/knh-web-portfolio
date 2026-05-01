"use client";

import * as React from "react";
import type { RefObject } from "react";
import { motion, useMotionValue } from "motion/react";
import { allProjects } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import { SliderCard } from "@/app/_features/home/SliderCard";

const DRAG_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;

interface ProjectGridProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function ProjectGrid({ sectionRef }: ProjectGridProps) {
  const items = allProjects;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dragX = useMotionValue(0);
  const draggedRef = React.useRef(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section || window.innerWidth < 1024) {
        return;
      }

      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0 || draggedRef.current) {
        return;
      }

      const currentScroll = window.scrollY - section.offsetTop;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      const nextIndex = Math.round(progress * (items.length - 1));

      setActiveIndex(nextIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items.length, sectionRef]);

  const goTo = (idx: number) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, idx));
    setActiveIndex(nextIndex);
  };

  const handleActivate = (idx: number) => {
    if (draggedRef.current) {
      return;
    }

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

          <div className="pointer-events-none absolute right-[-0.75rem] top-1/2 hidden -translate-y-1/2 lg:flex xl:right-[-20rem]">
            <motion.div
              className="flex items-center justify-center"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <div className="flex flex-col items-center gap-2 text-foreground/85 dark:text-white/85">
                <span className="h-3 w-3 rotate-45 border-l-[3px] border-t-[3px] border-current" />
                <div className="relative flex h-[74px] w-[40px] items-start justify-center rounded-full border-[3px] border-current bg-background/70 pt-3 dark:bg-zinc-950/60">
                  <motion.span
                    className="block h-4 w-[3px] rounded-full bg-current"
                    animate={{ y: [0, 14, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="h-3 w-3 rotate-[225deg] border-l-[3px] border-t-[3px] border-current" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
