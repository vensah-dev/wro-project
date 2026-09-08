import audioSrc from '../../assets/music/everything-i-am-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// Standing lower-body pose reused across every move in this routine — the
// choreography for "Everything I Am" is all upper-body, so no move here
// scores or requires any knee bend. Knee keys are intentionally left out
// of `ranges`/`hints` on every move below.
const STANDING_LEGS = {
  leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
  leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
  leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
  leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
  leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
};

export const DANCE_MOVES = [
  {
    id: 'salute',
    label: 'Salute 🫡 (proud and tall)',
    ranges: {
      rightElbow: [25, 65], rightShoulder: [65, 105],
      leftElbow: [155, 180], leftShoulder: [0, 25],
    },
    hints: {
      rightElbow: { low: 'Bend your right elbow more to bring your hand to your head', high: 'Straighten your right elbow slightly' },
      rightShoulder: { low: 'Lift your right arm a bit higher', high: 'Lower your right arm a touch' },
      leftElbow: { low: 'Straighten your left arm down by your side', high: null },
      leftShoulder: { low: null, high: 'Relax your left arm down by your side' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.50 }, rightElbow: { x: 0.63, y: 0.28 },
      leftWrist: { x: 0.38, y: 0.66 }, rightWrist: { x: 0.50, y: 0.20 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'heart',
    label: 'Heart Hands 💖 (Everything I Am)',
    ranges: {
      leftElbow: [55, 110], rightElbow: [55, 110],
      leftShoulder: [15, 55], rightShoulder: [15, 55],
      wristGap: [0, 0.28],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow more', high: 'Open your left elbow up a little' },
      rightElbow: { low: 'Bend your right elbow more', high: 'Open your right elbow up a little' },
      leftShoulder: { low: 'Lift your left arm a touch', high: 'Lower your left arm a touch' },
      rightShoulder: { low: 'Lift your right arm a touch', high: 'Lower your right arm a touch' },
      wristGap: { low: null, high: 'Bring your hands together to form the heart' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.36, y: 0.44 }, rightElbow: { x: 0.64, y: 0.44 },
      leftWrist: { x: 0.47, y: 0.40 }, rightWrist: { x: 0.53, y: 0.40 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'hips',
    label: 'Hands on Hips 🙆 (stand proud)',
    ranges: {
      leftElbow: [55, 100], rightElbow: [55, 100],
      leftShoulder: [0, 30], rightShoulder: [0, 30],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow more to reach your hip', high: 'Relax your left elbow a little' },
      rightElbow: { low: 'Bend your right elbow more to reach your hip', high: 'Relax your right elbow a little' },
      leftShoulder: { low: null, high: 'Drop your left elbow down toward your hip' },
      rightShoulder: { low: null, high: 'Drop your right elbow down toward your hip' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.52 }, rightElbow: { x: 0.66, y: 0.52 },
      leftWrist: { x: 0.42, y: 0.58 }, rightWrist: { x: 0.58, y: 0.58 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'clap',
    label: 'Clap it Up 👏 (overhead clap)',
    ranges: {
      leftElbow: [60, 110], rightElbow: [60, 110],
      leftShoulder: [130, 175], rightShoulder: [130, 175],
      wristGap: [0, 0.25],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow a little more', high: 'Open your left elbow up a touch' },
      rightElbow: { low: 'Bend your right elbow a little more', high: 'Open your right elbow up a touch' },
      leftShoulder: { low: 'Raise your left arm higher overhead', high: 'Bring your left arm down slightly' },
      rightShoulder: { low: 'Raise your right arm higher overhead', high: 'Bring your right arm down slightly' },
      wristGap: { low: null, high: 'Bring your hands together to clap' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.44, y: 0.12 }, rightElbow: { x: 0.56, y: 0.12 },
      leftWrist: { x: 0.49, y: 0.04 }, rightWrist: { x: 0.51, y: 0.04 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'hug',
    label: 'Big Self Hug 🤗 (embrace the moment)',
    ranges: {
      leftElbow: [15, 55], rightElbow: [15, 55],
      leftShoulder: [55, 100], rightShoulder: [55, 100],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow more, wrap it across your chest', high: 'Relax your left elbow slightly' },
      rightElbow: { low: 'Bend your right elbow more, wrap it across your chest', high: 'Relax your right elbow slightly' },
      leftShoulder: { low: 'Bring your left arm across your body a bit more', high: 'Ease your left arm back slightly' },
      rightShoulder: { low: 'Bring your right arm across your body a bit more', high: 'Ease your right arm back slightly' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.60, y: 0.36 }, rightElbow: { x: 0.40, y: 0.36 },
      leftWrist: { x: 0.62, y: 0.44 }, rightWrist: { x: 0.38, y: 0.44 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'point',
    label: 'Reach for the Skyline ✨ (point up and out)',
    ranges: {
      rightElbow: [155, 180], rightShoulder: [140, 175],
      leftElbow: [155, 180], leftShoulder: [70, 110],
    },
    hints: {
      rightElbow: { low: 'Straighten your right arm out fully', high: null },
      rightShoulder: { low: 'Reach your right arm up higher', high: 'Bring your right arm down a touch' },
      leftElbow: { low: 'Straighten your left arm out fully', high: null },
      leftShoulder: { low: 'Raise your left arm out to the side a bit more', high: 'Lower your left arm a touch' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.18, y: 0.30 }, rightElbow: { x: 0.62, y: 0.14 },
      leftWrist: { x: 0.02, y: 0.28 }, rightWrist: { x: 0.66, y: 0.00 },
      ...STANDING_LEGS,
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
};

const TIMELINE = [
  { id: 'salute-1', moveId: 'salute', start: 0, end: 2.5 },
  { id: 'heart-1', moveId: 'heart', start: 2.5, end: 5 },
  { id: 'hips-1', moveId: 'hips', start: 5, end: 7.5 },
  { id: 'clap-1', moveId: 'clap', start: 7.5, end: 10 },
  { id: 'hug-1', moveId: 'hug', start: 10, end: 12.5 },
  { id: 'point-1', moveId: 'point', start: 12.5, end: 15 },
  { id: 'salute-2', moveId: 'salute', start: 15, end: 17.5 },
  { id: 'hips-2', moveId: 'hips', start: 17.5, end: 20 },
  { id: 'heart-2', moveId: 'heart', start: 20, end: 22.5 },
  { id: 'point-2', moveId: 'point', start: 22.5, end: 25 },
  { id: 'clap-2', moveId: 'clap', start: 25, end: 27.5 },
  { id: 'hug-2', moveId: 'hug', start: 27.5, end: 30 },
];

export default {
  id: 'ndp2020-everything-i-am',
  title: 'Everything I Am (NDP 2020)',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};