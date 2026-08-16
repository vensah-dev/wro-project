import React, { useRef, useState } from 'react';
import WebcamFeed from '../shared/WebcamFeed';
import PersonNotVisibleBanner from '../shared/PersonNotVisibleBanner';
import ProgressBar from './ProgressBar';
import ScoreHud from './ScoreHud';
import NextMovePanel from './NextMovePanel';
import JudgementPopup from './JudgementPopup';
import AudioMissingBanner from './AudioMissingBanner';
import StartOverlay from './StartOverlay';
import EndScreen from './EndScreen';
import { useCompeteMode } from './useCompeteMode';

export default function CompeteMode({ song, onExit }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const guideCanvasRef = useRef(null);
  const audioRef = useRef(null);

  const [audioMissing, setAudioMissing] = useState(false);

  const {
    isPlaying, hasEnded, progress, start, handleEnded,
    isPersonVisible, expectedMove, nextMove,
    score, combo, judgement, windowResults,
  } = useCompeteMode({ song, videoRef, canvasRef, guideCanvasRef, audioRef });

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gary-50">
      <WebcamFeed videoRef={videoRef} canvasRef={canvasRef} />

      <audio
        ref={audioRef}
        src={song.audioSrc}
        preload="auto"
        onEnded={handleEnded}
        onError={() => setAudioMissing(true)}
      />

      {isPlaying && (
        <>
          <ProgressBar progress={progress} />
          <ScoreHud score={score} combo={combo} />
          <div className="h-dvh aspect-[9/16]">
              <NextMovePanel guideCanvasRef={guideCanvasRef} expectedMove={expectedMove} nextMove={nextMove} />
          </div>
          <JudgementPopup judgement={judgement} />
          <PersonNotVisibleBanner isPersonVisible={isPersonVisible} isPlaying={isPlaying} />
        </>
      )}

      <AudioMissingBanner visible={audioMissing} audioSrc={song.audioSrc} />

      {!isPlaying && !hasEnded && <StartOverlay title={song.title} onStart={start} onBack={onExit} />}
      {hasEnded && <EndScreen score={score} windowResults={windowResults} onRestart={start} onBack={onExit} />}
    </div>
  );
}