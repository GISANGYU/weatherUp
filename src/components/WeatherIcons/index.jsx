/* =========================================================================
   WeatherIcons — 테마 ID 로 적절한 SVG 컴포넌트 선택
   ---------------------------------------------------------------------------
   7 테마 모두 구현 완료. 각 테마는 카드 전체를 채우는 상시 애니메이션 씬.
   ========================================================================= */

import Sunny        from './Sunny';
import Snowy        from './Snowy';
import PartlyCloudy from './PartlyCloudy';
import Dusty        from './Dusty';
import Cloudy       from './Cloudy';
import Rainy        from './Rainy';
import Stormy       from './Stormy';
import Placeholder  from './Placeholder';
import './icons.css';

const ICONS = {
  'sunny':         Sunny,
  'snowy':         Snowy,
  'partly-cloudy': PartlyCloudy,
  'dusty':         Dusty,
  'cloudy':        Cloudy,
  'rainy':         Rainy,
  'stormy':        Stormy,
};

export default function WeatherIcon({ theme }) {
  const Component = ICONS[theme] || Placeholder;
  return <Component />;
}
