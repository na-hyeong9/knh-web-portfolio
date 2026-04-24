import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Hash,
  Target,
  User,
} from "lucide-react";

import { projectsData } from "@/data/projectsData";
import { AnimatedPage } from "@/shared/components/AnimatedPage";
import { HistoryBackButton } from "@/shared/components/HistoryBackButton";
import { MainLayout } from "@/shared/components/Main";
import { ImageCarousel } from "@/shared/components/ui/ImageCarousel";
import { ProjectImage } from "@/shared/components/ui/ProjectImage";
import { Badge } from "@/shared/components/ui/Badge";
import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = projectsData.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-5xl px-4 py-32">
        <HistoryBackButton
          fallbackHref="/"
          ariaLabel="프로젝트 목록으로 돌아가기"
          className="group mb-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </HistoryBackButton>

        <AnimatedPage className="space-y-16">
          <header className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="rounded-full border-none bg-primary/10 px-4 text-primary">
                Project
              </Badge>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "rounded-full shadow-lg",
                  )}>
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Repository
                </a>
              ) : null}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full bg-white/50 shadow-sm backdrop-blur-sm",
                  )}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </a>
              ) : null}
            </div>
          </header>

          {project.overviewSections?.length ? (
            <>
              <section className="space-y-4">
                <h2 className="border-b pb-4 text-2xl font-bold">목차</h2>
                <ol className="space-y-2">
                  {project.overviewSections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary">
                        <span className="text-xs font-bold tabular-nums text-primary/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Hash className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="font-medium">{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              {project.overviewSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 space-y-6">
                  <h2 className="flex items-center gap-3 border-b pb-4 text-2xl font-bold">
                    <span className="text-base font-bold tabular-nums text-primary/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.heading}
                        className="rounded-3xl border border-transparent bg-secondary/20 p-6 transition-colors hover:border-primary/20">
                        <h3 className="mb-2 font-bold text-foreground">
                          {item.heading}
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ) : null}

          <section className="space-y-12">
            <h2 className="border-b pb-4 text-2xl font-bold">
              Project Visuals
            </h2>

            <ProjectImage
              src={project.mainImage}
              alt="Main Project View"
              caption={project.mainImageCaption}
              className="aspect-video rounded-[3rem]"
            />

            {project.subImages01?.length || project.subImages02?.length ? (
              <div className="grid grid-cols-1 gap-8">
                {project.subImages01?.length ? (
                  <ImageCarousel
                    images={project.subImages01}
                    caption={project.subCaption01}
                    className="aspect-[4/3] rounded-[2.5rem]"
                  />
                ) : null}

                {project.subImages02?.length ? (
                  <ImageCarousel
                    images={project.subImages02}
                    caption={project.subCaption02}
                    className="aspect-[4/3] rounded-[2.5rem]"
                  />
                ) : null}
              </div>
            ) : null}
          </section>

          <div className="grid grid-cols-1 gap-12 pt-8 md:grid-cols-3">
            <div className="space-y-16 md:col-span-2">
              <section className="space-y-6">
                <h2 className="border-b pb-4 text-2xl font-bold">
                  Project Overview
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  이 프로젝트는 {project.period} 동안 진행되었으며{" "}
                  {project.contribution} 기여도로 참여했습니다. 주요 기술
                  스택으로는 {project.techStack.join(", ")}를 사용했습니다.
                </p>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="space-y-6 rounded-[2.5rem] border border-border bg-secondary/30 p-8 dark:bg-secondary/10">
                <h3 className="text-xl font-bold">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Period</span>
                    </div>
                    <span className="text-sm font-bold">{project.period}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span className="text-sm font-medium">Contribution</span>
                    </div>
                    <span className="text-sm font-bold">
                      {project.contribution}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">Client</span>
                    </div>
                    <span className="text-sm font-bold">
                      Personal / Freelance
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="pt-4">
            <HistoryBackButton
              fallbackHref="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8",
              )}>
              프로젝트 목록으로 돌아가기
            </HistoryBackButton>
          </div>
        </AnimatedPage>
      </div>
    </MainLayout>
  );
}
