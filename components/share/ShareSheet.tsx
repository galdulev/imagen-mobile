import React from 'react';
import { shareOptions } from '../../data/mockData';
import { MessageCircle, Mail, Link as LinkIcon, Smartphone } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ShareSheetProps {
  onClose: () => void;
}

export const ShareSheet: React.FC<ShareSheetProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleShare = (method: string) => {
    // Navigate to confirmation page
    onClose();
    navigate(`/projects/${id}/shared`);
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'MessageCircle': return <MessageCircle size={24} />;
      case 'Mail': return <Mail size={24} />;
      case 'Link': return <LinkIcon size={24} />;
      default: return <Smartphone size={24} />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-bg-tertiary rounded-xl p-3">
        <textarea 
          placeholder="Add a personal message for your client..."
          className="w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder-text-tertiary text-sm resize-none h-20"
        ></textarea>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {shareOptions.map((option) => (
          <button 
            key={option.id}
            onClick={() => handleShare(option.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform group-active:scale-95 shadow-lg"
              style={{ backgroundColor: option.color }}
            >
              {getIcon(option.icon)}
            </div>
            <span className="text-[11px] text-text-secondary">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};