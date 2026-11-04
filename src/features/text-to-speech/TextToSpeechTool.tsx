'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { clampSpeechOptions } from '@/lib/tools/utils';
import { Play, Square, Volume2 } from 'lucide-react';

const SAMPLE_TEXT = 'Welcome to ToolMeow. This text to speech tool uses your browser\'s built-in Web Speech API to convert any text to natural-sounding audio — completely offline and private.';

export const TextToSpeechTool: React.FC = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [lang, setLang] = useState('en-US');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Check support synchronously during render — no setState in effect needed
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const vs = window.speechSynthesis.getVoices();
      if (vs.length) setVoices(vs);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.cancel(); };
  }, [supported]);

  const speak = useCallback(() => {
    if (!window.speechSynthesis || !text.trim()) return;
    window.speechSynthesis.cancel();
    const opts = clampSpeechOptions({ rate, pitch, volume, lang });
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = opts.rate;
    utter.pitch = opts.pitch;
    utter.volume = opts.volume;
    utter.lang = opts.lang;
    if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [text, rate, pitch, volume, lang, voices, voiceIdx]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  if (!supported) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Your browser does not support the Web Speech API. Try Chrome or Edge.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="tts-text">Text to Speak</label>
        <textarea
          id="tts-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
          aria-label="Text to convert to speech"
        />
      </div>

      {voices.length > 0 && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="tts-voice">Voice</label>
          <select
            id="tts-voice"
            value={voiceIdx}
            onChange={(e) => { setVoiceIdx(Number(e.target.value)); setLang(voices[Number(e.target.value)]?.lang || 'en-US'); }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            {voices.map((v, i) => (
              <option key={i} value={i}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: `Speed: ${rate}x`, min: 0.5, max: 2, step: 0.1, val: rate, set: setRate },
          { label: `Pitch: ${pitch}`, min: 0, max: 2, step: 0.1, val: pitch, set: setPitch },
          { label: `Volume: ${Math.round(volume * 100)}%`, min: 0, max: 1, step: 0.05, val: volume, set: setVolume },
        ].map(({ label, min, max, step, val, set }) => (
          <div key={label} className="space-y-1">
            <label className="text-xs font-medium text-gray-600">{label}</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => set(Number(e.target.value))}
              className="w-full accent-violet-600"
              aria-label={label}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={speak}
          disabled={speaking || !text.trim()}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
          aria-label="Speak"
        >
          {speaking ? <Volume2 className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4" />}
          {speaking ? 'Speaking…' : 'Speak'}
        </button>
        {speaking && (
          <button
            onClick={stop}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Stop speaking"
          >
            <Square className="h-4 w-4" /> Stop
          </button>
        )}
      </div>
    </div>
  );
};
