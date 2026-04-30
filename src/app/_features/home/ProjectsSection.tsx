"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectGrid } from "@/app/_features/home/ProjectGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.set(textRef.current, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top +=50%",
      end: "bottom bottom",
      onEnter: () =>
        gsap.to(textRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }),
      onLeave: () =>
        gsap.to(textRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        }),
      onEnterBack: () =>
        gsap.to(textRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }),
      onLeaveBack: () =>
        gsap.to(textRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        }),
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden border-t">
      {/* 배경 텍스트 - 뷰포트 중앙 고정, 섹션 진입/이탈 시 fade */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <span
          ref={textRef}
          className="select-none whitespace-nowrap font-bold uppercase leading-none text-foreground/[0.04] dark:text-foreground/[0.06]"
          style={{ fontSize: "10vw" }}>
          my project list
        </span>
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="animate-orb-a will-change-transform absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] opacity-35 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, #a78bfa, #818cf8, #38bdf8)",
          }}
        />
        <div
          className="animate-orb-b will-change-transform absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[80px] opacity-30 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, #f0abfc, #c084fc, #67e8f9)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,100,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(120,100,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-32">
        <header className="mb-12 md:mb-20 space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold">
            Projects
          </h2>
          <p className="text-base md:text-xl text-muted-foreground"></p>
        </header>
        <ProjectGrid />
      </div>
    </section>
  );
}
