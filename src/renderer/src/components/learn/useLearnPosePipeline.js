import { useCallback, useEffect, useRef, useState } from 'react';
import { usePoseLandmarks } from '../hooks/usePoseLandmarks';
import { computeFrameAngles } from '../geometry';
import { getJointFeedback } from '../jointFeedback';
import { drawGhostOverlay, drawLimbColoredSkeleton } from '../canvasDrawing';
import { CONFIG } from '../config';

// ============================================================
// HOOK: Learn-mode pose pipeline
// ============================================================
// Unlike Compete mode, Learn mode already knows the expected move (the
// user picks it via Next/Prev), so every frame it only has to score THAT
// one move — no scanning across all moves via matchBestMove. Each frame:
//   1. draws the semi-transparent ghost of the target pose
//   2. scores the current pose against it (per-criterion)
//   3. draws the user's live skeleton with each limb colored by how close
//      it is, on top of the ghost
//   4. tracks a "good pose" streak so the UI can nudge the user toward
//      the Next button once they've held it a bit — no visible countdown
export function useLearnPosePipeline({ videoRef, canvasRef, expectedMove }) {
  const expectedMoveRef = useRef(expectedMove);
  const streakRef = useRef(0);
  const [isPersonVisible, setIsPersonVisible] = useState(false);
  const [limbFeedback, setLimbFeedback] = useState({});
  const [genericHint, setGenericHint] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    expectedMoveRef.current = expectedMove;
    streakRef.current = 0;
    setStreak(0);
    setLimbFeedback({});
    setGenericHint(null);
  }, [expectedMove]);

  const onFrame = useCallback((landmarks, canvasCtx, canvasElement) => {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const move = expectedMoveRef.current;
    drawGhostOverlay(canvasCtx, canvasElement.width, canvasElement.height, move);

    if (!landmarks) {
      setIsPersonVisible(false);
      return;
    }
    setIsPersonVisible(true);
    if (!move) return;

    const angles = computeFrameAngles(landmarks);
    const { total, limbFeedback: lf, genericHint: gh } = getJointFeedback(move, angles);

    setLimbFeedback(lf);
    setGenericHint(gh);
    drawLimbColoredSkeleton(canvasCtx, landmarks, lf, canvasElement.width, canvasElement.height);

    streakRef.current = total >= CONFIG.LEARN_GOOD_THRESHOLD ? streakRef.current + 1 : 0;
    setStreak(streakRef.current);
  }, []);

  usePoseLandmarks({ videoRef, canvasRef, onFrame });

  return { isPersonVisible, limbFeedback, genericHint, streak };
}
