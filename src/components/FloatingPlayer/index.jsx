import { useMusicContext } from '../../context/MusicContext';
import styles from './FloatingPlayer.module.css';

function extractVideoId(url) {
  const m = url?.match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function FloatingPlayer() {
  const { nowPlaying, stop } = useMusicContext();
  if (!nowPlaying) return null;

  const videoId = extractVideoId(nowPlaying.link);

  return (
    <div className={styles.container}>
      {/* 트랙 정보 */}
      <div className={styles.info}>
        <span className={styles.musicIcon}><MusicNoteIcon /></span>
        <div className={styles.text}>
          <span className={styles.title}>{nowPlaying.title}</span>
          <span className={styles.artist}>{nowPlaying.artist}</span>
        </div>
      </div>

      {/* YouTube 컨트롤 바만 보이도록 크롭된 iframe */}
      {videoId && (
        <div className={styles.iframeWrap}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className={styles.iframe}
            title={nowPlaying.title}
          />
        </div>
      )}

      {/* 닫기 버튼 */}
      <button className={styles.closeBtn} onClick={stop} aria-label="재생 중지">
        <CloseIcon />
      </button>
    </div>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default FloatingPlayer;
