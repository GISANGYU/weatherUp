import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './AboutPanel.module.css';

/* ── 기술 스택 데이터 ── */
const STACK_CORE = [
  {
    icon: '⚛️',
    name: 'React 19',
    version: 'v19.2.5',
    desc: '컴포넌트 기반 UI 라이브러리. useState·useEffect·useRef 훅으로 상태와 사이드 이펙트를 관리합니다.',
    color: '#61DAFB',
  },
  {
    icon: '🔀',
    name: 'React Router',
    version: 'v7.14.1',
    desc: '클라이언트 사이드 라우팅. NavLink의 isActive로 현재 경로를 감지해 활성 스타일을 자동 적용합니다.',
    color: '#CA4245',
  },
  {
    icon: '🎨',
    name: 'CSS Modules',
    version: 'CRA 내장',
    desc: '빌드 시 클래스명을 고유값으로 변환해 충돌을 방지합니다. :global()로 테마 클래스와 조합합니다.',
    color: '#264DE4',
  },
  {
    icon: '🌈',
    name: 'CSS Custom Properties',
    version: 'Native',
    desc: 'body 테마 클래스 하나로 모든 컴포넌트의 색상·그림자를 동시에 전환합니다. var()로 참조합니다.',
    color: '#FF6B6B',
  },
];

const STACK_LIBS = [
  {
    icon: '🧱',
    name: 'react-masonry-css',
    version: 'v1.0.16',
    desc: 'OOTD·Food·Activity 서브페이지의 카드 그리드에 사용. 반응형 열 수 (4→3→2→1) 를 props 한 줄로 설정합니다.',
    color: '#F7B731',
  },
  {
    icon: '🔤',
    name: 'Pretendard',
    version: 'CDN',
    desc: '한글·영문 모두 지원하는 가변 폰트. public/index.html에서 CDN으로 불러와 전역 적용합니다.',
    color: '#A29BFE',
  },
];

const STACK_NATIVE = [
  {
    icon: '🖼️',
    name: 'Canvas API',
    version: 'Browser',
    desc: '4가지 날씨 배경 애니메이션의 엔진. requestAnimationFrame 루프로 매 프레임 렌더링하며, useRef로 Canvas DOM에 접근합니다.',
    color: '#00B894',
  },
  {
    icon: '👁️',
    name: 'IntersectionObserver',
    version: 'Browser',
    desc: '이 패널의 스크롤 애니메이션에 사용. 패널 컨테이너를 root로 지정해 씬이 뷰포트에 들어오면 data-visible 속성을 추가합니다.',
    color: '#74B9FF',
  },
  {
    icon: '🧮',
    name: 'Float32Array',
    version: 'Browser',
    desc: '눈 배경의 적설 표면을 픽셀 열 단위로 추적합니다. 일반 배열 대비 메모리 효율이 높아 애니메이션 성능을 유지합니다.',
    color: '#FD79A8',
  },
  {
    icon: '🎞️',
    name: 'requestAnimationFrame',
    version: 'Browser',
    desc: '브라우저의 리페인트 주기에 맞춰 캔버스를 그립니다. useEffect 클린업에서 cancelAnimationFrame으로 루프를 종료합니다.',
    color: '#FDCB6E',
  },
];

/* ── 날씨별 메타 (CSS vars의 실제 값과 일치) ── */
const META = {
  sunny:  { emoji: '☀️', label: '맑음', accent: '#FFB800', bg: '#EEF6FF', text: '#1A2B3C' },
  cloudy: { emoji: '⛅', label: '흐림', accent: '#8A9BB0', bg: '#F0F0F0', text: '#3A3A3A' },
  rainy:  { emoji: '🌧️', label: '비',   accent: '#4A9EFF', bg: '#1C2B3A', text: '#E8F4FF' },
  snowy:  { emoji: '❄️', label: '눈',   accent: '#6A9FD8', bg: '#EAF0FF', text: '#2A3A5A' },
};
const MODES = ['sunny', 'cloudy', 'rainy', 'snowy'];

/* ─────────────────────────────────────────── */
function AboutPanel({ isOpen, onClose, weatherMode, setWeatherMode }) {
  const panelRef  = useRef(null);
  const obsRef    = useRef(null);
  const timersRef = useRef([]);

  /* ── 스크롤 reveal 설정 ── */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;

    /* 패널 열릴 때 최상단으로 + 이전 visible 리셋 */
    panel.scrollTop = 0;
    panel.querySelectorAll('[data-scene]').forEach(el => el.removeAttribute('data-visible'));

    /* 패널 오픈 애니메이션(0.48s) 끝난 뒤 observer 연결 */
    const tid = setTimeout(() => {
      if (!panelRef.current) return;
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) e.target.setAttribute('data-visible', 'true');
        }),
        { root: panelRef.current, threshold: 0.12 }
      );
      panelRef.current.querySelectorAll('[data-scene]').forEach(el => observer.observe(el));
      obsRef.current = observer;
    }, 520);

    return () => {
      clearTimeout(tid);
      obsRef.current?.disconnect();
    };
  }, [isOpen]);

  /* ── ESC 닫기 ── */
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  /* ── 패널 열릴 때 뒷배경 스크롤 잠금 ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Scene 2: 단계 애니메이션 상태 ── */
  const [stepCount, setStepCount] = useState(0);

  const handleModeClick = useCallback((mode) => {
    if (mode === weatherMode) return;
    timersRef.current.forEach(clearTimeout);
    setWeatherMode(mode);
    setStepCount(0);
    const t1 = setTimeout(() => setStepCount(1), 60);
    const t2 = setTimeout(() => setStepCount(2), 420);
    const t3 = setTimeout(() => setStepCount(3), 780);
    timersRef.current = [t1, t2, t3];
  }, [weatherMode, setWeatherMode]);

  /* weatherMode 바뀔 때 stepCount 초기화 (외부 변경 시) */
  useEffect(() => { setStepCount(0); }, [weatherMode]);

  const m = META[weatherMode];

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
        {/* ── 고정 헤더 ── */}
        <div className={styles.panelNav}>
          <div className={styles.panelNavLeft}>
            <span className={styles.navDot} style={{ background: m.accent }} />
            <span className={styles.navTitle}>구조 이야기</span>
          </div>
          <div className={styles.navMeta}>
            <span className={styles.navMode} style={{ color: m.accent }}>
              {m.emoji} {m.label}
            </span>
            <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* SCENE 1 — 상태의 탄생                              */}
        {/* ════════════════════════════════════════════════════ */}
        <section data-scene className={styles.scene}>
          <div className={styles.sceneWrap}>

            <div className={styles.sceneText}>
              <p className={styles.sceneNum}>01</p>
              <h2 className={styles.sceneTitle}>상태의<br />탄생</h2>
              <p className={styles.sceneDesc}>
                복잡한 전역 상태 라이브러리 없이,
                <strong> App.js 하나</strong>가
                날씨 상태를 소유합니다.
                이 단 한 줄이 앱 전체의 테마·데이터·UI를 결정합니다.
              </p>
              <p className={styles.sceneSub}>
                ↓ 오른쪽의 상태 값은 실시간으로 바뀝니다
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* macOS 스타일 코드 카드 */}
              <div className={styles.codeCard}>
                <div className={styles.codeCardBar}>
                  <span style={{ background: '#FF5F57' }} className={styles.trafficDot} />
                  <span style={{ background: '#FFBD2E' }} className={styles.trafficDot} />
                  <span style={{ background: '#28C840' }} className={styles.trafficDot} />
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
                    <span className={styles.cstr}>'sunny'</span>
                    {')'}
                    <span className={styles.cursor} />
                  </div>
                </div>

                {/* 실시간 상태 표시 */}
                <div className={styles.stateLive}>
                  <span className={styles.stateLiveLabel}>현재 상태</span>
                  <span
                    className={styles.stateLiveVal}
                    style={{ background: m.accent, color: weatherMode === 'sunny' || weatherMode === 'snowy' ? '#1A2B3C' : '#fff' }}
                  >
                    {m.emoji}&nbsp;&nbsp;{weatherMode}
                  </span>
                </div>
              </div>

              {/* 아래 힌트 */}
              <p className={styles.visualHint}>버튼을 눌러 상태를 바꿔보세요 ↓</p>
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
              <h2 className={styles.sceneTitle}>클릭이<br />만드는 변화</h2>
              <p className={styles.sceneDesc}>
                버튼 클릭 하나가 세 가지 연쇄 반응을 만듭니다.
                오른쪽 버튼을 눌러 직접 확인해보세요.
                실제 앱 테마가 함께 바뀝니다.
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* 인터랙티브 날씨 버튼 */}
              <div className={styles.demoBtns}>
                {MODES.map(mode => {
                  const isActive = weatherMode === mode;
                  return (
                    <button
                      key={mode}
                      className={`${styles.demoBtn} ${isActive ? styles.demoBtnOn : ''}`}
                      style={isActive ? { '--c': META[mode].accent } : {}}
                      onClick={() => handleModeClick(mode)}
                    >
                      <span className={styles.demoBtnEmoji}>{META[mode].emoji}</span>
                      <span className={styles.demoBtnLabel}>{META[mode].label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 단계별 흐름 reveal */}
              <div className={styles.steps}>
                <Step num="①" active={stepCount >= 1}>
                  <code>setWeatherMode(<span style={{ color: m.accent }}>'{weatherMode}'</span>)</code>
                  <span className={styles.stepTag}>setter 호출</span>
                </Step>
                <Step num="②" active={stepCount >= 2}>
                  <span>App.js 리렌더 →</span>
                  <span className={styles.stepBadge} style={{ background: m.accent, color: weatherMode === 'sunny' || weatherMode === 'snowy' ? '#1A2B3C' : '#fff' }}>
                    {m.emoji} {weatherMode}
                  </span>
                  <span className={styles.stepTag}>상태 갱신</span>
                </Step>
                <Step num="③" active={stepCount >= 3}>
                  <code>{'<body class="theme-'}<span style={{ color: m.accent }}>{weatherMode}</span>{'">'}</code>
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
              <h2 className={styles.sceneTitle}>Props가<br />흐른다</h2>
              <p className={styles.sceneDesc}>
                상태는 <strong>단방향</strong>으로만 흐릅니다.
                App이 만든 weatherMode는
                필요한 컴포넌트에만 props로 전달되고,
                각 컴포넌트는 받은 값에 따라 렌더링합니다.
              </p>
              <div className={styles.legendRow}>
                <span className={styles.legendDot} style={{ background: m.accent }} />
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
                <path className={`${styles.tl} ${styles.tl1}`}
                  d="M 240,46 C 240,78 100,78 100,110"
                  fill="none" stroke={m.accent} strokeWidth="2" />
                {/* App → HomePage */}
                <path className={`${styles.tl} ${styles.tl2}`}
                  d="M 240,46 L 240,110"
                  fill="none" stroke={m.accent} strokeWidth="2" />
                {/* App → OOTDPage */}
                <path className={`${styles.tl} ${styles.tl3}`}
                  d="M 240,46 C 240,78 380,78 380,110"
                  fill="none" stroke={m.accent} strokeWidth="2" />
                {/* HomePage → HeroSelector */}
                <path className={`${styles.tl} ${styles.tl4}`}
                  d="M 240,148 C 240,178 170,178 170,202"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.7" />
                {/* HomePage → OutfitCard */}
                <path className={`${styles.tl} ${styles.tl5}`}
                  d="M 240,148 C 240,178 320,178 320,202"
                  fill="none" stroke={m.accent} strokeWidth="1.5" strokeOpacity="0.7" />

                {/* ── Nodes ── */}
                <TreeNode cx={240} cy={28} w={120} accent={m.accent} label="App.js" sub="useState" cls={`${styles.tn} ${styles.tn0}`} tcls={`${styles.tt} ${styles.tt0}`} scls={`${styles.ts} ${styles.ts0}`} />
                <TreeNode cx={100} cy={128} w={100} accent={m.accent} label="Header" sub="weatherMode" cls={`${styles.tn} ${styles.tn1}`} tcls={`${styles.tt} ${styles.tt1}`} scls={`${styles.ts} ${styles.ts1}`} />
                <TreeNode cx={240} cy={128} w={116} accent={m.accent} label="HomePage" sub="+ setter" cls={`${styles.tn} ${styles.tn2}`} tcls={`${styles.tt} ${styles.tt2}`} scls={`${styles.ts} ${styles.ts2}`} />
                <TreeNode cx={380} cy={128} w={100} accent={m.accent} label="OOTDPage" sub="weatherMode" cls={`${styles.tn} ${styles.tn3}`} tcls={`${styles.tt} ${styles.tt3}`} scls={`${styles.ts} ${styles.ts3}`} />
                <TreeNode cx={170} cy={220} w={110} accent={m.accent} label="HeroSelector" sub="setWeatherMode" cls={`${styles.tn} ${styles.tn4}`} tcls={`${styles.tt} ${styles.tt4}`} scls={`${styles.ts} ${styles.ts4}`} small />
                <TreeNode cx={320} cy={220} w={106} accent={m.accent} label="OutfitCard" sub="weatherMode" cls={`${styles.tn} ${styles.tn5}`} tcls={`${styles.tt} ${styles.tt5}`} scls={`${styles.ts} ${styles.ts5}`} small />
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
              <h2 className={styles.sceneTitle}>CSS가<br />반응한다</h2>
              <p className={styles.sceneDesc}>
                body의 테마 클래스가 바뀌면
                CSS Custom Properties가 바뀌고,
                <code className={styles.inlineCode}>var()</code>를 쓰는
                모든 컴포넌트가 자동으로 새 색상을 적용합니다.
                오른쪽은 실시간으로 바뀝니다.
              </p>
            </div>

            <div className={styles.sceneVisual}>
              {/* body 태그 표시 */}
              <div className={styles.bodyTag}>
                <span className={styles.bodyTagPunct}>{'<body '}</span>
                <span className={styles.bodyTagKey}>class</span>
                <span className={styles.bodyTagPunct}>{"=\"theme-"}</span>
                <span className={styles.bodyTagVal} style={{ color: m.accent }}>{weatherMode}</span>
                <span className={styles.bodyTagPunct}>{'">'}</span>
              </div>

              {/* CSS 변수 목록 */}
              <div className={styles.varList}>
                {[
                  { name: '--accent',  val: m.accent,                    display: m.accent },
                  { name: '--bg',      val: m.bg,                        display: m.bg     },
                  { name: '--text',    val: m.text,                      display: m.text   },
                ].map(v => (
                  <div key={v.name} className={styles.varRow}>
                    <span className={styles.varName}>{v.name}</span>
                    <span className={styles.varSwatch} style={{ background: v.val }} />
                    <span className={styles.varVal}>{v.display}</span>
                  </div>
                ))}
              </div>

              {/* 미니 카드 — CSS vars 자동 반응 */}
              <div className={styles.miniCard}>
                <div className={styles.miniCardImg} style={{ background: `linear-gradient(135deg, ${m.accent}44 0%, ${m.accent}11 100%)` }}>
                  <span className={styles.miniCardEmoji}>{m.emoji}</span>
                  <div className={styles.miniCardShimmer} />
                </div>
                <div className={styles.miniCardBody}>
                  <div className={styles.miniCardTitle}>오늘의 추천</div>
                  <div className={styles.miniCardSub}>날씨에 맞는 코디·음식·액티비티</div>
                  <span className={styles.miniCardTag} style={{ color: m.accent, background: `${m.accent}22`, borderColor: `${m.accent}44` }}>
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
              {STACK_CORE.map(item => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

          {/* ── 라이브러리 ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Libraries</p>
            <div className={styles.stackGrid}>
              {STACK_LIBS.map(item => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

          {/* ── 네이티브 API ── */}
          <div className={styles.stackGroup}>
            <p className={styles.stackGroupLabel}>Native API &amp; Techniques</p>
            <div className={styles.stackGrid}>
              {STACK_NATIVE.map(item => (
                <StackCard key={item.name} item={item} accent={m.accent} />
              ))}
            </div>
          </div>

        </section>

      </div>{/* end panel */}
    </>
  );
}

/* ── 인라인 헬퍼 컴포넌트 ── */

function StackCard({ item, accent }) {
  return (
    <div className={styles.stackCard}>
      <div className={styles.stackCardTop}>
        <span className={styles.stackIcon} style={{ background: `${item.color}22`, borderColor: `${item.color}44` }}>
          {item.icon}
        </span>
        <div className={styles.stackMeta}>
          <span className={styles.stackName}>{item.name}</span>
          <span className={styles.stackVersion} style={{ color: accent }}>{item.version}</span>
        </div>
      </div>
      <p className={styles.stackDesc}>{item.desc}</p>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
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
        x={cx - w / 2} y={cy - h / 2}
        width={w} height={h}
        rx="8"
        fill={`${accent}18`}
        stroke={accent}
        strokeWidth="1.5"
      />
      <text className={tcls} x={cx} y={cy + (sub ? -4 : 5)} textAnchor="middle"
        fontSize={small ? 10 : 11} fontWeight="700" fill={accent}>
        {label}
      </text>
      {sub && (
        <text className={scls} x={cx} y={cy + 9} textAnchor="middle"
          fontSize="8.5" fill={accent} opacity="0.6">
          {sub}
        </text>
      )}
    </g>
  );
}

export default AboutPanel;
