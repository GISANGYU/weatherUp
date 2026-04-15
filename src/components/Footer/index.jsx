import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styles from './Footer.module.css';

const SOCIAL = [
  { icon: <FaInstagram />,    label: 'Instagram', href: 'https://github.com/GISANGYU' },
  { icon: <FaFacebook />,     label: 'Facebook',  href: 'https://github.com/GISANGYU' },
  { icon: <RiKakaoTalkFill />,label: 'KakaoTalk', href: 'https://github.com/GISANGYU' },
  { icon: <FaGithub />,       label: 'GitHub',    href: 'https://github.com/GISANGYU' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* ① 브랜드 */}
        <div className={styles.brand}>
          <span className={styles.logo}>WeatherUp</span>
          <p className={styles.tagline}>
            날씨로 완성하는<br />하루의 라이프스타일
          </p>
        </div>

        {/* ② 소셜 아이콘 2×2 */}
        <div className={styles.socialBlock}>
          <p className={styles.socialTitle}>Follow</p>
          <div className={styles.socialGrid}>
            {SOCIAL.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* 하단 카피라이트 */}
      <div className={styles.bottom}>
        <span>© 2026 WeatherUp</span>
        <span className={styles.sep}>·</span>
        <span>Made by GISANGYU</span>
      </div>
    </footer>
  );
}

export default Footer;
