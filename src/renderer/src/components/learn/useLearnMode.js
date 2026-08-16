import { useCallback, useState } from 'react';
import { CONFIG } from '../config';
import { useLearnPosePipeline } from './useLearnPosePipeline';

// ============================================================
// HOOK: ties pose detection to a self-paced move sequence — Learn mode
// ============================================================
// No timer, no points. The user steps through song.moves with Next/Prev;
// advancement past the last move is left to the caller (LearnMode shows a
// completion screen instead of just disabling Next).
export function useLearnMode({ song, videoRef, canvasRef }) {
  const moves = song.moves;
  const [seqIndex, setSeqIndex] = useState(0);
  const expectedMove = moves[seqIndex];

  const { isPersonVisible, limbFeedback, genericHint, streak } = useLearnPosePipeline({
    videoRef, canvasRef, expectedMove,
  });

  const next = useCallback(() => setSeqIndex((i) => Math.min(i + 1, moves.length - 1)), [moves.length]);
  const prev = useCallback(() => setSeqIndex((i) => Math.max(i - 1, 0)), []);
  const restart = useCallback(() => setSeqIndex(0), []);

  const isFirst = seqIndex === 0;
  const isLast = seqIndex === moves.length - 1;
  const suggestNext = streak >= CONFIG.LEARN_STREAK_TO_SUGGEST_NEXT && !isLast;

  return {
    expectedMove, seqIndex, total: moves.length, isFirst, isLast,
    isPersonVisible, limbFeedback, genericHint, suggestNext,
    next, prev, restart,
  };
}
