"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/shared/components/ui/Sheet";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  // Check if we are on a detail page
  const isDetailPage =
    pathname.includes("/work/") || pathname.includes("/project/");

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/Show logic on scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Active section logic
      if (!isDetailPage) {
        const sections = navItems.map((item) =>
          document.getElementById(item.id),
        );
        const scrollPosition = currentScrollY + 100;

        sections.forEach((section, index) => {
          if (
            section &&
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
          ) {
            setActiveSection(navItems[index].id);
          }
        });
      }
    };

    const handleClick = () => {
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [isDetailPage, isVisible]);

  const scrollToSection = (id: string) => {
    if (isDetailPage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (isDetailPage) return null;

  return (
    <motion.div
      data-site-header-root="true"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-3 sm:top-6 sm:px-4">
      <header className="pointer-events-auto flex items-center gap-1.5 rounded-full liquid-glass p-1.5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:gap-2 sm:p-2">
        <button
          onClick={() => scrollToSection("home")}
          className="px-3 py-1.5 font-display text-base font-black tracking-tighter text-primary transition-transform hover:scale-105 sm:px-4 sm:py-2 sm:text-lg">
          KNH
        </button>

        <div className="h-6 w-[1px] bg-white/20 dark:bg-white/10 mx-1" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/60 dark:bg-white/10 shadow-sm rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full glass-button">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full glass-button"
                />
              }>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="rounded-b-[3rem] border-none bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
              <SheetTitle className="mb-5 text-center font-display text-xl font-black sm:mb-8 sm:text-2xl">
                KNH
              </SheetTitle>
              <nav className="flex flex-col items-center gap-3 py-2 sm:gap-6 sm:py-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xl font-bold transition-all sm:px-4 sm:py-2 sm:text-2xl",
                      activeSection === item.id
                        ? "text-primary scale-110"
                        : "text-muted-foreground",
                    )}>
                    {item.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </motion.div>
  );
}
