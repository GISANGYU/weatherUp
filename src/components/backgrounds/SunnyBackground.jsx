import styles from './SunnyBackground.module.css';

/* Demo #36 Cloudless Sun — 단색 노란 태양 + 부드러운 bobbing */
export default function SunnyBackground() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sun} />
    </div>
  );
}
