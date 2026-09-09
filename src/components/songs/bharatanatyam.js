// ============================================================
// SONG: Bharatanatyam Thillana
// ============================================================

import audioSrc from '../../assets/music/bharatanatyam-thillana-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// ============================================================
// DANCE MOVE DATASET — Bharatanatyam's named adavus/hastas
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'anjali-hasta',
    label: 'Anjali Hasta 🙏 (namaskaram — opening salutation)',
    funFact: "Anjali Hasta is the traditional gesture of reverence used in Namaskaram, where the dancer seeks blessings from the divine, the Guru, and the audience before and after performing.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [80, 130], rightElbow: [80, 130],
      leftShoulder: [10, 50], rightShoulder: [10, 50],
      wristGap: [0, 0.4],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Open your left elbow a little more', high: 'Bring your left elbow in a bit' },
      rightElbow: { low: 'Open your right elbow a little more', high: 'Bring your right elbow in a bit' },
      leftShoulder: { low: 'Lift your left arm a touch', high: 'Lower your left arm a touch' },
      rightShoulder: { low: 'Lift your right arm a touch', high: 'Lower your right arm a touch' },
      wristGap: { low: null, high: 'Bring your palms together at your chest' },
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
    id: 'tattadavu',
    label: 'Tattadavu (tap step — arms open on a soft downward diagonal)',
    funFact: "Tattadavu, derived from the word 'Tatta' meaning to strike, is the very first rhythm-building step taught to Bharatanatyam students to master basic footwork and rhythm.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [150, 180], rightElbow: [150, 180],
      leftShoulder: [50, 80], rightShoulder: [50, 80],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftShoulder: { low: 'Raise your left arm a little higher', high: 'Angle your left arm down a bit more' },
      rightShoulder: { low: 'Raise your right arm a little higher', high: 'Angle your right arm down a bit more' },
    },
    genericHint: 'Open both arms out on a soft downward diagonal from your shoulders, like the very first adavu every student learns',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.24, y: 0.42 }, rightElbow: { x: 0.76, y: 0.42 },
      leftWrist: { x: 0.10, y: 0.52 }, rightWrist: { x: 0.90, y: 0.52 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'nattadavu-kanan',
    label: 'Nattadavu — Right (rooting step: right arm extends at waist height)',
    funFact: "'Natta' means to stretch or root—in Nattadavu, the dancer stretches and strikes with the heel while extending the hand, creating dynamic linear posture.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      rightElbow: [150, 180], rightShoulder: [15, 40],
      leftElbow: [70, 110], leftShoulder: [0, 20],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftElbow: { low: 'Fold your left arm in a bit more', high: 'Open your left elbow slightly' },
      rightShoulder: { low: 'Extend your right arm out a little more, at waist height', high: 'Bring your right arm in slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm folded in, close to your body' },
    },
    genericHint: 'As your right heel roots out, extend your right arm out at waist height — left arm stays folded in close to your body',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.36, y: 0.52 }, rightElbow: { x: 0.80, y: 0.50 },
      leftWrist: { x: 0.32, y: 0.58 }, rightWrist: { x: 0.96, y: 0.54 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'nattadavu-kiri',
    label: 'Nattadavu — Left (rooting step: left arm extends at waist height)',
    funFact: "Nattadavu trains balance and lateral body symmetry by mirroring precise heel strikes and sharp arm extensions across both sides of the body.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [150, 180], leftShoulder: [15, 40],
      rightElbow: [70, 110], rightShoulder: [0, 20],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      rightElbow: { low: 'Fold your right arm in a bit more', high: 'Open your right elbow slightly' },
      leftShoulder: { low: 'Extend your left arm out a little more, at waist height', high: 'Bring your left arm in slightly' },
      rightShoulder: { low: null, high: 'Keep your right arm folded in, close to your body' },
    },
    genericHint: 'As your left heel roots out, extend your left arm out at waist height — right arm stays folded in close to your body',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.20, y: 0.50 }, rightElbow: { x: 0.64, y: 0.52 },
      leftWrist: { x: 0.04, y: 0.54 }, rightWrist: { x: 0.68, y: 0.58 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'visharu-adavu-kanan',
    label: 'Visharu Adavu — Right High (traveling diagonal: right sweeps up, left sweeps low)',
    funFact: "'Visharu' translates to 'fanning' or 'sweeping.' This adavu utilizes expansive diagonal arm sweeps to cover stage space with fluid energy.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      rightElbow: [150, 180], rightShoulder: [110, 150],
      leftElbow: [150, 180], leftShoulder: [10, 40],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      rightShoulder: { low: 'Sweep your right arm up higher, toward the upper corner', high: 'Bring your right arm down slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low, angled toward the floor' },
    },
    genericHint: 'A traveling diagonal sweep — right arm rises up and out, left arm sweeps down and out, like covering ground on a diagonal path',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.50 }, rightElbow: { x: 0.72, y: 0.18 },
      leftWrist: { x: 0.14, y: 0.68 }, rightWrist: { x: 0.86, y: 0.06 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'visharu-adavu-kiri',
    label: 'Visharu Adavu — Left High (traveling diagonal: left sweeps up, right sweeps low)',
    funFact: "Sweeping movements in Visharu Adavu emphasize geometric precision, combining high and low hand extensions across diagonal pathways.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [150, 180], leftShoulder: [110, 150],
      rightElbow: [150, 180], rightShoulder: [10, 40],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftShoulder: { low: 'Sweep your left arm up higher, toward the upper corner', high: 'Bring your left arm down slightly' },
      rightShoulder: { low: null, high: 'Keep your right arm low, angled toward the floor' },
    },
    genericHint: 'A traveling diagonal sweep — left arm rises up and out, right arm sweeps down and out, like covering ground on a diagonal path',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.18 }, rightElbow: { x: 0.72, y: 0.50 },
      leftWrist: { x: 0.14, y: 0.06 }, rightWrist: { x: 0.86, y: 0.68 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'swastika-hasta',
    label: 'Swastika Hasta (forearms crossed in front of the chest)',
    funFact: "Documented in the ancient classical treatise Abhinaya Darpana, Swastika Hasta is a Samyukta (double-hand) gesture symbolizing auspiciousness and symmetry.",
    customScore: (a) => {
      const bent = (v) => scoreRange(v, [90, 140], CONFIG.ANGLE_TOLERANCE_DEG);
      const crossed = a.leftWristX > a.rightWristX ? 1 : 0.2;
      return (
        bent(a.leftElbow) * 0.25 +
        bent(a.rightElbow) * 0.25 +
        crossed * 0.5
      );
    },
    genericHint: 'Cross your forearms in front of your chest, right wrist over left (or left over right) — a documented double-hand hasta, not just hands touching',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.46, y: 0.42 }, rightElbow: { x: 0.54, y: 0.42 },
      leftWrist: { x: 0.60, y: 0.34 }, rightWrist: { x: 0.40, y: 0.34 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'dola-hasta',
    label: 'Dola Hasta (swing hand — arms hang low and relaxed)',
    funFact: "'Dola' translates to 'swing'—this relaxed, low arm pose is traditionally used in classical dance during rest transitions or to express calm, grounded poise.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [130, 170], rightElbow: [130, 170],
      leftShoulder: [10, 30], rightShoulder: [10, 30],
      wristGap: [0.6, 1.3],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Let your left arm relax, not fully straight', high: null },
      rightElbow: { low: 'Let your right arm relax, not fully straight', high: null },
      leftShoulder: { low: null, high: 'Let your left arm hang low, relaxed at your side' },
      rightShoulder: { low: null, high: 'Let your right arm hang low, relaxed at your side' },
      wristGap: { low: null, high: null },
    },
    genericHint: 'Let both arms hang low and relaxed, elbows softly bent, hands pointing down — the resting position between phrases',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.38, y: 0.52 }, rightElbow: { x: 0.62, y: 0.52 },
      leftWrist: { x: 0.36, y: 0.66 }, rightWrist: { x: 0.64, y: 0.66 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'alapadma',
    label: 'Alapadma 🪷 (blooming lotus — hands open above the head)',
    funFact: "Alapadma literally means 'fully bloomed lotus.' It is one of the most expressive hand gestures in Indian classical dance, evoking beauty and spiritual blossoming.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [150, 180], rightElbow: [150, 180],
      leftShoulder: [140, 175], rightShoulder: [140, 175],
    },
    customScore: (a) => {
      const armsUp = (v) => scoreRange(v, [140, 180], CONFIG.ANGLE_TOLERANCE_DEG);
      const leftUp = a.leftWristY < a.leftShoulderY - 0.08 ? 1 : 0.3;
      const rightUp = a.rightWristY < a.rightShoulderY - 0.08 ? 1 : 0.3;
      return (
        armsUp(a.leftElbow) * 0.2 +
        armsUp(a.rightElbow) * 0.2 +
        armsUp(a.leftShoulder) * 0.15 +
        armsUp(a.rightShoulder) * 0.15 +
        leftUp * 0.15 +
        rightUp * 0.15
      );
    },
    genericHint: 'Raise both arms up and slightly out, like petals blossoming above your head',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.30, y: 0.14 }, rightElbow: { x: 0.70, y: 0.14 },
      leftWrist: { x: 0.24, y: 0.00 }, rightWrist: { x: 0.76, y: 0.00 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'mayura-chari',
    label: 'Mayura 🦚 (peacock finale — one arm crests overhead, other extends out)',
    funFact: "Mayura represents the peacock, India's national bird. This pose mimics the grace and elevated crest of a peacock in a grand, celebratory flourish.",
    ranges: {
      leftKnee: [160, 180], rightKnee: [160, 180],
      leftElbow: [100, 140], leftShoulder: [140, 175],
      rightElbow: [150, 180], rightShoulder: [80, 110],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      leftElbow: { low: 'Curve your left arm in a bit more, like a peacock\u2019s crest', high: 'Open your left elbow slightly' },
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      leftShoulder: { low: 'Raise your left arm higher, curving up and over your head', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm up to shoulder height', high: 'Lower your right arm to shoulder height' },
    },
    genericHint: 'Curve your left arm up and in over your head like a peacock\u2019s crest, right arm extends straight out to the side — the closing flourish',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.16 }, rightElbow: { x: 0.82, y: 0.32 },
      leftWrist: { x: 0.52, y: 0.06 }, rightWrist: { x: 0.98, y: 0.32 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
];

export const getMoveById = (moves, id) => moves.find((m) => m.id === id) || null;

export const CRITERION_TO_LIMB = {
  leftElbow: ['leftArm'],
  leftShoulder: ['leftArm'],
  rightElbow: ['rightArm'],
  rightShoulder: ['rightArm'],
  wristGap: ['leftArm', 'rightArm'],
  leftKnee: ['leftLeg'],
  rightKnee: ['rightLeg'],
};

const TIMELINE = [
  { id: 'anjali-1', moveId: 'anjali-hasta', start: 2, end: 4 },
  { id: 'tattadavu-1', moveId: 'tattadavu', start: 4, end: 6 },
  { id: 'nattadavu-kanan-1', moveId: 'nattadavu-kanan', start: 6, end: 8 },
  { id: 'nattadavu-kiri-1', moveId: 'nattadavu-kiri', start: 8, end: 10 },
  { id: 'visharu-kanan-1', moveId: 'visharu-adavu-kanan', start: 10, end: 12 },
  { id: 'visharu-kiri-1', moveId: 'visharu-adavu-kiri', start: 12, end: 14 },
  { id: 'swastika-1', moveId: 'swastika-hasta', start: 14, end: 16 },
  { id: 'dola-1', moveId: 'dola-hasta', start: 16, end: 18 },
  { id: 'alapadma-1', moveId: 'alapadma', start: 18, end: 20 },
  { id: 'alapadma-2', moveId: 'alapadma', start: 20, end: 22 },
  { id: 'nattadavu-kanan-2', moveId: 'nattadavu-kanan', start: 22, end: 24 },
  { id: 'nattadavu-kiri-2', moveId: 'nattadavu-kiri', start: 24, end: 26 },
  { id: 'anjali-2', moveId: 'anjali-hasta', start: 26, end: 28 },
  { id: 'mayura-1', moveId: 'mayura-chari', start: 28, end: 30 },
];

export default {
  id: 'bharatanatyam-thillana',
  title: 'பரதநாட்டியம்: தில்லானா — Bharatanatyam: Thillana',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};
