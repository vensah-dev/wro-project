import { useEffect, useMemo, useRef } from 'react';
import { computeServoAngles, formatPoseLine } from '../puppetAngles';

// ============================================================
// HOOK: Compete-mode puppet synchronizer
// ============================================================
// Reads the *target* pose of whatever move is currently expected — the
// same pose data that drives the on-screen guide silhouette
// (drawGuideSilhouette) — turns it into the 6 puppet servo angles, and
// streams those to the ESP32 over Web Serial. Throttled to 20-30Hz with
// a change-threshold filter so we don't flood the serial buffer with
// near-identical frames (the target only actually changes when the
// timeline advances to a new move).
const SEND_INTERVAL_MS = 40; // 25Hz, inside the 20-30Hz target range
const CHANGE_THRESHOLD_DEG = 2;

export function useCompetePuppetSync({ expectedMove, sendLine, isConnected, transmissionEnabled }) {
  const angles = useMemo(
    () => computeServoAngles(expectedMove?.target ?? null),
    [expectedMove]
  );

  const anglesRef = useRef(angles);
  useEffect(() => { anglesRef.current = angles; }, [angles]);

  const lastSentRef = useRef(null);

  // force a resend as soon as we (re)connect or transmission is (re)enabled,
  // rather than waiting for the next move change
  useEffect(() => {
    lastSentRef.current = null;
  }, [isConnected, transmissionEnabled]);

  useEffect(() => {
    if (!transmissionEnabled || !isConnected) return undefined;

    const tick = () => {
      const current = anglesRef.current;
      if (!current) return;
      const last = lastSentRef.current;
      const changed = !last || current.some((v, i) => Math.abs(v - last[i]) > CHANGE_THRESHOLD_DEG);
      if (changed) {
        sendLine(formatPoseLine(current));
        lastSentRef.current = current;
      }
    };

    const id = setInterval(tick, SEND_INTERVAL_MS);
    return () => clearInterval(id);
  }, [transmissionEnabled, isConnected, sendLine]);

  return { angles };
}
