"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
}

const IMAGE_MODAL_MAX_WIDTH = 1280;

function Lightbox({ images, alt, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = React.useState(initialIndex);
  const [imageSize, setImageSize] = React.useState({
    width: 1280,
    height: 1280,
  });
  const pointerStartX = React.useRef<number | null>(null);
  const hasMultipleImages = images.length > 1;

  React.useEffect(() => {
    const image = new window.Image();

    image.onload = () => {
      setImageSize({
        width: image.naturalWidth || IMAGE_MODAL_MAX_WIDTH,
        height: image.naturalHeight || IMAGE_MODAL_MAX_WIDTH,
      });
    };

    image.src = images[current];
  }, [current, images]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setCurrent((index) => (index - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        setCurrent((index) => (index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [hasMultipleImages, images.length, onClose]);

  const prev = () => {
    setCurrent((index) => (index - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrent((index) => (index + 1) % images.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!hasMultipleImages || pointerStartX.current === null) {
      pointerStartX.current = null;
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX > 0) {
      prev();
      return;
    }

    next();
  };

  return createPortal(
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
        className="relative w-full max-w-[1280px]"
        onClick={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          className="fixed right-5 top-5 z-20 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/25"
          aria-label="닫기">
          <X className="h-5 w-5 text-white" />
        </button>

        {hasMultipleImages ? (
          <>
            <button
              onClick={prev}
              className="absolute -left-10 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              aria-label="이전 이미지">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={next}
              className="absolute -right-10 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              aria-label="다음 이미지">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div
          className="max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}>
          <div className="mx-auto w-fit max-w-[1280px]">
            <Image
              key={images[current]}
              src={images[current]}
              alt={hasMultipleImages ? `${alt} ${current + 1}` : alt}
              width={imageSize.width}
              height={imageSize.height}
              className="block h-auto max-w-full"
              style={{
                width: `${Math.min(imageSize.width, IMAGE_MODAL_MAX_WIDTH)}px`,
              }}
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>

        {/* 이미지가 여러개인 경우 */}
        {hasMultipleImages ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrent(index)}
                aria-label={`${index + 1}번 이미지로 이동`}
                className={
                  index === current
                    ? "h-2.5 w-6 rounded-full bg-white"
                    : "h-2.5 w-2.5 rounded-full bg-white/40 transition-colors hover:bg-white/70"
                }
              />
            ))}
          </div>
        ) : null}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  gallery?: string[];
  initialIndex?: number;
}

export function ProjectImage({
  src,
  alt,
  caption,
  className,
  gallery,
  initialIndex = 0,
}: ProjectImageProps) {
  const [open, setOpen] = React.useState(false);
  const lightboxImages = gallery?.filter(Boolean).length
    ? gallery.filter(Boolean)
    : [src];

  if (!src) return null;

  return (
    <>
      <div className="space-y-3">
        <div
          className={`relative h-[500px] overflow-hidden border shadow-xl group/img cursor-zoom-in ${className}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
            className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-end justify-end bg-black/0 p-4 transition-all group-hover/img:bg-black/20"
            aria-label="이미지 크게 보기">
            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity group-hover/img:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
              이미지 크게 보기
            </div>
          </button>
        </div>
        {caption ? (
          <p className="flex justify-center p-4 text-sm font-medium text-muted-foreground lg:text-md">
            {caption}
          </p>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <Lightbox
            images={lightboxImages}
            alt={alt}
            initialIndex={initialIndex}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
