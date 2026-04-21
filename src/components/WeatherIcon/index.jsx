/* Microsoft Fluent Emoji 3D — Apple-tier 3D renders (MIT)
   https://github.com/microsoft/fluentui-emoji              */
const BASE = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets';

const ICON_MAP = {
  sunny:  `${BASE}/Sun/3D/sun_3d.png`,
  cloudy: `${BASE}/Sun%20behind%20large%20cloud/3D/sun_behind_large_cloud_3d.png`,
  rainy:  `${BASE}/Cloud%20with%20rain/3D/cloud_with_rain_3d.png`,
  snowy:  `${BASE}/Snowflake/3D/snowflake_3d.png`,
};

function WeatherIcon({ mode, size = 24 }) {
  const src = ICON_MAP[mode];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={mode}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

export default WeatherIcon;
