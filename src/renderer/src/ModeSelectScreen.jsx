import React from 'react';
import { SONGS } from './components/songs';

export default function ModeSelectScreen({ onSelect }) {
  return (
    <div className="relative flex h-screen w-screen flex-col gap-6 bg-neutral-900 px-4">
      {/* <h1 className="text-4xl font-extrabold text-white">Dance-Off 🕺</h1>
      <p className="max-w-sm text-center text-sm text-gray-300">
        Hover a song to choose Learn or Compete.
      </p> */}

      <ul className="flex w-full max-w-md flex-col gap-3 items-end">
        {SONGS.map((song) => (
          <li
            key={song.id}
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-white/10 px-5 py-5 transition hover:bg-white/20"
          >
            <span className="truncate text-lg font-bold text-white">{song.title}</span>

            <div
              className="flex shrink-0 translate-x-3 gap-2 opacity-0 transition duration-200
                         group-hover:translate-x-0 group-hover:opacity-100
                         group-focus-within:translate-x-0 group-focus-within:opacity-100"
            >
              <button
                onClick={() => onSelect(song.id, 'learn')}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
              >
                Learn
              </button>
              <button
                onClick={() => onSelect(song.id, 'compete')}
                className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-400 active:scale-95"
              >
                Compete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}