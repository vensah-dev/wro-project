import React, { useRef, useState } from 'react';
import WebcamFeed from '../shared/WebcamFeed';
import PersonNotVisibleBanner from '../shared/PersonNotVisibleBanner';
import GuidePanel from './GuidePanel';
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

      <GuidePanel expectedMove={expectedMove} seqIndex={seqIndex} total={total} />
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
