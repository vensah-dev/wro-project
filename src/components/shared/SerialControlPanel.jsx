import React from 'react';
import { SERVO_CHANNELS } from '../puppetAngles';

const STATUS_COLOR = {
  connected: '#22ff55',
  connecting: '#ffac3f',
  disconnected: '#d6d6d6',
  error: '#9c33ff',
};

const STATUS_LABEL = {
  connected: 'Connected',
  connecting: 'Connecting…',
  disconnected: 'Disconnected',
  error: 'Error',
};

export default function SerialControlPanel({
  isSupported,
  status,
  errorMessage,
  transmissionEnabled,
  onToggleTransmission,
  onConnect,
  onDisconnect,
}) {
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  return (
    <div className="z-20 flex w-full flex-col gap-2 rounded-md bg-gray-200/75 text-black p-4">
      <div className="flex flex-col items-start gap-3 pb-6">
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full items-center"
            style={{ backgroundColor: STATUS_COLOR[status] || STATUS_COLOR.disconnected }}
          />
          <span className="text-xl font-semibold items-center pb-0.5">{STATUS_LABEL[status] || status}</span>
        </div>

        {isConnected ? (
          <button
            onClick={onDisconnect}
            className="rounded-md bg-red-500 px-4 py-1 text-xs text-white hover:bg-red-700 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            disabled={!isSupported || isConnecting}
            className="rounded-md bg-green-500 px-4 py-1 text-xs text-white hover:bg-green-700 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Connect
          </button>
        )}
      </div>

      {!isSupported && (
        <span className="text-xs text-red-500">
          Web Serial isn't available in this browser.
        </span>
      )}
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}

      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          checked={transmissionEnabled}
          onChange={(e) => onToggleTransmission(e.target.checked)}
          disabled={!isConnected}
          className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full disabled:bg-gray-200 disabled:border-gray-300 checked:bg-white checked:border-pink-500/50 checked:border-7 transition-all duration-200"

        />
        Send live angles to puppet
      </label>

      {/* <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {SERVO_CHANNELS.map((channel, i) => (
          <div key={channel.name} className="flex items-center justify-between gap-2">
            <span className="text-white/60">{channel.label}</span>
            <span className="font-mono">{angles ? `${angles[i]}°` : '--'}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
