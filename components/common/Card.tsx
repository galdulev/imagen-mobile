import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-bg-secondary border border-border-default rounded-2xl p-4 ${className} ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''}`}
    >
      {children}
    </div>
  );
};