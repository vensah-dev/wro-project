import React from 'react';

export default function StartOverlay({ title, onStart, onBack }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black/70">
      <h2 className="text-3xl font-extrabold text-white">{title} Dance-Off</h2>
      <p className="max-w-xs text-center text-sm text-gray-300">
        Step into frame, then hit start — match each pose as it comes up to score points and build your combo.
      </p>
      <button
        onClick={onStart}
        className="rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-pink-400 active:scale-95"
      >
        Start Dance-Off
      </button>
      {onBack && (
        <button
          onClick={onBack}
          className="text-sm font-semibold text-gray-400 underline-offset-2 hover:underline"
        >
          ‹ Back to menu
        </button>
      )}
    </div>
  );
}