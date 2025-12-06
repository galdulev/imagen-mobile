import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ initials, size = 'md' }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg"
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-bg-tertiary flex items-center justify-center font-semibold text-text-primary border border-border-default`}>
      {initials}
    </div>
  );
};