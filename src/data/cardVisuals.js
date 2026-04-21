import CARD_PHOTOS from './cardPhotos';

/* 테마별 폴백 단색 팔레트 — 흰 텍스트 대비 확보 */
const COLORS = {
  sunny:  ['#C8860A', '#2A6496', '#B34040', '#4A8C30', '#8C5A2A', '#1A5C80', '#7A3A8C', '#3A6A50'],
  cloudy: ['#5E6E80', '#7A6E60', '#607060', '#6E6070', '#506070', '#7A7060', '#506858', '#685868'],
  rainy:  ['#1A2F48', '#162840', '#1C3050', '#142038', '#1E3258', '#12263C', '#1A2840', '#182E4A'],
  snowy:  ['#3A72B0', '#4A5E8C', '#5A6898', '#325E98', '#4060A0', '#3A5898', '#4A6888', '#305890'],
};

const HEIGHTS = [200, 160, 240, 180, 220, 160, 200, 180, 240, 160];

export function getCardVisuals(id = '', weatherMode = 'sunny') {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pool = COLORS[weatherMode] ?? COLORS.sunny;

  const photo    = CARD_PHOTOS[id];
  const fallback = pool[hash % pool.length];
  return {
    // 이미지 로드 실패 시 폴백 단색이 보이도록 레이어 추가
    grad: photo ? `url(${photo}) center/cover no-repeat, ${fallback}` : fallback,
    imgH: HEIGHTS[hash % HEIGHTS.length],
  };
}
