import React from 'react';

export default function LearnCompleteScreen({ onRestart, onExit }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black/80">
      <h2 className="text-3xl font-extrabold text-white">You've tried every move! 🎉</h2>
      <p className="max-w-xs text-center text-sm text-gray-300">
        Go back through at your own pace, or head to Compete mode when you're ready to dance to the song.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-pink-400 active:scale-95"
        >
          Practice Again
        </button>
        <button
          onClick={onExit}
          className="rounded-full bg-white/10 px-8 py-3 text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
