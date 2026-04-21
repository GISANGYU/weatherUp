import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WeatherBackground from './components/backgrounds/WeatherBackground';
import Header            from './components/Header';
import { MusicProvider } from './context/MusicContext';
import Footer            from './components/Footer';
import LoadingScreen     from './components/LoadingScreen';
import HomePage          from './pages/HomePage';
import OOTDPage          from './pages/OOTDPage';
import FoodPage          from './pages/FoodPage';
import ActivityPage      from './pages/ActivityPage';
import AboutPage         from './pages/AboutPage';
import MusicPage         from './pages/MusicPage';
import weatherData       from './data/weatherData';
import { prefetchAllThemes } from './hooks/useMusicCovers';
import CARD_PHOTOS       from './data/cardPhotos';

function preloadImages(urls) {
  return Promise.all(
    urls.map(url => new Promise(resolve => {
      const img = new window.Image();
      img.onload  = resolve;
      img.onerror = resolve; // 실패해도 block 하지 않음
      img.src = url;
    }))
  );
}

const THEMES = ['theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];
const MIN_LOADING_MS = 3000;

function AppContent({ weatherMode, setWeatherMode }) {
  return (
    <>
      <main className="main-content">
        <Routes>
          <Route path="/"         element={<HomePage     weatherMode={weatherMode} setWeatherMode={setWeatherMode} />} />
          <Route path="/ootd"     element={<OOTDPage     weatherMode={weatherMode} />} />
          <Route path="/food"     element={<FoodPage     weatherMode={weatherMode} />} />
          <Route path="/activity" element={<ActivityPage weatherMode={weatherMode} />} />
          <Route path="/music"    element={<MusicPage    weatherMode={weatherMode} />} />
          <Route path="/about"    element={<AboutPage    weatherMode={weatherMode} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [weatherMode, setWeatherMode] = useState('sunny');
  const [timerDone,   setTimerDone]   = useState(false);
  const [coversDone,  setCoversDone]  = useState(false);
  const [photosDone,  setPhotosDone]  = useState(false);
  const [showLoader,  setShowLoader]  = useState(true);

  const isLoading = !timerDone || !coversDone || !photosDone;

  /* 최소 표시 타이머 */
  useEffect(() => {
    const id = setTimeout(() => setTimerDone(true), MIN_LOADING_MS);
    return () => clearTimeout(id);
  }, []);

  /* 카드 사진 전체 프리로드 */
  useEffect(() => {
    preloadImages(Object.values(CARD_PHOTOS)).then(() => setPhotosDone(true));
  }, []);

  /* 4개 테마 앨범 커버 전체 프리패치 */
  useEffect(() => {
    const allItems = ['sunny', 'cloudy', 'rainy', 'snowy']
      .flatMap(theme => weatherData[theme].music);
    prefetchAllThemes(allItems).then(() => setCoversDone(true));
  }, []);

  /* 로딩 완료 → fadeOut → DOM에서 제거 */
  useEffect(() => {
    if (!isLoading) {
      const id = setTimeout(() => setShowLoader(false), 600);
      return () => clearTimeout(id);
    }
  }, [isLoading]);

  useEffect(() => {
    document.body.classList.remove(...THEMES);
    document.body.classList.add(`theme-${weatherMode}`);
  }, [weatherMode]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MusicProvider>
        {showLoader && <LoadingScreen visible={isLoading} />}
        <WeatherBackground weatherMode={weatherMode} />
        <Header weatherMode={weatherMode} setWeatherMode={setWeatherMode} />
        <AppContent weatherMode={weatherMode} setWeatherMode={setWeatherMode} />
      </MusicProvider>
    </Router>
  );
}

export default App;
