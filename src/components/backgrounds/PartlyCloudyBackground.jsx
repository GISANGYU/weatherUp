import styles from './PartlyCloudyBackground.module.css';

/* Demo #14 Partly Cloudy — sunny와 같은 톤 + 흐르는 구름 2개.
 * 구름은 셀렉터(.wscene--partly-cloudy)와 동일한 라디얼 그라디언트 시스템으로 그린다. */

export default function PartlyCloudyBackground() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sun} />
      <div className={`${styles.cloud} ${styles.cloudA}`} />
      <div className={`${styles.cloud} ${styles.cloudB}`} />
    </div>
  );
}
