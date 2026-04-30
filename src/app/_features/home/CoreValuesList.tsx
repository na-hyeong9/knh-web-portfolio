"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { coreValues } from "@/data/homeData";
import { cn } from "@/shared/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CoreValuesList() {
  const listRef = React.useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!listRef.current) return;

    const items = Array.from(
      listRef.current.querySelectorAll<HTMLElement>("[data-core-value-item]"),
    );

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=60",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <ul ref={listRef} className="space-y-4">
      {coreValues.map((value, index) => {
        const isActive = activeIndex === index;

        return (
          <li
            key={value.title}
            data-core-value-item
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={cn(
              "rounded-[2rem] border bg-background/70 transition-all duration-300",
              isActive
                ? "border-primary/40 bg-primary/[0.06] shadow-[0_18px_50px_rgba(0,113,227,0.14)]"
                : "border-border/70 hover:border-primary/30 hover:bg-primary/[0.04]",
            )}>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current === index ? null : index))
              }
              onFocus={() => setActiveIndex(index)}
              aria-expanded={isActive}
              className="relative flex w-full flex-col gap-4 px-5 py-5 pr-16 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:px-6 sm:py-6 sm:pr-18 md:grid md:grid-cols-[minmax(0,220px)_1fr_auto] md:items-center md:gap-6 md:pr-6">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center text-xs font-black transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {value.title}
                </span>
              </div>

              <p className="break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
                {value.summary}
              </p>

              <span
                className={cn(
                  "absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all md:static",
                  isActive
                    ? "border-primary/30 bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(0,113,227,0.22)]"
                    : "border-border/80 bg-background text-primary/80",
                )}>
                {isActive ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </span>
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out whitespace-pre-line",
                isActive
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}>
              <div className="min-h-0">
                <div
                  className={cn(
                    "px-5 py-5 sm:px-6 sm:py-6",
                    isActive
                      ? "border-t border-primary/20"
                      : "border-t border-border/70",
                  )}>
                  <p className="break-keep whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                    {value.detail}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
