import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WeatherBackground from './components/backgrounds/WeatherBackground';
import Header            from './components/Header';
import LoadingScreen     from './components/LoadingScreen';
import HomePage          from './pages/HomePage';
import OOTDPage          from './pages/OOTDPage';
import FoodPage          from './pages/FoodPage';
import ActivityPage      from './pages/ActivityPage';
import AboutPage         from './pages/AboutPage';

const THEMES = ['theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];
const LOADING_MS = 3000; // Phase 2에서 실제 API 로딩으로 교체

function App() {
  const [weatherMode, setWeatherMode] = useState('sunny');
  const [isLoading,   setIsLoading]   = useState(true);   // 로딩 진행 중
  const [showLoader,  setShowLoader]  = useState(true);   // 마운트 여부

  /* 3초 강제 로딩 (Phase 2에서 API 완료 시점으로 교체) */
  useEffect(() => {
    const done = setTimeout(() => {
      setIsLoading(false);                      // fade-out 시작
      setTimeout(() => setShowLoader(false), 600); // 애니메이션 끝나면 언마운트
    }, LOADING_MS);
    return () => clearTimeout(done);
  }, []);

  useEffect(() => {
    document.body.classList.remove(...THEMES);
    document.body.classList.add(`theme-${weatherMode}`);
  }, [weatherMode]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* 로딩 스크린 — 첫 진입 시 3초, Phase 2에서는 API 완료까지 */}
      {showLoader && <LoadingScreen visible={isLoading} />}

      {/* Fixed background behind everything */}
      <WeatherBackground weatherMode={weatherMode} />

      {/* Sticky header */}
      <Header weatherMode={weatherMode} setWeatherMode={setWeatherMode} />

      {/* Scrollable content */}
      <main className="main-content">
        <Routes>
          <Route path="/"         element={<HomePage     weatherMode={weatherMode} setWeatherMode={setWeatherMode} />} />
          <Route path="/ootd"     element={<OOTDPage     weatherMode={weatherMode} />} />
          <Route path="/food"     element={<FoodPage     weatherMode={weatherMode} />} />
          <Route path="/activity" element={<ActivityPage weatherMode={weatherMode} />} />
          <Route path="/about"    element={<AboutPage    weatherMode={weatherMode} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
