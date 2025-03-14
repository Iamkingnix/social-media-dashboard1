export interface Platform {
  id: string;
  name: string;
  icon: string; // We'll use icon names from @expo/vector-icons
  color: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#E1306C',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: '#4267B2',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0077B5',
  },
];