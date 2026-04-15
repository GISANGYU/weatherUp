import { useEffect, useRef } from 'react';

export default function CloudyBackground() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Cloud layers: [ far(slow) … near(fast) ]
    const layers = [
      {
        speed: 0.12, yRatio: 0.12, scale: 0.75, opacity: 0.45, color: '#BCBCC4',
        clouds: [{ x: 80 }, { x: 520 }, { x: 980 }, { x: 1380 }],
        baseW: 200,
      },
      {
        speed: 0.22, yRatio: 0.28, scale: 1.00, opacity: 0.62, color: '#CBCBD4',
        clouds: [{ x: 0 }, { x: 480 }, { x: 900 }],
        baseW: 280,
      },
      {
        speed: 0.38, yRatio: 0.48, scale: 1.30, opacity: 0.78, color: '#DCDCE4',
        clouds: [{ x: -60 }, { x: 550 }, { x: 1100 }],
        baseW: 340,
      },
    ];

    function drawCloud(x, y, w, color, alpha) {
      const h = w * 0.52;
      const circles = [
        { dx: 0,       dy: 0,        r: w * 0.27 },
        { dx: -w*0.20, dy:  h*0.15,  r: w * 0.20 },
        { dx:  w*0.20, dy:  h*0.10,  r: w * 0.23 },
        { dx: -w*0.10, dy: -h*0.25,  r: w * 0.21 },
        { dx:  w*0.12, dy: -h*0.28,  r: w * 0.25 },
        { dx:  w*0.35, dy:  h*0.08,  r: w * 0.17 },
        { dx: -w*0.35, dy:  h*0.10,  r: w * 0.15 },
      ];
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = color;
      circles.forEach(({ dx, dy, r }) => {
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const { x: mx, y: my } = mouseRef.current;
      const normX = mx >= 0 ? mx / canvas.width  - 0.5 : 0;
      const normY = my >= 0 ? my / canvas.height - 0.5 : 0;

      layers.forEach((layer, li) => {
        const px = normX * (li + 1) * -24;
        const py = normY * (li + 1) * -10;
        const cy = canvas.height * layer.yRatio + py;

        layer.clouds.forEach(cloud => {
          cloud.x += layer.speed;
          const w  = layer.baseW * layer.scale;
          if (cloud.x > canvas.width + w) cloud.x = -w - 20;

          drawCloud(cloud.x + px, cy, w, layer.color, layer.opacity);
        });
      });

      // Periodic light break through clouds
      const lx = ((time * 0.25) % (canvas.width * 1.6)) - canvas.width * 0.3;
      const lg  = ctx.createRadialGradient(lx, 0, 0, lx, canvas.height * 0.4, canvas.height * 0.45);
      lg.addColorStop(0, 'rgba(255, 255, 220, 0.055)');
      lg.addColorStop(1, 'transparent');
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(180deg, #C8C8CE 0%, #E4E4EA 40%, #F0F0F0 100%)',
      pointerEvents: 'none',
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}
