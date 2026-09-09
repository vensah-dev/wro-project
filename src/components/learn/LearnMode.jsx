import React, { useRef, useState } from 'react';
import WebcamFeed from '../shared/WebcamFeed';
import PersonNotVisibleBanner from '../shared/PersonNotVisibleBanner';
import GuidePanel from './GuidePanel';
import MoveLorePanel from './MoveLorePanel'; // <-- 1. Import the new panel
import PoseStatusLabel from './PoseStatusLabel';
import LearnControls from './LearnControls';
import LearnCompleteScreen from './LearnCompleteScreen';
import { useLearnMode } from './useLearnMode';

export default function LearnMode({ song, onExit }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  const {
    expectedMove, seqIndex, total, isFirst, isLast,
    isPersonVisible, limbFeedback, genericHint, suggestNext,
    next, prev, restart,
    poseStatus, poseError 
  } = useLearnMode({ song, videoRef, canvasRef });

  const handleNext = () => {
    if (isLast) setIsComplete(true);
    else next();
  };

  const handleRestart = () => {
    restart();
    setIsComplete(false);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-900">
      <WebcamFeed videoRef={videoRef} canvasRef={canvasRef} />

      {poseStatus === 'loading' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/80 text-white">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
          <p className="text-xl">Getting the camera ready…</p>
        </div>
      )}

      {poseStatus === 'error' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 px-8 text-center text-white">
          <p className="text-xl text-pink-500">Couldn't start the camera</p>
          <p className="text-sm text-white/70">
            Check that camera permission is granted and no ad blocker is
            interfering, then try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-pink-500/75 px-6 py-2 transition-all hover:bg-pink-500/92"
          >
            Retry
          </button>
        </div>
      )}
      
      <GuidePanel expectedMove={expectedMove} seqIndex={seqIndex} total={total} />
      
      {/* 2. Add the lore panel right here */}
      <MoveLorePanel expectedMove={expectedMove} />

      <PoseStatusLabel limbFeedback={limbFeedback} genericHint={genericHint} isPersonVisible={isPersonVisible} />
      <PersonNotVisibleBanner isPersonVisible={isPersonVisible} isPlaying />
      <LearnControls
        isFirst={isFirst}
        isLast={isLast}
        suggestNext={suggestNext}
        onNext={handleNext}
        onPrev={prev}
        onExit={onExit}
      />

      {isComplete && <LearnCompleteScreen onRestart={handleRestart} onExit={onExit} />}
    </div>
  );
}