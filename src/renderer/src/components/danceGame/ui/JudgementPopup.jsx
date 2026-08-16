import React, { useEffect, useState } from 'react';
import { CONFIG } from '../config';

export function JudgementPopup({ judgement }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!judgement) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), CONFIG.JUDGEMENT_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [judgement]);

  if (!judgement || !visible) return null;

  const colorClass =
    judgement.text === 'Perfect!' ? 'text-green-400' :
    judgement.text === 'Good' ? 'text-yellow-300' :
    'text-red-400';

  return (
    <div
      key={judgement.key}
      className={`pointer-events-none absolute left-1/2 top-1/3 z-30 -translate-x-1/2 text-5xl font-extrabold drop-shadow-lg animate-bounce ${colorClass}`}
    >
      {judgement.text}
    </div>
  );
}
