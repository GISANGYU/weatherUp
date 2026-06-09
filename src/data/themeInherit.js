/* =========================================================================
   themeInherit.js — Phase 2 콘텐츠 상속 매핑 (plan.md §7-3)
   ---------------------------------------------------------------------------
   weatherData.js / cardVisuals / WeatherBackground 등 Phase 1 4테마 자산을
   Phase 2 의 7 테마 currentTheme 으로부터 받아 쓰기 위한 단방향 매핑.
   신규 3테마(partly-cloudy / stormy / dusty)는 가장 가까운 4테마 콘텐츠를
   상속한다. Phase 2 후속 단계에서 전용 콘텐츠 분리 시 이 표만 갱신.
   ========================================================================= */

export const THEME_CONTENT_SOURCE = {
  'sunny':         'sunny',
  'partly-cloudy': 'partly-cloudy',
  'cloudy':        'cloudy',
  'rainy':         'rainy',
  'stormy':        'stormy',
  'snowy':         'snowy',
  'dusty':         'dusty',
};

/** 7 테마 ID 를 4테마 콘텐츠 키로 변환. 알 수 없는 값이면 sunny 폴백. */
export function getContentTheme(theme) {
  return THEME_CONTENT_SOURCE[theme] ?? 'sunny';
}
