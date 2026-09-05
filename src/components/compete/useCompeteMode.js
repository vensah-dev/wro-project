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

  const { currentTime, isPlaying, hasEnded, play, handleEnded } = useSongPlayback(audioRef);

  const currentEntry = isPlaying ? getActiveTimelineEntry(timeline, currentTime) : null;
  const expectedMoveId = currentEntry ? currentEntry.moveId : null;
  const expectedMove = getMoveById(moves, expectedMoveId);
  const nextMove = getMoveById(moves, isPlaying ? getNextTimelineEntry(timeline, currentTime)?.moveId : null);

  const { confirmedMoveId, isPersonVisible } = useCompetePosePipeline({
    videoRef, canvasRef, expectedMoveId, moves,
  });
  const { score, combo, judgement, windowResults, reset, finalizeActiveWindow } = useCompeteScoring({
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

  // finalize the last scoring window once the song actually ends
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
