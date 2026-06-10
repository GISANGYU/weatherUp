import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weatherup_music_covers_v1';
const PREVIEW_KEY = 'weatherup_music_previews_v1';

/* localStorage에서 복원 */
function loadCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistCache(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch {
    /* 용량 초과 등 — 무시 */
  }
}

const cache        = loadCache(STORAGE_KEY);
const previewCache = loadCache(PREVIEW_KEY);   /* 30초 미리듣기 URL 캐시 */
const inflight     = {};

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

/* iTunes 1회 조회로 커버 + 30초 미리듣기를 함께 캐시 (inflight 중복 제거).
   ★ 커버가 이미 캐시돼 있어도 미리듣기는 별도이므로 여기서 항상 둘 다 채운다. */
async function fetchTrack(title, artist) {
  const key = `${artist}||${title}`;
  if (inflight[key]) return inflight[key];

  const promise = (async () => {
    try {
      const q    = encodeURIComponent(`${artist} ${title}`);
      const data = await itunesJsonp(q);
      const r    = data.results?.[0];

      /* 30초 미리듣기 URL — 광고 없는 ad-free 오디오 */
      const preview = r?.previewUrl ?? null;
      if (preview) {
        previewCache[key] = preview;
        persistCache(PREVIEW_KEY, previewCache);
      }

      /* 앨범 커버 (300x300 우선, onError 시 MusicCard가 100x100로 다운그레이드) */
      const raw = r?.artworkUrl100 ?? null;
      if (raw) {
        cache[key] = raw.replace('100x100bb', '300x300bb');
        persistCache(STORAGE_KEY, cache);
      }

      if (!raw && !preview) console.warn('[music] no result:', artist, '-', title);
    } catch (err) {
      console.warn('[music] fetch failed:', artist, '-', title, err?.message);
    } finally {
      delete inflight[key];
    }
  })();

  inflight[key] = promise;
  return promise;
}

/* 커버 URL 확보 — 없으면 조회 후 반환 */
async function fetchCover(title, artist) {
  const key = `${artist}||${title}`;
  if (cache[key]) return cache[key];
  await fetchTrack(title, artist);
  return cache[key] ?? null;
}

/* App 시작 시 프리패치 — 커버·미리듣기 중 하나라도 없으면 조회 (동시 요청 5개 워커 풀) */
export async function prefetchAllThemes(allItems) {
  const CONCURRENCY = 5;
  const queue = [...allItems];

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) continue;
      const key = `${item.artist}||${item.title}`;
      if (cache[key] && previewCache[key]) continue;   /* 둘 다 있으면 skip */
      await fetchTrack(item.title, item.artist);
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker())
  );
}

/* 캐시에 이미 있는 미리듣기 URL을 동기로 반환 (없으면 null).
   클릭 제스처 내부에서 바로 audio.play() 하기 위함. */
export function getPreviewUrlSync(title, artist) {
  return previewCache[`${artist}||${title}`] ?? null;
}

/* 곡의 30초 미리듣기 URL 확보 — 캐시에 없으면 iTunes 조회 후 반환 */
export async function ensurePreview(title, artist) {
  const key = `${artist}||${title}`;
  if (previewCache[key]) return previewCache[key];
  await fetchTrack(title, artist);
  return previewCache[key] ?? null;
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
