import { useEffect, useRef } from 'react';
import styles from './SunnyBackground.module.css';

export default function SunnyBackground() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const flaresRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Floating dust / pollen particles
    const particles = Array.from({ length: 90 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 2.2 + 0.5,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      -(Math.random() * 0.35 + 0.08),
      opacity: Math.random() * 0.35 + 0.10,
    }));

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onClick = (e) => {
      // Create light burst on click
      for (let i = 0; i < 3; i++) {
        flaresRef.current.push({
          x: e.clientX, y: e.clientY,
          r: 0, maxR: 100 + Math.random() * 80,
          opacity: 0.65,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      // Cursor lens-flare glow (follows mouse)
      if (mx > 0) {
        const lg = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        lg.addColorStop(0, 'rgba(255, 225, 80, 0.13)');
        lg.addColorStop(1, 'transparent');
        ctx.fillStyle = lg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Floating particles
      particles.forEach(p => {
        const dx   = mx - p.x;
        const dy   = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const pull = (200 - dist) / 200;
          p.vx += (dx / dist) * pull * 0.007;
          p.vy += (dy / dist) * pull * 0.007;
        }

        p.vx *= 0.98;
        p.vy  = p.vy * 0.98 - 0.004;
        p.x  += p.vx;
        p.y  += p.vy;

        if (p.y < -10)                   { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10)                   { p.x = canvas.width + 10; }
        if (p.x > canvas.width + 10)     { p.x = -10; }
        if (p.y > canvas.height + 10)    { p.y = -10; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle    = `rgba(255, 195, 60, ${p.opacity})`;
        ctx.shadowColor  = 'rgba(255, 160, 0, 0.55)';
        ctx.shadowBlur   = 5;
        ctx.fill();
        ctx.shadowBlur   = 0;
      });

      // Click burst flares
      const flares = flaresRef.current;
      for (let i = flares.length - 1; i >= 0; i--) {
        const f = flares[i];
        f.r       += 6;
        f.opacity -= 0.028;
        if (f.opacity <= 0) { flares.splice(i, 1); continue; }
        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        fg.addColorStop(0, `rgba(255, 220, 80, ${f.opacity})`);
        fg.addColorStop(0.4, `rgba(255, 180, 0, ${f.opacity * 0.4})`);
        fg.addColorStop(1, 'transparent');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sunOrb} />
      <div className={styles.sunRays} />
      <div className={styles.haze} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
