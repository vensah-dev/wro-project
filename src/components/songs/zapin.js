// ============================================================
// SONG: Zapin instrumental
// ============================================================
// This is a placeholder — no actual track ships with this file. Drop a
// licensed instrumental at src/renderer/src/assets/zapin-song.mp3 (or
// point audioSrc at wherever you host it) before running this song.
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
//   - ragam siku jalak: elbows flared outward wide to the sides at
//     shoulder level like a cock's wings, providing clear lateral
//     2D planar separation for tracking.
//   - ragam unta ("camel pattern"): an undulating, rolling arm/shoulder
//     motion echoing Zapin's desert-trade-route origin — a nod to the
//     camel's gait, one side rising as the other falls.
//   - ragam layar ("sailing"): one arm extended high diagonally sideways
//     like a sail while the opposite arm stays low, giving clear diagonal
//     2D keypoint contrast across the chest.
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
// array). Tolerance ranges expanded for flexible 2D camera detection.
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'sembah-tamu',
    label: 'Sembah Tamu 🙏 (opening salutation)',
    funFact: "The Sembah is a traditional Malay gesture of humility and respect performed at the start of a dance to greet the audience and community elders.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      leftElbow: [65, 145], rightElbow: [65, 145],
      leftShoulder: [0, 65], rightShoulder: [0, 65],
      wristGap: [0, 0.55],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
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
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'melenggang-kanan',
    label: 'Melenggang — Kanan Depan (natural hand swing, right forward)',
    funFact: "Melenggang is the core hand swing of Zapin, performed with relaxed, loosely closed hands to maintain effortless poise alongside energetic footwork.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      rightElbow: [135, 180], rightShoulder: [5, 60],
      leftElbow: [135, 180], leftShoulder: [0, 35],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
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
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'melenggang-kiri',
    label: 'Melenggang — Kiri Depan (natural hand swing, left forward)',
    funFact: "While Zapin footwork shares common steps, unique variations in the melenggang hand swing help distinguish regional styles like Zapin Johor and Zapin Tenglu.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      leftElbow: [135, 180], leftShoulder: [5, 60],
      rightElbow: [135, 180], rightShoulder: [0, 35],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
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
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'ragam-siku-jalak',
    label: 'Ragam Siku Jalak 🐓 (flared elbow stance)',
    funFact: "Ragam Siku Jalak features elbows flared broadly to the sides, mimicking the proud stance of a rooster and creating a clear lateral shape.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      leftElbow: [50, 130], rightElbow: [50, 130],
      leftShoulder: [50, 120], rightShoulder: [50, 120],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Open your left arm angle slightly', high: 'Bend your left elbow more towards 90 degrees' },
      rightElbow: { low: 'Open your right arm angle slightly', high: 'Bend your right elbow more towards 90 degrees' },
      leftShoulder: { low: 'Raise your left elbow up to shoulder height', high: 'Drop your left elbow slightly' },
      rightShoulder: { low: 'Raise your right elbow up to shoulder height', high: 'Drop your right elbow slightly' },
    },
    genericHint: 'Raise both elbows out wide to the sides at shoulder height with bent arms, bringing hands toward your waist/chest area',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.22, y: 0.32 }, rightElbow: { x: 0.78, y: 0.32 },
      leftWrist: { x: 0.38, y: 0.48 }, rightWrist: { x: 0.62, y: 0.48 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'ragam-unta',
    label: 'Ragam Unta 🐫 (camel pattern — rolling, undulating sway)',
    funFact: "Ragam Unta mimics the undulating gait of a camel, honoring Zapin's historical origins brought to the Malay world by Hadrami traders from Yemen.",
    customScore: (a) => {
      const armOut = (v) => scoreRange(v, [120, 180], CONFIG.ANGLE_TOLERANCE_DEG);
      const shoulderAsym = Math.abs(a.leftShoulder - a.rightShoulder);
      return (
        armOut(a.leftElbow) * 0.2 +
        armOut(a.rightElbow) * 0.2 +
        scoreRange(shoulderAsym, [20, 100], CONFIG.ANGLE_TOLERANCE_DEG) * 0.6
      );
    },
    genericHint: 'Extend both arms out to the sides, but let one ride higher than the other, like a gentle rolling wave — echoing a camel\u2019s undulating gait',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.16, y: 0.24 }, rightElbow: { x: 0.82, y: 0.44 },
      leftWrist: { x: 0.00, y: 0.14 }, rightWrist: { x: 0.98, y: 0.54 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'ragam-layar',
    label: 'Ragam Layar ⛵ (sail pattern — high diagonal extension)',
    funFact: "Ragam Layar extends one arm high diagonally like a billowing sail, referencing the maritime trading routes that helped spread Zapin across the Malay Archipelago.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      rightElbow: [130, 180], rightShoulder: [105, 175],
      leftElbow: [130, 180], leftShoulder: [0, 60],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightElbow: { low: 'Extend your right arm straighter upward', high: null },
      leftElbow: { low: 'Extend your left arm straighter downward', high: null },
      rightShoulder: { low: 'Raise your right arm higher diagonally', high: 'Lower your right arm slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm extended low at your side' },
    },
    genericHint: 'Reach your right arm high and wide out to the upper diagonal while keeping your left arm relaxed down near your side',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.32, y: 0.52 }, rightElbow: { x: 0.78, y: 0.20 },
      leftWrist: { x: 0.22, y: 0.68 }, rightWrist: { x: 0.92, y: 0.10 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'ragam-berkayuh',
    label: 'Ragam Berkayuh 🚣 (paddling — left reaches out, right pulls back)',
    funFact: "Ragam Berkayuh mimics the rhythmic motion of paddling a boat, reflecting the coastal and riverine heritage of villages like Batu Pahat.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      leftElbow: [130, 180], leftShoulder: [20, 75],
      rightElbow: [55, 125], rightShoulder: [0, 50],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
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
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'wainab',
    label: 'Wainab ✨ (closing figure — open, raised flourish)',
    funFact: "Wainab is the energetic finale figure of a Zapin suite, where dancers execute open flourishes and turns as the gambus music accelerates to its climax.",
    ranges: {
      leftKnee: [135, 180], rightKnee: [135, 180],
      leftElbow: [110, 180], rightElbow: [110, 180],
      leftShoulder: [80, 160], rightShoulder: [80, 160],
    },
    customScore: (a) => {
      const armsUp = (v) => scoreRange(v, [110, 180], CONFIG.ANGLE_TOLERANCE_DEG);
      const leftUp = a.leftWristY < a.leftShoulderY ? 1 : 0.5;
      const rightUp = a.rightWristY < a.rightShoulderY ? 1 : 0.5;
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
  { id: 'sembah-1', moveId: 'sembah-tamu', start: 2, end: 4 },
  { id: 'melenggang-kanan-1', moveId: 'melenggang-kanan', start: 4, end: 6 },
  { id: 'melenggang-kiri-1', moveId: 'melenggang-kiri', start: 6, end: 8 },
  { id: 'melenggang-kanan-2', moveId: 'melenggang-kanan', start: 8, end: 10 },
  { id: 'ragam-siku-jalak-1', moveId: 'ragam-siku-jalak', start: 10, end: 12 },
  { id: 'ragam-unta-1', moveId: 'ragam-unta', start: 12, end: 14 },
  { id: 'ragam-layar-1', moveId: 'ragam-layar', start: 14, end: 16 },
  { id: 'ragam-berkayuh-1', moveId: 'ragam-berkayuh', start: 16, end: 18 },
  { id: 'melenggang-kiri-2', moveId: 'melenggang-kiri', start: 18, end: 20 },
  { id: 'ragam-siku-jalak-2', moveId: 'ragam-siku-jalak', start: 20, end: 22 },
  { id: 'ragam-unta-2', moveId: 'ragam-unta', start: 22, end: 24 },
  { id: 'sembah-2', moveId: 'sembah-tamu', start: 24, end: 26 },
  { id: 'wainab-1', moveId: 'wainab', start: 26, end: 28 },
];

export default {
  id: 'zapin',
  title: 'Zapin',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};