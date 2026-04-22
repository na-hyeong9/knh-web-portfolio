"use client";

import { motion } from "framer-motion";
import { ProjectGrid } from "@/app/_features/home/ProjectGrid";

export function ProjectsSection() {
  return (
    <section id="project" className="relative overflow-hidden border-t">
      {/* 홀로그램 배경 */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, 120, -80, 0], y: [0, -80, 60, 0], scale: [1, 1.3, 0.85, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full blur-[100px] opacity-40 dark:opacity-25"
          style={{ background: "radial-gradient(circle, #a78bfa, #818cf8, #38bdf8)" }}
        />
        <motion.div
          animate={{ x: [0, -100, 80, 0], y: [0, 100, -60, 0], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-35 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #f0abfc, #c084fc, #67e8f9)" }}
        />
        <motion.div
          animate={{ x: [0, 60, -120, 0], y: [0, -120, 80, 0], scale: [1, 1.4, 0.9, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full blur-[100px] opacity-30 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #34d399, #22d3ee, #818cf8)" }}
        />
        <motion.div
          animate={{ x: [0, -60, 100, 0], y: [0, 80, -100, 0], scale: [1, 1.1, 0.75, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-[35%] w-[35%] h-[35%] rounded-full blur-[80px] opacity-25 dark:opacity-15"
          style={{ background: "radial-gradient(circle, #fb7185, #f472b6, #a78bfa)" }}
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
