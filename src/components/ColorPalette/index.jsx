import { useState } from 'react';
import styles from './ColorPalette.module.css';

function ColorPalette({ palette }) {
  const [copied, setCopied] = useState(null); // 복사된 hex 저장

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Color</p>
        <h2 className={styles.title}>오늘의 컬러 팔레트</h2>
      </div>

      <div className={styles.swatches}>
        {palette.map((color) => (
          <button
            key={color.hex}
            className={styles.swatch}
            onClick={() => handleCopy(color.hex)}
            title={`${color.name} — 클릭해서 복사`}
          >
            <span
              className={styles.circle}
              style={{ backgroundColor: color.hex }}
            />
            <span className={styles.colorName}>{color.name}</span>
            <span className={styles.hex}>{color.hex}</span>
          </button>
        ))}
      </div>

      {copied && (
        <div className={styles.toast}>
          <span>{copied} 복사됨!</span>
        </div>
      )}
    </section>
  );
}

export default ColorPalette;
