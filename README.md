# Boilerplate

Node.js API + React + Electron으로 구축된 현대적인 보일러플레이트 프로젝트입니다.

## 🚀 기능

- **현대적인 스택**: React 18, TypeScript, Vite
- **멀티 플랫폼**: 웹과 데스크톱(Electron) 동시 지원
- **API 통합**: Express.js 기반 RESTful API
- **상태 관리**: TanStack Query (React Query)
- **스타일링**: Tailwind CSS
- **테스팅**: Vitest + Testing Library
- **타입 안정성**: 전체 프로젝트 TypeScript 적용

## 📋 요구사항

- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

## 🛠️ 설치

```bash
# 저장소 클론
git clone <repository-url>
cd boilerplate

# 의존성 설치
pnpm install

# 환경 변수 설정 (선택사항)
cp env.example .env
```

## 🏃‍♂️ 실행

### 개발 환경

```bash
# 전체 개발 서버 시작 (API + Web + Electron)
pnpm dev

# 개별 서버 시작
pnpm dev:api      # API 서버만
pnpm dev:renderer # React 앱만
pnpm dev:electron # Electron 앱만
```

### 프로덕션 빌드

```bash
# 전체 빌드
pnpm build

# 개별 빌드
pnpm build:api      # API 빌드
pnpm build:renderer # React 앱 빌드
pnpm build:electron # Electron 앱 빌드
```

### Electron 앱 패키징

```bash
# 개발용 패키징
pnpm electron:pack

# 배포용 패키징
pnpm electron:dist
```

## 🧪 테스트

```bash
# 테스트 실행
pnpm test

# 테스트 UI
pnpm test:ui

# 타입 체크
pnpm type-check

# 린팅
pnpm lint
```

## 📁 프로젝트 구조

```
boilerplate/
├── src/
│   ├── api/                 # Express API 서버
│   │   ├── routes/         # API 라우트
│   │   ├── middleware/     # 미들웨어
│   │   └── server.ts       # 서버 진입점
│   ├── renderer/           # React 앱
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── services/       # API 서비스
│   │   └── main.tsx        # React 진입점
│   ├── electron/           # Electron 메인 프로세스
│   │   ├── main.ts         # Electron 메인
│   │   └── preload.ts      # Preload 스크립트
│   └── test/               # 테스트 유틸리티
├── dist/                   # 빌드 출력
├── packages/               # 공유 패키지
└── docs/                   # 문서
```

## 🔧 기술 스택

### 프론트엔드

- **React 19.1.1** - UI 라이브러리
- **TypeScript 5.9.2** - 타입 안전성
- **Vite 7.1.3** - 빌드 도구
- **React Router 7.8.2** - 라우팅
- **TanStack Query 5.85.5** - 서버 상태 관리
- **Tailwind CSS 4.1.12** - 스타일링

### 백엔드

- **Node.js** - JavaScript 런타임
- **Express 5.1.0** - 웹 프레임워크
- **CORS 2.8.5** - CORS 지원
- **Helmet 8.1.0** - 보안 헤더

### 데스크톱

- **Electron 37.3.1** - 크로스 플랫폼 데스크톱 앱

### 개발 도구

- **Vitest 3.2.4** - 테스트 프레임워크
- **Testing Library** - React 테스팅
- **ESLint** - 코드 품질
- **pnpm** - 패키지 매니저

## 📝 API 엔드포인트

### 작업 관리

- `GET /api/tasks` - 작업 목록 조회
- `POST /api/tasks` - 새 작업 생성
- `PUT /api/tasks/:id` - 작업 수정
- `DELETE /api/tasks/:id` - 작업 삭제

### 사용자 관리

- `GET /api/users` - 사용자 목록 조회
- `POST /api/users` - 새 사용자 생성
- `PUT /api/users/:id` - 사용자 정보 수정
- `DELETE /api/users/:id` - 사용자 삭제

### 기타

- `GET /health` - 서버 상태 확인

## 🌐 배포

### 웹 배포

빌드된 React 앱(`dist/renderer`)을 정적 호스팅 서비스에 업로드:

- Vercel
- Netlify
- GitHub Pages

### API 배포

빌드된 API 서버(`dist/api`)를 클라우드 서비스에 배포:

- Heroku
- Railway
- Vercel
- AWS/GCP/Azure

### 데스크톱 앱 배포

`pnpm electron:dist` 명령으로 생성된 설치 파일을 배포:

- macOS: `.dmg`, `.zip`
- Windows: `.exe`, 포터블
- Linux: `.AppImage`, `.deb`

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
