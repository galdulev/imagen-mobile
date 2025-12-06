export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  profileName: string;
  profileType: string;
  photoCount: number;
  date: string;
  progress: number; // 1-5
  status: 'processing' | 'ready' | 'delivered';
  coverPhoto: string;
}

export type CullingFlag = 'picked' | 'rejected' | 'none';
export type ColorLabel = 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'none';

export interface Photo {
  id: string;
  src: string;
  favorited: boolean;
  rating: number; // 0-5
  flag: CullingFlag;
  colorLabel: ColorLabel;
}

export interface ShareOptionType {
  id: string;
  label: string;
  icon: string; // Icon name
  color: string;
}

export interface SharedGalleryConfig {
  token: string;
  projectId: string;
  photographerName: string;
  message: string;
  expiresAt: string;
}