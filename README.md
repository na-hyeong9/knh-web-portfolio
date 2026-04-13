# KNH Web-Portfolio 기획안

> Web Publisher / Frontend Developer 김나형의 포트폴리오 사이트입니다.

**🔗 [포트폴리오 바로가기](https://na-hyeong9.github.io)**



## 📌 소개

공공기관 및 금융권 SI 프로젝트 경험을 바탕으로,  
접근성과 반응형 구현에 강점을 가진 Web Publisher / Frontend Developer의 포트폴리오입니다.

경력 기술서, 프로젝트 갤러리, 기술 스택을 한 곳에서 확인할 수 있습니다.



## 🛠 Tech Stack

| 분류      | 기술                    |
| --------- | ----------------------- |
| Framework | Next.js / React         |
| Styling   | Tailwind CSS, Shadcn UI |
| Font      | Pretendard              |
| 상태 관리 | Zustand                 |
| Lint      | ESLint                  |
| 배포      | Vercel                  |



## 📁 폴더 구조

```
web-portfolio/
├── public/                   # 정적 에셋 (이미지, 폰트 등)
├── src/
│   ├── app/
│   │   ├── [pageName]/       # 페이지별 라우트
│   │   │   ├── _features/
│   │   │   │   ├── ui/       # 페이지 전용 컴포넌트
│   │   │   │   └── lib/      # 페이지 전용 에셋
│   │   │   └── page.tsx
│   │   ├── layout.tsx        # 전역 레이아웃 (헤더, 푸터)
│   │   └── page.tsx          # 메인 홈페이지
│   ├── shared/
│   │   ├── components/       # 공통 UI 컴포넌트
│   │   └── lib/              # 공통 유틸 함수 (utils.ts 등)
│   └── data/                 # 정적 데이터 (projectsData.ts 등)
```



## 📄 페이지 구성

### `/` Home

- 메인 나를 상징하는 키워드 타이핑 모션: 'Team·work협력(팀워크) 정신, 협동심.', 'Creative 창의적인', 'Growing 성장하는'.
- 경력기술서 바로가기 / 포트폴리오 PDF 다운로드 / 연락하기 버튼

### `/about` About

- 프로필 이미지 및 기본 정보 (이름, 생년월일, 연락처)
- Experience / Education 연혁 (최신순, 슬라이드 다운 상세 보기)
- 기술 스택 이미지 리스트

### `/work` Work

- 회사/소속 단위 경력 및 핵심 성과
- 아코디언 형식 (클릭 시 상세 업무 슬라이드 다운)
- 사용 기술 스택 배지 표시
- 상세 페이지 `/work/[slug]` 라우팅

### `/project` Project

- 작업 산출물 갤러리 (Grid 레이아웃)
- 프로젝트명 / 진행 기간 / 기여도 / 사용 기술 카드 표시
- GitHub 링크 및 상세 보기 아이콘
- 상세 페이지 `/project/[slug]` 라우팅



## ✨ 디자인 & 인터랙션

- **컬러**: Background `#FFFFFF` / Main `#0071E3`
- **스타일**: 토스 스타일 미니멀 디자인
- **다크모드 / 라이트모드** 지원
- 커서 지나간 자리에 컬러풀한 흔적이 서서히 사라지는 커스텀 커서
- 카드 호버 시 부드러운 shadow + 위로 떠오르는 효과 (y축 이동)
- 썸네일 이미지 호버 시 scale 확대 (overflow-hidden 처리)
- 바로가기 버튼 호버 시 `➔` 아이콘 밀림 애니메이션
- 부드러운 스크롤



## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.



## 📬 Contact

- **Email**: [devkimna@gmail.com]
- **GitHub**: [https://github.com/na-hyeong9]



<div align="center">
  <sub>© 2026 김나형. All rights reserved.</sub>
</div>
