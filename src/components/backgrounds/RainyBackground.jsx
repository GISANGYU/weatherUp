import { useMemo } from 'react';
import styles from './RainyBackground.module.css';

/* Demo #02 Angled Rain — 14도 기울인 사선 빗줄기 */

const DROP_COUNT = 120;

export default function RainyBackground() {
  const drops = useMemo(
    () =>
      Array.from({ length: DROP_COUNT }, () => ({
        left:     Math.random() * 100,
        duration: Math.random() * 0.5 + 0.5, // 0.5–1.0s
        delay:    -Math.random() * 2,
        opacity:  Math.random() * 0.45 + 0.55,
      })),
    [],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.scene}>
        {drops.map((d, i) => (
          <span
            key={i}
            className={styles.drop}
            style={{
              left: `${d.left}%`,
              animationDuration: `${d.duration}s`,
              animationDelay:    `${d.delay}s`,
              opacity:           d.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
