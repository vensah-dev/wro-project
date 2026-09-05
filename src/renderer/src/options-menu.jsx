import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SerialControlPanel from './components/shared/SerialControlPanel';
import { useState } from 'react';

import { useSerialContext } from './components/hooks/SerialContext';


export default function OptionsMenu({onExit, prMode, setPrMode}) {

  const serial = useSerialContext();
  const [transmissionEnabled, setTransmissionEnabled] = useState(true);

  return(
    <div className="relative flex h-screen w-full px-16 flex-col items-center justify-center gap-6 bg-gray-50 ">

      <SerialControlPanel
        isSupported={serial.isSupported}
        status={serial.status}
        transmissionEnabled={transmissionEnabled}
        onToggleTransmission={setTransmissionEnabled}
        errorMessage={serial.errorMessage}
        onConnect={serial.connect}
        onDisconnect={serial.disconnect}
      />

      <label className="z-20 flex w-full flex-col gap-2 rounded-md bg-gray-200/75 text-black p-4">
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2 text-xs text-black">
            <input
              type="checkbox"
              checked={prMode}
              onChange={(e) => setPrMode(e.target.checked)}
              className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:bg-white checked:border-pink-500/50 checked:border-7 transition-all duration-200"
            />
            PR Mode
          </div>

        </div>
      </label>
      
      <div className="z-20 flex w-full flex-col gap-2 rounded-md bg-gray-200/75 text-black p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-2 text-xs text-black w-full">

            <span>Reset Leaderboard</span>

            <button
              onClick={() => {
                const isConfirmed = window.confirm("Are you sure you want to reset the leaderboard?");
                if (isConfirmed) {
                  localStorage.removeItem("highscore");
                  setHighScore([
                      { name: 'Venkatesh', score: 70 },
                      { name: 'Vincent', score: 40 },
                      { name: 'Yu Fei', score: -20 },
                  ]);
                }
              }}
              className="rounded-md bg-red-500 px-4 py-1 text-xs text-white hover:bg-red-700 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Reset
            </button>

          </div>
        </div>
      </div>

      <div className="flex justify-between w-full h-shrink items-center absolute bottom-0 px-16 py-8">
        <div onClick={onExit} className='relative text-2xl font-semibold text-pink-500/75 hover:text-pink-500/50 w-min active:gap-2 gap-0 flex items-center justify-between transition-all duration-150 ease-in-out'>
          <div className='relative h-14 aspect-square '>
            <MdOutlineKeyboardArrowLeft className='h-full w-full top-0.5 absolute'/>
          </div>
          Menu
        </div>

        <p className="text-3xl font-semibold text-black/75">Options</p>
      </div>

    </div>
  );
}