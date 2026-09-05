// ============================================================
// TIMELINE UTILS — generic helpers, work with any song's timeline array
// ============================================================
// Previously this logic lived hardcoded against a single SONG_TIMELINE.
// Now every song brings its own timeline (see components/songs/*.js) and
// these functions just operate on whichever one they're given.

export function getSongEndTime(timeline) {
  return timeline[timeline.length - 1]?.end ?? 0;
}

// Entry active at time `t`, or null if `t` falls in a gap between windows.
export function getActiveTimelineEntry(timeline, t) {
  return timeline.find((entry) => t >= entry.start && t < entry.end) || null;
}

// First entry that starts after time `t`, for a "next up" preview.
export function getNextTimelineEntry(timeline, t) {
  return timeline.find((entry) => entry.start > t) || null;
}
