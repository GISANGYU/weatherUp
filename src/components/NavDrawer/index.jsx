import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavDrawer.module.css';

const NAV = [
  { to: '/ootd',     label: 'OOTD',     Icon: OotdIcon     },
  { to: '/food',     label: 'Food',     Icon: FoodIcon     },
  { to: '/activity', label: 'Activity', Icon: ActivityIcon },
  { to: '/music',    label: 'Music',    Icon: MusicIcon    },
];

function NavDrawer({ isOpen, onClose, onAbout }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="네비게이션 메뉴"
      >
        {/* 드로어 헤더 */}
        <div className={styles.head}>
          <span className={styles.headLabel}>MENU</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </button>
        </div>

        {/* 네비 링크 */}
        <nav className={styles.nav}>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
            >
              <span className={styles.icon}><Icon /></span>
              <span className={styles.label}>{label}</span>
              <span className={styles.arrow}><ChevronIcon /></span>
            </NavLink>
          ))}
        </nav>

        {/* 구분선 + About */}
        <div className={styles.footer}>
          <div className={styles.divider} />
          <button
            className={styles.aboutItem}
            onClick={() => { onClose(); setTimeout(onAbout, 120); }}
          >
            <span className={styles.icon}><InfoIcon /></span>
            <span className={styles.label}>구조 이야기</span>
            <span className={styles.arrow}><ChevronIcon /></span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ── SVG 아이콘 ── */

function OotdIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
    </svg>
  );
}

function FoodIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default NavDrawer;
