import styles from './DustyBackground.module.css';

/* 황사 도시 — 3색(모래빛·중간빛·실루엣) 레이어드 스카이라인.
 * 원경/근경 건물을 CSS mask 로 찍어 비율을 유지(가로 늘어짐 제거),
 * 그 위로 먼지 안개 덩어리가 둥둥 떠다닌다. */

/* 원경: 뾰족지붕·안테나 살짝 섞은 저층 실루엣 (흐릿하게 처리되어 윤곽만) */
const FAR_SKYLINE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100' preserveAspectRatio='none'%3E" +
  "%3Cpath fill='%23000' d='M0 100 0 64 18 64 18 48 36 48 36 70 56 70 56 40 78 40 78 58 98 58 98 50 120 50 " +
  "120 34 131 34 131 22 132 22 132 34 142 34 142 60 162 60 162 46 173 36 184 46 184 64 206 64 206 52 228 52 " +
  "228 38 250 38 250 62 272 62 272 54 300 54 300 100Z'/%3E" +
  "%3C/svg%3E";

/* 근경: 건물들이 벽을 맞대고 '붙어' 있는 연속 스카이라인.
 * 바닥까지 끊지 않고 지붕 높낮이만 단차로 변주 + 박공지붕·셋백·안테나 디테일. */
const NEAR_SKYLINE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 150' preserveAspectRatio='xMinYMax meet'%3E" +
  "%3Cpath fill='%23000' d='M0 150 " +
  "0 96 44 96 " +                                  /* 저층 */
  "44 78 92 78 " +                                 /* 한 단 위 (붙어서 단차만) */
  "92 60 100 60 100 48 101 48 101 60 132 60 " +    /* 더 높은 동 + 안테나 */
  "132 44 156 32 180 44 " +                        /* 박공(뾰족) 지붕 */
  "180 66 224 66 " +                               /* 단차 내려와 붙은 중층 */
  "224 52 232 52 232 42 252 42 252 52 260 52 " +   /* 계단식 셋백 크라운 */
  "260 70 300 70 " +                               /* 단차 내려와 붙은 동 */
  "300 58 316 58 316 44 317 44 317 58 332 58 " +   /* 한 단 위 + 안테나 */
  "332 84 360 84 " +                               /* 우측 저층까지 연속 */
  "360 150Z'/%3E" +
  "%3C/svg%3E";

const maskOf = (url) => ({
  WebkitMaskImage: `url("${url}")`,
  maskImage: `url("${url}")`,
});

export default function DustyBackground() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.paleSun} />
      <div className={styles.far} style={maskOf(FAR_SKYLINE)} />
      <div className={styles.near} style={maskOf(NEAR_SKYLINE)} />
      <div className={styles.dust}>
        <span className={styles.mote} />
        <span className={styles.mote} />
        <span className={styles.mote} />
        <span className={styles.mote} />
        <span className={styles.mote} />
      </div>
      <div className={styles.smog} />
    </div>
  );
}
