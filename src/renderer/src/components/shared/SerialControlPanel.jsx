import React from 'react';
import { SERVO_CHANNELS } from '../puppetAngles';

const STATUS_COLOR = {
  connected: '#22ff55',
  connecting: '#ffd23f',
  disconnected: '#888888',
  error: '#ff3333',
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
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: STATUS_COLOR[status] || STATUS_COLOR.disconnected }}
          />
          <span className="text-sm font-semibold">{STATUS_LABEL[status] || status}</span>
        </div>

        {isConnected ? (
          <button
            onClick={onDisconnect}
            className="rounded bg-red-400 px-3 py-1 text-xs font-semibold hover:bg-red-400/75"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            disabled={!isSupported || isConnecting}
            className="rounded bg-blue-400 px-3 py-1 text-xs font-semibold hover:bg-blue-400/75 disabled:opacity-50"
          >
            Connect
          </button>
        )}
      </div>

      {!isSupported && (
        <span className="text-xs text-red-400">
          Web Serial isn't available in this browser.
        </span>
      )}
      {errorMessage && <span className="text-xs text-red-400">{errorMessage}</span>}

      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          checked={transmissionEnabled}
          onChange={(e) => onToggleTransmission(e.target.checked)}
          disabled={!isConnected}
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
