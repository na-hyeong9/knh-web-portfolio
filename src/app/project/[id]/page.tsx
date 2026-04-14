"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/shared/components/main-layout";
import { projectsData } from "@/data/projectsData";
import { motion } from "motion/react";
import { Badge } from "@/shared/components/ui/badge";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
            <h2 className="text-2xl font-bold border-b pb-4">
              Project Visuals
            </h2>

            {/* Main Image */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border">
                <Image
                  src={project.thumbnail}
                  alt="Main Project View"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-muted-foreground font-medium">
                프로젝트의 핵심 인터페이스 및 사용자 경험 디자인
              </p>
            </div>

            {/* Sub Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg border">
                  <Image
                    src={`https://picsum.photos/seed/${project.id}-sub1/800/600`}
                    alt="Sub View 1"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground font-medium">
                  주요 기능 모듈 및 데이터 처리 로직 시각화
                </p>
              </div>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg border">
                  <Image
                    src={`https://picsum.photos/seed/${project.id}-sub2/800/600`}
                    alt="Sub View 2"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground font-medium">
                  다양한 디바이스 환경을 고려한 반응형 레이아웃
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            <div className="md:col-span-2 space-y-12">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-4">
                  Project Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  이 프로젝트는 {project.period} 동안 진행되었으며,{" "}
                  {project.contribution}의 기여도를 가지고 있습니다. 주요 기술
                  스택으로는 {project.techStack.join(", ")}를 사용하였습니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-4">
                  Key Features
                </h2>
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
        </motion.div>
      </div>
    </MainLayout>
  );
}
