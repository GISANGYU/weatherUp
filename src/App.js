import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WeatherBackground from './components/backgrounds/WeatherBackground';
import Header            from './components/Header';
import { MusicProvider } from './context/MusicContext';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import Footer            from './components/Footer';
import LoadingScreen     from './components/LoadingScreen';
import HomePage          from './pages/HomePage';
import OOTDPage          from './pages/OOTDPage';
import FoodPage          from './pages/FoodPage';
import ActivityPage      from './pages/ActivityPage';
import AboutPage         from './pages/AboutPage';
import MusicPage         from './pages/MusicPage';
import DailyPage         from './pages/DailyPage';
import DevTokensPage     from './pages/DevTokensPage';
import weatherData       from './data/weatherData';
import { getContentTheme } from './data/themeInherit';
import { prefetchAllThemes } from './hooks/useMusicCovers';
import CARD_PHOTOS       from './data/cardPhotos';

function preloadImages(urls) {
  return Promise.all(
    urls.map(url => new Promise(resolve => {
      const img = new window.Image();
      img.onload  = resolve;
      img.onerror = resolve;
      img.src = url;
    }))
  );
}

const ALL_THEME_CLASSES = [
  'theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy',
  'theme-partly-cloudy', 'theme-stormy', 'theme-dusty',
];
const MIN_LOADING_MS = 3000;

/* ── Provider 안쪽: currentTheme 으로 body 클래스 sync + 라우트 ── */
function AppShell() {
  const { currentTheme } = useWeather();
  const contentTheme     = getContentTheme(currentTheme);

  useEffect(() => {
    document.body.classList.remove(...ALL_THEME_CLASSES);
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  return (
    <>
      <WeatherBackground theme={currentTheme} />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/ootd"         element={<OOTDPage     weatherMode={contentTheme} />} />
          <Route path="/food"         element={<FoodPage     weatherMode={contentTheme} />} />
          <Route path="/activity"     element={<ActivityPage weatherMode={contentTheme} />} />
          <Route path="/music"        element={<MusicPage    weatherMode={contentTheme} />} />
          <Route path="/daily"        element={<DailyPage    weatherMode={contentTheme} />} />
          <Route path="/about"        element={<AboutPage    weatherMode={contentTheme} />} />
          <Route path="/dev/tokens"   element={<DevTokensPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [timerDone,  setTimerDone]  = useState(false);
  const [coversDone, setCoversDone] = useState(false);
  const [photosDone, setPhotosDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

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
    const allItems = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'snowy', 'stormy', 'dusty']
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

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <WeatherProvider>
        <MusicProvider>
          {showLoader && <LoadingScreen visible={isLoading} />}
          <AppShell />
        </MusicProvider>
      </WeatherProvider>
    </Router>
  );
}

export default App;
