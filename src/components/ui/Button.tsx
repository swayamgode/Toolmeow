import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-[#0B0B0F] text-white hover:bg-[#1E1E24] shadow-btn active:scale-[0.98]',
      secondary:
        'bg-white text-[#0B0B0F] border border-[#E7E7E4] hover:bg-[#F4F4F2] shadow-sm active:scale-[0.98]',
      outline: 'bg-transparent text-[#0B0B0F] border border-[#E7E7E4] hover:bg-[#F4F4F2]',
      ghost: 'bg-transparent text-[#5B5B66] hover:text-[#0B0B0F] hover:bg-[#F4F4F2]',
      danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 h-8 gap-1.5',
      md: 'text-sm px-5 py-2.5 h-11 gap-2',
      lg: 'text-base px-6 py-3 h-12 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

