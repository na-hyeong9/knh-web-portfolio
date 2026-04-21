"use client";

import * as React from "react";
import { MainLayout } from "@/shared/components/Main";
import { Button } from "@/shared/components/ui/Button";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Github,
  Send,
  MessageSquare,
  ShieldCheck,
  Code2,
  Users2,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  workData,
  educationData,
  projectsData,
  experienceData,
} from "@/data/projectsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { cn } from "@/shared/lib/utils";

const skills = [
  { name: "HTML5", icon: "/icons/skills/html5.svg" },
  { name: "CSS3", icon: "/icons/skills/css3.svg" },
  { name: "JavaScript", icon: "/icons/skills/javaScript.svg" },
  { name: "TypeScript", icon: "/icons/skills/typeScript.svg" },
  { name: "React", icon: "/icons/skills/react.svg" },
  { name: "Next.js", icon: "/icons/skills/nextjs.svg" },
  { name: "Tailwind CSS", icon: "/icons/skills/tailwind.svg" },
  { name: "Figma", icon: "/icons/skills/figma.svg" },
];

const allProjects = [
  ...workData.map((work) => ({
    id: work.id,
    title: work.company,
    period: work.period,
    techStack: work.techStack,
    category: "work" as const,
    link: `/work/${work.id}`,
    thumbnail: work.thumbnail,
    mainImage: work.mainImage,
    subImage01: work.subImage01,
    subImage02: work.subImage02,
  })),
  ...projectsData.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    period: p.period,
    techStack: p.techStack ?? [],
    category: p.category,
    thumbnail: p.thumbnail,
    mainImage: p.mainImage,
    subImage01: p.subImage01,
    subImage02: p.subImage02,
    link: `/project/${p.id}`,
  })),
];

function BentoCard({
  item,
  index,
}: {
  item: (typeof allProjects)[0];
  index: number;
}) {
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
        {/* 배경 */}
        <div className="absolute inset-0 bg-white/[0.06] dark:bg-white/[0.03]" />

        {/* 썸네일 */}
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

        {/* 바로가기 아이콘 */}
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

        {/* 하단 텍스트 */}
        <div className="absolute inset-0 p-4 sm:p-5 md:p-8 flex flex-col justify-end gap-1.5 sm:gap-2 md:gap-3 z-10">
          <Badge className="glass-button text-primary border-none rounded-full px-2.5 sm:px-3 md:px-4 py-0.5 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase truncate max-w-[60%]">
            {item.category}
          </Badge>

          <p className="text-[12px] sm:text-[8px] md:text-[16px] font-bold text-zinc-500 dark:text-white shrink-0">
            {item.period}
          </p>

          <h3 className="text-sm sm:text-base md:text-2xl font-bold light:text-zinc-800  group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {item.title}
          </h3>

          <div className="flex flex-wrap gap-1 md:gap-2 pt-0.5 md:pt-2">
            {item.techStack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 light:text-zinc-800 dark:text-zinc-300 border-none text-[7px] sm:text-[8px] md:text-[9px] rounded-full px-1.5 sm:px-2 py-0">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

function ProjectGrid() {
  const [filter, setFilter] = React.useState<"all" | "work" | "project">("all");
  const gridRef = React.useRef<HTMLDivElement>(null);

  const filteredItems = allProjects.filter(
    (item) => filter === "all" || item.category === filter,
  );

  React.useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".bento-card");

    // 카드 초기 상태로 리셋 (탭 변경 시에도 항상 처음부터)
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

    // 탭 변경 시 이미 뷰포트 안에 있으면 즉시 재생
    const rect = gridRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
      animateIn();
    }

    return () => st.kill();
  }, [filter]);

  return (
    <div className="space-y-12">
      <div className="flex justify-center gap-1 sm:gap-2 p-1 bg-secondary/30 backdrop-blur-md rounded-full w-fit mx-auto border border-white/10">
        {["all", "work", "project"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as "all" | "work" | "project")}
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

// home keyword conveyor belt
const keywords = ["Teamwork", "Creative", "Growing"];

function ConveyorBelt() {
  // 끊김 없는 루프를 위해 4벌 복제
  const items = [...keywords, ...keywords, ...keywords, ...keywords];

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none">
      <motion.div
        className="flex items-center"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
        {items.map((keyword, i) => (
          <React.Fragment key={i}>
            <span className="text-[8vw] md:text-[10vw] font-display font-bold tracking-tighter uppercase text-primary leading-none whitespace-nowrap px-6 md:px-12">
              {keyword}
            </span>
            <span className="text-primary/25 text-[5vw] md:text-[7vw] leading-none shrink-0">
              ✦
            </span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const heroTitleRef = React.useRef<HTMLDivElement>(null);
  const heroButtonsRef = React.useRef<HTMLDivElement>(null);
  const coreValuesHeaderRef = React.useRef<HTMLElement>(null);
  const coreValuesGridRef = React.useRef<HTMLDivElement>(null);
  const contactLeftRef = React.useRef<HTMLDivElement>(null);
  const contactRightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      if (heroTitleRef.current) {
        heroTl.from(heroTitleRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
        });
      }

      if (heroButtonsRef.current) {
        heroTl.from(
          heroButtonsRef.current,
          { y: 40, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        );
      }

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

      const subSections = gsap.utils.toArray(".gsap-reveal");
      subSections.forEach((section: any) => {
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

      // 핵심 가치 헤더
      if (coreValuesHeaderRef.current) {
        gsap.from(coreValuesHeaderRef.current.children, {
          scrollTrigger: {
            trigger: coreValuesHeaderRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // 핵심 가치 카드 3장 stagger
      if (coreValuesGridRef.current) {
        const cards = coreValuesGridRef.current.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: coreValuesGridRef.current,
            start: "top bottom-=60",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Contact 왼쪽
      if (contactLeftRef.current) {
        gsap.from(Array.from(contactLeftRef.current.children), {
          scrollTrigger: {
            trigger: contactLeftRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
        });
      }

      // Contact 오른쪽 폼
      if (contactRightRef.current) {
        gsap.from(contactRightRef.current, {
          scrollTrigger: {
            trigger: contactRightRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden min-h-screen flex flex-col justify-between py-20">
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 200, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.5, 0.8, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -150, 120, 0],
              y: [0, 120, -80, 0],
              scale: [1, 0.7, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-400/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, 80, -120, 0],
              y: [0, -150, 80, 0],
              scale: [1, 1.2, 0.7, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] right-[10%] w-[50%] h-[50%] bg-cyan-400/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="w-full pt-10">
          <ConveyorBelt />
        </div>

        <div className="container mx-auto px-1 flex flex-col items-center gap-12">
          <div
            ref={heroTitleRef}
            className="space-y-6 max-w-5xl flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative inline-block ">
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
              <div
                className="bg-background/80 backdrop-blur-sm rounded-full p-2.5 border border-border"
                style={{
                  animation: "neon-pulse 0.3s ease-in-out infinite alternate",
                }}>
                <ArrowDown className="w-5 h-5 text-foreground" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="container mx-auto px-4 py-32 border-t">
        <div className="mb-24 space-y-8">
          <header
            ref={coreValuesHeaderRef}
            className="text-center space-y-4 mb-12">
            <Badge className="glass-button text-primary border-none rounded-full px-6 py-1 text-sm font-bold">
              Core Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              핵심 가치
            </h2>
          </header>

          <div
            ref={coreValuesGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Standards",
                icon: ShieldCheck,
                image:
                  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800&h=600",
                desc: "HTML5 시맨틱 마크업과 CSS3 기반의 크로스브라우징 퍼블리싱에 능숙합니다. 웹 접근성(KWCAG 2.1) 기준을 준수하며 유지보수 가능한 구조로 작업합니다.",
              },
              {
                title: "Clean Code",
                icon: Code2,
                image:
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600",
                desc: "기존 코드의 구조를 분석하고 가독성과 재사용성을 높이는 방향으로 개선합니다. SCSS 모듈화와 컴포넌트 분리를 통해 유지보수하기 쉬운 코드베이스를 만들어갑니다.",
              },
              {
                title: "Collaboration",
                icon: Users2,
                image:
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600",
                desc: "Github 와 Notion을 이용하여 팀 프로젝트를 진행한 경험이 있습니다. 기획, 디자인, 개발과의 협업을 통한 경험으로 다른 직군과 원활한 커뮤니케이션이 가능합니다.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[2.5rem] liquid-glass border-none flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
            <div ref={profileRef} className="space-y-8">
              <div className="relative aspect-square w-100 rounded-3xl overflow-hidden shadow-2xl border">
                <Image
                  src="/images/common/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold">김나형</h2>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span>devkimna@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary shrink-0" />
                  <a
                    href="https://github.com/na-hyeong9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                    github.com/na-hyeong9
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>Seoul, South Korea</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 space-y-24 m-auto">
            <div className="grid grid-cols-1 gap-12">
              {/* Experience Timeline */}
              <section className="space-y-8 gsap-reveal">
                <h3 className="text-3xl font-display font-bold border-b pb-4">
                  Experience
                </h3>
                <div className="relative">
                  {/* 세로 선 */}
                  <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />
                  <div className="space-y-0">
                    {experienceData.map((exp, i) => (
                      <div key={exp.id} className="flex gap-5">
                        {/* 도트 */}
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
                        {/* 내용 */}
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

              {/* Education Timeline */}
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
                        {/* 내용 */}
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
      </section>

      {/* Projects Section */}
      <section id="project" className="relative overflow-hidden border-t">
        {/* 홀로그램 배경 */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 120, -80, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.3, 0.85, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full blur-[100px] opacity-40 dark:opacity-25"
            style={{
              background: "radial-gradient(circle, #a78bfa, #818cf8, #38bdf8)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -100, 80, 0],
              y: [0, 100, -60, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-35 dark:opacity-20"
            style={{
              background: "radial-gradient(circle, #f0abfc, #c084fc, #67e8f9)",
            }}
          />
          <motion.div
            animate={{
              x: [0, 60, -120, 0],
              y: [0, -120, 80, 0],
              scale: [1, 1.4, 0.9, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full blur-[100px] opacity-30 dark:opacity-20"
            style={{
              background: "radial-gradient(circle, #34d399, #22d3ee, #818cf8)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -60, 100, 0],
              y: [0, 80, -100, 0],
              scale: [1, 1.1, 0.75, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[50%] left-[35%] w-[35%] h-[35%] rounded-full blur-[80px] opacity-25 dark:opacity-15"
            style={{
              background: "radial-gradient(circle, #fb7185, #f472b6, #a78bfa)",
            }}
          />
          {/* 홀로그램 격자 오버레이 */}
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

      {/* Contact Section */}
      <section
        id="contact"
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* 왼쪽 */}
          <div ref={contactLeftRef} className="space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <Badge className="glass-button text-primary border-none rounded-full px-4 sm:px-6 py-1 text-sm font-bold">
                Contact
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight">
                함께 성장할
                <br />
                <span className="text-primary">동료를 찾습니다!</span>
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
                새로운 기술을 탐구하고 함께 멋진 가치를 만들어갈 분들의 연락을
                기다립니다. 언제든 편하게 메시지 남겨주세요!
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: Github,
                  label: "Github",
                  value: "github.com/na-hyeong9",
                  href: "https://github.com/na-hyeong9?tab=repositories",
                },
                {
                  icon: MessageSquare,
                  label: "Velog",
                  value: "velog.io/@kim-na-hyeong",
                  href: "https://velog.io/@kim-na-hyeong/posts",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "devkimna@gmail.com",
                  href: "mailto:devkimna@gmail.com",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] glass-button hover:bg-primary/5 transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-lg font-bold truncate">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div
            ref={contactRightRef}
            className="liquid-glass p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold">메시지 보내기</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                궁금한 점이 있다면 아래 양식을 작성해 주세요.
              </p>
            </div>

            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-bold">
                  이름
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="성함을 입력해주세요"
                  className="w-full p-3 mt-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-bold ml-1">
                  이메일
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="회신받을 이메일을 입력해주세요"
                  className="w-full p-3 mt-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-tel" className="text-sm font-bold ml-1">
                  전화번호{" "}
                  <span className="text-muted-foreground font-normal">
                    (선택)
                  </span>
                </label>
                <input
                  id="contact-tel"
                  type="tel"
                  placeholder="연락처를 입력해주세요"
                  className="w-full p-3 mt-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-bold ml-1">
                  내용
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="보내실 내용을 입력해주세요"
                  className="w-full p-3 mt-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm sm:text-base"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="btn-send-glow w-full rounded-full py-6 sm:py-8 text-base sm:text-lg font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group">
                <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                메일 보내기
              </Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
