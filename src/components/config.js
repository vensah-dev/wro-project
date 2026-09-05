// ============================================================
// SHARED CONFIG — used by both Compete and Learn mode
// ============================================================
export const CONFIG = {
  // --- pose detection & matching ---
  DETECTION_CONFIDENCE: 0.5,
  ANGLE_TOLERANCE_DEG: 30,
  RATIO_TOLERANCE: 0.5,
  CONFIRM_FRAMES: 6,

  // --- compete mode scoring ---
  PERFECT_ACCURACY: 0.6,    // fraction of a move-window's frames that must be correct for "Perfect!"
  GOOD_ACCURACY: 0.3,       // fraction required for "Good" (below this = "Miss")
  POINTS_PERFECT: 100,
  POINTS_GOOD: 50,
  POINTS_MISS: 0,
  COMBO_STEP: 0.1,          // multiplier gained per consecutive non-miss window
  COMBO_MAX_MULTIPLIER: 2,  // cap on the combo multiplier
  JUDGEMENT_DISPLAY_MS: 1000,

  // --- learn mode (self-paced, no timer/points) ---
  LEARN_GOOD_THRESHOLD: 0.65,        // per-criterion / overall score above this counts as "good"
  LEARN_STREAK_TO_SUGGEST_NEXT: 45,  // ~1.5s of sustained good pose before nudging the Next button
  GHOST_OPACITY: 0.35,               // opacity of the target-pose overlay drawn on the camera feed
};

export const LM = {
  LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
  LEFT_WRIST: 15, RIGHT_WRIST: 16,
  LEFT_HIP: 23, RIGHT_HIP: 24,
  LEFT_KNEE: 25, RIGHT_KNEE: 26,
  LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
  LEFT_HEEL: 29, RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31, RIGHT_FOOT_INDEX: 32,
};

export const SILHOUETTE_BONES = [
  ['leftShoulder', 'rightShoulder'],
  ['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist'],
  ['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist'],
  ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
  ['leftHip', 'rightHip'],
  // legs — hip -> knee -> ankle only, matching the points each
  // move's `target` actually defines (no heel/foot-index points)
  ['leftHip', 'leftKnee'], ['leftKnee', 'leftAnkle'],
  ['rightHip', 'rightKnee'], ['rightKnee', 'rightAnkle'],
];