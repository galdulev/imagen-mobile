import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Heart, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Modal } from '../components/common/Modal';
import { PhotoViewer } from '../components/gallery/PhotoViewer';
import { ShareSheet } from '../components/share/ShareSheet';
import { projects, projectPhotos } from '../data/mockData';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const photos = id ? projectPhotos[id] : [];
  
  const [showShare, setShowShare] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

      {/* Project Info Bar */}
      <div className="px-4 py-3 bg-bg-secondary/80 backdrop-blur-sm border-b border-border-default">
        <div className="flex items-center justify-between">
          {/* Left: Profile & Stats */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/20 to-coral/5 flex items-center justify-center border border-coral/20">
              <span className="text-sm font-bold text-coral">{project.profileName.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-text-primary">{project.profileName}</h2>
              <div className="flex items-center gap-2 text-xs text-text-tertiary">
                <span>{project.photoCount} photos</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary/50" />
                <span>1.2GB</span>
                {clientFavorites > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-text-tertiary/50" />
                    <span className="flex items-center gap-1 text-coral">
                      <Heart size={10} className="fill-coral" />
                      {clientFavorites}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Right: Sync Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal/10 rounded-full border border-teal/20">
            <CheckCircle2 size={12} className="text-teal" />
            <span className="text-[10px] font-medium text-teal">Synced</span>
          </div>
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
          </div>
        ))}
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