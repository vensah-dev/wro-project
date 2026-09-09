// everything-i-am.js
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
    funFact: 'The salute in National Day Parade routines represents honor and respect for the nation, inspired by uniformed youth groups and armed forces.',
    ranges: {
      rightElbow: [15, 80], rightShoulder: [50, 120],
      leftElbow: [140, 180], leftShoulder: [0, 40],
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
    funFact: 'Heart hands were prominently featured in NDP 2020 song-signing routines to express inclusivity, care, and compassion during the pandemic.',
    ranges: {
      leftElbow: [30, 150], rightElbow: [30, 150],
      leftShoulder: [0, 90], rightShoulder: [0, 90],
      wristGap: [0, 0.50],
    },
    hints: {
      leftElbow: { low: 'Bend your left elbow more toward your chest', high: 'Open your left arm slightly' },
      rightElbow: { low: 'Bend your right elbow more toward your chest', high: 'Open your right arm slightly' },
      leftShoulder: { low: 'Lift your left arm slightly', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Lift your right arm slightly', high: 'Lower your right arm slightly' },
      wristGap: { low: null, high: 'Bring your hands together at chest level' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.34, y: 0.44 }, rightElbow: { x: 0.66, y: 0.44 },
      leftWrist: { x: 0.46, y: 0.40 }, rightWrist: { x: 0.54, y: 0.40 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'hips',
    label: 'Hands on Hips 🙆 (stand proud)',
    funFact: 'Standing with hands on hips reflects confidence and strength—a central theme in Singapore’s national parade performances.',
    ranges: {
      leftElbow: [40, 120], rightElbow: [40, 120],
      leftShoulder: [0, 60], rightShoulder: [0, 60],
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
    funFact: 'Overhead clapping is a staple of NDP audience interaction, uniting thousands across the Padang and heartlands in rhythm.',
    ranges: {
      leftElbow: [50, 180], rightElbow: [50, 180],
      leftShoulder: [90, 180], rightShoulder: [90, 180],
      wristGap: [0, 0.45],
    },
    hints: {
      leftElbow: { low: 'Bend or raise your left arm higher', high: null },
      rightElbow: { low: 'Bend or raise your right arm higher', high: null },
      leftShoulder: { low: 'Raise your left arm higher overhead', high: null },
      rightShoulder: { low: 'Raise your right arm higher overhead', high: null },
      wristGap: { low: null, high: 'Bring your hands closer together overhead to clap' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.44, y: 0.12 }, rightElbow: { x: 0.56, y: 0.12 },
      leftWrist: { x: 0.49, y: 0.04 }, rightWrist: { x: 0.51, y: 0.04 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'open',
    label: 'Open Arms 👐 (embrace unity)',
    funFact: 'Opening arms wide is a prominent NDP mass-display movement representing openness, inclusivity, and welcoming the future together.',
    ranges: {
      leftElbow: [130, 180], rightElbow: [130, 180],
      leftShoulder: [60, 120], rightShoulder: [60, 120],
    },
    hints: {
      leftElbow: { low: 'Extend your left arm out straight to the side', high: null },
      rightElbow: { low: 'Extend your right arm out straight to the side', high: null },
      leftShoulder: { low: 'Raise your left arm to shoulder level', high: 'Lower your left arm to shoulder level' },
      rightShoulder: { low: 'Raise your right arm to shoulder level', high: 'Lower your right arm to shoulder level' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.22, y: 0.32 }, rightElbow: { x: 0.78, y: 0.32 },
      leftWrist: { x: 0.04, y: 0.32 }, rightWrist: { x: 0.96, y: 0.32 },
      ...STANDING_LEGS,
    },
  },
  {
    id: 'wave',
    label: 'Big Wave 👋 (wave to the crowd)',
    funFact: 'Waving high with extended arms is an authentic NDP audience sign of unity, easily captured on camera during stadium celebrations.',
    ranges: {
      rightElbow: [110, 180], rightShoulder: [120, 180],
      leftElbow: [140, 180], leftShoulder: [0, 40],
    },
    hints: {
      rightElbow: { low: 'Reach your right arm up and wave', high: null },
      rightShoulder: { low: 'Raise your right arm higher overhead', high: 'Lower your right arm a touch' },
      leftElbow: { low: 'Keep your left arm extended down by your side', high: null },
      leftShoulder: { low: null, high: 'Relax your left arm down by your side' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.50 }, rightElbow: { x: 0.70, y: 0.18 },
      leftWrist: { x: 0.38, y: 0.66 }, rightWrist: { x: 0.78, y: 0.06 },
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
  { id: 'open-1', moveId: 'open', start: 10, end: 12.5 },
  { id: 'wave-1', moveId: 'wave', start: 12.5, end: 15 },
  { id: 'salute-2', moveId: 'salute', start: 15, end: 17.5 },
  { id: 'hips-2', moveId: 'hips', start: 17.5, end: 20 },
  { id: 'heart-2', moveId: 'heart', start: 20, end: 22.5 },
  { id: 'wave-2', moveId: 'wave', start: 22.5, end: 25 },
  { id: 'clap-2', moveId: 'clap', start: 25, end: 27.5 },
  { id: 'open-2', moveId: 'open', start: 27.5, end: 30 },
];

export default {
  id: 'ndp2020-everything-i-am',
  title: 'Everything I Am (NDP 2020)',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};