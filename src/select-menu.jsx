import React, { useState } from 'react';
import CompeteMode from './components/compete/CompeteMode';
import LearnMode from './components/learn/LearnMode';
import { getSongById } from './components/songs';
import { SONGS } from './components/songs';

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import indian from './assets/select-screen-bg/indian.jpg';
import malay from './assets/select-screen-bg/malay.jpg';
import chinese from './assets/select-screen-bg/chinese.avif';
import lionDance from './assets/select-screen-bg/lion-dance.jpg';

const listOfImages = [indian, chinese, malay, lionDance];


export default function SelectMenu({onExit, highScore, setHighScore, cameraRotation}) {

  const [selectedSong, setSelectedSong] = useState(SONGS[0].id);
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExit = () => {setSelectedMode(null);};
  var song = selectedSong ? getSongById(selectedSong) : null;

  if (selectedMode === 'learn' && song) return <LearnMode song={getSongById(selectedSong)} onExit={handleExit}/>;
  if (selectedMode === 'compete' && song) return <CompeteMode song={getSongById(selectedSong)} onExit={handleExit} highScore={highScore} setHighScore={setHighScore} cameraRotation={cameraRotation} />;

  return(
    <div className="relative flex h-screen w-screen flex-col items-end justify-center gap-6 ">
      {listOfImages.map((imgSrc, index) => (
          <img
              key={index}
              src={imgSrc}
              alt="bg image"
              className={`w-screen h-screen object-cover absolute top-0 left-0 -z-10 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
          />
      ))}
      <div className="absolute inset-0 bg-linear-to-l from-black to-transparent -z-5"/>

      <ul className={`flex w-[80vw] flex-col gap-3 items-end  ${SONGS.length > 10 ? 'justify-start' : 'justify-center'} overflow-y-scroll py-8`}>
        {SONGS.map((song, index) => (
          <li
            key={index}
            className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-l-md px-3 py-6 hover:w-[75vw] transition-all duration-300 ease-in-out hover:text-white ${selectedSong === song.id ? 'bg-pink-500/75 w-[60vw] text-white' : 'bg-pink-500/25 w-[45vw] text-white/50 hover:bg-pink-500/60'}`}
            onClick={() => {setSelectedSong(song.id); setCurrentImageIndex(index);}}
          >
            <span className="truncate text-xl font-bold">{song.title}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between w-full h-shrink items-centerself-end absolute bottom-0 px-16 py-8 bg-gray-50">
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