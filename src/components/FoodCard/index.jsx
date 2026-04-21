import { useState } from 'react';
import useScrollFade from '../../hooks/useScrollFade';
import { getCardVisuals } from '../../data/cardVisuals';
import styles from './FoodCard.module.css';

function FoodCard({ item, weatherMode }) {
  const { grad } = getCardVisuals(item.id, weatherMode);
  const { ref, isVisible } = useScrollFade();
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = item.imageUrl && !imgFailed;

  const Tag = item.shopUrl ? 'a' : 'div';
  const linkProps = item.shopUrl
    ? { href: item.shopUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      ref={ref}
      className={`${styles.card} ${item.shopUrl ? styles.cardLink : ''} fade-up ${isVisible ? 'visible' : ''}`}
      {...linkProps}
    >
      <div className={styles.imgWrap} style={showImg ? {} : { background: grad }}>
        {showImg && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className={styles.productImg}
            onError={() => setImgFailed(true)}
          />
        )}
        <div className={styles.imgOverlay}>
          <h3 className={styles.imgTitle}>{item.title}</h3>
          {item.badges?.[0] && (
            <span className={styles.badge}>{item.badges[0]}</span>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.desc}>{item.desc}</p>
        <div className={styles.keywords}>
          {item.keywords.map(kw => (
            <span key={kw} className={styles.kw}>{kw}</span>
          ))}
        </div>
      </div>
    </Tag>
  );
}

export default FoodCard;
