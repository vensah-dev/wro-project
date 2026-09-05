import React, { useState } from 'react';
import CompeteMode from './components/compete/CompeteMode';
import LearnMode from './components/learn/LearnMode';
import { getSongById } from './components/songs';
import { SONGS } from './components/songs';

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


export default function SelectMenu({onExit, highScore, setHighScore}) {

  const [selectedSong, setSelectedSong] = useState(SONGS[0].id);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleExit = () => {setSelectedMode(null);};
  var song = selectedSong ? getSongById(selectedSong) : null;

  if (selectedMode === 'learn' && song) return <LearnMode song={getSongById(selectedSong)} onExit={handleExit}/>;
  if (selectedMode === 'compete' && song) return <CompeteMode song={getSongById(selectedSong)} onExit={handleExit} highScore={highScore} setHighScore={setHighScore} />;

  return(
    <div className="relative flex h-screen w-screen flex-col items-end justify-center gap-6 bg-gray-50">

      <ul className={`flex w-[75vw] flex-col gap-3 items-end  ${SONGS.length > 10 ? 'justify-start' : 'justify-center'} overflow-y-scroll py-8`}>
        {SONGS.map((song) => (
          <li
            key={song.id}
            className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-l-md px-3 py-6 hover:w-[75vw] transition-all duration-300 ease-in-out hover:text-white ${selectedSong === song.id ? 'bg-pink-500/75 w-[60vw] text-white' : 'bg-pink-500/25 w-[45vw] text-white/50 hover:bg-pink-500/60'}`}
            onClick={() => setSelectedSong(song.id)}
          >
            <span className="truncate text-xl font-bold">{song.title}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between w-full h-shrink items-centerself-end absolute bottom-0 px-16 py-8">
        <div onClick={onExit} className='relative text-2xl font-semibold text-pink-500/75 hover:text-pink-500/50 w-min active:gap-2 gap-0 flex items-center justify-between transition-all duration-150 ease-in-out'>
          <div className='relative h-14 aspect-square '>
            <MdOutlineKeyboardArrowLeft className='h-full w-full top-0.5 absolute'/>
          </div>
          Menu
        </div>


        <div className="flex gap-4">
          <button
            onClick={() => setSelectedMode('learn')}
            className="rounded-md px-8 py-4 text-xl font-semibold text-black transition hover:opacity-50 active:scale-95"
          >
            Learn
          </button>
          <button
            onClick={() => setSelectedMode('compete')}
            className="rounded-md bg-pink-500/75 px-8 py-4 text-xl font-semibold text-white transition hover:bg-pink-500/50 active:scale-95"
          >
            Compete
          </button>
        </div>
      </div>

    </div>
  );
}