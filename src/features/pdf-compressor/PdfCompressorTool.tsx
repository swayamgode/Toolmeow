'use client';

import React, { useState } from 'react';
import { compressPdfFile } from '@/lib/tools/pdf';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { formatBytes } from '@/lib/format';
import { AlertCircle, FileCheck, Info } from 'lucide-react';

export const PdfCompressorTool: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const res = await compressPdfFile(files[0].file, 'lossless');
      const blob = new Blob([res.bytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult({ url, originalSize: res.originalSize, compressedSize: res.compressedSize });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('PDF compression failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const savedPercent =
    result && result.originalSize > 0
      ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <FileUploader
        accept="application/pdf"
        multiple={false}
        files={files}
        onFilesChange={(f) => { setFiles(f); setResult(null); }}
        title="Upload a PDF Document to Compress"
      />

      {files.length > 0 && !result && (
        <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
          <div className="p-3 rounded-xl bg-[#EEF0FF] border border-[#4F46E5]/20 text-xs text-[#4F46E5] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Lossless Optimization:</strong> Strips metadata, deduplicates fonts, and re-encodes streams.
              Selectable text is fully preserved. Savings are typically 5–20% for clean digital PDFs.
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCompress}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Compressing in Browser...' : 'Compress PDF'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 text-[#DC2626] text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E4] space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B0B0F]">Compression Complete</p>
              <p className="text-xs text-[#5B5B66]">
                {formatBytes(result.originalSize)} → <span className="font-bold text-[#16A34A]">{formatBytes(result.compressedSize)}</span>
                {' '}({savedPercent > 0 ? `−${savedPercent}%` : 'No size reduction — original preserved'})
              </p>
            </div>
          </div>
          <a
            href={result.url}
            download="compressed.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-semibold shadow-btn hover:bg-[#1E1E24]"
          >
            Download Compressed PDF
          </a>
        </div>
      )}
    </div>
  );
};

