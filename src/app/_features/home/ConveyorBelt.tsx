"use client";

import * as React from "react";
import { motion } from "motion/react";
import { keywords } from "@/data/homeData";

export function ConveyorBelt() {
  const items = [...keywords, ...keywords, ...keywords, ...keywords];

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none">
      <motion.div
        className="flex items-center"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}>
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
