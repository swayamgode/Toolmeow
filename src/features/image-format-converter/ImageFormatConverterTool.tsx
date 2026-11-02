'use client';

import React, { useState } from 'react';
import { convertImageFormat } from '@/lib/tools/image';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { formatBytes } from '@/lib/format';
import { AlertCircle, Sliders } from 'lucide-react';

export const ImageFormatConverterTool: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [results, setResults] = useState<{ id: string; name: string; blob: Blob; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    const converted: { id: string; name: string; blob: Blob; url: string }[] = [];

    try {
      for (const item of files) {
        const blob = await convertImageFormat({
          file: item.file,
          targetFormat,
          bgColor,
        });
        const url = URL.createObjectURL(blob);
        converted.push({ id: item.id, name: item.file.name, blob, url });
      }
      setResults(converted);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Conversion failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  };

  const handleDownload = (res: { name: string; url: string }) => {
    const a = document.createElement('a');
    a.href = res.url;
    const base = res.name.replace(/\.[^/.]+$/, '');
    a.download = `${base}${extMap[targetFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="image/jpeg,image/png,image/webp"
        multiple
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setResults([]);
        }}
        title="Upload Images to Convert (JPG, PNG, WebP)"
      />

      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#4F46E5]" />
            <span>Format Conversion Target</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5B5B66] mb-1.5">Convert To</label>
              <select
                value={targetFormat}
                onChange={(e) =>
                  setTargetFormat(e.target.value as 'image/jpeg' | 'image/png' | 'image/webp')
                }
                className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-xs font-semibold text-[#0B0B0F]"
              >
                <option value="image/webp">WebP (Recommended for Websites)</option>
                <option value="image/png">PNG (Lossless & Transparent)</option>
                <option value="image/jpeg">JPEG (Universal Compatibility)</option>
              </select>
            </div>

            {targetFormat === 'image/jpeg' && (
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] mb-1.5">
                  Transparency Fill Color (for JPEG)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#E7E7E4] cursor-pointer"
                  />
                  <span className="text-xs font-mono text-[#5B5B66]">{bgColor}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleConvert}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] cursor-pointer disabled:opacity-50"
            >
              {isProcessing
                ? 'Converting...'
                : `Convert ${files.length} File${files.length > 1 ? 's' : ''} to ${
                    targetFormat === 'image/webp' ? 'WebP' : targetFormat === 'image/png' ? 'PNG' : 'JPEG'
                  }`}
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

      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
            Converted Files
          </h4>
          <div className="space-y-3">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-white border border-[#E7E7E4] flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={res.url}
                    alt={res.name}
                    className="w-12 h-12 object-cover rounded-lg border border-[#E7E7E4]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0B0B0F] truncate max-w-xs">{res.name}</p>
                    <p className="text-[11px] text-[#5B5B66]">
                      Output size: {formatBytes(res.blob.size)}
                    </p>
                  </div>
                </div>

                <DownloadButton
                  label="Download"
                  onClick={() => handleDownload(res)}
                  className="text-xs py-1.5 px-3"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

