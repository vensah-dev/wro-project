import { LM, SILHOUETTE_BONES, CONFIG } from './config';

// ============================================================
// CANVAS DRAWING
// ============================================================

// Compete mode: draws the small "do this now" stick-figure preview into
// the side panel's own little canvas.
export function drawGuideSilhouette(canvas, targetMove) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  if (!targetMove) return;

  const t = targetMove.target;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  SILHOUETTE_BONES.forEach(([a, b]) => {
    const pa = t[a], pb = t[b];
    ctx.beginPath();
    ctx.moveTo(pa.x * width, pa.y * height);
    ctx.lineTo(pb.x * width, pb.y * height);
    ctx.stroke();
  });

  ctx.fillStyle = '#F468AF';
  Object.values(t).forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x * width, p.y * height, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  const midX = (t.leftShoulder.x + t.rightShoulder.x) / 2;
  const headY = t.leftShoulder.y - 0.14;
  ctx.beginPath();
  ctx.arc(midX * width, headY * height, height * 0.07, 0, Math.PI * 2);
  ctx.stroke();
}

// Learn mode: draws the same target pose semi-transparently directly onto
// the main camera canvas — a "ghost" the user lines themselves up against.
// Does NOT clear the canvas; the caller controls draw order (ghost first,
// live skeleton drawn on top of it).
export function drawGhostOverlay(ctx, width, height, targetMove) {
  if (!targetMove) return;
  const t = targetMove.target;

  ctx.save();
  ctx.globalAlpha = CONFIG.GHOST_OPACITY;
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([10, 8]);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  SILHOUETTE_BONES.forEach(([a, b]) => {
    const pa = t[a], pb = t[b];
    ctx.beginPath();
    ctx.moveTo(pa.x * width, pa.y * height);
    ctx.lineTo(pb.x * width, pb.y * height);
    ctx.stroke();
  });

  ctx.setLineDash([]);
  ctx.fillStyle = '#ffd23f';
  Object.values(t).forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x * width, p.y * height, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  const midX = (t.leftShoulder.x + t.rightShoulder.x) / 2;
  const headY = t.leftShoulder.y - 0.14;
  ctx.beginPath();
  ctx.arc(midX * width, headY * height, height * 0.07, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// Learn mode: draws the user's own live skeleton with each limb colored by
// how close it is to the target (green/yellow/red) instead of one
// whole-body color like Compete mode's red/green/blue.
export function drawLimbColoredSkeleton(ctx, landmarks, limbFeedback, width, height) {
  const torsoBones = [
    ['leftShoulder', 'rightShoulder'],
    ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
    ['leftHip', 'rightHip'],
  ];
  const limbBones = {
    leftArm: [['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist']],
    rightArm: [['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist']],
  };
  // Legs are drawn but never scored (see scoring.js), so there's no
  // feedback color to derive for them — always render them green rather
  // than reading a limbFeedback entry that will never exist.
  const legBones = [
    ['leftHip', 'leftKnee'], ['leftKnee', 'leftAnkle'],
    ['rightHip', 'rightKnee'], ['rightKnee', 'rightAnkle'],
  ];
  const LEG_COLOR = '#22ff55';
  const NAME_TO_IDX = {
    leftShoulder: LM.LEFT_SHOULDER, rightShoulder: LM.RIGHT_SHOULDER,
    leftElbow: LM.LEFT_ELBOW, rightElbow: LM.RIGHT_ELBOW,
    leftWrist: LM.LEFT_WRIST, rightWrist: LM.RIGHT_WRIST,
    leftHip: LM.LEFT_HIP, rightHip: LM.RIGHT_HIP,
    leftKnee: LM.LEFT_KNEE, rightKnee: LM.RIGHT_KNEE,
    leftAnkle: LM.LEFT_ANKLE, rightAnkle: LM.RIGHT_ANKLE,
  };

  const drawBone = (aName, bName, color) => {
    const a = landmarks[NAME_TO_IDX[aName]];
    const b = landmarks[NAME_TO_IDX[bName]];
    if (!a || !b) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(a.x * width, a.y * height);
    ctx.lineTo(b.x * width, b.y * height);
    ctx.stroke();
  };

  torsoBones.forEach(([a, b]) => drawBone(a, b, '#03b1fc'));
  for (const [limb, bones] of Object.entries(limbBones)) {
    const color = limbFeedback[limb]?.color || '#03b1fc';
    bones.forEach(([a, b]) => drawBone(a, b, color));
  }
  legBones.forEach(([a, b]) => drawBone(a, b, LEG_COLOR));
}
