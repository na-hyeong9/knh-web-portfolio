"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X } from "lucide-react";
import Image from "next/image";

export function Lightbox({
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

export function ProjectImage({
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
        {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
