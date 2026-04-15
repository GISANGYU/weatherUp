# Skill: 날씨 테마 시스템

## 목적
`body` 또는 최상위 래퍼의 classList를 통해 전체 페이지 테마를 전환한다.

## 테마 클래스 규칙
| 날씨 | 클래스 | 배경색 | 포인트색 |
|------|--------|--------|---------|
| 맑음 | `theme-sunny` | `#EEF6FF` | `#FFB800` |
| 흐림 | `theme-cloudy` | `#F0F0F0` | `#8A9BB0` |
| 비 | `theme-rainy` | `#1C2B3A` | `#4A9EFF` |
| 눈 | `theme-snowy` | `#EAF0FF` | `#A8C8FF` |

## 전역 CSS 변수 설정 (`src/styles/themes.css`)

```css
body.theme-sunny  { --bg: #EEF6FF; --accent: #FFB800; --text: #2C3E50; --card-bg: #FFFFFF; }
body.theme-cloudy { --bg: #F0F0F0; --accent: #8A9BB0; --text: #3A3A3A; --card-bg: #F8F8F8; }
body.theme-rainy  { --bg: #1C2B3A; --accent: #4A9EFF; --text: #E8F4FF; --card-bg: rgba(255,255,255,0.08); }
body.theme-snowy  { --bg: #EAF0FF; --accent: #A8C8FF; --text: #2A3A5A; --card-bg: rgba(255,255,255,0.9); }
```

## 테마 전환 로직 (App.js)

```jsx
// weatherMode: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
useEffect(() => {
  const themes = ['theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];
  document.body.classList.remove(...themes);
  document.body.classList.add(`theme-${weatherMode}`);
}, [weatherMode]);
```

## 하위 컴포넌트에서 테마 참조

```css
/* 테마 변수를 CSS에서 직접 참조 */
.container {
  background-color: var(--bg);
  color: var(--text);
}
.card {
  background-color: var(--card-bg);
  border: 1px solid var(--accent);
}
```

## 주의사항
- 테마 클래스는 반드시 하나만 유지 (전환 전 기존 클래스 remove)
- 초기 렌더링 시 기본값 `theme-sunny` 적용
- 비(rainy) 테마는 dark 배경이므로 텍스트 가독성 별도 확인 필요
