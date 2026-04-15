import { useEffect, useRef } from 'react';

export default function SnowyBackground() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let windAngle = 0;
    let accum; // Float32Array — snow surface height per x-column

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      accum = new Float32Array(canvas.width).fill(canvas.height);
    };
    init();

    // Create flakes
    function newFlake() {
      return {
        x:           Math.random() * canvas.width,
        y:           Math.random() * canvas.height,
        r:           Math.random() * 3.5 + 1,
        vx:          0,
        vy:          Math.random() * 1.2 + 0.4,
        opacity:     Math.random() * 0.45 + 0.40,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpd:   Math.random() * 0.028 + 0.008,
        sparkle:     false,
        sparkleT:    0,
      };
    }
    const flakes = Array.from({ length: 210 }, newFlake);

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', init);

    const MIN_ACCUM = () => canvas.height * 0.52;

    function drawAccum() {
      if (!accum || accum.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < accum.length; i++) ctx.lineTo(i, accum[i]);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const g = ctx.createLinearGradient(0, MIN_ACCUM(), 0, canvas.height);
      g.addColorStop(0, 'rgba(240, 250, 255, 0.88)');
      g.addColorStop(1, 'rgba(220, 240, 255, 0.95)');
      ctx.fillStyle = g;
      ctx.fill();

      // Shimmer edge
      const sg = ctx.createLinearGradient(0, 0, canvas.width, 0);
      sg.addColorStop(0,   'rgba(180, 220, 255, 0.50)');
      sg.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      sg.addColorStop(1,   'rgba(180, 220, 255, 0.50)');
      ctx.beginPath();
      ctx.moveTo(0, accum[0] || canvas.height);
      for (let i = 1; i < accum.length; i++) ctx.lineTo(i, accum[i]);
      ctx.strokeStyle = sg;
      ctx.lineWidth   = 2.5;
      ctx.stroke();
    }

    function drawStar(x, y, r) {
      const rays = 6;
      const or   = r * 2.6;
      const ir   = r * 0.9;
      ctx.beginPath();
      for (let i = 0; i < rays * 2; i++) {
        const ang = (i / (rays * 2)) * Math.PI * 2 - Math.PI / 2;
        const rr  = i % 2 === 0 ? or : ir;
        ctx[i === 0 ? 'moveTo' : 'lineTo'](x + Math.cos(ang) * rr, y + Math.sin(ang) * rr);
      }
      ctx.closePath();
      ctx.fillStyle   = '#fff';
      ctx.shadowColor = 'rgba(160, 200, 255, 0.90)';
      ctx.shadowBlur  = 10;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      windAngle += 0.0025;
      const wind = Math.sin(windAngle) * 0.55;

      const { x: mx, y: my } = mouseRef.current;

      // Smooth accumulation
      if (accum && accum.length > 2) {
        for (let i = 1; i < accum.length - 1; i++) {
          accum[i] = (accum[i - 1] + accum[i] + accum[i + 1]) / 3;
        }
      }

      // Mouse blows accumulated snow away
      const blowR = 95;
      if (mx > 0 && accum) {
        for (let i = Math.max(0, mx - blowR | 0); i < Math.min(accum.length, (mx + blowR) | 0); i++) {
          const d    = Math.abs(i - mx);
          const surf = accum[i];
          const dSurf = my - surf;
          if (dSurf > -40 && dSurf < 130) {
            const f = ((blowR - d) / blowR) * 1.6;
            accum[i] = Math.min(accum[i] + f, canvas.height);
          }
        }
      }

      drawAccum();

      // Update flakes
      flakes.forEach(f => {
        f.wobble += f.wobbleSpd;
        f.vx     += wind * 0.05 + Math.sin(f.wobble) * 0.07;
        f.vy     += 0.028;
        f.vx     *= 0.965;
        f.vy      = Math.min(f.vy, 3.6);

        // Mouse repulsion
        const dx   = f.x - mx;
        const dy   = f.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 125) {
          const force = (125 - dist) / 125;
          f.vx += (dx / Math.max(dist, 1)) * force * 2.6;
          f.vy += (dy / Math.max(dist, 1)) * force * 1.4;
        }

        f.x += f.vx;
        f.y += f.vy;

        // Wrap x
        if (f.x < -6)               f.x = canvas.width + 6;
        if (f.x > canvas.width + 6) f.x = -6;

        // Check if settled
        if (accum) {
          const xi = Math.round(f.x);
          if (xi >= 0 && xi < accum.length && f.y + f.r >= accum[xi]) {
            const min  = MIN_ACCUM();
            if (accum[xi] > min) {
              const drop = f.r * 0.38;
              accum[xi]  = Math.max(accum[xi] - drop, min);
              for (let n = 1; n <= 5; n++) {
                const fac = (5 - n + 1) / 6;
                if (xi - n >= 0)             accum[xi - n] = Math.max(accum[xi - n] - drop * fac * 0.5, min);
                if (xi + n < accum.length)   accum[xi + n] = Math.max(accum[xi + n] - drop * fac * 0.5, min);
              }
            }
            // Reset flake
            Object.assign(f, newFlake());
            f.x = Math.random() * canvas.width;
            f.y = -10;
            return;
          }
        }

        if (f.y > canvas.height + 10) {
          Object.assign(f, newFlake());
          f.x = Math.random() * canvas.width;
          f.y = -10;
          return;
        }

        // Random sparkle trigger
        if (!f.sparkle && Math.random() < 0.0008) {
          f.sparkle  = true;
          f.sparkleT = 22;
        }

        ctx.save();
        ctx.globalAlpha = f.opacity;

        if (f.sparkle && f.sparkleT > 0) {
          drawStar(f.x, f.y, f.r);
          f.sparkleT--;
          if (f.sparkleT <= 0) f.sparkle = false;
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle   = '#FFFFFF';
          ctx.shadowColor = 'rgba(160, 200, 255, 0.70)';
          ctx.shadowBlur  = f.r * 2.2;
          ctx.fill();
          ctx.shadowBlur  = 0;
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(180deg, #D8E8FF 0%, #EAF0FF 60%, #F4F8FF 100%)',
      pointerEvents: 'none',
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}
