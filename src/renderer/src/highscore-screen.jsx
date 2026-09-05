import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SerialControlPanel from './components/shared/SerialControlPanel';
import { useState } from 'react';
import { useSerialContext } from './components/hooks/SerialContext';

export default function HighScoreScreen({ onExit, highScores }) {
  const serial = useSerialContext();
  const [transmissionEnabled, setTransmissionEnabled] = useState(true);

  return (
    <div className="relative flex h-screen w-full px-16 flex-col items-center justify-center gap-6 bg-gray-50">

      {/* High Scores Container */}
      <div className="z-20 flex w-full max-w-lg flex-col gap-3 rounded-lg bg-gray-200/75 p-6 text-black shadow-sm max-h-[80%]">
        <h2 className="text-2xl font-bold text-center border-b border-gray-300 pb-3">Leaderboard</h2>

        {highScores.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No high scores recorded yet!</p>
        ) : (
          <div className="flex flex-col gap-2 h-full overflow-y-scroll pr-1">
            {highScores.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-xs h-full"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400 w-6">#{index + 1}</span>
                  <span className="font-semibold text-gray-800">
                    {entry.name || 'Anonymous'}
                  </span>
                </div>
                <span className="text-xl font-extrabold text-pink-500">
                  {entry.score.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between w-full h-shrink items-center absolute bottom-0 px-16 py-8">
        <div
          onClick={onExit}
          className="relative text-2xl font-semibold text-pink-500/75 hover:text-pink-500/50 w-min active:gap-2 gap-0 flex items-center justify-between transition-all duration-150 ease-in-out cursor-pointer"
        >
          <div className="relative h-14 aspect-square">
            <MdOutlineKeyboardArrowLeft className="h-full w-full top-0.5 absolute" />
          </div>
          Menu
        </div>

        <p className="text-3xl font-semibold text-black/75">High Scores</p>
      </div>

    </div>
  );
}