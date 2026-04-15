import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const ICONS = [
  { icon: '☀️', label: '맑음', colorVar: '#FFB800' },
  { icon: '⛅', label: '흐림', colorVar: '#8A9BB0' },
  { icon: '🌧️', label: '비',   colorVar: '#4A9EFF' },
  { icon: '❄️', label: '눈',   colorVar: '#6A9FD8' },
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
          {ICONS.map(({ icon, label, colorVar }, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={label}
                className={`${styles.iconWrap} ${isActive ? styles.iconActive : ''} ${isActive && flipping ? styles.flipping : ''}`}
                style={isActive ? { '--glow': colorVar } : {}}
              >
                <div className={styles.iconBox}>
                  <span className={styles.emoji}>{icon}</span>
                </div>
                <span className={`${styles.label} ${isActive ? styles.labelActive : ''}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 메시지 */}
        <p className={styles.message}>날씨 정보를 불러오고 있어요!</p>

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
