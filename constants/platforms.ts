import type { Platform } from '../components/previews/PreviewBase';

export const PLATFORMS: Record<string, Platform> = {
  twitter: {
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
  },
  instagram: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E1306C',
  },
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
  },
} as const;

export const PLATFORM_IDS = Object.keys(PLATFORMS);

export const getPlatform = (id: string): Platform => {
  const platform = PLATFORMS[id.toLowerCase()];
  if (!platform) {
    throw new Error(`Invalid platform: ${id}`);
  }
  return platform;
};