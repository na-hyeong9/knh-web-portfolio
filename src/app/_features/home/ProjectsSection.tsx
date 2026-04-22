"use client";

import { ProjectGrid } from "@/app/_features/home/ProjectGrid";

export function ProjectsSection() {
  return (
    <section id="project" className="relative overflow-hidden border-t">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="animate-orb-a will-change-transform absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] opacity-35 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #a78bfa, #818cf8, #38bdf8)" }}
        />
        <div
          className="animate-orb-b will-change-transform absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[80px] opacity-30 dark:opacity-15"
          style={{ background: "radial-gradient(circle, #f0abfc, #c084fc, #67e8f9)" }}
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

      <div className="container mx-auto px-4 py-16 md:py-32">
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
