/* =========================================================================
   WeatherContext.jsx — Phase 2 전역 상태 (2026-05-26 방향 전환)
   ---------------------------------------------------------------------------
   외부 API·forecast 모델 폐기. 사용자가 7가지 날씨 모드를 직접 선택하는
   단일 상태(currentTheme)만 보관한다. 날짜·기온·위치 개념 없음 —
   날씨는 "운명"이 아니라 "선택 가능한 분위기"다.
   ========================================================================= */

import { createContext, useContext, useMemo, useState } from 'react';

const WeatherContext = createContext(null);

const THEMES = [
  'sunny', 'partly-cloudy', 'snowy', 'dusty',
  'cloudy', 'rainy', 'stormy',
];

export function WeatherProvider({ children, initialTheme = 'sunny' }) {
  const [currentTheme, setThemeRaw] = useState(initialTheme);

  const setTheme = (theme) => {
    if (THEMES.includes(theme)) setThemeRaw(theme);
  };

  const value = useMemo(
    () => ({ currentTheme, setTheme }),
    [currentTheme],
  );

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) {
    throw new Error('useWeather must be used within <WeatherProvider>');
  }
  return ctx;
}

export { THEMES };
