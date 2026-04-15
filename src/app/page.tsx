"use client";

import * as React from "react";
import { MainLayout } from "@/shared/components/Main";
import { Button } from "@/shared/components/ui/Button";

import {
  ArrowRight,
  Mail,
  MapPin,
  Github,
  Send,
  MessageSquare,
  ShieldCheck,
  Code2,
  Users2,
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
import { motion, AnimatePresence } from "framer-motion";

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
  })),
  ...projectsData.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    period: p.period,
    techStack: p.techStack ?? [],
    category: p.category,
    thumbnail: p.thumbnail,
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
  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-[2.5rem] liquid-glass bento-card opacity-0 translate-y-10 aspect-[4/3]",
      )}>
      <Link href={item.link} className="block w-full h-full">
        {item.thumbnail ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-secondary/30 -z-10" />
        )}

        <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3 z-10">
          <div className="flex items-center justify-between">
            <Badge className="glass-button text-primary border-none rounded-full px-4 py-0.5 text-[10px] font-bold uppercase">
              {item.category}
            </Badge>
            <span className="text-[10px] font-bold text-white/60">
              {item.period}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {item.title}
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {item.techStack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border-none text-[9px] rounded-full px-2 py-0">
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

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
    });
  }, [filter]);

  return (
    <div className="space-y-12">
      <div className="flex justify-center gap-2 p-1 bg-secondary/30 backdrop-blur-md rounded-full w-fit mx-auto border border-white/10">
        {["all", "work", "project"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as "all" | "work" | "project")}
            className={cn(
              "px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
              filter === t
                ? "bg-white dark:bg-zinc-800 text-primary shadow-xl scale-105"
                : "text-muted-foreground hover:text-foreground",
            )}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <BentoCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

const keywords = ["Teamwork", "Creative", "Growing"];

function SlotMachine() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden relative flex justify-center select-none pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-[15vw] md:text-[18vw] font-display font-bold tracking-tighter uppercase text-primary leading-none">
          {keywords[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const heroTitleRef = React.useRef<HTMLDivElement>(null);
  const heroButtonsRef = React.useRef<HTMLDivElement>(null);

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
          <SlotMachine />
        </div>

        <div className="container mx-auto px-1 flex flex-col items-center gap-12">
          <div
            ref={heroTitleRef}
            className="space-y-6 max-w-5xl flex justify-center">
            <div className="relative inline-block">
              <h1 className="text-5xl font-display font-bold tracking-tighter leading-[1.1] px-4">
                Web Publisher & <br />
                <span className="text-primary">Frontend Developer</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl flex flex-col text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              안녕하세요, 꾸준한 성장을 지향하는 웹 퍼블리셔 김나형입니다.
              <span className="inline-block mt-4" />
              픽셀 하나하나에 의미를 담고 싶어 시작한 퍼블리싱이 어느새 사용자의
              경험 전체를 설계하는 일이 되었습니다.{" "}
              <span className="inline-block mt-4" />웹 표준과 접근성을
              지키면서도 사용자가 자연스럽게 몰입할 수 있는 인터페이스를 만드는
              것을 가장 중요하게 생각합니다.
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
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                <ArrowRight className="h-6 w-6 rotate-90 group-hover:text-primary transition-colors" />
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
          <header className="text-center space-y-4 mb-12">
            <Badge className="glass-button text-primary border-none rounded-full px-6 py-1 text-sm font-bold">
              Core Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              핵심 가치
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <div ref={profileRef} className="lg:sticky lg:top-32 space-y-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border">
                <Image
                  src="https://picsum.photos/seed/profile/600/600"
                  alt="Profile"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">김나형</h2>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>devkimna@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <a
                    href="https://github.com/na-hyeong9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                    github.com/na-hyeong9
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Seoul, South Korea</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section className="space-y-8 gsap-reveal">
                <h3 className="text-3xl font-display font-bold border-b pb-4">
                  Experience
                </h3>
                <div className="space-y-8">
                  {experienceData.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-2">
                      <span className="text-sm text-primary font-bold">
                        {exp.period}
                      </span>
                      <span className="text-2xl font-bold">{exp.company}</span>
                      <span className="text-lg text-muted-foreground">
                        {exp.role}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8 gsap-reveal">
                <h3 className="text-3xl font-display font-bold border-b pb-4">
                  Education
                </h3>
                <div className="space-y-8">
                  {educationData.map((edu) => (
                    <div key={edu.id} className="flex flex-col gap-2">
                      <span className="text-sm text-primary font-bold">
                        {edu.period}
                      </span>
                      <span className="text-2xl font-bold">{edu.school}</span>
                      <span className="text-lg text-muted-foreground">
                        {edu.major}
                      </span>
                    </div>
                  ))}
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
      <section id="project" className="container mx-auto px-4 py-32 border-t">
        <header className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground"></p>
        </header>
        <ProjectGrid />
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-32 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12">
            <div className="space-y-6">
              <Badge className="glass-button text-primary border-none rounded-full px-6 py-1 text-sm font-bold">
                Contact
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight">
                함께 성장할
                <br />
                <span className="text-primary">동료를 찾습니다!</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                새로운 기술을 탐구하고 함께 멋진 가치를 만들어갈 분들의 연락을
                기다립니다. 언제든 편하게 메시지 남겨주세요!
              </p>
            </div>

            <div className="space-y-4">
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
                  className="flex items-center gap-6 p-6 rounded-[2rem] glass-button hover:bg-primary/5 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="liquid-glass p-10 md:p-12 rounded-[3rem] space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">메시지 보내기</h3>
              <p className="text-muted-foreground">
                궁금한 점이 있다면 아래 양식을 작성해 주세요.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-bold ml-1">
                  이름
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="성함을 입력해주세요"
                  className="w-full p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                  className="w-full p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                  className="w-full p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                  className="w-full p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full py-8 text-lg font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group">
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                메일 보내기
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
