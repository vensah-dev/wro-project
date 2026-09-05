import { useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG } from '../config';

// ============================================================
// HOOK: per-window scoring — Compete mode only
// ============================================================
// `timeline` is now passed in (from the current song) instead of a fixed
// module-level import, so this works for any song.
export function useCompeteScoring({ currentTime, currentEntry, confirmedMoveId, isPlaying, timeline }) {
  const activeWindowIdRef = useRef(null);
  const frameCountsRef = useRef({ correct: 0, total: 0 });
  const comboRef = useRef(0);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [judgement, setJudgement] = useState(null); // { text, key }
  const [windowResults, setWindowResults] = useState([]); // history, feeds the end-of-song grade

  const finalizeWindow = useCallback((entry) => {
    const { correct, total } = frameCountsRef.current;
    const accuracy = total > 0 ? correct / total : 0;

    let tier, points;
    if (accuracy >= CONFIG.PERFECT_ACCURACY) { tier = 'Perfect!'; points = CONFIG.POINTS_PERFECT; }
    else if (accuracy >= CONFIG.GOOD_ACCURACY) { tier = 'Good'; points = CONFIG.POINTS_GOOD; }
    else { tier = 'Miss'; points = CONFIG.POINTS_MISS; }

    comboRef.current = tier === 'Miss' ? 0 : comboRef.current + 1;
    const multiplier = Math.min(1 + comboRef.current * CONFIG.COMBO_STEP, CONFIG.COMBO_MAX_MULTIPLIER);
    const earned = Math.round(points * multiplier);

    setScore((s) => s + earned);
    setCombo(comboRef.current);
    setJudgement({ text: tier, key: `${entry.id}-${Date.now()}` });
    setWindowResults((rs) => [...rs, { entryId: entry.id, moveId: entry.moveId, accuracy, tier }]);
  }, []);

  // finalize whatever window is active right now — used both on natural
  // window transitions and when the song ends mid-window
  const finalizeActiveWindow = useCallback(() => {
    const entry = timeline.find((e) => e.id === activeWindowIdRef.current);
    if (entry) finalizeWindow(entry);
    activeWindowIdRef.current = null;
  }, [finalizeWindow, timeline]);

  useEffect(() => {
    if (!isPlaying) return;

    const entryId = currentEntry ? currentEntry.id : null;

    if (entryId !== activeWindowIdRef.current) {
      // moved into a new window (or a gap) — finalize the one we just left
      const prevEntry = timeline.find((e) => e.id === activeWindowIdRef.current);
      if (prevEntry) finalizeWindow(prevEntry);
      frameCountsRef.current = { correct: 0, total: 0 };
      activeWindowIdRef.current = entryId;
    }

    if (currentEntry) {
      frameCountsRef.current.total += 1;
      if (confirmedMoveId === currentEntry.moveId) frameCountsRef.current.correct += 1;
    }
  }, [currentTime, currentEntry, confirmedMoveId, isPlaying, finalizeWindow, timeline]);

  const reset = useCallback(() => {
    activeWindowIdRef.current = null;
    frameCountsRef.current = { correct: 0, total: 0 };
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    setJudgement(null);
    setWindowResults([]);
  }, []);

  return { score, combo, judgement, windowResults, reset, finalizeActiveWindow };
}
