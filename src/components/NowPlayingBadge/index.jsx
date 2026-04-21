import { useMusicContext } from '../../context/MusicContext';
import styles from './NowPlayingBadge.module.css';

function NowPlayingBadge() {
  const { nowPlaying, stop } = useMusicContext();

  if (!nowPlaying) return null;

  return (
    <div className={styles.badge}>
      {/* 이퀄라이저 애니메이션 */}
      <span className={styles.eq} aria-hidden="true">
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>

      {/* 트랙 정보 */}
      <span className={styles.info}>
        <span className={styles.title}>{nowPlaying.title}</span>
        <span className={styles.artist}>{nowPlaying.artist}</span>
      </span>

      {/* 정지 버튼 */}
      <button
        className={styles.stopBtn}
        onClick={stop}
        aria-label="재생 중지"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default NowPlayingBadge;
