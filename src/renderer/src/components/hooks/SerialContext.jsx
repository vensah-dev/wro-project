import React, { createContext, useContext } from 'react';
import { useWebSerial } from './useWebSerial';

const SerialContext = createContext(null);

// Wraps the app so the ESP32 connection survives navigating between the
// main menu, song select, and Compete mode. Web Serial only lets you
// request/open a port from a user gesture, so we connect once from the
// main menu and every mode downstream (e.g. Compete mode's puppet sync)
// just reuses this same connection via useSerialContext().
export function SerialProvider({ children }) {
  const serial = useWebSerial();
  return <SerialContext.Provider value={serial}>{children}</SerialContext.Provider>;
}

export function useSerialContext() {
  const ctx = useContext(SerialContext);
  if (!ctx) {
    throw new Error('useSerialContext must be used within a <SerialProvider>.');
  }
  return ctx;
}
