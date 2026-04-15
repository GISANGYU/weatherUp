# Skill: API 연동 (Phase 2) — 🔒 중간고사 완료 전까지 구현 금지

> **이 문서는 Phase 2 기말고사 참고용이다.**
> 사용자가 "중간고사 완료!" 라고 선언하기 전까지 이 문서의 어떤 코드도 실제 프로젝트에 작성하지 않는다.

## 목적
외부 API를 연동하여 실제 날씨 기반 7일 예보와 위치 기반 추천을 제공한다.

## 사용 API 목록
| 용도 | API | 키 관리 |
|------|-----|--------|
| 날씨 | OpenWeatherMap Forecast API | `.env` → `REACT_APP_WEATHER_KEY` |
| 지도/맛집 | Kakao Maps / Google Places | `.env` → `REACT_APP_MAP_KEY` |
| 위치 감지 | Browser Geolocation API | 별도 키 불필요 |

## 환경변수 설정 (`.env`)
```
REACT_APP_WEATHER_KEY=your_openweathermap_key
REACT_APP_MAP_KEY=your_kakao_or_google_key
```
> `.env`는 `.gitignore`에 반드시 포함할 것

## 날씨 API 호출 (`src/hooks/useWeatherForecast.js`)

```js
import { useState, useEffect } from 'react';
import { mapWeatherCode } from '../utils/mapWeatherCode';

function useWeatherForecast(lat, lon) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const mapped = data.list.map(item => ({
          date: item.dt_txt.slice(0, 10),
          weatherCode: mapWeatherCode(item.weather[0].main),
          temp: Math.round(item.main.temp)
        }));
        setForecast(mapped);
        setLoading(false);
      });
  }, [lat, lon]);

  return { forecast, loading };
}

export default useWeatherForecast;
```

## 날씨 코드 매핑 (`src/utils/mapWeatherCode.js`)

```js
export function mapWeatherCode(apiCode) {
  const map = {
    Clear: 'sunny',
    Clouds: 'cloudy',
    Rain: 'rainy', Drizzle: 'rainy', Thunderstorm: 'rainy',
    Snow: 'snowy'
  };
  return map[apiCode] || 'cloudy';
}
```

## Geolocation 위치 감지

```js
navigator.geolocation.getCurrentPosition(
  (pos) => { setLat(pos.coords.latitude); setLon(pos.coords.longitude); },
  () => { /* 기본 위치(서울) 사용 */ setLat(37.5665); setLon(126.9780); }
);
```

## 주의사항
- API 키는 절대 코드에 직접 작성하지 않는다
- API 호출은 커스텀 훅(`src/hooks/`)으로 분리
- 에러 상태(`error`)와 로딩 상태(`loading`) 반드시 처리
- Phase 1 정적 데이터 구조와 동일한 형태로 응답을 변환해 기존 컴포넌트 재사용
