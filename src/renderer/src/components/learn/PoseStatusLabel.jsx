import React from 'react';

const LIMB_NAMES = { leftArm: 'Left arm', rightArm: 'Right arm' };

// Per-limb color on the skeleton carries the primary feedback; this label
// is the supplementary text explanation of what to fix (idea 2).
export default function PoseStatusLabel({ limbFeedback, genericHint, isPersonVisible }) {
  if (!isPersonVisible) return null;

  if (genericHint) {
    return (
      <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-xl bg-black/55 px-4 py-2 text-center text-sm font-semibold text-white">
        {genericHint}
      </div>
    );
  }

  const hints = Object.entries(limbFeedback)
    .filter(([, data]) => data.hint)
    .map(([limb, data]) => ({ limb, ...data }));

  if (hints.length === 0) {
    return (
      <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-xl bg-green-900/60 px-4 py-2 text-center text-sm font-bold text-green-300">
        Looking good! 🎉
      </div>
    );
  }

  return (
    <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 rounded-xl bg-black/55 px-4 py-2">
      {hints.map(({ limb, hint }) => (
        <span key={limb} className="text-sm font-semibold text-white">
          {LIMB_NAMES[limb] || limb}: {hint}
        </span>
      ))}
    </div>
  );
}
