import { useEffect } from 'react';

// ============================================================
// Runtime script loader for MediaPipe's CDN builds
// ============================================================
// @mediapipe/pose and @mediapipe/camera_utils are shipped as UMD/global
// scripts, not real ES modules — they cannot be `import`ed through Vite
// (their npm builds are known to be broken/inconsistent for bundler use;
// see https://github.com/google-ai-edge/mediapipe/issues/2539). They only
// work loaded as plain <script> tags that attach window.Pose / window.Camera.
//
// Rather than relying on <script> tags placed in index.html (fragile —
// load order, ad blockers, or an out-of-date HTML file can all silently
// leave window.Pose undefined, which is exactly what produces
// "window.Pose is not a constructor"), this hook loads and verifies the
// scripts itself at runtime, once, and caches the loading promise so
// repeated mounts (React StrictMode, multiple components) don't inject
// duplicate <script> tags or race each other.

const POSE_VERSION = '0.5.1675469404';
const CAMERA_UTILS_VERSION = '0.3.1675466862';

let mediapipeLoadPromise = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    // If a script with this src is already present (e.g. from a previous
    // mount, or manually added to index.html), don't add it again.
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
      // If it already finished loading before we attached listeners,
      // there's no reliable "already loaded" flag on the element, so we
      // optimistically resolve — the constructor check below will catch
      // a genuine failure anyway.
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function loadMediapipe() {
  if (!mediapipeLoadPromise) {
    mediapipeLoadPromise = Promise.all([
      loadScriptOnce(
        `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@${CAMERA_UTILS_VERSION}/camera_utils.js`
      ),
      loadScriptOnce(
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${POSE_VERSION}/pose.js`
      ),
    ]).then(() => {
      if (typeof window.Pose !== 'function' || typeof window.Camera !== 'function') {
        // The scripts reported "loaded" but didn't attach working globals.
        // Most common causes: an ad blocker / privacy extension silently
        // stripped the script body, a corporate proxy interfered with the
        // jsdelivr response, or the browser is offline.
        throw new Error(
          'MediaPipe scripts loaded but window.Pose/window.Camera are not ' +
          'functions. Check for ad blockers or network restrictions on ' +
          'cdn.jsdelivr.net.'
        );
      }
    });
    // If loading fails, clear the cached promise so a later remount can
    // retry instead of being stuck with a permanently-rejected promise.
    mediapipeLoadPromise.catch(() => {
      mediapipeLoadPromise = null;
    });
  }
  return mediapipeLoadPromise;
}

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
    let cancelled = false;
    let pose = null;
    let camera = null;

    loadMediapipe()
      .then(() => {
        if (cancelled) return;

        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        pose = new window.Pose({
          // Must stay in sync with POSE_VERSION above — mixing versions
          // between the JS constructor and the wasm/model assets it
          // fetches is a common source of silent failures.
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${POSE_VERSION}/${file}`,
        });
        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.77,
          minTrackingConfidence: 0.72,
        });
        pose.onResults((results) => {
          if (cancelled) return;
          onFrame(results.poseLandmarks || null, canvasCtx, canvasElement);
        });

        camera = new window.Camera(videoElement, {
          onFrame: async () => {
            if (cancelled) return;
            await pose.send({ image: videoElement });
          },
          // Use the video element's own render size instead of the full
          // screen resolution, so we're not asking MediaPipe to process a
          // 4K/5K frame on a high-res monitor when the visible video is
          // much smaller.
          width: videoElement.clientWidth || videoElement.videoWidth || 640,
          height: videoElement.clientHeight || videoElement.videoHeight || 480,
        });

        return camera.start();
      })
      .then(() => {
        if (!cancelled) console.log('Pipeline successfully active!');
      })
      .catch((err) => console.error('Webcam/MediaPipe startup error: ', err));

    return () => {
      cancelled = true;
      if (camera) camera.stop();
      // Release the WASM/model resources. Without this, remounts
      // (React StrictMode double-invoke in dev, hot reload, mode
      // switches) can leak Pose instances.
      if (pose) pose.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, canvasRef]);
}