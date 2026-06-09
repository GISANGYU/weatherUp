import { useMemo } from 'react';
import styles from './StormyBackground.module.css';

/* Demo #28 Cinematic Storm — 노이즈 + 사선 거센 비 + 라인 벼락 3개 */

const DROP_COUNT = 110;

export default function StormyBackground() {
  const drops = useMemo(
    () =>
      Array.from({ length: DROP_COUNT }, () => ({
        left:     Math.random() * 100,
        duration: Math.random() * 0.45 + 0.4, // 0.4–0.85s
        delay:    -Math.random() * 1.4,
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

      <div className={`${styles.bolt} ${styles.b1}`}>
        <svg viewBox="0 0 50 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 25 0 L 18 30 L 30 36 L 14 72 L 26 86 L 10 128 L 22 142 L 4 200" />
        </svg>
      </div>
      <div className={`${styles.bolt} ${styles.b2}`}>
        <svg viewBox="0 0 60 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 30 0 L 22 28 L 36 36 L 18 70 L 32 82 L 14 122 L 28 138 L 10 180" />
          <path d="M 32 82 L 42 100 L 36 108 L 48 130" />
          <path d="M 28 138 L 22 152 L 30 158 L 24 175" />
        </svg>
      </div>
      <div className={`${styles.bolt} ${styles.b3}`}>
        <svg viewBox="0 0 45 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 22 0 L 16 36 L 28 44 L 14 88 L 24 102 L 10 160 L 18 175" />
        </svg>
      </div>

      <div className={styles.noise} />
    </div>
  );
}
