import React from 'react';

export default function WebcamFeed({ videoRef, canvasRef }) {
  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full -scale-x-100 rounded-lg"
      />
    </div>
  );
}
