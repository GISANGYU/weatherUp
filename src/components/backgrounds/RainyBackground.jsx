import { useEffect, useRef } from 'react';

export default function RainyBackground() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let lightningTimer = Math.floor(Math.random() * 280) + 240;
    let lightningFlash = 0;
    let shimmerOffset  = 0;

    const ANGLE = 15 * (Math.PI / 180);
    const sinA  = Math.sin(ANGLE);
    const cosA  = Math.cos(ANGLE);

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Rain drops
    const drops = Array.from({ length: 300 }, () => createDrop());
    function createDrop() {
      return {
        x:         Math.random() * window.innerWidth,
        y:         Math.random() * window.innerHeight,
        len:       Math.random() * 18 + 8,
        speed:     Math.random() * 14 + 20,
        opacity:   Math.random() * 0.35 + 0.15,
        thickness: Math.random() * 1.0 + 0.25,
      };
    }

    // Ripples
    const ripples = [];
    function addRipple(x, y, big = false) {
      if (ripples.length > 40) return;
      ripples.push({
        x, y,
        r:       big ? 0 : Math.random() * 3,
        maxR:    big ? 90 + Math.random() * 60 : 25 + Math.random() * 25,
        opacity: big ? 0.70 : 0.40,
        speed:   big ? 2.8 : 1.6,
      });
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.06) {
        addRipple(
          e.clientX + (Math.random() - 0.5) * 30,
          canvas.height * 0.86 + Math.random() * 20,
        );
      }
    };
    const onClick = (e) => {
      for (let i = 0; i < 5; i++) {
        addRipple(
          e.clientX + (Math.random() - 0.5) * 40,
          e.clientY  + (Math.random() - 0.5) * 20,
          true,
        );
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', resize);

    const WATER_Y = () => canvas.height * 0.85;

    function drawWaterSurface() {
      const wy = WATER_Y();
      const g  = ctx.createLinearGradient(0, wy, 0, canvas.height);
      g.addColorStop(0,   'rgba(74, 158, 255, 0.07)');
      g.addColorStop(0.25,'rgba(28, 43, 58,  0.65)');
      g.addColorStop(1,   'rgba(10, 18, 30,  0.96)');
      ctx.fillStyle = g;
      ctx.fillRect(0, wy, canvas.width, canvas.height - wy);

      // Shimmer stripe
      shimmerOffset = (shimmerOffset + 0.8) % canvas.width;
      const sg = ctx.createLinearGradient(0, 0, canvas.width, 0);
      sg.addColorStop(0, 'transparent');
      const p = shimmerOffset / canvas.width;
      sg.addColorStop(Math.max(0, p - 0.1), 'transparent');
      sg.addColorStop(p,                    'rgba(74, 158, 255, 0.22)');
      sg.addColorStop(Math.min(1, p + 0.1), 'transparent');
      sg.addColorStop(1, 'transparent');
      ctx.strokeStyle = sg;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(0, wy);
      ctx.lineTo(canvas.width, wy);
      ctx.stroke();
    }

    function animate() {
      // Dark background
      ctx.fillStyle = '#1C2B3A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawWaterSurface();

      const { x: mx, y: my } = mouseRef.current;

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r      += rp.speed;
        rp.opacity -= rp.opacity / (rp.maxR / rp.speed);
        if (rp.opacity <= 0.008 || rp.r >= rp.maxR) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 158, 255, ${rp.opacity})`;
        ctx.lineWidth   = 1.4;
        ctx.stroke();
      }

      // Rain
      drops.forEach(d => {
        // Mouse deflects nearby drops
        const dx   = d.x - mx;
        const dy   = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let vxOff  = 0;
        if (dist < 110) {
          const f = (110 - dist) / 110;
          vxOff = (dx / Math.max(dist, 1)) * f * 5;
        }

        const vx = sinA * d.speed + vxOff;
        const vy = cosA * d.speed;

        d.x += vx;
        d.y += vy;

        if (d.y > canvas.height || d.x > canvas.width + 60) {
          Object.assign(d, createDrop());
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }

        // Ripple when drop hits water
        if (d.y > WATER_Y() && Math.random() < 0.025) {
          addRipple(d.x, WATER_Y() + Math.random() * 12);
          Object.assign(d, createDrop());
          d.y = -d.len;
        }

        ctx.save();
        ctx.globalAlpha = d.opacity;
        ctx.strokeStyle = '#7EC8FF';
        ctx.lineWidth   = d.thickness;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - sinA * d.len + vxOff * 0.2, d.y - cosA * d.len);
        ctx.stroke();
        ctx.restore();
      });

      // Lightning
      lightningTimer--;
      if (lightningTimer <= 0) {
        lightningFlash = 7;
        lightningTimer = Math.floor(Math.random() * 400) + 250;
      }
      if (lightningFlash > 0) {
        ctx.fillStyle = `rgba(200, 228, 255, ${lightningFlash * 0.038})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lightningFlash--;
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
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
