import { createContext, useContext, useState } from 'react';
import FloatingPlayer from '../components/FloatingPlayer';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [playingId, setPlayingId] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null); // { title, artist, emoji, link }

  const play = (itemId, link, trackInfo) => {
    if (playingId === itemId) {
      setPlayingId(null);
      setNowPlaying(null);
    } else {
      setPlayingId(itemId);
      setNowPlaying({ ...(trackInfo || {}), link });
    }
  };

  const stop = () => {
    setPlayingId(null);
    setNowPlaying(null);
  };

  return (
    <MusicContext.Provider value={{ play, stop, playingId, nowPlaying }}>
      {children}
      <FloatingPlayer />
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  return useContext(MusicContext);
}
