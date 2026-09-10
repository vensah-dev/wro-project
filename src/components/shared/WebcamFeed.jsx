import React from 'react';
const viewWidth = window.innerWidth
const viewHeight = window.innerHeight


export default function WebcamFeed({ videoRef, canvasRef, cameraRotation }) {
  return (
<div className="relative h-full w-full" style={{ transform: `rotate(${cameraRotation || 0}deg)` }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        fill
        className={`absolute inset-0 w-screen h-screen aspect[${viewWidth}/${viewHeight}] -scale-x-100 object-cover`}
      />
      <canvas
        ref={canvasRef}
        width={viewWidth}
        height={viewHeight}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full -scale-x-100 rounded-lg"
      />
    </div>
  );
}
