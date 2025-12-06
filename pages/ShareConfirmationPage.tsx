import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { Button } from '../components/common/Button';
import { sharedGallery } from '../data/mockData';

export const ShareConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAsClient = () => {
    navigate(`/shared/${sharedGallery.token}`);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 relative">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center animate-in zoom-in-95 duration-500">
        
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-4 ring-8 ring-teal/5">
          <Check size={48} strokeWidth={3} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Gallery Shared!</h2>
          <p className="text-text-secondary leading-relaxed">
            Your client will receive the gallery link via SMS.
          </p>
        </div>

        {/* Link Box */}
        <div className="w-full bg-bg-secondary border border-border-default rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary shrink-0">
            <Copy size={18} />
          </div>
          <div className="flex-1 text-left overflow-hidden">
            <p className="text-xs text-text-tertiary uppercase font-bold mb-0.5">Share Link</p>
            <p className="text-sm text-text-primary truncate font-medium">gallery.imagen-ai.com/{sharedGallery.token}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 mt-4">
          <Button variant="primary" fullWidth onClick={handleViewAsClient}>
            VIEW AS CLIENT
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/projects')}>
            BACK TO PROJECTS
          </Button>
        </div>
      </div>
    </div>
  );
};