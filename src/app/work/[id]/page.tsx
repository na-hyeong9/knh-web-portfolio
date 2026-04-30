import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
} from "lucide-react";

import { workData } from "@/data/projectsData";
import { AnimatedPage } from "@/shared/components/AnimatedPage";
import { HistoryBackButton } from "@/shared/components/HistoryBackButton";
import { MainLayout } from "@/shared/components/Main";
import { ImageCarousel } from "@/shared/components/ui/ImageCarousel";
import { ProjectImage } from "@/shared/components/ui/ProjectImage";
import { Badge } from "@/shared/components/ui/Badge";
import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/utils";

interface WorkDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return workData.map((work) => ({
    id: work.id,
  }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = workData.find((item) => item.id === id);

  if (!work) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 py-32">
        <HistoryBackButton
          fallbackHref="/"
          ariaLabel="경력 목록으로 돌아가기"
          className="group mb-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </HistoryBackButton>

        <AnimatedPage className="space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge className="rounded-full border-none bg-primary/10 px-4 text-primary">
                Experience
              </Badge>
              {work.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              {work.title}
            </h1>

            <p className="text-2xl font-medium text-muted-foreground">
              {work.role}
            </p>

            <div className="grid grid-cols-1 gap-6 border-y py-8 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Period
                  </p>
                  <p className="font-bold">{work.period}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Company
                  </p>
                  <p className="font-bold">{work.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Role
                  </p>
                  <p className="font-bold">{work.role}</p>
                </div>
              </div>
            </div>
          </header>

          {work.link?.length ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Related Links</h2>
              <ul className="flex flex-col gap-3">
                {work.link.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-8">
            <h2 className="text-2xl font-bold">Key Achievements</h2>
            <ul className="space-y-4">
              {work.achievements.map((achievement, index) => (
                <li
                  key={`${work.id}-${index}`}
                  className="flex gap-4 rounded-3xl border border-transparent bg-secondary/20 p-6 transition-colors hover:border-primary/20">
                  <span className="text-xl font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-3">
                    <Badge className="w-fit rounded-full border-none bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {achievement.keyword}
                    </Badge>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
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
              className="rounded-[2.5rem]"
            />

            {work.subImages01?.length || work.subImages02?.length ? (
              <div className="grid grid-cols-1 gap-8">
                {work.subImages01?.length ? (
                  <ImageCarousel
                    images={work.subImages01}
                    caption={work.subCaption01}
                    className="rounded-[2.5rem]"
                  />
                ) : null}

                {work.subImages02?.length ? (
                  <ImageCarousel
                    images={work.subImages02}
                    caption={work.subCaption02}
                    className="rounded-[2.5rem]"
                  />
                ) : null}
              </div>
            ) : null}
          </section>

          <div className="pt-12">
            <HistoryBackButton
              fallbackHref="/"
              ariaLabel="경력 목록으로 돌아가기"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8",
              )}>
              목록으로 돌아가기
            </HistoryBackButton>
          </div>
        </AnimatedPage>
      </div>
    </MainLayout>
  );
}
