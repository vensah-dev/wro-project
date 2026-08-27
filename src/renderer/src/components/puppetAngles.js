// ============================================================
// PUPPET ANGLE CALCULATION
// ============================================================
// Converts a move's `target` pose (the same normalized {x,y} landmark
// object used by drawGuideSilhouette to draw the "do this now" stick
// figure) into the 6 joint angles the ESP32 puppet's servos expect.
//
// Servo order / GPIO mapping (must match the firmware's SERVO_PINS[]):
//   id 0  Left Shoulder   GPIO 13
//   id 1  Right Shoulder  GPIO 14
//   id 2  Left Elbow      GPIO 25
//   id 3  Right Elbow     GPIO 26
//   id 4  Left Hip        GPIO 27
//   id 5  Right Hip       GPIO 33
//
// Each angle is the interior angle at the middle joint of a 3-point
// triplet, e.g. the shoulder angle is the angle at the shoulder between
// the vector to the hip and the vector to the elbow.

const DEFAULT_ANGLE_DEG = 90; // neutral pose, used when a landmark is missing
const MIN_ANGLE_DEG = 0;
const MAX_ANGLE_DEG = 180;

export const SERVO_CHANNELS = [
  { id: 0, name: 'leftShoulder', label: 'Left Shoulder', gpio: 13, triplet: ['leftHip', 'leftShoulder', 'leftElbow'] },
  { id: 1, name: 'rightShoulder', label: 'Right Shoulder', gpio: 14, triplet: ['rightHip', 'rightShoulder', 'rightElbow'] },
  { id: 2, name: 'leftElbow', label: 'Left Elbow', gpio: 25, triplet: ['leftShoulder', 'leftElbow', 'leftWrist'] },
  { id: 3, name: 'rightElbow', label: 'Right Elbow', gpio: 26, triplet: ['rightShoulder', 'rightElbow', 'rightWrist'] },
  { id: 4, name: 'leftHip', label: 'Left Hip', gpio: 27, triplet: ['leftShoulder', 'leftHip', 'leftKnee'] },
  { id: 5, name: 'rightHip', label: 'Right Hip', gpio: 33, triplet: ['rightShoulder', 'rightHip', 'rightKnee'] },
];

// Interior angle (degrees) at vertex `b`, between vectors b->a and b->c.
// Works fine on the normalized 2D {x,y} points stored on a move's target
// pose (z is not needed for this app's puppet angles).
function angleAtVertex(a, b, c) {
  if (!a || !b || !c) return null;
  const v1x = a.x - b.x, v1y = a.y - b.y;
  const v2x = c.x - b.x, v2y = c.y - b.y;
  const mag1 = Math.hypot(v1x, v1y);
  const mag2 = Math.hypot(v2x, v2y);
  if (mag1 === 0 || mag2 === 0) return null;
  const cos = Math.min(1, Math.max(-1, (v1x * v2x + v1y * v2y) / (mag1 * mag2)));
  return Math.acos(cos) * (180 / Math.PI);
}

function clampAngle(deg) {
  return Math.round(Math.min(MAX_ANGLE_DEG, Math.max(MIN_ANGLE_DEG, deg)));
}

// targetPose: the `target` object off a move (moves[i].target), i.e. the
// same landmark map drawGuideSilhouette reads. Returns an array of 6
// integers (servo id order 0-5), or null if there's no pose to draw yet.
export function computeServoAngles(targetPose) {
  if (!targetPose) return null;
  return SERVO_CHANNELS.map(({ triplet }) => {
    const [aName, bName, cName] = triplet;
    const raw = angleAtVertex(targetPose[aName], targetPose[bName], targetPose[cName]);
    return clampAngle(raw === null ? DEFAULT_ANGLE_DEG : raw);
  });
}

// Formats the 6 angles as the ESP32's full-pose serial line: "a0,...,a5\n"
export function formatPoseLine(angles) {
  return `${angles.join(',')}\n`;
}
