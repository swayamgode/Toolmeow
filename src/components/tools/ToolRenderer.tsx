'use client';

import dynamic from 'next/dynamic';
import type React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toolComponents: Record<string, React.ComponentType<any>> = {
  'percentage-calculator': dynamic(() =>
    import('@/features/percentage-calculator/PercentageCalculatorTool').then((m) => m.PercentageCalculatorTool), { ssr: false }),
  'gst-calculator': dynamic(() =>
    import('@/features/gst-calculator/GstCalculatorTool').then((m) => m.GstCalculatorTool), { ssr: false }),
  'emi-calculator': dynamic(() =>
    import('@/features/emi-calculator/EmiCalculatorTool').then((m) => m.EmiCalculatorTool), { ssr: false }),
  'sip-calculator': dynamic(() =>
    import('@/features/sip-calculator/SipCalculatorTool').then((m) => m.SipCalculatorTool), { ssr: false }),
  'age-calculator': dynamic(() =>
    import('@/features/age-calculator/AgeCalculatorTool').then((m) => m.AgeCalculatorTool), { ssr: false }),
  'word-counter': dynamic(() =>
    import('@/features/word-counter/WordCounterTool').then((m) => m.WordCounterTool), { ssr: false }),
  'json-formatter': dynamic(() =>
    import('@/features/json-formatter/JsonFormatterTool').then((m) => m.JsonFormatterTool), { ssr: false }),
  'unit-converter': dynamic(() =>
    import('@/features/unit-converter/UnitConverterTool').then((m) => m.UnitConverterTool), { ssr: false }),
  'qr-code-generator': dynamic(() =>
    import('@/features/qr-code-generator/QrCodeGeneratorTool').then((m) => m.QrCodeGeneratorTool), { ssr: false }),
  'image-compressor': dynamic(() =>
    import('@/features/image-compressor/ImageCompressorTool').then((m) => m.ImageCompressorTool), { ssr: false }),
  'image-resizer': dynamic(() =>
    import('@/features/image-resizer/ImageResizerTool').then((m) => m.ImageResizerTool), { ssr: false }),
  'image-format-converter': dynamic(() =>
    import('@/features/image-format-converter/ImageFormatConverterTool').then((m) => m.ImageFormatConverterTool), { ssr: false }),
  'jpg-to-pdf': dynamic(() =>
    import('@/features/jpg-to-pdf/JpgToPdfTool').then((m) => m.JpgToPdfTool), { ssr: false }),
  'pdf-merger': dynamic(() =>
    import('@/features/pdf-merger/PdfMergerTool').then((m) => m.PdfMergerTool), { ssr: false }),
  'pdf-compressor': dynamic(() =>
    import('@/features/pdf-compressor/PdfCompressorTool').then((m) => m.PdfCompressorTool), { ssr: false }),
  'case-converter': dynamic(() =>
    import('@/features/case-converter/CaseConverterTool').then((m) => m.CaseConverterTool), { ssr: false }),
  'password-generator': dynamic(() =>
    import('@/features/password-generator/PasswordGeneratorTool').then((m) => m.PasswordGeneratorTool), { ssr: false }),
  'base64-converter': dynamic(() =>
    import('@/features/base64-converter/Base64ConverterTool').then((m) => m.Base64ConverterTool), { ssr: false }),
  'text-diff': dynamic(() =>
    import('@/features/text-diff/TextDiffTool').then((m) => m.TextDiffTool), { ssr: false }),
  'csv-json-converter': dynamic(() =>
    import('@/features/csv-json-converter/CsvJsonConverterTool').then((m) => m.CsvJsonConverterTool), { ssr: false }),
  'timestamp-converter': dynamic(() =>
    import('@/features/timestamp-converter/TimestampConverterTool').then((m) => m.TimestampConverterTool), { ssr: false }),
  'color-converter': dynamic(() =>
    import('@/features/color-converter/ColorConverterTool').then((m) => m.ColorConverterTool), { ssr: false }),
  'markdown-previewer': dynamic(() =>
    import('@/features/markdown-previewer/MarkdownPreviewerTool').then((m) => m.MarkdownPreviewerTool), { ssr: false }),
  'regex-tester': dynamic(() =>
    import('@/features/regex-tester/RegexTesterTool').then((m) => m.RegexTesterTool), { ssr: false }),
  'hash-generator': dynamic(() =>
    import('@/features/hash-generator/HashGeneratorTool').then((m) => m.HashGeneratorTool), { ssr: false }),
  'uuid-generator': dynamic(() =>
    import('@/features/uuid-generator/UuidGeneratorTool').then((m) => m.UuidGeneratorTool), { ssr: false }),
  'lorem-ipsum-generator': dynamic(() =>
    import('@/features/lorem-ipsum-generator/LoremIpsumGeneratorTool').then((m) => m.LoremIpsumGeneratorTool), { ssr: false }),
  'url-encoder-decoder': dynamic(() =>
    import('@/features/url-encoder-decoder/UrlEncoderDecoderTool').then((m) => m.UrlEncoderDecoderTool), { ssr: false }),
  'html-entity-converter': dynamic(() =>
    import('@/features/html-entity-converter/HtmlEntityConverterTool').then((m) => m.HtmlEntityConverterTool), { ssr: false }),
  'jwt-decoder': dynamic(() =>
    import('@/features/jwt-decoder/JwtDecoderTool').then((m) => m.JwtDecoderTool), { ssr: false }),
  'number-base-converter': dynamic(() =>
    import('@/features/number-base-converter/NumberBaseConverterTool').then((m) => m.NumberBaseConverterTool), { ssr: false }),
  'morse-code-converter': dynamic(() =>
    import('@/features/morse-code-converter/MorseCodeConverterTool').then((m) => m.MorseCodeConverterTool), { ssr: false }),
  'aspect-ratio-calculator': dynamic(() =>
    import('@/features/aspect-ratio-calculator/AspectRatioCalculatorTool').then((m) => m.AspectRatioCalculatorTool), { ssr: false }),
  'css-gradient-generator': dynamic(() =>
    import('@/features/css-gradient-generator/CssGradientGeneratorTool').then((m) => m.CssGradientGeneratorTool), { ssr: false }),
  'random-number-generator': dynamic(() =>
    import('@/features/random-number-generator/RandomNumberGeneratorTool').then((m) => m.RandomNumberGeneratorTool), { ssr: false }),
  'character-counter': dynamic(() =>
    import('@/features/character-counter/CharacterCounterTool').then((m) => m.CharacterCounterTool), { ssr: false }),
  'cron-expression-builder': dynamic(() =>
    import('@/features/cron-expression-builder/CronExpressionBuilderTool').then((m) => m.CronExpressionBuilderTool), { ssr: false }),
  'text-to-speech': dynamic(() =>
    import('@/features/text-to-speech/TextToSpeechTool').then((m) => m.TextToSpeechTool), { ssr: false }),
  'bmi-calculator': dynamic(() =>
    import('@/features/bmi-calculator/BmiCalculatorTool').then((m) => m.BmiCalculatorTool), { ssr: false }),
  'tip-calculator': dynamic(() =>
    import('@/features/tip-calculator/TipCalculatorTool').then((m) => m.TipCalculatorTool), { ssr: false }),
  'temperature-converter': dynamic(() =>
    import('@/features/temperature-converter/TemperatureConverterTool').then((m) => m.TemperatureConverterTool), { ssr: false }),
  'binary-text-converter': dynamic(() =>
    import('@/features/binary-text-converter/BinaryTextConverterTool').then((m) => m.BinaryTextConverterTool), { ssr: false }),
  'string-utilities': dynamic(() =>
    import('@/features/string-utilities/StringUtilitiesTool').then((m) => m.StringUtilitiesTool), { ssr: false }),
  'xml-formatter': dynamic(() =>
    import('@/features/xml-formatter/XmlFormatterTool').then((m) => m.XmlFormatterTool), { ssr: false }),
  'roman-numeral-converter': dynamic(() =>
    import('@/features/roman-numeral-converter/RomanNumeralConverterTool').then((m) => m.RomanNumeralConverterTool), { ssr: false }),
  'stopwatch-timer': dynamic(() =>
    import('@/features/stopwatch-timer/StopwatchTimerTool').then((m) => m.StopwatchTimerTool), { ssr: false }),
};

export function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = toolComponents[slug];
  if (!ToolComponent) return null;
  return <ToolComponent />;
}
