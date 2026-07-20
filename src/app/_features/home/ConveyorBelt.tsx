"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { keywords } from "@/data/homeData";

// 콘텐츠를 4세트 복제하고 -50%(=2세트) 지점에서 wrap 하면 이음매 없이 반복된다.
const BASE_VELOCITY = -1; // 기본 흐름 속도(%/s), 음수 = 왼쪽 방향

export function ConveyorBelt() {
  const items = [...keywords, ...keywords, ...keywords, ...keywords];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // 스크롤 속도를 벨트 가속 계수로 변환 (clamp 해제로 빠른 스크롤 시 더 강하게)
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // 스크롤 방향에 따라 벨트 진행 방향도 뒤집는다.
  const directionFactor = React.useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * BASE_VELOCITY * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="w-full overflow-hidden select-none pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}>
      <motion.div
        className="flex items-center"
        style={{ x, width: "max-content" }}>
        {items.map((keyword, i) => (
          <React.Fragment key={i}>
            <span className="text-[6vw] md:text-[8vw] font-display font-bold tracking-tighter uppercase text-primary leading-none whitespace-nowrap px-6 md:px-12">
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
