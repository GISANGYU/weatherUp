import { useMemo }         from 'react';
import OutfitCard         from '../../components/OutfitCard';
import FoodCard           from '../../components/FoodCard';
import ActivityCard       from '../../components/ActivityCard';
import MusicCard          from '../../components/MusicCard';
import { useMusicContext } from '../../context/MusicContext';
import { useMusicCovers }  from '../../hooks/useMusicCovers';
import weatherData        from '../../data/weatherData';
import { buildDailySchedule } from '../../data/dailySchedule';
import styles from './DailyPage.module.css';

/* 무드 한 번 선택 → 아침/한낮/저녁 12카드가 한 프레임에 동기화.
   currentTheme(=weatherMode) 한 값이 화면 전부를 결정한다는 작품 메시지의 결정체. */
function DailyPage({ weatherMode }) {
  const data     = weatherData[weatherMode];
  /* weatherMode 가 바뀔 때만 재계산 — useMusicCovers 에 넘기는 배열의
     참조를 안정화해야 covers setState ↔ 재렌더 무한 루프를 막는다. */
  const schedule   = useMemo(() => buildDailySchedule(data), [data]);
  const musicItems = useMemo(() => schedule.map(s => s.music).filter(Boolean), [schedule]);

  const { play, playingId } = useMusicContext();
  const { covers }          = useMusicCovers(musicItems);

  const msg = data.messages.home;

  return (
    <div className="container">
      <header className={styles.intro}>
        <span className={styles.kicker}>DAILY · 무드로 짜는 하루</span>
        <h1 className={styles.title}>{msg.title}</h1>
        <p className={styles.subtitle}>
          한 가지 무드가 아침부터 밤까지 옷·음식·액티비티·음악을 모두 결정해요
        </p>
      </header>

      <div className={styles.timeline}>
        {schedule.map(slot => (
          <section key={slot.key} className={styles.slot}>
            <div className={styles.slotHead}>
              <span className={styles.slotIcon}>{slot.icon}</span>
              <div className={styles.slotLabels}>
                <h2 className={styles.slotLabel}>{slot.label}</h2>
                <span className={styles.slotMeta}>{slot.ko} · {slot.range}</span>
              </div>
              <span className={styles.slotDesc}>{slot.desc}</span>
            </div>

            <div className={styles.grid}>
              <div className={styles.axis}>
                <span className={styles.axisTag}>OOTD</span>
                {slot.ootd && <OutfitCard item={slot.ootd} weatherMode={weatherMode} />}
              </div>

              <div className={styles.axis}>
                <span className={styles.axisTag}>FOOD</span>
                {slot.food && <FoodCard item={slot.food} weatherMode={weatherMode} />}
              </div>

              <div className={styles.axis}>
                <span className={styles.axisTag}>ACTIVITY</span>
                {slot.activity && <ActivityCard item={slot.activity} weatherMode={weatherMode} />}
              </div>

              <div className={styles.axis}>
                <span className={styles.axisTag}>MUSIC</span>
                {slot.music && (
                  <MusicCard
                    item={slot.music}
                    cover={covers[slot.music.id]}
                    isPlaying={playingId === slot.music.id}
                    onPlay={() => play(slot.music.id, slot.music.link, {
                      title:  slot.music.title,
                      artist: slot.music.artist,
                      emoji:  slot.music.emoji,
                    })}
                  />
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default DailyPage;
