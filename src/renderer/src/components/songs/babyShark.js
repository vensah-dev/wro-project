// ============================================================
// SONG: Baby Shark
// ============================================================
// Baby Shark is copyrighted — this project does NOT ship the actual track
// or its lyrics. Drop your own licensed copy at
// src/renderer/src/assets/baby-shark-song.mov (or point audioSrc at
// wherever you host it) before running this song. If the file is missing,
// the UI shows a warning instead of failing silently.
//
// `moves` currently reuses your existing DANCE_MOVES export from
// components/danceMoves.js, since that's where Baby Shark's move
// definitions (pose criteria, angles, etc.) already live. If you'd
// rather each song fully own its moves, cut that array out of
// danceMoves.js and paste it directly into this file instead.

import audioSrc from '../../assets/music/baby-shark-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// ============================================================
// DANCE MOVE DATASET — Baby Shark's moves (used as songs/babyShark.js's
// `moves` array). `ranges` / `customScore` / `target` are unchanged from
// the original single-file version. `hints` and `genericHint` explain
// *why* a pose is wrong, direction by direction, for Learn mode.
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'baby',
    label: 'Baby Shark 🐟 (little chomp)',
    ranges: {
      leftElbow: [15, 85], rightElbow: [15, 85],
      leftShoulder: [5, 55], rightShoulder: [5, 55],
      wristGap: [0, 0.75],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow a little more', high: 'Straighten your left elbow a bit' },
      rightElbow: { low: 'Bend your right elbow a little more', high: 'Straighten your right elbow a bit' },
      leftShoulder: { low: 'Lift your left arm a touch', high: 'Lower your left arm a touch' },
      rightShoulder: { low: 'Lift your right arm a touch', high: 'Lower your right arm a touch' },
      wristGap: { low: 'Bring your hands a little closer together', high: 'Give your hands a bit more space' },
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
    hints: {
      leftElbow: { low: 'Open your left elbow up more', high: 'Bring your left elbow in a bit' },
      rightElbow: { low: 'Open your right elbow up more', high: 'Bring your right elbow in a bit' },
      leftShoulder: { low: 'Raise your left arm higher', high: 'Bring your left arm down a bit' },
      rightShoulder: { low: 'Raise your right arm higher', high: 'Bring your right arm down a bit' },
      wristGap: { low: 'Spread your hands a bit wider', high: 'Bring your hands in a bit' },
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
    hints: {
      leftElbow: { low: 'Straighten your left arm out fully', high: 'You\u2019re overextending — relax the left elbow slightly' },
      rightElbow: { low: 'Straighten your right arm out fully', high: 'You\u2019re overextending — relax the right elbow slightly' },
      leftShoulder: { low: 'Raise your left arm higher', high: 'Bring your left arm down a bit' },
      rightShoulder: { low: 'Raise your right arm higher', high: 'Bring your right arm down a bit' },
      wristGap: { low: 'Reach both arms out wider — big chomp!', high: 'A little too wide, bring your hands in slightly' },
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
    genericHint: 'Pump your arms like you\u2019re running — bend both elbows and swing them opposite each other',
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
    hints: {
      leftElbow: { low: 'Straighten your left arm all the way up', high: null },
      rightElbow: { low: 'Straighten your right arm all the way up', high: null },
      leftShoulder: { low: 'Raise your left arm straight overhead', high: null },
      rightShoulder: { low: 'Raise your right arm straight overhead', high: null },
    },
    genericHint: 'Reach both arms straight up above your shoulders',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.16 }, rightElbow: { x: 0.60, y: 0.16 },
      leftWrist: { x: 0.38, y: 0.02 }, rightWrist: { x: 0.62, y: 0.02 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
    },
  },
];

// Was `getMoveById = (id) => DANCE_MOVES.find(...)`, i.e. scoped to this
// file's own move list. Compete/Learn now hand it whichever song's
// `moves` array is active, so it needs to search THAT list instead of
// always searching Baby Shark's.
export const getMoveById = (moves, id) => moves.find((m) => m.id === id) || null;

// Maps each scored criterion to the limb(s) whose skeleton color/hint it
// should drive in Learn mode. wristGap compares both hands, so it can
// affect either arm's color. This mapping is generic (criterion name ->
// limb), not tied to Baby Shark specifically, so it stays as-is for any
// song whose moves use these same criterion names.
export const CRITERION_TO_LIMB = {
  leftElbow: ['leftArm'],
  leftShoulder: ['leftArm'],
  rightElbow: ['rightArm'],
  rightShoulder: ['rightArm'],
  wristGap: ['leftArm', 'rightArm'],
};

const TIMELINE = [
  { id: 'baby-1', moveId: 'baby', start: 4, end: 7 },
  { id: 'baby-2', moveId: 'baby', start: 7, end: 12 },
  { id: 'baby-3', moveId: 'baby', start: 12, end: 17 },
  { id: 'mommy-1', moveId: 'mommy', start: 19, end: 24 },
  { id: 'mommy-2', moveId: 'mommy', start: 24, end: 29 },
  { id: 'mommy-3', moveId: 'mommy', start: 29, end: 34 },
  { id: 'daddy-1', moveId: 'daddy', start: 36, end: 41 },
  { id: 'daddy-2', moveId: 'daddy', start: 41, end: 46 },
  { id: 'daddy-3', moveId: 'daddy', start: 46, end: 51 },
  { id: 'run-1', moveId: 'run', start: 53, end: 60 },
  { id: 'safe-1', moveId: 'safe', start: 60, end: 68 },
];

export default {
  id: 'baby-shark',
  title: 'Baby Shark',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};
