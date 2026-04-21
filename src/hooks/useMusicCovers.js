import { useState, useEffect } from 'react';

const cache = {};

async function fetchCover(title, artist) {
  const key = `${artist}||${title}`;
  if (key in cache) return cache[key];
  try {
    const q   = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${q}&entity=song&limit=1`
    );
    const data = await res.json();
    const raw  = data.results?.[0]?.artworkUrl100 ?? null;
    const url  = raw ? raw.replace('100x100bb', '300x300bb') : null;
    cache[key] = url;
    return url;
  } catch {
    cache[key] = null;
    return null;
  }
}

/* App 시작 시 4개 테마 전부 프리패치 */
export async function prefetchAllThemes(allItems) {
  await Promise.all(allItems.map(item => fetchCover(item.title, item.artist)));
}

function buildMap(items) {
  const map = {};
  items?.forEach(item => {
    if (item.image) { map[item.id] = item.image; return; }
    const key = `${item.artist}||${item.title}`;
    if (key in cache) map[item.id] = cache[key];
  });
  return map;
}

/* useState + useEffect 방식 — 캐시 타이밍과 무관하게 항상 최신 데이터 반영 */
export function useMusicCovers(items) {
  const [covers, setCovers] = useState(() => buildMap(items));

  useEffect(() => {
    if (!items?.length) return;
    setCovers(buildMap(items)); // 캐시에 있는 것 즉시 반영
    Promise.all(items.map(item => fetchCover(item.title, item.artist)))
      .then(() => setCovers(buildMap(items))); // 나머지 fetch 완료 후 업데이트
  }, [items]);

  return { covers };
}
