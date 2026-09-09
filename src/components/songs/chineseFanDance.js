
// ============================================================
// SONG: Chinese classical fan dance instrumental
// ============================================================
// This is a placeholder — no actual track ships with this file. Drop a
// licensed instrumental at src/renderer/src/assets/chinese-fan-dance-song.mp3
// (or point audioSrc at wherever you host it) before running this song.
//
// RESEARCH NOTE — this file uses real classical Chinese dance hand/arm
// vocabulary (基本手位), not generic "arms up / arms out" shapes:
//   - 山膀 (shan bang, "mountain shoulder"): arm rotated into a long,
//     soft arc, held out to the side at shoulder height.
//   - 按掌 (an zhang, "press palm"): forearm curls back, hand presses
//     down close to the body around stomach height.
//   - 托掌 (tuo zhang, "uphold palm"): arm arcs up so the hand is held
//     above and slightly forward of the head, palm turned upward.
//   - 顺风旗 (shun feng qi, "flag in the wind"): a signature *combination*
//     pose — one arm in shan bang (out to the side) while the other is
//     in tuo zhang (arced overhead) — genuinely asymmetric, not a mirror
//     of a symmetric shape.
//   - 冲掌 (chong zhang, "thrusting palm"): one arm extends straight out
//     on a forward diagonal while the other tucks in at the ribs, palm
//     turned up.
//   - 云手 (yun shou, "cloud hands"): hands flow past each other in
//     front of the torso in continuous circular arcs — one hand higher
//     near the face, the other lower near the waist, constantly
//     trading places.
// Real fan-specific technique (扇子花/fan-flower wrist twirls, snapping
// the fan open/closed) lives in wrist rotation and prop handling that
// 2D shoulder/elbow tracking simply can't resolve — same caveat as the
// mudras/adavus/mridangam-timed footwork noted in the other song files
// in this set. So the moves below capture the arm/torso-facing SHAPE of
// each named position, not the fan-handling itself, and stay purely
// front-facing (no depth/foreshortening the camera can't read).
//
// `moves` follows the same shape as the other song files' DANCE_MOVES:
// pose criteria + ranges (or a customScore for asymmetric/flowing
// poses), `hints` / `genericHint` for Learn mode, and a `target`
// skeleton for overlay.

import audioSrc from '../../assets/music/chinese-fan-dance-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// ============================================================
// DANCE MOVE DATASET — classical Chinese fan dance hand positions
// (used as chineseFanDance.js's `moves` array).
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'shan-bang',
    label: 'Shan Bang 山膀 (mountain shoulder — arms open to the sides)',
    funFact: "Shan Bang (Mountain Shoulder) creates a broad, rounded arc with the arms. In classical Chinese dance, this posture conveys majestic presence, open strength, and the grounded dignity of a mountain.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [140, 175], rightElbow: [140, 175],
      leftShoulder: [80, 110], rightShoulder: [80, 110],
      wristGap: [1.6, 3.0],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Soften your left elbow into more of a gentle arc', high: 'Relax your left elbow — don\u2019t lock it fully straight' },
      rightElbow: { low: 'Soften your right elbow into more of a gentle arc', high: 'Relax your right elbow — don\u2019t lock it fully straight' },
      leftShoulder: { low: 'Raise your left arm up to shoulder height', high: 'Lower your left arm to shoulder height' },
      rightShoulder: { low: 'Raise your right arm up to shoulder height', high: 'Lower your right arm to shoulder height' },
      wristGap: { low: 'Reach both arms further out to the sides', high: null },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.18, y: 0.32 }, rightElbow: { x: 0.82, y: 0.32 },
      leftWrist: { x: 0.02, y: 0.32 }, rightWrist: { x: 0.98, y: 0.32 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'bao-yue',
    label: 'Bao Yue 抱月 (embracing the moon — arms form a circle in front of the chest)',
    funFact: "Bao Yue (Embracing the Moon) creates a continuous, rounded flow of energy in front of the chest. It represents completeness, gathering energy, and the graceful circular aesthetics essential to classical Chinese dance.",
    ranges: {
      leftKnee: [150, 180], rightKnee: [150, 180],
      leftElbow: [90, 150], rightElbow: [90, 150],
      leftShoulder: [40, 120], rightShoulder: [40, 120],
      wristGap: [0.1, 1.2],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Curve your left arm wider, like hugging a large barrel', high: 'Bend your left elbow a bit more' },
      rightElbow: { low: 'Curve your right arm wider, like hugging a large barrel', high: 'Bend your right elbow a bit more' },
      leftShoulder: { low: 'Raise your left arm up to chest level', high: 'Lower your left arm to chest level' },
      rightShoulder: { low: 'Raise your right arm up to chest level', high: 'Lower your right arm to chest level' },
      wristGap: { low: 'Bring your hands closer together in front of your chest', high: 'Separate your hands just slightly' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.25, y: 0.35 }, rightElbow: { x: 0.75, y: 0.35 },
      leftWrist: { x: 0.45, y: 0.35 }, rightWrist: { x: 0.55, y: 0.35 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'tuo-zhang',
    label: 'Tuo Zhang 托掌 (uphold palm — hands arc up above the forehead)',
    funFact: "Tuo Zhang (Uphold Palm) reaches skyward like upholding a precious object. In Chinese dance aesthetics, this gesture symbolizes reverence and the harmony between earth and the heavens.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [110, 150], rightElbow: [110, 150],
      leftShoulder: [150, 180], rightShoulder: [150, 180],
      wristGap: [0.2, 1.0],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Arc your left arm up a little more', high: 'Relax your left elbow slightly' },
      rightElbow: { low: 'Arc your right arm up a little more', high: 'Relax your right elbow slightly' },
      leftShoulder: { low: 'Raise your left arm higher, up above your head', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm higher, up above your head', high: 'Lower your right arm slightly' },
      wristGap: { low: null, high: 'Bring your hands closer together above your forehead' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.14 }, rightElbow: { x: 0.60, y: 0.14 },
      leftWrist: { x: 0.42, y: 0.02 }, rightWrist: { x: 0.58, y: 0.02 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'shun-feng-qi-right',
    label: 'Shun Feng Qi 顺风旗 — Right (flag in the wind: right side, left overhead)',
    funFact: "Shun Feng Qi (Flag in the Wind) pairs Shan Bang with Tuo Zhang in an iconic asymmetrical stance, evoking the image of a silk banner floating gracefully on a gentle breeze.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      rightElbow: [140, 175], rightShoulder: [80, 110],
      leftElbow: [110, 150], leftShoulder: [150, 180],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightElbow: { low: 'Soften your right elbow into more of a gentle arc', high: 'Relax your right elbow — don\u2019t lock it straight' },
      leftElbow: { low: 'Arc your left arm up a little more', high: 'Relax your left elbow slightly' },
      rightShoulder: { low: 'Raise your right arm up to shoulder height', high: 'Lower your right arm to shoulder height' },
      leftShoulder: { low: 'Raise your left arm higher, up above your head', high: 'Lower your left arm slightly' },
    },
    genericHint: 'Right arm reaches out to the side at shoulder height (shan bang), left arm arcs up above your head (tuo zhang) — the classic "flag in the wind" pose',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.14 }, rightElbow: { x: 0.82, y: 0.32 },
      leftWrist: { x: 0.42, y: 0.02 }, rightWrist: { x: 0.98, y: 0.32 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'shun-feng-qi-left',
    label: 'Shun Feng Qi 顺风旗 — Left (flag in the wind: left side, right overhead)',
    funFact: "Shun Feng Qi (Flag in the Wind) creates dynamic visual contrast. By sweeping one arm overhead and the other outward, it reflects fluid balance in classical fan and ribbon dances.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [140, 175], leftShoulder: [80, 110],
      rightElbow: [110, 150], rightShoulder: [150, 180],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Soften your left elbow into more of a gentle arc', high: 'Relax your left elbow — don\u2019t lock it straight' },
      rightElbow: { low: 'Arc your right arm up a little more', high: 'Relax your right elbow slightly' },
      leftShoulder: { low: 'Raise your left arm up to shoulder height', high: 'Lower your left arm to shoulder height' },
      rightShoulder: { low: 'Raise your right arm higher, up above your head', high: 'Lower your right arm slightly' },
    },
    genericHint: 'Left arm reaches out to the side at shoulder height (shan bang), right arm arcs up above your head (tuo zhang) — the mirrored "flag in the wind" pose',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.18, y: 0.32 }, rightElbow: { x: 0.60, y: 0.14 },
      leftWrist: { x: 0.02, y: 0.32 }, rightWrist: { x: 0.58, y: 0.02 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'chong-zhang-right',
    label: 'Chong Zhang 冲掌 — Right (thrusting palm: right hand thrusts forward, left tucks at the ribs)',
    funFact: "Chong Zhang (Thrusting Palm) combines a crisp, linear extension with a grounded core. It captures the concept of 'Gang Rou Xiang Ji'—the artistic balance between soft grace and sudden, precise energy.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      rightElbow: [160, 180], rightShoulder: [50, 85],
      leftElbow: [30, 70], leftShoulder: [5, 30],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightElbow: { low: 'Straighten your right arm out fully on the thrust', high: null },
      leftElbow: { low: 'Tuck your left elbow in closer to your ribs', high: 'Bring your left hand in closer to your side' },
      rightShoulder: { low: 'Extend your right arm out on more of a forward diagonal', high: 'Bring your right arm down slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low, tucked at your side' },
    },
    genericHint: 'Thrust your right arm out on a straight forward diagonal, left hand tucks in at your ribs, palm turned up',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.38, y: 0.46 }, rightElbow: { x: 0.78, y: 0.40 },
      leftWrist: { x: 0.44, y: 0.50 }, rightWrist: { x: 0.96, y: 0.46 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'chong-zhang-left',
    label: 'Chong Zhang 冲掌 — Left (thrusting palm: left hand thrusts forward, right tucks at the ribs)',
    funFact: "Chong Zhang (Thrusting Palm) directs focal energy across the body's diagonal. In fan dancing, this sudden sharp thrust creates a striking contrast against softer, continuous movements.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [160, 180], leftShoulder: [50, 85],
      rightElbow: [30, 70], rightShoulder: [5, 30],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Straighten your left arm out fully on the thrust', high: null },
      rightElbow: { low: 'Tuck your right elbow in closer to your ribs', high: 'Bring your right hand in closer to your side' },
      leftShoulder: { low: 'Extend your left arm out on more of a forward diagonal', high: 'Bring your left arm down slightly' },
      rightShoulder: { low: null, high: 'Keep your right arm low, tucked at your side' },
    },
    genericHint: 'Thrust your left arm out on a straight forward diagonal, right hand tucks in at your ribs, palm turned up',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.22, y: 0.40 }, rightElbow: { x: 0.62, y: 0.46 },
      leftWrist: { x: 0.04, y: 0.46 }, rightWrist: { x: 0.56, y: 0.50 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'yun-shou',
    label: 'Yun Shou 云手 (cloud hands — flowing circular hands in front of the torso)',
    funFact: "Yun Shou (Cloud Hands) is a classic continuous motion where the hands flow past one another like drifting clouds. Rooted in traditional philosophy, it embodies the uninterrupted exchange of Yin and Yang.",
    customScore: (a) => {
      const bentEnough = (v) => scoreRange(v, [70, 140], CONFIG.ANGLE_TOLERANCE_DEG);
      const wristVerticalOffset = Math.abs(a.leftWristY - a.rightWristY);
      return (
        bentEnough(a.leftElbow) * 0.25 +
        bentEnough(a.rightElbow) * 0.25 +
        scoreRange(wristVerticalOffset, [0.18, 0.4], CONFIG.ANGLE_TOLERANCE_DEG) * 0.5
      );
    },
    genericHint: 'Let your hands flow past each other in front of your chest — one arcing up near your face while the other arcs low near your waist, like drifting clouds',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.46 }, rightElbow: { x: 0.62, y: 0.30 },
      leftWrist: { x: 0.46, y: 0.52 }, rightWrist: { x: 0.50, y: 0.16 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
];

// Generic across songs — searches whichever `moves` array is handed to it.
export const getMoveById = (moves, id) => moves.find((m) => m.id === id) || null;

// Generic criterion -> limb mapping, same as the other song files. In
// practice this (and getMoveById above) probably belongs in a shared
// module rather than being duplicated per song file — kept here only to
// match the given file's format exactly.
export const CRITERION_TO_LIMB = {
  leftElbow: ['leftArm'],
  leftShoulder: ['leftArm'],
  rightElbow: ['rightArm'],
  rightShoulder: ['rightArm'],
  wristGap: ['leftArm', 'rightArm'],
  leftKnee: ['leftLeg'],
  rightKnee: ['rightLeg'],
};

// ~90 seconds total, with breathing room between poses for transitions.
const TIMELINE = [
  { id: 'shan-bang-1', moveId: 'shan-bang', start: 2, end: 4 },
  { id: 'bao-yue-1', moveId: 'bao-yue', start: 4, end: 6 },
  { id: 'tuo-zhang-1', moveId: 'tuo-zhang', start: 6, end: 8 },
  { id: 'shun-feng-qi-right-1', moveId: 'shun-feng-qi-right', start: 8, end: 10 },
  { id: 'shun-feng-qi-left-1', moveId: 'shun-feng-qi-left', start: 10, end: 12 },
  { id: 'yun-shou-1', moveId: 'yun-shou', start: 12, end: 14 },
  { id: 'yun-shou-2', moveId: 'yun-shou', start: 14, end: 16 },
  { id: 'chong-zhang-right-1', moveId: 'chong-zhang-right', start: 16, end: 18 },
  { id: 'chong-zhang-left-1', moveId: 'chong-zhang-left', start: 18, end: 20 },
  { id: 'tuo-zhang-2', moveId: 'tuo-zhang', start: 20, end: 22 },
  { id: 'shan-bang-2', moveId: 'shan-bang', start: 22, end: 24 },
];

export default {
  id: 'chinese-fan-dance',
  title: '扇子舞 — Shan Zi Wu',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};

