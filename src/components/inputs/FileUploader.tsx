'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, X, File, AlertCircle } from 'lucide-react';
import { formatBytes } from '@/lib/format';

export interface FileItem {
  id: string;
  file: File;
  previewUrl?: string;
  error?: string;
}

export interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeBytes?: number;
  files: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  multiple = false,
  maxFiles = 20,
  maxSizeBytes = 50 * 1024 * 1024, // 50MB
  files,
  onFilesChange,
  title = 'Drop files here or click to browse',
  subtitle = 'Supports local in-browser processing. Up to 50 MB per file.',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const processIncomingFiles = (incoming: FileList | File[]) => {
    setValidationError(null);
    const newItems: FileItem[] = [];

    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i];

      if (file.size > maxSizeBytes) {
        setValidationError(`File "${file.name}" exceeds the 50 MB size limit.`);
        continue;
      }

      if (files.length + newItems.length >= maxFiles) {
        setValidationError(`Maximum of ${maxFiles} files reached.`);
        break;
      }

      let previewUrl: string | undefined;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      newItems.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl,
      });
    }

    if (newItems.length > 0) {
      onFilesChange(multiple ? [...files, ...newItems] : newItems);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    const target = files.find((f) => f.id === id);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }
    onFilesChange(files.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-[20px] p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
          isDragOver
            ? 'border-[#4F46E5] bg-[#EEF0FF]/40 scale-[0.99]'
            : 'border-[#E7E7E4] bg-[#FAFAF9] hover:bg-[#F4F4F2] hover:border-[#5B5B66]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) processIncomingFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E4] shadow-sm flex items-center justify-center text-[#4F46E5] mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-sm font-bold text-[#0B0B0F] mb-1">{title}</p>
        <p className="text-xs text-[#5B5B66] max-w-sm">{subtitle}</p>
      </div>

      {/* Validation warning */}
      {validationError && (
        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 text-[#DC2626] text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {files.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white border border-[#E7E7E4] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.previewUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="w-10 h-10 object-cover rounded-lg border border-[#E7E7E4] shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#F4F4F2] flex items-center justify-center text-[#5B5B66] shrink-0">
                    <File className="w-5 h-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-[#0B0B0F] truncate">{item.file.name}</p>
                  <p className="text-[#5B5B66]">{formatBytes(item.file.size)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                className="p-1 rounded-lg text-[#5B5B66] hover:text-[#DC2626] hover:bg-[#F4F4F2]"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

