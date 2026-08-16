// ============================================================
// CONFIG
// ============================================================

// Path to the song audio file. Baby Shark is copyrighted — this project does
// NOT ship the actual track or its lyrics. Drop your own licensed copy at
// this path (or point this at wherever you host it) before running Compete
// mode. If the file is missing, the UI shows a warning instead of failing silently.
import audioSrc from '../../assets/baby-shark-song.mov';

export const CONFIG = {
  // --- pose detection & matching (unchanged from before) ---
  DETECTION_CONFIDENCE: 0.6,
  ANGLE_TOLERANCE_DEG: 30,
  RATIO_TOLERANCE: 0.5,
  CONFIRM_FRAMES: 6,

  // --- compete mode scoring ---
  PERFECT_ACCURACY: 0.8,    // fraction of a move-window's frames that must be correct for "Perfect!"
  GOOD_ACCURACY: 0.4,       // fraction required for "Good" (below this = "Miss")
  POINTS_PERFECT: 100,
  POINTS_GOOD: 50,
  POINTS_MISS: 0,
  COMBO_STEP: 0.1,          // multiplier gained per consecutive non-miss window
  COMBO_MAX_MULTIPLIER: 2,  // cap on the combo multiplier
  JUDGEMENT_DISPLAY_MS: 1000,
};

export const AUDIO_SRC = audioSrc;

export const LM = {
  LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
  LEFT_WRIST: 15, RIGHT_WRIST: 16,
  LEFT_HIP: 23, RIGHT_HIP: 24,
};

export const SILHOUETTE_BONES = [
  ['leftShoulder', 'rightShoulder'],
  ['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist'],
  ['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist'],
  ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
  ['leftHip', 'rightHip'],
];
