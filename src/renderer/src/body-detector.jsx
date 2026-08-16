import React, { useState } from 'react';
import MainMenu from './main-menu';
import CompeteMode from './components/compete/CompeteMode';
import LearnMode from './components/learn/LearnMode';
import { getSongById } from './components/songs';

export default function BodyDetector() {
  const [selection, setSelection] = useState(null); // null | { songId, mode: 'learn' | 'compete' }

  const handleExit = () => setSelection(null);
  const handleSelect = (songId, mode) => setSelection({ songId, mode });
  var song = selection ? getSongById(selection.songId) : null;

  if (selection?.mode === 'learn' && song) return <LearnMode song={getSongById(selection.songId)} onExit={handleExit} />;
  if (selection?.mode === 'compete' && song) return <CompeteMode song={getSongById(selection.songId)} onExit={handleExit} />;
  return <MainMenu onSelect={handleSelect} />;
}