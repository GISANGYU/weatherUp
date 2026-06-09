/* =========================================================================
   WeatherSelector — 7테마 무드 셀렉터 (히어로 / 헤더 chip 공용)
   ---------------------------------------------------------------------------
   각 버튼은 해당 테마의 캔버스 SVG 씬을 라운드 썸네일로 보여준다.
   날짜·요일·기온 표시 없음 — 사용자가 무드 자체를 고른다 (plan §4).
   variant: 'hero'(라벨 포함 큰 버튼) | 'chip'(헤더용 아이콘만)
   ========================================================================= */

import WeatherIcon from '../WeatherIcons';
import { useWeather } from '../../context/WeatherContext';
import styles from './WeatherSelector.module.css';

/* plan §4-1 표기 순서 */
export const THEME_BUTTONS = [
  { mode: 'sunny',         label: '맑음' },
  { mode: 'partly-cloudy', label: '구름' },
  { mode: 'snowy',         label: '눈' },
  { mode: 'dusty',         label: '황사' },
  { mode: 'cloudy',        label: '흐림' },
  { mode: 'rainy',         label: '비' },
  { mode: 'stormy',        label: '번개' },
];

/* sunny·partly-cloudy 만 새 CSS 씬 버튼, 나머지는 기존 SVG 씬 유지 */
const CSS_SCENE = {
  sunny:           'wscene wscene--sunny',
  'partly-cloudy': 'wscene wscene--partly-cloudy',
};

function WeatherSelector({ variant = 'hero' }) {
  const { currentTheme, setTheme } = useWeather();

  return (
    <div
      className={`${styles.wrap} ${styles[variant]}`}
      role="group"
      aria-label="날씨 무드 선택"
    >
      {THEME_BUTTONS.map(({ mode, label }) => {
        const isActive = currentTheme === mode;
        return (
          <button
            key={mode}
            type="button"
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            onClick={() => setTheme(mode)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
          >
            <span className={`${styles.thumb} ${CSS_SCENE[mode] || ''}`}>
              {!CSS_SCENE[mode] && <WeatherIcon theme={mode} />}
            </span>
            {variant !== 'chip' && <span className={styles.label}>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default WeatherSelector;
