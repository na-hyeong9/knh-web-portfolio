"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/shared/components/Main";
import { workData } from "@/data/projectsData";
import { motion } from "motion/react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProjectImage } from "@/shared/components/ui/ProjectImage";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

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
                  <p className="text-xs text-muted-foreground font-bold uppercase">Period</p>
                  <p className="font-bold">{work.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Company</p>
                  <p className="font-bold">{work.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Role</p>
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
                  <span className="text-primary font-black text-xl">0{i + 1}</span>
                  <p className="text-lg text-muted-foreground leading-relaxed">{ach}</p>
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
