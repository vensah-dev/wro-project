import React from 'react';

export default function MoveLorePanel({ expectedMove }) {
  // Hide the panel if there's no move, or if both image and funFact are missing
  if (!expectedMove || (!expectedMove.image && !expectedMove.funFact)) return null;

  return (
    <div className="absolute right-6 top-6 z-100 flex w-64 flex-col gap-3 rounded-xl bg-black/55 p-4 shadow-lg backdrop-blur-sm">
      {/* {expectedMove.image && (
        <img
          src={expectedMove.image}
          alt={expectedMove.label || 'Move preview'}
          className="aspect-video w-full rounded-lg object-cover shadow-sm"
        />
      )} */}
      
      {expectedMove.funFact && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-500">
            Lore & History
          </span>
          <p className="text-sm leading-relaxed text-gray-200">
            {expectedMove.funFact}
          </p>
        </div>
      )}
    </div>
  );
}