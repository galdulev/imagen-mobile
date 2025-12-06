import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-coral text-white hover:bg-coral-hover uppercase tracking-wide",
    secondary: "bg-transparent border border-border-default text-text-primary hover:bg-bg-tertiary",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary",
    icon: "bg-bg-secondary border border-border-default text-text-primary rounded-full"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: variant === 'icon' ? "w-12 h-12 p-0" : "px-6 py-3 text-sm",
    lg: "w-full py-4 text-base font-semibold"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};