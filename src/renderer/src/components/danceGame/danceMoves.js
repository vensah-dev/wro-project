// ============================================================
// DANCE MOVE DATASET (unchanged)
// ============================================================
import { CONFIG } from './config';
import { scoreRange } from './geometry';

export const DANCE_MOVES = [
  {
    id: 'baby',
    label: 'Baby Shark 🐟 (little chomp)',
    ranges: {
      leftElbow: [15, 85], rightElbow: [15, 85],
      leftShoulder: [5, 55], rightShoulder: [5, 55],
      wristGap: [0, 0.75],
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.40 }, rightElbow: { x: 0.66, y: 0.40 },
      leftWrist: { x: 0.40, y: 0.36 }, rightWrist: { x: 0.60, y: 0.36 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'mommy',
    label: 'Mommy Shark 🐬 (medium chomp)',
    ranges: {
      leftElbow: [70, 135], rightElbow: [70, 135],
      leftShoulder: [45, 95], rightShoulder: [45, 95],
      wristGap: [0.6, 1.5],
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.26, y: 0.34 }, rightElbow: { x: 0.74, y: 0.34 },
      leftWrist: { x: 0.30, y: 0.22 }, rightWrist: { x: 0.70, y: 0.22 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'daddy',
    label: 'Daddy Shark 🦈 (big chomp)',
    ranges: {
      leftElbow: [140, 180], rightElbow: [140, 180],
      leftShoulder: [70, 135], rightShoulder: [70, 135],
      wristGap: [1.3, 3.5],
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.14, y: 0.32 }, rightElbow: { x: 0.86, y: 0.32 },
      leftWrist: { x: 0.02, y: 0.30 }, rightWrist: { x: 0.98, y: 0.30 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'run',
    label: 'Run Away! 🏃',
    customScore: (a) => {
      const bentEnough = (v) => scoreRange(v, [0, 100], CONFIG.ANGLE_TOLERANCE_DEG);
      const elbowAsym = Math.abs(a.leftElbow - a.rightElbow);
      const shoulderAsym = Math.abs(a.leftShoulder - a.rightShoulder);
      return (
        bentEnough(a.leftShoulder) * 0.25 +
        bentEnough(a.rightShoulder) * 0.25 +
        scoreRange(elbowAsym, [35, 180], CONFIG.ANGLE_TOLERANCE_DEG) * 0.25 +
        scoreRange(shoulderAsym, [25, 180], CONFIG.ANGLE_TOLERANCE_DEG) * 0.25
      );
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.30, y: 0.28 }, rightElbow: { x: 0.66, y: 0.42 },
      leftWrist: { x: 0.24, y: 0.18 }, rightWrist: { x: 0.60, y: 0.50 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
  {
    id: 'safe',
    label: "It's the End — Safe! 🙌",
    ranges: {
      leftElbow: [150, 180], rightElbow: [150, 180],
      leftShoulder: [150, 180], rightShoulder: [150, 180],
    },
    customScore: (a) => {
      const leftUp = a.leftWristY < a.leftShoulderY - 0.05 ? 1 : 0.3;
      const rightUp = a.rightWristY < a.rightShoulderY - 0.05 ? 1 : 0.3;
      return (leftUp + rightUp) / 2;
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.16 }, rightElbow: { x: 0.60, y: 0.16 },
      leftWrist: { x: 0.38, y: 0.02 }, rightWrist: { x: 0.62, y: 0.02 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
];

export const getMoveById = (id) => DANCE_MOVES.find((m) => m.id === id) || null;
