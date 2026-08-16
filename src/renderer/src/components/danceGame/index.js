// Barrel file — lets body-detector.jsx (and anything else) import the whole
// dance-game module from one place instead of reaching into every subfile.
export { CONFIG, AUDIO_SRC, LM, SILHOUETTE_BONES } from './config';
export { calcAngle, dist, scoreRange, computeFrameAngles } from './geometry';
export { DANCE_MOVES, getMoveById } from './danceMoves';
export {
  SONG_TIMELINE,
  SONG_END_TIME,
  getActiveTimelineEntry,
  getNextTimelineEntry,
} from './songTimeline';
export { scoreMove, matchBestMove, calculateGrade } from './scoring';
export { drawGuideSilhouette } from './canvasDrawing';

export { useSongPlayback } from './hooks/useSongPlayback';
export { usePosePipeline } from './hooks/usePosePipeline';
export { useCompeteScoring } from './hooks/useCompeteScoring';
export { useCompeteMode } from './hooks/useCompeteMode';

export { WebcamFeed } from './ui/WebcamFeed';
export { ProgressBar } from './ui/ProgressBar';
export { ScoreHud } from './ui/ScoreHud';
export { NextMovePanel } from './ui/NextMovePanel';
export { JudgementPopup } from './ui/JudgementPopup';
export { PersonNotVisibleBanner } from './ui/PersonNotVisibleBanner';
export { AudioMissingBanner } from './ui/AudioMissingBanner';
export { StartOverlay } from './ui/StartOverlay';
export { EndScreen } from './ui/EndScreen';
