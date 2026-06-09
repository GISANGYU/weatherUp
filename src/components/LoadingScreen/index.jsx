import { useEffect, useState } from 'react';
import {
  LuSun, LuCloudSun, LuSnowflake, LuHaze,
  LuCloud, LuCloudRain, LuCloudLightning,
} from 'react-icons/lu';
import styles from './LoadingScreen.module.css';

/* 헤더 로고·셀렉터와 동일한 7종 라인 아이콘 + 합의된 네이밍 */
const ICONS = [
  { Icon: LuSun,            label: '맑음', color: '#FFB800' },
  { Icon: LuCloudSun,       label: '구름', color: '#9BB8D9' },
  { Icon: LuSnowflake,      label: '눈',   color: '#A8C8FF' },
  { Icon: LuHaze,           label: '황사', color: '#B8A888' },
  { Icon: LuCloud,          label: '흐림', color: '#B8C5D5' },
  { Icon: LuCloudRain,      label: '비',   color: '#4A9EFF' },
  { Icon: LuCloudLightning, label: '번개', color: '#8877F5' },
];

function LoadingScreen({ visible }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);

  /* 아이콘 순환 */
  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % ICONS.length);
        setFlipping(false);
      }, 220);
    }, 750);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`${styles.overlay} ${!visible ? styles.fadeOut : ''}`}>
      <div className={styles.card}>

        {/* 로고 */}
        <p className={styles.logo}>WeatherUp</p>

        {/* 아이콘 4개 행 */}
        <div className={styles.iconRow}>
          {ICONS.map(({ Icon, label, color }, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={label}
                className={`${styles.iconWrap} ${isActive ? styles.iconActive : ''} ${isActive && flipping ? styles.flipping : ''}`}
                style={isActive ? { '--glow': color } : {}}
              >
                <div className={styles.iconBox}>
                  <span className={styles.emoji} style={{ color }}>
                    <Icon size={32} strokeWidth={1.9} />
                  </span>
                </div>
                <span className={`${styles.label} ${isActive ? styles.labelActive : ''}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 메시지 */}
        <p className={styles.message}>무드를 준비하고 있어요!</p>

        {/* 도트 인디케이터 */}
        <div className={styles.dots}>
          {[0, 1, 2].map(i => (
            <span key={i} className={styles.dot} style={{ animationDelay: `${i * 0.22}s` }} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default LoadingScreen;
