// Forward shoulder flexion + 3D elbow angle from MediaPipe landmarks.
// Prefers poseWorldLandmarks (metres, consistent axes). Falls back to the
// normalized landmarks, where y is height-normalized and z is roughly
// width-scaled, so y is rescaled by height/width to match.
const L_SHOULDER = 11, R_SHOULDER = 12;
const L_ELBOW = 13, R_ELBOW = 14;
const L_WRIST = 15, R_WRIST = 16;

const MIN_VISIBILITY = 0.5;
// If the upper arm barely moves in the front-back/up-down plane (e.g. it's
// held straight out sideways) the forward angle is ill-defined, so call it 0.
const MIN_PLANE_RATIO = 0.3;

const toDeg = (r) => r * (180 / Math.PI);

// 0 = arm hanging, 90 = pointing at the camera, 180 = overhead.
export function forwardArmAngle(shoulder, elbow, yScale = 1) {
  const dx = elbow.x - shoulder.x;
  const dy = (elbow.y - shoulder.y) * yScale;
  const dz = elbow.z - shoulder.z; // negative = toward camera
  const planar = Math.hypot(dy, dz);
  const full = Math.hypot(dx, dy, dz);
  if (full === 0 || planar / full < MIN_PLANE_RATIO) return 0;
  const raw = toDeg(Math.atan2(-dz, dy));
  if (raw < -90) return 180; // overhead and slightly backward
  return Math.min(180, Math.max(0, Math.round(raw)));
}

function angle3D(a, b, c, yScale = 1) {
  const v1 = [a.x - b.x, (a.y - b.y) * yScale, a.z - b.z];
  const v2 = [c.x - b.x, (c.y - b.y) * yScale, c.z - b.z];
  const m1 = Math.hypot(...v1), m2 = Math.hypot(...v2);
  if (m1 === 0 || m2 === 0) return 180;
  const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  return Math.round(toDeg(Math.acos(Math.min(1, Math.max(-1, dot / (m1 * m2))))));
}

const ok = (p) => p && p.z !== undefined && (p.visibility === undefined || p.visibility >= MIN_VISIBILITY);

export function computeForwardAngles(landmarks, worldLandmarks, canvasElement) {
  const useWorld = Array.isArray(worldLandmarks) && worldLandmarks.length >= 17;
  const src = useWorld ? worldLandmarks : landmarks;
  const yScale = useWorld ? 1 : canvasElement.height / canvasElement.width;

  const side = (s, e, w) => {
    // visibility is read from the normalized landmarks in both cases
    if (!ok(landmarks[s]) || !ok(landmarks[e]) || !ok(landmarks[w])) {
      return { forward: 0, elbow3D: 180 };
    }
    return {
      forward: forwardArmAngle(src[s], src[e], yScale),
      elbow3D: angle3D(src[s], src[e], src[w], yScale),
    };
  };

  const left = side(L_SHOULDER, L_ELBOW, L_WRIST);
  const right = side(R_SHOULDER, R_ELBOW, R_WRIST);
  return {
    leftForward: left.forward, rightForward: right.forward,
    leftElbow3D: left.elbow3D, rightElbow3D: right.elbow3D,
  };
}