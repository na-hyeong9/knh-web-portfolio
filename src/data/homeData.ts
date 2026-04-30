import { workData, projectsData } from "@/data/projectsData";
import { ShieldCheck, Code2, Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Github, MessageSquare, Mail } from "lucide-react";

export const skills = [
  { name: "HTML5", icon: "/icons/skills/html5.svg" },
  { name: "CSS3", icon: "/icons/skills/css3.svg" },
  { name: "Sass", icon: "/icons/skills/sass.svg" },
  { name: "JavaScript", icon: "/icons/skills/javaScript.svg" },
  { name: "TypeScript", icon: "/icons/skills/typeScript.svg" },
  { name: "Vuejs", icon: "/icons/skills/vuejs.svg" },
  { name: "React", icon: "/icons/skills/react.svg" },
  { name: "Next.js", icon: "/icons/skills/nextjs.svg" },
  { name: "Tailwind CSS", icon: "/icons/skills/tailwind.svg" },
  { name: "Figma", icon: "/icons/skills/figma.svg" },
  { name: "Git", icon: "/icons/skills/git.svg" },
];

export interface CoreValue {
  title: string;
  icon: LucideIcon;
  image: string;
  desc: string;
}

export const coreValues: CoreValue[] = [
  {
    title: "Web Standards",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800&h=600",
    desc: "HTML5 시맨틱 마크업과 CSS3 기반의 크로스브라우징 퍼블리싱에 능숙합니다. 웹 접근성(KWCAG 2.1) 기준을 준수하며 유지보수 가능한 구조로 작업합니다.",
  },
  {
    title: "Clean Code",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600",
    desc: "기존 코드의 구조를 분석하고 가독성과 재사용성을 높이는 방향으로 개선합니다. SCSS 모듈화와 컴포넌트 분리를 통해 유지보수하기 쉬운 코드베이스를 만들어갑니다.",
  },
  {
    title: "Collaboration",
    icon: Users2,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600",
    desc: "Github 와 Notion을 이용하여 팀 프로젝트를 진행한 경험이 있습니다. 기획, 디자인, 개발과의 협업을 통한 경험으로 다른 직군과 원활한 커뮤니케이션이 가능합니다.",
  },
];

export interface ContactLink {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  {
    icon: Github,
    label: "Github",
    value: "github.com/na-hyeong9",
    href: "https://github.com/na-hyeong9?tab=repositories",
  },
  {
    icon: MessageSquare,
    label: "Velog",
    value: "velog.io/@kim-na-hyeong",
    href: "https://velog.io/@kim-na-hyeong/posts",
  },
  {
    icon: Mail,
    label: "Email",
    value: "devkimna@gmail.com",
    href: "mailto:devkimna@gmail.com",
  },
];

export const portfolioLinks = {
  resume: {
    href: "https://www.notion.so/34b67bd412c581d48ab7f3f2fb06358f",
    label: "경력기술서 바로가기",
  },
};

export const profileInfo = {
  name: "김나형",
  email: "devkimna@gmail.com",
  github: {
    url: "https://github.com/na-hyeong9",
    text: "github.com/na-hyeong9",
  },
  location: "Seoul, South Korea",
};

export const keywords = ["Teamwork", "Creative", "Growing"];

export const allProjects = [
  ...workData.map((work, index) => ({
    id: work.id,
    title: work.title,
    period: work.period,
    role: work.role,
    techStack: work.techStack,
    category: "work" as const,
    link: `/work/${work.id}`,
    thumbnail: work.thumbnail,
    mainImage: work.mainImage,
    subImage01: work.subImages01,
    subImage02: work.subImages02,
  })),
  ...projectsData.map((p, index) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    period: p.period,
    role: p.role,
    techStack: p.techStack ?? [],
    category: p.category,
    thumbnail: p.thumbnail,
    mainImage: p.mainImage,
    subImage01: p.subImages01,
    subImage02: p.subImages02,
    link: `/project/${p.id}`,
  })),
];

export type ProjectItem = (typeof allProjects)[number];
