import SunnyBackground  from './SunnyBackground';
import CloudyBackground from './CloudyBackground';
import RainyBackground  from './RainyBackground';
import SnowyBackground  from './SnowyBackground';

function WeatherBackground({ weatherMode }) {
  return (
    <div
      key={weatherMode}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'bgFadeIn 0.7s ease',
      }}
    >
      {weatherMode === 'sunny'  && <SunnyBackground />}
      {weatherMode === 'cloudy' && <CloudyBackground />}
      {weatherMode === 'rainy'  && <RainyBackground />}
      {weatherMode === 'snowy'  && <SnowyBackground />}
    </div>
  );
}

export default WeatherBackground;
