import React from 'react';

// Slimmed-down version of Compete's NextMovePanel: since the ghost overlay
// is drawn right on the camera feed in Learn mode, this panel only needs
// to show which move it is and progress through the sequence — no mini
// stick-figure canvas needed here.
export default function GuidePanel({ expectedMove, seqIndex, total }) {
  if (!expectedMove) return null;
  return (
    <div className="absolute right-6 top-6 z-20 flex flex-col items-center gap-1 rounded-xl bg-black/55 px-4 py-3">
      <span className="text-xs font-semibold text-gray-300">Move {seqIndex + 1} of {total}</span>
      <span className="text-center text-sm font-bold text-white">{expectedMove.label}</span>
    </div>
  );
}
