import React, { useState, useEffect, useRef, useMemo } from 'react';
import { calculateAccuracy } from '../scoring';

const NAME_POOL = [
  'GrooveMaster', 'PixelDancer', 'RhythmKing', 'DiscoQueen', 
  'NeonStepper', 'BeatDropper', 'FunkyFresh', 'VibeCheck', 
  'ShadowStep', 'StarJumper', 'TurboTwist', 'SolarFlare', 
  'SonicGlide', 'ElectricSlide', 'CosmicBounce', 'HyperStep'
];

const CONFETTI_COLORS = ['#f472b6', '#facc15', '#4ade80', '#38bdf8', '#fb923c', '#a78bfa', '#ffffff'];

function makeFallingConfetti(count) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.6 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 160,
      spin: 360 + Math.random() * 720,
      size: 6 + Math.random() * 10,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.5 ? '50%' : '2px',
    });
  }
  return pieces;
}

export default function EndScreen({ score, windowResults, onRestart, onBack, highScore, setHighScore }) {
  const { grade, avgAccuracy } = calculateAccuracy(windowResults, score);
  const [assignedName, setAssignedName] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const hasSavedRef = useRef(false);

  const confetti = useMemo(() => makeFallingConfetti(140), []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Save every completed run — not just new high scores — under a random name.
  useEffect(() => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true; // Prevent duplicate saves

    const list = Array.isArray(highScore) ? highScore : [];

    // Determine "new high score" status up front, before we add this entry.
    const currentTopScore = list.length > 0 ? Math.max(...list.map((item) => item.score)) : 0;
    setIsNewHighScore(score > currentTopScore);

    const takenNames = new Set(list.map((entry) => entry.name));
    const available = NAME_POOL.filter((name) => !takenNames.has(name));

    // Select random available name or fallback to a numbered tag
    const chosenName = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : `Dancer #${Math.floor(1000 + Math.random() * 9000)}`;

    setAssignedName(chosenName);

    const newEntry = { name: chosenName, score };
    const updatedHighScores = [...list, newEntry].sort((a, b) => b.score - a.score);

    setHighScore(updatedHighScores);
    // Intentionally run once on mount only — highScore/setHighScore are stable
    // enough for this purpose and we don't want re-saves on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/80 overflow-hidden">
      <style>{`
        @keyframes end-confetti-fall {
          0% {
            transform: translate(0, -10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--drift), 110vh) rotate(var(--spin));
            opacity: 0.9;
          }
        }
        @keyframes end-vignette-pulse {
          0% { opacity: 0; }
          20% { opacity: 1; }
          60% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        .end-confetti-piece {
          position: absolute;
          top: 0;
          animation-name: end-confetti-fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        .end-vignette {
          animation: end-vignette-pulse 4.5s ease-out forwards;
        }
      `}</style>

      {/* Pink vignette flash */}
      <div
        className="pointer-events-none fixed inset-0 z-40 end-vignette"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(236, 72, 153, 0.55) 100%)',
        }}
      />

      {/* Full-screen falling confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {confetti.map((p) => (
            <span
              key={p.id}
              className="end-confetti-piece"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.shape,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--drift': `${p.drift}px`,
                '--spin': `${p.spin}deg`,
              }}
            />
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-300">Dance Complete!</h2>
      <div className="text-6xl font-extrabold text-pink-400 text-center">{grade}</div>
      <div className="text-xl font-bold text-white">{score} points</div>
      <div className="text-sm text-gray-400">{Math.min(Math.round(avgAccuracy * 200), 100)}% average accuracy</div>

      {assignedName && (
        <div className="mt-2 flex flex-col items-center gap-1">
          {isNewHighScore && (
            <div className="text-lg font-bold text-pink-500">New High Score!</div>
          )}
          <div className="text-sm font-semibold text-white">
            Saved automatically as <span className="text-green-400 font-black">{assignedName}</span>
          </div>
        </div>
      )}

      <div className="mt-3 flex gap-3">
        <button
          onClick={onRestart}
          className="rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-pink-400 active:scale-95"
        >
          Dance Again
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-full bg-white/10 px-8 py-3 text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
          >
            Menu
          </button>
        )}
      </div>
    </div>
  );
}