import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================
// HOOK: mode-agnostic Web Serial connection manager
// ============================================================
// Owns the navigator.serial port lifecycle (request/open/close) and a
// write stream for sending lines out to the device. Any line the device
// sends back is console.log()-ed directly (no UI reads it), and any
// connection/write error is console.log()-ed too. Knows nothing about
// poses, moves, or angles — that's layered on top by callers (e.g.
// useCompetePuppetSync), same split as usePoseLandmarks vs.
// useCompetePosePipeline.

const BAUD_RATE = 115200;

export function useWebSerial() {
  const [status, setStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  const portRef = useRef(null);
  const writerRef = useRef(null);
  const keepReadingRef = useRef(false);

  const isSupported = typeof navigator !== 'undefined' && !!navigator.serial;

  // Reads whatever the ESP32 prints back over serial and logs each line.
  const readLoop = useCallback(async (readable) => {
    const textDecoder = new TextDecoderStream();
    const streamClosed = readable.pipeTo(textDecoder.writable).catch(() => {});
    const reader = textDecoder.readable.getReader();
    let buffer = '';
    keepReadingRef.current = true;
    try {
      while (keepReadingRef.current) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          if (line) console.log('[ESP32]', line);
        }
      }
    } catch (err) {
      console.log('[ESP32 read error]', err.message);
    } finally {
      reader.releaseLock();
      await streamClosed;
    }
  }, []);

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false;
    try {
      if (writerRef.current) {
        await writerRef.current.close().catch(() => {});
        writerRef.current = null;
      }
      if (portRef.current) {
        await portRef.current.close().catch(() => {});
        portRef.current = null;
      }
    } finally {
      setStatus('disconnected');
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isSupported) {
      const msg = 'Web Serial API is not available in this browser.';
      console.log('[ESP32 connect error]', msg);
      setErrorMessage(msg);
      setStatus('error');
      return;
    }
    try {
      setStatus('connecting');
      setErrorMessage(null);

      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: BAUD_RATE });
      portRef.current = port;

      const textEncoder = new TextEncoderStream();
      textEncoder.readable.pipeTo(port.writable).catch(() => {});
      writerRef.current = textEncoder.writable.getWriter();

      port.addEventListener('disconnect', () => {
        console.log('[ESP32] device disconnected');
        disconnect();
      });

      readLoop(port.readable);

      setStatus('connected');
    } catch (err) {
      // e.g. user dismissed the port picker, or the port failed to open
      const msg = err.message || 'Failed to connect to serial device.';
      console.log('[ESP32 connect error]', msg);
      setErrorMessage(msg);
      setStatus('error');
    }
  }, [isSupported, readLoop, disconnect]);

  const sendLine = useCallback(async (line) => {
    if (!writerRef.current) return false;
    try {
      await writerRef.current.write(line);
      return true;
    } catch (err) {
      console.log('[ESP32 write error]', err.message);
      return false;
    }
  }, []);

  // make sure the port gets released if the provider unmounts mid-session
  useEffect(() => () => { disconnect(); }, [disconnect]);

  return { isSupported, status, errorMessage, connect, disconnect, sendLine };
}