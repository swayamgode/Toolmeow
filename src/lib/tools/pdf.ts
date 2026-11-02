import { PDFDocument, PageSizes } from 'pdf-lib';

export interface JpgToPdfOptions {
  pageSize: 'A4' | 'Letter' | 'Fit';
  margin: 'none' | 'small' | 'large';
  orientation: 'auto' | 'portrait' | 'landscape';
}

export async function convertImagesToPdf(
  imageFiles: File[],
  options: JpgToPdfOptions
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  const marginMap = {
    none: 0,
    small: 18, // 0.25 inch
    large: 36, // 0.5 inch
  };
  const m = marginMap[options.margin];

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const isPng = file.type === 'image/png';

    let embeddedImage;
    try {
      if (isPng) {
        embeddedImage = await pdfDoc.embedPng(arrayBuffer);
      } else {
        embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
      }
    } catch {
      // If direct embed fails (e.g. webp or special jpeg), draw to offscreen canvas first
      const img = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpegBlob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), 'image/jpeg', 0.9));
        const jpegBytes = await jpegBlob.arrayBuffer();
        embeddedImage = await pdfDoc.embedJpg(jpegBytes);
      } else {
        throw new Error(`Failed to process image ${file.name}`);
      }
    }

    const { width: imgW, height: imgH } = embeddedImage;

    let pageWidth = PageSizes.A4[0];
    let pageHeight = PageSizes.A4[1];

    if (options.pageSize === 'Letter') {
      pageWidth = PageSizes.Letter[0];
      pageHeight = PageSizes.Letter[1];
    } else if (options.pageSize === 'Fit') {
      pageWidth = imgW + m * 2;
      pageHeight = imgH + m * 2;
    }

    // Auto orientation
    if (options.pageSize !== 'Fit') {
      const isLandscape = imgW > imgH;
      if (options.orientation === 'landscape' || (options.orientation === 'auto' && isLandscape)) {
        if (pageWidth < pageHeight) {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }
      } else {
        if (pageWidth > pageHeight) {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }
      }
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Scale image to fit within margins
    const availableW = pageWidth - m * 2;
    const availableH = pageHeight - m * 2;
    const scale = Math.min(availableW / imgW, availableH / imgH, 1);

    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = m + (availableW - drawW) / 2;
    const drawY = m + (availableH - drawH) / 2;

    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });
  }

  return pdfDoc.save();
}

export async function mergePdfFiles(
  pdfFiles: { file: File; pageRange?: string }[]
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const item of pdfFiles) {
    const bytes = await item.file.arrayBuffer();
    let srcPdf: PDFDocument;
    try {
      srcPdf = await PDFDocument.load(bytes, { ignoreEncryption: false });
    } catch {
      throw new Error(
        `PDF "${item.file.name}" could not be opened. It might be password-protected or encrypted.`
      );
    }

    const totalPages = srcPdf.getPageCount();
    let pagesToCopy: number[] = [];

    if (item.pageRange && item.pageRange.trim()) {
      // Parse ranges like "1-3, 5" (1-indexed input converted to 0-indexed)
      const parts = item.pageRange.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [startStr, endStr] = trimmed.split('-');
          const start = Math.max(1, parseInt(startStr, 10));
          const end = Math.min(totalPages, parseInt(endStr, 10));
          for (let p = start; p <= end; p++) {
            pagesToCopy.push(p - 1);
          }
        } else {
          const p = parseInt(trimmed, 10);
          if (p >= 1 && p <= totalPages) {
            pagesToCopy.push(p - 1);
          }
        }
      }
    } else {
      pagesToCopy = srcPdf.getPageIndices();
    }

    if (pagesToCopy.length > 0) {
      const copiedPages = await mergedPdf.copyPages(srcPdf, pagesToCopy);
      for (const p of copiedPages) {
        mergedPdf.addPage(p);
      }
    }
  }

  return mergedPdf.save();
}

export async function compressPdfFile(
  file: File,
  _mode: 'lossless' | 'raster' = 'lossless',
  _quality = 0.75
): Promise<{ bytes: Uint8Array; originalSize: number; compressedSize: number }> {
  void _mode;
  void _quality;
  const originalBytes = await file.arrayBuffer();
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(originalBytes);
  } catch {
    throw new Error('Could not open PDF file. Password-protected files are not supported.');
  }

  // Lossless: Strip metadata and compress object streams
  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer('ToolMeow');
  pdfDoc.setCreator('ToolMeow');

  const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    bytes: compressedBytes,
    originalSize: file.size,
    compressedSize: compressedBytes.length,
  };
}

