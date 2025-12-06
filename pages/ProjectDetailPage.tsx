import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Flag, Star, Heart, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { PhotoViewer } from '../components/gallery/PhotoViewer';
import { ShareSheet } from '../components/share/ShareSheet';
import { projects, projectPhotos } from '../data/mockData';
import { Photo, ColorLabel } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const photos = id ? projectPhotos[id] : [];
  
  const [showShare, setShowShare] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!project) return <div>Project not found</div>;

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  // Helper for color labels
  const getColorClass = (label: ColorLabel) => {
    switch (label) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-transparent';
    }
  };

  // Count favorites for social proof/upsell indicator
  const clientFavorites = photos.filter(p => p.favorited).length;

  return (
    <div className="pb-24 min-h-screen bg-bg-primary">
      <Header 
        title={project.name} 
        showBack 
        rightElement={
          <button onClick={() => setShowShare(true)} className="p-2 text-coral hover:bg-bg-tertiary rounded-full">
            <Share2 size={24} />
          </button>
        }
      />

      {/* Action Header - The "One Stop Shop" Ecosystem Feel */}
      <div className="px-4 py-4 bg-bg-secondary border-b border-border-default mb-1">
        <div className="flex justify-between items-center mb-4">
           <div className="flex flex-col">
             <h2 className="text-sm font-semibold text-text-primary">{project.profileName}</h2>
             <span className="text-xs text-text-tertiary">{project.photoCount} photos • 1.2GB</span>
           </div>
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal/10 rounded-full border border-teal/20">
              <CheckCircle2 size={12} className="text-teal" />
              <span className="text-[10px] font-bold uppercase tracking-wide text-teal">Synced to Cloud</span>
           </div>
        </div>

        {/* Mini Dashboard for Engagement */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-tertiary/50 rounded-lg p-2.5 flex items-center gap-3 border border-white/5">
            <div className="bg-coral/20 p-2 rounded-full text-coral">
              <Heart size={14} className="fill-coral" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-text-primary leading-none">{clientFavorites}</span>
              <span className="text-[10px] text-text-secondary uppercase">Client Faves</span>
            </div>
          </div>
          <Button size="sm" onClick={() => setShowShare(true)} className="h-full shadow-lg shadow-coral/10">
            Share Gallery
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="aspect-square relative overflow-hidden cursor-pointer group"
            onClick={() => handlePhotoClick(index)}
          >
            <img 
              src={photo.src} 
              alt="Project photo" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
            
            {/* Customer Favorite Indicator - Highly visible */}
            {photo.favorited && (
              <div className="absolute top-1 right-1 bg-coral text-white rounded-full p-1 shadow-md z-10">
                <Heart size={10} className="fill-white" />
              </div>
            )}

            {/* Professional Culling Metadata Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-4 pb-1 px-1.5 flex items-end justify-between">
              
              {/* Left: Flag & Rating */}
              <div className="flex items-center gap-1.5">
                {/* Flag */}
                {photo.flag !== 'none' && (
                  <div className={`
                    flex items-center justify-center w-3 h-3
                    ${photo.flag === 'rejected' ? 'text-text-secondary' : 'text-white'}
                  `}>
                    {photo.flag === 'picked' ? <Flag size={10} className="fill-white" /> : <XMarkIcon />}
                  </div>
                )}
                
                {/* Stars */}
                {photo.rating > 0 && (
                  <div className="flex items-center gap-0.5">
                    <span className="text-[9px] font-bold text-white">{photo.rating}</span>
                    <Star size={8} className="fill-white text-white" />
                  </div>
                )}
              </div>

              {/* Right: Color Label */}
              {photo.colorLabel !== 'none' && (
                <div className={`w-2 h-2 rounded-full shadow-sm ${getColorClass(photo.colorLabel)} border border-white/10`} />
              )}
              
            </div>
          </div>
        ))}
      </div>

      {/* Floating Share Button (Redundant but good for long scrolls) */}
      <div className="fixed bottom-20 right-4 z-20">
        <button 
           onClick={() => setShowShare(true)}
           className="w-14 h-14 bg-coral hover:bg-coral-hover text-white rounded-full shadow-2xl shadow-coral/40 flex items-center justify-center transition-transform active:scale-90"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Share Modal */}
      <Modal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        title="Share Gallery" 
        subtitle={project.name}
      >
        <ShareSheet onClose={() => setShowShare(false)} />
      </Modal>

      {/* Photo Viewer */}
      <PhotoViewer 
        photo={selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1}
        hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
        canFavorite={false} // Photographer view
      />
    </div>
  );
};

const XMarkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);