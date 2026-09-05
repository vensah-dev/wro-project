import { CONFIG } from './config';
import { scoreRange } from './geometry';

// Legs are tracked and drawn on the live skeleton, but intentionally
// excluded from scoring everywhere — Compete mode's total/grade and
// Learn mode's per-limb feedback should only ever be driven by arm
// criteria. This is the single place that exclusion happens; nothing
// downstream needs to know legs exist.
const EXCLUDED_CRITERIA = new Set(['leftKnee', 'rightKnee']);

export function scoreMove(move, angles, { detailed = false } = {}) {
  const perCriterion = {};

  if (move.ranges) {
    for (const key of Object.keys(move.ranges)) {
      if (EXCLUDED_CRITERIA.has(key)) continue;
      const tolerance = key === 'wristGap' ? CONFIG.RATIO_TOLERANCE : CONFIG.ANGLE_TOLERANCE_DEG;
      const range = move.ranges[key];
      const score = scoreRange(angles[key], range, tolerance);
      perCriterion[key] = { score, value: angles[key], range, tolerance };
    }
  }
  if (move.customScore) {
    perCriterion.__custom = { score: move.customScore(angles), value: null, range: null, tolerance: null };
  }

  const scores = Object.values(perCriterion).map((c) => c.score);
  const total = scores.length ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;

  return detailed ? { total, perCriterion } : total;
}

export function matchBestMove(moves, angles) {
  let best = null;
  let bestScore = 0;
  for (const move of moves) {
    const score = scoreMove(move, angles);
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return bestScore >= CONFIG.DETECTION_CONFIDENCE ? best : null;
}

export function calculateGrade(windowResults) {
  if (windowResults.length === 0) return { grade: '\u2014', avgAccuracy: 0 };
  const avg = windowResults.reduce((s, w) => s + w.accuracy, 0) / windowResults.length;
  let grade = 'C';
  if (avg >= 0.9) grade = 'S';
  else if (avg >= 0.75) grade = 'A';
  else if (avg >= 0.5) grade = 'B';
  return { grade, avgAccuracy: avg };
}