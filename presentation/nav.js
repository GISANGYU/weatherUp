/* ============================================================
   WEATHERUP · Presentation Deck — Navigation
   ───────────────────────────────────────────────────────────
   ←/→  ·  Space  ·  Esc  ·  F (fullscreen)
   ============================================================ */

(() => {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;

  const $now   = document.querySelector('.nav-count .now');
  const $total = document.querySelector('.nav-count .total');
  const $prev  = document.querySelector('.nav-prev');
  const $next  = document.querySelector('.nav-next');

  if ($total) $total.textContent = String(total).padStart(2, '0');

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active',   i === current);
      slide.classList.toggle('previous', i === current - 1);
    });
    if ($now)  $now.textContent = String(current + 1).padStart(2, '0');
    if ($prev) $prev.disabled = current === 0;
    if ($next) $next.disabled = current === total - 1;

    history.replaceState(null, '', '#' + (current + 1));
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(total - 1, idx));
    render();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown': e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':   e.preventDefault(); prev(); break;
      case 'Home':     e.preventDefault(); goTo(0); break;
      case 'End':      e.preventDefault(); goTo(total - 1); break;
      case 'Escape':
        if (document.fullscreenElement) document.exitFullscreen();
        else goTo(0);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
      default:
        if (/^[1-9]$/.test(e.key)) goTo(parseInt(e.key, 10) - 1);
    }
  });

  $prev?.addEventListener('click', prev);
  $next?.addEventListener('click', next);

  const initialHash = parseInt(window.location.hash.replace('#', ''), 10);
  if (!isNaN(initialHash) && initialHash >= 1 && initialHash <= total) {
    current = initialHash - 1;
  }

  render();

  console.log(
    '%cWEATHERUP — Presentation Deck',
    'font: 700 16px Pretendard; color: #fff; background: #000; padding: 6px 12px;'
  );
  console.log(
    '%c← →  navigate  ·  Space next  ·  F fullscreen  ·  1-9 jump  ·  Esc home',
    'color: #888; font-style: italic; font-size: 11px;'
  );
})();
