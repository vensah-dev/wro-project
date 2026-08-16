import React from 'react';

// Learn-mode-only: manual Next/Previous since there's no timer forcing
// advancement, plus a way back to the mode-select screen. `suggestNext`
// gently pulses the Next button once the user has held a good pose for a
// bit (no visible countdown, so it never feels like a timer).
export default function LearnControls({ isFirst, isLast, suggestNext, onNext, onPrev, onExit }) {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
      <button
        onClick={onExit}
        className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        Menu
      </button>
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/20 disabled:opacity-30"
      >
        ‹ Prev
      </button>
      <button
        onClick={onNext}
        className={`rounded-full px-6 py-2 text-sm font-bold text-white transition ${
          suggestNext ? 'animate-pulse bg-pink-500 hover:bg-pink-400' : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        {isLast ? 'Finish ✓' : 'Next ›'}
      </button>
    </div>
  );
}
