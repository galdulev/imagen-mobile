import { Project, Photo, ShareOptionType, SharedGalleryConfig, User, CullingFlag, ColorLabel } from '../types';

export const currentUser: User = {
  id: "user_1",
  name: "Gal",
  initials: "GD",
  email: "gal@photography.com"
};

// Reliable Unsplash Source URLs
const weddingPhotos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=600", // Bride
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600", // Rings
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600", // Dress
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=600", // Bouquet
  "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=600", // Table
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&q=80&w=600", // Forest
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600", // Kiss
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600", // Dance
];

const flags: CullingFlag[] = ['picked', 'picked', 'picked', 'rejected', 'none', 'none'];
const colors: ColorLabel[] = ['red', 'yellow', 'green', 'blue', 'none', 'none', 'none'];

export const projects: Project[] = [
  {
    id: "proj_1",
    name: "Johnson Wedding",
    profileName: "MOMENTICOS - B&W",
    profileType: "Talent AI Profile",
    photoCount: 248,
    date: "Dec 4, 2025",
    progress: 3,
    status: "ready",
    coverPhoto: weddingPhotos[0]
  },
  {
    id: "proj_2",
    name: "Smith Anniversary",
    profileName: "Personal Profile",
    profileType: "Personal AI Profile",
    photoCount: 156,
    date: "Nov 28, 2025",
    progress: 4,
    status: "ready",
    coverPhoto: weddingPhotos[1]
  },
  {
    id: "proj_3",
    name: "Davis Engagement",
    profileName: "FILM LOOK",
    profileType: "Talent AI Profile",
    photoCount: 89,
    date: "Nov 15, 2025",
    progress: 5,
    status: "delivered",
    coverPhoto: weddingPhotos[2]
  }
];

// Helper to generate mock photos
const generatePhotos = (count: number, startIndex: number): Photo[] => {
  return Array.from({ length: count }, (_, i) => {
    const photoIndex = (startIndex + i) % weddingPhotos.length;
    
    // Deterministic random for consistent demo
    const randomVal = (startIndex + i) * 13; 
    
    return {
      id: `photo_${startIndex + i}`,
      src: weddingPhotos[photoIndex],
      favorited: (randomVal % 10) > 7, // ~20% favorites
      rating: (randomVal % 6), // 0-5
      flag: flags[randomVal % flags.length],
      colorLabel: colors[randomVal % colors.length]
    };
  });
};

export const projectPhotos: Record<string, Photo[]> = {
  proj_1: generatePhotos(30, 0),
  proj_2: generatePhotos(20, 5),
  proj_3: generatePhotos(15, 10)
};

export const shareOptions: ShareOptionType[] = [
  { id: "sms", label: "SMS", icon: "MessageCircle", color: "#007AFF" },
  { id: "whatsapp", label: "WhatsApp", icon: "MessageCircle", color: "#25D366" },
  { id: "email", label: "Email", icon: "Mail", color: "#E85555" },
  { id: "copy", label: "Copy Link", icon: "Link", color: "#252532" }
];

export const sharedGallery: SharedGalleryConfig = {
  token: "johnson-wedding-dec24",
  projectId: "proj_1",
  photographerName: "Your Photographer",
  message: "Thank you for choosing us for your special day! Here are your beautiful wedding photos.",
  expiresAt: "2026-01-04"
};