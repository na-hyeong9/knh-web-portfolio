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

// 개인 프로젝트
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Next.js와 TypeScript로 개발한 웹 포트폴리오",
    description: "나의 포트폴리오 사이트 제작 프로젝트",
    period: "2026.04~",
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
            body: "motion의 animate API로 키워드 배열을 4세트 연속 배치한 뒤 x: 0% → -50% 무한 루프를 구현했습니다. 절반만 이동하면 시작점과 동일한 화면이 되기 때문에 이음매 없이 자연스럽게 반복됩니다.",
          },
          {
            heading: "GSAP ScrollTrigger 섹션 등장 애니메이션",
            body: "About·Projects·Contact 전 섹션에 걸쳐 ScrollTrigger reveal 수치를 duration 0.8s / y 40 / stagger 0.14s / ease power3.out으로 통일해 일관된 속도감을 유지했습니다. Projects 섹션은 gsap.matchMedia로 데스크톱에서만 콘텐츠를 pin 고정해 스크롤로 카드를 탐색하도록 구성하고, 배경 워터마크 텍스트는 scrub으로 스크롤 진행에 따라 fade-in·out 되도록 처리했습니다.",
          },
          {
            heading: "마이크로 인터랙션",
            body: '히어로 버튼에 whileHover scale, 스크롤 유도 버튼과 프로젝트 슬라이더 인디케이터에 무한 bounce를 적용했습니다. 프로젝트 카드는 spring(stiffness 220 / damping 28)으로 x·scale·opacity·zIndex를 동시에 전환하며, drag="x" 제스처로 스와이프 탐색도 지원합니다. 페이지 전환·라이트박스·토스트 알림은 AnimatePresence로 마운트·언마운트 시 자연스러운 등장·퇴장 효과를 구현했습니다.',
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
    title: "한국도로공사 중소기업기술마켓 마켓 정식플랫폼 구축 사업",
    company: "시아나",
    period: "2025.07 ~ 2025.11",
    role: "화면 퍼블리싱",
    contribution: "50%",
    achievements: [
      {
        keyword: "협업 기반 사전 정립",
        description:
          "퍼블리싱 전용 브랜치를 분리하고 커밋 메시지 규칙을 사전에 정립해 팀 협업 기반 마련",
      },
      {
        keyword: "CSS 네이밍 컨벤션 구축",
        description:
          "CSS 클래스 네이밍 컨벤션을 구축해 스타일 충돌을 방지하고 유지보수성 확보",
      },
      {
        keyword: "공통 컴포넌트 설계",
        description:
          "공통 UI 컴포넌트를 설계·모듈화해 화면 전반의 재사용성 확보 및 가이드 구축",
      },
      {
        keyword: "반응형 108페이지 퍼블리싱",
        description:
          "반응형 기준(모바일, 태블릿, 웹)을 사전 정의한 뒤 PC·모바일 총 108페이지 화면을 퍼블리싱",
      },
      {
        keyword: "코드 스타일 통일 기여",
        description: "Notion 공유로 팀 코드 스타일 통일에 기여",
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
    company: "시아나",
    period: "2025.04 ~ 2025.06",
    role: "화면 퍼블리싱",
    contribution: "80%",
    achievements: [
      {
        keyword: "IBChart 그러데이션 구현",
        description:
          "IBChart가 미지원하는 그러데이션 스타일을 SVG linearGradient 직접 주입 방식으로 구현하고, 리렌더링 시 커스텀 스타일이 초기화되는 문제를 resize 이벤트 재주입 로직으로 해결",
      },
      {
        keyword: "대용량 그리드 커스터마이징",
        description:
          "IBSheet 기반 대용량 그리드 UI를 디자인 가이드에 맞게 커스터마이징",
      },
      {
        keyword: "디렉토리 운영 정의",
        description: "공통 UI 컴포넌트 기반 디렉토리 구조 설계",
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
    subCaption01: "재사용 UI 모듈 15종 구현",
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
    company: "시아나",
    period: "2025.01 ~ 2025.03",
    role: "컴포넌트 설계",
    contribution: "100%",
    achievements: [
      {
        keyword: "React 공통 컴포넌트 15종",
        description: "React 공통 UI 컴포넌트 15종을 설계·구현",
      },
    ],
    techStack: ["React", "CSS", "Git"],
    thumbnail: "/images/work/uj/uj-01.png",
    mainImage: "/images/work/uj/uj-01.png",
    mainImageCaption: "클라우드 네이티브 행정 시스템 메인 화면",
  },
  {
    id: "exp9",
    title: "현대건설 그로잉투게더 숏폼 콘텐츠",
    company: "시아나",
    period: "2024.12 ~ 2025.01",
    role: "화면 퍼블리싱",
    contribution: "100%",
    achievements: [
      {
        keyword: "숏폼 UI 디자인 제작",
        description:
          "유튜브·네이버 숏폼을 벤치마킹한 뒤 피그마로 UI 디자인을 직접 제작해 콘텐츠 화면을 설계",
      },
      {
        keyword: "노출 비율 기반 자동재생 제어",
        description:
          "getBoundingClientRect()로 영상의 뷰포트 노출 비율을 계산해 50% 노출 시 음소거 자동재생, 100% 노출 시 소리 재생되도록 제어",
      },
      {
        keyword: "영상 재생 제어 구현",
        description: "video.js를 활용해 영상 재생·정지·음소거 제어 기능을 구현",
      },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Git"],
    thumbnail: "/images/work/growing/growing-00.png",
    mainImage: "/images/work/growing/growing-01.gif",
    mainImageCaption: "숏폼 기능 구현 화면",
    subImages01: ["/images/work/growing/growing-02.gif"],
    subCaption01: "웹, 태블릿, 모바일 반응형 사이트",
    link: ["/demos/growing-together-shorts.html"],
  },
  {
    id: "exp4",
    title: "현대건설 고객센터 시스템 구축",
    company: "시아나",
    period: "2024.07 ~ 2024.12",
    role: "화면 퍼블리싱",
    contribution: "50%",
    achievements: [
      {
        keyword: "개발 기간 20% 단축",
        description:
          "UI 컴포넌트 모듈화로 반복 마크업을 줄여 개발 기간 약 20% 단축에 기여",
      },
      {
        keyword: "60페이지 화면 구현",
        description: "대시보드 및 팝업 총 60페이지 화면 구현",
      },
    ],
    techStack: ["Vue.js", "SCSS", "Git"],
    thumbnail: "/images/work/hicc/hicc-01.png",
    mainImage: "/images/work/hicc/hicc-01.png",
    mainImageCaption: "Vue.js 반응형 레이아웃 고객센터 메인 화면",
  },
  {
    id: "exp5",
    title: "중소기업중앙회 통합경영정보시스템 (K-ERP) 기능 고도화",
    company: "시아나",
    period: "2024.05 ~ 2024.06",
    role: "화면 퍼블리싱",
    contribution: "100%",
    achievements: [
      {
        keyword: "신규 기능 UI 적용",
        description:
          "기존 시스템을 분석한 뒤 신규 기능 UI를 기존 화면과 일관되게 적용",
      },
    ],
    techStack: ["HTML", "CSS", "jQuery", "Git"],
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
  //   company: "시아나",
  //   period: "2024.04 ~ 2024.05",
  //   role: "화면 퍼블리싱",
  //   contribution: "100%",
  //   achievements: [
  //     {
  //       keyword: "화면 이관 및 요구사항 반영",
  //       description:
  //         "기존 화면 마크업을 신규 시스템 환경에 맞게 이관하며 고객사 수정 요구사항을 함께 반영, 화면 간 구조·스타일 일관성 유지",
  //     },
  //   ],
  //   techStack: ["HTML", "CSS", "Git"],
  //   thumbnail: "",
  //   mainImage: "",
  // },
  {
    id: "exp7",
    title: "SC제일은행 웹 접근성 향상 프로젝트",
    company: "시아나",
    period: "2023.10 ~ 2024.02",
    role: "화면 퍼블리싱",
    contribution: "30%",
    achievements: [
      {
        keyword: "접근성 전수 검수 (약 400페이지)",
        description:
          "기존 화면 약 400페이지에 대해 KWCAG 2.1 기준 준수 여부를 검수(대체텍스트·시맨틱 태그·키보드 접근성 등 항목별 점검)",
      },
      {
        keyword: "담당 화면 마크업 개선",
        description: "검수 결과를 바탕으로 담당 화면 마크업 개선 작업 수행",
      },
      {
        keyword: "WA 인증 획득 기여",
        description:
          "팀 단위 개선 작업 결과 한국웹접근성인증마크(WA) 획득에 기여",
      },
    ],
    techStack: ["HTML", "CSS", "Git"],
    thumbnail: "/images/work/sc/sc-01.png",
    mainImage: "/images/work/sc/sc-01.png",
    mainImageCaption: "웹 접근성 개선 화면 KWCAG 2.1 기준 시맨틱 마크업 적용",
    link: ["https://www.standardchartered.co.kr/np/kr/Intro.jsp"],
  },
  {
    id: "exp8",
    title: "중소기업중앙회 대고객 시스템 개편",
    company: "시아나",
    period: "2023.06 ~ 2023.09",
    role: "화면 퍼블리싱",
    contribution: "50%",
    achievements: [
      {
        keyword: "모바일 파트 전담",
        description:
          "전체 프로젝트(PC/모바일) 중 모바일 파트(117페이지) 화면 퍼블리싱 및 유지보수 전담",
      },
      {
        keyword: "모바일 전 영역 단독 담당",
        description:
          "도메인별 역할 분담 구조에서 모바일 전 영역을 단독으로 담당하여 효율적 일정 운용에 기여",
      },
    ],
    techStack: ["HTML", "CSS", "jQuery", "Git"],
    thumbnail: "/images/work/kbiz/kbiz-01.png",
    mainImage: "/images/work/kbiz/kbiz-01.png",
    mainImageCaption:
      "4개 브랜드 사이트를 동시에 개편하는 대규모 프로젝트로 기획, 디자인, 개발 파트와 함께 애자일 방식으로 팀과 협업했습니다. 프로젝트 초기 세팅부터 참여해 구조를 익힐 수 있었으며, jQuery 기반 인터랙션과 Swiper.js를 활용한 캐러셀 컴포넌트를 구현했습니다.",
    subImages01: ["/images/work/kbiz/kbiz-02.png"],
    subCaption01: "디바이스별 최적화된 적응형 페이지",
    link: [
      "https://www.kbiz.or.kr/ko/index/index.do",
      "https://www.8899.or.kr/yuma/index.do",
      "https://www.8899.or.kr/wlfr/index.do",
    ],
  },
];
