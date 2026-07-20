"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "@/data/homeData";
import type { ProjectItem } from "@/data/homeData";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORAGE_KEY = "projectGrid:filter";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "project", label: "Project" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export function ProjectGrid() {
  const items = allProjects;
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const gridRef = React.useRef<HTMLUListElement>(null);

  // 상세 페이지에서 뒤로가기로 돌아왔을 때 선택했던 필터 유지
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && FILTERS.some((f) => f.key === saved)) {
        setFilter(saved as FilterKey);
      }
    } catch {
      // sessionStorage 접근 불가 시 무시
    }
  }, []);

  // 카드 등장 애니메이션 (About·Contact 섹션과 동일한 GSAP ScrollTrigger 리빌)
  // filter 변경 시 재실행되어 새로 나타나는 카드도 다시 애니메이션된다.
  React.useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(":scope > li");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // 스크롤로 진입할 때 카드가 하나씩 통통통 튀어 오른다.
      // back.out 오버슈트 이징 + stagger 리듬, 진입할 때마다(restart) 다시 재생.
      gsap.set(cards, { opacity: 0, y: 60 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: grid,
          start: "top bottom-=60",
          toggleActions: "restart none none reverse",
        },
      });
    }, grid);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [filter]);

  const selectFilter = React.useCallback((key: FilterKey) => {
    setFilter(key);
    try {
      sessionStorage.setItem(STORAGE_KEY, key);
    } catch {
      // 무시
    }
  }, []);

  const countOf = React.useCallback(
    (key: FilterKey) =>
      key === "all"
        ? items.length
        : items.filter((item) => item.category === key).length,
    [items],
  );

  const filtered =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="space-y-10">
      {/* 필터 탭 */}
      <div
        role="tablist"
        aria-label="프로젝트 카테고리 필터"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-black/10 text-muted-foreground hover:border-black/20 hover:text-foreground dark:border-white/10 dark:hover:border-white/20",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-black/5 text-muted-foreground dark:bg-white/10",
                )}
              >
                {countOf(f.key)}
              </span>
            </button>
          );
        })}
      </div>

      {/* 카드 그리드 */}
      <ul
        ref={gridRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((item) => (
          <li key={item.id}>
            <ProjectCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <Link
      href={item.link}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_55px_rgba(15,23,42,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_14px_45px_rgba(0,0,0,0.4)]"
    >
      {/* 썸네일 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <span className="px-4 text-center font-display text-lg font-bold text-primary/40">
              {item.title}
            </span>
          </div>
        )}

        <div className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/30 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge
            className={cn(
              "rounded-full border-none px-2.5 py-0.5 text-[10px] font-bold uppercase",
              item.category === "work"
                ? "bg-primary/15 text-primary"
                : "bg-sky-500/15 text-sky-600 dark:text-sky-400",
            )}
          >
            {item.category}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {item.period}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base font-bold leading-tight text-zinc-900 dark:text-white sm:text-lg">
          {item.title}
        </h3>

        {item.techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {item.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full border-none bg-black/5 px-2 py-0.5 text-[10px] text-zinc-700 dark:bg-white/10 dark:text-zinc-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
