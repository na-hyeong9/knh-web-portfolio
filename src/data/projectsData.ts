export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  contribution: string;
  techStack: string[];
  thumbnail: string;
  mainImage: string;
  mainImageCaption?: string;
  subImages01?: string[];
  subCaption01?: string;
  subImages02?: string[];
  subCaption02?: string;
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
  mainImageCaption?: string;
  subImages01?: string[];
  subCaption01?: string;
  subImages02?: string[];
  subCaption02?: string;
  link?: string[];
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
    thumbnail: "/images/project/portfolio/main.png",
    mainImage: "/images/project/portfolio/main.gif",
    mainImageCaption:
      "framer-motion으로 컨베이어 벨트로 스타일링한 메인 화면 입니다. 다크모드를 지원하고 반응형을 대응합니다.",
    subImages01: ["/images/project/portfolio/scrollMotion.gif"],
    subCaption01:
      "GSAP 스크롤 애니메이션을 이용하여 페이지에 부드러운 전환 효과를 주었습니다.",
    subImages02: ["/images/project/portfolio/subPage.png"],
    subCaption02: "",
    githubUrl: "https://github.com/na-hyeong9/knh-web-portfolio",
    demoUrl: "https://knh-web-portfolio.vercel.app/",
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
    thumbnail: "/images/work/techmk/tech-01.png",
    mainImage: "/images/work/techmk/tech-01.png",
    mainImageCaption: "플랫폼 메인 화면 — 기술 거래 목록 및 검색 인터페이스",
    subImages01: ["/images/work/techmk/tech-02.png"],
    subCaption01: "기업 등록·관리 화면 — 반응형 적응형 레이아웃 적용",
    subImages02: ["/images/work/techmk/tech-03.png"],
    subCaption02: "모바일 최적화 화면 — 멀티 디바이스 대응 UI",
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
    thumbnail: "/images/work/nova/nova-01.png",
    mainImage: "/images/work/nova/nova-01.png",
    mainImageCaption: "원전 사업 현황 대시보드 — 공정·일정·예산 통합 관리 화면",
    subImages01: ["/images/work/nova/nova-02.png"],
    subCaption01: "공통 컴포넌트 라이브러리 — 재사용 UI 모듈 15종 구현",
    subImages02: ["/images/work/nova/nova-03.png"],
    subCaption02: "사업 보고서 상세 화면 — 데이터 입력 및 조회 인터페이스",
  },
  {
    id: "exp3",
    company: "울주군청 클라우드 네이티브 시스템",
    period: "2025.03 ~ 2025.04",
    role: "화면 퍼블리싱 (기여도 50%)",
    achievements: [
      "화면마다 중복 구현되던 UI 요소를 분석해 공통 컴포넌트 15종을 직접 설계·구현, 전체 화면 재사용률 약 70% 달성",
      "컴포넌트 재사용 구조 도입으로 신규 화면 개발 속도를 단축하고, 수정 시 한 곳만 변경해도 전체에 반영되는 유지보수 구조 확립",
    ],
    techStack: ["React", "Git"],
    thumbnail: "/images/work/uj/uj-01.png",
    mainImage: "/images/work/uj/uj-01.png",
    mainImageCaption:
      "클라우드 네이티브 행정 시스템 메인 화면 — 통합 업무 포털",
    subImages01: ["/images/work/uj/uj-02.png"],
    subCaption01: "민원 접수·처리 화면 — React 기반 컴포넌트 구조",
    subImages02: ["/images/work/uj/uj-03.png"],
    subCaption02: "통계·현황 대시보드 — 데이터 시각화 인터페이스",
  },
  {
    id: "exp4",
    company: "현대건설 고객센터 시스템 구축",
    period: "2024.07 ~ 2024.12",
    role: "화면 퍼블리싱 (기여도 50%)",
    achievements: [
      "반복되는 UI 패턴을 분석해 공통 컴포넌트로 추출하고 SCSS 스타일 가이드를 표준화해 팀 전체 코드 일관성 확보 및 개발 기간 약 20% 단축에 기여",
      "스타일 가이드가 없어 팀원마다 코드 스타일이 달랐던 문제를 해결하기 위해 SCSS/SASS 기반 표준 가이드를 수립, 코드 리뷰 비용 절감",
      "대시보드를 포함한 복잡한 화면 구조를 분석하고 컴포넌트 단위로 분리해 총 60본의 화면을 기한 내 완료",
    ],
    techStack: ["Vue.js", "SCSS", "Git"],
    thumbnail: "/images/work/hicc/hicc-01.png",
    mainImage: "/images/work/hicc/hicc-01.png",
    mainImageCaption: "고객센터 메인 화면 — 상담 접수 및 현황 통합 인터페이스",
    subImages01: ["/images/work/hicc/hicc-02.png"],
    subCaption01: "SCSS 스타일 가이드 기반 공통 컴포넌트",
    subImages02: ["/images/work/hicc/hicc-03.png"],
    subCaption02: "Vue.js 반응형 레이아웃 — 다양한 화면 해상도 대응",
  },
  {
    id: "exp5",
    company: "중소기업중앙회 통합경영정보시스템 (K-ERP) 기능 고도화",
    period: "2024.05 ~ 2024.06",
    role: "화면 퍼블리싱 (기여도 100%)",
    achievements: [
      "기존 시스템의 UI 구조를 분석해 신규 기능과의 일관성을 유지하면서 적응형 웹·모바일 퍼블리싱을 100% 단독 담당, 멀티 디바이스 접근성 확보",
      "레거시 시스템의 마크업 패턴을 파악한 뒤 신규 기능 UI를 기존 스타일에 자연스럽게 통합해 사용자 혼란 없이 기능 고도화 완료",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kerp/kbiz-01.png",
    mainImage: "/images/work/kerp/kbiz-01.png",
    mainImageCaption:
      "K-ERP 통합경영정보 시스템 메인 화면 — 신규 기능 고도화 UI",
    subImages01: ["/images/work/kerp/kbiz-02.png"],
    subCaption01: "모바일 적응형 화면 — 멀티 디바이스 접근성 확보",
    subImages02: ["/images/work/kerp/kbiz-03.png"],
    subCaption02: "레거시 시스템 통합 화면 — 기존 스타일 일관성 유지",
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
    role: "화면 퍼블리싱 (기여도 30%)",
    achievements: [
      "접근성 기준을 충족하지 못했던 금융 서비스의 마크업 전반을 KWCAG 2.1 기준에 맞게 개선하고 전수 검수, 한국웹접근성인증마크(WA) 획득 달성",
      "스크린리더 사용자와 키보드 사용자를 고려한 시맨틱 마크업 구조로 전면 개선해 다양한 사용자 환경에서의 서비스 접근성 확보",
    ],
    techStack: ["HTML", "CSS"],
    thumbnail: "/images/work/sc/sc-01.png",
    mainImage: "/images/work/sc/sc-01.png",
    mainImageCaption:
      "SC제일은행 웹 접근성 개선 화면 — KWCAG 2.1 기준 시맨틱 마크업 적용",
    link: ["https://www.standardchartered.co.kr/np/kr/Intro.jsp"],
  },
  {
    id: "exp8",
    company: "중소기업중앙회 대고객 시스템 개편",
    period: "2023.06 ~ 2023.09",
    role: "화면 퍼블리싱 (기여도 50%)",
    achievements: [
      "개편 범위가 넓고 일정이 촉박한 상황에서 화면 구조를 체계적으로 분류하고 우선순위를 정해 117페이지 퍼블리싱 및 유지보수를 단독 완료",
      "모바일 사용자 비율 증가에 대응해 적응형 모바일 페이지를 설계, 디바이스별 최적화된 사용자 경험 제공",
      "중소기업중앙회, 노란우산, 노란우산 복지플러스-휴양시설 Mobile 총괄 퍼블리싱 담당 및 PC 퍼블리싱 서포트",
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kbiz/kbiz-01.png",
    mainImage: "/images/work/kbiz/kbiz-01.png",
    mainImageCaption:
      "4개 브랜드 사이트를 동시에 개편하는 대규모 프로젝트로, 잦은 수정이 필요하여 기획, 디자인, 개발 파트와 함께 애자일 방식으로 팀과 협업했습니다. 프로젝트 초기 세팅부터 참여해 구조를 익힐 수 있었으며, jQuery 기반 인터랙션과 Swiper.js를 활용한 캐러셀 컴포넌트를 구현했습니다.",
    subImages01: ["/images/work/kbiz/kbiz-02.png"],
    subCaption01: "디바이스별 최적화된 적응형 페이지를 구현하였습니다.",
    subImages02: ["/images/work/kbiz/kbiz-03.png"],
    subCaption02: "서브 페이지 상세 화면 — 정보 구조화 및 사용성 개선",
    link: [
      "https://www.kbiz.or.kr/ko/index/index.do",
      "https://www.8899.or.kr/yuma/index.do",
      "https://www.8899.or.kr/wlfr/index.do",
    ],
  },
];

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
