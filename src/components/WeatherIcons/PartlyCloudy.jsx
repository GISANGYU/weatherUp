/* PartlyCloudy — Demo #14
 * sunny와 같은 파란 하늘 + bobbing 작은 해 + 흐르는 흰 구름 2개.
 */

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

export default function PartlyCloudy() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--partly-cloudy"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-pc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6bb6ff" />
          <stop offset="100%" stopColor="#a8d2ff" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-pc)" />

      <g className="weather-icon__sun-wrap">
        <circle className="weather-icon__sun" cx="30" cy="32" r="13" fill="#ffd866" />
      </g>

      <g fill="#ffffff">
        <g className="weather-icon__cloud weather-icon__cloud--a">
          <g transform="translate(20 60)"><CloudShape /></g>
        </g>
        <g className="weather-icon__cloud weather-icon__cloud--b" opacity="0.92">
          <g transform="translate(60 80) scale(0.72)"><CloudShape /></g>
        </g>
      </g>
    </svg>
  );
}
