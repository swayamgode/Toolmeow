'use client';

import React, { useState } from 'react';
import { calcAspectRatio } from '@/lib/tools/utils';

export const AspectRatioCalculatorTool: React.FC = () => {
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [targetWidth, setTargetWidth] = useState('');
  const [targetHeight, setTargetHeight] = useState('');

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const tw = parseFloat(targetWidth) || 0;
  const th = parseFloat(targetHeight) || 0;

  const result = calcAspectRatio(w, h, tw || undefined, th || undefined);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="ar-width">Width (px)</label>
          <input
            id="ar-width"
            type="number"
            min="1"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="ar-height">Height (px)</label>
          <input
            id="ar-height"
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>
      </div>

      {w > 0 && h > 0 && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center">
          <div className="text-3xl font-bold text-violet-700" aria-live="polite">{result.ratio}</div>
          <div className="text-sm text-gray-500 mt-1">Aspect Ratio</div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Scale to new dimensions</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="target-w">Target Width</label>
            <input
              id="target-w"
              type="number"
              min="1"
              value={targetWidth}
              onChange={(e) => { setTargetWidth(e.target.value); setTargetHeight(''); }}
              placeholder="e.g. 1280"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="target-h">Target Height</label>
            <input
              id="target-h"
              type="number"
              min="1"
              value={targetHeight}
              onChange={(e) => { setTargetHeight(e.target.value); setTargetWidth(''); }}
              placeholder="e.g. 720"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
        </div>

        {(result.newWidth !== undefined || result.newHeight !== undefined) && (
          <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800" aria-live="polite">
            Scaled size: <strong>{result.newWidth ?? tw} × {result.newHeight ?? th}</strong> px
          </div>
        )}
      </div>
    </div>
  );
};

