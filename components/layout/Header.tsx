import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: React.ReactNode;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, rightElement, transparent }) => {
  const navigate = useNavigate();

  return (
    <header className={`
      sticky top-0 z-30 flex items-center justify-between px-4 py-3
      ${transparent ? 'bg-bg-primary/80 backdrop-blur-md' : 'bg-bg-primary/95 backdrop-blur-md border-b border-border-default'}
    `}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 -ml-1 text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        {title && (
          typeof title === 'string' 
            ? <h1 className="text-lg font-semibold text-text-primary truncate max-w-[200px]">{title}</h1>
            : title
        )}
      </div>
      
      <div>
        {rightElement}
      </div>
    </header>
  );
};