import { useCallback, useEffect, useRef, useState } from 'react';
import { usePoseLandmarks } from '../hooks/usePoseLandmarks';
import { computeFrameAngles } from '../geometry';
import { matchBestMove } from '../scoring';
import { CONFIG } from '../config';

// ============================================================
// HOOK: Compete-mode pose pipeline
// ============================================================
// Wraps the mode-agnostic usePoseLandmarks hook: guesses which move the
// user is doing via matchBestMove (scanning `moves`, the current song's
// move set), debounces across frames, and draws one whole-skeleton color
// (blue/green/red) depending on whether it matches the currently
// expected move.
export function useCompetePosePipeline({ videoRef, canvasRef, expectedMoveId, moves }) {
  const streakRef = useRef({ id: null, count: 0 });
  const expectedMoveIdRef = useRef(expectedMoveId);
  const movesRef = useRef(moves);
  const [confirmedMoveId, setConfirmedMoveId] = useState(null);
  const [isPersonVisible, setIsPersonVisible] = useState(false);

  useEffect(() => {
    expectedMoveIdRef.current = expectedMoveId;
  }, [expectedMoveId]);

  useEffect(() => {
    movesRef.current = moves;
  }, [moves]);

  const onFrame = useCallback((landmarks, canvasCtx, canvasElement) => {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (!landmarks) {
      setIsPersonVisible(false);
      return;
    }
    setIsPersonVisible(true);

    const angles = computeFrameAngles(landmarks);
    const detected = matchBestMove(movesRef.current, angles);
    const detectedId = detected ? detected.id : null;

    // debounce across consecutive frames so one noisy frame can't flip it
    if (detectedId === streakRef.current.id) {
      streakRef.current.count += 1;
    } else {
      streakRef.current = { id: detectedId, count: 1 };
    }
    const confirmed = streakRef.current.count >= CONFIG.CONFIRM_FRAMES ? streakRef.current.id : null;
    setConfirmedMoveId(confirmed);

    const expected = expectedMoveIdRef.current;
    const isCorrect = expected !== null && confirmed === expected;
    // blue = no move expected right now, green = matching, red = not matching
    const lineColor = expected === null ? '#03b1fc' : isCorrect ? '#22ff55' : '#ff3333';

    window.drawConnectors(canvasCtx, landmarks, window.POSE_CONNECTIONS, {
      color: lineColor,
      lineWidth: 4,
    });
    window.drawLandmarks(canvasCtx, landmarks, {
      color: lineColor,
      lineWidth: 1,
      radius: 3,
    });
  }, []);

  usePoseLandmarks({ videoRef, canvasRef, onFrame });

  return { confirmedMoveId, isPersonVisible };
}
