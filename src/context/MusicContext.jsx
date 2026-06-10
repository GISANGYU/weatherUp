import { createContext, useContext, useRef, useState } from 'react';
import { getPreviewUrlSync, ensurePreview } from '../hooks/useMusicCovers';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [playingId, setPlayingId] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null); // { title, artist, emoji, link }
  const audioRef = useRef(null);

  /* 실제 재생 — 가능하면 클릭 제스처 내부에서 동기적으로 play() (자동재생 차단 회피) */
  const startAudio = (title, artist) => {
    const audio = audioRef.current;
    if (!audio) return;
    const cached = getPreviewUrlSync(title, artist);
    if (cached) {
      audio.src = cached;
      audio.currentTime = 0;
      audio.play().catch(() => { /* 차단 시 무시 */ });
      return;
    }
    /* 캐시 미스(드묾) — 비동기 확보 후 재생 시도 */
    ensurePreview(title, artist).then((url) => {
      if (url && audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    });
  };

  const play = (itemId, link, trackInfo) => {
    const audio = audioRef.current;
    /* 같은 곡 다시 클릭 → 정지 토글 */
    if (playingId === itemId) {
      audio?.pause();
      setPlayingId(null);
      setNowPlaying(null);
      return;
    }
    setPlayingId(itemId);
    setNowPlaying({ ...(trackInfo || {}), link });
    startAudio(trackInfo?.title, trackInfo?.artist);
  };

  const stop = () => {
    audioRef.current?.pause();
    setPlayingId(null);
    setNowPlaying(null);
  };

  return (
    <MusicContext.Provider value={{ play, stop, playingId, nowPlaying }}>
      {children}
      {/* 숨김 오디오 — iTunes 30초 미리듣기(ad-free). 곡 끝나면 자동 정지 */}
      <audio ref={audioRef} hidden onEnded={stop} />
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  return useContext(MusicContext);
}
