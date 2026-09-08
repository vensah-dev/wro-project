import audioSrc from '../../assets/music/tomorrows-here-today.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// NOTE: getMoveById and CRITERION_TO_LIMB are generic (not tied to any one
// song) and already live in the Baby Shark song file / a shared module.
// No need to redefine them here — Learn/Compete should keep importing
// those from wherever they're already exported and just pass this file's
// `moves` array in.

export const DANCE_MOVES = [
  {
    id: 'salute',
    label: 'Salute 🫡 (salute with one hand on your hip)',
    ranges: {
      // Right arm: the salute itself.
      rightElbow: [30, 75],
      rightShoulder: [70, 110],
      // Left arm: hand on hip — deliberately NOT "arm hanging straight
      // down," since that's indistinguishable from just standing at rest
      // and was letting people "pass" this move without doing anything
      // with their left arm at all.
      leftElbow: [70, 130],
      leftShoulder: [10, 50],
    },
    hints: {
      rightElbow: { low: 'Bend your right elbow more for the salute', high: 'Straighten your right elbow a touch' },
      rightShoulder: { low: 'Raise your right arm up toward your forehead', high: 'Lower your right arm slightly' },
      leftElbow: { low: 'Bend your left elbow more and bring your hand to your hip', high: 'Relax your left elbow slightly' },
      leftShoulder: { low: 'Bring your left elbow out to the side, hand on your hip', high: 'Bring your left arm back in toward your hip' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.52 }, rightElbow: { x: 0.64, y: 0.30 },
      leftWrist: { x: 0.42, y: 0.58 }, rightWrist: { x: 0.56, y: 0.20 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'wave',
    label: 'Wave the Flag 🎉 (hands up by your ears)',
    ranges: {
      // Smaller/more-bent elbow range than before, and the elbow target
      // point is now pushed out to the side (off the straight
      // shoulder-to-wrist line) so the angle it produces is an actual,
      // physically achievable bend rather than a near-straight arm mislabeled
      // as "bent."
      leftElbow: [80, 130], rightElbow: [80, 130],
      leftShoulder: [140, 175], rightShoulder: [140, 175],
      wristGap: [0.3, 1.0],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow more, bring your hand near your ear', high: 'Straighten your left elbow a touch' },
      rightElbow: { low: 'Bend your right elbow more, bring your hand near your ear', high: 'Straighten your right elbow a touch' },
      leftShoulder: { low: 'Reach your left arm further overhead', high: 'Bring your left arm down a touch' },
      rightShoulder: { low: 'Reach your right arm further overhead', high: 'Bring your right arm down a touch' },
      wristGap: { low: 'Bring your hands a little closer together', high: 'Give your hands a bit more space apart' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.16 }, rightElbow: { x: 0.72, y: 0.16 },
      leftWrist: { x: 0.34, y: 0.04 }, rightWrist: { x: 0.66, y: 0.04 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'swing',
    label: 'Power Swing 💪 (arms swing opposite, legs straight)',
    customScore: (a) => {
      const shoulderAsym = Math.abs(a.leftShoulder - a.rightShoulder);
      const elbowsStraightish = (
        scoreRange(a.leftElbow, [140, 180], CONFIG.ANGLE_TOLERANCE_DEG) +
        scoreRange(a.rightElbow, [140, 180], CONFIG.ANGLE_TOLERANCE_DEG)
      ) / 2;
      return (
        scoreRange(shoulderAsym, [50, 180], CONFIG.ANGLE_TOLERANCE_DEG) * 0.6 +
        elbowsStraightish * 0.4
      );
    },
    genericHint: 'Swing your arms opposite each other, like power-walking — one arm forward, one arm back, keeping legs still',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.22 }, rightElbow: { x: 0.66, y: 0.46 },
      leftWrist: { x: 0.30, y: 0.10 }, rightWrist: { x: 0.64, y: 0.58 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'push',
    label: 'Side Extend 👐 (arms stretched straight out to sides)',
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [150, 180], rightElbow: [150, 180],
      leftShoulder: [80, 110], rightShoulder: [80, 110],
      wristGap: [2.0, 4.0],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Extend your left arm straight out to the side', high: null },
      rightElbow: { low: 'Extend your right arm straight out to the side', high: null },
      leftShoulder: { low: 'Raise your left arm to shoulder height', high: 'Lower your left arm to shoulder height' },
      rightShoulder: { low: 'Raise your right arm to shoulder height', high: 'Lower your right arm to shoulder height' },
      wristGap: { low: 'Stretch both arms out wider to the sides', high: null },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.22, y: 0.32 }, rightElbow: { x: 0.78, y: 0.32 },
      leftWrist: { x: 0.05, y: 0.32 }, rightWrist: { x: 0.95, y: 0.32 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'star',
    label: 'Star Reach ⭐ (big V, feet apart, legs straight)',
    ranges: {
      leftElbow: [160, 180], rightElbow: [160, 180],
      leftShoulder: [150, 180], rightShoulder: [150, 180],
      wristGap: [2.5, 5.0],
    },
    hints: {
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftShoulder: { low: 'Reach your left arm higher overhead', high: 'Bring your left arm down a touch' },
      rightShoulder: { low: 'Reach your right arm higher overhead', high: 'Bring your right arm down a touch' },
      wristGap: { low: 'Reach both arms out wider — big finish!', high: null },
    },
    genericHint: 'Stand tall with feet apart and arms up in a big V — legs stay straight',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.22, y: 0.14 }, rightElbow: { x: 0.78, y: 0.14 },
      leftWrist: { x: 0.06, y: 0.02 }, rightWrist: { x: 0.94, y: 0.02 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.34, y: 0.80 }, rightKnee: { x: 0.66, y: 0.80 },
      leftAnkle: { x: 0.28, y: 0.96 }, rightAnkle: { x: 0.72, y: 0.96 },
      leftHeel: { x: 0.26, y: 0.98 }, rightHeel: { x: 0.74, y: 0.98 },
      leftFootIndex: { x: 0.32, y: 1.00 }, rightFootIndex: { x: 0.68, y: 1.00 },
    },
  },
];

// Cycles salute -> wave -> swing -> push -> star, repeating; each hop moves
// to a different move so no two consecutive segments are the same.
const TIMELINE = [
  { id: 'salute-1', moveId: 'salute', start: 0, end: 2.5 },
  { id: 'wave-1', moveId: 'wave', start: 2.5, end: 5 },
  { id: 'swing-1', moveId: 'swing', start: 5, end: 7.5 },
  { id: 'push-1', moveId: 'push', start: 7.5, end: 10 },
  { id: 'star-1', moveId: 'star', start: 10, end: 12.5 },
  { id: 'salute-2', moveId: 'salute', start: 12.5, end: 15 },
  { id: 'wave-2', moveId: 'wave', start: 15, end: 17.5 },
  { id: 'swing-2', moveId: 'swing', start: 17.5, end: 20 },
  { id: 'push-2', moveId: 'push', start: 20, end: 22.5 },
  { id: 'star-2', moveId: 'star', start: 22.5, end: 25 },
  { id: 'salute-3', moveId: 'salute', start: 25, end: 27.5 },
  { id: 'wave-3', moveId: 'wave', start: 27.5, end: 30 },
];

export default {
  id: 'tomorrows-here-today',
  title: "Tomorrow's Here Today (NDP 2017)",
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};