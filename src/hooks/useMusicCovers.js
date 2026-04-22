import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weatherup_music_covers_v1';

/* localStorage에서 복원 */
function loadCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    /* 용량 초과 등 — 무시 */
  }
}

const cache    = loadCache();
const inflight = {};

/* iTunes Search API JSONP — CORS 우회 (fetch로는 일부 응답이 CORS 헤더 없이 차단됨) */
let jsonpSeq = 0;
function itunesJsonp(term) {
  return new Promise((resolve, reject) => {
    const cbName = `__itunes_cb_${++jsonpSeq}_${Date.now()}`;
    const script = document.createElement('script');
    const cleanup = () => {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    const timer = setTimeout(() => { cleanup(); reject(new Error('timeout')); }, 10000);

    window[cbName] = (data) => {
      clearTimeout(timer);
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error('script load error'));
    };
    script.src = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1&callback=${cbName}`;
    document.head.appendChild(script);
  });
}

async function fetchCover(title, artist) {
  const key = `${artist}||${title}`;
  if (cache[key]) return cache[key];
  if (inflight[key]) return inflight[key];

  const promise = (async () => {
    try {
      const q    = encodeURIComponent(`${artist} ${title}`);
      const data = await itunesJsonp(q);
      const raw  = data.results?.[0]?.artworkUrl100 ?? null;
      if (!raw) {
        console.warn('[covers] no artwork:', artist, '-', title);
        return null;
      }
      /* 300x300 우선, onError 시 MusicCard가 100x100로 다운그레이드 */
      const url = raw.replace('100x100bb', '300x300bb');
      cache[key] = url;
      persistCache(cache);
      return url;
    } catch (err) {
      console.warn('[covers] fetch failed:', artist, '-', title, err?.message);
      return null;
    } finally {
      delete inflight[key];
    }
  })();

  inflight[key] = promise;
  return promise;
}

/* App 시작 시 4개 테마 프리패치 — 동시 요청 수 제한(워커 풀) */
export async function prefetchAllThemes(allItems) {
  const CONCURRENCY = 5;
  const queue = [...allItems];

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) await fetchCover(item.title, item.artist);
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker())
  );
}

function buildMap(items) {
  const map = {};
  items?.forEach(item => {
    if (item.image) { map[item.id] = item.image; return; }
    const key = `${item.artist}||${item.title}`;
    if (cache[key]) map[item.id] = cache[key];
  });
  return map;
}

/* useState + useEffect 방식 — 캐시에 없는 곡은 자동 재시도 */
export function useMusicCovers(items) {
  const [covers, setCovers] = useState(() => buildMap(items));

  useEffect(() => {
    if (!items?.length) return;
    setCovers(buildMap(items));

    const toFetch = items.filter(item => {
      if (item.image) return false;
      const key = `${item.artist}||${item.title}`;
      return !cache[key];
    });
    if (toFetch.length === 0) return;

    Promise.all(toFetch.map(item => fetchCover(item.title, item.artist)))
      .then(() => setCovers(buildMap(items)));
  }, [items]);

  return { covers };
}
