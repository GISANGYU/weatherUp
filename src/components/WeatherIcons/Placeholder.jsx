/* 미구현 테마용 임시 SVG (Step 3 에서 rainy 외 6종 품질 판정 전까지) */
export default function Placeholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="weather-icon weather-icon--placeholder"
      aria-hidden="true"
    >
      <circle className="weather-icon__shape" cx="50" cy="50" r="18" />
    </svg>
  );
}
