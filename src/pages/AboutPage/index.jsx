import styles from './AboutPage.module.css';

function AboutPage({ weatherMode }) {
  return (
    <div className="container">
      <section className={styles.hero}>
        <h1 className={styles.title}>WeatherUp 🌤️</h1>
        <p className={styles.sub}>
          날씨를 UI 모드로 활용해<br />
          패션·음식·액티비티를 큐레이션하는 React 라이프스타일 서비스입니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>프로젝트 소개</h2>
        <div className={styles.card}>
          <p>
            WeatherUp은 단순한 날씨 앱이 아닙니다. 맑은 날, 흐린 날, 비 오는 날, 눈 오는 날—
            날씨 하나로 오늘 어떤 옷을 입고, 무엇을 먹고, 어떤 활동을 할지 추천해드려요.
          </p>
          <p style={{ marginTop: '12px' }}>
            각 날씨는 고유한 디자인 테마를 가지며, 배경 애니메이션은 마우스 움직임에 반응하는
            인터랙티브 캔버스로 구현되었습니다.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>기술 스택</h2>
        <div className={styles.techGrid}>
          {['React 18', 'React Router v6', 'CSS Modules', 'Canvas API', 'react-masonry-css', 'Pretendard'].map(t => (
            <span key={t} className={styles.tech}>{t}</span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>날씨 테마</h2>
        <div className={styles.themeGrid}>
          {[
            { icon: '☀️', name: 'Sunny',  desc: '밝은 앰버 톤, 햇살 레이 애니메이션' },
            { icon: '⛅', name: 'Cloudy', desc: '미니멀 그레이, 멀티레이어 구름 패럴랙스' },
            { icon: '🌧️', name: 'Rainy',  desc: '다크 글래스모피즘, 빗줄기 + 물결 파동' },
            { icon: '❄️', name: 'Snowy',  desc: '크리스탈 소프트, 마우스 반응 눈 물리' },
          ].map(({ icon, name, desc }) => (
            <div key={name} className={styles.themeCard}>
              <span className={styles.themeIcon}>{icon}</span>
              <strong>{name}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
