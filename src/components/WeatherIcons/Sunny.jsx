/* Sunny — Demo #36 Cloudless Sun
 * 파란 하늘 + 단색 노란 해 + bobbing.
 */

export default function Sunny() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--sunny"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-sunny" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6bb6ff" />
          <stop offset="100%" stopColor="#a8d2ff" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-sunny)" />
      <g className="weather-icon__sun-wrap">
        <circle className="weather-icon__sun" cx="50" cy="50" r="18" fill="#ffd866" />
      </g>
    </svg>
  );
}
