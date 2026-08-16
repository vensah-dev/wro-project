// ============================================================
// HOOK: song playback + tight rAF-driven time sync
// ============================================================
import { useEffect, useRef, useState, useCallback } from 'react';

export function useSongPlayback(audioRef) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const rafRef = useRef(null);

  // Poll audio.currentTime every animation frame while playing — the native
  // 'timeupdate' event only fires a few times a second, too coarse to line
  // a move-window boundary up with the beat.
  useEffect(() => {
    function tick() {
      const audio = audioRef.current;
      if (audio) setCurrentTime(audio.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    }
    if (isPlaying) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, audioRef]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play()
      .then(() => { setIsPlaying(true); setHasEnded(false); })
      .catch((err) => console.error('Audio playback blocked or failed:', err));
  }, [audioRef]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setHasEnded(true);
  }, []);

  return { currentTime, isPlaying, hasEnded, play, handleEnded };
}
