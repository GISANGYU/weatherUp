import { LuSun, LuCloud, LuCloudRain, LuSnowflake } from 'react-icons/lu';
import styles from './WeatherPicker.module.css';

const MODES = [
  { mode: 'sunny',  label: '맑음', Icon: LuSun       },
  { mode: 'cloudy', label: '흐림', Icon: LuCloud     },
  { mode: 'rainy',  label: '비',   Icon: LuCloudRain },
  { mode: 'snowy',  label: '눈',   Icon: LuSnowflake },
];

function WeatherPicker({ weatherMode, setWeatherMode }) {
  return (
    <div className={styles.wrap} role="group" aria-label="날씨 선택">
      {MODES.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          className={`${styles.btn} ${weatherMode === mode ? styles.active : ''}`}
          onClick={() => setWeatherMode(mode)}
          title={label}
          aria-label={label}
          aria-pressed={weatherMode === mode}
        >
          <span className={styles.icon}>
            <Icon size={16} strokeWidth={1.9} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default WeatherPicker;
