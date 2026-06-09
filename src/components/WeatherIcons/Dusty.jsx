/* Dusty — Demo #29 Smog City
 * 흙색 하늘 + 흐릿한 태양 + 도시 실루엣 + 미세먼지 띠.
 */

const CITY_PATH =
  "M0 80 L0 50 L15 50 L15 30 L25 30 L25 45 L40 45 L40 18 L55 18 L55 35 " +
  "L65 35 L65 50 L80 50 L80 24 L95 24 L95 40 L110 40 L110 12 L125 12 " +
  "L125 34 L140 34 L140 28 L155 28 L155 45 L170 45 L170 38 L185 38 " +
  "L185 50 L200 50 L200 80 Z";

export default function Dusty() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="weather-icon weather-icon--dusty"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-dusty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d2b07c" />
          <stop offset="100%" stopColor="#6f5840" />
        </linearGradient>
        <linearGradient id="smog-dusty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(180,150,110,0)" />
          <stop offset="60%"  stopColor="rgba(180,150,110,0.42)" />
          <stop offset="100%" stopColor="rgba(180,150,110,0.78)" />
        </linearGradient>
        <radialGradient id="pale-sun-dusty" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,230,170,0.6)" />
          <stop offset="100%" stopColor="rgba(255,230,170,0)" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sky-dusty)" />

      {/* 흐릿한 태양 */}
      <circle
        className="weather-icon__pale-sun"
        cx="62" cy="30" r="20"
        fill="url(#pale-sun-dusty)"
      />

      {/* 도시 실루엣 (200×80 viewBox path → 0..100, 65..100 영역) */}
      <g transform="translate(0 65) scale(0.5 0.4375)">
        <path d={CITY_PATH} fill="#231a12" />
      </g>

      {/* 미세먼지 띠 */}
      <rect
        className="weather-icon__smog"
        width="100" height="100"
        fill="url(#smog-dusty)"
      />
    </svg>
  );
}
