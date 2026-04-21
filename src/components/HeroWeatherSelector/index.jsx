import { useRef, useEffect, useState } from 'react';
import { LuSun, LuCloud, LuCloudRain, LuSnowflake } from 'react-icons/lu';
import styles from './HeroWeatherSelector.module.css';

const BUTTONS = [
  { mode: 'sunny',  label: '맑음', Icon: LuSun       },
  { mode: 'cloudy', label: '흐림', Icon: LuCloud     },
  { mode: 'rainy',  label: '비',   Icon: LuCloudRain },
  { mode: 'snowy',  label: '눈',   Icon: LuSnowflake },
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
      <span className={styles.slider} style={sliderStyle} aria-hidden="true" />

      {BUTTONS.map(({ mode, label, Icon }) => {
        const isActive = weatherMode === mode;
        return (
          <button
            key={mode}
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            onClick={() => setWeatherMode(mode)}
            aria-pressed={isActive}
          >
            <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default HeroWeatherSelector;
