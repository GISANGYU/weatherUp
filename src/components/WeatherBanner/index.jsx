import styles from './WeatherBanner.module.css';
import weatherData from '../../data/weatherData';

function WeatherBanner({ weatherMode, category }) {
  const msg = weatherData[weatherMode].messages[category];
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>{msg.title}</h1>
      <p  className={styles.sub}>{msg.subtitle}</p>
    </div>
  );
}

export default WeatherBanner;
