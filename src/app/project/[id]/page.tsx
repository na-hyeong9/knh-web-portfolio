"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/shared/components/Main";
import { projectsData } from "@/data/projectsData";
import { motion } from "motion/react";
import { Badge } from "@/shared/components/ui/Badge";
import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/utils";
import { ProjectImage } from "@/shared/components/ui/ProjectImage";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = projectsData.find((p) => p.id === params.id);

  if (!project) return <div>Project not found</div>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32 max-w-5xl">
        <Link
          href="/#project"
          aria-label="프로젝트 목록으로 돌아가기"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16">
          <header className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary/10 text-primary border-none rounded-full px-4">
                Project
              </Badge>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.githubUrl && (
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
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full bg-white/50 backdrop-blur-sm shadow-sm",
                  )}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </a>
              )}
            </div>
          </header>

          <section className="space-y-12">
            <h2 className="text-2xl font-bold border-b pb-4">Project Visuals</h2>

            <ProjectImage
              src={project.mainImage}
              alt="Main Project View"
              caption={project.mainImageCaption}
              className="aspect-video rounded-[3rem]"
            />

            {(project.subImage01 || project.subImage02) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectImage
                  src={project.subImage01}
                  alt="Sub View 1"
                  caption={project.subImage01Caption}
                  className="aspect-[4/3] rounded-[2.5rem]"
                />
                <ProjectImage
                  src={project.subImage02}
                  alt="Sub View 2"
                  caption={project.subImage02Caption}
                  className="aspect-[4/3] rounded-[2.5rem]"
                />
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            <div className="md:col-span-2 space-y-12">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-4">Project Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  이 프로젝트는 {project.period} 동안 진행되었으며,{" "}
                  {project.contribution}의 기여도를 가지고 있습니다. 주요 기술
                  스택으로는 {project.techStack.join(", ")}를 사용하였습니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-4">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Responsive Design",
                    "Modern UI/UX",
                    "Optimized Performance",
                    "Interactive Elements",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-4 bg-secondary/20 rounded-2xl">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="p-8 bg-secondary/30 dark:bg-secondary/10 rounded-[2.5rem] border border-border space-y-6">
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
                    <span className="text-sm font-bold">{project.contribution}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">Client</span>
                    </div>
                    <span className="text-sm font-bold">Personal / Freelance</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
