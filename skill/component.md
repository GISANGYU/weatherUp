# Skill: 컴포넌트 생성

## 목적
Weather Mode 프로젝트의 컴포넌트를 일관된 구조로 생성한다.

## 파일 위치 규칙
| 종류 | 경로 |
|------|------|
| 재사용 컴포넌트 | `src/components/ComponentName/index.jsx` |
| 페이지 컴포넌트 | `src/pages/PageName/index.jsx` |
| 레이아웃 컴포넌트 | `src/components/Layout/` |

## 컴포넌트 템플릿

```jsx
// src/components/ComponentName/index.jsx
import styles from './ComponentName.module.css';

function ComponentName({ weatherMode, ...props }) {
  return (
    <div className={styles.container}>
      {/* 내용 */}
    </div>
  );
}

export default ComponentName;
```

## Props 규칙
- `weatherMode` prop은 항상 상위에서 내려받는다 (`sunny` / `cloudy` / `rainy` / `snowy`)
- 날씨 상태 변경은 반드시 Context 또는 상위 setState를 통해 처리한다
- props drilling이 깊어지면 WeatherContext를 활용한다

## 주요 컴포넌트 목록
- `WeatherSelector` — 날씨 선택 버튼 4개 (Phase 1) / 날짜 버튼 7개 (Phase 2)
- `SectionPreviewCard` — Home 페이지 섹션 프리뷰 카드 (OOTD/Food/Activity)
- `Header` — 로고 + 네비게이션 + 햄버거 메뉴
- `OutfitCardList` — OOTD 페이지 카드 목록
- `RestaurantCardList` — Food 페이지 맛집 카드 목록
- `ActivityCardList` — Activity 페이지 활동 카드 목록

## 주의사항
- 컴포넌트명은 PascalCase, 파일명도 동일하게 유지
- CSS는 반드시 CSS Module(`.module.css`)로 작성해 스코프를 격리
- 테마 스타일은 컴포넌트 내부 CSS가 아닌 전역 테마 클래스로 처리
