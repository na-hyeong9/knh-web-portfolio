"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, Github, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="container mx-auto px-4 py-32 border-t">
      {/* 핵심 가치 */}
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
          {coreValues.map((value, i) => (
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

      {/* 프로필 + 타임라인 */}
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
              <h2 className="text-3xl font-display font-bold">{profileInfo.name}</h2>
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
    </section>
  );
}
