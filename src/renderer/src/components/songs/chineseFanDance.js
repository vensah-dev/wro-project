// ============================================================
// SONG: Chinese classical fan dance instrumental
// ============================================================
// This is a placeholder — no actual track ships with this file. Drop a
// licensed instrumental at src/renderer/src/assets/chinese-fan-dance-song.mp3
// (or point audioSrc at wherever you host it) before running this song.
//
// WHAT TO LOOK FOR: fan dance (扇子舞) is one of the most visible
// Chinese folk/classical dance forms in Singapore — performed by
// community dance troupes and CCs (community centres) at Chinese New
// Year events and the annual Chingay Parade, and taught by groups like
// the People's Association's Chinese dance sections. A well-known
// reference piece in this style is 扇舞丹青 ("Fan Dance: Ink and Wash"),
// set to the classical guqin piece 高山流水 ("High Mountain, Flowing
// Water") — useful as a mood reference (flowing, painterly, unhurried),
// not something to copy move-for-move. Good search terms: "guqin/
// guzheng/erhu instrumental," "Mo Li Hua (茉莉花) instrumental," or
// generically "Chinese classical fan dance music." Look for something
// flowing and moderate-tempo (~70-95 bpm feel) — the vocabulary below
// is about sustained, arced lines, not sharp hits.
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
    ranges: {
      leftElbow: [140, 175], rightElbow: [140, 175],
      leftShoulder: [80, 110], rightShoulder: [80, 110],
      wristGap: [1.6, 3.0],
    },
    hints: {
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
    },
  },
  {
    id: 'an-zhang',
    label: 'An Zhang 按掌 (press palm — hands press low, in front of the body)',
    ranges: {
      leftElbow: [40, 85], rightElbow: [40, 85],
      leftShoulder: [15, 50], rightShoulder: [15, 50],
      wristGap: [0.3, 1.0],
    },
    hints: {
      leftElbow: { low: 'Curl your left forearm in a little more, toward your stomach', high: 'Let your left elbow open slightly' },
      rightElbow: { low: 'Curl your right forearm in a little more, toward your stomach', high: 'Let your right elbow open slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low and close to your body' },
      rightShoulder: { low: null, high: 'Keep your right arm low and close to your body' },
      wristGap: { low: null, high: 'Bring your hands in closer, pressing gently in front of your stomach' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.36, y: 0.44 }, rightElbow: { x: 0.64, y: 0.44 },
      leftWrist: { x: 0.40, y: 0.50 }, rightWrist: { x: 0.60, y: 0.50 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'tuo-zhang',
    label: 'Tuo Zhang 托掌 (uphold palm — hands arc up above the forehead)',
    ranges: {
      leftElbow: [110, 150], rightElbow: [110, 150],
      leftShoulder: [150, 180], rightShoulder: [150, 180],
      wristGap: [0.2, 1.0],
    },
    hints: {
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
    },
  },
  {
    id: 'shun-feng-qi-right',
    label: 'Shun Feng Qi 顺风旗 — Right (flag in the wind: right side, left overhead)',
    ranges: {
      rightElbow: [140, 175], rightShoulder: [80, 110],
      leftElbow: [110, 150], leftShoulder: [150, 180],
    },
    hints: {
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
    },
  },
  {
    id: 'shun-feng-qi-left',
    label: 'Shun Feng Qi 顺风旗 — Left (flag in the wind: left side, right overhead)',
    ranges: {
      leftElbow: [140, 175], leftShoulder: [80, 110],
      rightElbow: [110, 150], rightShoulder: [150, 180],
    },
    hints: {
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
    },
  },
  {
    id: 'chong-zhang-right',
    label: 'Chong Zhang 冲掌 — Right (thrusting palm: right hand thrusts forward, left tucks at the ribs)',
    ranges: {
      rightElbow: [160, 180], rightShoulder: [50, 85],
      leftElbow: [30, 70], leftShoulder: [5, 30],
    },
    hints: {
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
    },
  },
  {
    id: 'chong-zhang-left',
    label: 'Chong Zhang 冲掌 — Left (thrusting palm: left hand thrusts forward, right tucks at the ribs)',
    ranges: {
      leftElbow: [160, 180], leftShoulder: [50, 85],
      rightElbow: [30, 70], rightShoulder: [5, 30],
    },
    hints: {
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
    },
  },
  {
    id: 'yun-shou',
    label: 'Yun Shou 云手 (cloud hands — flowing circular hands in front of the torso)',
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
};

// ~90 seconds total, with breathing room between poses for transitions.
const TIMELINE = [
  { id: 'shan-bang-1', moveId: 'shan-bang', start: 2, end: 7 },
  { id: 'an-zhang-1', moveId: 'an-zhang', start: 9, end: 14 },
  { id: 'tuo-zhang-1', moveId: 'tuo-zhang', start: 16, end: 22 },
  { id: 'shun-feng-qi-right-1', moveId: 'shun-feng-qi-right', start: 24, end: 29 },
  { id: 'shun-feng-qi-left-1', moveId: 'shun-feng-qi-left', start: 29, end: 34 },
  { id: 'yun-shou-1', moveId: 'yun-shou', start: 36, end: 41 },
  { id: 'yun-shou-2', moveId: 'yun-shou', start: 41, end: 46 },
  { id: 'chong-zhang-right-1', moveId: 'chong-zhang-right', start: 48, end: 53 },
  { id: 'chong-zhang-left-1', moveId: 'chong-zhang-left', start: 53, end: 58 },
  { id: 'shun-feng-qi-right-2', moveId: 'shun-feng-qi-right', start: 60, end: 66 },
  { id: 'shun-feng-qi-left-2', moveId: 'shun-feng-qi-left', start: 66, end: 72 },
  { id: 'tuo-zhang-2', moveId: 'tuo-zhang', start: 74, end: 80 },
  { id: 'shan-bang-2', moveId: 'shan-bang', start: 82, end: 90 },
];

export default {
  id: 'chinese-fan-dance',
  title: 'Chinese Fan Dance',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};