import styles from './CloudyBackground.module.css';

/* Demo #15 Overcast — 회색 그라디언트 하늘 + 회색 구름 3개 흐름.
 * 구름은 셀렉터(.wscene--partly-cloudy)와 동일한 라디얼 그라디언트 시스템으로 그린다. */

export default function CloudyBackground() {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.cloud} ${styles.cloud1}`} />
      <div className={`${styles.cloud} ${styles.cloud2}`} />
      <div className={`${styles.cloud} ${styles.cloud3}`} />
    </div>
  );
}
