/* Cloudy — Demo #15 Overcast
 * 회색 그라디언트 하늘 + 회색 구름 3개 좌→우 drift.
 */

const CLOUDS = [
  { y: 26, scale: 0.85, dur: 26, delay:   0 },
  { y: 52, scale: 1.15, dur: 34, delay: -17 },
  { y: 76, scale: 0.95, dur: 30, delay: -10 },
];

function CloudShape() {
  return (
    <g>
      <ellipse cx="-13" cy="3"  rx="11" ry="8" />
      <ellipse cx="2"   cy="-5" rx="15" ry="10" />
      <ellipse cx="19"  cy="-2" rx="13" ry="9" />
      <ellipse cx="32"  cy="3"  rx="9"  ry="7" />
      <rect x="-14" y="0" width="48" height="11" rx="5.5" />
    </g>
  );
}

export default function Cloudy() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--cloudy"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-cloudy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5c6671" />
          <stop offset="100%" stopColor="#7b8693" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-cloudy)" />

      <g fill="#c5ccd4">
        {CLOUDS.map((c, i) => (
          <g
            key={i}
            className="weather-icon__cloud-drift"
            style={{
              animationDuration: `${c.dur}s`,
              animationDelay:    `${c.delay}s`,
            }}
          >
            <g transform={`translate(0 ${c.y}) scale(${c.scale})`}>
              <CloudShape />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
