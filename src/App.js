import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WeatherBackground from './components/backgrounds/WeatherBackground';
import Header            from './components/Header';
import HomePage          from './pages/HomePage';
import OOTDPage          from './pages/OOTDPage';
import FoodPage          from './pages/FoodPage';
import ActivityPage      from './pages/ActivityPage';
import AboutPage         from './pages/AboutPage';

const THEMES = ['theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy'];

function App() {
  const [weatherMode, setWeatherMode] = useState('sunny');

  useEffect(() => {
    document.body.classList.remove(...THEMES);
    document.body.classList.add(`theme-${weatherMode}`);
  }, [weatherMode]);

  return (
    <Router>
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
