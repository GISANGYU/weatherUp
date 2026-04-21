import HeroWeatherSelector from '../HeroWeatherSelector';
import styles from './StickyWeatherBar.module.css';

function StickyWeatherBar({ visible, weatherMode, setWeatherMode }) {
  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
      <HeroWeatherSelector weatherMode={weatherMode} setWeatherMode={setWeatherMode} />
    </div>
  );
}

export default StickyWeatherBar;
