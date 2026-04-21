import { useState } from 'react';
import styles from './MusicCard.module.css';

function MusicCard({ item, cover, isPlaying = false, onPlay }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showCover = cover && !imgFailed;

  return (
    <div
      className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
      onClick={onPlay}
    >
      <div className={styles.imgWrap}>
        {showCover ? (
          <img
            src={cover}
            alt={item.title}
            className={styles.coverImg}
            onError={() => setImgFailed(true)}
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
