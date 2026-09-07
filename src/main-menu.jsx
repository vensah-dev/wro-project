import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SelectMenu from './select-menu';
import OptionsMenu from './options-menu';
import LeaderboardScreen from './leaderboard-screen';

import indian from './assets/menu-screen-bg/pr/indian.jpg';
import chinese from './assets/menu-screen-bg/pr/malay.jpg';
import malay from './assets/menu-screen-bg/pr/chinese.avif';
import idk from './assets/menu-screen-bg/pr/idk.jpg';

import ironInHim from './assets/menu-screen-bg/iron-in-him.png';

import { preloadPoseModel } from './components/hooks/usePoseLandmarks';

const prListOfImages = [indian, chinese, malay, idk];
const listofImages = [ironInHim, ironInHim, ironInHim, ironInHim];

export default function MainMenu() {
    //Pre laoding
    useEffect(() => {
    preloadPoseModel().catch(() => {});
    }, []);

    //Some variables and PR mode and images and shit
    const [prMode, setPrMode] = useState(true);
    const [selected, setSelected] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const activeImages = prMode ? prListOfImages : listofImages;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
        }, 4000); // Changes image every 4 seconds

        return () => clearInterval(interval);
    }, [activeImages.length]);

    const handleExit = () => { setSelected(null); };

    //high score stuff
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('highscore');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Failed to parse highscore:', error);
            }
        }
        return [
            { name: 'Venkatesh', score: 70 },
            { name: 'Vincent', score: 40 },
            { name: 'Yu Fei', score: -20 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('highscore', JSON.stringify(highScore));
    }, [highScore]);

    //button tailwind styels
    const buttonStyle = "rounded-md max-w-xs hover:max-w-sm text-start bg-pink-500/75 px-8 py-4 text-xl font-semibold text-white hover:bg-pink-500/92 active:scale-95 transition-all duration-300 ease-in-out";

    if (selected === 'play') return <SelectMenu onExit={handleExit} highScore={highScore} setHighScore={setHighScore}/>;
    if (selected === 'options') return <OptionsMenu onExit={handleExit} prMode={prMode} setPrMode={setPrMode}/>;
    if (selected === 'highscore') return <LeaderboardScreen onExit={handleExit} />;

    return (
        <div className="relative overflow-hidden w-screen h-screen">
            {/* Render all images and transition their opacity */}
            {activeImages.map((imgSrc, index) => (
                <img
                    key={index}
                    src={imgSrc}
                    alt="bg image"
                    className={`w-screen h-screen object-cover absolute top-0 left-0 -z-10 transition-opacity duration-1000 ease-in-out ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
            
            <div className="absolute inset-0 bg-linear-to-r from-black to-transparent -z-5"/>

            <div className="flex flex-col h-dvh w-dvw px-20 justify-center">
                <p className="text-8xl text-pink-500">Dance <p className="text-5xl inline -translate-x-2">for</p> <p className="text-white">Singapore</p></p>
                <div className="flex flex-col gap-4 py-16">
                    <button onClick={() => setSelected("play")} className={buttonStyle}>
                        Play
                    </button>
                    <button onClick={() => setSelected("options")} className={buttonStyle}>
                        Options
                    </button>
                    <button onClick={() => setSelected("highscore")} className={buttonStyle}>
                        Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export function SubMenuFooter({menuName, onExit}) {
  return (
      <div className="z-60 flex justify-between w-full items-center bottom-0 px-16 py-8 bg-gray-50 sticky">
        <div onClick={onExit} className='relative text-2xl font-semibold text-pink-500/75 hover:text-pink-500/50 w-min active:gap-2 gap-0 flex items-center justify-between transition-all duration-150 ease-in-out'>
          <div className='relative h-14 aspect-square '>
            <MdOutlineKeyboardArrowLeft className='h-full w-full top-0.5 absolute'/>
          </div>
          Menu
        </div>

        <p className="text-3xl font-semibold text-black/75">{menuName}</p>
      </div>
  );
}