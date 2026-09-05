import React from 'react';

export default function AudioMissingBanner({ visible, audioSrc }) {
  if (!visible) return null;
  return (
    <div className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2 rounded-lg bg-red-900/80 px-4 py-2 text-xs text-white">
      Couldn't load the song file — add your own audio at {audioSrc}.
    </div>
  );
}