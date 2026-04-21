import { useEffect, useRef, useState, useCallback } from 'react';
import { LuSun, LuCloud, LuCloudRain, LuSnowflake } from 'react-icons/lu';
import styles from './AboutPanel.module.css';

/* 테마별 라인 아이콘 — Header/Hero 토글과 동일 세트 */
const ICONS = {
  sunny: LuSun,
  cloudy: LuCloud,
  rainy: LuCloudRain,
  snowy: LuSnowflake,
};

/* ── 기술 스택 데이터 ── */
const STACK_CORE = [
  {
    icon: 'hub',
    name: 'React 19',
    version: 'v19.2.5',
    desc: 'App.js 단일 useState로 날씨 상태 관리 useEffect로 body 테마 클래스 동기화, useRef로 캔버스 DOM 접근',
  },
  {
    icon: 'route',
    name: 'React Router',
    version: 'v7.14.1',
    desc: '홈·OOTD·Food·Activity·Music 5개 라우트 클라이언트 사이드 전환 NavLink의 isActive로 현재 메뉴 스타일 자동 적용',
  },
  {
    icon: 'style',
    name: 'CSS Modules',
    version: 'CRA 내장',
    desc: '빌드 시 클래스명 해시화로 스코프 충돌 방지 테마 등 전역 선택자는 :global() 병용',
  },
  {
    icon: 'palette',
    name: 'CSS Custom Properties',
    version: 'Native',
    desc: 'body의 theme-{mode} 클래스 한 번 교체로 색상·그림자·배경 일괄 전환 컴포넌트는 var() 참조',
  },
];

const STACK_LIBS = [
  {
    icon: 'view_quilt',
    name: 'react-masonry-css',
    version: 'v1.0.16',
    desc: 'OOTD·Food·Activity 카드 그리드에 사용, 창 너비별 4→3→2열 반응형 적용',
  },
  {
    icon: 'font_download',
    name: 'Pretendard',
    version: 'CDN',
    desc: '한글·영문 동일 무게 가변 폰트 index.html link 태그 CDN 연결로 전역 적용',
  },
  {
    icon: 'widgets',
    name: 'react-icons',
    version: 'v5.6.0',
    desc: 'Lucide 라인 아이콘 세트 적용 SVG currentColor로 테마 색상 자동 동기화',
  },
];

const STACK_NATIVE = [
  {
    icon: 'draw',
    name: 'Canvas API',
    version: 'Browser',
    desc: '맑음·흐림·비·눈 4종 배경 엔진 태양, 구름 패럴랙스, 빗방울 ripple, 눈 내리는 효과 렌더링에 사용',
  },
  {
    icon: 'visibility',
    name: 'IntersectionObserver',
    version: 'Browser',
    desc: '씬 스크롤 reveal에 사용, 뷰포트 진입 시 data-visible 속성 부여',
  },
  {
    icon: 'memory',
    name: 'Float32Array',
    version: 'Browser',
    desc: '눈 쌓이는 효과 구현, 높이를 가로 픽셀 열마다 저장 숫자 전용 버퍼로 메모리 효율 확보 및 프레임 유지',
  },
  {
    icon: 'animation',
    name: 'requestAnimationFrame',
    version: 'Browser',
    desc: '캔버스 프레임 루프 엔진 useEffect 클린업에서 cancelAnimationFrame으로 루프 중단',
  },
];

/* ── 날씨별 메타 (CSS vars의 실제 값과 일치) ── */
const META = {
  sunny: {
    emoji: '☀️',
    label: '맑음',
    accent: '#FFB800',
    bg: '#EEF6FF',
    text: '#1A2B3C',
  },
  cloudy: {
    emoji: '⛅',
    label: '흐림',
    accent: '#8A9BB0',
    bg: '#F0F0F0',
    text: '#3A3A3A',
  },
  rainy: {
    emoji: '🌧️',
    label: '비',
    accent: '#4A9EFF',
    bg: '#1C2B3A',
    text: '#E8F4FF',
  },
  snowy: {
    emoji: '❄️',
    label: '눈',
    accent: '#6A9FD8',
    bg: '#EAF0FF',
    text: '#2A3A5A',
  },
};
const MODES = ['sunny', 'cloudy', 'rainy', 'snowy'];

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
        {/* SCENE 1 — 상태의 탄생                              */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>01</p>
              <h2 className={styles.sceneTitle}>상태 관리</h2>
              <p className={styles.sceneDesc}>
                복잡한 전역 상태 라이브러리 없이,
                <strong> App.js 하나</strong>가 날씨 상태를 소유합니다. 이 단 한
                줄이 앱 전체의 테마·데이터·UI를 결정합니다.
              </p>
              <p className={styles.sceneSub}>
                ↓ 오른쪽의 상태 값은 실시간으로 바뀝니다
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
                  <span className={styles.codeFileName}>App.js</span>
                </div>
                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.ckw}>const</span>
                    {' ['}
                    <span className={styles.cvar}>weatherMode</span>
                    {', '}
                    <span className={styles.cvar}>setWeatherMode</span>
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
                      color:
                        weatherMode === 'sunny' || weatherMode === 'snowy'
                          ? '#1A2B3C'
                          : '#fff',
                    }}
                  >
                    {m.emoji}&nbsp;&nbsp;{weatherMode}
                  </span>
                </div>
              </div>

              {/* 아래 힌트 */}
              {/* <p className={styles.visualHint}>
                버튼을 눌러 상태를 바꿔보세요 ↓
              </p> */}
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
                날씨 테마 버튼 클릭 하나가 세 가지 연쇄 반응을 일으킵니다.
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
                    setWeatherMode(
                    <span style={{ color: m.accent }}>'{weatherMode}'</span>)
                  </code>
                  <span className={styles.stepTag}>setter 호출</span>
                </Step>
                <Step num="②" active={stepCount >= 2}>
                  <span>App.js 리렌더 →</span>
                  <span
                    className={styles.stepBadge}
                    style={{
                      background: m.accent,
                      color:
                        weatherMode === 'sunny' || weatherMode === 'snowy'
                          ? '#1A2B3C'
                          : '#fff',
                    }}
                  >
                    <CurrentIcon size={13} strokeWidth={2.1} />
                    {weatherMode}
                  </span>
                  <span className={styles.stepTag}>상태 갱신</span>
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
        {/* SCENE 3 — Props 흐름                               */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>03</p>
              <h2 className={styles.sceneTitle}>Props 구조</h2>
              <p className={styles.sceneDesc}>
                상태는 <strong>단방향</strong>으로만 흐릅니다. App이 만든
                weatherMode는 필요한 컴포넌트에만 props로 전달되고, 각
                컴포넌트는 받은 값에 따라 렌더링합니다.
              </p>
              <div className={styles.legendRow}>
                <span
                  className={styles.legendDot}
                  style={{ background: m.accent }}
                />
                <span className={styles.legendText}>weatherMode 전달 경로</span>
              </div>
            </div>

            <div className={styles.sceneVisual}>
              <svg
                className={styles.treeSvg}
                viewBox="0 0 480 260"
                aria-hidden="true"
              >
                {/* ── Lines ── */}
                {/* App → Header */}
                <path
                  className={`${styles.tl} ${styles.tl1}`}
                  d="M 240,46 C 240,78 100,78 100,110"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="2"
                />
                {/* App → HomePage */}
                <path
                  className={`${styles.tl} ${styles.tl2}`}
                  d="M 240,46 L 240,110"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="2"
                />
                {/* App → OOTDPage */}
                <path
                  className={`${styles.tl} ${styles.tl3}`}
                  d="M 240,46 C 240,78 380,78 380,110"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="2"
                />
                {/* HomePage → HeroSelector */}
                <path
                  className={`${styles.tl} ${styles.tl4}`}
                  d="M 240,148 C 240,178 170,178 170,202"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                {/* HomePage → OutfitCard */}
                <path
                  className={`${styles.tl} ${styles.tl5}`}
                  d="M 240,148 C 240,178 320,178 320,202"
                  fill="none"
                  stroke={m.accent}
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />

                {/* ── Nodes ── */}
                <TreeNode
                  cx={240}
                  cy={28}
                  w={120}
                  accent={m.accent}
                  label="App.js"
                  sub="useState"
                  cls={`${styles.tn} ${styles.tn0}`}
                  tcls={`${styles.tt} ${styles.tt0}`}
                  scls={`${styles.ts} ${styles.ts0}`}
                />
                <TreeNode
                  cx={100}
                  cy={128}
                  w={100}
                  accent={m.accent}
                  label="Header"
                  sub="weatherMode"
                  cls={`${styles.tn} ${styles.tn1}`}
                  tcls={`${styles.tt} ${styles.tt1}`}
                  scls={`${styles.ts} ${styles.ts1}`}
                />
                <TreeNode
                  cx={240}
                  cy={128}
                  w={116}
                  accent={m.accent}
                  label="HomePage"
                  sub="+ setter"
                  cls={`${styles.tn} ${styles.tn2}`}
                  tcls={`${styles.tt} ${styles.tt2}`}
                  scls={`${styles.ts} ${styles.ts2}`}
                />
                <TreeNode
                  cx={380}
                  cy={128}
                  w={100}
                  accent={m.accent}
                  label="OOTDPage"
                  sub="weatherMode"
                  cls={`${styles.tn} ${styles.tn3}`}
                  tcls={`${styles.tt} ${styles.tt3}`}
                  scls={`${styles.ts} ${styles.ts3}`}
                />
                <TreeNode
                  cx={170}
                  cy={220}
                  w={110}
                  accent={m.accent}
                  label="HeroSelector"
                  sub="setWeatherMode"
                  cls={`${styles.tn} ${styles.tn4}`}
                  tcls={`${styles.tt} ${styles.tt4}`}
                  scls={`${styles.ts} ${styles.ts4}`}
                  small
                />
                <TreeNode
                  cx={320}
                  cy={220}
                  w={106}
                  accent={m.accent}
                  label="OutfitCard"
                  sub="weatherMode"
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
        {/* SCENE 4 — CSS 반응                                  */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={`${styles.scene} ${styles.sceneLast}`}>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>04</p>
              <h2 className={styles.sceneTitle}>CSS 변수 반영</h2>
              <p className={styles.sceneDesc}>
                body의 <strong>theme 클래스</strong> 한 줄이 바뀌면 CSS Custom
                Properties가 재정의됩니다.{' '}
                <code className={styles.inlineCode}>var()</code>로 참조하는 모든
                컴포넌트는 리렌더 없이 새 색상을 입습니다.
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
                  <div className={styles.miniCardTitle}>오늘의 추천</div>
                  <div className={styles.miniCardSub}>
                    날씨에 맞는 코디·음식·액티비티
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
        {/* SCENE 5 — 기술 스택 & 라이브러리                  */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={`${styles.scene} ${styles.stackScene}`}>
          <div className={styles.stackHeader}>
            <p className={styles.sceneNum}>05</p>
            <h2 className={styles.stackTitle}>기술 스택 &amp; 라이브러리</h2>
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

          {/* ── 라이브러리 ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Libraries</p>
            <div className={styles.stackGrid}>
              {STACK_LIBS.map((item) => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

          {/* ── 네이티브 API ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>
              Native API &amp; Techniques
            </p>
            <div className={styles.stackGrid}>
              {STACK_NATIVE.map((item) => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 6 — 로드맵                                    */}
        {/* ════════════════════════════════════════════════════ */}
        <section
          data-scene
          className={`${styles.scene} ${styles.roadmapScene}`}
        >
          <div className={styles.stackHeader}>
            <p className={styles.sceneNum}>06</p>
            <h2 className={styles.stackTitle}>개발 로드맵</h2>
            <p className={styles.stackSub}>WeatherUp의 현재와 다음 단계</p>
          </div>

          <div className={styles.roadmapGrid}>
            {/* Phase 1 */}
            <div className={styles.roadmapPhase}>
              <div className={styles.roadmapPhaseHeader}>
                <span className={styles.roadmapBadgeDone}>Phase 1</span>
                <span className={styles.roadmapPhaseTitle}>
                  중간고사 · 완료
                </span>
              </div>
              <ul className={styles.roadmapList}>
                {[
                  <>
                    4가지 날씨 모드 버튼 (
                    <LuSun size={13} strokeWidth={1.9} style={{ verticalAlign: '-2px' }} />
                    {' '}
                    <LuCloud size={13} strokeWidth={1.9} style={{ verticalAlign: '-2px' }} />
                    {' '}
                    <LuCloudRain size={13} strokeWidth={1.9} style={{ verticalAlign: '-2px' }} />
                    {' '}
                    <LuSnowflake size={13} strokeWidth={1.9} style={{ verticalAlign: '-2px' }} />
                    )
                  </>,
                  '정적 데이터 기반 콘텐츠 (weatherData.js)',
                  'CSS Custom Properties 테마 전환',
                  '5개 페이지 라우팅 (홈·패션·음식·액티비티·음악)',
                  'iTunes API 앨범 커버 자동 로딩',
                  'Canvas API 날씨 배경 애니메이션',
                  'react-masonry-css Masonry 레이아웃',
                  'Context API 전역 상태 관리',
                  'FloatingPlayer 음악 재생 UI',
                ].map((item, i) => (
                  <li key={i} className={styles.roadmapItem}>
                    <span className={styles.roadmapDone}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 구분선 */}
            <div className={styles.roadmapDivider}>
              <div
                className={styles.roadmapDividerLine}
                style={{ background: m.accent }}
              />
              <span className={styles.roadmapArrow} style={{ color: m.accent }}>
                →
              </span>
              <div
                className={styles.roadmapDividerLine}
                style={{ background: m.accent }}
              />
            </div>

            {/* Phase 2 */}
            <div className={styles.roadmapPhase}>
              <div className={styles.roadmapPhaseHeader}>
                <span className={styles.roadmapBadgeNext}>Phase 2</span>
                <span className={styles.roadmapPhaseTitle}>
                  기말고사 · 예정
                </span>
              </div>
              <ul className={styles.roadmapList}>
                {[
                  {
                    text: 'OpenWeatherMap API — 실시간 날씨 자동 감지',
                    tag: 'API',
                  },
                  {
                    text: 'Geolocation — 현재 위치 기반 날씨 조회',
                    tag: 'API',
                  },
                  { text: '7일 날짜 버튼 — 날짜별 날씨 조회 UI', tag: 'UI' },
                  { text: 'Kakao Maps — 위치 기반 맛집 추천', tag: 'MAP' },
                  {
                    text: 'Google Places — 주변 액티비티 장소 연동',
                    tag: 'MAP',
                  },
                ].map(({ text, tag }) => (
                  <li key={text} className={styles.roadmapItem}>
                    <span
                      className={styles.roadmapNext}
                      style={{ color: m.accent }}
                    >
                      ○
                    </span>
                    <span className={styles.roadmapItemText}>{text}</span>
                    <span
                      className={styles.roadmapTag}
                      style={{
                        color: m.accent,
                        borderColor: `${m.accent}55`,
                        background: `${m.accent}14`,
                      }}
                    >
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
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
