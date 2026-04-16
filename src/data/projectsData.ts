export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  contribution: string;
  techStack: string[];
  thumbnail: string;
  mainImage: string;
  subImage01: string;
  subImage02: string;
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
  thumbnail: string;
  mainImage: string;
  subImage01: string;
  subImage02: string;
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

// 개인 프로젝트
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Next.js와 TypeScript로 개발한 웹 포트폴리오",
    description: "나의 포트폴리오 사이트 제작 프로젝트",
    period: "2024.04~",
    contribution: "100%",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    thumbnail: "/images/work/techmk/tech-00.png",
    mainImage: "/images/work/techmk/tech-01.png",
    subImage01: "/images/work/techmk/tech-02.png",
    subImage02: "/images/work/techmk/tech-03.png",
    githubUrl: "https://github.com/na-hyeong9/knh-web-portfolio",
    demoUrl: "https://demo.com",
    category: "project",
    details: "This project focuses on clean UI/UX and smooth interactions.",
    screenshots: [
      "https://picsum.photos/seed/s1/800/600",
      "https://picsum.photos/seed/s2/800/600",
    ],
  },
];

// SI 프로젝트
export const workData: Work[] = [
  {
    id: "exp1",
    company: "중소기업기술마켓 정식플랫폼 구축 사업",
    period: "2025.07 ~ 2025.11",
    role: "화면 퍼블리싱 (기여도 80%)",
    achievements: [
      "버전 관리 체계가 없던 초기 환경에서 GitHub 브랜치 전략과 퍼블리싱 환경을 직접 수립해 팀 전체의 협업 기반을 마련",
      "반복되는 UI 패턴을 분석해 공통 컴포넌트로 모듈화하고, 화면 전반의 재사용성을 확보해 작업 효율 향상에 기여",
      "PC·모바일 멀티 디바이스 환경을 고려한 반응형·적응형 퍼블리싱을 적용해 다양한 사용자 환경에서의 일관된 UI 제공",
      "위 기반 위에서 총 108본 이상의 화면을 기한 내 완료",
    ],
    techStack: ["HTML", "CSS", "jQuery", "Git"],
    thumbnail: "/images/work/techmk/tech-00.png",
    mainImage: "/images/work/techmk/tech-01.png",
    subImage01: "/images/work/techmk/tech-02.png",
    subImage02: "/images/work/techmk/tech-03.png",
  },
  {
    id: "exp2",
    company: "현대건설 원전 사업관리 시스템 구축",
    period: "2025.04 ~ 2025.06",
    role: "화면 퍼블리싱 (기여도 100%)",
    achievements: [
      "화면마다 중복 구현되던 UI 요소를 분석해 공통 컴포넌트 15종을 직접 설계·구현, 전체 화면 재사용률 약 70% 달성",
      "컴포넌트 재사용 구조 도입으로 신규 화면 개발 속도를 단축하고, 수정 시 한 곳만 변경해도 전체에 반영되는 유지보수 구조 확립",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Git"],
    thumbnail: "/images/work/nova/nova-00.png",
    mainImage: "/images/work/nova/nova-01.png",
    subImage01: "/images/work/nova/nova-02.png",
    subImage02: "/images/work/nova/nova-03.png",
  },
  {
    id: "exp3",
    company: "울주군청 클라우드 네이티브 시스템",
    period: "2025.03 ~ 2025.04",
    role: "화면 퍼블리싱",
    achievements: [
      "화면마다 중복 구현되던 UI 요소를 분석해 공통 컴포넌트 15종을 직접 설계·구현, 전체 화면 재사용률 약 70% 달성",
      "컴포넌트 재사용 구조 도입으로 신규 화면 개발 속도를 단축하고, 수정 시 한 곳만 변경해도 전체에 반영되는 유지보수 구조 확립",
    ],
    techStack: ["React", "Git"],
    thumbnail: "/images/work/uj/uj-00.png",
    mainImage: "/images/work/uj/uj-01.png",
    subImage01: "/images/work/uj/uj-02.png",
    subImage02: "/images/work/uj/uj-03.png",
  },
  {
    id: "exp4",
    company: "현대건설 고객센터 시스템 구축",
    period: "2024.07 ~ 2024.12",
    role: "화면 퍼블리싱 (기여도 50%)",
    achievements: [
      "반복되는 UI 패턴을 분석해 공통 컴포넌트로 추출하고 SCSS 스타일 가이드를 표준화해 팀 전체 코드 일관성 확보 및 개발 기간 약 20% 단축에 기여",
      "스타일 가이드가 없어 팀원마다 코드 스타일이 달랐던 문제를 해결하기 위해 SCSS/SASS 기반 표준 가이드를 수립, 코드 리뷰 비용 절감",
      "대시보드를 포함한 복잡한 화면 구조를 분석하고 컴포넌트 단위로 분리해 총 45본의 화면을 기한 내 완료",
    ],
    techStack: ["Vue.js", "SCSS", "Git"],
    thumbnail: "/images/work/hicc/hicc-00.png",
    mainImage: "/images/work/hicc/hicc-01.png",
    subImage01: "/images/work/hicc/hicc-02.png",
    subImage02: "/images/work/hicc/hicc-03.png",
  },
  {
    id: "exp5",
    company: "중소기업중앙회 통합경영정보시스템 (K-ERP) 기능 고도화",
    period: "2024.05 ~ 2024.06",
    role: "화면 퍼블리싱",
    achievements: [
      "기존 시스템의 UI 구조를 분석해 신규 기능과의 일관성을 유지하면서 적응형 웹·모바일 퍼블리싱을 100% 단독 담당, 멀티 디바이스 접근성 확보",
      "레거시 시스템의 마크업 패턴을 파악한 뒤 신규 기능 UI를 기존 스타일에 자연스럽게 통합해 사용자 혼란 없이 기능 고도화 완료",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kerp/kbiz-00.png",
    mainImage: "/images/work/kerp/kbiz-01.png",
    subImage01: "/images/work/kerp/kbiz-02.png",
    subImage02: "/images/work/kerp/kbiz-03.png",
  },
  // {
  //   id: "exp6",
  //   company: "중소기업중앙회 유공자포상 시스템 이관",
  //   period: "2024.04 ~ 2024.05",
  //   role: "화면 퍼블리싱",
  //   achievements: [
  //     "이관 전 기존 화면을 정밀 분석해 고객사의 수정 요구사항을 누락 없이 전수 반영, 이관 후 재작업 없이 검수 통과",
  //     "시스템 이관으로 인한 UI 변경 최소화 원칙 하에 작업해 기존 사용자의 혼란을 줄이고 안정적인 서비스 전환 완료",
  //   ],
  //   techStack: ["HTML", "CSS"],
  //   thumbnail: "",
  //   mainImage: "",
  //   subImage01: "",
  //   subImage02: "",
  // },
  {
    id: "exp7",
    company: "SC제일은행 웹 접근성 향상 프로젝트",
    period: "2023.10 ~ 2024.02",
    role: "화면 퍼블리싱",
    achievements: [
      "접근성 기준을 충족하지 못했던 금융 서비스의 마크업 전반을 KWCAG 2.1 기준에 맞게 개선하고 전수 검수, 한국웹접근성인증마크(WA) 획득 달성",
      "스크린리더 사용자와 키보드 사용자를 고려한 시맨틱 마크업 구조로 전면 개선해 다양한 사용자 환경에서의 서비스 접근성 확보",
    ],
    techStack: ["HTML", "CSS"],
    thumbnail: "/images/work/sc/sc-00.png",
    mainImage: "/images/work/sc/sc-01.png",
    subImage01: "",
    subImage02: "",
  },
  {
    id: "exp8",
    company: "중소기업중앙회 대고객 시스템 개편",
    period: "2023.06 ~ 2023.09",
    role: "화면 퍼블리싱",
    achievements: [
      "개편 범위가 넓고 일정이 촉박한 상황에서 화면 구조를 체계적으로 분류하고 우선순위를 정해 117페이지 퍼블리싱 및 유지보수를 단독 완료",
      "모바일 사용자 비율 증가에 대응해 적응형 모바일 페이지를 설계, 디바이스별 최적화된 사용자 경험 제공",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kbiz/kbiz-00.png",
    mainImage: "/images/work/kbiz/kbiz-01.png",
    subImage01: "/images/work/kbiz/kbiz-02.png",
    subImage02: "/images/work/kbiz/kbiz-03.png",
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
