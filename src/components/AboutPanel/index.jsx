import { useEffect, useRef, useState, useCallback } from 'react';
import {
  LuSun, LuCloudSun, LuSnowflake, LuHaze,
  LuCloud, LuCloudRain, LuCloudLightning,
} from 'react-icons/lu';
import styles from './AboutPanel.module.css';

/* 테마별 라인 아이콘 — 7 테마 (Header/Hero 셀렉터와 동일 세트) */
const ICONS = {
  'sunny':         LuSun,
  'partly-cloudy': LuCloudSun,
  'snowy':         LuSnowflake,
  'dusty':         LuHaze,
  'cloudy':        LuCloud,
  'rainy':         LuCloudRain,
  'stormy':        LuCloudLightning,
};

/* ── 기술 스택 데이터 ── */
const STACK_CORE = [
  {
    icon: 'hub',
    name: 'React 19',
    version: 'v19.2.5',
    desc: 'WeatherContext·MusicContext 두 Context로 전역 상태 관리, useEffect로 body 테마 클래스 동기화',
  },
  {
    icon: 'route',
    name: 'React Router',
    version: 'v7.14.1',
    desc: '홈·OOTD·Food·Activity·Music·Daily·About 7개 라우트 클라이언트 전환, NavLink isActive로 현재 메뉴 자동 스타일',
  },
  {
    icon: 'style',
    name: 'CSS Modules',
    version: 'CRA 내장',
    desc: '빌드 시 클래스명 해시화로 스코프 충돌 방지, 테마 등 전역 선택자는 :global() 병용',
  },
  {
    icon: 'palette',
    name: 'CSS Custom Properties',
    version: 'Native',
    desc: 'tokens.css(원시)→themes.css(의미) 2레벨 구조, body의 theme-{mode} 한 줄 교체로 색·그림자·배경 일괄 전환',
  },
];

const STACK_LIBS = [
  {
    icon: 'widgets',
    name: 'react-icons',
    version: 'v5.6.0',
    desc: 'Lucide 라인 아이콘 세트, SVG currentColor로 테마 색상 자동 동기화',
  },
  {
    icon: 'font_download',
    name: 'Pretendard',
    version: 'CDN',
    desc: '한글·영문 동일 무게 가변 폰트, 본문 전역 적용',
  },
  {
    icon: 'text_fields',
    name: 'Manrope · Space Mono',
    version: 'Google Fonts',
    desc: '에디토리얼 디스플레이(Manrope)와 모노 라벨(Space Mono), 섹션 제목·eyebrow에 사용',
  },
];

const STACK_ENGINE = [
  {
    icon: 'gradient',
    name: '순수 CSS 배경 엔진',
    version: 'CSS',
    desc: '맑음~번개 7종 배경을 canvas 없이 radial/linear-gradient·mask-image·@keyframes로 구현, prefers-reduced-motion 대응',
  },
  {
    icon: 'play_circle',
    name: 'YouTube IFrame API',
    version: 'Browser',
    desc: 'useYouTubePlayer 훅으로 곡 재생, FloatingPlayer·NowPlayingBadge로 전역 재생 UI 제어',
  },
  {
    icon: 'album',
    name: 'iTunes Search API',
    version: 'JSONP',
    desc: '곡명으로 앨범 커버 자동 로딩, JSONP로 CORS 우회',
  },
  {
    icon: 'database',
    name: 'localStorage 캐시',
    version: 'Browser',
    desc: '받아온 커버를 영속 캐시 + 앱 시작 시 7테마 전체 프리패치(LoadingScreen 연동)',
  },
  {
    icon: 'visibility',
    name: 'IntersectionObserver',
    version: 'Browser',
    desc: '이 패널과 useScrollFade의 스크롤 reveal — 뷰포트 진입 시 data-visible 부여',
  },
];

/* ── 날씨별 메타 (themes.css 의 실제 값과 일치) ── */
const META = {
  'sunny':         { emoji: '☀️', label: '맑음',   accent: '#FFB800', bg: '#EEF6FF', text: '#2C3E50' },
  'partly-cloudy': { emoji: '⛅', label: '구름',   accent: '#9BB8D9', bg: '#E8F0F7', text: '#3A4A5C' },
  'snowy':         { emoji: '❄️', label: '눈',     accent: '#A8C8FF', bg: '#EAF0FF', text: '#2A3A5A' },
  'dusty':         { emoji: '🌫️', label: '황사',   accent: '#B8A888', bg: '#E5DFD3', text: '#3A3428' },
  'cloudy':        { emoji: '☁️', label: '흐림',   accent: '#B8C5D5', bg: '#2A2E35', text: '#E5E8ED' },
  'rainy':         { emoji: '🌧️', label: '비',     accent: '#4A9EFF', bg: '#1C2B3A', text: '#E8F4FF' },
  'stormy':        { emoji: '⚡', label: '번개',   accent: '#8877F5', bg: '#151823', text: '#E8E5FF' },
};
/* plan §4-1 표기 순서 */
const MODES = ['sunny', 'partly-cloudy', 'snowy', 'dusty', 'cloudy', 'rainy', 'stormy'];
/* 밝은 계열 — 상태 뱃지 텍스트를 어둡게 */
const LIGHT_THEMES = ['sunny', 'partly-cloudy', 'snowy', 'dusty'];

/* ─────────────────────────────────────────── */
function AboutPanel({ isOpen, onClose, weatherMode, setWeatherMode }) {
  const panelRef = useRef(null);
  const obsRef = useRef(null);
  const timersRef = useRef([]);

  /* ── 스크롤 reveal 설정 ── */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;

    /* 패널 열릴 때 최상단으로 + 이전 visible 리셋 */
    panel.scrollTop = 0;
    panel
      .querySelectorAll('[data-scene]')
      .forEach((el) => el.removeAttribute('data-visible'));

    /* 패널 오픈 애니메이션(0.48s) 끝난 뒤 observer 연결 */
    const tid = setTimeout(() => {
      if (!panelRef.current) return;
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.setAttribute('data-visible', 'true');
          }),
        { root: panelRef.current, threshold: 0.12 }
      );
      panelRef.current
        .querySelectorAll('[data-scene]')
        .forEach((el) => observer.observe(el));
      obsRef.current = observer;
    }, 520);

    return () => {
      clearTimeout(tid);
      obsRef.current?.disconnect();
    };
  }, [isOpen]);

  /* ── ESC 닫기 ── */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  /* ── 패널 열릴 때 뒷배경 스크롤 잠금 ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ── Scene 2: 단계 애니메이션 상태 ── */
  const [stepCount, setStepCount] = useState(3);

  const handleModeClick = useCallback(
    (mode) => {
      if (mode === weatherMode) return;
      timersRef.current.forEach(clearTimeout);
      setWeatherMode(mode);
      setStepCount(0);
      const t1 = setTimeout(() => setStepCount(1), 60);
      const t2 = setTimeout(() => setStepCount(2), 420);
      const t3 = setTimeout(() => setStepCount(3), 780);
      timersRef.current = [t1, t2, t3];
    },
    [weatherMode, setWeatherMode]
  );

  /* weatherMode 바뀔 때 (외부 변경 시) 전체 스텝 즉시 표시 */
  useEffect(() => {
    setStepCount(3);
  }, [weatherMode]);

  const m = META[weatherMode];
  const CurrentIcon = ICONS[weatherMode];

  return (
    <>
      {/* 배경 딤 */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 패널 */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="WeatherUp 구조 이야기"
      >
        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 1 — 상태의 소유 (Context)                     */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>01</p>
              <h2 className={styles.sceneTitle}>상태의 소유</h2>
              <p className={styles.sceneDesc}>
                복잡한 전역 상태 라이브러리 없이,
                <strong> WeatherContext 하나</strong>가 날씨 상태를 소유하고
                Provider로 앱 전체에 내려줍니다. 이 한 값이 테마·데이터·UI를
                모두 결정합니다.
              </p>
              <p className={styles.sceneSub}>
                ↓ 오른쪽의 상태 값은 선택 즉시 바뀝니다
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* macOS 스타일 코드 카드 */}
              <div className={styles.codeCard}>
                <div className={styles.codeCardBar}>
                  <span
                    style={{ background: '#FF5F57' }}
                    className={styles.trafficDot}
                  />
                  <span
                    style={{ background: '#FFBD2E' }}
                    className={styles.trafficDot}
                  />
                  <span
                    style={{ background: '#28C840' }}
                    className={styles.trafficDot}
                  />
                  <span className={styles.codeFileName}>WeatherContext.jsx</span>
                </div>
                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.ckw}>const</span>
                    {' ['}
                    <span className={styles.cvar}>currentTheme</span>
                    {', '}
                    <span className={styles.cvar}>setTheme</span>
                    {']'}
                  </div>
                  <div className={styles.codeLine}>
                    {'  = '}
                    <span className={styles.cfn}>useState</span>
                    {'('}
                    <span className={styles.cstr}>{`'${weatherMode}'`}</span>
                    {')'}
                    <span className={styles.cursor} />
                  </div>
                </div>

                {/* 실시간 상태 표시 */}
                <div className={styles.stateLive}>
                  <span className={styles.stateLiveLabel}>현재 상태</span>
                  <span
                    className={styles.stateLiveVal}
                    style={{
                      background: m.accent,
                      color: LIGHT_THEMES.includes(weatherMode) ? '#1A2B3C' : '#fff',
                    }}
                  >
                    {m.emoji}&nbsp;&nbsp;{weatherMode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 2 — 클릭이 만드는 변화                       */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>02</p>
              <h2 className={styles.sceneTitle}>
                클릭이
                <br />
                만드는 변화
              </h2>
              <p className={styles.sceneDesc}>
                날씨 무드 버튼 클릭 하나가 세 가지 연쇄 반응을 일으킵니다.
                <br />
                오른쪽 버튼을 눌러 직접 확인해보세요.
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* 인터랙티브 날씨 버튼 */}
              <div className={styles.demoBtns}>
                {MODES.map((mode) => {
                  const isActive = weatherMode === mode;
                  const Icon = ICONS[mode];
                  return (
                    <button
                      key={mode}
                      className={`${styles.demoBtn} ${isActive ? styles.demoBtnOn : ''}`}
                      style={isActive ? { '--c': META[mode].accent } : {}}
                      onClick={() => handleModeClick(mode)}
                    >
                      <span className={styles.demoBtnEmoji}>
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className={styles.demoBtnLabel}>
                        {META[mode].label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 단계별 흐름 reveal */}
              <div className={styles.steps}>
                <Step num="①" active={stepCount >= 1}>
                  <code>
                    setTheme(
                    <span style={{ color: m.accent }}>'{weatherMode}'</span>)
                  </code>
                  <span className={styles.stepTag}>setter 호출</span>
                </Step>
                <Step num="②" active={stepCount >= 2}>
                  <span>Context 갱신 →</span>
                  <span
                    className={styles.stepBadge}
                    style={{
                      background: m.accent,
                      color: LIGHT_THEMES.includes(weatherMode) ? '#1A2B3C' : '#fff',
                    }}
                  >
                    <CurrentIcon size={13} strokeWidth={2.1} />
                    {weatherMode}
                  </span>
                  <span className={styles.stepTag}>구독자 리렌더</span>
                </Step>
                <Step num="③" active={stepCount >= 3}>
                  <code>
                    {'<body class="theme-'}
                    <span style={{ color: m.accent }}>{weatherMode}</span>
                    {'">'}
                  </code>
                  <span className={styles.stepTag}>클래스 전환</span>
                </Step>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 3 — Context 구독 구조                         */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>03</p>
              <h2 className={styles.sceneTitle}>구독 구조</h2>
              <p className={styles.sceneDesc}>
                상태는 <strong>Context로 구독</strong>합니다. WeatherProvider가
                소유한 currentTheme을, 필요한 컴포넌트가{' '}
                <code className={styles.inlineCode}>useWeather()</code>로 직접
                꺼내 씁니다.
              </p>
              <div className={styles.legendRow}>
                <span
                  className={styles.legendDot}
                  style={{ background: m.accent }}
                />
                <span className={styles.legendText}>useWeather() 구독 경로</span>
              </div>
            </div>

            <div className={styles.sceneVisual}>
              <svg
                className={styles.treeSvg}
                viewBox="0 0 480 260"
                aria-hidden="true"
              >
                {/* ── Provider → 컨텍스트 버스(정적) ── */}
                <path
                  d="M 240,47 L 240,84"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="2"
                />
                <path
                  d="M 90,84 L 392,84"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  strokeDasharray="4 4"
                />

                {/* ── 버스 → 구독자 라인(reveal) ── */}
                <path
                  className={`${styles.tl} ${styles.tl1}`}
                  d="M 90,84 L 90,108"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.75"
                />
                <path
                  className={`${styles.tl} ${styles.tl2}`}
                  d="M 240,84 L 240,108"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.75"
                />
                <path
                  className={`${styles.tl} ${styles.tl3}`}
                  d="M 392,84 L 392,108"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.75"
                />
                <path
                  className={`${styles.tl} ${styles.tl4}`}
                  d="M 150,84 L 150,192"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.55"
                />
                <path
                  className={`${styles.tl} ${styles.tl5}`}
                  d="M 330,84 L 330,192"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.55"
                />

                {/* ── Nodes ── */}
                <TreeNode
                  cx={240} cy={28} w={208} accent={m.accent}
                  label="WeatherProvider" sub="currentTheme · setTheme"
                  cls={`${styles.tn} ${styles.tn0}`}
                  tcls={`${styles.tt} ${styles.tt0}`}
                  scls={`${styles.ts} ${styles.ts0}`}
                />
                <TreeNode
                  cx={90} cy={126} w={104} accent={m.accent}
                  label="Header" sub="useWeather()"
                  cls={`${styles.tn} ${styles.tn1}`}
                  tcls={`${styles.tt} ${styles.tt1}`}
                  scls={`${styles.ts} ${styles.ts1}`}
                />
                <TreeNode
                  cx={240} cy={126} w={150} accent={m.accent}
                  label="WeatherSelector" sub="get · set"
                  cls={`${styles.tn} ${styles.tn2}`}
                  tcls={`${styles.tt} ${styles.tt2}`}
                  scls={`${styles.ts} ${styles.ts2}`}
                />
                <TreeNode
                  cx={392} cy={126} w={116} accent={m.accent}
                  label="Background" sub="theme"
                  cls={`${styles.tn} ${styles.tn3}`}
                  tcls={`${styles.tt} ${styles.tt3}`}
                  scls={`${styles.ts} ${styles.ts3}`}
                />
                <TreeNode
                  cx={150} cy={210} w={120} accent={m.accent}
                  label="HomePage" sub="useWeather()"
                  cls={`${styles.tn} ${styles.tn4}`}
                  tcls={`${styles.tt} ${styles.tt4}`}
                  scls={`${styles.ts} ${styles.ts4}`}
                  small
                />
                <TreeNode
                  cx={330} cy={210} w={150} accent={m.accent}
                  label="OOTD · Daily …" sub="weatherMode"
                  cls={`${styles.tn} ${styles.tn5}`}
                  tcls={`${styles.tt} ${styles.tt5}`}
                  scls={`${styles.ts} ${styles.ts5}`}
                  small
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 4 — CSS 변수 반영                             */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={`${styles.scene} ${styles.sceneLast}`}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>04</p>
              <h2 className={styles.sceneTitle}>CSS 변수 반영</h2>
              <p className={styles.sceneDesc}>
                body의 <strong>theme 클래스</strong> 한 줄이 바뀌면{' '}
                <code className={styles.inlineCode}>tokens.css</code>의 원시 색이{' '}
                <code className={styles.inlineCode}>themes.css</code>의 의미 토큰으로
                재매핑됩니다. <code className={styles.inlineCode}>var()</code>로
                참조하는 모든 컴포넌트는 리렌더 없이 새 색상으로 적용됩니다.
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* body 태그 표시 */}
              <div className={styles.bodyTag}>
                <span className={styles.bodyTagPunct}>{'<body '}</span>
                <span className={styles.bodyTagKey}>class</span>
                <span className={styles.bodyTagPunct}>{'="theme-'}</span>
                <span className={styles.bodyTagVal} style={{ color: m.accent }}>
                  {weatherMode}
                </span>
                <span className={styles.bodyTagPunct}>{'">'}</span>
              </div>

              {/* CSS 변수 목록 */}
              <div className={styles.varList}>
                {[
                  { name: '--accent', val: m.accent, display: m.accent },
                  { name: '--bg', val: m.bg, display: m.bg },
                  { name: '--text', val: m.text, display: m.text },
                ].map((v) => (
                  <div key={v.name} className={styles.varRow}>
                    <span className={styles.varName}>{v.name}</span>
                    <span
                      className={styles.varSwatch}
                      style={{ background: v.val }}
                    />
                    <span className={styles.varVal}>{v.display}</span>
                  </div>
                ))}
              </div>

              {/* 미니 카드 — CSS vars 자동 반응 */}
              <div className={styles.miniCard}>
                <div
                  className={styles.miniCardImg}
                  style={{
                    background: `linear-gradient(135deg, ${m.accent}44 0%, ${m.accent}11 100%)`,
                  }}
                >
                  <span
                    className={styles.miniCardEmoji}
                    style={{ color: m.accent }}
                  >
                    <CurrentIcon size={32} strokeWidth={1.8} />
                  </span>
                  <div className={styles.miniCardShimmer} />
                </div>
                <div className={styles.miniCardBody}>
                  <div className={styles.miniCardTitle}>무드 추천</div>
                  <div className={styles.miniCardSub}>
                    무드에 맞는 코디·음식·액티비티
                  </div>
                  <span
                    className={styles.miniCardTag}
                    style={{
                      color: m.accent,
                      background: `${m.accent}22`,
                      borderColor: `${m.accent}44`,
                    }}
                  >
                    {m.label} 테마
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 5 — 기술 스택 & 엔진                         */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={`${styles.scene} ${styles.stackScene}`}>
          <div className={styles.stackHeader}>
            <p className={styles.sceneNum}>05</p>
            <h2 className={styles.stackTitle}>기술 스택 &amp; 엔진</h2>
            <p className={styles.stackSub}>WeatherUp을 만든 기술들</p>
          </div>

          {/* ── 코어 기술 ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Core</p>
            <div className={styles.stackGrid}>
              {STACK_CORE.map((item) => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

          {/* ── 라이브러리 & 폰트 ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Libraries &amp; Fonts</p>
            <div className={styles.stackGrid}>
              {STACK_LIBS.map((item) => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

          {/* ── 브라우저 API & 엔진 ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Browser API &amp; 엔진</p>
            <div className={styles.stackGrid}>
              {STACK_ENGINE.map((item) => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* end panel */}
    </>
  );
}

/* ── 인라인 헬퍼 컴포넌트 ── */

function StackCard({ item, accent }) {
  return (
    <div className={styles.stackCard}>
      <div className={styles.stackCardTop}>
        <span className={styles.stackIcon}>
          <span className="material-symbols-outlined">{item.icon}</span>
        </span>
        <div className={styles.stackMeta}>
          <span className={styles.stackName}>{item.name}</span>
          <span className={styles.stackVersion} style={{ color: accent }}>
            {item.version}
          </span>
        </div>
      </div>
      <p className={styles.stackDesc}>{item.desc}</p>
    </div>
  );
}

function Step({ num, active, children }) {
  return (
    <div className={`${styles.step} ${active ? styles.stepOn : ''}`}>
      <span className={styles.stepNum}>{num}</span>
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
}

function TreeNode({ cx, cy, w, accent, label, sub, cls, tcls, scls, small }) {
  const h = small ? 32 : 38;
  return (
    <g>
      <rect
        className={cls}
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx="8"
        fill={`${accent}18`}
        stroke={accent}
        strokeWidth="1.5"
      />
      <text
        className={tcls}
        x={cx}
        y={cy + (sub ? -4 : 5)}
        textAnchor="middle"
        fontSize={small ? 10 : 11}
        fontWeight="700"
        fill={accent}
      >
        {label}
      </text>
      {sub && (
        <text
          className={scls}
          x={cx}
          y={cy + 9}
          textAnchor="middle"
          fontSize="8.5"
          fill={accent}
          opacity="0.6"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export default AboutPanel;
