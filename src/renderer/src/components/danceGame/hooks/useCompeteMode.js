// ============================================================
// HOOK: ties playback + pose detection + scoring together
// ============================================================
import { useEffect, useCallback } from 'react';
import { getActiveTimelineEntry, getNextTimelineEntry, SONG_END_TIME } from '../songTimeline';
import { getMoveById } from '../danceMoves';
import { drawGuideSilhouette } from '../canvasDrawing';
import { useSongPlayback } from './useSongPlayback';
import { usePosePipeline } from './usePosePipeline';
import { useCompeteScoring } from './useCompeteScoring';

export function useCompeteMode({ videoRef, canvasRef, guideCanvasRef, audioRef }) {
  const { currentTime, isPlaying, hasEnded, play, handleEnded } = useSongPlayback(audioRef);

  const currentEntry = isPlaying ? getActiveTimelineEntry(currentTime) : null;
  const expectedMoveId = currentEntry ? currentEntry.moveId : null;
  const expectedMove = getMoveById(expectedMoveId);
  const nextMove = getMoveById(isPlaying ? getNextTimelineEntry(currentTime)?.moveId : null);

  const { confirmedMoveId, isPersonVisible } = usePosePipeline({ videoRef, canvasRef, expectedMoveId });
  const { score, combo, judgement, windowResults, reset, finalizeActiveWindow } = useCompeteScoring({
    currentTime, currentEntry, confirmedMoveId, isPlaying,
  });

  // finalize the last scoring window once the song actually ends
  useEffect(() => {
    if (hasEnded) finalizeActiveWindow();
  }, [hasEnded, finalizeActiveWindow]);

  // redraw the "do this now" guide silhouette whenever the expected move changes
  useEffect(() => {
    drawGuideSilhouette(guideCanvasRef.current, expectedMove);
  }, [expectedMove, guideCanvasRef]);

  const progress = SONG_END_TIME > 0 ? Math.min(currentTime / SONG_END_TIME, 1) : 0;

  const start = useCallback(() => { reset(); play(); }, [reset, play]);

  return {
    isPlaying, hasEnded, progress, start, handleEnded,
    isPersonVisible, expectedMove, nextMove,
    score, combo, judgement, windowResults,
  };
}
