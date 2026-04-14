"use client";

import * as React from "react";
import { MainLayout } from "@/shared/components/main-layout";
import { Button } from "@/shared/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRight,
  Download,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Award,
  Github,
  ExternalLink,
  Send,
  MessageSquare,
  Building2,
  ShieldCheck,
  Code2,
  Users2,
  Briefcase,
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
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

const phrases = [
  { title: "Team·work", desc: "협력(팀워크) 정신, 협동심." },
  { title: "Creative", desc: "창의적인" },
  { title: "Growing", desc: "성장하는" },
];

function TypingHero() {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const fullText = `${currentPhrase.title}\n${currentPhrase.desc}`;

    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const currentLen = displayText.length;

      if (!isDeleting) {
        if (currentLen < fullText.length) {
          setDisplayText(fullText.slice(0, currentLen + 1));
          const delay =
            fullText[currentLen] === "\n" ? 400 : 100 + Math.random() * 100;
          timer = setTimeout(handleTyping, delay);
        } else {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (currentLen > 0) {
          setDisplayText(fullText.slice(0, currentLen - 1));
          timer = setTimeout(handleTyping, 40);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          timer = setTimeout(handleTyping, 600);
        }
      }
    };

    timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 w-full h-full select-none">
      <div className="mb-6">
        <span className="text-sm md:text-base font-bold text-primary/60 uppercase tracking-[0.2em] mb-2 block">
          나를 상징하는 키워드
        </span>
        <div className="h-px w-12 bg-primary/20 mx-auto" />
      </div>
      <div className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight min-h-[5em] flex flex-col justify-center items-center">
        <div className="relative">
          {displayText.split("\n").map((line, i) => (
            <div
              key={i}
              className={cn(
                "transition-all duration-300",
                i === 0
                  ? "text-primary mb-3 text-4xl md:text-6xl"
                  : "text-foreground/80 text-xl md:text-2xl font-medium",
              )}>
              {line}
              {i === displayText.split("\n").length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="inline-block w-[4px] h-[1.1em] bg-primary ml-2 align-middle"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      // Profile Image Entrance
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

      // Reveal sub-sections on scroll
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
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center gap-12 py-20">
        {/* Dynamic blending background blobs - Full Screen */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
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

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-3xl aspect-[21/9] md:aspect-[3/1] z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            <TypingHero />
          </div>
        </motion.div>

        <div className="space-y-8 max-w-3xl relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] px-4 relative">
              Web Publisher & <br />
              <span className="text-primary">Frontend Developer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground font-medium">
            사용자 경험을 최우선으로 생각하며,{" "}
            <br className="hidden sm:block" />
            깔끔하고 효율적인 코드를 작성하는 김나형입니다.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            size="lg"
            className="flex-1 rounded-full group shadow-lg hover:shadow-blue-500/20 transition-all"
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
            경력기술서 바로가기
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
            <Download className="mr-2 h-4 w-4" />
            포트폴리오 PDF
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 rounded-full hover:bg-primary/5"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
            <Mail className="mr-2 h-4 w-4" />
            연락하기
          </Button>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="container mx-auto px-4 py-32 border-t">
        {/* Core Values Cards */}
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

                {/* Company Info Card */}
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

      {/* Work Section */}
      <section id="work" className="container mx-auto px-4 py-32 border-t">
        <header className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            회사와 소속 단위의 경력과 주요 성과를 소개합니다.
          </p>
        </header>
        <div className="max-w-5xl mx-auto space-y-6">
          {workData.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>
              <Link
                href={`/work/${work.id}`}
                aria-label={`${work.company} 경력 상세 보기`}>
                <Card className="group border-none liquid-glass hover:bg-white/40 dark:hover:bg-zinc-800/40 transition-all duration-500 rounded-[2rem]">
                  <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                      <Building2 className="h-10 w-10 group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {work.company}
                        </h3>
                        <Badge className="glass-button text-primary border-none rounded-full px-4 py-0.5 text-xs font-bold self-center md:self-auto">
                          Work
                        </Badge>
                      </div>
                      <p className="text-lg font-medium text-muted-foreground">
                        {work.role}
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                      <span className="text-sm font-bold text-muted-foreground">
                        {work.period}
                      </span>
                      <div className="flex gap-2">
                        {work.techStack.slice(0, 2).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="rounded-full glass-button text-[10px] px-3">
                            {tech}
                          </Badge>
                        ))}
                        {work.techStack.length > 2 && (
                          <span className="text-[10px] text-muted-foreground font-bold">
                            +{work.techStack.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:flex w-12 h-12 rounded-full glass-button items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight className="h-6 w-6 group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="container mx-auto px-4 py-32 border-t">
        <header className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            실제 작업한 산출물을 시각적으로 어필하는 메인 갤러리입니다.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData
            .filter((p) => p.category === "project")
            .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}>
                <Card className="group overflow-hidden border-none liquid-glass hover:-translate-y-3 transition-all duration-500 rounded-[2.5rem]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-20">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full glass-button flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                          <Github className="h-7 w-7 text-black dark:text-white" />
                        </a>
                      )}
                      <Link
                        href={`/project/${project.id}`}
                        aria-label={`${project.title} 프로젝트 상세 보기`}
                        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <ArrowRight className="h-7 w-7 text-white" />
                      </Link>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-6 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary font-bold uppercase tracking-widest">
                          {project.period}
                        </span>
                        <Badge
                          variant="outline"
                          className="rounded-full text-[10px] py-0 px-3 font-bold glass-button">
                          기여도 {project.contribution}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[11px] rounded-full px-3 py-0.5 glass-button font-medium">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs text-muted-foreground font-medium">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-32 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Side: Message & Links */}
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

          {/* Right Side: Contact Form */}
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
