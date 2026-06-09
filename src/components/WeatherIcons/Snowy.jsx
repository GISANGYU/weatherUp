/* Snowy — Demo #09 Detailed Snowflakes
 * 회색-블루 하늘 + SVG 6각 결정 회전 낙하.
 */

const FLAKES = [
  { x: 10, scale: 1.0, dur: 5.0, delay: 0.2 },
  { x: 22, scale: 0.75, dur: 6.5, delay: 1.8 },
  { x: 32, scale: 1.3, dur: 5.5, delay: 0.5 },
  { x: 44, scale: 0.9, dur: 7.0, delay: 2.5 },
  { x: 54, scale: 1.1, dur: 5.8, delay: 1.2 },
  { x: 64, scale: 0.8, dur: 6.2, delay: 3.1 },
  { x: 76, scale: 1.2, dur: 5.3, delay: 0.7 },
  { x: 86, scale: 1.0, dur: 6.8, delay: 2.0 },
];

function FlakeShape() {
  return (
    <g stroke="#ffffff" strokeWidth="1" strokeLinecap="round" fill="none">
      <line x1="0"    y1="-5"   x2="0"   y2="5" />
      <line x1="-4.3" y1="-2.5" x2="4.3" y2="2.5" />
      <line x1="-4.3" y1="2.5"  x2="4.3" y2="-2.5" />
      <line x1="0"    y1="-5"   x2="-1"  y2="-3.5" />
      <line x1="0"    y1="-5"   x2="1"   y2="-3.5" />
      <line x1="0"    y1="5"    x2="-1"  y2="3.5" />
      <line x1="0"    y1="5"    x2="1"   y2="3.5" />
    </g>
  );
}

export default function Snowy() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--snowy"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-snowy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4a6788" />
          <stop offset="100%" stopColor="#7ea0c1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-snowy)" />

      {FLAKES.map((f, i) => (
        <g key={i} transform={`translate(${f.x} 0)`}>
          <g
            className="weather-icon__flake"
            style={{
              animationDuration: `${f.dur}s`,
              animationDelay:    `-${f.delay}s`,
            }}
          >
            <g transform={`scale(${f.scale})`}>
              <FlakeShape />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
