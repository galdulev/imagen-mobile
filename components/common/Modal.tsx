import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div 
        className={`
          relative w-full max-w-md bg-bg-secondary rounded-t-2xl sm:rounded-2xl p-6 
          transform transition-transform duration-300 ease-out border-t sm:border border-border-default
          ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-10 sm:scale-95'}
        `}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-1 bg-border-dashed rounded-full mb-6 sm:hidden" />
          <div className="w-full flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
              {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
            </div>
            {/* Close button for desktop/accessibility */}
            <button onClick={onClose} className="p-1 rounded-full hover:bg-bg-tertiary text-text-secondary">
               <X size={20} />
            </button>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};