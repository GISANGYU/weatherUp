/* =========================================================================
   dailySchedule.js — Daily 페이지용 시간대 큐레이션 빌더
   ---------------------------------------------------------------------------
   plan.md §7-2 의 daily 필드(morning/afternoon/evening × 4축)가 아직
   저작되기 전 단계라, 기존 카테고리 풀에서 시간대별로 1개씩 파생한다.
   추후 weatherData[theme].daily 가 채워지면 그쪽을 우선 사용하므로
   이 헬퍼는 그대로 두고 데이터만 보강하면 된다.
   ========================================================================= */

export const DAILY_SLOTS = [
  { key: 'morning',   label: 'MORNING',   ko: '아침', range: '06–11', icon: '🌅', desc: '하루를 여는 가벼운 시작' },
  { key: 'afternoon', label: 'AFTERNOON', ko: '한낮', range: '12–17', icon: '🌤', desc: '에너지가 가장 높은 시간' },
  { key: 'evening',   label: 'EVENING',   ko: '저녁', range: '18–23', icon: '🌙', desc: '하루를 마무리하는 무드' },
];

function pick(pool, index) {
  if (!pool || pool.length === 0) return null;
  return pool[index % pool.length];
}

/** 테마 데이터 → 시간대별 {ootd, food, activity, music} 일정 */
export function buildDailySchedule(themeData) {
  if (!themeData) return [];

  return DAILY_SLOTS.map((slot, i) => {
    const authored = themeData.daily?.[slot.key];
    return {
      ...slot,
      ootd:     authored?.ootd     ?? pick(themeData.ootd, i),
      food:     authored?.food     ?? pick(themeData.food, i),
      activity: authored?.activity ?? pick(themeData.activity, i),
      music:    authored?.music    ?? pick(themeData.music, i),
    };
  });
}
