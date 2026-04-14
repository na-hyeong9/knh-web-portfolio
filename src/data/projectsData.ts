export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  contribution: string;
  techStack: string[];
  thumbnail: string;
  githubUrl?: string;
  demoUrl?: string;
  category: "work" | "project";
  details: string;
  screenshots: string[];
}

export interface Work {
  id: string;
  company: string;
  period: string;
  role: string;
  achievements: string[];
  techStack: string[];
  details: string;
}

export interface Education {
  id: string;
  school: string;
  period: string;
  major: string;
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

export const projectsData: Project[] = [
  {
    id: "1",
    title: "web-Portfolio",
    description: "Nest.js, Tail",
    period: "2024.01 - 2024.02",
    contribution: "100%",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    thumbnail: "https://picsum.photos/seed/portfolio/800/600",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    category: "project",
    details: "This project focuses on clean UI/UX and smooth interactions.",
    screenshots: [
      "https://picsum.photos/seed/s1/800/600",
      "https://picsum.photos/seed/s2/800/600",
    ],
  },
];

export const workData: Work[] = [
  {
    id: "exp1",
    company: "공기업 마켓 정식플랫폼 구축 사업",
    period: "2025.07 ~ 2025.11",
    role: "화면 퍼블리싱 (기여도 80%)",
    achievements: [
      "GitHub 버전 관리 체계 전담 구축 및 퍼블리싱 환경 초기 세팅",
      "공통 UI 컴포넌트 설계·모듈화로 화면 전반의 재사용성 확보 및 작업 효율 향상",
      "반응형·적응형 대응으로 PC·모바일 멀티 디바이스 환경 완성",
      "총 108본 이상 화면 퍼블리싱",
    ],
    techStack: ["HTML", "CSS", "jQuery", "Git"],
    details: "공기업 마켓 정식플랫폼 구축 사업의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp2",
    company: "건설사 원전 사업관리 시스템 구축",
    period: "2025.04 ~ 2025.06",
    role: "화면 퍼블리싱 (기여도 100%)",
    achievements: [
      "GitHub 버전 관리 체계 전담 구축 및 퍼블리싱 환경 초기 세팅",
      "IBSheet·IBChart 기반 대용량 그리드·차트 UI 구현 및 렌더링 성능 최적화",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Git"],
    details: "건설사 원전 사업관리 시스템 구축의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp3",
    company: "공공기관 클라우드 네이티브 시스템",
    period: "2025.03 ~ 2025.04",
    role: "화면 퍼블리싱",
    achievements: [
      "공통 UI 컴포넌트 15종 직접 설계·구현, 컴포넌트 전체 화면 재사용률 약 70% 달성",
      "컴포넌트 재사용 구조 도입으로 개발 속도 및 유지보수성 대폭 향상",
    ],
    techStack: ["React", "Git"],
    details: "공공기관 클라우드 네이티브 시스템의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp4",
    company: "건설사 고객센터 시스템 구축",
    period: "2024.07 ~ 2024.12",
    role: "화면 퍼블리싱 (기여도 50%)",
    achievements: [
      "UI 컴포넌트 모듈화로 개발 기간 약 20% 단축 기여",
      "SCSS/SASS 기반 스타일 가이드 수립 및 표준화로 팀 전체 코드 일관성 확보",
      "대시보드 포함 총 45본 화면 구현 완료",
    ],
    techStack: ["Vue.js", "SCSS", "Git"],
    details: "건설사 고객센터 시스템 구축의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp5",
    company: "공기업 통합경영정보시스템 (K-ERP) 기능 고도화",
    period: "2024.05 ~ 2024.06",
    role: "화면 퍼블리싱",
    achievements: [
      "적응형 웹, 모바일 퍼블리싱 100% 단독 담당, 멀티 디바이스 접근성 확보",
      "기존 시스템 분석 후 신규 기능 UI 적기 적용",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    details:
      "공기업 통합경영정보시스템 (K-ERP) 기능 고도화의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp6",
    company: "유공자포상 시스템 이관",
    period: "2024.04 ~ 2024.05",
    role: "화면 퍼블리싱",
    achievements: [
      "기존 화면 정밀 분석 및 고객사 수정 요구사항 누락 없이 전수 반영",
      "시스템 이관에 따른 UI/UX 최적화로 사용자 혼란 최소화",
    ],
    techStack: ["HTML", "CSS"],
    details: "유공자포상 시스템 이관의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp7",
    company: "금융권 웹 접근성 향상 프로젝트",
    period: "2023.10 ~ 2024.02",
    role: "화면 퍼블리싱",
    achievements: [
      "KWCAG 2.1 기준 마크업 전면 개선 및 검수",
      "한국웹접근성인증마크(WA) 획득 달성",
    ],
    techStack: ["HTML", "CSS"],
    details: "금융권 웹 접근성 향상 프로젝트의 퍼블리싱을 담당하였습니다.",
  },
  {
    id: "exp8",
    company: "공기업 대고객 시스템 개편",
    period: "2023.06 ~ 2023.09",
    role: "화면 퍼블리싱",
    achievements: [
      "117페이지 화면 퍼블리싱 및 유지보수 전담",
      "적응형 모바일 페이지 설계",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    details: "공기업 대고객 시스템 개편의 퍼블리싱을 담당하였습니다.",
  },
];

export const educationData: Education[] = [
  {
    id: "edu1",
    school: "호서대학교",
    period: "2014.03 ~ 2018.02",
    major: "글로벌창업전공 (졸업)",
  },
  {
    id: "edu2",
    school: "영등포여자고등학교",
    period: "2011.03 ~ 2014.02",
    major: "졸업",
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
