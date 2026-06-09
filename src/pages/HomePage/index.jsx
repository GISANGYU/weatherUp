import { useMemo, useRef, useEffect } from 'react';
import { Link }             from 'react-router-dom';
import weatherData          from '../../data/weatherData';
import { getCardVisuals }   from '../../data/cardVisuals';
import { useWeather }       from '../../context/WeatherContext';
import { getContentTheme }  from '../../data/themeInherit';
import { useMusicContext }  from '../../context/MusicContext';
import { useMusicCovers }   from '../../hooks/useMusicCovers';
import WeatherSelector      from '../../components/WeatherSelector';
import styles from './HomePage.module.css';

/* 카드 배경 — 로컬 이미지가 있으면 사진, 없으면 테마 그라데이션으로 폴백 */
function mediaBg(item, theme) {
  const { grad } = getCardVisuals(item.id, theme);
  return item.imageUrl ? `url(${item.imageUrl}) center/cover no-repeat` : grad;
}

/* 섹션 헤더 — eyebrow(mono) + display 타이틀 + 전체보기 화살표 링크 */
function SectionHead({ eyebrow, title, to }) {
  return (
    <div className={styles.sectionHead}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <Link to={to} className={styles.seeAll}>
        전체보기 <span className={styles.seeAllArrow}>→</span>
      </Link>
    </div>
  );
}

function HomePage() {
  const { currentTheme } = useWeather();
  const contentTheme = getContentTheme(currentTheme);
  const { messages, ootd, food, activity, music } = weatherData[contentTheme];

  /* 음악 — 재생 + 커버 (Balanced 분할 레이아웃용) */
  const { play, playingId } = useMusicContext();
  const musicItems = useMemo(() => music.slice(0, 6), [music]);
  const { covers }  = useMusicCovers(musicItems);
  const featTrack   = musicItems[0];
  const gridTracks  = musicItems.slice(1, 4);
  const listTracks  = musicItems.slice(4, 6);

  const playTrack = (t) => play(t.id, t.link, { title: t.title, artist: t.artist, emoji: t.emoji });

  /* STYLE 캐러셀 — 카드 3벌 복제로 진짜 무한 슬라이드 + 드래그 */
  const styleCards = ootd.slice(0, 4);
  const rowRef = useRef(null);
  const setWRef = useRef(0);   /* 한 벌(4카드) 너비(px) */
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  /* 가운데 벌 [setW, 2·setW) 범위로 스크롤 위치를 보정(보이지 않는 점프) */
  const loopNormalize = () => {
    const el = rowRef.current;
    const setW = setWRef.current;
    if (!el || !setW) return;
    if (el.scrollLeft >= 2 * setW) el.scrollLeft -= setW;
    else if (el.scrollLeft < setW) el.scrollLeft += setW;
  };

  /* 한 벌 너비 측정 + 가운데 벌에서 시작 (테마/카드 변경·리사이즈 시 갱신) */
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const measure = (reset) => {
      const card = el.firstElementChild;
      if (!card) return;
      setWRef.current = (card.offsetWidth + 24 /* gap(sp-6) */) * styleCards.length;
      if (reset) el.scrollLeft = setWRef.current;
      else loopNormalize();
    };
    measure(true);
    const onResize = () => measure(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentTheme, styleCards.length]);

  const slideBy = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.6;
    loopNormalize();                                  /* 먼저 가운데 벌로 보정 */
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = rowRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e) => {
    const el = rowRef.current;
    if (drag.current.down) el?.releasePointerCapture?.(e.pointerId);
    drag.current.down = false;
    loopNormalize();                                  /* 드래그 끝나면 가운데 벌로 보정 */
  };
  /* 드래그 직후의 클릭(Link 이동)은 취소 */
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div>

      {/* ══ VISUAL HERO — 기존 메인 비주얼 유지 ══ */}
      <section className={styles.visual}>
        <div className={styles.visualInner}>
          <h1 className={styles.visualTitle}>{messages.home.title}</h1>
          <p className={styles.visualSub}>{messages.home.subtitle}</p>
        </div>

        <div className={styles.visualSelector}>
          <span className={styles.selectEyebrow}>Select Mood</span>
          <WeatherSelector variant="heroLg" />
        </div>
      </section>

      {/* ══ EDITORIAL SECTIONS — Stitch "Balanced Layout" ══ */}
      <div className={styles.sections}>

        {/* ── STYLE — 시네마틱 2-카드 ── */}
        <section className={styles.section}>
          <SectionHead eyebrow="STYLE" title={messages.ootd.title} to="/ootd" />

          <div className={styles.styleCarousel}>
            <div
              ref={rowRef}
              className={styles.styleRow}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onClickCapture={onClickCapture}
            >
              {[0, 1, 2].map((copy) =>
                styleCards.map((item, i) => (
                  <Link key={`${item.id}-${copy}`} to="/ootd" className={styles.slide} draggable={false}>
                    <div className={styles.media} style={{ background: mediaBg(item, contentTheme) }} />
                    <div className={styles.slideOverlay}>
                      <div className={styles.slideInner}>
                        <span className={styles.slideEyebrow}>
                          {i === 0 ? 'Featured Spread' : (item.brand || item.keywords?.[0])}
                        </span>
                        <h3 className={styles.slideTitle}>{item.title}</h3>
                        <span className={styles.slideBtn}>룩 보기 →</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => slideBy(-1)}
              aria-label="이전"
            >‹</button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => slideBy(1)}
              aria-label="다음"
            >›</button>
          </div>
        </section>

        {/* ── CUISINE — 에디토리얼 3-그리드 ── */}
        <section className={styles.section}>
          <SectionHead eyebrow="CUISINE" title={messages.food.title} to="/food" />

          <div className={styles.cuisineGrid}>
            {food.slice(0, 3).map(item => (
              <Link key={item.id} to="/food" className={styles.cuisineCard}>
                <div className={styles.cuisineImg}>
                  <div className={styles.media} style={{ background: mediaBg(item, contentTheme) }} />
                </div>
                <h3 className={styles.cuisineTitle}>{item.title}</h3>
                <p className={styles.cuisineSub}>{item.keywords?.slice(0, 2).join(' · ')}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ACTIVITY — 트립틱 콜라주 ── */}
        <section className={styles.section}>
          <SectionHead eyebrow="ACTIVITY" title={messages.activity.title} to="/activity" />

          <div className={styles.collage}>
            <div className={styles.colLeft}>
              {activity[1] && (
                <Link to="/activity" className={styles.actSide}>
                  <div className={styles.media} style={{ background: mediaBg(activity[1], contentTheme) }} />
                  <div className={styles.actOverlay}>
                    <span className={styles.actEyebrow}>{activity[1].area || activity[1].keywords?.[0]}</span>
                    <strong className={`${styles.actName} ${styles.actNameSm}`}>{activity[1].title}</strong>
                  </div>
                </Link>
              )}
            </div>

            <div className={styles.colCenter}>
              {activity[0] && (
                <Link to="/activity" className={styles.actCenter}>
                  <div className={styles.media} style={{ background: mediaBg(activity[0], contentTheme) }} />
                  <div className={`${styles.actOverlay} ${styles.actOverlayLg}`}>
                    <span className={`${styles.actEyebrow} ${styles.actEyebrowAccent}`}>HIGHLIGHT</span>
                    <strong className={`${styles.actName} ${styles.actNameLg}`}>{activity[0].title}</strong>
                    <p className={styles.actDescTxt}>{activity[0].desc}</p>
                  </div>
                </Link>
              )}
            </div>

            <div className={styles.colRight}>
              {activity[2] && (
                <Link to="/activity" className={styles.actSide}>
                  <div className={styles.media} style={{ background: mediaBg(activity[2], contentTheme) }} />
                  <div className={styles.actOverlay}>
                    <span className={styles.actEyebrow}>{activity[2].area || activity[2].keywords?.[0]}</span>
                    <strong className={`${styles.actName} ${styles.actNameSm}`}>{activity[2].title}</strong>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── MUSIC — 분할(피처드 + 그리드 + 리스트) ── */}
        <section className={styles.section}>
          <SectionHead eyebrow="MUSIC" title={messages.music.title} to="/music" />

          <div className={styles.musicSplit}>
            {/* 피처드 */}
            {featTrack && (
              <button
                type="button"
                className={`${styles.musicFeatured} ${playingId === featTrack.id ? styles.isPlaying : ''}`}
                onClick={() => playTrack(featTrack)}
              >
                {covers[featTrack.id]
                  ? <div className={styles.media} style={{ background: `url(${covers[featTrack.id]}) center/cover no-repeat` }} />
                  : <div className={styles.featEmoji}>{featTrack.emoji || '🎵'}</div>}
                <div className={styles.playOverlay}>
                  <span className="material-symbols-outlined" aria-hidden>play_arrow</span>
                  <span className={styles.playLabel}>PLAY NOW</span>
                </div>
                <div className={styles.musicFeatCaption}>
                  <span className={styles.musicFeatEyebrow}>Currently Curated</span>
                  <h3 className={styles.musicFeatTitle}>{featTrack.title}</h3>
                  <p className={styles.musicFeatSub}>{featTrack.artist}</p>
                </div>
              </button>
            )}

            {/* 우측: 소형 그리드 + 트랙 리스트 */}
            <div className={styles.musicRight}>
              <div className={styles.musicSmallGrid}>
                {gridTracks.map(t => (
                  <div key={t.id} className={styles.smallCard} onClick={() => playTrack(t)}>
                    <div className={styles.smallCover}>
                      {covers[t.id]
                        ? <div className={styles.media} style={{ background: `url(${covers[t.id]}) center/cover no-repeat` }} />
                        : <div className={styles.smallEmoji}>{t.emoji || '🎵'}</div>}
                    </div>
                    <h4 className={styles.smallTitle}>{t.title}</h4>
                    <p className={styles.smallGenre}>{t.genre}</p>
                  </div>
                ))}
              </div>

              <div className={styles.trackList}>
                {listTracks.map(t => (
                  <div key={t.id} className={styles.trackRow} onClick={() => playTrack(t)}>
                    <div className={styles.trackThumb}>
                      {covers[t.id]
                        ? <div className={styles.media} style={{ background: `url(${covers[t.id]}) center/cover no-repeat` }} />
                        : <div className={styles.trackThumbEmoji}>{t.emoji || '🎵'}</div>}
                    </div>
                    <div className={styles.trackInfo}>
                      <h4 className={styles.trackTitle}>{t.title}</h4>
                      <p className={styles.trackMeta}>{t.artist} · {t.genre}</p>
                    </div>
                    <span className={`material-symbols-outlined ${styles.trackIcon}`} aria-hidden>
                      {playingId === t.id ? 'equalizer' : 'play_arrow'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default HomePage;
