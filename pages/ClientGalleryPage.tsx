import React, { useState } from 'react';
import { Heart, Share2, Download, Camera } from 'lucide-react';
import { projectPhotos, sharedGallery } from '../data/mockData';
import { PhotoViewer } from '../components/gallery/PhotoViewer';
import { Button } from '../components/common/Button';

export const ClientGalleryPage: React.FC = () => {
  const photosData = projectPhotos['proj_1'];
  
  const [photos, setPhotos] = useState(photosData);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotos(current => current.map(p => 
      p.id === id ? { ...p, favorited: !p.favorited } : p
    ));
  };

  const favoriteCount = photos.filter(p => p.favorited).length;

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

  // The Hero Image should be the cover or first good photo
  const heroImage = photos[0].src;

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      
      {/* 1. Immersive Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={heroImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-black/30" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center animate-in slide-in-from-bottom-8 duration-700">
           <span className="text-xs font-bold tracking-[0.2em] text-coral uppercase mb-3">The Wedding Of</span>
           <h1 className="text-4xl font-serif font-bold text-white mb-2 leading-tight">Johnson & Co.</h1>
           <p className="text-sm text-white/80 font-medium">December 4, 2025</p>
        </div>
      </div>

      {/* 2. Photographer Branding & Message (Lead Gen) */}
      <div className="px-6 py-8 bg-bg-primary -mt-4 relative rounded-t-3xl z-10">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
           <div className="w-16 h-1 bg-border-default rounded-full mb-2" />
           <p className="text-text-secondary leading-relaxed font-light italic">
             "{sharedGallery.message}"
           </p>
           
           {/* Branding Badge */}
           <div className="flex items-center gap-3 bg-bg-secondary border border-white/5 pr-4 pl-2 py-1.5 rounded-full mt-2">
              <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary">
                 <Camera size={14} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-text-tertiary uppercase font-bold">Captured by</span>
                <span className="text-xs text-white font-semibold">{sharedGallery.photographerName}</span>
              </div>
           </div>
        </div>

        {/* 3. Action Bar (Viral Loop) */}
        <div className="flex gap-3 mb-8">
           <Button variant="secondary" className="flex-1 text-xs gap-2 py-3 border-white/10 hover:bg-white/5">
              <Share2 size={14} /> Share Album
           </Button>
           <Button variant="secondary" className="flex-1 text-xs gap-2 py-3 border-white/10 hover:bg-white/5">
              <Download size={14} /> Download All
           </Button>
        </div>

        {/* 4. Gallery Grid (Masonry feel with aspect-square for now) */}
        <div className="flex justify-between items-end mb-4 px-2">
           <h3 className="text-lg font-bold text-white">Gallery</h3>
           <span className="text-xs text-text-tertiary">{photos.length} photos</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={`
                relative overflow-hidden cursor-pointer rounded-xl group bg-bg-secondary
                ${index % 3 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}
              `}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img 
                src={photo.src} 
                alt="Gallery item" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              
              <button 
                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-white/20 active:scale-90 transition-all z-10"
                onClick={(e) => toggleFavorite(photo.id, e)}
              >
                <Heart 
                  size={18} 
                  className={`drop-shadow-sm transition-colors ${photo.favorited ? 'fill-coral text-coral' : 'text-white'}`} 
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Powered by Imagen Footer (Subtle) */}
      <div className="text-center pb-8 pt-4">
        <span className="text-[10px] text-text-tertiary uppercase tracking-widest opacity-50">Powered by Imagen</span>
      </div>

      {/* Favorites Floating Pill */}
      {favoriteCount > 0 && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none">
          <div className="bg-bg-primary/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 shadow-2xl shadow-black/50 animate-in slide-in-from-bottom-4 pointer-events-auto">
            <Heart size={16} className="fill-coral text-coral" />
            <span className="text-sm font-semibold text-text-primary">Favorites ({favoriteCount})</span>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <span className="text-xs font-medium text-teal cursor-pointer hover:text-white transition-colors">Send to Photographer</span>
          </div>
        </div>
      )}

      {/* Viewer */}
      <PhotoViewer 
        photo={selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1}
        hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
        onToggleFavorite={toggleFavorite}
        canFavorite={true}
      />
    </div>
  );
};