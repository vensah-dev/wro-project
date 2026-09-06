import { useCallback, useEffect, useState } from 'react';
import { useSongPlayback } from './useSongPlayback';
import { getActiveTimelineEntry, getNextTimelineEntry, getSongEndTime } from '../timelineUtils';
import { getMoveById } from '../danceMoves';
import { useCompetePosePipeline } from './useCompetePosePipeline';
import { useCompeteScoring } from './useCompeteScoring';
import { useCompetePuppetSync } from './useCompetePuppetSync';
import { drawGuideSilhouette } from '../canvasDrawing';
import { useSerialContext } from '../hooks/SerialContext';

// ============================================================
// HOOK: ties playback + pose detection + scoring together — Compete mode
// ============================================================
// `song` supplies everything that used to be hardcoded: its own
// timeline, its own moves, its own audio.
export function useCompeteMode({ song, videoRef, canvasRef, guideCanvasRef, audioRef }) {
  const { timeline, moves } = song;
  const songEndTime = getSongEndTime(timeline);

  // Added `stop` to the destructured functions
  const { currentTime, isPlaying, hasEnded, play, handleEnded, stop } = useSongPlayback(audioRef);

  const currentEntry = isPlaying ? getActiveTimelineEntry(timeline, currentTime) : null;
  const expectedMoveId = currentEntry ? currentEntry.moveId : null;
  const expectedMove = getMoveById(moves, expectedMoveId);
  const nextMove = getMoveById(moves, isPlaying ? getNextTimelineEntry(timeline, currentTime)?.moveId : null);

  const { confirmedMoveId, isPersonVisible, poseStatus, poseError } = useCompetePosePipeline({
    videoRef, canvasRef, expectedMoveId, moves,
  });
  
  // Added `allMovesCompleted` to the destructured state
  const { score, combo, judgement, windowResults, reset, finalizeActiveWindow, allMovesCompleted } = useCompeteScoring({
    currentTime, currentEntry, confirmedMoveId, isPlaying, timeline,
  });

  // ESP32 puppet: streams the current expected move's target angles over
  // Web Serial so a physical puppet can act the moves out alongside the
  // on-screen guide silhouette.
  const serial = useSerialContext();
  const [transmissionEnabled, setTransmissionEnabled] = useState(true);
  const { angles: puppetAngles } = useCompetePuppetSync({
    expectedMove,
    sendLine: serial.sendLine,
    isConnected: serial.status === 'connected',
    transmissionEnabled,
  });

  // NEW: Watch for when all timeline moves have a result, and cut the music instantly
  useEffect(() => {
    if (allMovesCompleted && isPlaying) {
      stop();
    }
  }, [allMovesCompleted, isPlaying, stop]);

  // finalize the last scoring window once the song actually ends (fallback logic
  // just in case the song ends before the timeline is fully populated)
  useEffect(() => {
    if (hasEnded) finalizeActiveWindow();
  }, [hasEnded, finalizeActiveWindow]);

  // redraw the "do this now" guide silhouette whenever the expected move changes
  useEffect(() => {
    drawGuideSilhouette(guideCanvasRef.current, expectedMove);
  }, [expectedMove, guideCanvasRef]);

  const progress = songEndTime > 0 ? Math.min(currentTime / songEndTime, 1) : 0;

  const start = useCallback(() => { reset(); play(); }, [reset, play]);

  return {
    isPlaying, hasEnded, progress, start, handleEnded,
    isPersonVisible, expectedMove, nextMove,
    score, combo, judgement, windowResults,
    poseStatus, poseError,
    // puppet / serial
    puppetAngles,
    transmissionEnabled, setTransmissionEnabled,
    serialSupported: serial.isSupported,
    serialStatus: serial.status,
    serialError: serial.errorMessage,
    connectSerial: serial.connect,
    disconnectSerial: serial.disconnect,
  };
}