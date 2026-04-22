import { useState, useEffect } from 'react';
import styles from './MusicCard.module.css';

function MusicCard({ item, cover, isPlaying = false, onPlay }) {
  /* 0: 원본(300x300), 1: 100x100 다운그레이드, 2: 실패 */
  const [tier, setTier] = useState(0);

  /* cover prop이 바뀌면 tier 리셋 */
  useEffect(() => { setTier(0); }, [cover]);

  const src = (() => {
    if (!cover || tier === 2) return null;
    if (tier === 1) return cover.replace('300x300bb', '100x100bb');
    return cover;
  })();

  return (
    <div
      className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
      onClick={onPlay}
    >
      <div className={styles.imgWrap}>
        {src ? (
          <img
            src={src}
            alt={item.title}
            className={styles.coverImg}
            onError={() => {
              if (tier === 0) {
                console.warn('[cover] 300x300 failed, retry 100x100:', item.artist, '-', item.title);
                setTier(1);
              } else {
                console.warn('[cover] all sizes failed:', item.artist, '-', item.title);
                setTier(2);
              }
            }}
          />
        ) : (
          <div className={styles.fallback}>
            <span className={styles.fallbackLogo}>WeatherUp</span>
          </div>
        )}

        {isPlaying && <div className={styles.overlay} />}

        {isPlaying && (
          <div className={styles.equalizer}>
            <span /><span /><span />
          </div>
        )}

        <button
          className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          aria-label={isPlaying ? '일시정지' : '재생'}
        >
          {isPlaying ? (
            <span className={styles.pauseIcon}><span /><span /></span>
          ) : (
            <span className={styles.playIcon} />
          )}
        </button>
      </div>

      <div className={styles.info}>
        <p className={`${styles.title} ${isPlaying ? styles.titlePlaying : ''}`}>
          <span className={styles.titleText}>{item.title}</span>
        </p>
        <p className={styles.artist}>
          <span className={styles.artistText}>{item.artist}</span>
        </p>
      </div>
    </div>
  );
}

export default MusicCard;
