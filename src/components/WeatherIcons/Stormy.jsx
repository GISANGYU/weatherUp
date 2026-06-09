/* Stormy — Demo #28 Cinematic Storm
 * 어두운 하늘 + 사선 거센 비 + 라인 stroke 벼락 3개.
 */

const DROPS = [
  { x:  4, dur: 0.55, delay: 0.0 },
  { x: 11, dur: 0.45, delay: 0.4 },
  { x: 18, dur: 0.60, delay: 0.7 },
  { x: 25, dur: 0.50, delay: 0.2 },
  { x: 32, dur: 0.55, delay: 1.0 },
  { x: 39, dur: 0.45, delay: 0.5 },
  { x: 46, dur: 0.65, delay: 0.9 },
  { x: 53, dur: 0.50, delay: 0.3 },
  { x: 60, dur: 0.55, delay: 0.8 },
  { x: 67, dur: 0.45, delay: 1.1 },
  { x: 74, dur: 0.60, delay: 0.6 },
  { x: 81, dur: 0.50, delay: 0.2 },
  { x: 88, dur: 0.55, delay: 0.9 },
  { x: 95, dur: 0.65, delay: 0.4 },
];

export default function Stormy() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--stormy"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-stormy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#04060e" />
          <stop offset="100%" stopColor="#15203b" />
        </linearGradient>
        <linearGradient id="drop-stormy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(200,215,240,0)" />
          <stop offset="100%" stopColor="rgba(200,215,240,0.88)" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-stormy)" />

      {/* 사선 거센 비 */}
      <g transform="rotate(8 50 50)">
        {DROPS.map((d, i) => (
          <line
            key={i}
            className="weather-icon__drop"
            x1={d.x} y1={-25}
            x2={d.x} y2={-5}
            stroke="url(#drop-stormy)"
            strokeWidth="1.4"
            strokeLinecap="round"
            style={{
              animationDuration: `${d.dur}s`,
              animationDelay:    `-${d.delay}s`,
            }}
          />
        ))}
      </g>

      {/* 라인 stroke 벼락 3개 */}
      <path
        className="weather-icon__bolt weather-icon__bolt--b1"
        d="M 22 0 L 18 16 L 24 19 L 14 38 L 22 46 L 10 66 L 18 74 L 6 100"
        fill="none" stroke="#ffffff"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        className="weather-icon__bolt weather-icon__bolt--b2"
        d="M 50 0 L 44 14 L 52 18 L 40 36 L 50 42 L 38 62 L 48 70 L 36 92"
        fill="none" stroke="#ffffff"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        className="weather-icon__bolt weather-icon__bolt--b3"
        d="M 78 0 L 74 18 L 80 22 L 72 44 L 78 50 L 70 80 L 76 88"
        fill="none" stroke="#ffffff"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* 노이즈 — 카드 사이즈에서는 격자 흐림 효과 */}
      <rect
        className="weather-icon__noise"
        width="100" height="100"
        fill="url(#drop-stormy)" opacity="0"
      />
    </svg>
  );
}
