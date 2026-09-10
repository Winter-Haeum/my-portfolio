# 장미진 Portfolio

프로젝트와 기술, 경험을 한곳에서 볼 수 있도록 만든 개인 포트폴리오 웹사이트입니다.

---

## 🌱 프로젝트 소개

작업한 프로젝트와 학습 과정을 정리해 보여주기 위해 만든 개인 포트폴리오 사이트입니다.
소개, 여정, 프로젝트, 기술, 연락처를 한 페이지 흐름으로 구성했고 프로젝트 데이터는 Supabase에서 불러옵니다.
React와 Vite로 구현하고 GitHub Pages로 배포합니다.

---

## ✨ 주요 기능

- 한 페이지 흐름의 소개 화면 (Hero · About Me · Skills · Projects · Contact)
- 교사에서 개발자로 이어진 과정을 담은 Journey 타임라인
- 프로젝트 목록과 상세 페이지 (Supabase 데이터 기반)
- 방명록 (Contact 영역)
- 라이트 / 다크 모드
- 스크롤에 따른 등장 애니메이션
- 반응형 레이아웃

---

## 🛠 기술 스택

이 프로젝트에서 사용한 주요 기술입니다.

<img src="https://img.shields.io/badge/React-cfe8ff?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Vite-e6d6ff?style=flat-square&logo=vite&logoColor=black"/> <img src="https://img.shields.io/badge/MUI-bcd8ff?style=flat-square&logo=mui&logoColor=black"/> <img src="https://img.shields.io/badge/React%20Router-ffd8cc?style=flat-square&logo=reactrouter&logoColor=black"/> <img src="https://img.shields.io/badge/Supabase-cfeccf?style=flat-square&logo=supabase&logoColor=black"/>

- React · Vite · React Router
- MUI · Emotion
- Supabase (프로젝트 데이터 · 방명록)
- 배포: GitHub Actions → GitHub Pages

---

## 🎯 구현 및 경험

- 프로젝트 정보를 코드에 고정하지 않고 Supabase 테이블에서 불러와 목록·상세를 렌더링
- 소개 → 여정 → 프로젝트 → 기술 → 연락처로 이어지는 정보 흐름을 먼저 정리하고 화면을 구성
- 프로젝트 상세를 `/projects/:slug` 라우트로 분리하고 목록에서 데이터를 전달
- 라이트/다크 모드와 스크롤 애니메이션을 컴포넌트 단위로 분리
- GitHub Pages 배포 경로(`/my-portfolio`)에 맞춰 라우터 basename 설정

---

## 🚀 실행 / 배포

```bash
npm install
npm run dev
npm run build
```

환경 변수는 `.env` 에 설정합니다.

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
```

`main` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages로 배포합니다.

---

## 🔗 Links

- GitHub: https://github.com/Winter-Haeum/my-portfolio
- Live: https://winter-haeum.github.io/my-portfolio/
