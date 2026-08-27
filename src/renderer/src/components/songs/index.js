// ============================================================
// SONGS — aggregates every song in this folder into one list
// ============================================================
// To add a new song: create components/songs/yourSong.js (copy the shape
// used by babyShark.js/chickenDance.js — id, title, audioSrc, timeline,
// moves), then import + add it to SONGS below. Nothing else in the app
// needs to change.

import babyShark from './babyShark';
import chickenDance from './chickenDance';
import bharatanatyam from './bharatanatyam';
import chineseFanDance from './chineseFanDance';
import zapin from './zapin';

export const SONGS = [bharatanatyam, chineseFanDance, zapin, babyShark, chickenDance];
export function getSongById(id) {
  return SONGS.find((song) => song.id === id) || null;
}
