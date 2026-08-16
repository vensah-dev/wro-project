import React from 'react';

export default function PersonNotVisibleBanner({ isPersonVisible, isPlaying }) {
  if (isPersonVisible || !isPlaying) return null;
  return (
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 text-sm font-semibold text-white">
      Step into frame!
    </div>
  );
}
