import { useMemo } from 'react';
import styles from './SnowyBackground.module.css';

/* Demo #09 Detailed Snowflakes — SVG 6각 결정 + 회전 낙하 */

const FLAKE_COUNT = 50;

const Flake = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
    <g stroke="#8fb4d8" strokeWidth="1.3" strokeLinecap="round" fill="none">
      <line x1="10"  y1="3"    x2="10"   y2="17" />
      <line x1="3.5" y1="6.5"  x2="16.5" y2="13.5" />
      <line x1="3.5" y1="13.5" x2="16.5" y2="6.5" />
      <line x1="10"  y1="3"    x2="8.5"  y2="5" />
      <line x1="10"  y1="3"    x2="11.5" y2="5" />
      <line x1="10"  y1="17"   x2="8.5"  y2="15" />
      <line x1="10"  y1="17"   x2="11.5" y2="15" />
    </g>
  </svg>
);

export default function SnowyBackground() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, () => ({
        left:     Math.random() * 100,
        scale:    Math.random() * 0.9 + 0.7, // 0.7–1.6
        duration: Math.random() * 4 + 5,     // 5–9s
        delay:    -Math.random() * 7,
      })),
    [],
  );

  return (
    <div className={styles.wrapper}>
      {flakes.map((f, i) => (
        <span
          key={i}
          className={styles.flake}
          style={{
            left: `${f.left}%`,
            animationDuration: `${f.duration}s`,
            animationDelay:    `${f.delay}s`,
          }}
        >
          <span className={styles.inner} style={{ transform: `scale(${f.scale})` }}>
            <Flake />
          </span>
        </span>
      ))}
    </div>
  );
}
