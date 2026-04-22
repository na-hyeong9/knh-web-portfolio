"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/shared/lib/utils";
import { allProjects } from "@/data/homeData";
import { BentoCard } from "@/app/_features/home/BentoCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectGrid() {
  const [filter, setFilter] = React.useState<"all" | "work" | "project">("all");
  const gridRef = React.useRef<HTMLDivElement>(null);

  const filteredItems = allProjects.filter(
    (item) => filter === "all" || item.category === filter,
  );

  React.useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".bento-card");

    gsap.set(cards, { opacity: 0, y: 40 });

    const animateIn = () =>
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: "auto",
      });

    const animateOut = () =>
      gsap.to(cards, {
        opacity: 0,
        y: 40,
        duration: 0.45,
        stagger: { each: 0.06, from: "end" },
        ease: "power2.in",
        overwrite: "auto",
      });

    const st = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top bottom-=100",
      end: "bottom top+=100",
      onEnter: animateIn,
      onLeaveBack: animateOut,
      onEnterBack: animateIn,
      onLeave: animateOut,
    });

    const rect = gridRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
      animateIn();
    }

    return () => st.kill();
  }, [filter]);

  return (
    <div className="space-y-12">
      <div className="flex justify-center gap-1 sm:gap-2 p-1 bg-secondary/30 backdrop-blur-md rounded-full w-fit mx-auto border border-white/10">
        {(["all", "work", "project"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300",
              filter === t
                ? "bg-white dark:bg-zinc-800 text-primary shadow-xl scale-105"
                : "text-muted-foreground hover:text-foreground",
            )}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <BentoCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
