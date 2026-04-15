import styles from './Footer.module.css';

const WEATHERS = [
  { mode: 'sunny',  icon: '☀️', label: '맑음' },
  { mode: 'cloudy', icon: '⛅', label: '흐림' },
  { mode: 'rainy',  icon: '🌧️', label: '비'   },
  { mode: 'snowy',  icon: '❄️', label: '눈'   },
];

function Footer({ weatherMode, setWeatherMode }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* 3D 로고 + 태그라인 */}
        <div className={styles.brand}>
          <span className={styles.logo3d}>WeatherUp</span>
          <p className={styles.tagline}>날씨로 완성하는 하루의 라이프스타일</p>
        </div>

        <div className={styles.divider} />

        {/* 날씨 빠른 전환 */}
        <div className={styles.weatherRow}>
          {WEATHERS.map(({ mode, icon, label }) => (
            <button
              key={mode}
              className={`${styles.weatherBtn} ${weatherMode === mode ? styles.active : ''}`}
              onClick={() => setWeatherMode(mode)}
              aria-label={label}
              title={label}
            >
              <span className={styles.weatherIcon}>{icon}</span>
              <span className={styles.weatherLabel}>{label}</span>
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* 카피라이트 */}
        <div className={styles.bottom}>
          <span className={styles.copy}>© 2026 WeatherUp</span>
          <span className={styles.sep}>·</span>
          <span className={styles.made}>Made by GISANGYU</span>
          <a
            href="https://github.com/GISANGYU/weatherUp"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub ↗
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
