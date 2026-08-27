// ============================================================
// SONG: Zapin instrumental
// ============================================================
// This is a placeholder — no actual track ships with this file. Drop a
// licensed instrumental at src/renderer/src/assets/zapin-song.mp3 (or
// point audioSrc at wherever you host it) before running this song.
//
// WHAT TO LOOK FOR: Zapin is the classical Malay dance most visibly
// taught and performed in Singapore's Malay community — at Hari Raya
// celebrations, weddings (adat perkahwinan), and by groups like Sri
// Warisan Som Said Performing Arts. Its name comes from Arabic "zaffan"
// (dancer) / zafn (fast footwork), brought by Yemeni-Arab traders to
// the Malay world around the 14th century — which is why the core
// ensemble is gambus (an oud-like lute) and marwas (small hand drums),
// usually a lilting 6/8 feel. Good search terms: "Zapin instrumental,"
// "gambus marwas music," "Zapin Melayu Riau rhythm." Look for something
// moderate-to-brisk (~90-110 bpm feel) and lilting, not sharply
// percussive.
//
// RESEARCH NOTE — this file uses real named Zapin movement vocabulary
// (ragam), not generic "sway left / sway right" shapes:
//   - sembah (tamu): the opening salutation to the audience/guests,
//     hands pressed together at the chest.
//   - melenggang / "genggam tangan tak sudah": the foundational Zapin
//     hand movement — a continuous, low, natural alternating arm swing
//     (front-back, roughly hip height) with the hands loosely closed,
//     not an ornamental raised curve. Different Zapin variants (e.g.
//     Zapin Johor vs. Zapin Tenglu) are mostly distinguished by how
//     this hand-swing is styled, while the footwork stays the same.
//   - ragam tepuk: a clapping pattern — hands meet in front at chest
//     height with more forward arm extension than the sembah's close,
//     folded hold.
//   - ragam unta ("camel pattern"): an undulating, rolling arm/shoulder
//     motion echoing Zapin's desert-trade-route origin — a nod to the
//     camel's gait, one side rising as the other falls.
//   - ragam mencedok ("scooping"): one arm draws a scooping arc from
//     low in front of the body up toward the chest, like ladling water.
//   - ragam berkayuh ("paddling"): one arm reaches forward and down
//     while the other pulls back near the waist, echoing a paddling
//     motion — documented in river-village Zapin variants like Zapin
//     Tenglu Mak Usu from Batu Pahat.
//   - wainab: the traditional closing figure of a Zapin set, often
//     paired with a final turn — represented here as the finishing
//     open, raised flourish.
// (Other named ragam exist too — teng-teng, bunga-bunga, sendeng
// memikat, acah-acah, silang kaki — but those are primarily FOOTWORK
// patterns, which brings us to the same caveat as the other song files
// in this set: real Zapin lives mostly in fast, precise footwork
// (langkah) tightly synced to the gambus melody, plus subtle
// wrist/finger detail, none of which 2D front-facing shoulder/elbow
// tracking can resolve. So the moves below capture the arm/torso SHAPE
// of each named hand-ragam, not the footwork, and stay purely
// front-facing.
//
// `moves` follows the same shape as the other song files' DANCE_MOVES:
// pose criteria + ranges (or a customScore for asymmetric/flowing
// poses), `hints` / `genericHint` for Learn mode, and a `target`
// skeleton for overlay.

import audioSrc from '../../assets/music/zapin-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// ============================================================
// DANCE MOVE DATASET — Zapin's named ragam (used as zapin.js's `moves`
// array).
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'sembah-tamu',
    label: 'Sembah Tamu 🙏 (opening salutation)',
    ranges: {
      leftElbow: [80, 130], rightElbow: [80, 130],
      leftShoulder: [10, 50], rightShoulder: [10, 50],
      wristGap: [0, 0.4],
    },
    hints: {
      leftElbow: { low: 'Open your left elbow a little more', high: 'Bring your left elbow in a bit' },
      rightElbow: { low: 'Open your right elbow a little more', high: 'Bring your right elbow in a bit' },
      leftShoulder: { low: 'Lift your left arm a touch', high: 'Lower your left arm a touch' },
      rightShoulder: { low: 'Lift your right arm a touch', high: 'Lower your right arm a touch' },
      wristGap: { low: null, high: 'Bring your hands together in front of your chest' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.38, y: 0.42 }, rightElbow: { x: 0.62, y: 0.42 },
      leftWrist: { x: 0.49, y: 0.34 }, rightWrist: { x: 0.51, y: 0.34 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'melenggang-kanan',
    label: 'Melenggang — Kanan Depan (natural hand swing, right forward)',
    ranges: {
      rightElbow: [155, 180], rightShoulder: [15, 45],
      leftElbow: [155, 180], leftShoulder: [0, 20],
    },
    hints: {
      rightElbow: { low: 'Let your right arm hang a bit looser, not bent', high: null },
      leftElbow: { low: 'Let your left arm hang a bit looser, not bent', high: null },
      rightShoulder: { low: 'Swing your right arm a little further forward', high: 'Ease your right arm back down slightly' },
      leftShoulder: { low: null, high: 'Let your left arm swing back and stay low, close to your side' },
    },
    genericHint: 'Let your arms swing naturally like a relaxed walk — right arm forward and slightly out, left arm trailing back and low, hands loosely closed, not stiff',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.38, y: 0.54 }, rightElbow: { x: 0.72, y: 0.50 },
      leftWrist: { x: 0.34, y: 0.62 }, rightWrist: { x: 0.86, y: 0.58 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'melenggang-kiri',
    label: 'Melenggang — Kiri Depan (natural hand swing, left forward)',
    ranges: {
      leftElbow: [155, 180], leftShoulder: [15, 45],
      rightElbow: [155, 180], rightShoulder: [0, 20],
    },
    hints: {
      leftElbow: { low: 'Let your left arm hang a bit looser, not bent', high: null },
      rightElbow: { low: 'Let your right arm hang a bit looser, not bent', high: null },
      leftShoulder: { low: 'Swing your left arm a little further forward', high: 'Ease your left arm back down slightly' },
      rightShoulder: { low: null, high: 'Let your right arm swing back and stay low, close to your side' },
    },
    genericHint: 'Let your arms swing naturally like a relaxed walk — left arm forward and slightly out, right arm trailing back and low, hands loosely closed, not stiff',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.50 }, rightElbow: { x: 0.62, y: 0.54 },
      leftWrist: { x: 0.14, y: 0.58 }, rightWrist: { x: 0.66, y: 0.62 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'ragam-tepuk',
    label: 'Ragam Tepuk 👏 (clapping pattern)',
    ranges: {
      leftElbow: [110, 150], rightElbow: [110, 150],
      leftShoulder: [40, 75], rightShoulder: [40, 75],
      wristGap: [0, 0.3],
    },
    hints: {
      leftElbow: { low: 'Extend your left arm out a bit more for the clap', high: 'Bring your left elbow in a little' },
      rightElbow: { low: 'Extend your right arm out a bit more for the clap', high: 'Bring your right elbow in a little' },
      leftShoulder: { low: 'Raise your left arm a bit higher, out in front of you', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm a bit higher, out in front of you', high: 'Lower your right arm slightly' },
      wristGap: { low: null, high: 'Bring your hands together to meet in a clap' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.36 }, rightElbow: { x: 0.66, y: 0.36 },
      leftWrist: { x: 0.48, y: 0.30 }, rightWrist: { x: 0.52, y: 0.30 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'ragam-unta',
    label: 'Ragam Unta 🐫 (camel pattern — rolling, undulating sway)',
    customScore: (a) => {
      const armOut = (v) => scoreRange(v, [140, 180], CONFIG.ANGLE_TOLERANCE_DEG);
      const shoulderAsym = Math.abs(a.leftShoulder - a.rightShoulder);
      return (
        armOut(a.leftElbow) * 0.2 +
        armOut(a.rightElbow) * 0.2 +
        scoreRange(shoulderAsym, [30, 90], CONFIG.ANGLE_TOLERANCE_DEG) * 0.6
      );
    },
    genericHint: 'Extend both arms out to the sides, but let one ride higher than the other, like a gentle rolling wave — echoing a camel\u2019s undulating gait',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.16, y: 0.24 }, rightElbow: { x: 0.82, y: 0.44 },
      leftWrist: { x: 0.00, y: 0.14 }, rightWrist: { x: 0.98, y: 0.54 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'ragam-mencedok',
    label: 'Ragam Mencedok 🥄 (scooping — right hand ladles upward)',
    ranges: {
      rightElbow: [90, 130], rightShoulder: [40, 80],
      leftElbow: [150, 180], leftShoulder: [0, 20],
    },
    hints: {
      rightElbow: { low: 'Curve your right arm into more of a scoop', high: 'Open your right elbow a little' },
      leftElbow: { low: null, high: 'Let your left arm relax straight down at your side' },
      rightShoulder: { low: 'Scoop your right arm up higher, toward your chest', high: 'Bring your right arm down slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low and relaxed at your side' },
    },
    genericHint: 'Draw your right hand up in a scooping arc from low in front of you toward your chest, like ladling water — left arm stays relaxed at your side',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.56 }, rightElbow: { x: 0.66, y: 0.42 },
      leftWrist: { x: 0.38, y: 0.66 }, rightWrist: { x: 0.56, y: 0.28 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'ragam-berkayuh',
    label: 'Ragam Berkayuh 🚣 (paddling — left reaches out, right pulls back)',
    ranges: {
      leftElbow: [150, 180], leftShoulder: [30, 60],
      rightElbow: [70, 110], rightShoulder: [10, 35],
    },
    hints: {
      leftElbow: { low: 'Reach your left arm out further, straightening it', high: null },
      rightElbow: { low: 'Pull your right elbow in a bit more, like finishing a paddle stroke', high: 'Let your right elbow open slightly' },
      leftShoulder: { low: 'Reach your left arm out on more of a forward-down diagonal', high: 'Bring your left arm in slightly' },
      rightShoulder: { low: null, high: 'Keep your right arm low, pulled back near your waist' },
    },
    genericHint: 'Reach your left arm out and down like dipping a paddle, then pull your right hand back near your waist to finish the stroke',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.50 }, rightElbow: { x: 0.64, y: 0.46 },
      leftWrist: { x: 0.14, y: 0.62 }, rightWrist: { x: 0.58, y: 0.56 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'wainab',
    label: 'Wainab ✨ (closing figure — open, raised flourish)',
    ranges: {
      leftElbow: [130, 170], rightElbow: [130, 170],
      leftShoulder: [100, 140], rightShoulder: [100, 140],
    },
    customScore: (a) => {
      const armsUp = (v) => scoreRange(v, [130, 175], CONFIG.ANGLE_TOLERANCE_DEG);
      const leftUp = a.leftWristY < a.leftShoulderY - 0.05 ? 1 : 0.4;
      const rightUp = a.rightWristY < a.rightShoulderY - 0.05 ? 1 : 0.4;
      return (
        armsUp(a.leftElbow) * 0.2 +
        armsUp(a.rightElbow) * 0.2 +
        armsUp(a.leftShoulder) * 0.15 +
        armsUp(a.rightShoulder) * 0.15 +
        leftUp * 0.15 +
        rightUp * 0.15
      );
    },
    genericHint: 'Open both arms out and up into a soft diagonal to finish, palms open — the traditional closing flourish of a Zapin set',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.26, y: 0.20 }, rightElbow: { x: 0.74, y: 0.20 },
      leftWrist: { x: 0.14, y: 0.08 }, rightWrist: { x: 0.86, y: 0.08 },
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
  { id: 'sembah-1', moveId: 'sembah-tamu', start: 2, end: 6 },
  { id: 'melenggang-kanan-1', moveId: 'melenggang-kanan', start: 8, end: 13 },
  { id: 'melenggang-kiri-1', moveId: 'melenggang-kiri', start: 13, end: 18 },
  { id: 'melenggang-kanan-2', moveId: 'melenggang-kanan', start: 18, end: 23 },
  { id: 'ragam-tepuk-1', moveId: 'ragam-tepuk', start: 25, end: 30 },
  { id: 'ragam-unta-1', moveId: 'ragam-unta', start: 32, end: 38 },
  { id: 'ragam-mencedok-1', moveId: 'ragam-mencedok', start: 40, end: 46 },
  { id: 'ragam-berkayuh-1', moveId: 'ragam-berkayuh', start: 46, end: 52 },
  { id: 'melenggang-kiri-2', moveId: 'melenggang-kiri', start: 54, end: 59 },
  { id: 'ragam-tepuk-2', moveId: 'ragam-tepuk', start: 61, end: 66 },
  { id: 'ragam-unta-2', moveId: 'ragam-unta', start: 68, end: 74 },
  { id: 'sembah-2', moveId: 'sembah-tamu', start: 76, end: 82 },
  { id: 'wainab-1', moveId: 'wainab', start: 84, end: 90 },
];

export default {
  id: 'zapin',
  title: 'Zapin',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};