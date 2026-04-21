import styles from './OotdGuide.module.css';

function OotdGuide({ ootdGuide }) {
  const { tips, avoids } = ootdGuide;

  return (
    <div className={styles.wrap}>
      {/* 이렇게 입어요 */}
      <div className={`${styles.block} ${styles.tips}`}>
        <div className={styles.blockHeader}>
          <span className={styles.icon}>✅</span>
          <h3 className={styles.blockTitle}>이렇게 입어요</h3>
        </div>
        <ul className={styles.list}>
          {tips.map((tip, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.dot} />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* 이건 피해요 */}
      <div className={`${styles.block} ${styles.avoids}`}>
        <div className={styles.blockHeader}>
          <span className={styles.icon}>🚫</span>
          <h3 className={styles.blockTitle}>이건 피해요</h3>
        </div>
        <ul className={styles.list}>
          {avoids.map((avoid, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.dot} />
              {avoid}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OotdGuide;
