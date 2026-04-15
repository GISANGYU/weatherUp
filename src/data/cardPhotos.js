/**
 * 카드 아이템 ID → Unsplash 사진 URL 매핑
 * 배경: 오버레이 그라디언트 + 이미지 조합
 */

const BASE = 'https://images.unsplash.com/photo-';
const Q    = '?auto=format&fit=crop&w=800&q=75';

const u = (id) => `${BASE}${id}${Q}`;

/* ──────────────── OVERLAY ────────────────
   각 카테고리 + 날씨 특성에 맞게 오버레이 강도 조절 */
const dark   = (url) => `linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.52) 100%), url(${url}) center/cover no-repeat`;
const medium = (url) => `linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 100%), url(${url}) center/cover no-repeat`;
const light  = (url) => `linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.25) 100%), url(${url}) center/cover no-repeat`;
const cold   = (url) => `linear-gradient(to bottom, rgba(20,40,80,0.18) 0%, rgba(10,20,50,0.55) 100%), url(${url}) center/cover no-repeat`;

/* ══════════════════════════════════════════
   SUNNY  ☀️
══════════════════════════════════════════ */

// ── OOTD ──
// so1: Summer Breeze — 흰 리넨 셔츠, 데님
// so2: Sunshine Dress — 플로럴 미디 드레스
// so3: City Walk — 폴로 셔츠, 치노
// so4: Sporty Chic — 크롭 후드, 레깅스
// so5: Linen Casual — 오버핏 리넨
// so6: Picnic Perfect — 체크 셔츠, 카고

// ── Food ──
// sf1: 아사이 볼    sf2: 니수아즈 샐러드  sf3: 클럽 샌드위치
// sf4: 레몬 파스타  sf5: 망고 빙수        sf6: 트로피컬 스무디 볼

// ── Activity ──
// sa1: 한강 자전거  sa2: 공원 피크닉  sa3: 남산 러닝
// sa4: 루프탑 카페  sa5: 식물원 탐방

/* ══════════════════════════════════════════
   CLOUDY  ⛅
══════════════════════════════════════════ */
// co1~co5: 레이어링 패션   cof1~cof5: 따뜻한 음식   ca1~ca4: 실내 활동

/* ══════════════════════════════════════════
   RAINY  🌧️
══════════════════════════════════════════ */
// ro1~ro4: 방수 패션   rf1~rf5: 비 오는 날 음식   rai1~rai4: 실내 활동

/* ══════════════════════════════════════════
   SNOWY  ❄️
══════════════════════════════════════════ */
// sno1~sno4: 방한 패션   snof1~snof5: 따뜻한 음식   snoa1~snoa4: 설경/실내

const CARD_PHOTOS = {

  /* ─── SUNNY · OOTD ─── */
  so1: medium(u('1523381210434-271e8be1f52b')), // 흰 셔츠 + 데님 여름룩
  so2: light(u('1515886657613-9f3515b0c78f')),  // 플로럴 드레스 여성
  so3: medium(u('1490481651871-ab68de25d43d')), // 도시 캐주얼 패션
  so4: medium(u('1571019613454-1cb2f99b2d8b')), // 스포티 활동복
  so5: light(u('1525507119028-ed4c629a60a3')),  // 리넨 여름 캐주얼
  so6: light(u('1529543544282-ea669407fca3')),  // 체크 셔츠 피크닉룩

  /* ─── SUNNY · FOOD ─── */
  sf1: light(u('1490645935967-10de6ba17061')),  // 아사이 볼 건강식
  sf2: light(u('1512621776951-a57141f2eefd')),  // 컬러풀 샐러드
  sf3: medium(u('1528735602780-2552fd46c7af')), // 클럽 샌드위치
  sf4: light(u('1621996346565-e3dbc646d9a9')),  // 레몬 파스타
  sf5: light(u('1567306226416-28f0efdc88ce')),  // 과일 디저트
  sf6: light(u('1511690656952-34342bb7c2f2')),  // 트로피컬 스무디 볼

  /* ─── SUNNY · ACTIVITY ─── */
  sa1: medium(u('1534787198879-4e3a07b59c80')), // 자전거 라이딩
  sa2: light(u('1506905925346-21bda4d32df4')),  // 공원 피크닉
  sa3: medium(u('1571008887538-b36bb32f4571')), // 러닝
  sa4: medium(u('1442512595331-e89e73853f31')), // 루프탑 카페
  sa5: light(u('1558618666-fcd25c85cd64')),     // 식물원 / 정원

  /* ─── CLOUDY · OOTD ─── */
  co1: medium(u('1434389677669-e08b4cac3105')), // 오버핏 니트 그레이
  co2: medium(u('1487222477894-8a7291967052')), // 베이지 트렌치코트
  co3: medium(u('1620799140408-edc6dcb6d633')), // 케이블 니트 코지
  co4: medium(u('1507003211169-0a1dd7228f2d')), // 화이트 셔츠 블레이저
  co5: medium(u('1474031317822-f51f48735ddd')), // 어스톤 레이어드

  /* ─── CLOUDY · FOOD ─── */
  cof1: dark(u('1547592166-23ac45744acd')),    // 소고기 덮밥 / 따뜻한 한 그릇
  cof2: medium(u('1565299624946-b28f40a0ae38')), // 크림 파스타
  cof3: medium(u('1509042239860-f550ce710b93')), // 라떼 / 카페 음료
  cof4: dark(u('1569050467447-ce54b3bbc37d')),  // 된장찌개류 국물
  cof5: medium(u('1547592166-23ac45744acd')),   // 수프 & 바게트

  /* ─── CLOUDY · ACTIVITY ─── */
  ca1: medium(u('1507003211169-0a1dd7228f2d')), // 독서 / 서점
  ca2: medium(u('1513475382585-d06e58bcb0e0')), // 미술관 전시
  ca3: light(u('1555041469-149851f2f4e1')),     // 홈 베이킹
  ca4: dark(u('1489599849927-2ee91cede3ba')),   // 영화관

  /* ─── RAINY · OOTD ─── */
  ro1: cold(u('1520013573886-3eb06d7d24d7')),  // 방수 트렌치코트 비
  ro2: cold(u('1523199455310-369f12b6d76e')),  // 투명 우산 도시 비
  ro3: cold(u('1514989771522-f7df5e51a1e2')),  // 후드 스트릿 패션
  ro4: cold(u('1554412933-514a83d2f3cd')),     // 다크 버건디 코트

  /* ─── RAINY · FOOD ─── */
  rf1: dark(u('1534483509719-3feaee7c30da')),  // 파전류 한국 음식
  rf2: dark(u('1569050467447-ce54b3bbc37d')),  // 칼국수 면 요리
  rf3: dark(u('1574484284602-3cc694d34d21')),  // 감자전 홈쿡
  rf4: dark(u('1547592166-23ac45744acd')),     // 순두부찌개 국물
  rf5: medium(u('1517093157641-ca0975da6e1b')), // 핫초코 따뜻한 음료

  /* ─── RAINY · ACTIVITY ─── */
  rai1: cold(u('1519389950473-47ba0277781c')),  // 카페 노트북 작업
  rai2: cold(u('1541961017774-22349e4a1262')),  // 전시 미디어아트
  rai3: cold(u('1493711662062-fa541adb3fc8')),  // 홈 씨네마
  rai4: cold(u('1513364776144-60967b0f800f')),  // 드로잉 스케치

  /* ─── SNOWY · OOTD ─── */
  sno1: cold(u('1548438294-1ad5d5f4f063')),    // 롱 패딩 방한
  sno2: cold(u('1515125538428-66eb52e00b0d')), // 퍼 코트 겨울
  sno3: cold(u('1620799140408-edc6dcb6d633')), // 청키 니트 코지
  sno4: cold(u('1517459528155-79a2f6a60e48')), // 스키 스포티

  /* ─── SNOWY · FOOD ─── */
  snof1: dark(u('1534483509719-3feaee7c30da')), // 떡볶이 / 포장마차
  snof2: dark(u('1547592166-23ac45744acd')),    // 설렁탕 국물
  snof3: medium(u('1509042239860-f550ce710b93')), // 핫 아메리카노
  snof4: medium(u('1589010588553-46e8e7c21788')), // 군고구마 간식
  snof5: dark(u('1547592166-23ac45744acd')),    // 순대국밥

  /* ─── SNOWY · ACTIVITY ─── */
  snoa1: cold(u('1491555103944-7c647fd857e6')), // 설경 산책
  snoa2: cold(u('1517459528155-79a2f6a60e48')), // 스키 / 스노보드
  snoa3: cold(u('1547483238958-b4b14cbad06b')), // 눈사람 눈놀이
  snoa4: medium(u('1507003211169-0a1dd7228f2d')), // 홈 독서
};

export default CARD_PHOTOS;
