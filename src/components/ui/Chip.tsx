import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'outline';
  size?: 'sm' | 'md';
}

export const Chip: React.FC<ChipProps> = ({
  className = '',
  variant = 'default',
  size = 'sm',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    default: 'bg-[#F4F4F2] text-[#5B5B66]',
    accent: 'bg-[#EEF0FF] text-[#4F46E5]',
    success: 'bg-[#DCFCE7] text-[#16A34A]',
    outline: 'border border-[#E7E7E4] text-[#5B5B66] bg-white',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

