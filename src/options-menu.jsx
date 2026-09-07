import SerialControlPanel from './components/shared/SerialControlPanel';
import { useState, useCallback } from 'react';

import { useSerialContext } from './components/hooks/SerialContext';
import { SERVO_CHANNELS, formatPoseLine } from './components/puppetAngles';
import {SubMenuFooter} from './main-menu';

const NEUTRAL_ANGLE_DEG = 90;

export default function OptionsMenu({onExit, prMode, setPrMode}) {
  const serial = useSerialContext();
  const [transmissionEnabled, setTransmissionEnabled] = useState(true);

  return(
    <div className="relative flex h-max w-full px-16 flex-col items-center justify-center gap-6 bg-gray-50 pt-24">

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

      <PuppetSettings serial={serial} transmissionEnabled={transmissionEnabled}/>

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

      <SubMenuFooter menuName="Options" onExit={onExit} />

    </div>
  );
}

export function PuppetSettings({serial, transmissionEnabled}) {

  // One angle (0-180) per servo, indexed the same way as SERVO_CHANNELS
  // (0 leftShoulder, 1 rightShoulder, 2 leftElbow, 3 rightElbow, 4 leftHip, 5 rightHip)
  const [jointAngles, setJointAngles] = useState(
    () => SERVO_CHANNELS.map(() => NEUTRAL_ANGLE_DEG)
  );

  const isConnected = serial.isSupported && serial.status === 'connected';

  // Sends the full 6-angle pose line, same wire format puppetAngles.js
  // produces from computeServoAngles() output.
  const sendPose = useCallback((angles) => {
    if (!transmissionEnabled || !isConnected) return;
    serial.sendLine(formatPoseLine(angles));
  }, [serial, transmissionEnabled, isConnected]);

  // Live-updates the slider's own readout while dragging, without
  // spamming the serial line on every pixel of drag.
  const handleAngleDrag = (index, value) => {
    setJointAngles((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Fires once when the user releases a slider (mouse up / touch end) -
  // this is when we actually write to the puppet.
  const handleAngleCommit = (index, value) => {
    setJointAngles((prev) => {
      const next = [...prev];
      next[index] = value;
      sendPose(next);
      return next;
    });
  };

  const handleResetPose = () => {
    const neutral = SERVO_CHANNELS.map(() => NEUTRAL_ANGLE_DEG);
    setJointAngles(neutral);
    sendPose(neutral);
  };
  return (
      <div className="z-20 flex w-full flex-col gap-3 rounded-md bg-gray-200/75 text-black p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-black/60">Puppet Joint Angles</span>
          <button
            onClick={handleResetPose}
            disabled={!isConnected}
            className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white hover:bg-gray-500 active:scale-95 transition-all duration-300 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Reset to Neutral
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {SERVO_CHANNELS.map(({ id, label }) => (
            <div key={id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-black">
                <span>{label}</span>
                <span className="tabular-nums text-black/60">{jointAngles[id]}&deg;</span>
              </div>
              <input
                type="range"
                min={0}
                max={180}
                value={jointAngles[id]}
                onChange={(e) => handleAngleDrag(id, Number(e.target.value))}
                onMouseUp={(e) => handleAngleCommit(id, Number(e.target.value))}
                onTouchEnd={(e) => handleAngleCommit(id, Number(e.target.value))}
                disabled={!isConnected}
                className="w-full accent-pink-500 disabled:opacity-40"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => sendPose(jointAngles)}
          disabled={!isConnected}
          className="rounded-md bg-pink-500 px-4 py-2 text-xs text-white hover:bg-pink-600 active:scale-95 transition-all duration-300 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send Pose
        </button>

        {!isConnected && (
          <span className="text-[11px] text-black/50">Connect to the puppet above to enable controls.</span>
        )}
      </div>
  );
}