import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AboutPanel      from '../AboutPanel';
import NavDrawer       from '../NavDrawer';
import NowPlayingBadge from '../NowPlayingBadge';
import WeatherPicker   from '../WeatherPicker';
import WeatherIcon     from '../WeatherIcon';
import styles from './Header.module.css';

const NAV = [
  { to: '/ootd',     label: 'OOTD'     },
  { to: '/food',     label: 'Food'     },
  { to: '/activity', label: 'Activity' },
  { to: '/music',    label: 'Music'    },
];

function Header({ weatherMode, setWeatherMode }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [infoOpen,     setInfoOpen]     = useState(false);
  const [showPicker,   setShowPicker]   = useState(false);
  const location = useLocation();

  const isMusicPage = location.pathname === '/music';

  /* 스크롤 감지 — 헤더 그림자 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 날씨 선택기 표시 로직
     - 메인(/)   : 히어로 비쥬얼(88vh) 지나면 표시
     - 서브페이지 : 항상 표시                          */
  useEffect(() => {
    const isHome = location.pathname === '/';

    if (!isHome) {
      setShowPicker(true);
      return;
    }

    setShowPicker(false);
    const threshold = window.innerHeight * 0.75;
    const check = () => setShowPicker(window.scrollY > threshold);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);
  const closeInfo = () => setInfoOpen(false);
  const openInfo  = () => setInfoOpen(true);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* ── 왼쪽: 로고 ── */}
          <NavLink to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}><WeatherIcon mode={weatherMode} size={20} /></span>
            <span className={styles.logoText}>WeatherUp</span>
          </NavLink>

          {/* ── 가운데: 네비게이션 (PC) ── */}
          <nav className={styles.nav}>
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── 오른쪽: NowPlaying + 날씨선택기 + ℹ (PC) / 햄버거 (모바일) ── */}
          <div className={styles.right}>
            {!isMusicPage && <NowPlayingBadge />}

            {/* 날씨 선택기 — ℹ 버튼 왼쪽 */}
            <div className={`${styles.pickerWrap} ${showPicker ? styles.pickerVisible : ''}`}>
              <WeatherPicker weatherMode={weatherMode} setWeatherMode={setWeatherMode} />
            </div>

            {/* PC 전용: ℹ / × 토글 버튼 */}
            <button
              className={`${styles.infoBtn} ${infoOpen ? styles.infoBtnActive : ''}`}
              onClick={() => setInfoOpen(o => !o)}
              aria-label={infoOpen ? '닫기' : '구조 이야기'}
              aria-expanded={infoOpen}
            >
              <span className={`${styles.infoBtnIcon} ${infoOpen ? styles.infoBtnIconHide : ''}`}>
                <InfoIcon />
              </span>
              <span className={`${styles.infoBtnIcon} ${styles.infoBtnClose} ${infoOpen ? '' : styles.infoBtnIconHide}`}>
                <CloseXIcon />
              </span>
            </button>

            {/* 모바일 전용: 햄버거 */}
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

        </div>
      </header>

      <NavDrawer isOpen={menuOpen} onClose={closeMenu} onAbout={openInfo} />
      <AboutPanel
        isOpen={infoOpen}
        onClose={closeInfo}
        weatherMode={weatherMode}
        setWeatherMode={setWeatherMode}
      />
    </>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.6" />
    </svg>
  );
}

function CloseXIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M1 1l12 12M13 1L1 13" />
    </svg>
  );
}

export default Header;
