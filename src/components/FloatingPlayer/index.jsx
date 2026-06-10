import { useEffect, useState } from 'react';
import { useMusicContext } from '../../context/MusicContext';
import { ensurePreview }   from '../../hooks/useMusicCovers';

/* 숨김 오디오 호스트 — iTunes 30초 미리듣기(ad-free)를 재생.
   보이는 재생 UI는 헤더의 NowPlayingBadge가 담당.
   (유튜브 임베드는 광고가 붙어 미리듣기 오디오로 전환) */
function FloatingPlayer() {
  const { nowPlaying, stop } = useMusicContext();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!nowPlaying) { setPreviewUrl(null); return; }
    let cancelled = false;
    setPreviewUrl(null);
    ensurePreview(nowPlaying.title, nowPlaying.artist).then((url) => {
      if (!cancelled) setPreviewUrl(url);
    });
    return () => { cancelled = true; };
  }, [nowPlaying]);

  if (!nowPlaying || !previewUrl) return null;

  return (
    <audio
      src={previewUrl}
      autoPlay
      onEnded={stop}
      style={{ display: 'none' }}
    />
  );
}

export default FloatingPlayer;
