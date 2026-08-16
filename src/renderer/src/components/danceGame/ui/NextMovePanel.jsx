import React from 'react';

export function NextMovePanel({ guideCanvasRef, expectedMove, nextMove }) {
  if (!expectedMove) return null;
  return (
    <div className="absolute right-6 top-6 z-20 flex flex-col items-center gap-1.5 rounded-xl bg-black/55 px-4 py-3">
      <span className="text-xs font-semibold text-gray-300">Do this now:</span>
      <canvas ref={guideCanvasRef} width={180} height={220} className="rounded-lg bg-white/5" />
      <span className="text-center text-sm font-bold text-white">{expectedMove.label}</span>
      {nextMove && <span className="text-center text-xs text-gray-400">Next: {nextMove.label}</span>}
    </div>
  );
}
