import React from 'react';
import { calculateGrade } from '../scoring';

export default function EndScreen({ score, windowResults, onRestart, onBack }) {
  const { grade, avgAccuracy } = calculateGrade(windowResults);
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/80">
      <h2 className="text-2xl font-bold text-gray-300">Dance Complete!</h2>
      <div className="text-6xl font-extrabold text-pink-400">{grade}</div>
      <div className="text-xl font-bold text-white">{score} points</div>
      <div className="text-sm text-gray-400">{Math.round(avgAccuracy * 100)}% average accuracy</div>
      <div className="mt-3 flex gap-3">
        <button
          onClick={onRestart}
          className="rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-pink-400 active:scale-95"
        >
          Dance Again
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-full bg-white/10 px-8 py-3 text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
          >
            Menu
          </button>
        )}
      </div>
    </div>
  );
}
