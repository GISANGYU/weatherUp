/**
 * 카드 아이템 ID → Unsplash 사진 URL 매핑
 * 모든 ID는 실제 HTTP 200 응답 확인 완료
 * gradient overlay는 각 카드 컴포넌트의 CSS .imgOverlay 에서 처리
 */

const BASE = 'https://images.unsplash.com/photo-';
const Q    = '?auto=format&fit=crop&w=800&q=75';
const u = (id) => `${BASE}${id}${Q}`;

/* 로컬 패키징 이미지 (public/images 하위) — gh-pages base 자동 처리 */
const PUB = process.env.PUBLIC_URL || '';
const localOotdSunny  = (id) => `${PUB}/images/ootd/sunny/${id}.jpg`;
const localOotdCloudy = (id) => `${PUB}/images/ootd/cloudy/${id}.jpg`;
const localOotdRainy  = (id) => `${PUB}/images/ootd/rainy/${id}.jpg`;
const localOotdSnowy  = (id) => `${PUB}/images/ootd/snowy/${id}.jpg`;
const localFoodSunny  = (id) => `${PUB}/images/food/sunny/${id}.jpg`;
const localFoodCloudy = (id) => `${PUB}/images/food/cloudy/${id}.jpg`;
const localFoodRainy  = (id) => `${PUB}/images/food/rainy/${id}.jpg`;
const localFoodSnowy  = (id) => `${PUB}/images/food/snowy/${id}.jpg`;

const CARD_PHOTOS = {

  /* ══ SUNNY · OOTD ══════════════════════════════════════ */
  so1: localOotdSunny('so1'),
  so2: localOotdSunny('so2'),
  so3: localOotdSunny('so3'),
  so4: localOotdSunny('so4'),
  so5: localOotdSunny('so5'),
  so6: localOotdSunny('so6'),

  /* ══ SUNNY · FOOD ═══════════════════════════════════════ */
  sf1: localFoodSunny('sf1'),
  sf2: localFoodSunny('sf2'),
  sf3: localFoodSunny('sf3'),
  sf4: localFoodSunny('sf4'),
  sf5: localFoodSunny('sf5'),
  sf6: localFoodSunny('sf6'),

  /* ══ SUNNY · ACTIVITY ═══════════════════════════════════ */
  sa1: u('1530549387789-4c161c0b6d57'),  // 자전거 라이딩 야외 ✓fix
  sa2: u('1506905925346-21bda4d32df4'),  // 공원 피크닉 돗자리
  sa3: u('1571008887538-b36bb32f4571'),  // 러닝 조깅
  sa4: u('1442512595331-e89e73853f31'),  // 루프탑 카페
  sa5: u('1558618666-fcd25c85cd64'),     // 식물원 정원 산책

  /* ══ CLOUDY · OOTD ══════════════════════════════════════ */
  co1: localOotdCloudy('co1'),
  co2: localOotdCloudy('co2'),
  co3: localOotdCloudy('co3'),
  co4: localOotdCloudy('co4'),
  co5: localOotdCloudy('co5'),

  /* ══ CLOUDY · FOOD ═══════════════════════════════════════ */
  cof1: localFoodCloudy('cof1'),
  cof2: localFoodCloudy('cof2'),
  cof3: localFoodCloudy('cof3'),
  cof4: localFoodCloudy('cof4'),
  cof5: localFoodCloudy('cof5'),

  /* ══ CLOUDY · ACTIVITY ══════════════════════════════════ */
  ca1: u('1456513080510-7bf3a84b82f8'),  // 독립서점 책 ✓fix
  ca2: u('1513475382585-d06e58bcb0e0'),  // 미술관 전시
  ca3: u('1481627834876-b7833e8f5570'),  // 홈 베이킹 코지 실내 ✓fix
  ca4: u('1489599849927-2ee91cede3ba'), // 영화관

  /* ══ RAINY · OOTD ════════════════════════════════════════ */
  ro1: localOotdRainy('ro1'),
  ro2: localOotdRainy('ro2'),
  ro3: localOotdRainy('ro3'),
  ro4: localOotdRainy('ro4'),

  /* ══ RAINY · FOOD ════════════════════════════════════════ */
  rf1: localFoodRainy('rf1'),
  rf2: localFoodRainy('rf2'),
  rf3: localFoodRainy('rf3'),
  rf4: localFoodRainy('rf4'),
  rf5: localFoodRainy('rf5'),

  /* ══ RAINY · ACTIVITY ════════════════════════════════════ */
  rai1: u('1519389950473-47ba0277781c'), // 카페 창가 노트북
  rai2: u('1541961017774-22349e4a1262'), // 실내 미디어아트 전시
  rai3: u('1493711662062-fa541adb3fc8'), // 홈 씨네마 담요
  rai4: u('1513364776144-60967b0f800f'), // 드로잉 스케치

  /* ══ SNOWY · OOTD ════════════════════════════════════════ */
  sno1: localOotdSnowy('sno1'),
  sno2: localOotdSnowy('sno2'),
  sno3: localOotdSnowy('sno3'),
  sno4: localOotdSnowy('sno4'),

  /* ══ SNOWY · FOOD ════════════════════════════════════════ */
  snof1: localFoodSnowy('snof1'),
  snof2: localFoodSnowy('snof2'),
  snof3: localFoodSnowy('snof3'),
  snof4: localFoodSnowy('snof4'),
  snof5: localFoodSnowy('snof5'),

  /* ══ SNOWY · ACTIVITY ════════════════════════════════════ */
  snoa1: u('1551698618-1dfc6d674176'),   // 설경 산책 눈 ✓fix
  snoa2: u('1522771739844-6a9f6d5f14af'), // 스키 스노보드 ✓fix
  snoa3: u('1510627498534-cf7e9002facc'), // 눈사람 눈놀이 ✓fix
  snoa4: u('1481627834876-b7833e8f5570'), // 홈 독서 이불 포근
};

export default CARD_PHOTOS;
