"use client";

import * as React from "react";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPopStateNavigation = React.useRef(false);

  React.useEffect(() => {
    const handlePopState = () => {
      isPopStateNavigation.current = true;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  React.useEffect(() => {
    if (isPopStateNavigation.current) {
      isPopStateNavigation.current = false;
      return;
    }

    if (pathname !== "/") {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
