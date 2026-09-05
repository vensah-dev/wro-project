import React from 'react';

export default function ScoreHud({ score, combo }) {
  return (
    <div className="absolute left-4 top-4 z-20 rounded-xl px-4 py-3 font-sans text-white">
      <div className="text-6xl font-thin tabular-nums">{score}</div>
      {combo > 0 && <div className="mt-1 text-xl font-bold text-pink-500">{combo}x combo</div>}
    </div>
  );
}
