'use client';

import React, { useState } from 'react';
import { parseHexColor, rgbToAll, getContrastRatio, type ColorValues } from '@/lib/tools/color';
import { CopyButton } from '@/components/feedback/CopyButton';

export const ColorConverterTool: React.FC = () => {
  const [color, setColor] = useState<ColorValues>(parseHexColor('#4F46E5')!);

  const handleHexChange = (val: string) => {
    const parsed = parseHexColor(val);
    if (parsed) {
      setColor(parsed);
    }
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    const updated = rgbToAll(r, g, b);
    setColor(updated);
  };

  const contrastWithWhite = getContrastRatio(color.rgb, { r: 255, g: 255, b: 255 });
  const contrastWithBlack = getContrastRatio(color.rgb, { r: 0, g: 0, b: 0 });

  return (
    <div className="space-y-6">
      {/* Visual Color Preview */}
      <div className="p-6 rounded-2xl border border-[#E7E7E4] bg-white flex flex-col sm:flex-row items-center gap-6">
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 border-black/10 shadow-inner shrink-0 relative overflow-hidden"
          style={{ backgroundColor: color.hex }}
        >
          <input
            type="color"
            value={color.hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            title="Pick a color"
          />
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">
            Selected Color
          </span>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#0B0B0F]">
              {color.hex}
            </span>
            <CopyButton textToCopy={color.hex} label="Copy HEX" />
          </div>
          <p className="text-xs text-[#5B5B66]">
            Click the color swatch above to open native OS color picker, or input values below.
          </p>
        </div>
      </div>

      {/* Conversion formats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-[#E7E7E4] bg-white space-y-1">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">HEX</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-[#0B0B0F]">{color.hex}</span>
            <CopyButton textToCopy={color.hex} label="Copy" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#E7E7E4] bg-white space-y-1">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">RGB</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0B0B0F]">
              rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
            </span>
            <CopyButton
              textToCopy={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
              label="Copy"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#E7E7E4] bg-white space-y-1">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">HSL</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0B0B0F]">
              hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
            </span>
            <CopyButton
              textToCopy={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
              label="Copy"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#E7E7E4] bg-white space-y-1">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">CMYK</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0B0B0F]">
              {color.cmyk.c}%, {color.cmyk.m}%, {color.cmyk.y}%, {color.cmyk.k}%
            </span>
            <CopyButton
              textToCopy={`cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`}
              label="Copy"
            />
          </div>
        </div>
      </div>

      {/* Sliders for RGB */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          RGB Channel Sliders
        </label>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-[#5B5B66] mb-1">
              <span className="font-semibold text-rose-600">Red (R)</span>
              <span className="font-mono">{color.rgb.r}</span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={color.rgb.r}
              onChange={(e) => handleRgbChange(Number(e.target.value), color.rgb.g, color.rgb.b)}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#5B5B66] mb-1">
              <span className="font-semibold text-emerald-600">Green (G)</span>
              <span className="font-mono">{color.rgb.g}</span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={color.rgb.g}
              onChange={(e) => handleRgbChange(color.rgb.r, Number(e.target.value), color.rgb.b)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#5B5B66] mb-1">
              <span className="font-semibold text-blue-600">Blue (B)</span>
              <span className="font-mono">{color.rgb.b}</span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={color.rgb.b}
              onChange={(e) => handleRgbChange(color.rgb.r, color.rgb.g, Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* WCAG Contrast Ratio */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-3">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          WCAG Accessibility Contrast
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="p-4 rounded-xl text-center font-bold text-sm space-y-1"
            style={{ backgroundColor: color.hex, color: '#FFFFFF' }}
          >
            <span>White Text on Color</span>
            <div className="text-xs font-mono font-normal">
              Ratio: {contrastWithWhite}:1 ·{' '}
              {contrastWithWhite >= 4.5 ? 'Pass (AA)' : 'Fail'}
            </div>
          </div>

          <div
            className="p-4 rounded-xl text-center font-bold text-sm space-y-1"
            style={{ backgroundColor: color.hex, color: '#000000' }}
          >
            <span>Black Text on Color</span>
            <div className="text-xs font-mono font-normal">
              Ratio: {contrastWithBlack}:1 ·{' '}
              {contrastWithBlack >= 4.5 ? 'Pass (AA)' : 'Fail'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
