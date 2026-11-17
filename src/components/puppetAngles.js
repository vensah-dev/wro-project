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

const FORWARD_REST_DEG = 0;   // forward shoulders when the move has no `forward` target (arm hanging)
const KNEE_REST_DEG = 90;     // knees are ignored for now, so they just hold this

export const SERVO_CHANNELS = [
  { id: 0, name: 'leftShoulder', label: 'Left Shoulder (Side)', gpio: 13, triplet: ['leftHip', 'leftShoulder', 'leftElbow'] },
  { id: 1, name: 'leftShoulderForward', label: 'Left Shoulder (Forward)', gpio: null, triplet: null, forwardKey: 'left' },
  { id: 2, name: 'leftElbow', label: 'Left Elbow', gpio: 25, triplet: ['leftShoulder', 'leftElbow', 'leftWrist'] },

  { id: 3, name: 'rightShoulderForward', label: 'Right Shoulder (Forward)', gpio: null, triplet: null, forwardKey: 'right' },
  { id: 4, name: 'rightShoulder', label: 'Right Shoulder (Side)', gpio: 14, triplet: ['rightHip', 'rightShoulder', 'rightElbow'] },
  { id: 5, name: 'rightElbow', label: 'Right Elbow', gpio: 26, triplet: ['rightShoulder', 'rightElbow', 'rightWrist'] },

  { id: 6, name: 'leftHip', label: 'Left Hip', gpio: 27, triplet: ['leftShoulder', 'leftHip', 'leftKnee'] },
  { id: 7, name: 'leftKnee', label: 'Left Knee', gpio: 33, triplet: ['leftHip', 'leftKnee', 'leftAnkle'], skip: true },

  { id: 8, name: 'rightHip', label: 'Right Hip', gpio: 33, triplet: ['rightShoulder', 'rightHip', 'rightKnee'] },
  { id: 9, name: 'rightKnee', label: 'Right Knee', gpio: 33, triplet: ['rightHip', 'rightKnee', 'rightAnkle'], skip: true },
];

export function computeServoAngles(targetPose, forward) {
  if (!targetPose) return null;
  return SERVO_CHANNELS.map(({ triplet, forwardKey, skip }) => {
    if (skip) return KNEE_REST_DEG;
    if (forwardKey) return clampAngle(forward?.[forwardKey] ?? FORWARD_REST_DEG);
    if (!triplet) return DEFAULT_ANGLE_DEG;
    
    const [aName, bName, cName] = triplet;
    const raw = angleAtVertex(targetPose[aName], targetPose[bName], targetPose[cName]);
    return clampAngle(raw === null ? DEFAULT_ANGLE_DEG : raw);
  });
}

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

// Formats the 6 angles as the ESP32's full-pose serial line: "a0,...,a5\n"
export function formatPoseLine(angles) {
  return `${angles.join(',')}\n`;
}
