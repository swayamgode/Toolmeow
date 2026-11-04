'use client';

import React, { useState, useCallback } from 'react';
import { generateGradientCss, type GradientType, type GradientStop } from '@/lib/tools/utils';
import { CopyButton } from '@/components/feedback/CopyButton';
import { Plus, Trash2 } from 'lucide-react';

export const CssGradientGeneratorTool: React.FC = () => {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#6d28d9', position: 0 },
    { color: '#ec4899', position: 100 },
  ]);

  const result = generateGradientCss(type, angle, stops);

  const addStop = useCallback(() => {
    setStops((prev) => [...prev, { color: '#f59e0b', position: 50 }]);
  }, []);

  const removeStop = useCallback((idx: number) => {
    setStops((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateStop = useCallback((idx: number, field: keyof GradientStop, value: string | number) => {
    setStops((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }, []);

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div
        className="h-32 w-full rounded-xl border border-gray-200 shadow-inner"
        style={{ background: result.css }}
        aria-label="Gradient preview"
      />

      {/* Type */}
      <div className="flex gap-2 flex-wrap">
        {(['linear', 'radial', 'conic'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              type === t ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Angle */}
      {type !== 'radial' && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Angle: {angle}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-violet-600"
            aria-label="Gradient angle"
          />
        </div>
      )}

      {/* Stops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Color Stops</span>
          <button
            onClick={addStop}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-3 w-3" /> Add Stop
          </button>
        </div>
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, 'color', e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-gray-300"
              aria-label={`Color stop ${i + 1} color`}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={stop.position}
              onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
              className="flex-1 accent-violet-600"
              aria-label={`Color stop ${i + 1} position`}
            />
            <span className="w-10 text-xs text-gray-500">{stop.position}%</span>
            {stops.length > 2 && (
              <button
                onClick={() => removeStop(i)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove stop ${i + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CSS Output */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">CSS Output</span>
          <CopyButton textToCopy={result.preview} label="Copy CSS" />
        </div>
        <pre className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs font-mono text-gray-800 whitespace-pre-wrap break-all">
          {result.preview || 'Configure stops above'}
        </pre>
      </div>
    </div>
  );
};
