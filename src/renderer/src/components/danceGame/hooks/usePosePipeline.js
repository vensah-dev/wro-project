// ============================================================
// HOOK: MediaPipe pipeline + skeleton drawing + confirmed move
// ============================================================
import { useEffect, useRef, useState, useCallback } from 'react';
import { CONFIG } from '../config';
import { computeFrameAngles } from '../geometry';
import { matchBestMove } from '../scoring';

export function usePosePipeline({ videoRef, canvasRef, expectedMoveId }) {
  const streakRef = useRef({ id: null, count: 0 });
  const expectedMoveIdRef = useRef(expectedMoveId);
  const [confirmedMoveId, setConfirmedMoveId] = useState(null);
  const [isPersonVisible, setIsPersonVisible] = useState(false);

  // keep a ref in sync so the onResults callback (bound once) always reads
  // the latest expected move without needing to be re-created every render
  useEffect(() => {
    expectedMoveIdRef.current = expectedMoveId;
  }, [expectedMoveId]);

  const handleResults = useCallback((results, canvasCtx, canvasElement) => {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (!results.poseLandmarks) {
      setIsPersonVisible(false);
      return;
    }
    setIsPersonVisible(true);

    const angles = computeFrameAngles(results.poseLandmarks);
    const detected = matchBestMove(angles);
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

    window.drawConnectors(canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS, {
      color: lineColor,
      lineWidth: 4,
    });
    window.drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: lineColor,
      lineWidth: 1,
      radius: 3,
    });
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    const pose = new window.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.77,
      minTrackingConfidence: 0.72,
    });
    pose.onResults((results) => handleResults(results, canvasCtx, canvasElement));

    const camera = new window.Camera(videoElement, {
      onFrame: async () => { await pose.send({ image: videoElement }); },
      width: window.screen.width,
      height: window.screen.height,
    });
    camera.start()
      .then(() => console.log('Pipeline successfully active!'))
      .catch((err) => console.error('Webcam startup error: ', err));

    return () => camera.stop();
  }, [videoRef, canvasRef, handleResults]);

  return { confirmedMoveId, isPersonVisible };
}
