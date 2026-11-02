'use client';

import React, { useState } from 'react';
import { convertImagesToPdf } from '@/lib/tools/pdf';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { ArrowUp, ArrowDown, AlertCircle, FileCheck } from 'lucide-react';
import { formatBytes } from '@/lib/format';

export const JpgToPdfTool: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Fit'>('A4');
  const [margin, setMargin] = useState<'none' | 'small' | 'large'>('small');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [pdfSize, setPdfSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= files.length) return;
    const copy = [...files];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setFiles(copy);
  };

  const handleGeneratePdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const pdfBytes = await convertImagesToPdf(rawFiles, {
        pageSize,
        margin,
        orientation,
      });

      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfDataUrl(url);
      setPdfSize(blob.size);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to generate PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="image/jpeg,image/png,image/webp"
        multiple
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setPdfDataUrl(null);
        }}
        title="Upload Images to Convert to PDF (JPG, PNG)"
      />

      {files.length > 0 && (
        <div className="space-y-4">
          {/* Order control list */}
          <div className="p-4 rounded-xl bg-white border border-[#E7E7E4] space-y-2">
            <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider mb-2">
              Page Order ({files.length} Pages)
            </h4>
            <div className="divide-y divide-[#F4F4F2]">
              {files.map((item, idx) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-[#0B0B0F] truncate max-w-xs">
                      {item.file.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, 'up')}
                      className="p-1 rounded hover:bg-[#F4F4F2] disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-[#5B5B66]" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === files.length - 1}
                      onClick={() => moveItem(idx, 'down')}
                      className="p-1 rounded hover:bg-[#F4F4F2] disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-[#5B5B66]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#5B5B66] mb-1">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter' | 'Fit')}
                  className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-xs font-semibold"
                >
                  <option value="A4">A4 (Standard 210 × 297 mm)</option>
                  <option value="Letter">US Letter</option>
                  <option value="Fit">Fit to Image</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5B5B66] mb-1">Margins</label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value as 'none' | 'small' | 'large')}
                  className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-xs font-semibold"
                >
                  <option value="none">No Margin (Full Bleed)</option>
                  <option value="small">Small Margin (0.25 inch)</option>
                  <option value="large">Large Margin (0.5 inch)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5B5B66] mb-1">Orientation</label>
                <select
                  value={orientation}
                  onChange={(e) =>
                    setOrientation(e.target.value as 'auto' | 'portrait' | 'landscape')
                  }
                  className="w-full h-10 px-3 rounded-xl border border-[#E7E7E4] bg-white text-xs font-semibold"
                >
                  <option value="auto">Auto Detect</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Generating PDF...' : 'Convert to PDF Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 text-[#DC2626] text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {pdfDataUrl && (
        <div className="p-5 rounded-2xl bg-white border border-[#E7E7E4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B0B0F]">PDF Ready for Download</p>
              <p className="text-xs text-[#5B5B66]">
                {files.length} pages &bull; {formatBytes(pdfSize)}
              </p>
            </div>
          </div>

          <a
            href={pdfDataUrl}
            download="combined-images.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-semibold shadow-btn hover:bg-[#1E1E24]"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

