import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver 기반 스크롤 페이드인 훅.
 * visible 상태를 React state로 관리해 리렌더링 시에도 유지됨.
 *
 * 사용법:
 *   const { ref, isVisible } = useScrollFade();
 *   <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''}`}>
 */
function useScrollFade(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default useScrollFade;
