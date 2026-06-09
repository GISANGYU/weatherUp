import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <h1 className={styles.title}>WeatherUp 🌤️</h1>
        <p className={styles.sub}>
          날씨를 선택 가능한 UI 무드로 활용해<br />
          패션·음식·액티비티·음악을 큐레이션하는 React 라이프스타일 서비스입니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>프로젝트 소개</h2>
        <div className={styles.card}>
          <p>
            WeatherUp은 단순한 날씨 앱이 아닙니다. 7가지 날씨 무드 중 하나를 직접 고르면,
            그 무드에 맞는 옷·음식·액티비티·음악을 추천해드려요. 날씨를 예보가 아니라
            <strong> 선택 가능한 분위기</strong>로 다룹니다.
          </p>
          <p style={{ marginTop: '12px' }}>
            각 무드는 고유한 디자인 테마를 가지며, 배경 애니메이션은 마우스 움직임에 반응하는
            인터랙티브 캔버스로 구현되었습니다.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>기술 스택</h2>
        <div className={styles.techGrid}>
          {['React', 'React Router', 'CSS Modules', 'Canvas API', 'react-masonry-css', 'Pretendard'].map(t => (
            <span key={t} className={styles.tech}>{t}</span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>날씨 무드 7가지</h2>
        <div className={styles.themeGrid}>
          {[
            { icon: '☀️', name: 'Sunny',         desc: '밝은 앰버 톤, 햇살 가득한 에너지' },
            { icon: '⛅', name: 'Partly Cloudy', desc: '산뜻한 블루그레이, 흐르는 구름' },
            { icon: '❄️', name: 'Snowy',         desc: '크리스탈 소프트, 포근한 정적' },
            { icon: '🌫️', name: 'Dusty',         desc: '뿌연 베이지, 노스탤지어' },
            { icon: '☁️', name: 'Cloudy',        desc: '차분한 다크 그레이, 사색의 무드' },
            { icon: '🌧️', name: 'Rainy',         desc: '다크 글래스모피즘, 빗줄기 + 물결 파동' },
            { icon: '⚡', name: 'Stormy',        desc: '딥 퍼플, 번개 플래시의 카타르시스' },
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
