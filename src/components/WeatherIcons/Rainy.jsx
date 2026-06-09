/* Rainy — Demo #02 Angled Rain
 * 어두운 파랑 하늘 + 14도 사선 빗줄기.
 */

const DROPS = [
  { x:  4, dur: 0.80, delay: 0.0 },
  { x: 12, dur: 0.62, delay: 0.5 },
  { x: 18, dur: 0.90, delay: 0.2 },
  { x: 26, dur: 0.55, delay: 0.8 },
  { x: 32, dur: 0.74, delay: 0.3 },
  { x: 40, dur: 0.66, delay: 1.1 },
  { x: 46, dur: 0.86, delay: 0.1 },
  { x: 54, dur: 0.58, delay: 0.6 },
  { x: 60, dur: 0.78, delay: 0.9 },
  { x: 68, dur: 0.64, delay: 0.2 },
  { x: 74, dur: 0.88, delay: 1.3 },
  { x: 82, dur: 0.56, delay: 0.4 },
  { x: 88, dur: 0.80, delay: 0.7 },
  { x: 96, dur: 0.68, delay: 1.0 },
];

export default function Rainy() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--rainy"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-rainy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e2a3d" />
          <stop offset="100%" stopColor="#3a5078" />
        </linearGradient>
        <linearGradient id="drop-rainy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(205,230,255,0)" />
          <stop offset="100%" stopColor="rgba(220,238,255,1)" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-rainy)" />

      <g transform="rotate(14 50 50)">
        {DROPS.map((d, i) => (
          <rect
            key={i}
            className="weather-icon__drop"
            x={d.x} y={0}
            width="1.3" height="26"
            rx="0.65"
            fill="url(#drop-rainy)"
            style={{
              animationDuration: `${d.dur}s`,
              animationDelay:    `-${d.delay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
