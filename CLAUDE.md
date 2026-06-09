# Weather Mode — Claude 참조 문서

## 프로젝트 개요
날씨를 **선택 가능한 UI 무드**로 활용해 패션·음식·액티비티·음악을 큐레이션하는 React 라이프스타일 웹 서비스. 사용자가 7가지 날씨 모드 중 하나를 직접 선택하면 페이지 전체의 컬러·배경·콘텐츠가 동기화된다.

## 기술 스택
- React (CRA), React Router v6
- Context API (`WeatherContext`) — `currentTheme` + `setTheme` 단일 상태
- CSS Modules + 전역 CSS 변수 2레벨 구조 (`tokens.css` → `themes.css`)
- 순수 CSS `@keyframes` + canvas 배경 애니메이션
- react-masonry-css

> **외부 API 없음** (2026-05-26 결정). OpenWeatherMap / Kakao Maps / Geolocation / Air Pollution 전부 폐기.

## 개발 단계
- **Phase 1 (중간고사 — 완료)**: 4개 날씨 버튼 + 정적 데이터 + 테마 전환. `plan-phase1.md`, `main` 브랜치 동결.
- **Phase 2 (기말고사 — 진행 중)**: **7개 날씨 버튼** + 7테마 전용 콘텐츠 + 7종 배경 캔버스 + 7종 SVG 아이콘. `phase2` 브랜치.

## 핵심 설계 원칙
- 사용자가 직접 7가지 날씨 모드를 선택한다 (자동 감지·API 없음)
- `body` 에 `theme-{weather}` 클래스를 add/remove 해 전체 테마 전환
- 날씨 상태는 `WeatherContext` 의 `currentTheme` 으로 전역 관리
- 모든 컴포넌트 CSS 는 의미 토큰(`var(--bg)`, `var(--accent)`, `var(--text)` 등)만 참조

## 7가지 테마
| 계열 | 테마 |
|---|---|
| 밝음 (4) | `sunny` · `partly-cloudy` · `snowy` · `dusty` |
| 어두움 (3) | `cloudy` · `rainy` · `stormy` |

다크모드 없음 — 날씨 자체가 밝기를 결정한다.

## 폴더 구조 (src/)
- `components/` — Header, Footer, Hero, WeatherSelector(7버튼), WeatherIcons(SVG 7종), backgrounds(canvas 7종), OutfitCard / FoodCard / ActivityCard / MusicCard, ColorPalette, OotdGuide, AboutPanel, NavDrawer, LoadingScreen, NowPlayingBadge 등
- `pages/` — HomePage, **DailyPage**(무드별 하루 일정), OOTDPage, FoodPage, ActivityPage, MusicPage, AboutPage, DevTokensPage(개발용)
- NAV 5개: OOTD · Food · Activity · Music · **Daily** (Daily 가 작품 정체성 페이지 — `currentTheme` 한 값이 12 카드 일제 갱신)
- `data/` — `weatherData.js`(7테마 콘텐츠), `paletteData.js`, `ootdGuide.js`, `cardVisuals.js`, `cardPhotos.js`
- `styles/` — `tokens.css`(원시), `themes.css`(의미 매핑), `global.css`, `animations.css`
- `context/` — `WeatherContext`, `MusicContext`
- `hooks/` — `useScrollFade`, `useScrollTop`, `useMusicCovers`
- `utils/`

## 주요 문서
- `plan.md` — Phase 2 기획서 (현재 방향)
- `plan-phase1.md` — Phase 1 제출본 기획서 (참조용)

## 작업 컨벤션
- 한 번에 하나의 Step 만 진행 (`plan.md §9` 순서 참조). Step 종료 시 사용자 확인.
- 새 파일·새 추상화 도입 전 기존 자산 재사용 가능한지 우선 확인.
- 코드 주석은 *why* 가 명확할 때만. 자명한 *what* 주석 금지.
