# Skill: 데이터 구조

## 목적
날씨 상태별 콘텐츠 데이터를 일관된 구조로 관리한다.

## Phase 1 — 정적 데이터 (`src/data/weatherData.js`)

```js
const weatherData = {
  sunny: {
    fashion: {
      message: "맑고 화창한 날, 가볍고 밝은 옷차림을 추천해요.",
      keywords: ["반팔", "선글라스", "운동화"],
      badges: ["선글라스 필수", "자외선 차단"]
    },
    food: {
      message: "상큼한 날씨엔 가벼운 한 끼가 잘 어울려요.",
      keywords: ["샐러드", "샌드위치", "아이스커피"]
    },
    activity: {
      message: "오늘은 밖으로 나가기 딱 좋은 날이에요.",
      keywords: ["공원 산책", "자전거", "피크닉"],
      type: "outdoor"
    }
  },
  cloudy: {
    fashion: {
      message: "구름 낀 날엔 레이어링으로 체온을 조절해요.",
      keywords: ["가디건", "긴팔", "스니커즈"],
      badges: ["레이어링 추천"]
    },
    food: {
      message: "차분한 날씨엔 따뜻한 한 끼가 잘 어울려요.",
      keywords: ["국밥", "라멘", "따뜻한 음료"]
    },
    activity: {
      message: "책 한 권과 함께 여유로운 하루를 보내보세요.",
      keywords: ["카페", "독서", "산책"],
      type: "indoor"
    }
  },
  rainy: {
    fashion: {
      message: "비 소식이 있으니 우산과 방수 아우터를 챙겨보세요.",
      keywords: ["우산", "방수 자켓", "긴바지"],
      badges: ["우산 필수", "방수 신발 추천"]
    },
    food: {
      message: "비 오는 날엔 따뜻하고 바삭한 음식이 잘 어울려요.",
      keywords: ["파전", "칼국수", "국밥"]
    },
    activity: {
      message: "오늘은 실내에서 차분한 시간을 보내는 것이 좋아요.",
      keywords: ["카페", "영화관", "전시"],
      type: "indoor"
    }
  },
  snowy: {
    fashion: {
      message: "눈 오는 날엔 보온에 집중한 레이어링을 추천해요.",
      keywords: ["패딩", "목도리", "방한 부츠"],
      badges: ["미끄럼 주의", "보온 필수"]
    },
    food: {
      message: "포근하게 몸을 녹여줄 뜨거운 음식이 딱이에요.",
      keywords: ["떡볶이", "순대국", "핫초코"]
    },
    activity: {
      message: "눈 쌓인 풍경을 즐기거나 따뜻하게 실내에서 쉬어요.",
      keywords: ["설경 감상", "보드게임", "홈카페"],
      type: "mixed"
    }
  }
};

export default weatherData;
```

## Phase 2 — API 응답 데이터 구조

```js
// 날씨 API 응답 (날짜별)
[
  { date: "2025-04-14", weatherCode: "sunny",  temp: 22 },
  { date: "2025-04-15", weatherCode: "cloudy", temp: 18 },
  { date: "2025-04-16", weatherCode: "rainy",  temp: 15 },
]

// 맛집 API 응답 (Kakao/Google Places)
[
  { id: 1, name: "식당명", address: "주소", category: "한식", rating: 4.5, distance: "200m" },
]
```

## 데이터 접근 패턴

```js
// 날씨 상태에 맞는 데이터 가져오기
import weatherData from '../data/weatherData';

const { fashion, food, activity } = weatherData[weatherMode];
```

## 주의사항
- `weatherCode`는 반드시 `sunny / cloudy / rainy / snowy` 4가지 중 하나
- API 날씨 코드가 다른 경우 이 4가지로 매핑하는 유틸 함수(`mapWeatherCode`)를 별도 작성
- 정적 데이터는 `src/data/`에만 위치, 컴포넌트 내부에 하드코딩 금지
