import styles from './WeatherBanner.module.css';
import weatherData from '../../data/weatherData';

const CATEGORY_ICON = { ootd: '👗', food: '🍽️', activity: '🎯' };

function WeatherBanner({ weatherMode, category }) {
  const msg = weatherData[weatherMode].messages[category];
  return (
    <div className={styles.banner}>
      <span className={styles.icon}>{CATEGORY_ICON[category]}</span>
      <div>
        <h1 className={styles.title}>{msg.title}</h1>
        <p  className={styles.sub}>{msg.subtitle}</p>
      </div>
    </div>
  );
}

export default WeatherBanner;
