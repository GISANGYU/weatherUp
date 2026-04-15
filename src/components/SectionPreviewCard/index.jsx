import { Link } from 'react-router-dom';
import styles from './SectionPreviewCard.module.css';

function SectionPreviewCard({ emoji, title, subtitle, link }) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.emoji}>{emoji}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p  className={styles.sub}>{subtitle}</p>
        <span className={styles.cta}>바로가기 →</span>
      </div>
    </Link>
  );
}

export default SectionPreviewCard;
