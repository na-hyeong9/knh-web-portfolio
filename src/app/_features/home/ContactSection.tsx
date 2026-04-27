"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { contactLinks } from "@/data/homeData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const contactSectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const revealTargets = contactSectionRef.current
      ? (Array.from(
          contactSectionRef.current.querySelectorAll(".contact-reveal"),
        ) as HTMLElement[])
      : [];

    if (revealTargets.length) {
      gsap.set(revealTargets, { opacity: 0, y: 50 });
    }

    const ctx = gsap.context(() => {
      if (contactSectionRef.current) {
        gsap.to(revealTargets, {
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
        });
      }
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="relative z-[1] bg-background w-full border-t">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div
        ref={contactSectionRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
        {/* 왼쪽 */}
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-4 sm:space-y-6 contact-reveal">
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

          <div className="space-y-3 sm:space-y-4 contact-reveal">
            {contactLinks.map((item) => (
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

        {/* 오른쪽*/}
        <div className="liquid-glass p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] space-y-6 sm:space-y-8 contact-reveal">
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
              <label htmlFor="contact-email" className="text-sm font-bold ml-1">
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
      </div>
    </section>
  );
}
