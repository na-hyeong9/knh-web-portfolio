"use client";

import * as React from "react";
import type { RefObject } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { allProjects } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import { SliderCard } from "@/app/_features/home/SliderCard";

const DRAG_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;
const ACTIVE_PROJECT_KEY = "projectGrid:activeId";
const RESTORE_ACTIVE_KEY = "projectGrid:restoreActive";

interface ProjectGridProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function ProjectGrid({ sectionRef }: ProjectGridProps) {
  const items = allProjects;
  const [activeIndex, setActiveIndex] = React.useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const savedId = window.sessionStorage.getItem(ACTIVE_PROJECT_KEY);
    const shouldRestore =
      window.sessionStorage.getItem(RESTORE_ACTIVE_KEY) === "true";

    if (!savedId || !shouldRestore) {
      return 0;
    }

    const savedIndex = items.findIndex((item) => item.id === savedId);
    return savedIndex >= 0 ? savedIndex : 0;
  });

  const dragX = useMotionValue(0);
  // 애니메이션 전용 motion value — React 리렌더 없이 Framer Motion 내부에서 직접 처리
  const activeIndexMV = useMotionValue(activeIndex);
  const activeIndexSpring = useSpring(activeIndexMV, {
    stiffness: 220,
    damping: 28,
  });

  const draggedRef = React.useRef(false);
  const isRestoringRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);
  // DOM 측정값 캐시 — 스크롤마다 offsetTop/offsetHeight 재계산 방지
  const metricsRef = React.useRef({ top: 0, height: 0 });

  React.useEffect(() => {
    const savedId = window.sessionStorage.getItem(ACTIVE_PROJECT_KEY);
    const shouldRestore =
      window.sessionStorage.getItem(RESTORE_ACTIVE_KEY) === "true";

    if (!savedId || !shouldRestore) {
      window.sessionStorage.removeItem(RESTORE_ACTIVE_KEY);
      return;
    }

    const savedIndex = items.findIndex((item) => item.id === savedId);

    if (savedIndex < 0) {
      window.sessionStorage.removeItem(RESTORE_ACTIVE_KEY);
      return;
    }

    isRestoringRef.current = true;

    const scrollToSavedCard = () => {
      if (window.innerWidth < 1024) {
        return;
      }

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const maxScroll = section.offsetHeight - window.innerHeight;
      const progress = items.length > 1 ? savedIndex / (items.length - 1) : 0;

      window.scrollTo({
        top: section.offsetTop + maxScroll * progress,
        behavior: "auto",
      });
    };

    scrollToSavedCard();

    const frameId = window.requestAnimationFrame(scrollToSavedCard);
    const timeoutId = window.setTimeout(() => {
      scrollToSavedCard();
      isRestoringRef.current = false;
      window.sessionStorage.removeItem(RESTORE_ACTIVE_KEY);
    }, 180);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      isRestoringRef.current = false;
    };
  }, [items, sectionRef]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateMetrics = () => {
      metricsRef.current = {
        top: section.offsetTop,
        height: section.offsetHeight,
      };
    };

    const tick = () => {
      rafRef.current = null;
      if (window.innerWidth < 1024) return;

      const { top, height } = metricsRef.current;
      const maxScroll = height - window.innerHeight;
      if (maxScroll <= 0 || draggedRef.current || isRestoringRef.current)
        return;

      const currentScroll = window.scrollY - top;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      const nextIndex = Math.round(progress * (items.length - 1));

      // 애니메이션은 motion value로 즉시 반영 (React 리렌더 불필요)
      activeIndexMV.set(nextIndex);
      // sidebar 활성 상태는 React state로 업데이트 (변경 시에만)
      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return; // 이미 예약된 프레임 있으면 스킵
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const handleResize = () => {
      updateMetrics();
      window.requestAnimationFrame(tick);
    };

    updateMetrics();
    tick();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length, sectionRef, activeIndexMV]);

  const goTo = React.useCallback(
    (idx: number) => {
      const nextIndex = Math.max(0, Math.min(items.length - 1, idx));
      activeIndexMV.set(nextIndex);
      setActiveIndex(nextIndex);
    },
    [items.length, activeIndexMV],
  );

  const rememberActiveCard = React.useCallback((id: string) => {
    window.sessionStorage.setItem(ACTIVE_PROJECT_KEY, id);
    window.sessionStorage.setItem(RESTORE_ACTIVE_KEY, "true");
  }, []);

  const handleActivate = React.useCallback(
    (idx: number) => {
      if (draggedRef.current) {
        return;
      }
      goTo(idx);
    },
    [goTo],
  );

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
              const dir = offset.x < 0 ? 1 : -1;
              goTo(Math.round(activeIndexMV.get()) + dir);
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
              onOpen={rememberActiveCard}
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
