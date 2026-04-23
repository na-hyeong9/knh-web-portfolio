# KNH Web Portfolio

> Web Publisher / Frontend Developer 김나형의 포트폴리오 사이트입니다.

**🔗 [포트폴리오 바로가기](https://knh-web-portfolio.vercel.app/)**

---

## 📌 소개

공공기관 · 금융권 SI 프로젝트 경험을 바탕으로,  
접근성과 반응형 구현에 강점을 가진 Web Publisher / Frontend Developer의 포트폴리오입니다.

경력 기술서, 프로젝트 갤러리, 기술 스택을 한 곳에서 확인할 수 있습니다.

---

## 🛠 Tech Stack

| 분류        | 기술                                        |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 15 (App Router) / React 19          |
| Language    | TypeScript                                  |
| Styling     | Tailwind CSS v4                             |
| Animation   | GSAP + ScrollTrigger, motion/react          |
| UI          | Shadcn UI, Radix Base UI, Lucide React      |
| Font        | Pretendard                                  |
| Theme       | next-themes (다크모드 / 라이트모드)         |
| Lint        | ESLint                                      |
| 배포        | Vercel                                      |

---

## 📁 폴더 구조

```
knh-portfolio/
├── public/                        # 정적 에셋 (이미지, 폰트, PDF 등)
│   └── images/
│       ├── common/                # 프로필 이미지
│       ├── project/               # 개인 프로젝트 이미지
│       └── work/                  # SI 프로젝트 이미지
├── src/
│   ├── app/
│   │   ├── _features/
│   │   │   └── home/              # 홈 페이지 섹션 컴포넌트
│   │   │       ├── HeroSection.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       ├── ContactSection.tsx
│   │   │       ├── BentoCard.tsx
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── ProjectGrid.tsx
│   │   │       └── ConveyorBelt.tsx
│   │   ├── project/[id]/
│   │   │   └── page.tsx           # 개인 프로젝트 상세 페이지
│   │   ├── work/[id]/
│   │   │   └── page.tsx           # SI 프로젝트 상세 페이지
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── data/
│   │   ├── projectsData.ts        # 프로젝트 · 경력 · 학력 정적 데이터
│   │   └── homeData.ts            # 스킬 · 핵심역량 · 프로필 · 연락처 데이터
│   └── shared/
│       ├── components/
│       │   ├── Main.tsx           # 공통 레이아웃
│       │   └── ui/                # 공용 UI 컴포넌트
│       │       ├── Button.tsx
│       │       ├── Badge.tsx
│       │       ├── Card.tsx
│       │       ├── Accordion.tsx
│       │       ├── ProjectImage.tsx   # 라이트박스 포함 이미지
│       │       └── ImageCarousel.tsx  # 멀티 이미지 캐러셀
│       ├── hooks/                 # 커스텀 훅
│       └── lib/
│           └── utils.ts           # cn() 유틸
```

---

## 📄 페이지 구성

### `/` — 싱글 페이지

섹션 단위로 구성된 원페이지 포트폴리오입니다.

| 섹션          | 내용                                                                                 |
| ------------- | ------------------------------------------------------------------------------------ |
| **Hero**      | 컨베이어 벨트 키워드 타이핑 모션, 이력서 다운로드 / 연락하기 버튼                   |
| **About**     | 핵심역량 수평 아코디언 카드, 프로필 정보, Experience · Education 타임라인, 기술 스택 |
| **Work**      | SI 프로젝트 BentoCard 갤러리, 기여도 · 기술 스택 · 성과 표시                        |
| **Project**   | 개인 프로젝트 카드 갤러리, GitHub / 데모 링크                                        |
| **Contact**   | 연락처 정보 및 링크 모음                                                             |

### `/work/[id]` — SI 프로젝트 상세

- 주요 성과 목록
- 메인 이미지 (라이트박스 지원)
- 서브 이미지 슬롯 2개 (단일: 일반 이미지 / 복수: 캐러셀)
- 관련 링크 (배포 URL 등)

### `/project/[id]` — 개인 프로젝트 상세

- 기간 · 기여도 · 기술 스택 · GitHub / 데모 링크
- 메인 이미지 (라이트박스 지원)
- 서브 이미지 슬롯 2개 (단일: 일반 이미지 / 복수: 캐러셀)

---

## ✨ 주요 기능 & 인터랙션

- **다크모드 / 라이트모드** — next-themes 기반 토글
- **GSAP ScrollTrigger** — 섹션 진입 시 스크롤 애니메이션 (`fromTo` + `immediateRender: false` 로 빠른 스크롤 대응)
- **핵심역량 수평 아코디언** — hover 시 1 : 5 : 1 비율로 카드 확장, 세로 제목 → 가로 제목 + 설명 전환
- **이미지 라이트박스** — `createPortal` 기반, 1280px 너비 확대 보기, 스크롤 잠금
- **이미지 캐러셀** — 서브 이미지 복수 시 화살표 + 닷 네비게이션 자동 전환
- **BentoCard hover** — brightness 필터로 자연스러운 어두워짐 효과
- **배경 orb 애니메이션** — CSS `@keyframes` + `will-change: transform` (GPU 컴포지터, TBT 영향 없음)
- **반응형** — 모바일 / 태블릿 / 데스크톱 대응

---

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# lint 확인
npm run lint
```

`http://localhost:3000` 에서 확인할 수 있습니다.

---

## 📬 Contact

- **Email**: skgud9511@gmail.com
- **GitHub**: [github.com/na-hyeong9](https://github.com/na-hyeong9)

---

<div align="center">
  <sub>© 2026 김나형. All rights reserved.</sub>
</div>
