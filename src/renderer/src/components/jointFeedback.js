import { CONFIG } from './config';
import { scoreMove } from './scoring';
import { CRITERION_TO_LIMB } from './danceMoves';

// ============================================================
// LEARN MODE ONLY: per-joint corrective feedback
// ============================================================
// Takes a move + the current frame's angles and returns, per limb group
// (leftArm / rightArm): a 0-1 score, a traffic-light color, and — if that
// limb is the reason the pose is off — a human-readable hint string.
//
// Moves that only use customScore (run, safe's arm-height check) don't have
// a clean per-criterion -> limb mapping, so they fall back to the move's
// single genericHint instead of per-limb hints.
export function getJointFeedback(move, angles) {
  const { total, perCriterion } = scoreMove(move, angles, { detailed: true });
  const limbFeedback = {};

  for (const [key, data] of Object.entries(perCriterion)) {
    if (key === '__custom') continue;
    const limbs = CRITERION_TO_LIMB[key] || [];
    const direction = data.value < data.range[0] ? 'low' : data.value > data.range[1] ? 'high' : null;
    const hint = direction ? move.hints?.[key]?.[direction] : null;

    for (const limb of limbs) {
      const entry = limbFeedback[limb] || { score: 1, color: '#22ff55', hint: null };
      if (data.score < entry.score) {
        entry.score = data.score;
        entry.hint = data.score < CONFIG.LEARN_GOOD_THRESHOLD && hint ? hint : entry.hint;
      }
      limbFeedback[limb] = entry;
    }
  }

  for (const limb of Object.keys(limbFeedback)) {
    const s = limbFeedback[limb].score;
    limbFeedback[limb].color = s >= CONFIG.LEARN_GOOD_THRESHOLD ? '#22ff55' : s >= 0.3 ? '#ffd23f' : '#ff3333';
  }

  const genericHint = !move.ranges && total < CONFIG.LEARN_GOOD_THRESHOLD ? move.genericHint : null;

  return { total, limbFeedback, genericHint };
}
