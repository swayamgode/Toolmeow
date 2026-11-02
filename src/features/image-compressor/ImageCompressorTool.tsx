'use client';

import React, { useState } from 'react';
import { compressImage, type ProcessedImageResult } from '@/lib/tools/image';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { formatBytes } from '@/lib/format';
import { AlertCircle, Sliders } from 'lucide-react';

export const ImageCompressorTool: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [quality, setQuality] = useState<number>(75);
  const [format, setFormat] = useState<string>('image/jpeg');
  const [results, setResults] = useState<{ id: string; name: string; res: ProcessedImageResult }[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    const newResults: { id: string; name: string; res: ProcessedImageResult }[] = [];

    try {
      for (const item of files) {
        const res = await compressImage({
          file: item.file,
          quality,
          format,
        });
        newResults.push({ id: item.id, name: item.file.name, res });
      }
      setResults(newResults);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Image compression encountered an error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (res: ProcessedImageResult, filename: string) => {
    const a = document.createElement('a');
    a.href = res.dataUrl;
    const ext = format === 'image/webp' ? '.webp' : format === 'image/png' ? '.png' : '.jpg';
    a.download = `compressed-${filename.replace(/\.[^/.]+$/, '')}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Uploader */}
      <FileUploader
        accept="image/jpeg,image/png,image/webp"
        multiple
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setResults([]);
        }}
        title="Upload Images to Compress (JPG, PNG, WebP)"
      />

      {/* Settings Bar */}
      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#4F46E5]" />
            <span>Compression Controls</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#5B5B66] mb-1.5">
                <span>Quality Level: {quality}%</span>
                <span>{quality > 80 ? 'High' : quality >= 60 ? 'Optimal' : 'Maximum Savings'}</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                className="w-full accent-[#4F46E5] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B5B66] mb-1.5">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-xs font-semibold text-[#0B0B0F]"
              >
                <option value="image/jpeg">Convert to JPEG (Great for Photos)</option>
                <option value="image/webp">Convert to WebP (Modern & Smallest)</option>
                <option value="image/png">Keep Lossless PNG</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleCompress}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Compressing in Browser...' : `Compress ${files.length} Image${files.length > 1 ? 's' : ''}`}
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

      {/* Results List */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
            Compression Results
          </h4>
          <div className="space-y-3">
            {results.map(({ id, name, res }) => (
              <div
                key={id}
                className="p-4 rounded-xl bg-white border border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={res.dataUrl}
                    alt={name}
                    className="w-12 h-12 object-cover rounded-lg border border-[#E7E7E4]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0B0B0F] truncate max-w-xs">{name}</p>
                    <p className="text-[11px] text-[#5B5B66]">
                      {formatBytes(res.originalSize)} &rarr;{' '}
                      <span className="font-bold text-[#16A34A]">{formatBytes(res.compressedSize)}</span>{' '}
                      ({res.savedPercent > 0 ? `-${res.savedPercent}%` : 'Kept Original'})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DownloadButton
                    label="Download"
                    onClick={() => handleDownload(res, name)}
                    className="text-xs py-1.5 px-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

