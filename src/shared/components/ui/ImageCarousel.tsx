"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectImage } from "@/shared/components/ui/ProjectImage";
import { cn } from "@/shared/lib/utils";

export function ImageCarousel({
  images,
  caption,
  className,
}: {
  images: string[];
  caption?: string;
  className?: string;
}) {
  const [current, setCurrent] = React.useState(0);

  const valid = images.filter(Boolean);
  if (valid.length === 0) return null;

  if (valid.length === 1) {
    return (
      <div className="space-y-3">
        <ProjectImage src={valid[0]} alt="Sub View" className={className} />
        {caption && (
          <p className="flex justify-center text-sm lg:text-md text-muted-foreground font-medium px-4">
            {caption}
          </p>
        )}
      </div>
    );
  }

  const prev = () => setCurrent((i) => (i - 1 + valid.length) % valid.length);
  const next = () => setCurrent((i) => (i + 1) % valid.length);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}>
          {valid.map((src, i) => (
            <div key={src} className="w-full shrink-0">
              <ProjectImage
                src={src}
                alt={`Sub View ${i + 1}`}
                className={className}
                gallery={valid}
                initialIndex={i}
              />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="이전 이미지"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="다음 이미지"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {valid.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${i + 1}번 이미지로 이동`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-primary"
                : "w-2 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>

      {caption && (
        <p className="flex justify-center text-md lg:text-md text-muted-foreground font-medium px-4">
          {caption}
        </p>
      )}
    </div>
  );
}
