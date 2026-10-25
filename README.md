# 구글 워크스페이스 & Apps Script 인터랙티브 실습 가이드 북

구글 드라이브(Drive), 문서(Docs), 설문지(Forms), 스프레드시트(Sheets), 그리고 Apps Script 업무 자동화까지 단계별로 직접 따라 하며 배울 수 있는 실습 가이드북 웹 애플리케이션입니다.

---

## 🌟 주요 특징

- **쉬운 한글 용어 적용**: 파이프라인, 거버넌스, 인프라, 정규식 등 낯선 IT 전문용어 대신 '자동 연결 흐름', '원본 데이터 보존 원칙', '전화번호 입력 규칙 검사' 등 입문자 친화적인 단어를 사용했습니다.
- **인터랙티브 실습 체험기 내장**:
  - 스마트 칩(@) 실시간 클릭 체험기
  - 전화번호 입력 규칙 검사(정규식) 실시간 테스터
  - 저절로 늘어나는 FILTER 수식 및 출석 체크 연동 체험기
  - Apps Script 개인 맞춤 이메일 발송 결과 미리보기
- **진행도 저장 (localStorage)**: 브라우저를 닫거나 새로고침해도 체크리스트 달성 상태와 마지막 슬라이드 위치가 안전하게 보존됩니다.
- **단일 무설치 HTML 파일 제공**: 외부 빌드 도구 없이 컴퓨터에서 더블클릭만으로 실행 가능한 `workspace_guide.html` 파일이 포함되어 있습니다.

---

## 🚀 GitHub 업로드 및 Vercel 배포 가이드

이 프로젝트는 Vite 기반 React SPA로 구성되어 있으며, **Vercel**에 올리면 별도의 복잡한 설정 없이 1분 만에 전 세계에 무료 배포할 수 있습니다.

### 1단계: 깃허브(GitHub) 저장소에 올리기

1. [GitHub](https://github.com)에서 새 저장소(New Repository)를 생성합니다. (예: `google-workspace-guide`)
2. 터미널(또는 명령 프롬프트)에서 프로젝트 폴더로 이동한 뒤 아래 명령어를 순서대로 실행합니다:

```bash
# 1. git 초기화 (이미 되어 있다면 생략)
git init

# 2. 모든 변경사항 추가 및 커밋
git add .
git commit -m "feat: 구글 워크스페이스 & Apps Script 실습 가이드북 완성"

# 3. 메인 브랜치 설정 및 원격 저장소 연결
git branch -M main
git remote add origin https://github.com/당신의깃허브아이디/google-workspace-guide.git

# 4. 깃허브로 푸시
git push -u origin main
```

---

### 2단계: Vercel(버셀)로 1분 만에 배포하기

1. [Vercel](https://vercel.com)에 로그인합니다 (GitHub 계정으로 간편 로그인 권장).
2. 대시보드 우측 상단의 **[Add New...]** > **[Project]** 버튼을 클릭합니다.
3. 방금 올린 `google-workspace-guide` 저장소를 찾아 **[Import]**를 클릭합니다.
4. **Configure Project** 화면 설정:
   - **Framework Preset**: `Vite` (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `dist` (기본값)
5. 파란색 **[Deploy]** 버튼을 누르면 약 30초 후 나만의 무료 웹사이트 URL(예: `https://google-workspace-guide.vercel.app`)이 생성됩니다!

> **팁**: 이미 프로젝트 루트에 `vercel.json` 파일이 포함되어 있어 새로고침 시 경로 문제(404 에러) 없이 원활하게 작동합니다.

---

## 📁 파일 구조

```
├── public/
│   ├── workspace_guide.html    # CDN 기반 무설치 단일 HTML 파일 (빌드 시 dist로 자동 복사)
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.tsx           # 상단 내비게이션 및 슬라이드 카운터
│   │   ├── Sidebar.tsx          # 1~4교시 접이식 아코디언 목차
│   │   ├── SlideContent.tsx     # 메인 슬라이드 카드 및 설명/표/코드블록
│   │   ├── InteractiveWidgets.tsx # 스마트 칩, 정규식, 필터, 메일 체험기
│   │   ├── Footer.tsx           # 이전/다음 버튼 및 키보드 안내
│   │   ├── AllCheckpointsModal.tsx # 전체 실습 종합 점검 현황판
│   │   └── ExportHtmlModal.tsx  # 단일 HTML 다운로드 모달
│   ├── data/
│   │   └── guideData.ts         # 1~4교시 전체 실습 콘텐츠 데이터 객체
│   ├── App.tsx                  # 최상위 상태 관리 컴포넌트
│   ├── main.tsx
│   └── index.css
├── index.html                   # 앱 진입점 HTML
├── vercel.json                  # Vercel 배포용 설정 파일
├── package.json                 # 프로젝트 의존성 및 빌드 스크립트
├── workspace_guide.html         # 루트 단일 HTML 독립 실행 파일
└── README.md
```

---

## 💻 로컬 개발 환경 실행

```bash
# 패키지 설치
npm install

# 로컬 개발 서버 실행 (기본 포트: 3000)
npm run dev

# 프로덕션 빌드 테스트
npm run build
```
