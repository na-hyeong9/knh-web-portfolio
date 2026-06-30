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

export interface Education {
  id: string;
  school: string;
  period: string;
  major: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  period: string;
}

export interface Experience {
  id: string;
  company: string;
  rank: string;
  position: string;
  role: string;
  team: string;
  period: string;
}

export const coreValues: CoreValue[] = [
  {
    title: "Web Standards",
    summary: "시맨틱 마크업과 접근성을 기준으로 안정적인 UI를 설계합니다.",
    detail:
      "HTML5 시맨틱 구조를 기반으로 크로스브라우징 환경에서도 일관된 품질의 화면을 만듭니다.\n접근성 기준을 준수한 마크업으로 모든 사용자가 불편 없이 이용할 수 있는 UI를 구현합니다.",
  },
  {
    title: "Clean Code",
    summary: "구조를 정리하고 재사용성을 높여 오래 관리할 수 있게 만듭니다.",
    detail:
      "기존 코드의 흐름을 빠르게 파악하고, 반복되는 UI와 스타일을 분리해 가독성과 확장성을 높이는 방향으로 개선합니다.\n컴포넌트 단위 설계로 변경에 강하고 읽기 쉬운 구조를 만듭니다.",
  },
  {
    title: "Collaboration",
    summary:
      "기획, 디자인, 개발 사이를 자연스럽게 잇는 커뮤니케이션에 능통합니다.",
    detail:
      "GitHub와 Notion 기반 협업 경험을 바탕으로 요구사항을 빠르게 정리하고, 다른 직군과의 작업 흐름을 자연스럽게 연결합니다.\n디자이너의 의도를 코드로 정확히 옮기고, 기획 단계에서 구현 가능 여부를 먼저 확인하는 방식으로 불필요한 수정 비용을 줄입니다.",
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

export const educationData: Education[] = [
  {
    id: "edu1",
    school: "[멀티잇]풀스택 개발자 취업캠프(Python)",
    period: "2022.07 ~ 2022.12",
    major: "django 기반 풀스택 웹 개발 (수료)",
  },
  {
    id: "edu2",
    school: "호서대학교",
    period: "2014.03 ~ 2018.02",
    major: "글로벌창업전공 (졸업)",
  },
  {
    id: "edu3",
    school: "영등포여자고등학교",
    period: "2011.03 ~ 2014.02",
    major: "졸업",
  },
];

export const certificationData: Certification[] = [
  {
    id: "cert1",
    name: "정보처리기사",
    issuer: "한국산업인력공단",
    period: "2022.11",
  },
  {
    id: "cert2",
    name: "컴퓨터활용능력 2급",
    issuer: "대한상공회의소",
    period: "2020.11",
  },
  {
    id: "cert3",
    name: "2종보통운전면허",
    issuer: "경찰청(운전면허시험관리단)",
    period: "2017.05",
  },
];

export const experienceData: Experience[] = [
  {
    id: "exp1",
    company: "(주)시아나",
    rank: "대리",
    position: "팀원",
    role: "웹 퍼블리셔",
    team: "Front-end팀",
    period: "2023.06 ~ 2025.12",
  },
  {
    id: "exp2",
    company: "(주)오티씨",
    rank: "주임",
    position: "팀원",
    role: "GIS 전산처리 및 공사 정산 업무",
    team: "유선망구축",
    period: "2018. 05 ~ 2022. 06",
  },
];
