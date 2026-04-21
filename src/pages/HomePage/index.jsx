import { Link } from 'react-router-dom';
import weatherData         from '../../data/weatherData';
import { getCardVisuals }  from '../../data/cardVisuals';
import HeroWeatherSelector from '../../components/HeroWeatherSelector';
import MusicSection        from '../../components/MusicSection';
import WeatherIcon         from '../../components/WeatherIcon';
import styles from './HomePage.module.css';

function HomePage({ weatherMode, setWeatherMode }) {
  const { messages, ootd, food, activity, music } = weatherData[weatherMode];

  return (
    <div>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Today's Weather</p>
          <div className={`${styles.heroIcon} ${styles[`heroIcon_${weatherMode}`]}`}>
            <WeatherIcon mode={weatherMode} size={96} />
          </div>
          <h1 className={styles.heroTitle}>{messages.home.title}</h1>
          <p className={styles.heroSub}>{messages.home.subtitle}</p>
          <HeroWeatherSelector
            weatherMode={weatherMode}
            setWeatherMode={setWeatherMode}
          />
        </div>
      </section>

      {/* ══ SECTIONS ══════════════════════════════════════ */}
      <div className={styles.sections}>

        {/* ── OOTD ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Style</div>
            <h2 className={styles.sectionTitle}>오늘의 코디</h2>
          </div>

          <div className={styles.ootdGrid}>
            {/* 피처드 카드 */}
            {(() => {
              const item = ootd[0];
              const { grad } = getCardVisuals(item.id, weatherMode);
              return (
                <Link to="/ootd" className={styles.featuredCard} style={{ background: grad }}>
                  <div className={styles.featuredOverlay}>
                    <span className={styles.featuredEye}>Featured Look</span>
                    <h3 className={styles.featuredTitle}>{item.title}</h3>
                    <p className={styles.featuredDesc}>{item.desc}</p>
                    <div className={styles.featuredKws}>
                      {item.keywords.slice(0, 3).map(kw => (
                        <span key={kw} className={styles.featuredKw}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* 서브 카드 3장 */}
            <div className={styles.ootdSubs}>
              {ootd.slice(1, 4).map(item => {
                const { grad } = getCardVisuals(item.id, weatherMode);
                return (
                  <Link key={item.id} to="/ootd" className={styles.subCard} style={{ background: grad }}>
                    <div className={styles.subOverlay}>
                      <span className={styles.subTitle}>{item.title}</span>
                      <div className={styles.subKws}>
                        {item.keywords.slice(0, 2).map(kw => (
                          <span key={kw}>{kw}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FOOD ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Cuisine</div>
            <h2 className={styles.sectionTitle}>오늘의 음식</h2>
            <Link to="/food" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <div className={styles.foodGrid}>
            {food.slice(0, 4).map(item => {
              const { grad } = getCardVisuals(item.id, weatherMode);
              const bg = item.imageUrl
                ? `url(${item.imageUrl}) center/cover no-repeat`
                : grad;
              return (
                <Link key={item.id} to="/food" className={styles.foodCard} style={{ background: bg }}>
                  <div className={styles.foodOverlay}>
                    <strong className={styles.foodTitle}>{item.title}</strong>
                    <p className={styles.foodSub}>{item.keywords.slice(0, 2).join(' · ')}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── ACTIVITY ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Activity</div>
            <h2 className={styles.sectionTitle}>오늘 뭐할까?</h2>
            <Link to="/activity" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <div className={styles.actGrid}>
            {activity.slice(0, 2).map(item => {
              const { grad } = getCardVisuals(item.id, weatherMode);
              return (
                <Link key={item.id} to="/activity" className={styles.actCard} style={{ background: grad }}>
                  <div className={styles.actOverlay}>
                    <h3 className={styles.actTitle}>{item.title}</h3>
                    <p className={styles.actDesc}>{item.desc}</p>
                    {item.meta && (
                      <div className={styles.actMeta}>
                        <span>{item.meta.cost}</span>
                        <span className={styles.actDot} />
                        <span>{item.meta.duration}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── MUSIC ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Music</div>
            <h2 className={styles.sectionTitle}>오늘의 플레이리스트</h2>
            <Link to="/music" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <MusicSection
            items={music}
            limit={6}
            className={styles.musicGrid}
          />
        </section>

      </div>
    </div>
  );
}

export default HomePage;
