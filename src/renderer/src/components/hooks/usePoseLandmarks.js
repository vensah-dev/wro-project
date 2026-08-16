import { useEffect } from 'react';

// ============================================================
// HOOK: mode-agnostic MediaPipe pipeline
// ============================================================
// Sets up the Pose model + Camera and calls `onFrame(landmarks, canvasCtx,
// canvasElement)` on every result. Does NOT do any scoring or drawing
// itself — that's left entirely to the caller, so Compete mode and Learn
// mode can each do their own thing (whole-skeleton color vs. per-limb
// color + ghost overlay) on top of the same detection plumbing.
//
// `onFrame` should be memoized with useCallback([]) by the caller (reading
// any changing values via refs) so the camera/pose instance isn't torn
// down and rebuilt every render.
export function usePoseLandmarks({ videoRef, canvasRef, onFrame }) {
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
    pose.onResults((results) => onFrame(results.poseLandmarks || null, canvasCtx, canvasElement));

    const camera = new window.Camera(videoElement, {
      onFrame: async () => { await pose.send({ image: videoElement }); },
      width: window.screen.width,
      height: window.screen.height,
    });
    camera.start()
      .then(() => console.log('Pipeline successfully active!'))
      .catch((err) => console.error('Webcam startup error: ', err));

    return () => camera.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, canvasRef]);
}
