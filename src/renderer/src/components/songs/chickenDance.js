// ============================================================
// SONG: The Chicken Dance
// ============================================================
// Same deal as Baby Shark — this project doesn't ship the actual track.
// Drop your own licensed copy at
// src/renderer/src/assets/chicken-dance-song.mov (or update the import
// below to wherever you host it).
//
// TODO — this file is a placeholder for wiring/testing only:
//   1. `TIMELINE` below is a rough guess at the song's well-known public
//      structure (flap/tail-wiggle/clap/turn, repeated a few times). Play
//      your real audio, note the actual verse timestamps, and replace
//      the numbers.
//   2. `moves` is EMPTY. I don't have visibility into the shape your
//      move objects use in danceMoves.js (pose angle criteria, etc.), so
//      I can't safely invent real Chicken Dance move data without
//      guessing wrong. Open danceMoves.js, copy the shape of one Baby
//      Shark move (e.g. the "baby" move), and create four moves here
//      with ids 'flap', 'tail', 'clap', 'turn' matching the moveIds
//      used in TIMELINE below.

import audioSrc from '../../assets/music/chicken-dance-song.mov';
import { DANCE_MOVES } from '../danceMoves';

const TIMELINE = [
  { id: 'flap-1', moveId: 'flap', start: 4, end: 7 },
  { id: 'flap-2', moveId: 'flap', start: 7, end: 10 },
  { id: 'flap-3', moveId: 'flap', start: 10, end: 13 },
  { id: 'flap-4', moveId: 'flap', start: 13, end: 16 },
  { id: 'tail-1', moveId: 'tail', start: 16, end: 19 },
  { id: 'tail-2', moveId: 'tail', start: 19, end: 22 },
  { id: 'tail-3', moveId: 'tail', start: 22, end: 25 },
  { id: 'tail-4', moveId: 'tail', start: 25, end: 28 },
  { id: 'clap-1', moveId: 'clap', start: 28, end: 32 },
  { id: 'turn-1', moveId: 'turn', start: 32, end: 36 },
];

// TODO: replace with real move definitions — see notes above.
const CHICKEN_DANCE_MOVES = [
  // { id: 'flap', ...same shape as a move in danceMoves.js },
  // { id: 'tail', ... },
  // { id: 'clap', ... },
  // { id: 'turn', ... },
];

export default {
  id: 'chicken-dance',
  title: 'The Chicken Dance',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};
