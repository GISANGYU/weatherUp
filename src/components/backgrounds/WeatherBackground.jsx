import SunnyBackground        from './SunnyBackground';
import PartlyCloudyBackground from './PartlyCloudyBackground';
import CloudyBackground       from './CloudyBackground';
import RainyBackground        from './RainyBackground';
import StormyBackground       from './StormyBackground';
import SnowyBackground        from './SnowyBackground';
import DustyBackground        from './DustyBackground';

const BG_BY_THEME = {
  'sunny':         SunnyBackground,
  'partly-cloudy': PartlyCloudyBackground,
  'cloudy':        CloudyBackground,
  'rainy':         RainyBackground,
  'stormy':        StormyBackground,
  'snowy':         SnowyBackground,
  'dusty':         DustyBackground,
};

function WeatherBackground({ theme }) {
  const Bg = BG_BY_THEME[theme] || SunnyBackground;

  return (
    <div
      key={theme}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'bgFadeIn 0.7s ease',
      }}
    >
      <Bg />
    </div>
  );
}

export default WeatherBackground;
