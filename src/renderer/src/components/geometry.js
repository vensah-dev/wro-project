import { LM } from './config';

// ============================================================
// GEOMETRY HELPERS — used by both Compete and Learn mode
// ============================================================
export function calcAngle(a, b, c) {
  const rad = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let deg = Math.abs((rad * 180) / Math.PI);
  if (deg > 180) deg = 360 - deg;
  return deg;
}

export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function scoreRange(value, [min, max], tolerance) {
  if (value >= min && value <= max) return 1;
  const dOut = value < min ? min - value : value - max;
  return Math.max(0, 1 - dOut / tolerance);
}

export function computeFrameAngles(lm) {
  const shoulderWidth = dist(lm[LM.LEFT_SHOULDER], lm[LM.RIGHT_SHOULDER]) || 1;
  return {
    leftElbow: calcAngle(lm[LM.LEFT_SHOULDER], lm[LM.LEFT_ELBOW], lm[LM.LEFT_WRIST]),
    rightElbow: calcAngle(lm[LM.RIGHT_SHOULDER], lm[LM.RIGHT_ELBOW], lm[LM.RIGHT_WRIST]),
    leftShoulder: calcAngle(lm[LM.LEFT_HIP], lm[LM.LEFT_SHOULDER], lm[LM.LEFT_ELBOW]),
    rightShoulder: calcAngle(lm[LM.RIGHT_HIP], lm[LM.RIGHT_SHOULDER], lm[LM.RIGHT_ELBOW]),
    wristGap: dist(lm[LM.LEFT_WRIST], lm[LM.RIGHT_WRIST]) / shoulderWidth,
    leftWristY: lm[LM.LEFT_WRIST].y,
    rightWristY: lm[LM.RIGHT_WRIST].y,
    leftShoulderY: lm[LM.LEFT_SHOULDER].y,
    rightShoulderY: lm[LM.RIGHT_SHOULDER].y,
  };
}
