import React from 'react';
import { SONGS } from './components/songs';
import { useState } from 'react';

export default function MainMenu({ onSelect }) {
  const [selectedSongId, setSelectedSongId] = useState(null);
  return (
    <div className="relative flex h-screen w-screen flex-col items-end justify-center gap-6 bg-gray-50">

      <ul className={`flex w-[75vw] flex-col gap-3 items-end  ${SONGS.length > 10 ? 'justify-start' : 'justify-center'} overflow-y-scroll py-8`}>
        {SONGS.map((song) => (
          <li
            key={song.id}
            className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-l-md px-3 py-6 hover:w-[75vw] transition-all duration-300 ease-in-out hover:text-white ${selectedSongId === song.id ? 'bg-pink-500/75 w-[60vw] text-white' : 'bg-pink-500/25 w-[45vw] text-white/50'}`}
            onClick={() => setSelectedSongId(song.id)}
          >
            <span className="truncate text-xl font-bold">{song.title}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between w-full h-shrink items-center p-8 self-end absolute bottom-0">
        <p className="text-5xl font-bold text-black/75">
          [INSERT GAME NAME]
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => onSelect(selectedSongId, 'learn')}
            className="rounded-md px-8 py-4 text-xl font-semibold text-black transition hover:opacity-50 active:scale-95"
          >
            Learn
          </button>
          <button
            onClick={() => onSelect(selectedSongId, 'compete')}
            className="rounded-md bg-pink-500/75 px-8 py-4 text-xl font-semibold text-white transition hover:bg-pink-500/50 active:scale-95"
          >
            Compete
          </button>
        </div>
      </div>

    </div>
  );
}
