import React, { useEffect, useMemo, useState } from 'react';
import { CONFIG } from '../config';

const CONFETTI_COLORS = ['#facc15', '#4ade80', '#38bdf8', '#f472b6', '#fb923c', '#a78bfa'];

// Confetti now radiates outward in a random direction + distance from the origin
function makeConfetti(count, seed) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 180;
    pieces.push({
      id: `${seed}-${i}`,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      delay: Math.random() * 0.15,
      duration: 0.8 + Math.random() * 0.7,
      spin: 360 + Math.random() * 540,
      size: 8 + Math.random() * 10,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.5 ? '50%' : '2px',
    });
  }
  return pieces;
}

// Random spot within the left half of the screen.
function randomLeftHalfPosition() {
  const left = 8 + Math.random() * 34; // ~8% to 42% from left edge
  const top = 20 + Math.random() * 40; // ~20% to 60% from top edge
  return { left, top };
}

const VIGNETTE_COLOR = {
  perfect: 'rgba(74, 222, 128, 0.55)', // green
  good: 'rgba(250, 204, 21, 0.45)', // yellow
  bad: 'rgba(248, 113, 113, 0.45)', // red
};

export default function JudgementPopup({ judgement }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!judgement) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), CONFIG.JUDGEMENT_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [judgement]);

  const isPerfect = judgement?.text === 'Perfect!';
  const isGood = judgement?.text === 'Good';
  const isBad = judgement && !isPerfect && !isGood;

  const confetti = useMemo(() => {
    if (!judgement) return [];
    if (isPerfect) return makeConfetti(90, judgement.key);
    if (isGood) return makeConfetti(45, judgement.key);
    return [];
  }, [judgement, isPerfect, isGood]);

  const position = useMemo(() => {
    if (!judgement) return { left: 25, top: 33 };
    return randomLeftHalfPosition();
  }, [judgement]);

  if (!judgement || !visible) return null;

  const colorClass = isPerfect ? 'text-green-400' : isGood ? 'text-yellow-300' : 'text-red-400';
  const vignetteColor = isPerfect
    ? VIGNETTE_COLOR.perfect
    : isGood
    ? VIGNETTE_COLOR.good
    : VIGNETTE_COLOR.bad;

  return (
    <>
      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0.6);
            opacity: 0;
          }
        }
        @keyframes judgement-pop {
          0% { transform: scale(0.4); opacity: 0; }
          45% { transform: scale(1.2); opacity: 1; }
          65% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        @keyframes judgement-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(74, 222, 128, 0.7)); }
          50% { filter: drop-shadow(0 0 34px rgba(74, 222, 128, 1)); }
        }
        @keyframes sad-shake {
          0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
          20% { transform: translateX(-8px) translateY(0) rotate(-3deg); }
          40% { transform: translateX(8px) translateY(2px) rotate(3deg); }
          60% { transform: translateX(-6px) translateY(5px) rotate(-2deg); }
          80% { transform: translateX(4px) translateY(10px) rotate(1deg); opacity: 0.7; }
          100% { transform: translateX(0) translateY(22px) rotate(0deg); opacity: 0; }
        }
        @keyframes sad-emoji-spin {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(6px) rotate(200deg) scale(1.15); }
          100% { transform: translateY(26px) rotate(400deg) scale(0.8); opacity: 0; }
        }
        @keyframes explosion-ring {
          0% { transform: scale(0.2); opacity: 1; border-width: 6px; }
          100% { transform: scale(3.2); opacity: 0; border-width: 1px; }
        }
        @keyframes vignette-flash {
          0% { opacity: 0; }
          15% { opacity: 1; }
          100% { opacity: 0; }
        }
        .judgement-perfect {
          animation: judgement-pop 0.45s ease-out, judgement-glow 0.8s ease-in-out infinite 0.45s;
        }
        .judgement-good {
          animation: judgement-pop 0.45s ease-out;
        }
        .judgement-bad {
          animation: sad-shake 0.9s ease-in-out forwards;
        }
        .confetti-piece {
          position: absolute;
          top: 0;
          left: 0;
          animation-name: confetti-burst;
          animation-timing-function: cubic-bezier(0.15, 0.7, 0.3, 1);
          animation-fill-mode: forwards;
        }
        .explosion-ring {
          position: absolute;
          border-style: solid;
          border-color: white;
          border-radius: 9999px;
          animation: explosion-ring 0.6s ease-out forwards;
        }
        .sad-emoji {
          animation: sad-emoji-spin 0.9s ease-in forwards;
        }
      `}</style>

      {/* Full-screen color vignette flash */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(ellipse at ${position.left}% ${position.top}%, transparent 0%, ${vignetteColor} 100%)`,
          animation: 'vignette-flash 0.7s ease-out forwards',
        }}
      />

      <div
        key={judgement.key}
        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ left: `${position.left}%`, top: `${position.top}%` }}
      >
        {/* Confetti layer, radiating outward from center */}
        {confetti.length > 0 && (
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {confetti.map((p) => (
              <span
                key={p.id}
                className="confetti-piece"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: p.shape,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  '--dx': `${p.dx}px`,
                  '--dy': `${p.dy}px`,
                  '--spin': `${p.spin}deg`,
                }}
              />
            ))}
          </div>
        )}

        {/* White explosion ring for Perfect */}
        {isPerfect && (
          <span
            className="explosion-ring"
            style={{ width: 40, height: 40, left: -20, top: -20 }}
          />
        )}

        {/* Extra sparkle ring for Perfect */}
        {isPerfect && (
          <span className="absolute text-6xl select-none animate-ping opacity-70">
            ✨
          </span>
        )}

        <div
          className={`relative text-8xl font-extrabold drop-shadow-lg ${colorClass} ${
            isPerfect ? 'judgement-perfect' : isGood ? 'judgement-good' : 'judgement-bad'
          }`}
        >
          {judgement.text}
          {isBad && (
            <span className="sad-emoji absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl select-none">
              😞
            </span>
          )}
        </div>
      </div>
    </>
  );
}