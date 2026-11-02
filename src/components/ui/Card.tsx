import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  hover = false,
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-[#E7E7E4] rounded-[20px] p-5 shadow-card transition-all duration-200 ${
        hover ? 'hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

