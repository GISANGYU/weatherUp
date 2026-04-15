# Skill: 스타일링 컨벤션

## 목적
Weather Mode 프로젝트 전반의 CSS 작성 규칙과 디자인 시스템을 정의한다.

## 스타일링 방식
- **컴포넌트 스타일**: CSS Modules (`.module.css`) — 스코프 격리
- **전역 테마/변수**: `src/styles/themes.css` — CSS 커스텀 프로퍼티
- **전역 리셋/기본**: `src/styles/global.css` — 기본 타이포그래피, reset

## 파일 구조
```
src/styles/
├─ global.css      # 리셋, body, 기본 폰트 설정
├─ themes.css      # 날씨 테마 클래스 + CSS 변수 정의
└─ variables.css   # 공통 spacing, typography 변수
```

## CSS 변수 (공통)

```css
/* src/styles/variables.css */
:root {
  --radius: 12px;
  --shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
  --font-base: 'Pretendard', 'Noto Sans KR', sans-serif;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
}
```

## 레이아웃 원칙
- 최대 너비: `1600px`, 중앙 정렬 (`margin: 0 auto`)
- 카드 레이아웃: CSS Grid (`auto-fill`, `minmax(280px, 1fr)`)
- 반응형: 모바일 우선 (`min-width` 미디어 쿼리)

## 날씨별 디자인 특징
| 테마 | 특징 |
|------|------|
| sunny | 밝은 배경, 선명한 그림자, 노란 포인트 |
| cloudy | 저채도, 차분한 회색 계열, 소프트 쉐도우 |
| rainy | 다크 모드, glassmorphism 카드 (`backdrop-filter: blur`) |
| snowy | 화이트/연블루, soft glow, 부드러운 테두리 |

## 비(rainy) 테마 glassmorphism 예시

```css
/* theme-rainy에서만 작동 */
body.theme-rainy .card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

## 주의사항
- 색상은 반드시 CSS 변수(`var(--accent)` 등)로 참조, 하드코딩 금지
- 컴포넌트 CSS Module 내에서 테마별 분기는 `body.theme-*` 선택자로 처리
- 애니메이션은 `transition: var(--transition)` 활용
- 한글 폰트는 Pretendard 우선, fallback으로 Noto Sans KR 사용
