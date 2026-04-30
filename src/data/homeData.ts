import { workData, projectsData } from "@/data/projectsData";
import type { LucideIcon } from "lucide-react";
import { Github, Mail, MessageSquare } from "lucide-react";

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
  summary: string;
  detail: string;
}

export const coreValues: CoreValue[] = [
  {
    title: "Web Standards",
    summary: "시맨틱 마크업과 접근성을 기준으로 안정적인 UI를 설계합니다.",
    detail:
      "HTML5 시맨틱 구조와 CSS 기반 퍼블리싱에 익숙하며, 웹 접근성 기준을 함께 고려해 다양한 환경에서 읽기 쉽고 유지보수하기 좋은 화면을 만듭니다.\n키보드 탐색, 스크린 리더 호환, 명도 대비 기준을 실제 작업에 적용하며, 표준을 지킨 마크업이 결국 더 안정적인 서비스를 만든다고 믿습니다.",
  },
  {
    title: "Clean Code",
    summary: "구조를 정리하고 재사용성을 높여 오래 관리할 수 있게 만듭니다.",
    detail:
      "기존 코드의 흐름을 빠르게 파악하고, 반복되는 UI와 스타일을 분리해 가독성과 확장성을 높이는 방향으로 개선합니다.\n컴포넌트 단위 설계와 커스텀 훅 분리를 통해 변경에 강하고 읽기 쉬운 구조를 유지하며, 기술 부채를 남기지 않는 습관을 만들어가고 있습니다.",
  },
  {
    title: "Collaboration",
    summary: "기획, 디자인, 개발을 아우르는 협업 커뮤니케이션 경험이 있습니다.",
    detail:
      "GitHub와 Notion 기반 협업 경험을 바탕으로 요구사항을 빠르게 정리하고, 다른 직군과의 작업 흐름을 자연스럽게 연결합니다. 디자이너의 의도를 코드로 정확히 옮기고, 기획 단계에서 구현 가능 여부를 먼저 확인하는 방식으로 불필요한 수정 비용을 줄입니다.",
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
  pdf: {
    href: "/files/KimNahyeong_web_portfolio.pdf",
    label: "PDF 다운받기",
    fileName: "KimNahyeong_web_portfolio.pdf",
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
  ...workData.map((work) => ({
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
  ...projectsData.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    period: project.period,
    role: project.role,
    techStack: project.techStack ?? [],
    category: project.category,
    thumbnail: project.thumbnail,
    mainImage: project.mainImage,
    subImage01: project.subImages01,
    subImage02: project.subImages02,
    link: `/project/${project.id}`,
  })),
];

export type ProjectItem = (typeof allProjects)[number];
