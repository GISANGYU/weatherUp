import { useEffect, useRef } from 'react';
import styles from './SunnyBackground.module.css';

export default function SunnyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 빛 먼지 파티클 — 크기·속도·투명도 다양하게
    const particles = Array.from({ length: 55 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 1.8 + 0.3,
      vx:      (Math.random() - 0.5) * 0.15,
      vy:      -(Math.random() * 0.22 + 0.04),
      opacity: Math.random() * 0.22 + 0.06,
      phase:   Math.random() * Math.PI * 2, // 반짝임 위상
    }));

    // 부드러운 보케 원 (흐릿하고 큰)
    const bokeh = Array.from({ length: 6 }, () => ({
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      r:    Math.random() * 40 + 20,
      vy:   -(Math.random() * 0.08 + 0.02),
      opacity: Math.random() * 0.06 + 0.02,
    }));

    let tick = 0;

    function animate() {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 보케
      bokeh.forEach(b => {
        b.y += b.vy;
        if (b.y + b.r < -10) { b.y = canvas.height + b.r; b.x = Math.random() * canvas.width; }
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(255, 220, 100, ${b.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 먼지 파티클
      particles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        if (p.y < -6)              { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
        if (p.x < -6)              { p.x = canvas.width + 6; }
        if (p.x > canvas.width + 6){ p.x = -6; }

        // 위상별 반짝임
        const twinkle = 0.6 + 0.4 * Math.sin(tick * 0.018 + p.phase);
        const alpha   = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(255, 210, 80, ${alpha})`;
        ctx.shadowColor = `rgba(255, 180, 0, ${alpha * 0.5})`;
        ctx.shadowBlur  = 4;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sunOrb} />
      <div className={styles.sunRays} />
      <div className={styles.glowLeft} />
      <div className={styles.haze} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
