export interface ProcessedImageResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
}

export async function compressImage({
  file,
  quality = 75,
  maxWidth,
  format = 'image/jpeg',
}: {
  file: File;
  quality?: number; // 10 - 100
  maxWidth?: number;
  format?: string;
}): Promise<ProcessedImageResult> {
  const originalSize = file.size;
  const imageBitmap = await createImageBitmap(file);

  let targetWidth = imageBitmap.width;
  let targetHeight = imageBitmap.height;

  if (maxWidth && targetWidth > maxWidth) {
    const scale = maxWidth / targetWidth;
    targetWidth = Math.round(maxWidth);
    targetHeight = Math.round(targetHeight * scale);
  }

  // Draw onto canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // If output is JPEG, fill white background to prevent black background on transparent PNG
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

  const q = quality / 100;
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate image blob'));
      },
      format,
      q
    );
  });

  const dataUrl = URL.createObjectURL(blob);
  const compressedSize = blob.size;
  const savedPercent =
    originalSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return {
    blob,
    dataUrl,
    width: targetWidth,
    height: targetHeight,
    originalSize,
    compressedSize,
    savedPercent,
  };
}

export async function resizeImage({
  file,
  targetWidth,
  targetHeight,
  format = 'image/png',
  quality = 90,
}: {
  file: File;
  targetWidth: number;
  targetHeight: number;
  format?: string;
  quality?: number;
}): Promise<ProcessedImageResult> {
  const originalSize = file.size;
  const imageBitmap = await createImageBitmap(file);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas blob generation failed'));
      },
      format,
      quality / 100
    );
  });

  const dataUrl = URL.createObjectURL(blob);
  return {
    blob,
    dataUrl,
    width: targetWidth,
    height: targetHeight,
    originalSize,
    compressedSize: blob.size,
    savedPercent:
      originalSize > 0
        ? Math.round(((originalSize - blob.size) / originalSize) * 100)
        : 0,
  };
}

export async function convertImageFormat({
  file,
  targetFormat,
  bgColor = '#FFFFFF',
  quality = 85,
}: {
  file: File;
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp';
  bgColor?: string;
  quality?: number;
}): Promise<Blob> {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  if (targetFormat === 'image/jpeg') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(imageBitmap, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Format conversion failed'));
      },
      targetFormat,
      quality / 100
    );
  });
}

