"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import type { ProjectItem } from "@/data/homeData";

export function BentoCard({ item }: { item: ProjectItem; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap
      .timeline()
      .to(cardRef.current, {
        scaleX: 1.04,
        scaleY: 0.96,
        duration: 0.09,
        ease: "power2.out",
        overwrite: "auto",
      })
      .to(cardRef.current, {
        scaleX: 0.97,
        scaleY: 1.04,
        duration: 0.1,
        ease: "power2.inOut",
      })
      .to(cardRef.current, {
        scaleX: 1.02,
        scaleY: 0.99,
        duration: 0.09,
        ease: "power2.inOut",
      })
      .to(cardRef.current, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.38,
        ease: "elastic.out(1, 0.4)",
      });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative group overflow-hidden",
        "rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem]",
        "liquid-glass bento-card opacity-0 translate-y-10",
        "aspect-[3/4] xl:aspect-[4/3]",
      )}>
      <Link href={item.link} className="block w-full h-full">
        <div className="absolute inset-0 bg-white/[0.06] dark:bg-white/[0.03]" />

        {item.thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center z-0 pb-20 sm:pb-24 md:pb-28">
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-115 dark:brightness-90"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 md:top-5 md:right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-2.5 border border-black/10 dark:border-white/30">
            <ArrowUpRight
              className="w-4 h-4 md:w-5 md:h-5 text-zinc-600 dark:text-zinc-300"
              style={{
                animation: "neon-pulse 0.7s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>

        <div className="absolute inset-0 p-4 sm:p-5 md:p-8 flex flex-col justify-end gap-1.5 sm:gap-2 md:gap-3 z-10">
          <Badge className="glass-button text-primary border-none rounded-full px-2.5 sm:px-3 md:px-4 py-0.5 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase truncate max-w-[60%]">
            {item.category}
          </Badge>

          <p className="text-[12px] sm:text-[8px] md:text-[16px] font-bold text-zinc-500 dark:text-white shrink-0text-foreground group-hover:text-primary">
            {item.period}
          </p>

          <h3 className="text-sm sm:text-base md:text-2xl font-bold text-zinc-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {item.title}
          </h3>

          <div className="flex flex-wrap gap-1 md:gap-2 pt-0.5 md:pt-2">
            {item.techStack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-300 border-none text-[7px] sm:text-[8px] md:text-[9px] rounded-full px-1.5 sm:px-2 py-0">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
