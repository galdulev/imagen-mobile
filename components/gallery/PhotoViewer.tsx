import React from 'react';
import { X, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../../types';
import { Button } from '../common/Button';

interface PhotoViewerProps {
  photo: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onToggleFavorite?: (id: string) => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  canFavorite?: boolean;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({ 
  photo, 
  onClose, 
  onNext, 
  onPrev, 
  onToggleFavorite,
  hasNext,
  hasPrev,
  canFavorite = true
}) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onClose} className="p-2 text-white/90 hover:text-white rounded-full bg-black/20 backdrop-blur-md">
          <X size={24} />
        </button>
        
        {canFavorite && (
          <button 
            onClick={() => onToggleFavorite?.(photo.id)}
            className="p-2 rounded-full bg-black/20 backdrop-blur-md transition-colors"
          >
            <Heart 
              size={24} 
              className={photo.favorited ? "fill-coral text-coral" : "text-white"} 
            />
          </button>
        )}
      </div>

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center relative bg-black overflow-hidden group">
         {/* Nav Buttons (Always visible now) */}
         {hasPrev && (
            <button onClick={onPrev} className="absolute left-2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 backdrop-blur-sm z-20">
              <ChevronLeft size={32} />
            </button>
         )}

        <img 
          src={photo.src} 
          alt="Full view" 
          className="max-h-full max-w-full object-contain"
        />

        {hasNext && (
            <button onClick={onNext} className="absolute right-2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 backdrop-blur-sm z-20">
              <ChevronRight size={32} />
            </button>
         )}
      </div>

      {/* Bottom Bar */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent pb-[env(safe-area-inset-bottom)] flex justify-center">
        <Button variant="secondary" size="sm" className="gap-2 backdrop-blur-md border-white/20 text-white hover:bg-white/10">
          <Share2 size={16} /> Share Photo
        </Button>
      </div>
    </div>
  );
};