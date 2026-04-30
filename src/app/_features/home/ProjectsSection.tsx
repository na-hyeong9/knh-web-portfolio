"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectGrid } from "@/app/_features/home/ProjectGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (
      !sectionRef.current ||
      !contentRef.current ||
      !textRef.current ||
      !headerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 40 });
      gsap.set(headerRef.current.children, { opacity: 0, y: 36 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top +=50",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(headerRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 35%",
            scrub: true,
          },
        })
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          ease: "none",
          duration: 0.35,
        })
        .to(
          textRef.current,
          {
            opacity: 0,
            y: -40,
            ease: "none",
            duration: 0.25,
          },
          0.75,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden border-t">
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <span
          ref={textRef}
          className="select-none whitespace-nowrap font-bold uppercase leading-none text-foreground/[0.04] dark:text-foreground/[0.06]"
          style={{ fontSize: "10vw" }}>
          my project list
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="animate-orb-a absolute top-[-15%] left-[-10%] h-[50%] w-[50%] rounded-full opacity-35 blur-[80px] will-change-transform dark:opacity-20"
          style={{
            background: "radial-gradient(circle, #a78bfa, #818cf8, #38bdf8)",
          }}
        />
        <div
          className="animate-orb-b absolute right-[-10%] bottom-[-10%] h-[45%] w-[45%] rounded-full opacity-30 blur-[80px] will-change-transform dark:opacity-15"
          style={{
            background: "radial-gradient(circle, #f0abfc, #c084fc, #67e8f9)",
          }}
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

      <div className="relative z-10 min-h-[200vh]">
        <div ref={contentRef} className="flex min-h-screen items-center">
          <div className="container mx-auto w-full px-4 py-16 md:py-32">
            <header
              ref={headerRef}
              className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-20">
              <h2 className="font-display text-2xl font-bold sm:text-4xl md:text-5xl">
                Projects
              </h2>
              <p className="text-base text-muted-foreground md:text-xl" />
            </header>

            <ProjectGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
