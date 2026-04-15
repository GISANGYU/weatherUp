import { Link } from 'react-router-dom';
import weatherData           from '../../data/weatherData';
import { getCardVisuals }    from '../../data/cardVisuals';
import HeroWeatherSelector   from '../../components/HeroWeatherSelector';
import styles from './HomePage.module.css';

function HomePage({ weatherMode, setWeatherMode }) {
  const { messages, ootd, food, activity } = weatherData[weatherMode];

  return (
    <div>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>오늘의 날씨</p>
          <h1 className={styles.heroTitle}>{messages.home.title}</h1>
          <p  className={styles.heroSub}>{messages.home.subtitle}</p>
          <HeroWeatherSelector
            weatherMode={weatherMode}
            setWeatherMode={setWeatherMode}
          />
        </div>
      </section>

      {/* ══ CONTENT SECTIONS ══════════════════════════════ */}
      <div className={styles.sections}>

        {/* ── Section 1: 오늘의 코디 ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEye}>Style</p>
              <h2 className={styles.sectionTitle}>오늘의 코디</h2>
            </div>
            <Link to="/ootd" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <div className={styles.editGrid}>
            {/* 피처드 메인 카드 */}
            <div className={styles.editMain}>
              <div
                className={styles.editMainImg}
                style={{ background: getCardVisuals(ootd[0].id, weatherMode).grad }}
              >
                <span className={styles.editBgEmoji}>{ootd[0].emoji}</span>
                <div className={styles.editShimmer} />
              </div>
              <div className={styles.editOverlay}>
                <h3 className={styles.editMainTitle}>{ootd[0].title}</h3>
                <p  className={styles.editMainDesc}>{ootd[0].desc}</p>
                <div className={styles.editMainKws}>
                  {ootd[0].keywords.map(kw => (
                    <span key={kw}>#{kw}</span>
                  ))}
                </div>
              </div>
              {ootd[0].badges?.[0] && (
                <span className={styles.editTopBadge}>{ootd[0].badges[0]}</span>
              )}
            </div>

            {/* 사이드 카드 2장 */}
            <div className={styles.editSide}>
              {ootd.slice(1, 3).map(item => {
                const { grad } = getCardVisuals(item.id, weatherMode);
                return (
                  <div key={item.id} className={styles.editSideCard}>
                    <div className={styles.editSideImg} style={{ background: grad }}>
                      <span className={styles.sideEmoji}>{item.emoji}</span>
                      <div className={styles.editShimmer} />
                      <span className={styles.sideEmojiBadge}>{item.emoji}</span>
                    </div>
                    <div className={styles.editSideBody}>
                      <h4 className={styles.editSideTitle}>{item.title}</h4>
                      <p  className={styles.editSideDesc}>{item.desc}</p>
                      <div className={styles.editSideKws}>
                        {item.keywords.slice(0, 3).map(kw => (
                          <span key={kw}>#{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 2: 오늘의 맛 ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEye}>Cuisine</p>
              <h2 className={styles.sectionTitle}>오늘의 맛</h2>
            </div>
            <Link to="/food" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <div className={styles.foodRow}>
            {food.slice(0, 4).map(item => {
              const { grad } = getCardVisuals(item.id, weatherMode);
              return (
                <div key={item.id} className={styles.foodCard}>
                  <div className={styles.foodImg} style={{ background: grad }}>
                    <span className={styles.foodBgEmoji}>{item.emoji}</span>
                    <div className={styles.editShimmer} />
                    <span className={styles.foodEmojiBadge}>{item.emoji}</span>
                  </div>
                  <div className={styles.foodBody}>
                    <strong className={styles.foodTitle}>{item.title}</strong>
                    <p className={styles.foodMeta}>
                      {item.keywords.slice(0, 2).join(' · ')}
                    </p>
                    {item.badges?.[0] && (
                      <span className={styles.foodBadge}>{item.badges[0]}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 3: 오늘 뭐할까? ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEye}>Activity</p>
              <h2 className={styles.sectionTitle}>오늘 뭐할까?</h2>
            </div>
            <Link to="/activity" className={styles.seeAll}>전체보기 →</Link>
          </div>

          <div className={styles.actRow}>
            {activity.slice(0, 2).map(item => {
              const { grad } = getCardVisuals(item.id, weatherMode);
              return (
                <div key={item.id} className={styles.actCard}>
                  <div className={styles.actImg} style={{ background: grad }}>
                    <span className={styles.actBgEmoji}>{item.emoji}</span>
                    <div className={styles.editShimmer} />
                    <span className={styles.actEmojiBadge}>{item.emoji}</span>
                  </div>
                  <div className={styles.actBody}>
                    <h3 className={styles.actTitle}>{item.title}</h3>
                    <p  className={styles.actDesc}>{item.desc}</p>
                    {item.badges && (
                      <div className={styles.actTags}>
                        {item.badges.map(b => (
                          <span key={b} className={styles.actTag}>{b}</span>
                        ))}
                      </div>
                    )}
                    <div className={styles.actKws}>
                      {item.keywords.map(kw => (
                        <span key={kw}>#{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>{/* end .sections */}
    </div>
  );
}

export default HomePage;
