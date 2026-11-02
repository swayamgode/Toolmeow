'use client';

import React, { useState } from 'react';
import { mergePdfFiles } from '@/lib/tools/pdf';
import { FileUploader, type FileItem } from '@/components/inputs/FileUploader';
import { ArrowUp, ArrowDown, AlertCircle, FileCheck } from 'lucide-react';
import { formatBytes } from '@/lib/format';

interface MergingFileItem extends FileItem {
  pageRange?: string;
}

export const PdfMergerTool: React.FC = () => {
  const [files, setFiles] = useState<MergingFileItem[]>([]);
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

  const updatePageRange = (id: string, range: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, pageRange: range } : f))
    );
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const mergedBytes = await mergePdfFiles(
        files.map((f) => ({ file: f.file, pageRange: f.pageRange }))
      );

      const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfDataUrl(url);
      setPdfSize(blob.size);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to merge PDF files.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="application/pdf"
        multiple
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setPdfDataUrl(null);
        }}
        title="Upload 2 or More PDF Files to Merge"
        subtitle="100% confidential. Files merged in your browser memory."
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-[#E7E7E4] space-y-3">
            <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
              Document Merge Order & Page Ranges
            </h4>

            <div className="space-y-2">
              {files.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-[#0B0B0F] truncate">{item.file.name}</span>
                    <span className="text-[#5B5B66] shrink-0">({formatBytes(item.file.size)})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="All pages or e.g. 1-3, 5"
                      value={item.pageRange || ''}
                      onChange={(e) => updatePageRange(item.id, e.target.value)}
                      className="h-8 px-2.5 rounded-lg border border-[#E7E7E4] bg-white text-xs w-36"
                    />

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveItem(idx, 'up')}
                        className="p-1 rounded hover:bg-[#F4F4F2] disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-[#5B5B66]" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === files.length - 1}
                        onClick={() => moveItem(idx, 'down')}
                        className="p-1 rounded hover:bg-[#F4F4F2] disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-[#5B5B66]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleMerge}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-bold shadow-btn hover:bg-[#1E1E24] cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Merging in Browser...' : `Merge ${files.length} PDF Documents`}
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
              <p className="text-sm font-bold text-[#0B0B0F]">Merged Document Ready</p>
              <p className="text-xs text-[#5B5B66]">Total file size: {formatBytes(pdfSize)}</p>
            </div>
          </div>

          <a
            href={pdfDataUrl}
            download="merged-document.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs font-semibold shadow-btn hover:bg-[#1E1E24]"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
};

