import React, { useRef, useState } from 'react';
import {
  AUDIO_SRC,
  useCompeteMode,
  WebcamFeed,
  ProgressBar,
  ScoreHud,
  NextMovePanel,
  JudgementPopup,
  PersonNotVisibleBanner,
  AudioMissingBanner,
  StartOverlay,
  EndScreen,
} from './components/danceGame';

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CompeteMode() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const guideCanvasRef = useRef(null);
  const audioRef = useRef(null);

  const [audioMissing, setAudioMissing] = useState(false);

  const {
    isPlaying, hasEnded, progress, start, handleEnded,
    isPersonVisible, expectedMove, nextMove,
    score, combo, judgement, windowResults,
  } = useCompeteMode({ videoRef, canvasRef, guideCanvasRef, audioRef });

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-900">
      <WebcamFeed videoRef={videoRef} canvasRef={canvasRef} />

      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        onEnded={handleEnded}
        onError={() => setAudioMissing(true)}
      />

      {isPlaying && (
        <>
          <ProgressBar progress={progress} />
          <ScoreHud score={score} combo={combo} />
          <NextMovePanel guideCanvasRef={guideCanvasRef} expectedMove={expectedMove} nextMove={nextMove} />
          <JudgementPopup judgement={judgement} />
          <PersonNotVisibleBanner isPersonVisible={isPersonVisible} isPlaying={isPlaying} />
        </>
      )}

      <AudioMissingBanner visible={audioMissing} />

      {!isPlaying && !hasEnded && <StartOverlay onStart={start} />}
      {hasEnded && <EndScreen score={score} windowResults={windowResults} onRestart={start} />}
    </div>
  );
}
