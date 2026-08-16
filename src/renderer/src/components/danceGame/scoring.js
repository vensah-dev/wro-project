// ============================================================
// SCORING / MATCHING (unchanged)
// ============================================================
import { CONFIG } from './config';
import { scoreRange } from './geometry';
import { DANCE_MOVES } from './danceMoves';

export function scoreMove(move, angles) {
  const scores = [];
  if (move.ranges) {
    for (const key of Object.keys(move.ranges)) {
      const tolerance = key === 'wristGap' ? CONFIG.RATIO_TOLERANCE : CONFIG.ANGLE_TOLERANCE_DEG;
      scores.push(scoreRange(angles[key], move.ranges[key], tolerance));
    }
  }
  if (move.customScore) scores.push(move.customScore(angles));
  if (scores.length === 0) return 0;
  return scores.reduce((s, v) => s + v, 0) / scores.length;
}

export function matchBestMove(angles) {
  let best = null;
  let bestScore = 0;
  for (const move of DANCE_MOVES) {
    const score = scoreMove(move, angles);
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return bestScore >= CONFIG.DETECTION_CONFIDENCE ? best : null;
}

// ============================================================
// GRADING
// ============================================================
export function calculateGrade(windowResults) {
  if (windowResults.length === 0) return { grade: '—', avgAccuracy: 0 };
  const avg = windowResults.reduce((s, w) => s + w.accuracy, 0) / windowResults.length;
  let grade = 'C';
  if (avg >= 0.9) grade = 'S';
  else if (avg >= 0.75) grade = 'A';
  else if (avg >= 0.5) grade = 'B';
  return { grade, avgAccuracy: avg };
}
