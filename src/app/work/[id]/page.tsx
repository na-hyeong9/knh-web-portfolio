"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MainLayout } from "@/shared/components/Main";
import { workData } from "@/data/projectsData";
import { motion } from "motion/react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ArrowLeft, Calendar, Building2, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

            {/* Main Image */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border">
                <Image
                  src={`https://picsum.photos/seed/${work.id}-main/1200/675`}
                  alt="Main Project View"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-muted-foreground font-medium">
                메인 시스템 아키텍처 및 핵심 인터페이스 디자인
              </p>
            </div>

            {/* Sub Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border">
                  <Image
                    src={`https://picsum.photos/seed/${work.id}-sub1/800/600`}
                    alt="Sub View 1"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground font-medium">
                  데이터 시각화 및 대시보드 상세 모듈
                </p>
              </div>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border">
                  <Image
                    src={`https://picsum.photos/seed/${work.id}-sub2/800/600`}
                    alt="Sub View 2"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground font-medium">
                  사용자 경험 최적화를 위한 모바일 반응형 레이아웃
                </p>
              </div>
            </div>
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
