# Weather Mode — Claude 참조 문서

## 프로젝트 개요
날씨를 UI 모드로 활용해 패션·음식·액티비티를 큐레이션하는 React 라이프스타일 웹 서비스.

## 기술 스택
- React (CRA), React Router, Context API 또는 Zustand
- CSS Modules 또는 Styled Components
- Phase 2: OpenWeatherMap API, Kakao Maps / Google Places, Geolocation

## 개발 단계
- **Phase 1 (중간고사)**: 4개 날씨 버튼 + 정적 데이터 + 테마 전환 완성
- **Phase 2 (기말고사)**: 7일 날짜 버튼 + 외부 API 연동 + 위치 기반 추천

## ⚠️ Phase 잠금 규칙 (MUST FOLLOW)

**현재 단계: Phase 1 (중간고사 진행 중)**

사용자가 **"중간고사 완료!"** 라고 말하기 전까지 아래 항목은 절대 건드리지 않는다:

### Phase 2 잠금 목록 (Phase 1 완료 전 금지)
- OpenWeatherMap API, Kakao Maps, Google Places 등 외부 API 호출 코드 작성
- `.env` API 키 설정 및 `useWeatherForecast` 훅 구현
- Geolocation(위치 감지) 연동
- 7일 날짜 버튼 및 날짜별 날씨 조회 UI
- `skill/api.md` 내용 실제 코드에 적용

### Phase 1에서 허용되는 것
- 4가지 날씨 모드 버튼 (sunny / cloudy / rainy / snowy)
- 정적 데이터(`weatherData.js`) 기반 콘텐츠 표시
- 테마 전환 (CSS 클래스 방식)
- 페이지 라우팅 및 UI 구성 전반

> `skill/api.md`는 Phase 2 참고용 문서로만 존재하며, "중간고사 완료!" 신호 전까지 구현하지 않는다.

## 핵심 설계 원칙
- `body` 또는 최상위 래퍼에 `theme-{weather}` 클래스를 add/remove해 전체 테마 전환
- 날씨 상태(`sunny` / `cloudy` / `rainy` / `snowy`)는 전역 상태로 관리
- 모든 하위 컴포넌트는 CSS 선택자로 테마 클래스를 참조

## 폴더 구조 (src/)
- `components/` — 재사용 컴포넌트 (Header, WeatherSelector, SectionPreviewCard 등)
- `pages/` — 페이지 컴포넌트 (HomePage, OOTDPage, FoodPage, ActivityPage, AboutPage)
- `data/` — 정적 날씨 데이터 (`weatherData.js`)
- `styles/` — 전역 CSS 및 테마 변수
- `hooks/` — 커스텀 훅 (useWeather 등)
- `context/` — WeatherContext (전역 상태)

## 주요 문서
- `plan.md` — 전체 기획서 (컴포넌트 구조, 데이터, IA 포함)
- `skill/` — 기능별 개발 가이드
