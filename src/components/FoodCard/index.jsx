import { getCardVisuals } from '../../data/cardVisuals';
import styles from './FoodCard.module.css';

function FoodCard({ item, weatherMode }) {
  const { grad, imgH } = getCardVisuals(item.id, weatherMode);

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap} style={{ background: grad, height: imgH }}>
        <span className={styles.bgEmoji}>{item.emoji}</span>
        <div className={styles.shimmer} />
        <span className={styles.emojiBadge}>{item.emoji}</span>
        {item.badges?.[0] && (
          <span className={styles.topBadge}>{item.badges[0]}</span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>
        <p  className={styles.desc}>{item.desc}</p>

        {item.badges?.length > 1 && (
          <div className={styles.badges}>
            {item.badges.slice(1).map(b => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        )}

        <div className={styles.keywords}>
          {item.keywords.map(kw => (
            <span key={kw} className={styles.kw}>#{kw}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
