"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, Github, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { cn } from "@/shared/lib/utils";
import { skills, coreValues, profileInfo } from "@/data/homeData";
import { experienceData, educationData } from "@/data/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const profileRef = React.useRef<HTMLDivElement>(null);
  const coreValuesHeaderRef = React.useRef<HTMLElement>(null);
  const coreValuesGridRef = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (profileRef.current) {
        gsap.from(profileRef.current, {
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      const subSections = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      subSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      if (coreValuesHeaderRef.current) {
        gsap.fromTo(
          coreValuesHeaderRef.current.children,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: coreValuesHeaderRef.current,
              start: "top bottom-=80",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            immediateRender: false,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
        );
      }

      if (coreValuesGridRef.current) {
        const cards = coreValuesGridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: coreValuesGridRef.current,
              start: "top bottom-=60",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            immediateRender: false,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative z-[1] bg-background w-full border-t">
      <div className="container mx-auto px-4 py-32">
      {/* 핵심 가치 */}
      <div className="mb-24 space-y-8">
        <header
          ref={coreValuesHeaderRef}
          className="text-center space-y-4 mb-12">
          <Badge className="glass-button text-primary border-none rounded-full px-6 py-1 text-sm font-bold">
            핵심 역량
          </Badge>
          <h3 className="text-3xl md:text-4xl font-sans font-bold">
            유연한 사고 방식을 지향합니다.
          </h3>
        </header>

        {/* Mobile: stacked grid */}
        <div className="grid grid-cols-1 gap-5 md:hidden">
          {coreValues.map((value, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 sm:rounded-[2.5rem]">
              <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* 글래스 아이콘 + 제목 뱃지 */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:px-4 sm:py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                    {value.title}
                  </h3>
                </div>
              </div>
              {/* 설명 영역 — 글래스 패널 */}
              <div className="flex-1 border-t border-white/10 bg-white/5 p-5 backdrop-blur-xl dark:bg-white/3 sm:p-6">
                <p className="break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal accordion — 닫힘: 세로 제목 / 열림: 이미지+설명 */}
        <div ref={coreValuesGridRef} className="hidden md:flex gap-3 h-[520px]">
          {coreValues.map((value, i) => {
            const isOpen = hovered === i;

            return (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-[2.5rem] border border-white/10 cursor-pointer"
                animate={{ flex: isOpen ? 5 : 1 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}>
                {/* 배경 이미지 */}
                <div className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover object-center transition-transform duration-700"
                    style={{ scale: isOpen ? 1.05 : 1 }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* 닫힌 상태: 글래스 뱃지 */}
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 whitespace-nowrap">
                        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white">
                          <value.icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">
                          {value.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 열린 상태: 글래스 콘텐츠 패널 */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.18,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-col gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <value.icon className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {value.title}
                        </h3>
                        <p className="text-sm text-white/75 leading-relaxed">
                          {value.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 프로필 + 타임라인 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
          <div ref={profileRef} className="space-y-8">
            <div className="relative aspect-[4/3] lg:w-100 rounded-3xl overflow-hidden shadow-2xl border">
              <Image
                src="/images/common/profile.png"
                alt="Profile"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-sans font-bold">
                {profileInfo.name}
              </h2>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>{profileInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-primary shrink-0" />
                <a
                  href={profileInfo.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors">
                  {profileInfo.github.text}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{profileInfo.location}</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8 space-y-24 m-auto">
          <div className="grid grid-cols-1 gap-12">
            {/* Experience */}
            <section className="space-y-8 gsap-reveal">
              <h3 className="text-3xl font-display font-bold border-b pb-4">
                Experience
              </h3>
              <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />
                <div className="space-y-0">
                  {experienceData.map((exp, i) => (
                    <div key={exp.id} className="flex gap-5">
                      <div className="relative flex-shrink-0 flex flex-col items-center">
                        <div
                          className={cn(
                            "w-[15px] h-[15px] rounded-full border-2 z-10 mt-1 transition-all",
                            i === 0
                              ? "bg-primary border-primary shadow-[0_0_8px_2px] shadow-primary/50"
                              : "bg-background border-border",
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 pb-10">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          {exp.period}
                        </span>
                        <span className="text-xl font-bold leading-tight">
                          {exp.company}
                        </span>
                        <span className="text-base text-muted-foreground">
                          {exp.role}
                        </span>
                        <span className="text-sm text-muted-foreground/70">
                          {exp.team} · {exp.rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-8 gsap-reveal">
              <h3 className="text-3xl font-display font-bold border-b pb-4">
                Education
              </h3>
              <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />
                <div className="space-y-0">
                  {educationData.map((edu, i) => (
                    <div key={edu.id} className="flex gap-5">
                      <div className="relative flex-shrink-0 flex flex-col items-center">
                        <div
                          className={cn(
                            "w-[15px] h-[15px] rounded-full border-2 z-10 mt-1 transition-all",
                            i === 0
                              ? "bg-primary border-primary shadow-[0_0_8px_2px] shadow-primary/50"
                              : "bg-background border-border",
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 pb-10">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          {edu.period}
                        </span>
                        <span className="text-xl font-bold leading-tight">
                          {edu.school}
                        </span>
                        <span className="text-base text-muted-foreground">
                          {edu.major}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Skills */}
          <section className="space-y-8 gsap-reveal">
            <h3 className="text-3xl font-display font-bold border-b pb-4">
              Skills
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
              {skills.map((skill) => (
                <Card
                  key={skill.name}
                  className="border-none bg-secondary/20 hover:bg-secondary/50 transition-all duration-300 rounded-2xl group">
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <div className="relative w-8 h-8 group-hover:scale-110 transition-transform">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain dark:invert"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-center leading-tight">
                      {skill.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
      </div>
    </section>
  );
}
