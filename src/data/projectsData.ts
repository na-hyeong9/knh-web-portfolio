export interface OverviewItem {
  heading: string;
  body: string;
}

export interface OverviewSection {
  id: string;
  title: string;
  items: OverviewItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  role: string;
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
  overviewSections?: OverviewSection[];
}

export interface Achievement {
  keyword: string;
  description: string;
}

export interface Work {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  contribution: string;
  achievements: Achievement[];
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

// 개인 프로젝트
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Next.js와 TypeScript로 개발한 웹 포트폴리오",
    description: "나의 포트폴리오 사이트 제작 프로젝트",
    period: "2024.04~",
    role: "기획 · 디자인 · 프론트엔드 개발",
    contribution: "100%",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    thumbnail: "/images/project/portfolio/main.png",
    mainImage: "/images/project/portfolio/main.gif",
    mainImageCaption:
      "framer-motion으로 컨베이어 벨트로 스타일링한 메인 화면 입니다. 다크모드를 지원하고 반응형을 대응합니다.",
    subImages01: ["/images/project/portfolio/scrollMotion.gif"],
    subCaption01:
      "GSAP 스크롤 애니메이션을 이용하여 페이지에 부드러운 전환 효과를 주었습니다.",
    githubUrl: "https://github.com/na-hyeong9/knh-web-portfolio",
    demoUrl: "https://knh-web-portfolio.vercel.app/",
    category: "project",
    details: "This project focuses on clean UI/UX and smooth interactions.",
    screenshots: [],
    overviewSections: [
      {
        id: "interaction",
        title: "Framer Motion & GSAP 인터랙션",
        items: [
          {
            heading: "컨베이어 벨트 히어로 슬라이드",
            body: "Framer Motion의 animate API와 CSS transform을 조합해 기술 스택 아이템이 끊김 없이 좌우로 흐르는 무한 루프 슬라이드를 구현했습니다. 두 세트를 연속 배치해 이음매가 보이지 않도록 처리했습니다.",
          },
          {
            heading: "GSAP ScrollTrigger 섹션 등장 애니메이션",
            body: "각 섹션 진입 시점에 GSAP ScrollTrigger를 사용해 요소가 아래에서 위로 fade-in 되도록 구성했습니다. 핵심역량 카드는 stagger 옵션으로 순차 등장 효과를 주어 시선 흐름을 자연스럽게 유도했습니다.",
          },
          {
            heading: "마이크로 인터랙션",
            body: "프로젝트 카드 hover 시 Framer Motion whileHover로 scale 전환을 적용하고, 아코디언 카드는 flex 너비를 애니메이션해 콘텐츠가 자연스럽게 펼쳐지도록 구현했습니다. 스크롤 버튼에는 무한 bouncing 효과를 추가해 액션 유도를 강화했습니다.",
          },
        ],
      },
      {
        id: "seo",
        title: "SEO 최적화",
        items: [
          {
            heading: "Next.js Metadata API",
            body: "App Router의 정적 metadata 객체로 title, description을 선언해 빌드 타임에 메타 태그가 HTML에 포함되도록 했습니다. 검색 엔진이 JavaScript 실행 없이도 페이지 정보를 읽을 수 있어 인덱싱 품질이 향상됩니다.",
          },
          {
            heading: "시맨틱 HTML 구조",
            body: "header, main, section, aside, nav 등 의미 있는 태그를 사용해 문서 계층을 명확히 했습니다. heading 레벨(h1 → h2 → h3)을 문서 구조에 맞게 유지해 스크린리더와 크롤러 모두에서 콘텐츠 구조가 올바르게 해석되도록 했습니다.",
          },
          {
            heading: "next/image를 통한 LCP 개선",
            body: "모든 이미지에 next/image를 적용해 자동 WebP 변환, lazy loading, 적절한 sizes 속성을 통한 반응형 소스 제공으로 Largest Contentful Paint(LCP) 지표를 개선했습니다.",
          },
        ],
      },
      {
        id: "tailwind",
        title: "Tailwind CSS 활용",
        items: [
          {
            heading: "디자인 토큰 기반 테마 관리",
            body: "globals.css의 @theme 블록에서 색상, 폰트, 간격을 CSS 변수로 선언하고 Tailwind 유틸리티와 연결했습니다. 라이트/다크 양쪽에서 일관된 디자인을 유지하면서 단일 소스에서 전역 스타일을 제어할 수 있습니다.",
          },
          {
            heading: "다크모드 대응",
            body: "dark: 변형자를 활용해 모든 컴포넌트에서 라이트/다크 전환을 선언적으로 처리했습니다. ThemeProvider로 시스템 설정을 감지해 초기 flicker 없이 테마가 적용됩니다.",
          },
          {
            heading: "반응형 모바일 퍼스트 레이아웃",
            body: "sm, md, lg 브레이크포인트를 기준으로 모바일 퍼스트 방식으로 레이아웃을 구성했습니다. 그리드 컬럼, 패딩, 폰트 크기를 뷰포트별로 세분화해 다양한 디바이스에서 일관된 사용자 경험을 제공합니다.",
          },
        ],
      },
    ],
  },
];

// SI 프로젝트
export const workData: Work[] = [
  {
    id: "exp1",
    title: "중소기업기술마켓 정식플랫폼 구축 사업",
    company: "중소기업기술마켓",
    period: "2025.07 ~ 2025.11",
    role: "화면 퍼블리싱",
    contribution: "80%",
    achievements: [
      {
        keyword: "협업 기반 마련",
        description:
          "버전관리 체계가 없던 초기 환경에서 GitHub 브랜치 전략과 퍼블리싱 환경을 직접 수립해 팀 전체의 협업 기반을 마련",
      },
      {
        keyword: "공통 컴포넌트 모듈화",
        description:
          "반복되는 UI 패턴을 분석해 공통 컴포넌트로 모듈화하고, 화면 전반의 재사용성을 확보해 작업 효율 향상에 기여",
      },
      {
        keyword: "반응형 퍼블리싱",
        description:
          "PC·모바일 멀티 디바이스 환경을 고려한 반응형 퍼블리싱을 적용해 다양한 사용자 환경에서의 일관된 UI 제공",
      },
      {
        keyword: "108본 납기 완료",
        description: "위 기반 위에서 총 108본 이상의 화면을 기한 내 완료",
      },
    ],
    techStack: ["HTML", "CSS", "jQuery", "Git"],
    thumbnail: "/images/work/techmk/tech-01.png",
    mainImage: "/images/work/techmk/tech-01.png",
    mainImageCaption: "메인 화면 ",
    subImages01: [
      "/images/work/techmk/tech-02.png",
      "/images/work/techmk/tech-03.png",
    ],
    subCaption01: "반응형 레이아웃 적용",
    link: ["https://www.techmarket.kr/"],
  },
  {
    id: "exp2",
    title: "현대건설 원전 사업관리 시스템 구축",
    company: "현대건설",
    period: "2025.04 ~ 2025.06",
    role: "화면 퍼블리싱",
    contribution: "80%",
    achievements: [
      {
        keyword: "버전 관리 체계 구축",
        description:
          "GitHub 기반 버전 관리 체계를 전담 구축하고 퍼블리싱 환경 초기 세팅을 완료해 팀 전체의 협업 및 배포 흐름 확립",
      },
      {
        keyword: "대시보드 공통 레이아웃 설계",
        description:
          "시스템 내 반복되는 패널·위젯 레이아웃을 분석해 공통 구조로 통일, 대시보드 화면 전반의 일관성 확보 및 신규 화면 구현 효율 향상",
      },
      {
        keyword: "대용량 UI 구현 및 성능 최적화",
        description:
          "IBSheet·IBChart 기반 대용량 그리드·차트 UI를 구현하고 렌더링 성능을 최적화해 데이터 집약적 화면의 안정적인 동작 확보",
      },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Git"],
    thumbnail: "/images/work/nova/nova-01.png",
    mainImage: "/images/work/nova/nova-01.png",
    mainImageCaption: "원전 사업 현황 대시보드",
    subImages01: [
      "/images/work/nova/nova-02-00.png",
      "/images/work/nova/nova-02-01.png",
      "/images/work/nova/nova-02-02.png",
      "/images/work/nova/nova-02-03.png",
      "/images/work/nova/nova-02-04.png",
    ],
    subCaption01: "공통 컴포넌트 라이브러리 — 재사용 UI 모듈 15종 구현",
    subImages02: [
      "/images/work/nova/nova-03-01.png",
      "/images/work/nova/nova-03-02.png",
      "/images/work/nova/nova-03-03.png",
      "/images/work/nova/nova-03-04.png",
    ],
    subCaption02:
      "반복되는 인터페이스를 공통구조로 설계하여 개발 기간 20% 단축 ",
  },
  {
    id: "exp3",
    title: "울주군청 클라우드 네이티브 시스템",
    company: "울주군청",
    period: "2025.03 ~ 2025.04",
    role: "화면 퍼블리싱",
    contribution: "100%",
    achievements: [
      {
        keyword: "공통 컴포넌트 설계",
        description:
          "화면마다 중복 구현되던 그리드/테이블, 탭, 드롭다운 셀렉트, 통계 카드, 지도 마커/팝업, 바로가기 버튼 패널, 뉴스 리스트 등 15종을 직접 설계·구현, 전체 화면 재사용률 약 70% 달성",
      },
    ],
    techStack: ["React", "Git"],
    thumbnail: "/images/work/uj/uj-01.png",
    mainImage: "/images/work/uj/uj-01.png",
    mainImageCaption:
      "클라우드 네이티브 행정 시스템 메인 화면 — 통합 업무 포털",
  },
  {
    id: "exp4",
    title: "현대건설 고객센터 시스템 구축",
    company: "현대건설",
    period: "2024.07 ~ 2024.12",
    role: "화면 퍼블리싱",
    contribution: "50%",
    achievements: [
      {
        keyword: "스타일 가이드 표준화",
        description:
          "반복되는 UI 패턴을 분석해 공통 컴포넌트로 추출하고 SCSS 스타일 가이드를 표준화해 팀 전체 코드 일관성 확보 및 개발 기간 약 20% 단축에 기여",
      },
      {
        keyword: "코드 리뷰 비용 절감",
        description:
          "스타일 가이드가 없어 팀원마다 코드 스타일이 달랐던 문제를 해결하기 위해 SCSS/SASS 기반 표준 가이드를 수립, 코드 리뷰 비용 절감",
      },
      {
        keyword: "60본 납기 완료",
        description:
          "대시보드를 포함한 복잡한 화면 구조를 분석하고 컴포넌트 단위로 분리해 총 60본의 화면을 기한 내 완료",
      },
    ],
    techStack: ["Vue.js", "SCSS", "Git"],
    thumbnail: "/images/work/hicc/hicc-01.png",
    mainImage: "/images/work/hicc/hicc-01.png",
    mainImageCaption: "Vue.js 반응형 레이아웃 고객센터 메인 화면",
    subImages01: [
      "/images/work/hicc/hicc-02-00.png",
      "/images/work/hicc/hicc-02-01.png",
      "/images/work/hicc/hicc-02-02.png",
      "/images/work/hicc/hicc-02-03.png",
    ],
    subCaption01: "SCSS 스타일 가이드 기반 공통 컴포넌트",
  },
  {
    id: "exp5",
    title: "중소기업중앙회 통합경영정보시스템 (K-ERP) 기능 고도화",
    company: "중소기업중앙회",
    period: "2024.05 ~ 2024.06",
    role: "화면 퍼블리싱",
    contribution: "100%",
    achievements: [
      {
        keyword: "멀티 디바이스 접근성 확보",
        description:
          "기존 시스템의 UI 구조를 분석해 신규 기능과의 일관성을 유지하면서 적응형 웹·모바일 퍼블리싱을 100% 단독 담당, 멀티 디바이스 접근성 확보",
      },
      {
        keyword: "레거시 스타일 통합",
        description:
          "레거시 K-ERP 시스템의 마크업·스타일 패턴을 분석해 신규 컴포넌트를 설계·구현하고 기존 화면에 통합, 기존 UI와의 이질감 없이 기능 고도화 완료",
      },
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kerp/kbiz-01.png",
    mainImage: "/images/work/kerp/kbiz-01.png",
    mainImageCaption: "K-ERP 통합경영정보 시스템 메인 화면",
    subImages01: [
      "/images/work/kerp/kbiz-02.png",
      "/images/work/kerp/kbiz-03.png",
    ],
    subCaption01: "모바일 적응형 화면",
  },
  // {
  //   id: "exp6",
  //   title: "중소기업중앙회 유공자포상 시스템 이관",
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
    title: "SC제일은행 웹 접근성 향상 프로젝트",
    company: "SC제일은행",
    period: "2023.10 ~ 2024.02",
    role: "화면 퍼블리싱",
    contribution: "30%",
    achievements: [
      {
        keyword: "웹 접근성 인증 획득",
        description:
          "접근성 기준을 충족하지 못했던 금융 서비스의 마크업 전반을 KWCAG 2.1 기준에 맞게 개선하고 전수 검수, 한국웹접근성인증마크(WA) 획득 달성",
      },
      {
        keyword: "시맨틱 마크업 개선",
        description:
          "폼 레이블 연결 및 placeholder 단독 사용 제거, 키보드 핸들러(Enter/Space) 적용, 모달 포커스 트랩·열림/닫힘 포커스 이동·aria-modal 처리, 장식 이미지 alt 비움 및 아이콘 버튼 aria-label 부여를 통해 스크린리더·키보드 사용자 환경의 서비스 접근성 확보",
      },
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
    title: "중소기업중앙회 대고객 시스템 개편",
    company: "중소기업중앙회",
    period: "2023.06 ~ 2023.09",
    role: "화면 퍼블리싱",
    contribution: "50%",
    achievements: [
      {
        keyword: "117페이지 단독 완료",
        description:
          "개편 범위가 넓고 일정이 촉박한 상황에서 화면 구조를 체계적으로 분류하고 우선순위를 정해 117페이지 퍼블리싱 완료",
      },
      {
        keyword: "모바일 적응형 설계",
        description:
          "모바일 사용자 비율 증가에 대응해 적응형 모바일 페이지를 설계, 디바이스별 최적화된 사용자 경험 제공",
      },
      {
        keyword: "4개 브랜드 총괄",
        description:
          "중소기업중앙회, 노란우산, 노란우산 복지플러스(휴양시설) Mobile 총괄 퍼블리싱 담당 및 PC 퍼블리싱 서포트",
      },
    ],
    techStack: ["HTML", "CSS", "jQuery"],
    thumbnail: "/images/work/kbiz/kbiz-01.png",
    mainImage: "/images/work/kbiz/kbiz-01.png",
    mainImageCaption:
      "4개 브랜드 사이트를 동시에 개편하는 대규모 프로젝트로 기획, 디자인, 개발 파트와 함께 애자일 방식으로 팀과 협업했습니다. 프로젝트 초기 세팅부터 참여해 구조를 익힐 수 있었으며, jQuery 기반 인터랙션과 Swiper.js를 활용한 캐러셀 컴포넌트를 구현했습니다.",
    subImages01: ["/images/work/kbiz/kbiz-02.png"],
    subCaption01:
      "디바이스별 최적화된 적응형 페이지 하드코딩하여 구현하였습니다.",
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
