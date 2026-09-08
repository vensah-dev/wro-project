import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SerialControlPanel from './components/shared/SerialControlPanel';
import { useState } from 'react';
import { useSerialContext } from './components/hooks/SerialContext';
import {SubMenuFooter} from './main-menu';
import { grade } from "./components/scoring";

export default function LeaderboardScreen({ onExit }) {
  const serial = useSerialContext();

    const [highScores, setHighScores] = useState(() => {
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

  const gradeColors = [
    {
      grade: "S",
      colour: "bg-yellow-500"
    },
    {
      grade: "SS",
      colour: "bg-yellow-500"
    },
    {
      grade: "SSS",
      colour: "bg-yellow-500"
    },
    {
      grade: "BRO THATS LOWER THAN WHAT I GOT FOR PHYSICS!",
      colour: "bg-orange-900"
    },
    {
      grade: "Touch Grass PLS",
      colour: "bg-purple-500"
    },

  ]

  return (
    <div className="relative flex h-screen w-full px-16 flex-col items-center justify-center gap-6 bg-gray-50 pt-24">

      {/* High Scores Container */}
      <div className="z-20 flex w-full max-w-lg flex-col gap-3 rounded-lg bg-gray-200/75 p-6 text-black shadow-sm max-h-[80%] ">
        <h2 className="text-2xl font-bold text-center border-b border-gray-300 pb-3">Leaderboard</h2>

        {highScores.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No high scores recorded yet!</p>
        ) : (
          <div className="flex flex-col gap-2 h-full overflow-y-scroll pr-1">
            {highScores.map((entry, index) => (
              
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-white px-4 py-4 shadow-xs h-full"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400 w-6">#{index + 1}</span>
                  <span className="font-semibold text-gray-800">
                    {entry.name || 'Anonymous'}
                  </span>
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <div className="text-xl font-extrabold text-pink-400 w-27 text-right">
                    {entry.score.toLocaleString()} pts
                  </div>

                  <div className={`w-19 h-19 p-4 rounded-sm items-center justify-center flex ${grade(entry.score).length <= 1 ? "bg-pink-500" : gradeColors.find((x) => x.grade === grade(entry.score)).colour }`}>
                    <div className="text-2xl text-center text-white font-extrabold ">{grade(entry.score).length <= 3 ? grade(entry.score) : entry.score < 6 ? "P" : "W"}</div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <SubMenuFooter menuName="Leaderboard" onExit={onExit} />

    </div>
  );
}