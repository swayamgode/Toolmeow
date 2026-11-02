'use client';

import React, { useState, useEffect } from 'react';
import { resizeImage, type ProcessedImageResult } from '@/lib/tools/image';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { formatBytes } from '@/lib/format';
import { Lock, Unlock, AlertCircle } from 'lucide-react';

const PRESETS = [
  { label: 'Instagram Square (1080×1080)', w: 1080, h: 1080 },
  { label: 'Instagram Story (1080×1920)', w: 1080, h: 1920 },
  { label: 'YouTube Thumbnail (1280×720)', w: 1280, h: 720 },
  { label: 'Twitter / Facebook Post (1200×630)', w: 1200, h: 630 },
];

export const ImageResizerTool: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [origW, setOrigW] = useState<number>(0);
  const [origH, setOrigH] = useState<number>(0);

  const [width, setWidth] = useState<number>(1080);
  const [height, setHeight] = useState<number>(1080);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Read native image dimensions when file is selected
  useEffect(() => {
    if (files.length > 0) {
      const img = new Image();
      img.onload = () => {
        setOrigW(img.width);
        setOrigH(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = files[0].previewUrl || '';
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(null);
    }
  }, [files]);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && origW > 0) {
      setHeight(Math.round((val / origW) * origH));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && origH > 0) {
      setWidth(Math.round((val / origH) * origW));
    }
  };

  const applyScale = (pct: number) => {
    if (origW > 0 && origH > 0) {
      const w = Math.round(origW * (pct / 100));
      const h = Math.round(origH * (pct / 100));
      setWidth(w);
      setHeight(h);
    }
  };

  const handleResize = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      const res = await resizeImage({
        file: files[0].file,
        targetWidth: width,
        targetHeight: height,
        format: files[0].file.type || 'image/png',
      });
      setResult(res);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Resizing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || files.length === 0) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    a.download = `resized-${width}x${height}-${files[0].file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="image/*"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        title="Upload Image to Resize"
      />

      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E7E4] pb-3">
            <span className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
              Original Dimensions: {origW} × {origH} px
            </span>
            {/* Quick Scale Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#5B5B66]">Scale:</span>
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => applyScale(pct)}
                  className="px-2 py-0.5 rounded bg-white border border-[#E7E7E4] text-[#0B0B0F] hover:bg-[#F4F4F2] font-semibold"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Social Presets */}
          <div>
            <label className="block text-xs font-bold text-[#5B5B66] mb-1.5">
              Popular Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setWidth(p.w);
                    setHeight(p.h);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E7E7E4] text-xs text-[#0B0B0F] hover:bg-[#F4F4F2]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Width & Height inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#5B5B66] mb-1">Target Width (px)</label>
              <input
                type="number"
                min="1"
                max="16384"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 1)}
                className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-sm font-semibold text-[#0B0B0F]"
              />
            </div>

            <div className="flex justify-center pt-4 sm:pt-0">
              <button
                type="button"
                onClick={() => setLockAspect(!lockAspect)}
                className={`p-2 rounded-xl border transition-colors ${
                  lockAspect
                    ? 'bg-[#EEF0FF] text-[#4F46E5] border-[#4F46E5]/30'
                    : 'bg-white text-[#5B5B66] border-[#E7E7E4]'
                }`}
                title={lockAspect ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
              >
                {lockAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#5B5B66] mb-1">Target Height (px)</label>
              <input
                type="number"
                min="1"
                max="16384"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 1)}
                className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-sm font-semibold text-[#0B0B0F]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleResize}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Resizing...' : `Resize to ${width} × ${height}`}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 text-[#DC2626] text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.dataUrl}
              alt="Resized output"
              className="w-16 h-16 object-contain rounded-lg border border-[#E7E7E4]"
            />
            <div>
              <p className="text-sm font-bold text-[#0B0B0F]">
                Resized to {result.width} × {result.height} px
              </p>
              <p className="text-xs text-[#5B5B66]">
                New file size: {formatBytes(result.compressedSize)}
              </p>
            </div>
          </div>

          <DownloadButton label="Download Resized Image" onClick={handleDownload} />
        </div>
      )}
    </div>
  );
};

