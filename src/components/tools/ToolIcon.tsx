import React from 'react';
import {
  Percent,
  Receipt,
  Landmark,
  TrendingUp,
  CalendarClock,
  Type,
  Braces,
  Ruler,
  QrCode,
  ImageDown,
  Scaling,
  Repeat,
  FileImage,
  Merge,
  FileArchive,
  Wrench,
  CaseSensitive,
  KeyRound,
  Binary,
  FileDiff,
  FileSpreadsheet,
  Clock,
  Palette,
  FileCode,
  Code2,
  Shield,
  type LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Percent,
  Receipt,
  Landmark,
  TrendingUp,
  CalendarClock,
  Type,
  Braces,
  Ruler,
  QrCode,
  ImageDown,
  Scaling,
  Repeat,
  FileImage,
  Merge,
  FileArchive,
  CaseSensitive,
  KeyRound,
  Binary,
  FileDiff,
  FileSpreadsheet,
  Clock,
  Palette,
  FileCode,
  Code2,
  Shield,
};

export interface ToolIconProps extends LucideProps {
  name: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || Wrench;
  return <IconComponent {...props} />;
};

