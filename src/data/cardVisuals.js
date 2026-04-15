import CARD_PHOTOS from './cardPhotos';

/* 날씨별 그라디언트 풀 — 사진 없을 때 폴백 */
const GRADS = {
  sunny: [
    'linear-gradient(135deg, #FFD89B 0%, #F4623A 100%)',
    'linear-gradient(135deg, #FFC3E1 0%, #FF6B97 100%)',
    'linear-gradient(135deg, #C2E9FB 0%, #A1C4FD 100%)',
    'linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)',
    'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
    'linear-gradient(135deg, #FCCB90 0%, #D57EEB 100%)',
    'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    'linear-gradient(135deg, #F5AF19 0%, #F12711 100%)',
  ],
  cloudy: [
    'linear-gradient(135deg, #BDC3C7 0%, #2C3E50 100%)',
    'linear-gradient(135deg, #8E9EAB 0%, #EEF2F3 100%)',
    'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)',
    'linear-gradient(135deg, #636FA4 0%, #E8CBC0 100%)',
    'linear-gradient(135deg, #373B44 0%, #4286F4 100%)',
    'linear-gradient(135deg, #6A3093 0%, #A044FF 100%)',
    'linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)',
    'linear-gradient(135deg, #654EA3 0%, #EAAFC8 100%)',
  ],
  rainy: [
    'linear-gradient(135deg, #1A1A2E 0%, #4A9EFF 100%)',
    'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
    'linear-gradient(135deg, #0F0C29 0%, #302B63 100%)',
    'linear-gradient(135deg, #1C3A5E 0%, #7EC8FF 100%)',
    'linear-gradient(135deg, #0D324D 0%, #7F5A83 100%)',
    'linear-gradient(135deg, #2E4057 0%, #048A81 100%)',
    'linear-gradient(135deg, #141E30 0%, #243B55 100%)',
    'linear-gradient(135deg, #16213E 0%, #0F3460 100%)',
  ],
  snowy: [
    'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
    'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
    'linear-gradient(135deg, #EAF0FF 0%, #C5CAE9 100%)',
    'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    'linear-gradient(135deg, #FFF8E1 0%, #E1F5FE 100%)',
    'linear-gradient(135deg, #FAFAFA 0%, #CFD8DC 100%)',
    'linear-gradient(135deg, #E0F4FF 0%, #A8D8EA 100%)',
  ],
};

/* 카드 이미지 높이 순환 배열 — Masonry에서 자연스럽게 높낮이 생김 */
const HEIGHTS = [200, 160, 240, 180, 220, 160, 200, 180, 240, 160];

/**
 * 아이템 id + 날씨 모드 → 결정론적 그라디언트 + 높이 반환
 * (같은 id는 항상 같은 비주얼을 가짐)
 */
export function getCardVisuals(id = '', weatherMode = 'sunny') {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pool = GRADS[weatherMode] ?? GRADS.sunny;

  // 사진이 있으면 사진 사용, 없으면 그라디언트 폴백
  const grad = CARD_PHOTOS[id] ?? pool[hash % pool.length];

  return {
    grad,
    imgH: HEIGHTS[hash % HEIGHTS.length],
  };
}
