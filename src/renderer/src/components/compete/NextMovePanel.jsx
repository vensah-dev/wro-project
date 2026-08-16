import React from 'react';
const viewWidth = window.innerWidth
const viewHeight = window.innerHeight

console.log(`Viewport: ${viewWidth}x${viewHeight}`)

export default function NextMovePanel({ guideCanvasRef, expectedMove, nextMove }) {
  if (!expectedMove) return null;
  return (
    <div className="z-20 flex flex-col items-center gap-1.5 bg-gray-50 h-screen aspect-[9/16] justify-center">
      <canvas ref={guideCanvasRef} width={viewHeight*9/16} height={viewHeight*0.8} />
      <span className="text-center text-xl font-bold text-black/75">{expectedMove.label}</span>
      {nextMove && <span className="text-center text-md text-black/50">Next: {nextMove.label}</span>}
    </div>
  );
}
