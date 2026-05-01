# KNH Web Portfolio

김나형의 Web Publisher / Frontend Developer 포트폴리오 프로젝트입니다.  
Next.js App Router 기반으로 제작되었고, 프로젝트 소개, 경력 상세, 인터랙션, 연락 기능까지 한 곳에 정리한 개인 포트폴리오 사이트입니다.

[포트폴리오 바로가기](https://knh-web-portfolio.vercel.app/)

## Overview

- Next.js 15 App Router 기반 포트폴리오 사이트
- 다크모드가 기본값인 UI
- GSAP ScrollTrigger와 `motion/react`를 활용한 인터랙션
- 경력 / 개인 프로젝트 상세 페이지 제공
- Contact 폼을 통한 메일 발송 API 연결

## Tech Stack

| Category   | Stack                                          |
| ---------- | ---------------------------------------------- |
| Framework  | Next.js 15, React 19                           |
| Language   | TypeScript                                     |
| Styling    | Tailwind CSS v4                                |
| Animation  | GSAP, ScrollTrigger, `motion/react`            |
| UI         | Base UI, shadcn-style primitives, Lucide React |
| Theme      | `next-themes`                                  |
| Form / API | Fetch API, Route Handler                       |
| Mail       | Resend API                                     |
| Quality    | ESLint                                         |
| Deploy     | Vercel                                         |

## Main Features

### Home

- `HeroSection`: 키워드 컨베이어 벨트, CTA 버튼, 인트로 모션
- `AboutSection`: 핵심역량 리스트, 프로필, 경력, 학력, 기술 스택
- `ProjectsSection`: 중앙 고정형 프로젝트 리스트와 카드 슬라이드
- `ContactSection`: 문의 폼, 토스트 팝업, 메일 발송

### Detail Pages

- `/work/[id]`: 실무 프로젝트 상세
- `/project/[id]`: 개인 프로젝트 상세
- 메인 이미지, 서브 이미지, 캐러셀, 링크, 기여도 정보 제공

### Interaction

- GSAP 기반 스크롤 진입 / 복귀 애니메이션
- 드래그 가능한 프로젝트 카드 슬라이드
- 이미지 라이트박스
- 헤더 표시/숨김 인터랙션

## Project Structure

```txt
src/
  app/
    _features/
      home/
        AboutSection.tsx
        ContactSection.tsx
        ConveyorBelt.tsx
        CoreValuesList.tsx
        HeroSection.tsx
        ProjectGrid.tsx
        ProjectsSection.tsx
        SliderCard.tsx
        useContactForm.ts
        useHeroAnimation.ts
    api/
      contact/
        route.ts
    project/[id]/page.tsx
    work/[id]/page.tsx
    globals.css
    layout.tsx
    loading.tsx
    page.tsx
  data/
    homeData.ts
    projectsData.ts
  shared/
    components/
      AnimatedPage.tsx
      Footer.tsx
      Header.tsx
      HistoryBackButton.tsx
      Main.tsx
      ThemeProvider.tsx
      ui/
        Badge.tsx
        Button.tsx
        Card.tsx
        ImageCarousel.tsx
        ProjectImage.tsx
    hooks/
      use-mobile.ts
    lib/
      contact.ts
      utils.ts

public/
  files/
  icons/
  images/
```

## Getting Started

```bash
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# lint 확인
npm run lint
```

## Environment Variables

Contact 메일 발송 기능을 사용하려면 `.env.local`에 아래 값을 설정해야 합니다.

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=hello@example.com
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
```

- `CONTACT_FROM_EMAIL`은 Resend에서 인증된 발신 주소여야 합니다.
- 설정이 없으면 Contact 폼 제출 시 서버에서 오류 응답을 반환합니다.

## Notes

- 기본 테마는 다크모드입니다.
- 파비콘은 `src/app/icon.svg`를 사용합니다.
- 프로젝트 데이터와 홈 섹션 데이터는 `src/data`에서 관리합니다.

## 📬 Contact

- **Email**: skgud9511@gmail.com
- **GitHub**: [github.com/na-hyeong9](https://github.com/na-hyeong9)

---

<div align="center">
  <sub>© 2026 김나형. All rights reserved.</sub>
</div>
