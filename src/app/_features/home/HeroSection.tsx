"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { ConveyorBelt } from "@/app/_features/home/ConveyorBelt";
import { useHeroAnimation } from "@/app/_features/home/useHeroAnimation";
import { portfolioLinks } from "@/data/homeData";

export function HeroSection() {
  const { heroTitleRef, heroButtonsRef } = useHeroAnimation();

  return (
    <section
      id="home"
      className="relative z-[1] bg-background flex min-h-screen flex-col justify-between overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="animate-orb-a will-change-transform absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-primary/15 blur-[100px]" />
        <div className="animate-orb-b will-change-transform absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-400/15 blur-[100px]" />
        <div className="animate-orb-c will-change-transform absolute top-[30%] right-[20%] h-[35%] w-[35%] rounded-full bg-violet-400/10 blur-[90px]" />
      </div>

      <div className="w-full pt-8 sm:pt-10">
        <ConveyorBelt />
      </div>

      <div className="container mx-auto mt-10 flex flex-col items-center gap-10 px-1 sm:mt-14 sm:gap-12">
        <div
          ref={heroTitleRef}
          className="flex max-w-5xl flex-col items-center space-y-5 text-center sm:items-start sm:space-y-6 sm:text-left">
          <div className="relative inline-block">
            <h1 className="text-4xl font-display font-bold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
              Web Publisher & <br />
              <span className="text-primary">Frontend Developer</span>
            </h1>
          </div>

          <p className="mx-auto flex max-w-2xl flex-col px-4 font-medium leading-relaxed sm:block sm:text-lg md:px-0 md:text-xl lg:text-2xl">
            안녕하세요, 꾸준한 성장을 지향하는 웹 퍼블리셔 김나형입니다.
            <span className="mt-5 block md:mt-4" />
            사용성과 접근성을 기반으로 직관적인 인터페이스를 만드는 일을 즐기며,
            새로운 기술을 익히고 실무에 적용하는 과정을 좋아합니다.
            <span className="mt-5 block md:mt-4" />
            사용자가 자연스럽게 몰입할 수 있는 인터페이스를 만드는 것을 가장
            중요하게 생각합니다.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href={portfolioLinks.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="group inline-flex items-center gap-1 rounded-full border-0 p-0 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:gap-1.5 sm:border sm:px-4 sm:py-2 sm:text-base">
              <span className="transition-colors group-hover:text-primary">
                {portfolioLinks.resume.label}
              </span>
              <ArrowUpRight className="hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
            </motion.a>

            <motion.a
              href={portfolioLinks.pdf.href}
              download={portfolioLinks.pdf.fileName}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="group inline-flex items-center gap-1 rounded-full border-0 bg-primary p-0 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:gap-1.5 sm:border sm:border-primary sm:px-4 sm:py-2 sm:text-base"
              aria-label={`${portfolioLinks.pdf.label} (PDF)`}>
              <span>{portfolioLinks.pdf.label}</span>
              <Download className="hidden h-4 w-4 transition-transform group-hover:translate-y-0.5 sm:block" />
            </motion.a>
          </div>
        </div>

        <div
          ref={heroButtonsRef}
          className="flex w-full max-w-2xl flex-col items-center gap-8">
          <motion.button
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() =>
              document
                .getElementById("project")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
              View Projects
            </span>
            <div className="rounded-full border border-border bg-background/80 p-2.5 backdrop-blur-sm">
              <ArrowDown className="h-5 w-5 text-foreground" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
