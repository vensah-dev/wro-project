import React from 'react';

export function ScoreHud({ score, combo }) {
  return (
    <div className="absolute left-6 top-6 z-20 rounded-xl bg-black/55 px-4 py-3 font-sans text-white">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-300">Score</div>
      <div className="text-3xl font-extrabold tabular-nums">{score}</div>
      {combo > 0 && <div className="mt-1 text-sm font-bold text-yellow-300">{combo}x combo</div>}
    </div>
  );
}
