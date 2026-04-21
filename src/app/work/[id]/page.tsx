"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/shared/components/Main";
import { workData } from "@/data/projectsData";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Briefcase,
  ZoomIn,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative w-full max-w-7xl"
        onClick={(e) => e.stopPropagation()}>
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ height: "80vh" }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain w-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full p-2 transition-colors">
          <X className="h-5 w-5 text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function ProjectImage({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  if (!src) return null;

  return (
    <>
      <div className="space-y-3">
        <div
          className={`relative overflow-hidden shadow-xl border group/img cursor-zoom-in ${className}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover/img:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-end justify-end p-4 bg-black/0 group-hover/img:bg-black/20 transition-all"
            aria-label="크게 보기">
            <div className="opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <ZoomIn className="h-3.5 w-3.5" />
              크게 보기
            </div>
          </button>
        </div>
        {caption && (
          <p className="text-center text-sm text-muted-foreground font-medium px-2">
            {caption}
          </p>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function WorkDetailPage() {
  const params = useParams();
  const work = workData.find((w) => w.id === params.id);

  if (!work) return <div>Work not found</div>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <Link
          href="/#work"
          aria-label="경력 목록으로 돌아가기"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary/10 text-primary border-none rounded-full px-4">
                Experience
              </Badge>
              {work.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              {work.company}
            </h1>
            <p className="text-2xl text-muted-foreground font-medium">
              {work.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-b py-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">
                    Period
                  </p>
                  <p className="font-bold">{work.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">
                    Company
                  </p>
                  <p className="font-bold">{work.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">
                    Role
                  </p>
                  <p className="font-bold">{work.role}</p>
                </div>
              </div>
            </div>
          </header>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold">Key Achievements</h2>
            <ul className="space-y-4">
              {work.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex gap-4 p-6 bg-secondary/20 rounded-3xl border border-transparent hover:border-primary/20 transition-colors">
                  <span className="text-primary font-black text-xl">
                    0{i + 1}
                  </span>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {ach}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-12">
            <h2 className="text-2xl font-bold">Project Visuals</h2>

            <ProjectImage
              src={work.mainImage}
              alt="Main Project View"
              caption={work.mainImageCaption}
              className="aspect-video rounded-[2.5rem]"
            />

            {(work.subImage01 || work.subImage02) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectImage
                  src={work.subImage01}
                  alt="Sub View 1"
                  caption={work.subImage01Caption}
                  className="aspect-[4/3] rounded-[2rem]"
                />
                <ProjectImage
                  src={work.subImage02}
                  alt="Sub View 2"
                  caption={work.subImage02Caption}
                  className="aspect-[4/3] rounded-[2rem]"
                />
              </div>
            )}
          </section>

          <div className="pt-12">
            <Button
              aria-label="경력 목록으로 돌아가기"
              size="lg"
              className="rounded-full px-8"
              onClick={() => window.history.back()}>
              목록으로 돌아가기
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
