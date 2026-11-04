'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

function formatTime(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

export const StopwatchTimerTool: React.FC = () => {
  const [mode, setMode] = useState<'stopwatch' | 'countdown'>('stopwatch');
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [countdownInput, setCountdownInput] = useState('60');
  const [countdownMs, setCountdownMs] = useState(60000);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const countdownMsRef = useRef(60000);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const tickRef = useRef<() => void>(() => {});

  const tick = useCallback(() => {
    if (startRef.current === null) return;
    const now = Date.now();
    const delta = now - startRef.current + baseRef.current;

    if (modeRef.current === 'countdown' && delta >= countdownMsRef.current) {
      setElapsed(countdownMsRef.current);
      setRunning(false);
      startRef.current = null;
      baseRef.current = countdownMsRef.current;
      return;
    }

    setElapsed(delta);
    rafRef.current = requestAnimationFrame(() => tickRef.current());
  }, []);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const start = useCallback(() => {
    if (mode === 'countdown') {
      const secs = parseInt(countdownInput) || 60;
      const ms = secs * 1000;
      setCountdownMs(ms);
      countdownMsRef.current = ms;
      baseRef.current = 0;
    }
    startRef.current = Date.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(() => tickRef.current());
  }, [mode, countdownInput]);

  const pause = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    baseRef.current = elapsed;
    startRef.current = null;
    setRunning(false);
  }, [elapsed]);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    baseRef.current = 0;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    setLaps((prev) => [...prev, elapsed]);
  }, [elapsed]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const remaining = Math.max(0, countdownMs - elapsed);
  const display = mode === 'stopwatch' ? elapsed : remaining;
  const countdownDone = mode === 'countdown' && remaining === 0 && elapsed > 0;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['stopwatch', 'countdown'] as const).map((m) => (
          <button key={m} onClick={() => { reset(); setMode(m); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {m === 'stopwatch' ? '⏱ Stopwatch' : '⏳ Countdown'}
          </button>
        ))}
      </div>

      {mode === 'countdown' && !running && elapsed === 0 && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="countdown-secs">Duration (seconds)</label>
          <input id="countdown-secs" type="number" min="1" max="86400" value={countdownInput}
            onChange={(e) => setCountdownInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
      )}

      <div className={`rounded-xl border p-8 text-center ${countdownDone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`} aria-live="polite">
        <div className={`font-mono text-6xl font-bold tabular-nums tracking-tight ${countdownDone ? 'text-red-600' : 'text-violet-700'}`}>
          {formatTime(display)}
        </div>
        {countdownDone && <div className="mt-2 text-sm font-medium text-red-600">Time&apos;s up!</div>}
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        {!running ? (
          <button onClick={start} disabled={countdownDone}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors">
            <Play className="h-4 w-4" /> Start
          </button>
        ) : (
          <button onClick={pause}
            className="flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-yellow-600 transition-colors">
            <Pause className="h-4 w-4" /> Pause
          </button>
        )}
        {mode === 'stopwatch' && running && (
          <button onClick={lap}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Flag className="h-4 w-4" /> Lap
          </button>
        )}
        <button onClick={reset}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">Laps</div>
          {laps.map((t, i) => (
            <div key={i} className="flex justify-between border-t border-gray-100 px-4 py-2 text-sm">
              <span className="text-gray-500">Lap {i + 1}</span>
              <span className="font-mono font-medium text-violet-700">{formatTime(t)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

