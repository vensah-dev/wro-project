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

import audioSrc from '../../assets/baby-shark-song.mp3';
import { DANCE_MOVES } from '../danceMoves';

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
