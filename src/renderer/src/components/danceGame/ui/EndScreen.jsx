import React from 'react';
import { calculateGrade } from '../scoring';

export function EndScreen({ score, windowResults, onRestart }) {
  const { grade, avgAccuracy } = calculateGrade(windowResults);
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/80">
      <h2 className="text-2xl font-bold text-gray-300">Dance Complete!</h2>
      <div className="text-6xl font-extrabold text-pink-400">{grade}</div>
      <div className="text-xl font-bold text-white">{score} points</div>
      <div className="text-sm text-gray-400">{Math.round(avgAccuracy * 100)}% average accuracy</div>
      <button
        onClick={onRestart}
        className="mt-3 rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-pink-400 active:scale-95"
      >
        Dance Again
      </button>
    </div>
  );
}
