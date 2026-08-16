// ============================================================
// SONG TIMELINE
// ============================================================
// Maps seconds-into-the-song -> which move should be performed, and the
// window of time it's valid for. These numbers are a generic placeholder
// scaffold reflecting the song's well-known public structure (each
// "character" verse repeats a few times, then an escape verse, then an
// ending verse) — they will NOT line up perfectly with any specific
// recording. Play your own audio file, note down the real timestamps where
// each verse starts, and edit the numbers below to match. This array is
// pure timing data — no lyrics or audio content live in this file.


export const SONG_TIMELINE = [
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

export const SONG_END_TIME = SONG_TIMELINE[SONG_TIMELINE.length - 1]?.end ?? 0;

// Entry active at time `t`, or null if `t` falls in a gap between windows.
export function getActiveTimelineEntry(t) {
  return SONG_TIMELINE.find((entry) => t >= entry.start && t < entry.end) || null;
}

// First entry that starts after time `t`, for a "next up" preview.
export function getNextTimelineEntry(t) {
  return SONG_TIMELINE.find((entry) => entry.start > t) || null;
}
