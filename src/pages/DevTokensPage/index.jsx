import styles from './DevTokensPage.module.css';

/* 밝기순 정렬 (plan.md §3-3) */
const THEMES = [
  { id: 'sunny',         label: 'Sunny',         mood: '밝음 · 에너지',    brightness: '밝음' },
  { id: 'snowy',         label: 'Snowy',         mood: '포근 · 낭만',      brightness: '밝음' },
  { id: 'partly-cloudy', label: 'Partly Cloudy', mood: '가벼움 · 변덕',    brightness: '밝음' },
  { id: 'dusty',         label: 'Dusty',         mood: '답답 · 뿌연',      brightness: '밝음(따뜻)' },
  { id: 'cloudy',        label: 'Cloudy',        mood: '차분 · 무드',      brightness: '어두움' },
  { id: 'rainy',         label: 'Rainy',         mood: '촉촉 · 감성',      brightness: '어두움' },
  { id: 'stormy',        label: 'Stormy',        mood: '극적 · 파워',      brightness: '어두움' },
];

function TokenSwatch({ label, varName }) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchChip}
        style={{ backgroundColor: `var(${varName})` }}
      />
      <span className={styles.swatchLabel}>{label}</span>
    </div>
  );
}

function ThemeCard({ theme }) {
  return (
    <div className={`theme-${theme.id} ${styles.card}`}>
      <header className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>{theme.label}</h3>
          <p className={styles.cardMood}>{theme.mood}</p>
        </div>
        <span className={styles.brightnessBadge}>{theme.brightness}</span>
      </header>

      <div className={styles.innerCard}>
        <p className={styles.innerText}>
          본문 텍스트 샘플 — 날씨 무드와 어울리는 콘텐츠가 이 영역에 표시됩니다.
        </p>
        <p className={styles.innerMuted}>보조 텍스트 · muted</p>
        <button type="button" className={styles.accentButton}>Accent 버튼</button>
      </div>

      <div className={styles.tokens}>
        <TokenSwatch label="--bg"         varName="--bg" />
        <TokenSwatch label="--accent"     varName="--accent" />
        <TokenSwatch label="--text"       varName="--text" />
        <TokenSwatch label="--text-muted" varName="--text-muted" />
        <TokenSwatch label="--card"       varName="--card" />
        <TokenSwatch label="--border"     varName="--border" />
      </div>
    </div>
  );
}

export default function DevTokensPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Phase 2 — Design Tokens</h1>
        <p>
          7 테마 단일 세트 · 의미 토큰(<code>--bg</code>, <code>--accent</code>,{' '}
          <code>--text</code>, <code>--card</code>, <code>--border</code>) 육안 검증.
          상단 4개(밝음) → 하단 3개(어두움) 순으로 정렬.
        </p>
      </header>

      <div className={styles.grid}>
        {THEMES.map(theme => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}
