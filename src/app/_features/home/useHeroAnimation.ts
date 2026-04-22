import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useHeroAnimation() {
  const heroTitleRef = React.useRef<HTMLDivElement>(null);
  const heroButtonsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return { heroTitleRef, heroButtonsRef };
}
