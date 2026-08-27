import React, { useState } from 'react';
import CompeteMode from './components/compete/CompeteMode';
import LearnMode from './components/learn/LearnMode';
import { getSongById } from './components/songs';
import { SONGS } from './components/songs';
import SelectMenu from './select-menu';
import OptionsMenu from './options-menu';

import indian from './assets/menu-screen-bg/pr/indian.jpg'
import chinese from './assets/menu-screen-bg/pr/malay.jpg'
import malay from './assets/menu-screen-bg/pr/chinese.avif'
import idk from './assets/menu-screen-bg/pr/idk.jpg'

const prListOfImages = [indian, chinese, malay, idk]

import ironInHim from './assets/menu-screen-bg/iron-in-him.png'
// import chinese from './assets/menu-screen-bg/pr/malay.jpg'
// import malay from './assets/menu-screen-bg/pr/chinese.avif'
// import idk from './assets/menu-screen-bg/pr/idk.jpg'

const listofImages = [ironInHim, ironInHim, ironInHim, ironInHim]

export default function MainMenu() {
    const [selected, setSelected] = useState(null);

    const handleExit = () => {setSelected(null);};

    const buttonStyle = "rounded-md max-w-xs hover:max-w-sm text-start bg-pink-500/75 px-8 py-4 text-xl font-semibold text-white hover:bg-pink-500/92 active:scale-95 transition-all duration-300 ease-in-out";

    if (selected === 'play') return <SelectMenu onExit={handleExit}/>;
    if (selected === 'options') return <OptionsMenu onExit={handleExit}/>;

    return(
    <div className="">
        <img
        src={listofImages[Math.floor(Math.random() * 4)]}
        alt="bg image"
        className='w-screen h-screen object-cover absolute -z-10'
        
        />

        <div className="flex flex-col h-dvh w-dvw px-8 justify-center">
            <p className="text-8xl text-white">Game Name</p>
            <div className="flex flex-col flex-shrink gap-4 py-16 pl-12">
                <button
                onClick={() => setSelected("play")}
                className={buttonStyle}
                >
                Play
                </button>
                <button
                onClick={() => setSelected("options")}
                className={buttonStyle}
                >
                Options
                </button>
                <button
                onClick={() => window.api.quitApp()}
                className={buttonStyle}
                >
                Quit
                </button>
            </div>
        </div>
    </div>
    );
}