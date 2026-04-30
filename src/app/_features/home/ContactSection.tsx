"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { contactLinks } from "@/data/homeData";
import { useContactForm } from "@/app/_features/home/useContactForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const contactSectionRef = React.useRef<HTMLDivElement>(null);
  const { values, isSubmitting, toast, handleChange, handleSubmit } =
    useContactForm();

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
      if (!contactSectionRef.current) return;

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
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="relative z-[1] w-full border-t bg-background">
      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-4">
            <div
              className={`flex w-full max-w-md items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold shadow-2xl backdrop-blur-xl ${
                toast.tone === "success"
                  ? "border-emerald-400/20 bg-emerald-500/95 text-white"
                  : "border-red-400/20 bg-red-500/95 text-white"
              }`}>
              {toast.tone === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div
          ref={contactSectionRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 sm:space-y-12">
            <div className="contact-reveal space-y-4 sm:space-y-6">
              <Badge className="glass-button rounded-full border-none px-4 py-1 text-sm font-bold text-primary sm:px-6">
                Contact
              </Badge>
              <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-6xl">
                함께 성장할
                <br />
                <span className="text-primary">기회를 찾고 있습니다.</span>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-xl">
                새로운 기술을 탐구하고 협업으로 더 나은 경험을 만드는 일을
                좋아합니다. 편하게 메시지를 남겨주시면 빠르게 확인하겠습니다.
              </p>
            </div>

            <div className="contact-reveal space-y-3 sm:space-y-4">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button group flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-primary/5 sm:gap-6 sm:rounded-[2rem] sm:p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-bold sm:text-lg">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-reveal liquid-glass space-y-6 rounded-3xl p-6 sm:space-y-8 sm:rounded-[3rem] sm:p-8 md:p-12">
            <div className="space-y-2">
              <h3 className="text-xl font-bold sm:text-2xl">메시지 보내기</h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                궁금한 점이나 협업 제안이 있다면 아래 양식으로 보내주세요.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-bold">
                  이름
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="성함을 입력해주세요"
                  className="mt-3 w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-zinc-800/50 sm:rounded-2xl sm:p-4 sm:text-base"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-bold">
                  이메일
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="회신받을 이메일을 입력해주세요"
                  className="mt-3 w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-zinc-800/50 sm:rounded-2xl sm:p-4 sm:text-base"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-tel" className="text-sm font-bold">
                  전화번호{" "}
                  <span className="font-normal text-muted-foreground">(선택)</span>
                </label>
                <input
                  id="contact-tel"
                  type="tel"
                  value={values.tel}
                  onChange={handleChange}
                  placeholder="연락처를 입력해주세요"
                  className="mt-3 w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-zinc-800/50 sm:rounded-2xl sm:p-4 sm:text-base"
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-bold">
                  내용
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="보내실 내용을 입력해주세요"
                  className="mt-3 w-full resize-none rounded-xl border border-white/20 bg-white/50 p-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-zinc-800/50 sm:rounded-2xl sm:p-4 sm:text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="btn-send-glow w-full rounded-full py-6 text-base font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 sm:py-8 sm:text-lg">
                <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {isSubmitting ? "전송 중..." : "메일 보내기"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
