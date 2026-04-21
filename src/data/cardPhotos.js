/**
 * 카드 아이템 ID → 로컬 이미지 경로 매핑 (HomePage featured 카드 배경용)
 * gradient overlay는 각 카드 컴포넌트의 CSS .imgOverlay 에서 처리
 */

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
const localActSunny   = (id) => `${PUB}/images/activity/sunny/${id}.jpg`;
const localActCloudy  = (id) => `${PUB}/images/activity/cloudy/${id}.jpg`;
const localActRainy   = (id) => `${PUB}/images/activity/rainy/${id}.jpg`;
const localActSnowy   = (id) => `${PUB}/images/activity/snowy/${id}.jpg`;

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
  sa1: localActSunny('sa1'),
  sa2: localActSunny('sa2'),
  sa3: localActSunny('sa3'),
  sa4: localActSunny('sa4'),
  sa5: localActSunny('sa5'),

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
  ca1: localActCloudy('ca1'),
  ca2: localActCloudy('ca2'),
  ca3: localActCloudy('ca3'),
  ca4: localActCloudy('ca4'),

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
  rai1: localActRainy('rai1'),
  rai2: localActRainy('rai2'),
  rai3: localActRainy('rai3'),
  rai4: localActRainy('rai4'),

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
  snoa1: localActSnowy('snoa1'),
  snoa2: localActSnowy('snoa2'),
  snoa3: localActSnowy('snoa3'),
  snoa4: localActSnowy('snoa4'),
};

export default CARD_PHOTOS;
