export type Platform = {
    id: string;
    name: string;
    icon: string;
    color: string;
    authUrl: string;
  };
  
  export const platforms: Platform[] = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      color: '#1DA1F2',
      authUrl: 'https://api.twitter.com/oauth/authorize',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'linkedin',
      color: '#0A66C2',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      authUrl: 'https://api.instagram.com/oauth/authorize',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      color: '#1877F2',
      authUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
    },
  ];