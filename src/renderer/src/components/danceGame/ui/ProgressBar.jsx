import React from 'react';

export function ProgressBar({ progress }) {
  return (
    <div className="absolute left-0 top-0 z-20 h-1.5 w-full bg-white/10">
      <div
        className="h-full bg-pink-500 transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
