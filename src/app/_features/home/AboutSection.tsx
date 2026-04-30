"use client";

import * as React from "react";
import Image from "next/image";
import { Github, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoreValuesList } from "@/app/_features/home/CoreValuesList";
import { skills, profileInfo } from "@/data/homeData";
import { educationData, experienceData } from "@/data/projectsData";
import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { cn } from "@/shared/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const profileRef = React.useRef<HTMLDivElement>(null);
  const coreValuesHeaderRef = React.useRef<HTMLElement>(null);

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
              toggleActions: "play none none reverse",
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative z-[1] w-full border-t bg-background">
      <div className="container mx-auto px-4 py-32">
        <div className="mb-24 space-y-8">
          <header
            ref={coreValuesHeaderRef}
            className="mb-12 space-y-4 text-center">
            <Badge className="glass-button rounded-full border-none px-6 py-1 text-sm font-bold text-primary">
              핵심 역량
            </Badge>
            <h3 className="text-3xl font-bold md:text-4xl">
              유연한 사고 방식을 지향합니다.
            </h3>
          </header>

          <CoreValuesList />
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
            <div ref={profileRef} className="space-y-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-2xl lg:w-100">
                <Image
                  src="/images/common/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{profileInfo.name}</h2>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={`mailto:${profileInfo.email}`}
                    className="transition-colors hover:text-primary">
                    {profileInfo.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={profileInfo.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary">
                    {profileInfo.github.text}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <span>{profileInfo.location}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="m-auto space-y-24 lg:col-span-8">
            <div className="grid grid-cols-1 gap-12">
              <section className="gsap-reveal space-y-8">
                <h3 className="border-b pb-4 font-display text-3xl font-bold">
                  Experience
                </h3>

                <div className="relative">
                  <div className="absolute top-2 bottom-0 left-[7px] w-px bg-border" />
                  <div className="space-y-0">
                    {experienceData.map((exp, index) => (
                      <div key={exp.id} className="flex gap-5">
                        <div className="relative flex shrink-0 flex-col items-center">
                          <div
                            className={cn(
                              "z-10 mt-1 h-[15px] w-[15px] rounded-full border-2 transition-all",
                              index === 0
                                ? "border-primary bg-primary shadow-[0_0_8px_2px] shadow-primary/50"
                                : "border-border bg-background",
                            )}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 pb-10">
                          <span className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                            {exp.period}
                          </span>
                          <span className="text-xl leading-tight font-bold">
                            {exp.company}
                          </span>
                          <span className="text-base text-muted-foreground">
                            {exp.role}
                          </span>
                          <span className="text-sm text-muted-foreground/70">
                            {exp.team} / {exp.rank}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="gsap-reveal space-y-8">
                <h3 className="border-b pb-4 font-display text-3xl font-bold">
                  Education
                </h3>

                <div className="relative">
                  <div className="absolute top-2 bottom-0 left-[7px] w-px bg-border" />
                  <div className="space-y-0">
                    {educationData.map((edu, index) => (
                      <div key={edu.id} className="flex gap-5">
                        <div className="relative flex shrink-0 flex-col items-center">
                          <div
                            className={cn(
                              "z-10 mt-1 h-[15px] w-[15px] rounded-full border-2 transition-all",
                              index === 0
                                ? "border-primary bg-primary shadow-[0_0_8px_2px] shadow-primary/50"
                                : "border-border bg-background",
                            )}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 pb-10">
                          <span className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                            {edu.period}
                          </span>
                          <span className="text-xl leading-tight font-bold">
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

            <section className="gsap-reveal space-y-8">
              <h3 className="border-b pb-4 font-display text-3xl font-bold">
                Skills
              </h3>

              <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
                {skills.map((skill) => (
                  <Card
                    key={skill.name}
                    className="group rounded-2xl border-none bg-secondary/20 transition-all duration-300 hover:bg-secondary/50">
                    <CardContent className="flex flex-col items-center justify-center gap-2">
                      <div className="relative h-8 w-8 transition-transform group-hover:scale-110">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          className="object-contain dark:invert"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-center text-[10px] leading-tight font-bold">
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
