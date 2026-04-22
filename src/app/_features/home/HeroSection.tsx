"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { ConveyorBelt } from "@/app/_features/home/ConveyorBelt";
import { useHeroAnimation } from "@/app/_features/home/useHeroAnimation";

export function HeroSection() {
  const { heroTitleRef, heroButtonsRef } = useHeroAnimation();

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex flex-col justify-between py-20">
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="animate-orb-a will-change-transform absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/15 rounded-full blur-[100px]" />
        <div className="animate-orb-b will-change-transform absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/15 rounded-full blur-[100px]" />
      </div>

      <div className="w-full pt-10">
        <ConveyorBelt />
      </div>

      <div className="container mx-auto px-1 flex flex-col items-center gap-12">
        <div
          ref={heroTitleRef}
          className="space-y-6 max-w-5xl flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="relative inline-block">
            <h1 className="sm:text-2lg md:text-3xl lg:text-6xl font-display font-bold tracking-tighter leading-[1.1]">
              Web Publisher & <br />
              <span className="text-primary">Frontend Developer</span>
            </h1>
          </div>
          <p className="flex flex-col text-left sm:block text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            안녕하세요, 꾸준한 성장을 지향하는 웹 퍼블리셔 김나형입니다.
            <span className="block mt-5 md:mt-4" />
            웹 표준과 접근성을 기반으로 직관적인 인터페이스를 만드는 일을
            즐기며, 새로운 기술을 익히고 실무에 적용하는 과정을 좋아합니다.
            <span className="block mt-5 md:mt-4" />
            사용자가 자연스럽게 몰입할 수 있는 인터페이스를 만드는 것을 가장
            중요하게 생각합니다.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-full border p-2 group">
            <span className="group-hover:text-primary transition-color text-md">
              경력기술서 바로가기
            </span>
          </motion.button>
        </div>

        <div
          ref={heroButtonsRef}
          className="flex flex-col items-center gap-8 w-full max-w-2xl">
          <motion.button
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() =>
              document
                .getElementById("project")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 group">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              View Projects
            </span>
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2.5 border border-border">
              <ArrowDown className="w-5 h-5 text-foreground" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
