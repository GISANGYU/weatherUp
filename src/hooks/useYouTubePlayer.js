import { useEffect, useRef, useState, useCallback } from 'react';

const PLAYER_DIV_ID = 'yt-hidden-player';

/** YouTube URL에서 11자리 video ID 추출 */
function extractVideoId(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/**
 * YouTube IFrame Player API를 감싸는 커스텀 훅.
 * - 숨겨진 플레이어 div(id="yt-hidden-player")를 반드시 DOM에 미리 두어야 함.
 * - 한 번에 한 곡만 재생. 같은 곡 클릭 시 토글(재생/일시정지).
 *
 * @returns {{ play, playingId }}
 */
function useYouTubePlayer() {
  const playerRef   = useRef(null);   // YT.Player 인스턴스
  const [playingId, setPlayingId] = useState(null);
  const isReadyRef  = useRef(false);  // onReady 완료 여부
  const pendingRef  = useRef(null);   // API 로딩 전 대기 재생 요청

  /** YT.Player 인스턴스 생성 */
  const createPlayer = useCallback(() => {
    if (playerRef.current) return; // 이미 생성됨
    playerRef.current = new window.YT.Player(PLAYER_DIV_ID, {
      height: '1',
      width:  '1',
      videoId: '',
      playerVars: { controls: 0, disablekb: 1, fs: 0, modestbranding: 1 },
      events: {
        onReady: () => {
          isReadyRef.current = true;
          // 대기 중인 재생 요청 처리
          if (pendingRef.current) {
            const { videoId, itemId } = pendingRef.current;
            pendingRef.current = null;
            playerRef.current.loadVideoById(videoId);
            setPlayingId(itemId);
          }
        },
        onStateChange: (e) => {
          // 재생 종료(0)되면 playingId 초기화
          if (e.data === 0) setPlayingId(null);
        },
      },
    });
  }, []);

  /** YouTube IFrame API 스크립트 로드 (중복 방지) */
  useEffect(() => {
    // Case 1: API 이미 준비됨
    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    // Case 2: 스크립트가 DOM에 있지만 아직 로딩 중
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      return;
    }

    // Case 3: 처음 로드
    window.onYouTubeIframeAPIReady = createPlayer;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }, [createPlayer]);

  /**
   * 재생 / 일시정지 토글
   * @param {string} itemId  - weatherData 아이템의 id
   * @param {string} link    - YouTube URL
   */
  const play = useCallback((itemId, link) => {
    const videoId = extractVideoId(link);
    if (!videoId) return;

    // API 아직 준비 안 됨 → 대기열에 등록
    if (!isReadyRef.current || !playerRef.current) {
      pendingRef.current = { itemId, videoId };
      return;
    }

    if (playingId === itemId) {
      // 같은 곡: 재생 중이면 일시정지, 일시정지 중이면 재개
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
        setPlayingId(null);
      } else {
        playerRef.current.playVideo();
        setPlayingId(itemId);
      }
    } else {
      // 다른 곡: 바로 교체 재생 (loadVideoById는 자동 autoplay)
      playerRef.current.loadVideoById(videoId);
      setPlayingId(itemId);
    }
  }, [playingId]);

  const stop = useCallback(() => {
    if (playerRef.current && isReadyRef.current) {
      playerRef.current.stopVideo();
    }
    setPlayingId(null);
  }, []);

  return { play, stop, playingId };
}

export default useYouTubePlayer;
