import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AboutPanel from '../AboutPanel';
import styles from './Header.module.css';

const NAV = [
  { to: '/',         label: 'Home'     },
  { to: '/ootd',     label: 'OOTD'     },
  { to: '/food',     label: 'Food'     },
  { to: '/activity', label: 'Activity' },
];

const WEATHER_ICON = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️' };

function Header({ weatherMode, setWeatherMode }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* 스크롤 감지 — 이벤트 리스너 등록 + 클린업 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 라우트 이동 시 패널 닫기 */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* ── 왼쪽: 로고 ── */}
          <NavLink to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}>{WEATHER_ICON[weatherMode]}</span>
            <span className={styles.logoText}>WeatherUp</span>
          </NavLink>

          {/* ── 가운데: 네비게이션 ── */}
          <nav className={styles.nav}>
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── 오른쪽: 햄버거 버튼 ── */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

        </div>
      </header>

      {/* 슬라이드 패널 — header 아래 fixed */}
      <AboutPanel
        isOpen={menuOpen}
        onClose={closeMenu}
        weatherMode={weatherMode}
        setWeatherMode={setWeatherMode}
      />
    </>
  );
}

export default Header;
