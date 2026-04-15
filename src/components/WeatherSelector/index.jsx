import styles from './WeatherSelector.module.css';

const BUTTONS = [
  { mode: 'sunny',  label: '맑음', icon: '☀️' },
  { mode: 'cloudy', label: '흐림', icon: '⛅' },
  { mode: 'rainy',  label: '비',   icon: '🌧️' },
  { mode: 'snowy',  label: '눈',   icon: '❄️' },
];

function WeatherSelector({ weatherMode, setWeatherMode }) {
  return (
    <div className={styles.wrapper}>
      {BUTTONS.map(({ mode, label, icon }) => {
        const isActive = weatherMode === mode;
        return (
          <button
            key={mode}
            className={`${styles.btn} ${isActive ? styles.active : ''}`}
            onClick={() => setWeatherMode(mode)}
            aria-pressed={isActive}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default WeatherSelector;
