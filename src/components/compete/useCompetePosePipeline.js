import { useCallback, useEffect, useRef, useState } from 'react';
import { usePoseLandmarks } from '../hooks/usePoseLandmarks';
import { computeFrameAngles } from '../geometry';
import { matchBestMove } from '../scoring';
import { CONFIG } from '../config';

// ============================================================
// Self-contained pose-skeleton drawing (no @mediapipe/drawing_utils)
// ============================================================
// window.drawConnectors / window.drawLandmarks / window.POSE_CONNECTIONS
// only exist if the drawing_utils.js CDN script happened to load
// successfully — an extra external dependency with its own failure modes
// (ad blockers, CDN hiccups, load-order races) on top of Pose/Camera.
// Since drawing a skeleton is just lines and circles on a 2D canvas, this
// hook draws it directly instead, so it can never break for that reason
// again. POSE_CONNECTIONS below is the standard, fixed set of landmark
// index pairs MediaPipe's Pose model always returns (33 landmarks,
// 0-indexed) — it's model-shape data, not something that varies at
// runtime, so it's safe to hardcode here.
const POSE_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
  [9, 10],
  [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19],
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [27, 29], [27, 31], [29, 31],
  [24, 26], [26, 28], [28, 30], [28, 32], [30, 32],
];

const VISIBILITY_THRESHOLD = 0.5;

function isVisible(point) {
  return !point || point.visibility === undefined || point.visibility >= VISIBILITY_THRESHOLD;
}

function drawSkeleton(canvasCtx, canvasElement, landmarks, color) {
  const width = canvasElement.width;
  const height = canvasElement.height;

  canvasCtx.save();
  canvasCtx.strokeStyle = color;
  canvasCtx.fillStyle = color;
  canvasCtx.lineWidth = 4;

  for (const [i, j] of POSE_CONNECTIONS) {
    const a = landmarks[i];
    const b = landmarks[j];
    if (!a || !b || !isVisible(a) || !isVisible(b)) continue;
    canvasCtx.beginPath();
    canvasCtx.moveTo(a.x * width, a.y * height);
    canvasCtx.lineTo(b.x * width, b.y * height);
    canvasCtx.stroke();
  }

  canvasCtx.lineWidth = 1;
  for (const point of landmarks) {
    if (!point || !isVisible(point)) continue;
    canvasCtx.beginPath();
    canvasCtx.arc(point.x * width, point.y * height, 3, 0, 2 * Math.PI);
    canvasCtx.fill();
    canvasCtx.stroke();
  }

  canvasCtx.restore();
}

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

    drawSkeleton(canvasCtx, canvasElement, landmarks, lineColor);
  }, []);

  usePoseLandmarks({ videoRef, canvasRef, onFrame });

  return { confirmedMoveId, isPersonVisible };
}