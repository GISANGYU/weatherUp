import WeatherBanner from '../../components/WeatherBanner';
import MusicSection  from '../../components/MusicSection';
import weatherData   from '../../data/weatherData';
import styles        from './MusicPage.module.css';

function MusicPage({ weatherMode }) {
  const items   = weatherData[weatherMode].music;
  const popular = items.slice(0, 12);
  const radio   = items.slice(12);

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="music" />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>인기 앨범 및 싱글</h2>
        <MusicSection items={popular} className={styles.grid} />
      </section>

      {radio.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>인기 라디오</h2>
          <MusicSection items={radio} className={styles.grid} />
        </section>
      )}
    </div>
  );
}

export default MusicPage;
