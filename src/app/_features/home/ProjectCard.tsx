"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";
import type { ProjectItem } from "@/data/homeData";

export function ProjectCard({ item }: { item: ProjectItem; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const thumbnailRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.015,
      z: 36,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (thumbnailRef.current) {
      gsap.to(thumbnailRef.current, {
        z: 32,
        scale: 1.03,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        z: 24,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  // const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (!cardRef.current) return;

  //   const bounds = cardRef.current.getBoundingClientRect();
  //   const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
  //   const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

  //   gsap.to(cardRef.current, {
  //     rotateX: offsetY * -8,
  //     rotateY: offsetX * 10,
  //     transformPerspective: 1400,
  //     transformOrigin: "center center",
  //     duration: 0.35,
  //     ease: "power2.out",
  //     overwrite: "auto",
  //   });
  // };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        z: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (thumbnailRef.current) {
      gsap.to(thumbnailRef.current, {
        z: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        z: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group bento-card opacity-0 translate-y-10",
        "will-change-transform",
      )}>
      <Link
        href={item.link}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-[shadow,filter] duration-300 group-hover:brightness-[0.96] group-hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)] dark:group-hover:brightness-[0.70] sm:rounded-[2rem] md:rounded-[2.5rem]">
        {item.thumbnail && (
          <div
            ref={thumbnailRef}
            className="relative aspect-[16/10] w-full overflow-hidden border-b border-black/5 dark:border-white/10"
            style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-black/20" />
            <div className="relative h-full w-full">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] dark:brightness-105 dark:contrast-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          className="relative flex flex-1 flex-col gap-3 bg-white p-5 dark:bg-zinc-950 sm:p-6 md:p-7"
          style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-start justify-between gap-3">
            <Badge className="glass-button max-w-[60%] truncate rounded-full border-none px-2.5 py-0.5 text-[8px] font-bold uppercase text-primary sm:px-3 sm:text-[9px] md:px-4 md:text-[10px]">
              {item.category}
            </Badge>

            <div className="rounded-full border border-black/10 bg-black/5 p-2 transition-colors duration-300 group-hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:group-hover:bg-white/10 md:p-2.5">
              <ArrowUpRight
                className="h-4 w-4 text-zinc-600 dark:text-zinc-300 md:h-5 md:w-5"
                style={{
                  animation: "neon-pulse 0.7s ease-in-out infinite alternate",
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-zinc-900 transition-colors group-hover:text-primary dark:text-white sm:text-2xl md:text-[2rem]">
              {item.title}
            </h3>

            <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-zinc-100 sm:text-base">
              {item.period}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-1 md:pt-2">
            {item.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full border-none bg-black/5 px-2 py-0.5 text-[10px] text-zinc-700 hover:bg-black/10 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15 sm:text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
