import { useRef, useEffect, useState } from 'react';
import styles from './HeroWeatherSelector.module.css';

const BUTTONS = [
  { mode: 'sunny',  label: '맑음', icon: '☀️' },
  { mode: 'cloudy', label: '흐림', icon: '⛅' },
  { mode: 'rainy',  label: '비',   icon: '🌧️' },
  { mode: 'snowy',  label: '눈',   icon: '❄️' },
];

function HeroWeatherSelector({ weatherMode, setWeatherMode }) {
  const wrapRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, transform: 'translateX(0px)' });
  const activeIndex = BUTTONS.findIndex(b => b.mode === weatherMode);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const btns = wrap.querySelectorAll('button');
    const btn = btns[activeIndex];
    if (!btn) return;
    setSliderStyle({
      width:     btn.offsetWidth,
      transform: `translateX(${btn.offsetLeft}px)`,
    });
  }, [activeIndex]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      {/* 슬라이딩 인디케이터 */}
      <span className={styles.slider} style={sliderStyle} aria-hidden="true" />

      {BUTTONS.map(({ mode, label, icon }) => {
        const isActive = weatherMode === mode;
        return (
          <button
            key={mode}
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            onClick={() => setWeatherMode(mode)}
            aria-pressed={isActive}
          >
            <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
              {icon}
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default HeroWeatherSelector;
