import React, { useState, useEffect } from 'react';
import CompeteMode from './components/compete/CompeteMode';
import LearnMode from './components/learn/LearnMode';
import { getSongById } from './components/songs';
import { SONGS } from './components/songs';
import SelectMenu from './select-menu';
import OptionsMenu from './options-menu';
import HighScoreScreen from './highscore-screen';

import indian from './assets/menu-screen-bg/pr/indian.jpg';
import chinese from './assets/menu-screen-bg/pr/malay.jpg';
import malay from './assets/menu-screen-bg/pr/chinese.avif';
import idk from './assets/menu-screen-bg/pr/idk.jpg';

import ironInHim from './assets/menu-screen-bg/iron-in-him.png';

const prListOfImages = [indian, chinese, malay, idk];
const listofImages = [ironInHim, ironInHim, ironInHim, ironInHim];

export default function MainMenu() {
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

    const buttonStyle = "rounded-md max-w-xs hover:max-w-sm text-start bg-pink-500/75 px-8 py-4 text-xl font-semibold text-white hover:bg-pink-500/92 active:scale-95 transition-all duration-300 ease-in-out";

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

    if (selected === 'play') return <SelectMenu onExit={handleExit} highScore={highScore} setHighScore={setHighScore}/>;
    if (selected === 'options') return <OptionsMenu onExit={handleExit} prMode={prMode} setPrMode={setPrMode}/>;
    if (selected === 'highscore') return <HighScoreScreen onExit={handleExit} highScores={highScore} />;

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
                        High Score
                    </button>
                </div>
            </div>
        </div>
    );
}